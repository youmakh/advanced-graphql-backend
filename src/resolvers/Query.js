async function feed(root, args, context, info) {
    const where = args.filter ? {
        OR: [
            { title_contains: args.filter },
            { content_contains: args.filter },
        ],
    } : {}
    
    const posts = await context.prisma.posts({
        where
    })
    const count = await context.prisma
        .postsConnection({
            where,
        })
        .aggregate()
        .count()

    return {
        posts,
        count,
    }
}

async function post(root, args, context, info) {
    return await context.prisma.post({id: args.id})
}

module.exports = {
    feed,
    post,
}