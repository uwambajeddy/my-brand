async function handleLike(blogId) {
  try {
    await axios.post(`/api/v1/blogs/like/${blogId}`);
    location.reload();
  } catch (error) {
    console.log(error);
    if (error.request?.status === 401) {
      return location.assign('/login');
    }
    if (error.response.data?.message) {
      popup(failure, `${error.response.data.message}`);
    } else {
      popup(failure, `${error.message}`);
    }
  }
}
