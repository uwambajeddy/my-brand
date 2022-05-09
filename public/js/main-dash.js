/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const menu = document.querySelector('.menu_banner_area');
const toggler = document.querySelector('.navbar-toggler');
const barA = document.querySelector('.icon-bar-a');
const barB = document.querySelector('.icon-bar-b');

const logout = document.querySelector('.logout_btn');

toggler.addEventListener('click', () => {
  if (menu.style.marginLeft == '-258px') {
    menu.style.marginLeft = '0px';
  } else {
    menu.style.marginLeft = '-258px';
  }
});

logout.addEventListener('click', e => {
  e.preventDefault();
  localStorage.setItem('isLoggedIn', 'false');
  location.reload();
});

if (modalBlock) {
  modalBlock.addEventListener('click', () => {
    modal.style.top = '-500px';
    modalBlock.style.display = 'none';
  });
}

/* modalUpdate.map(update =>{
    update.addEventListener("click",()=>{
        if(modal.style.top == "-500px"){
            modalBlock.style.display ="block";
            modal.style.top = "50%";
        }else{
            menu.style.marginLeft = "-500px";
            modalBlock.style.display ="block";
        }

    });

}) */
