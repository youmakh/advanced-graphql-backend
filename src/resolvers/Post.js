function postedBy(parent, args, context) {
    return context.prisma.post({ id: parent.id }).postedBy()
}

function likes(parent, args, context) {
    return context.prisma.post({ id: parent.id }).likes()
}

function likesAmount(parent, args, context) {
    return context.prisma.likesConnection({where: {post: {id: parent.id}}}).aggregate().count()
}
  
module.exports = {
    postedBy,
    likes,
    likesAmount
}