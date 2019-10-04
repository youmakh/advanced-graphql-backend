const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function post(root, args, context) {
    const userId = getUserId(context)
    return context.prisma.createPost({
        title: args.title,
        content: args.content,
        postedBy: { connect: { id: userId } },
    })
}

async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await context.prisma.createUser({ ...args, password })
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
  
    return {
        token,
        user,
    }
}
  
async function login(parent, args, context, info) {
    const user = await context.prisma.user({ email: args.email })
    const valid = await bcrypt.compare(args.password, user.password)
    if (!user || !valid) {
        throw new Error('No such user found')
    }
  
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
  
    return {
        token,
        user,
    }
}

async function like(parent, args, context, info) {
    const userId = getUserId(context)
  
    const alreadyLiked = await context.prisma.$exists.like({
        user: { id: userId },
        post: { id: args.postId },
    })
    if (alreadyLiked) {
        throw new Error(`Already liked the post: ${args.postId}`)
    }
  
    return context.prisma.createLike({
        user: { connect: { id: userId } },
        post: { connect: { id: args.postId } },
    })
}
  
module.exports = {
    signup,
    login,
    post,
    like,
}