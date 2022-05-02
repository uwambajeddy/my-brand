/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const contactform = document.querySelector('.contact_form');

contactform.addEventListener('submit', e => {
  e.preventDefault();

  const email = document.querySelector('#email').value;
  const name = document.querySelector('#name').value;
  const password = document.querySelector('#password').value;
  const password_confirm = document.querySelector('#password_confirm').value;

  if (name == '' || email == '' || password == '' || password_confirm =='' ) {
   popup(warning,"Please fill empty fields !!");
      
    return 0;
  }

  popup(success, "Account created successfully");
});
