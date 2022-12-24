let windowURL = window.location.href;
if (windowURL.split("?").length === 1) {
    window.location.href = "./../index.html";
}

let prodID = window.location.href.split("?")[1].split("=")[1] || 1;
console.log(prodID);
$(function () {
    fetch(`https://fakestoreapi.com/products/${prodID}`)
        .then((res) => res.json())
        .then((product) => {
            prod = `
            <a href="#shop-single.html" class="card product-img " >
                  <img
                    src="${product.image}"
                    class="img-fluid img-thumbnail"
                    style="height: 300px ;width:300px"
                  />
                </a>
            `;
            $(".product-item").append(prod);
        })
        .catch((e) => {
            console.log("Error ):");
            console.log(e);
        });
    //fetching title and price
    fetch(`https://fakestoreapi.com/products/${prodID}`)
        .then((res) => res.json())
        .then((product) => {
            prod = `
            <div class="d-flex justify-content-center ctitle">
            <h3 class="title fw-bold"">${product.title}</h3>
            </div>
                <div class="d-flex justify-content-center m-4">
                    <span class="h5 me-5 fw-bold">$${product.price}</span>
                    ${`<i class="fa-solid fa-star" style="color:var(--ltn__secondary-color-2)"></i>`.repeat(Math.round(product.rating.rate))}
                </div>
            `;

            $(".contain").append(prod);
        })
        .catch((e) => {
            console.log("error");
            console.log(e);
        });

    //fetching description
    fetch(`https://fakestoreapi.com/products/${prodID}`)
        .then((res) => res.json())
        .then((product) => {
                prod = `
            <div class="container mt-5 flex-lg-row flex-column d-flex" style="padding-left:15%;">
           <h2 class="fw-bold ">Description</h2>
        </div>

        <div class="container  flex-lg-row flex-column d-flex" style="padding-left:15%;">
            <p class="desc">${product.description}</p>
        </div>
            `;
            
            $("#descr").append(prod);
        })
        .catch((e) => {
            console.log("error");
            console.log(e);
        });
});
