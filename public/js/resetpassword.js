/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const contactform = document.querySelector('.contact_form');

contactform.addEventListener('submit', e => {
  e.preventDefault();

  const password = document.querySelector('#password').value;
  const password_confirm = document.querySelector('#password_confirm').value;

  if ( password == '' || password_confirm =='' ) {
   popup(warning,"Please fill empty fields !!");
      
    return 0;
  }
  if ( password !==  password_confirm ) {
   popup(warning,"The two passwords must much !!");
      
    return 0;
  }

  popup(success, "Password reset successfully");
});
