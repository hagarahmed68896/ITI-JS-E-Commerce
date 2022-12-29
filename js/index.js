import { ecommerceUsers, UpdateNavCart } from "./script.js";

// when window loads
$(function () {
    // fetch only 8 products from api
    if (window.location.href.search("/index.html") !== -1) {
        fetch("https://fakestoreapi.com/products?limit=9")
            // when promise complete , return the response converted to json
            .then((res) => res.json())
            // when json response contains list array of products objects returned
            .then((products) => {
                // variable that contains the html of all products
                let prodsCards = "";
                // loop over each product in products
                products.forEach((product) => {
                    // add the current product to the products
                    /*
                     * data-prod-id="${product.id}" ==> adds product custom attribute to store the product id provided by the api
                     * data-prod-category ==>"${product.category}" => adds product custom attribute to store the product category provided by the api
                     * src="${product.image}" ==> set the src of the product image to the image link provided by the api
                     * ${product.title} ==> set the text of the heading to the product title provided by the api
                     * ${product.price} ==> set the value of the span to the price of the product provided by the api
                     * ${'<i class="fa-solid fa-star"></i>'.repeat(Math.round(product.rating.rate))} ==> get the rating of the product from the api, then round it to the closest fixed number, then generate stars based on the number of rating
                     */
                    prodsCards += `

                <div class="prod col me-3" data-prod-id="${product.id}" data-prod-category="${product.category}">
                    <div class="product-item mb-4 d-flex flex-column">
                        <div class="prod-info d-flex flex-column mb-2 col-12">
                            <div
                                data-prod-image="${product.image}"
                                style="background: url(${product.image})"
                                class="image-container"
                            >
                                <p class="view py-2 fs-3 text-uppercase col-12" style="position: absolute; bottom: 0px" data-prod-id="${product.id}">Quick view</p>
                            </div>

                            <a class="prod-title px-2 mt-3" style="word-break: break-all" href="./../docs/product-info.html?prod_id=${product.id}"
                                >${product.title}</a
                            >
                        </div>

                        <div class="price d-flex col-12 d-flex  align-items-center justify-content-center">
                            <span class="h4 col mb-0">$${product.price}</span>
                            <div class="rating col">
                            ${'<i class="fa-solid fa-star fs-5" style="color:gold;"></i>'.repeat(Math.round(product.rating.rate))}
                            </div>
                        </div>
                    </div>
                </div>
`;
                });
                // add products fetched to the dom
                $("#prods-container").html(prodsCards);
                // Product PopUp

                // $("#prods-container").on("click", ".view", function (e) {
                //     console.log("hereeeeee");
                //     let productElement = $(this).parents(".prod"),
                //         prodImage = productElement.find(".image-container")[0].getAttribute("data-prod-image"),
                //         prodTitle = productElement.find(".prod-title")[0].textContent,
                //         prodPrice = productElement.find(".price span")[0].textContent,
                //         prodStarCount = productElement.find("i.fa-star").length;
                //     product.id = +this.getAttribute("data-prod-id");
                //     product.image = prodImage;
                //     product.title = prodTitle;
                //     product.price = +prodPrice.replace("$", "");

                //     console.log(`You Are Viewing: ${JSON.stringify(product)}`);
                //     $("#quickviewpopup .prod-qty-value").val(1);

                //     $("#quickviewpopup .modal-title").text(prodTitle);
                //     $("#quickviewpopup .modal-price").text(prodPrice);
                //     $("#quickviewpopup .modal-img").attr("data-image-src", prodImage);
                //     $("#quickviewpopup .modal-img").css("background", `url("${prodImage}")`);
                //     $("#quickviewpopup .modal-rating").html("");
                //     $("#quickviewpopup .modal-rating").append('<i class="fa-solid fa-star" style="color:gold;"></i>'.repeat(Math.round(prodStarCount)));
                //     $("#quickviewpopup").fadeIn(200, function () {
                //         console.log("in fade in");
                //     });
                // });
            })
            .catch((e) => {
                console.log("some error happend");
                console.log(e);
            });
    }

    // fetch categories in newest arrivals buttons
    $(function () {
        if (window.location.href.search("/index.html") !== -1) {
            fetch("https://fakestoreapi.com/products/categories")
                .then((response) => response.json())
                .then((categories) => {
                    let categs = "";
                    categories.forEach((category) => {
                        categs += `
            <a class="btn btn-new index-categ-button rounded-0 col-12  col-lg me-2 mb-2 mb-lg-0" role="button" data-category="${category}">${category}</a>
            `;
                    });
                    $("#categ").append(categs);

                    // select all categories button and loop on them
                    document.querySelectorAll(".index-categ-button").forEach((button) => {
                        // when any category button is clicked, do this function
                        button.addEventListener("click", function () {
                            // get the category of the clicked button from the attribute
                            $(this).siblings(".index-categ-button").removeClass("active");
                            $(this).addClass("active");
                            let category = this.getAttribute("data-category"),
                                products = document.querySelectorAll(".prod");
                            if (category === "all") {
                                products.forEach((product) => {
                                    product.style.display = "block";
                                });
                            } else {
                                products.forEach((product) => {
                                    if (product.getAttribute("data-prod-category") === category) {
                                        product.style.display = "block";
                                    } else {
                                        product.style.display = "none";
                                    }
                                });
                            }
                        });
                    });
                })
                .catch((e) => {
                    console.log("ERROR");
                    console.log(e);
                });
        }
    });

    // fixing nav in scroll
    let navbar = document.querySelector("nav");
    window.addEventListener("scroll", function () {
        if (window.scrollY > navbar.offsetHeight) {
            navbar.classList.add("fixed-top", "border-bottom", "bg-white");
            navbar.style.backgroundColor = "white";
            // document.getElementById("navbar_top").style.boxShadow = "2px 10px 4px rgb(133, 132, 132)";
            // let navbar_height = document.querySelector(".navbar").offsetHeight;
            document.body.style.paddingTop = navbar.offsetHeight + "px";
        } else {
            navbar.classList.remove("fixed-top", "border-bottom", "bg-white");
            document.body.style.paddingTop = "0";
        }
    });

    //feedback
    ("use strict");
    //  TESTIMONIALS CAROUSEL HOOK
    $("#customers-testimonials").owlCarousel({
        loop: true,
        center: true,
        items: 3,
        margin: 0,
        autoplay: true,
        dots: true,
        autoplayTimeout: 8500,
        smartSpeed: 450,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            },
            1170: {
                items: 3,
            },
        },
    });

    $(".owl-carousel").owlCarousel();
});

