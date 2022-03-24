const menu = document.querySelector(".menu_banner_area");
const toggler = document.querySelector(".navbar-toggler");
const bar_a = document.querySelector(".icon-bar-a");
const bar_b = document.querySelector(".icon-bar-b");

toggler.addEventListener("click",()=>{
    if(menu.style.marginLeft == "-258px"){

        menu.style.marginLeft = "0px";
    }else{
        menu.style.marginLeft = "-258px";
    }
   
})