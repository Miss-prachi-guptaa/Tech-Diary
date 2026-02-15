export const checkAuthor = (blog, userId) => {
  return blog.author.toString() === userId;
};
//✔️ TRUE →if  same user
// Example blog object:
//   "_id": "695280808b615ec8da2b87c4",      // blog id
//   "author": "695266a75560eb9d78116594"   // user id (author)
// }

