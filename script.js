const button = document.getElementById('button')

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
    const lower = document.getElementById('lowercase').checked;
    const upper = document.getElementById('uppercase').checked;
    const special = document.getElementById('special').checked;
    const passContainer = document.getElementById('password');
    if (passLength > 0 && passLength <= 40) passContainer.innerText = build_password(passLength, lower, upper, special);
    else if (passLength > 40) passContainer.innerText = 'Password length must be smaller or equal to 40';
    else passContainer.innerText = 'Password length must be greater than 0';
    //efect to password-container when we click to generate password
    const divPassword = document.getElementById('password-container');
    divPassword.style.transform = 'scale(1.1)';
    setTimeout(() => {
      divPassword.style.transform = 'scale(1.0)';
    }, 300)
})
