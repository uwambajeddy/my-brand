/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const contactform = document.querySelector('.contact_form');

contactform.addEventListener('submit', e => {
  e.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  if (email == '' || password == '') {
   popup(warning,"Please fill empty fields !!");
      
    return 0;
  }

  popup(success, "Logged in successfully");
});
