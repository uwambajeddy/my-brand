const modalAddArea = document.querySelector('.modal_banner_add');
const modal = document.querySelector('.modal_banner_add');
const modalAdd = document.querySelector('.add_btn');
const modalUpdate = document.querySelectorAll('.update_btn');
const modalBlock = document.querySelector('.model_block');

modalAdd.addEventListener('click', () => {
    if (modalAddArea.style.top == '-500px') {
        modalAddArea.style.top = '50%';
        modalBlock.style.display = 'block';
    } else {
        modalAddArea.style.top = '-500px';
        modalBlock.style.display = 'none';
    }

});


function updateModal(id) {
    const modalUpdateArea = document.querySelector(`.modal_banner_update_${id}`);
    modalBlock.addEventListener("click", () => {
        modalUpdateArea.classList.remove('upwards');
        modalBlock.style.display = 'none';
    })

    if ([...modalUpdateArea.classList].includes("upward")) {
        modalUpdateArea.classList.remove('upwards');
        modalBlock.style.display = 'none';
        modalBlock.style.display = 'none';
    } else {
        modalUpdateArea.classList.add('upwards');
        modalBlock.style.display = 'block';
    };


}