// let categoryList = [{
//     id: Date.now(),
//     categoryName: "Java",
//     class: "Fukuoka",
//     type: "Offline"
// }, {
//     id: Date.now(),
//     userName: "Python",
//     class: "Ha Noi",
//     type: "Online"
// }]
// localStorage.setItem("categoryList", JSON.stringify(categoryList))

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



function addCategory() {
    let newCategory = {
        id: Date.now(),
        categoryName: window.prompt("Input category name"),
        class: window.prompt("Input class"),
        type: window.prompt("Input type"),
    }
    let categoryList = JSON.parse(localStorage.getItem("categoryList"));
    categoryList.push(newCategory)
    localStorage.setItem("categoryList", JSON.stringify(categoryList))
    renderData()
}