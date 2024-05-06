let header = document.getElementById("header");
let goToTop_arrow = document.getElementById("goToTop");

// on scroll - hide header/ show arrow
window.onscroll = () => {
  if (window.scrollY > 200) {
    header.style.top = "-200px";
    goToTop_arrow.style.width = "50px";
  } else {
    header.style.top = "0px";
    goToTop_arrow.style.width = "0px";
  }
};

// when click on arrow scroll to top
addEventListener("click", () => {
  window.scrollTo({
    top: "0",
  });
});
