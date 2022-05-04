/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const commentform = document.querySelector('.comment_form');
const disibleControl = document.querySelector('.disible-control');

commentform.addEventListener('submit', async (e) => {
  e.preventDefault();

  let comment = document.querySelector('#message').value;
  const id = document.querySelector('#userId').value;

  if (comment.trim() == '') {
    popup(warning, 'Please fill empty fields!!');
    return 0;
  }

  disibleControl.style.display = 'block';
  try {
    await axios.post(`/api/v1/blogs/comment/${id}`, {
      comment,
    });
    document.querySelector('#message').value = '';
    popup(success, "Thanks for your comment🤓, you'll wait for approval");
    disibleControl.style.display = 'none';
  } catch (error) {
    console.log(error);
    disibleControl.style.display = 'none';
    console.log(error);
    if (error.request.status === 401) {
      return location.assign('/login');
    }
    if (error.response.data?.message) {
      popup(failure, `${error.response.data.message}`);
    } else {
      popup(failure, `${error.message}`);
    }
  }
});
