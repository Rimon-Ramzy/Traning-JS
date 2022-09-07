// check if there's local storage color option
let mainColors = localStorage.getItem('color-option')
if (mainColors !== null) {
  document.documentElement.style.setProperty('--main-color', mainColors);
  // check for active class
  // remove all active class from li
  document.querySelectorAll(".color-list li").forEach(el => {
    el.classList.remove("active")
    // add active class on target li
    if (el.dataset.color === mainColors) {
      el.classList.add("active")
    }
  })
}





let landingPage = document.getElementById("landing")
let settingsBox = document.querySelector(".settings-box")
let gearBox = document.querySelector(".gear-box")
let gear = document.querySelector(".gear-box .fa-gear")


let chooseBgImage = document.querySelectorAll(".choose-bg img")


// change background image
let arrayOfBgImages = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"]

// random background option
let backgroundOption = true;




// Check if there's local storage random background
let backgroundLocalItem = localStorage.getItem("background_option")

// check local storage random background is empty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true
  } else {
    backgroundOption = false
  }
  // rempve active class from all spans
  document.querySelectorAll(".random-background span").forEach(el => {
    el.classList.remove("active")
  })
  // add active class to active span
  if (backgroundLocalItem === "true") {
    document.querySelector(".random-background .yes").classList.add("active");

  } else {
    document.querySelector(".random-background .no").classList.add("active")
  }
}




let chooseBgLocal = localStorage.getItem("choise_background")
if (chooseBgLocal !== null) {
  landingPage.style.backgroundImage = `url(${localStorage.getItem("choise_background")})`
  chooseBgImage.forEach(img => {
    if (img.src === chooseBgLocal) {
      img.classList.add("active")
    }
  })
}



// variable to control the interval
let bgInterval;

// function to randomize imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    // get random number
    bgInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * arrayOfBgImages.length)
      landingPage.style.backgroundImage = `url('./../images/${arrayOfBgImages[randomNumber]}')`
    }, 5000)
  }
}

randomizeImgs()

// settings gear
gearBox.addEventListener('click', () => {
  gear.classList.toggle("fa-spin");
  settingsBox.classList.toggle("opened");
})


// switch colors
const colorsLi = document.querySelectorAll(".color-list li")
colorsLi.forEach(li => {
  li.addEventListener("click", (e) => {
    // set color on root
    document.documentElement.style.setProperty('--main-color', e.target.dataset.color)
    // set color on local storage
    localStorage.setItem("color-option", e.target.dataset.color)
    hundleAcive(e)
  })
})




// switch random background option
const randomBackgroundElement = document.querySelectorAll(".random-background span")
//loop on all spans
randomBackgroundElement.forEach(span => {
  span.addEventListener("click", (e) => {
    hundleAcive(e)
    if (e.target.dataset.background === 'yes') {
      backgroundOption = true;
      localStorage.setItem("background_option", true)
      randomizeImgs()
      document.querySelectorAll(".choose-bg .active").forEach(el => {
        el.classList.remove("active")
      })
    } else {
      backgroundOption = false;
      clearInterval(bgInterval);
      localStorage.setItem("background_option", false)
    }
  })
})




// choose one background
chooseBgImage.forEach(img => {
  img.addEventListener('click', function (e) {
    document.querySelectorAll(".active").forEach(el => {
      el.classList.remove("active")
    })
    e.target.classList.add("active")
    landingPage.style.backgroundImage = `url(${e.target.src})`
    backgroundOption = false;
    clearInterval(bgInterval);
    localStorage.setItem("background_option", false)
    document.querySelector(".random-background .no").classList.add("active")
    document.querySelector(".random-background .yes").classList.remove("active")
    localStorage.setItem("choise_background", e.target.src)
    console.log(localStorage.getItem("choise_background"));
  })
})




// Skills Section
let skillsSection = document.getElementById("skills")
window.addEventListener("scroll", () => {
  // Skills Offset Top
  let offsetTop = skillsSection.offsetTop

  // Skills Outer Height
  let outerHeight = skillsSection.offsetHeight

  // Window Height
  let windowHeight = this.innerHeight;

  // Window Scroll Top
  let windoSrollTop = this.pageYOffset;

  if (windoSrollTop > (outerHeight + offsetTop - windowHeight)) {
    let allSkills = document.querySelectorAll(".skill-progress span")
    allSkills.forEach(skill => {
      skill.style.width = skill.dataset.progress;
      skill.innerHTML = skill.dataset.progress
    })
  }
})




