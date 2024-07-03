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

function renderData(userList) {
    // let userList = JSON.parse(localStorage.getItem("userList"));
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
// renderData(JSON.parse(localStorage.getItem("userList")))


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


function getUser() {
    let userList = JSON.parse(localStorage.getItem("userList"));
    console.log("userList", userList);
    let option = ``;
    for (let i = 0; i < userList.length; i++) {
        option += `
            <option value="lelee">${userList[i].userName}</option>
        `
    }
    console.log("userName", option);
    document.querySelector("#userName").innerHTML = option;
}
getUser()

function addUser() {
    let newUser = {
        id: Date.now(),
        userName: window.prompt("Input user name"),
        password: window.prompt("Input password"),
        status: true
    }
    if (newUser.userName.includes(" ")) {
        alert("Do not enter spaces")
        return
    }
    if (newUser.userName === '' || newUser.userName == null) {
        alert("Not Found")
        return
    }
    let userList = JSON.parse(localStorage.getItem("userList"));
    userList.push(newUser)
    localStorage.setItem("userList", JSON.stringify(userList))
    // renderData(userList)
    changePage(Math.ceil(userList.length / limit))
}

let limit = 3;
let nowPage = 0;


function printPageList() {
    let userList = JSON.parse(localStorage.getItem("userList"));
    // console.log(("page count"), Math.ceil(userList.length / limit));
    let pageCount = Math.ceil(userList.length / limit);

    let pageBtnList = ``;
    for (let i = 0; i < pageCount; i++) {
        pageBtnList += `
            <button onclick="changePage(${i})" style="color: ${nowPage == i ? "red" : ""}">${i}</button>
        `
    }
    document.querySelector(".page_list").innerHTML = pageBtnList;
}
printPageList()

function loadPageData(userList) {
    // let userList = JSON.parse(localStorage.getItem("userList"));
    let start = nowPage * limit;
    let end = start + limit;

    let pageDataList = [];
    for (let i = start; i < end; i++) {
        if (userList[i]) {
            pageDataList.push(userList[i])
        } else {
            break
        }
    }

    renderData(pageDataList)
}
loadPageData(JSON.parse(localStorage.getItem("userList")))

function changePage(page) {
    nowPage = page;
    printPageList()
    loadPageData(JSON.parse(localStorage.getItem("userList")))
}
function search(event) {
    let inputSearch = event.target.value
    let userList = JSON.parse(localStorage.getItem("userList"));

    let searchResult = [];

    for (let i in userList) {
        if (userList[i].userName.includes(inputSearch)) {
            searchResult.push(userList[i])
        }
    }
    console.log("search", searchResult);
    // renderData(searchResult)
    loadPageData(searchResult)
}