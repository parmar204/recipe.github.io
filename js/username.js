let signIn = document.querySelector(".sign-in");
let uservalue = document.querySelector(".uservalue");

let isUser = JSON.parse(localStorage.getItem("user"));
if(isUser){
    let username = isUser.charAt(0).toUpperCase();
    signIn.style.display = "none";
    uservalue.style.display = "inline-block";
    uservalue.innerHTML = username;
    // console.log(isUser.charAt(0).toUpperCase());
}