// fetch catecgories to products button in nav
$(function () {
    fetch("https://fakestoreapi.com/products/categories")
        .then((res) => res.json())
        .then((categories) => {
            let categorylnk = "";
            categories.forEach((category) => {
                categorylnk += `
            <li>
            <a style="text-transform: capitalize; font-weight: 550" class="border-bottom dropdown-item py-2 text-center" href="/docs/categ.html?filter=${category}">${category}</a>
            </li>
            `;
            });
            $("#cat-ul").append(categorylnk);
        })
        .catch((e) => {
            console.log("some error happend");
            console.log(e);
        });
});

// go top button
let mybutton = document.getElementById("topBtn");

if (mybutton) {
    window.onscroll = function () {
        scrollFunction();
    };
}

function scrollFunction() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

if (mybutton) {
    mybutton.onclick = function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };
}

let user = ecommerceUsers.validateLoginCookies();

$(function () {
    $(".prod-qty-remove").on("click", function () {
        let prodQty = +$(this).siblings(".prod-qty-value").val();
        {
            prodQty -= 1;
            $(this).siblings(".prod-qty-value").trigger("input", [prodQty]);
        }
    });
    $(".prod-qty-add").on("click", function () {
        let prodQty = +$(this).siblings(".prod-qty-value").val();
        prodQty += 1;
        $(this).siblings(".prod-qty-value").trigger("input", [prodQty]);
    });
    $(".prod-qty-value").on("input", function (e, prodQty) {
        {
            console.log("in trigger");
            if (!prodQty || isNaN(prodQty)) {
                console.log("in if");
                prodQty = $(this).val() == 0 || isNaN($(this).val()) ? 1 : $(this).val();
                console.log("prodQty: " + prodQty);
            }
            if (+prodQty > 999) prodQty = 999;
            else if (+prodQty < 1) prodQty = 1;

            $(this).val(+prodQty);
        }
    });
    $("#prods-container").on("click", ".view", function (e) {
        $(".add-to-cart").off("click");
        let product = {
            id: false,
            image: false,
            price: false,
            qty: false,
            title: false,
        };
        e.stopPropagation();
        let productElement = $(this).parents(".prod"),
            prodImage = productElement.find(".image-container")[0].getAttribute("data-prod-image"),
            prodTitle = productElement.find(".prod-title")[0].textContent,
            prodPrice = productElement.find(".price span")[0].textContent,
            prodStarCount = productElement.find("i.fa-star").length;
        product.id = +this.getAttribute("data-prod-id");
        product.image = prodImage;
        product.title = prodTitle;
        product.price = +prodPrice.replace("$", "");

        console.log(`You Are Viewing: ${JSON.stringify(product)}`);
        $("#quickviewpopup .prod-qty-value").val(1);
        $("#quickviewpopup .modal-title").text(prodTitle);
        $("#quickviewpopup .modal-price").text(prodPrice);
        $("#quickviewpopup .modal-img").attr("data-image-src", prodImage);
        $("#quickviewpopup .modal-img").css("background", `url("${prodImage}")`);
        $("#quickviewpopup .modal-rating").html("");
        $("#quickviewpopup .modal-rating").append('<i class="fa-solid fa-star" style="color:gold;"></i>'.repeat(Math.round(prodStarCount)));
        $("#quickviewpopup").fadeIn(200, function () {
            $(".add-to-cart").on("click", function (e) {
                e.stopPropagation();
                console.log("in add to cart");
                if (user) {
                    let newQuantity = false;
                    let qtyInput = $(this).siblings(".controls").children(".prod-qty-value");
                    let prodQty = +$(qtyInput).val(),
                        userProdList = user.cart.prodsList;
                    console.log(`Current Product: ${JSON.stringify(product)}`);
                    let isInCart = ecommerceUsers.isProdInCart(user, product);
                    console.log("Input Quantity: " + prodQty);
                    // console.log("Is In Cart: " + isInCart);
                    if (isInCart[0]) {
                        console.log("Quantity In Cart: " + isInCart[0].qty);
                        newQuantity = isInCart[0].qty + prodQty;
                        userProdList[isInCart[1]].qty = newQuantity;
                        console.log("New Quantity: " + newQuantity);
                        // console.log(product);
                    } else {
                        userProdList.push(product);
                    }
                    // console.log(product);

                    //! here!!!!!!!!!!!!!!!!!!!!!!!!!!
                    product.qty = newQuantity ? newQuantity : prodQty;
                    console.log("Prods List: " + JSON.stringify(userProdList));
                    ecommerceUsers.updateCart(user, userProdList);
                    UpdateNavCart(user.cart.prodsCount);
                } else {
                    ////// show the login popup
                    $("#exampleModalToggle2").fadeIn();
                    $("#quickviewpopup").fadeOut(0);
                }
            });
        });
    });
});
// localStorage.clear();
$(function () {
    $("#quickviewpopup .close-modal").on("click", function (e) {
        $("#quickviewpopup").fadeOut(200);
    });
});

