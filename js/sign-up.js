let elementUsername = document.getElementById('username');
let elementPassword = document.getElementById('password');
let registerButton = document.getElementById('register');

elementUsername.addEventListener("change", checkUsername);
elementPassword.addEventListener("change", checkPassword);
registerButton.addEventListener("click", registerUser);

let usernameCondition = false;
let passwordCondition = false;

function checkUsername() {
    //obtenemos el valor del nombre de usuario
    let valueUsername = elementUsername.value;
    console.log(valueUsername);
    //se verifica la longitud del nombre y luego envio el nombre  
    if (valueUsername.length < 4) {
        document.getElementById('usernameFeedback').innerHTML = "The username has less than 4 characters";
        document.getElementById('usernameFeedback').style.color = "red";
        usernameCondition = false;
    } else if (valueUsername.length > 12) {
        document.getElementById('usernameFeedback').innerHTML = "The username has more than 12 characters";
        document.getElementById('usernameFeedback').style.color = "red";
        usernameCondition = false;
    } else {
        //consulta asincronica
        fetch('include/verify-username.php', {
            method: 'POST',
            body: JSON.stringify({ 'user': valueUsername })
        })
        //el valor que vuelve del php es verdadero o falso
        .then(response => response.json())
        .then(data => {
            //informamos al usuario
            if (data.occupied) {
                document.getElementById('usernameFeedback').innerHTML = "The username is already in use";
                document.getElementById('usernameFeedback').style.color = "red";
                usernameCondition = false;
            } else {
                document.getElementById('usernameFeedback').innerHTML = "OK";
                document.getElementById('usernameFeedback').style.color = "green";
                usernameCondition = true;
            }
            //llamamos a la funcion para comprobar ambos campos
            registerButtonCheck();
        });
    }
}

function checkPassword() {
    //obtenemos el valor de la contraseña
    let valuePassword = elementPassword.value;
    //se verifica la longitud de la contraseña
    if (valuePassword.length < 8) {
        document.getElementById('passwordFeedback').innerHTML = "The password needs at least 8 characters";
        document.getElementById('passwordFeedback').style.color = "red";
        passwordCondition = false;
    } else {
        document.getElementById('passwordFeedback').innerHTML = "OK";
        document.getElementById('passwordFeedback').style.color = "green";
        passwordCondition = true;
    }
    
    //llamamos a la funcion para comprobar ambos campos
    registerButtonCheck();
}


function registerButtonCheck() {
    if (usernameCondition && passwordCondition) {
        console.log("OK")
        registerButton.disabled = false;
    } else {
        console.log("DISABLED")
        registerButton.disabled = true;
    }
}

function registerUser(event) {
    event.preventDefault();
    let username = elementUsername.value;
    let password = elementPassword.value;
    //consulta asincronica
    fetch('include/register-user.php', {
        method: 'POST',
        //stringfy convierte un objeto de javascript en JSON
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("User registered");
        } else {
            alert("Error registering user: " + data.error);
        }
    });
}
//me hago como el que escribo en ingles pero me cuesta horrores mantener una conversacion hasta en español