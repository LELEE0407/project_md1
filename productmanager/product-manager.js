// let productList = [{
//     id: "1",
//     productName: "Pen",
//     quantity: "50",
//     price: "300"
// }, {
//     id: "2",
//     productName: "Book",
//     quantity: "25",
//     price: "500"
// }]
// localStorage.setItem("productList", JSON.stringify(productList))

let userLogin = JSON.parse(localStorage.getItem("userLogin"))
let productList = JSON.parse(localStorage.getItem("productList"))

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

function renderData(productList) {
    // let productList = JSON.parse(localStorage.getItem("productList"));
    let newStr = ``;
    for (let i = 0; i < productList.length; i++) {
        newStr += `
            <tr>
                <td>${i + 1}</td>
                <td>${productList[i].productName}</td>
                <td>${productList[i].quantity}</td >
                <td>${productList[i].price}</td>
                <td>
                <button onclick="deleteProduct(${productList[i].id})" class="btn btn-danger">Delete</button> 
                </td>
            </tr >
        `
    }
    document.querySelector(".content_box tbody").innerHTML = newStr;
}
// renderData(JSON.parse(localStorage.getItem("productList")))

function getCategory() {
    let categoryList = JSON.parse(localStorage.getItem("categoryList"));
    console.log("categoryList", categoryList);
    let option = ``;
    for (let i = 0; i < categoryList.length; i++) {
        option += `
            <option value="Book">${categoryList[i].categoryName}</option>
        `
    }
    console.log("categoryName", option);
    document.querySelector("#categoryName").innerHTML = option;
}
getCategory()

function addProduct() {
    let newProduct = {
        id: Date.now(),
        productName: window.prompt("Input product name"),
        quantity: window.prompt("Input quantity"),
        price: window.prompt("Input price"),
    }
    if (newProduct.productName === '' || newProduct.productName == null) {
        return
    }
    let productList = JSON.parse(localStorage.getItem("productList"));
    productList.push(newProduct)
    localStorage.setItem("productList", JSON.stringify(productList))
    // renderData()
    changePage(Math.ceil(productList.length / limit) && 0)
}

function deleteProduct(productId) {
    console.log("productId", productId);
    let productList = JSON.parse(localStorage.getItem("productList"));
    for (let i = 0; i < productList.length; i++) {
        if (productList[i].id === productId) {
            productList.splice(i, 1)
            break
        }
    }
    renderData(productList);
    localStorage.setItem("productList", JSON.stringify(productList))
}

let limit = 3;
let nowPage = 0;


function printPageList() {
    let productList = JSON.parse(localStorage.getItem("productList"));
    // console.log(("page count"), Math.ceil(productList.length / limit));
    let pageCount = Math.ceil(productList.length / limit);

    let pageBtnList = ``;
    for (let i = 0; i < pageCount; i++) {
        pageBtnList += `
            <button onclick="changePage(${i})" style="color: ${nowPage == i ? "red" : ""}">${i}</button>
        `
    }
    document.querySelector(".page_list").innerHTML = pageBtnList;
}
printPageList()

function loadPageData(productList) {
    // let productList = JSON.parse(localStorage.getItem("productList"));
    let start = nowPage * limit;
    let end = start + limit;

    let pageDataList = [];
    for (let i = start; i < end; i++) {
        if (productList[i]) {
            pageDataList.push(productList[i])
        } else {
            break
        }
    }
    console.log("pageData", pageDataList);

    renderData(pageDataList)
}

loadPageData(JSON.parse(localStorage.getItem("productList")))

function changePage(page) {
    nowPage = page;
    printPageList()
    loadPageData(JSON.parse(localStorage.getItem("productList")))
}

function search(event) {
    let inputSearch = event.target.value
    let productList = JSON.parse(localStorage.getItem("productList"));

    let searchResult = [];

    for (let i in productList) {
        if (productList[i].productName.includes(inputSearch)) {
            searchResult.push(productList[i])
        }
    }
    console.log("search", searchResult);
    // renderData(searchResult)
    loadPageData(searchResult)

}

