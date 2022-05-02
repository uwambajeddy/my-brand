/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const contactform = document.querySelector('.contact_form');

contactform.addEventListener('submit', e => {
  e.preventDefault();

  const email = document.querySelector('#email').value;
  const name = document.querySelector('#name').value;
  const subject = document.querySelector('#subject').value;
  const message = document.querySelector('#message').value;

  if (name == '' || email == '' || subject == '' || message =='' ) {
   popup(warning,"Please fill empty fields!!");
      
    return 0;
  }

  popup(success, "Thanks for your feedback 🤓");
});
