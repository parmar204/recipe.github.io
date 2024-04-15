let sign = document.querySelector(".sign");
let password = document.querySelector("#password");
let Cpassword = document.querySelector("#Cpassword");
let emailInput = document.querySelector("#emailInput")

sign.addEventListener("click",(e) => {
    e.preventDefault();
    if(password.value != Cpassword.value){
        alert("password does not match")
    }
    else{
        localStorage.setItem("user",JSON.stringify(emailInput.value));
        window.location.href = "index.html";
        // console.log(emailInput.value);
    }
})
 
