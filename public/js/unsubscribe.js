/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const contactform = document.querySelector('#subscription');
const happyface = document.querySelector('.happyface');
const disibleControl = document.querySelector('.disible-control');
contactform.addEventListener('click', async (e) => {
  e.preventDefault();
  popupLoading('Loading...');
  disibleControl.style.display = 'block';
  try {
    const res = await axios.get('/api/v1/user/subscription');
    popupLoadingRemove();
    if (res.data.data.user.subscription) {
      happyface.innerHTML = 'Thank you for your subscription 🤓';
      document.querySelector('.submit_btn').firstChild.textContent =
        'Unsubscribe';

      popup(success, 'subscribed successfully');
    } else {
      happyface.innerHTML = 'We are so sad to see you leaving 😔';
      document.querySelector('.submit_btn').firstChild.textContent =
        'Subscribe';
      popup(success, 'Unsubscribed successfully');
    }
    disibleControl.style.display = 'none';
  } catch (error) {
    popupLoadingRemove();
    console.log(error);
    disibleControl.style.display = 'none';
    if (error.response.data?.message) {
      popup(failure, `${error.response.data.message}`);
    } else {
      popup(failure, `${error.message}`);
    }
  }
});
