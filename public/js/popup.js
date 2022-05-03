const success = document.querySelector('.popup-success');
const warning = document.querySelector('.popup-warning');
const failure = document.querySelector('.popup-failure');

function popup(action, message) {
  action.classList.remove('hide');
  action.children[1].children[0].innerHTML = message;
  action.style.transform = 'translate(-20%,-50%)';

  setTimeout(() => {
    action.style.transform = 'translate(120%,-50%)';
  }, 3000);
}
