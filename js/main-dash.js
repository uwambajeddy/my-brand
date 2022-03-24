const menu = document.querySelector(".menu_banner_area");
const toggler = document.querySelector(".navbar-toggler");
const bar_a = document.querySelector(".icon-bar-a");
const bar_b = document.querySelector(".icon-bar-b");
const modal_block = document.querySelector(".model_block");
const modal = document.querySelector(".modal_banner_area");
const modal_add = document.querySelector(".add_btn");
const modal_update = document.querySelectorAll(".update_btn");

toggler.addEventListener("click",()=>{
    if(menu.style.marginLeft == "-258px"){
        menu.style.marginLeft = "0px";
    }else{
        menu.style.marginLeft = "-258px";
    }
   
})
modal_block.addEventListener("click",()=>{
    modal.style.top = "-500px";
    modal_block.style.display ="none";
   
});

/* modal_update.map(update =>{
    update.addEventListener("click",()=>{
        if(modal.style.top == "-500px"){
            modal_block.style.display ="block";
            modal.style.top = "50%";
        }else{
            menu.style.marginLeft = "-500px";
            modal_block.style.display ="block";
        }
       
    });
    
}) */

modal_add.addEventListener("click",()=>{
    if(modal.style.top == "-500px"){
        modal_block.style.display ="block";
        modal.style.top = "50%";
    }else{
        modal.style.top = "-500px";
        modal_block.style.display ="none";
    }
   
});
