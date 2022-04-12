const maincontent = document.querySelector(".main_content");

maincontent.innerHTML = `<form class="contact_form" action="#" method="post">
<div class="contact_form_text">
    <div class="form-group">
        <label for="">Image Profile</label>
        <input type="file" class="form-control" id="image" name="image" >
    </div>
    <div class="form-group">
        <input type="text" class="form-control" id="name" name="name" value="${localStorage.getItem("name")}" placeholder="Full  name">
    </div>
    <div class="form-group">
        <input type="email" class="form-control" id="email" name="email" value="${localStorage.getItem("email")}" placeholder="email">
    </div>
    <div class="form-group">
        <input type="text" class="form-control" id="facebook" name="facebook" value="${localStorage.getItem("facebook")}" placeholder="Facebook link">
    </div>
    <div class="form-group">
        <input type="text" class="form-control" id="twitter" name="twitter" value="${localStorage.getItem("twitter")}" placeholder="Twitter link">
    </div>
    <div class="form-group">
        <input type="text" class="form-control" id="github" name="github" value="${localStorage.getItem("github")}" placeholder="Github link">
    </div>
    <div class="form-group">
        <input type="text" class="form-control" id="behance" name="behance" value="${localStorage.getItem("behance")}" placeholder="Behance link">
    </div>
</div>

<div class="contact_form_message">
    <div class="form-group">
        <textarea class="form-control" name="caption" id="caption" rows="1" value="${localStorage.getItem("caption")}" placeholder="caption"></textarea>
    </div>
</div>
<div class="contact_form_text">
   
    <div class="form-group">
        <label for="chagep">New Password</label>
        <input type="password" class="form-control" id="npassword" name="password" value="${localStorage.getItem("npassword")}" placeholder="New password">
    </div>
    <div class="form-group">
        <label for="chagepn">Confirm New Password</label>
        <input type="password" class="form-control" id="cnpassword" name="password" value="${localStorage.getItem("cnpassword")}" placeholder="Confirm New password">
    </div>
    <div class="form-group">
        <label style="color: red;">Verification Password</label>
        <input type="password" class="form-control" id="oldpassword" name="password" placeholder="Verification Password">
    </div>
</div>

<button type="submit" value="submit" class="btn submit_btn">Update</button>

</form>`


const contactform = document.querySelector(".contact_form");

contactform.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    const name = document.querySelector("#name").value;
    const facebook = document.querySelector("#facebook").value;
    const twitter = document.querySelector("#twitter").value;
    const github = document.querySelector("#github").value;
    const behance = document.querySelector("#behance").value;
    const caption = document.querySelector("#caption").value;
    const oldpassword = document.querySelector("#oldpassword").value;
    const npassword = document.querySelector("#npassword").value;
    const cnpassword = document.querySelector("#cnpassword").value;
    const email = document.querySelector("#email").value;

    if(npassword !== cnpassword){
        return alert("Two passwords doen't match")
    }else if( oldpassword !== localStorage.getItem("oldpassword")){
        return alert("Old password is wrong")
    }

    const items = [`name:${name}`,`facebook:${facebook}`,`twitter:${twitter}`,`github:${github}`,`behance:${behance}`,`caption:${caption}`,`npassword:${npassword}`,`cnpassword:${cnpassword}`,`email:${email}`]
    items.map(item=>{
        setItems(item.split(":")[0],item.split(":")[1]);
    });

    location.reload();

});

function setItems(key,value){
    localStorage.setItem(key,value);
}

