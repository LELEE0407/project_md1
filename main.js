// let userList = [{
//     id: Date.now(),
//     userName: "Letai",
//     password: "123",
//     status: true
// }, {
//     id: Date.now(),
//     userName: "Lenghia",
//     password: "123",
//     status: true
// }]
// localStorage.setItem("userList", JSON.stringify(userList))


let userLogin = JSON.parse(localStorage.getItem("userLogin"))

function logout() {
    localStorage.removeItem("userLogin");
    window.location.href = '/authen'
}

function renderHeader() {
    document.querySelector("header").innerHTML = `
        <span onclick="window.location.href='/'">Admin Manager</span>
        <div class="user_box">
            <span>Hello, ${userLogin.userName}!</span>
            <button onclick="logout()">Logout</button>
        </div>
    `
}
renderHeader()