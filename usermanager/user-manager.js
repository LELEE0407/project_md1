// let userList = [{
//     id: Date.now(),
//     userName: "Letai",
//     password: "123",
//     status: "Nomal"
// }, {
//     id: Date.now(),
//     userName: "Lethai",
//     password: "123",
//     status: "Nomal"
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

function renderData() {
    let userList = JSON.parse(localStorage.getItem("userList"));
    let newStr = ``;
    for (let i = 0; i < userList.length; i++) {
        newStr += `
            <tr>
                <th scope="row">${i + 1}</th>
                <td>${userList[i].userName}</td>
                <td>${userList[i].status ? "Normal" : "locked"}</td>
                <td>
                    <button onclick="changeStatusUser(${userList[i].id})">lock / unlock</button>
                </td>
            </tr>
        `
    }
    document.querySelector("#user_box").innerHTML = newStr;
}
renderData()


function changeStatusUser(userId) {
    let userList = JSON.parse(localStorage.getItem("userList"));
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].id == userId) {
            userList[i].status = !userList[i].status;
            break
        }
    }
    localStorage.setItem("userList", JSON.stringify(userList))
    renderData()
}
function addUser() {
    let newUser = {
        id: Date.now(),
        userName: window.prompt("Input user name"),
        password: window.prompt("Input password"),
        status: true
    }
    let userList = JSON.parse(localStorage.getItem("userList"));
    userList.push(newUser)
    localStorage.setItem("userList", JSON.stringify(userList))
    renderData()
}