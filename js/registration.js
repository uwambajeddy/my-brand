contactform.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    
    if( password !== localStorage.getItem("oldpassword")){
        return alert("Sorry password is wrong")
    }

    localStorage.setItem("isLoggedIn","true")

    location.assign("./index.html");

});