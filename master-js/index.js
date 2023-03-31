var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCatogry = document.getElementById("productCatogry");
var productDescription = document.getElementById("productDescription");

var theme = "add";
var x;
var productsContainer = [];

if (localStorage.getItem("products") != null) {
  productsContainer = JSON.parse(localStorage.getItem("products"));
  displayProducts(productsContainer);
}

function addProuduct() {
  product = {
    name: productName.value,
    price: productPrice.value,
    cat: productCatogry.value,
    des: productDescription.value,
  };

  if (theme == "add") {
    productsContainer.push(product);
    displayProducts(productsContainer);
    localStorage.setItem("products", JSON.stringify(productsContainer));
    clearForm();
  } else {
    productsContainer[x] = product;
    displayProducts(productsContainer);
    localStorage.setItem("products", JSON.stringify(productsContainer));
    clearForm();
    theme = "add";
    document.getElementById("add").innerText = "ADD Product";
    document.getElementById("add").style.background = "#421d92";
    document.getElementById("add").style.color = "white";
  }
}

function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productDescription.value = "";
  productCatogry.value = "";
}

function displayProducts(productsContainer) {
  var cartona = "";
  for (var i = 0; i < productsContainer.length; i++) {
    cartona += `
            <tr>
                <td>${i}</td>
                <td>${productsContainer[i].name}</td>
                <td>${productsContainer[i].price}</td>
                <td>${productsContainer[i].cat}</td>
                <td>${productsContainer[i].des}</td>
                <td>
                    <button class="btn btn-outline-warning  me-1" onclick="upDateProduct(${i})">UpDate</button>
                </td>
                <td>                    <button class="btn btn-outline-danger" onclick="deleteProduct(${i})" >Delete</button>
</td>
            </tr>
        `;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}

function deleteProduct(index) {
  productsContainer.splice(index, 1);
  displayProducts(productsContainer);
  localStorage.setItem("products", JSON.stringify(productsContainer));
}

function upDateProduct(index) {
  productName.value = productsContainer[index].name;
  productPrice.value = productsContainer[index].price;
  productCatogry.value = productsContainer[index].cat;
  productDescription.value = productsContainer[index].des;
  document.getElementById("add").innerText = "UP DATE";
  document.getElementById("add").style.background = "#e2c10a";
  document.getElementById("add").style.color = "black";
  theme = "update";
  x = index;
}

function searchProduct(word) {
  var matchedProducts = [];
  for (var i = 0; i < productsContainer.length; i++) {
    if (
      productsContainer[i].name.toLowerCase().includes(word.toLowerCase()) ==
      true
    ) {
      matchedProducts.push(productsContainer[i]);
      displayProducts(matchedProducts);
    }
  }
}
