// Global
$("body").append(`
    <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel">
        <div class="offcanvas-header d-flex justify-content-between shawdow-bottom">
            <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel" onclick="goTo('about')">
                Chariya
            </h5>
            <button type="button" class="show-offcanvas show" data-bs-dismiss="offcanvas" aria-label="Close">
                <i class="bx bx-x fs-1"></i>
            </button>
        </div>
        <div class="offcanvas-body">
            <ul class="list-unstyled m-0 p-0 offcanvas-content"></ul>
        </div>
    </div>`);

$("#header").html(
    `<nav class="navbar navbar-expand-lg">
        <div class="container-lg container-fluid">
            <a  onclick="goTo('index')" class="navbar-brand fs-1 fw-bold">
                <small>Chakriya</small>
            </a>
            <div class="profile">
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav"></ul>
                </div>
                <div class="option">
                    <button type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions"
                        aria-controls="offcanvasWithBothOptions" class="show-offcanvas">
                        <i class="bx bx-menu"></i>
                    </button>
                </div>
            </div>
        </div>
    </nav>`
);

const navigateItems = [
    {
        name: "home",
        url: "index",
    },
    {
        name: "gallery",
        url: "gallery",
    },
    {
        name: "about me",
        url: "about",
    },
];

let link = "";

navigateItems.map((item) => {
    let currentPage = window.location.pathname
        .split("/view/")
        .filter((item) => item !== "")[1];
        currentPage = currentPage === "" ? "index" : currentPage.replace(".html", "");
    let active = item.url === currentPage ? "active" : "";
    link += `<li class="nav-item">
                <a onclick="goTo('${item.url}')"  class="text-capitalize nav-link ${active}" aria-current="page">${item.name}</a>
            </li>`;
});

$(".offcanvas-content").html(link);

$("#footer footer ul").html(link);

link += ` <li className="nav-item">
            <a onclick="goTo('about')"> 
                <div class="profile-image">
                    <img src="../public/gallery/profile-icon.png" class='w-100' alt="" />
                </div>
            </a>
        </li>`;

$("#navbarNav .navbar-nav").html(link);

function goTo(url) {
    window.location.href = `../view/${url}.html`;
}

var random = new Chance();
// End Global

// Index Page
// each($("p.photo-description").text(random.sentence()));
$("h5.photo-title").each(function () {
    $(this).text(random.city());
});
$("p.photo-description").each(function () {
    $(this).text(random.sentence());
});
// End Index Page

// Gallery Page
$(document).ready(function () {
    $(".collection img,div img").click(function () {
        let img = $(this).attr("src");
        img = img.replace("../public/gallery/", "");
        window.location.href = `../view/view.html?item=${img}`;
    });

    let getImageParam = window.location.search;

    if (getImageParam != "" && getImageParam.split("?item=")) {
        let getImage = getImageParam.split("?item=")[1];
        $("#view-image").attr("src", `../public/gallery/${getImage}`);
    }
});

// View Page
$("#title").text(random.sentence());
$("#paragraph").text(random.paragraph());
$("#location").text(random.city());
$("#takedate").text(random.timestamp());

let reContent = `<div class="col-12">`;
for (let rw = 0; rw < 5; rw++) {
    let stars = "";
    for (let star = 0; star < random.integer({ min: 1, max: 5 }); star++) {
        stars += `
            <li>
                <i class='bx bxs-star'></i>
            </li>`;
    }
    reContent += `<div class="col-12  py-2">
        <div class="d-flex justify-content-start border-bottom py-2">
            <div class="r-profile">
                <img src="../public/gallery/profile-icon.png" width="100%" alt="">
            </div>
            <div class="r-content">
                <h4 class="r-name">${random.name()}</h4>
                <h6 class="r-date">${random.date()}</h6>
                <ul class="list-unstyled d-flex m-0">
                    ${stars}
                </ul>
                <h6 class="r-sentence">${random.sentence()}</h6>
            </div>
        </div>
    </div>`;
}
$(".review-container").html(reContent);
// End View
