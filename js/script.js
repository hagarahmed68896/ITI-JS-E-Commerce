// fixing nav in scroll
document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("scroll", function () {
        if (window.scrollY > 100) {
            document.getElementById("navbar_top").classList.add("fixed-top");
            document.getElementById("navbar_top").style.backgroundColor = "white";
            navbar_height = document.querySelector(".navbar").offsetHeight;
            document.body.style.paddingTop = navbar_height + "px";
        } else {
            document.getElementById("navbar_top").classList.remove("fixed-top");
            document.body.style.paddingTop = "0";
        }
    });
});