// Gallery Section
let ourGallery = document.querySelectorAll("#gallery img")

ourGallery.forEach(img => {
  img.addEventListener("click", (e) => {
    console.log(e.target.src);
    // Create Overlay Element
    let overlay = document.createElement("div")
    overlay.className = "popup-overlay"
    document.body.appendChild(overlay)
    // Create Popup
    let popupBox = document.createElement("div")
    popupBox.className = "popup-box"
    let popupImg = document.createElement("img")
    popupImg.src = e.target.src
    popupBox.appendChild(popupImg)
    document.body.appendChild(popupBox)
    if (e.target.alt != null) {
      let imageHeading = document.createElement("h3")
      let headingText = document.createTextNode(e.target.alt)
      imageHeading.appendChild(headingText)
      popupBox.prepend(imageHeading)
    }
    // Create The Close Icon
    let closeIcon = document.createElement("i");
    closeIcon.classList.add("fa-solid", "fa-circle-xmark", "close-icon")
    popupBox.appendChild(closeIcon)
  })
})
// Close Popup
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-icon")) {
    e.target.parentElement.remove();
    document.querySelector(".popup-overlay").remove()
  }
})



// Go To Section
let sectionsElement = document.querySelectorAll(".nav-bullets")
let sectionsElement2 = document.querySelectorAll(".navBar")
let bulletElement = document.querySelectorAll("#navigation-bullets .bullet")
let navElement = document.querySelectorAll(".links a")

let arrOfSection = []
sectionsElement.forEach(section => {
  arrOfSection.push(section.dataset.section)
})
let arrOfSection2 = []
sectionsElement2.forEach(section => {
  arrOfSection2.push(section.dataset.section)
})

function moveToSection(element, arrOfSection) {
  element.forEach(ele => {
    ele.addEventListener("click", e => {
      e.preventDefault();
      for (let i = 0; i < arrOfSection.length; i++) {
        if (e.target.dataset.section === arrOfSection[i]) {
          let moveSection = document.getElementById(arrOfSection[i])
          moveSection.scrollIntoView({
            behavior: "smooth",
          })
        }
      }
    })
  })
}
moveToSection(bulletElement, arrOfSection)
moveToSection(navElement, arrOfSection2)



// Show Navigation Bullets
let bulletsContainer = document.getElementById("navigation-bullets")
let showButton = document.querySelectorAll(".nav-bullets-choise span")
let showBulletsLocal = localStorage.getItem("show-bullets")

if (showBulletsLocal != null) {
  showButton.forEach(span=>{
    span.classList.remove("active")
  })
  if (showBulletsLocal === "show") {
    bulletsContainer.style.display = "block";
    document.querySelector(".nav-bullets-choise span.show").classList.add("active")
  }else {
    bulletsContainer.style.display = "none";
    document.querySelector(".nav-bullets-choise span.hide").classList.add("active")
  }
}

showButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.dataset.nav === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("show-bullets","show")
    } else {
      bulletsContainer.style.display = "none"
      localStorage.setItem("show-bullets","hide")
    }
    hundleAcive(e)
  })
})



// Reset Button
document.querySelector(".reset").addEventListener("click",()=>{
  localStorage.removeItem("background_option")
  localStorage.removeItem("color-option")
  localStorage.removeItem("show-bullets")
  localStorage.removeItem("choise_background")
  window.location.reload()
})





// NavBar For Small Devices
let toggleBtn = document.querySelector(".links-container .bars");
let menuLinks = document.querySelector(".links-container .links")
toggleBtn.addEventListener("click",()=>{
})
toggleBtn.onclick = function(){
  this.classList.toggle("menu-active")
  menuLinks.classList.toggle("open")
}

// Click AnyWhere OutSide Menu To Close It
document.addEventListener("click",(e)=>{
  // console.log(e.target);
  if (e.target != toggleBtn && e.target != menuLinks) {
    // Check If Class Open
    if (menuLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active")
      menuLinks.classList.toggle("open")
    }
  }
})
// Stop Promagation On Menu
menuLinks.addEventListener("click",(e)=>{
  e.stopPropagation();
})










// Handle Active Function
function hundleAcive(ev) {
  // remove all active class from li
  ev.target.parentElement.querySelectorAll(".active").forEach(el => {
    el.classList.remove("active")
  })
  // add active class on target li
  ev.target.classList.add("active")
}