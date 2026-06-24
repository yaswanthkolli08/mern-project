const password = document.getElementById("password");
const bar = document.getElementById("bar");
const strengthText = document.getElementById("strengthText");
const toggleBtn = document.getElementById("toggleBtn");

const rules = {
    length: /.{8,}/,
    upper: /[A-Z]/,
    lower: /[a-z]/,
    number: /[0-9]/,
    special: /[!@#$%^&*(),.?":{}|<>]/
};

const messages = {
    length: "Minimum 8 characters",
    upper: "One uppercase letter",
    lower: "One lowercase letter",
    number: "One number",
    special: "One special character"
};

password.addEventListener("input", checkPassword);

function checkPassword(){

    let pass = password.value;
    let score = 0;

    for(let key in rules){

        const item = document.getElementById(key);

        if(rules[key].test(pass)){
            score++;
            item.className="valid";
            item.textContent="✅ " + messages[key];
        }
        else{
            item.className="invalid";
            item.textContent="❌ " + messages[key];
        }
    }

    if(score<=1){
        bar.style.width="20%";
        bar.style.background="red";
        strengthText.textContent="Weak Password";
    }
    else if(score<=3){
        bar.style.width="60%";
        bar.style.background="orange";
        strengthText.textContent="Medium Password";
    }
    else if(score==4){
        bar.style.width="80%";
        bar.style.background="gold";
        strengthText.textContent="Good Password";
    }
    else{
        bar.style.width="100%";
        bar.style.background="green";
        strengthText.textContent="Strong Password";
    }
}

toggleBtn.addEventListener("click",()=>{

    if(password.type==="password"){
        password.type="text";
        toggleBtn.textContent="Hide";
    }
    else{
        password.type="password";
        toggleBtn.textContent="Show";
    }

});