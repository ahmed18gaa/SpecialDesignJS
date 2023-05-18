// Check Local Storage Color
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  document
    .querySelectorAll(".option-box .colors-list li")
    .forEach((element) => {
      element.classList.remove("active");

      if (element.dataset.color === mainColors) {
        element.classList.add("active");
      }
    });
}

// Check Local Storage Background
let landingPage = document.querySelector(".landing-page");
let mainBackground = localStorage.getItem("imgs");
if (mainBackground !== null) {
  landingPage.style.backgroundImage = 'url("imgs/' + mainBackground + '")';
}

// Control Background Interval
let backgroundInterval;
// random Background Option
let backgroundOption = true;

let backgroundLocalItem = localStorage.getItem("background_option");
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// Start Setting Box
document.querySelector(".settings-box .toggle-settings .fa-gear").onclick =
  function () {
    this.classList.toggle("fa-spin");
    document.querySelector(".settings-box").classList.toggle("open");
  };

// switch color
const colorLi = document.querySelectorAll(".option-box .colors-list li");
colorLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    localStorage.setItem("color_option", e.target.dataset.color);

    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});

// switch Random Background Option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
randomBackEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

// End Setting Box

// Start Scroll Function
let navBullets = document.querySelector(".nav-bullets");
let linksDiv = document.querySelector(".links");
let counter = 0;
fetch("../links.json")
  .then((response) => response.json())
  .then((data) => {
    const data_section = [];
    const bulletText = [];
    const linkText = [];
    data.data.forEach((item) => {
      data_section.push(item.data_section);
      bulletText.push(item.bulletText);
      linkText.push(item.linkText);
      counter++;
    });
    createBullet(data_section, bulletText);
    createLinks(data_section, linkText);
  })
  .catch((error) => console.error(error));

function createBullet(data_section, bulletText) {
  for (let i = 0; i < counter; i++) {
    let bulletDiv = document.createElement("div");
    bulletDiv.className = "bullet";
    bulletDiv.setAttribute("data-section", data_section[i]);

    let tooltipDiv = document.createElement("div");
    tooltipDiv.className = "tooltip";
    tooltipDiv.innerHTML = bulletText[i];

    bulletDiv.appendChild(tooltipDiv);
    navBullets.appendChild(bulletDiv);
  }
  const allBullets = document.querySelectorAll(".nav-bullets .bullet");
  scrollToSomewhere(allBullets);
}

function createLinks(data_section, linkText) {
  for (let i = 0; i < counter; i++) {
    let li = document.createElement("li");

    let a = document.createElement("a");
    a.setAttribute("data-section", data_section[i]);
    a.innerHTML = linkText[i];

    li.appendChild(a);
    linksDiv.appendChild(li);
  }
  const allLinks = document.querySelectorAll(".links a");
  scrollToSomewhere(allLinks);
}

function scrollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
// End Nav Bullets

// Start Landing Page

let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

function randomizeImgs() {
  if (backgroundOption == true) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      landingPage.style.backgroundImage =
        'url("imgs/' + imgsArray[randomNumber] + '")';
      localStorage.setItem("imgs", imgsArray[randomNumber]);
    }, 10000);
  }
}
randomizeImgs();
// End Landing Page

// Start Skills
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  if (window.scrollY >= ourSkills.offsetTop - 200) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};
// End Skills

// Start Gallery
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";

    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    imageAlt(img, popupBox);
    imageCloseButton(popupBox);

    let popupImage = document.createElement("img");
    popupImage.src = e.target.src;
    popupBox.appendChild(popupImage);

    document.body.appendChild(popupBox);
  });
});

function imageAlt(img, popupBox) {
  if (img.alt !== null) {
    let imgHeading = document.createElement("h3");
    let imgText = document.createTextNode(img.alt);
    imgHeading.appendChild(imgText);

    popupBox.appendChild(imgHeading);
  }
}
function imageCloseButton(popupBox) {
  let closeButton = document.createElement("span");
  let closeButtonText = document.createTextNode("X");
  closeButton.appendChild(closeButtonText);
  closeButton.className = "close-button";
  popupBox.appendChild(closeButton);
}

document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});
// End Gallery