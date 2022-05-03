async function handleLike(blogId, userId) {
  if (!userId) return location.assign('/login');

  try {
    await axios.post(`/api/v1/blogs/like/${blogId}`);
    location.reload();
  } catch (error) {
    console.log(error);
    location.assign('/login');
  }
}
