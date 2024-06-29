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