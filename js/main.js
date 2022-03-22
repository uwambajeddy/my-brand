const bar_a = document.querySelector(".icon-bar-a");
const bar_b = document.querySelector(".icon-bar-b");
const navbar = document.querySelector(".navbar-toggler");
const menu = document.querySelector(".navbar-nav");

navbar.addEventListener("click",()=>{
    if(bar_a.style.marginLeft == "10px"){

        bar_a.style.marginLeft = "0px";
    }else{
        bar_a.style.marginLeft = "10px";
    }
    if(bar_b.style.marginLeft == "-10px"){

        bar_b.style.marginLeft = "0px";
    }else{
        bar_b.style.marginLeft = "-10px";
    }
    if( menu.style.opacity == "1"){
        menu.style.opacity = "0"
        menu.style.height = "0px"
    }else{
        menu.style.opacity = "1"
        menu.style.height = "282px"
    }
   

})