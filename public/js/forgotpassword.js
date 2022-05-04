/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const contactform = document.querySelector('.contact_form');
const disibleControl = document.querySelector('.disible-control');

contactform.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.querySelector('#email').value;

  if (email == '') {
    popup(warning, 'Please fill empty field !!');

    return 0;
  }

  disibleControl.style.display = 'block';
  try {
    await axios.post('/api/v1/user/forgotpassword', {
      email,
    });
    document.querySelector('#email').value = '';
    popup(success, 'Reset token was sent to your Email address');
    disibleControl.style.display = 'none';
  } catch (error) {
    disibleControl.style.display = 'none';
    console.log(error);
    if (error.response.data?.message) {
      popup(failure, `${error.response.data.message}`);
    } else {
      popup(failure, `${error.message}`);
    }
  }
});
