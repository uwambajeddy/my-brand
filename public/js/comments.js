/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const commentform = document.querySelector('.comment_form');

commentform.addEventListener('submit', e => {
  e.preventDefault();

  const message = document.querySelector('#message').value;

  if ( message =='' ) {
   popup(warning,"Please fill empty fields!!");
      
    return 0;
  }

  popup(success, "Thanks for your comment🤓, you'll wait for approval");
});
