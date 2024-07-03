// let categoryList = [{
//     id: Date.now(),
//     categoryName: "Book",
// }, {
//     id: Date.now(),
//     categoryName: "Pen"
// }]
// localStorage.setItem("categoryList", JSON.stringify(categoryList))

let userLogin = JSON.parse(localStorage.getItem("userLogin"))
let categoryList = JSON.parse(localStorage.getItem("categoryList"))

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
function renderData(categoryList) {
    // let categoryList = JSON.parse(localStorage.getItem("categoryList"));
    let newStr = ``;
    for (let i = 0; i < categoryList.length; i++) {
        newStr += `
            <tr>
                <td scope="row">${i + 1}</td>
                <td>${categoryList[i].categoryName}</td>
                <td>${categoryList[i].quantity}</td>
                <td>${categoryList[i].price}</td>
                <td>
                    <button onclick="deleteCategory(${categoryList[i].id})" class="btn btn-danger">Delete</button>
                </td>
            </tr>
        `

    }
    document.querySelector(".content_box tbody").innerHTML = newStr;
}
// renderData(JSON.parse(localStorage.getItem("categoryList")))

function addCategory() {
    let newCategory = {
        id: Date.now(),
        categoryName: window.prompt("Input category name"),
        quantity: window.prompt("Input quantity"),
        price: window.prompt("Input price")
    }
    if (newCategory.categoryName === '' || newCategory.categoryName == null) {
        return
    }
    let categoryList = JSON.parse(localStorage.getItem("categoryList"));
    categoryList.push(newCategory)
    localStorage.setItem("categoryList", JSON.stringify(categoryList))
    // renderData()
    changePage(Math.ceil(categoryList.length / limit))

}
function deleteCategory(categoryId) {
    console.log("categoryId", categoryId);
    let categoryList = JSON.parse(localStorage.getItem("categoryList"));
    for (let i = 0; i < categoryList.length; i++) {
        if (categoryList[i].id === categoryId) {
            categoryList.splice(i, 1)
            break
        }
    }
    renderData(categoryList);
    localStorage.setItem("categoryList", JSON.stringify(categoryList))
}

let limit = 3;
let nowPage = 0;


function printPageList() {
    let categoryList = JSON.parse(localStorage.getItem("categoryList"));
    // console.log(("page count"), Math.ceil(userList.length / limit));
    let pageCount = Math.ceil(categoryList.length / limit);

    let pageBtnList = ``;
    for (let i = 0; i < pageCount; i++) {
        pageBtnList += `
            <button onclick="changePage(${i})" style="color: ${nowPage == i ? "red" : ""}">${i}</button>
        `
    }
    document.querySelector(".page_list").innerHTML = pageBtnList;
}
printPageList()

function loadPageData(categoryList) {
    // let categoryList = JSON.parse(localStorage.getItem("categoryList"));
    let start = nowPage * limit;
    let end = start + limit;

    let pageDataList = [];
    for (let i = start; i < end; i++) {
        if (categoryList[i]) {
            pageDataList.push(categoryList[i])
        } else {
            break
        }
    }

    renderData(pageDataList)
}

loadPageData(JSON.parse(localStorage.getItem("categoryList")))

function changePage(page) {
    nowPage = page;
    printPageList()
    loadPageData(JSON.parse(localStorage.getItem("categoryList")))
}
function search(event) {
    let inputSearch = event.target.value
    let categoryList = JSON.parse(localStorage.getItem("categoryList"));

    let searchResult = [];

    for (let i in categoryList) {
        if (categoryList[i].categoryName.includes(inputSearch)) {
            searchResult.push(categoryList[i])
        }
    }
    // renderData(searchResult)
    loadPageData(searchResult)
}