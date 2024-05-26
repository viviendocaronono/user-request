//el codigo esta incompleto
let elementUsername = document.getElementById('username');
let elementPassword = document.getElementById('password');
elementUsername.addEventListener("change", checkUsername);
elementPassword.addEventListener("change", checkPassword);

//estas variables son potencialmente innecesarias
let usernameCondition = false;
let passwordCondition = false;

function checkUsername() {
    //obtenemos el valor del nombre de usuario
    let valueUsername = elementUsername.value;
    console.log(valueUsername);
    //se verifica la longitud del nombre y luego envio el nombre  
    if (valueUsername.length < 4) {
        document.getElementById('usernameFeedback').innerHTML = "The username nees more than 4 characters";
        document.getElementById('usernameFeedback').style.color = "red";
        usernameCondition = false;
    } else if (valueUsername.length > 12) {
        document.getElementById('usernameFeedback').innerHTML = "The username need less than 12 characters";
        document.getElementById('usernameFeedback').style.color = "red";
        usernameCondition = false;
    } else {
        fetch('include/verify-username.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'user': valueUsername
            })
        })

        //el valor que vuelve del php es verdadero o falso, en base a esto continuo 
        .then(response => response.json())
        .then(data => {
            if (data.occupied) {
                //informamos al usuario si se encuentra ocupado
                document.getElementById('usernameFeedback').innerHTML = "Already Exist";
                document.getElementById('usernameFeedback').style.color = "red";
                //cambiamos el valor de condicion del campo
                usernameCondition = false;
                //ejecutamos la funcion de chequear campos
                registerButtonCheck();
            } else {
                //informamos al usuario si el nombre esta bien
                document.getElementById('usernameFeedback').innerHTML = "OK";
                document.getElementById('usernameFeedback').style.color = "green";
                //cambiamos el valor de condicion del campo
                usernameCondition = true;
                //ejecutamos la funcion de chequear campos
                registerButtonCheck();
            }
        })
    }
}
function checkPassword() {
    //obtenemos el valor de contraseña
    let valuePassword = elementPassword.value;
    if (valuePassword.length < 8) {
        //informar si es menor a 8 caracteres
        document.getElementById('passwordFeedback').innerHTML = "Too Short";
        document.getElementById('passwordFeedback').style.color = "red";
        //cambiamos el valor de condicion del campo
        passwordCondition = false;
        //ejecutamos la funcion de chequear campos
        registerButtonCheck()
    } else {
        //informar que la contraseña esta bien
        document.getElementById('passwordFeedback').innerHTML = "OK";
        document.getElementById('passwordFeedback').style.color = "green";
        //cambiamos el valor de condicion del campo
        passwordCondition = true;
        //ejecutamos la funcion de chequear campos
        registerButtonCheck()
    }
}
function registerButtonCheck() {
    //si las condiciones de los campos son ambas verdaderas entonces habilitar el boton
    if (usernameCondition == true && passwordCondition == true) {
        //informar en la consola
        console.log("Register OK")
        document.getElementById('register').disabled = false;
    } else {
        //informar en la consola
        console.log("Register Disabled")
        document.getElementById('register').disabled = true;
    }
}