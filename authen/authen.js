const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

function signUp(event) {
    event.preventDefault();
    let newUser = {
        id: Date.now(),
        userName: event.target.userName.value,
        password: event.target.password.value,
        status: true
    }

    if (newUser.password != event.target.passwordAgain.value) {
        alert("Not Found")
        return;
    }
    if (newUser.newUser == "") {
        alert("Not Found")
        return;
    }
    if (newUser.password == "") {
        alert("Not Found")
        return;
    }


    let userList = JSON.parse(localStorage.getItem("userList"));
    userList.push(newUser)
    localStorage.setItem("userList", JSON.stringify(userList))

    alert("Register Succesfully")
    container.classList.remove("right-panel-active");
}

function signIn(event) {
    event.preventDefault();
    let userInfor = {
        userName: event.target.UserName.value,
        password: event.target.password.value
    }
    let userList = JSON.parse(localStorage.getItem("userList"));

    let userResult = null;
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].userName == userInfor.userName) {
            userResult = userList[i];
            break;
        }
    }
    if (!userResult) {
        alert("User does not exist")
        return;
    }
    if (userResult.password != userInfor.password) {
        alert("Incorrect Password")
        return;
    }
    if (!userResult.status) {
        alert("locked")
        return;
    }

    localStorage.setItem("userLogin", JSON.stringify(userResult))
    window.location.href = "/"
}
