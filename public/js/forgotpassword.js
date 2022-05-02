/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const contactform = document.querySelector('.contact_form');

contactform.addEventListener('submit', e => {
  e.preventDefault();

  const email = document.querySelector('#email').value;

  if ( email == '' ) {
   popup(warning,"Please fill empty field !!");
      
    return 0;
  }

  popup(success, "Reset token was sent to your Email address");
});
