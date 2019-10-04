const newPost = {
    subscribe: (parent, args, context, info) => {
        return context.prisma.$subscribe.post({ mutation_in: ['CREATED'] }).node()
    },
    resolve: payload => {
        return payload
    },
}
  
const newLike = {
    subscribe: (parent, args, context, info) => {
        return context.prisma.$subscribe.like({ mutation_in: ['CREATED'] }).node()
    },
    resolve: payload => {
        return payload
    },
}
  
module.exports = {
    newPost,
    newLike
}