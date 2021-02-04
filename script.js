const button = document.getElementById('button');
const lower = document.getElementById('lowercase');
const upper = document.getElementById('uppercase');
const special = document.getElementById('special');
const passContainer = document.getElementById('password');

function generate_lower() {
  const lower_store = ['a','b','c','d','e','f','w','x','y','z'];
  return lower_store[parseInt(Math.random()*10)];
}

function generate_upper() {
  const upper_store = ['A','B','C','D','E','F','W','X','Y','Z'];
  return upper_store[parseInt(Math.random()*10)];
}


function generate_special() {
  const special_store = ['?','¿','%','&','@','!','*','/','$','¡'];
  return special_store[parseInt(Math.random()*10)];
}

function build_password(passLength, lower, upper, special) {
    let number = '';
    for (let i = 0; i < passLength; ++i) {
      const ran = Math.random();
      if (lower && ran <= 0.25) number += generate_lower();
      else if (upper && ran > 0.25 && ran <=0.5) number += generate_upper();
      else if (special && ran > 0.5 && ran <=0.75) number += generate_special();
      else number += parseInt(Math.random()*10);
    }
    return number;
}

button.addEventListener('click', (e) => {
    e.preventDefault();
    const passLength = parseInt(document.getElementById('passLength').value);
    if (passLength > 0 && passLength <= 40) passContainer.innerText = build_password(passLength, lower.checked, upper.checked, special.checked);
    else if (passLength > 40) passContainer.innerText = 'Password length must be smaller or equal to 40';
    else passContainer.innerText = 'Password length must be greater than 0';
    //efect to password-container when we click to generate password
    const divPassword = document.getElementById('password-container');
    divPassword.style.transform = 'scale(1.1)';
    setTimeout(() => {
      divPassword.style.transform = 'scale(1.0)';
    }, 300)
})

const securityDiv = document.getElementById('security-level');
let security = 10;

function update_security(number) {
  if (number >= 0) security += number;
  else security = 10;
  securityDiv.style.width = security + '%';
  if (security > 10 && security <=25) securityDiv.style.backgroundColor = 'red';
  else if (security > 25 && security <=50) securityDiv.style.backgroundColor = 'orange';
  else if (security > 50 && security <= 75) securityDiv.style.backgroundColor = 'yellow';
  else if (security <= 10) securityDiv.style.backgroundColor = 'black';
  else securityDiv.style.backgroundColor = 'chartreuse';
}

lower.addEventListener('click', () => {
  if (lower.checked) update_security(20);
  else update_security(-20);
})

upper.addEventListener('click', () => {
  if (upper.checked) update_security(20);
  else update_security(-20);
})

special.addEventListener('click', () => {
  if (special.checked) update_security(20);
  else update_security(-20);
})


const passLengthListener = document.getElementById('passLength');
let LengthListener = 0;

passLengthListener.addEventListener('change', () =>{
  let newValue = parseInt(passLengthListener.value);
  if (newValue > 0 && LengthListener >= newValue) update_security((newValue-LengthListener)*2);
  else if (newValue > 0) update_security((newValue-LengthListener)*2);
  else if (newValue >= 0) {
    update_security(-100);
    LengthListener = 0;
    if (lower.checked) update_security(20);
    if (upper.checked) update_security(20);
    if (special.checked) update_security(20);
  }
  if (newValue > 0) LengthListener = newValue;
})
