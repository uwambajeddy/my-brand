const contactform = document.querySelector(".contact_form");

contactform.addEventListener('submit',(e)=>{
    e.preventDefault();


    
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    
    if(  email =="" || password == ""){
        return alert("Please fill empty fields !!")
    }
    if(  email !== localStorage.getItem("email") || password !== localStorage.getItem("oldpassword")){
        return alert("Sorry password or email is wrong")
    }

    localStorage.setItem("isLoggedIn","true")

    location.assign("./admin/index.html");

});