/*

        <div id="quickviewpopup" tabindex="-1">
            <div class="modal-content product-item pe-4 d-flex flex-row col justify-content-between product rounded-0">
                <button type="button" class="btn-close close-modal" aria-label="Close"></button>
                <!-- ----------image-------- -->
                <div class="product-img modal-img col" data-prod-id="2" style="background: url('https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg')"></div>
                <!-- --------------product name ,price & rate btn------ -->
                <div class="detail justify-content-center d-flex flex-column col align-items-start ms-3">
                    <!--? product title -->

                    <h3 class="title modal-title fw-bold" style="word-break: break-all">
                        Mens Casual Premium Slim Fit T-ShirtsMens Casual Premium Slim Fit T-ShirtsMens Casual Premium Slim Fit T-ShirtsMens
                    </h3>

                    <!--? product price -->
                    <div class="d-flex align-items-center w-100 my-3">
                        <span class="prod-price fs-1 modal-price fw-bold col me-3">$22.3</span>
                        <div class="rating col d-flex justify-content-end">
                            <i class="fa-solid fa-star fs-4 text-end" style="color: gold !important"></i><i class="fa-solid fa-star fs-4 text-end" style="color: gold !important"></i
                            ><i class="fa-solid fa-star fs-4 text-end" style="color: gold !important"></i><i class="fa-solid fa-star fs-4 text-end" style="color: gold !important"></i>
                        </div>
                    </div>

                    <!--? product quantity -->

                    <div class="prod-qty d-flex w-100 flex-column">
                        <div class="controls d-flex align-items-center col-12 px-4 py-2" data-dashlane-rid="e57ed92aaa144668" data-form-type="other">
                            <i class="prod-qty-remove cell fs-4 fa-solid fa-minus border-0 p-1" data-prod-id="2"></i>
                            <input
                                type="text"
                                class="flex-grow-1 prod-qty-value text-center fw-bold border-0 fs-4 w-25"
                                data-prod-id="2"
                                value="1"
                                data-dashlane-rid="2e7cd989401b8d46"
                                data-form-type="other"
                            />
                            <i class="prod-qty-add cell fs-4 fa-solid fa-plus border-0 p-1" data-prod-id="2"></i>
                        </div>
                        <div class="button add-to-cart btn col-12 text-center py-3 rounded-0 px-4 text-uppercase mt-2" data-prod-id="2">Add to cart</div>
                    </div>
                </div>
            </div>
        </div>*/
