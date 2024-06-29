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
function renderData() {
    let categoryList = JSON.parse(localStorage.getItem("categoryList"));
    let newStr = ``;
    for (let i = 0; i < categoryList.length; i++) {
        newStr += `
           <tr>
                <th scope="row">${i + 1}</th>
                <td>${categoryList[i].categoryName}</td>
                <td>${categoryList[i].class}</td>
                <td>${categoryList[i].type}</td>
                <td>
                    <button>Delete</button>
                </td>
            </tr>
        `
    }
    document.querySelector(".content_box tbody").innerHTML = newStr;
}
renderData()



function addCategory() {
    let newCategory = {
        id: Date.now(),
        categoryName: window.prompt("Input category name"),
        class: window.prompt("Input class"),
        type: window.prompt("Input type"),
    }
    console.log("newCategory", newCategory);
    console.log("category", newCategory.categoryName);
    if (newCategory.categoryName === '' || newCategory.categoryName == null) {
        console.log("da vao if");
        alert("Not found")
        return
    }
    let categoryList = JSON.parse(localStorage.getItem("categoryList"));
    categoryList.push(newCategory)
    localStorage.setItem("categoryList", JSON.stringify(categoryList))
    renderData()
} 
