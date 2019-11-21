document.addEventListener('DOMContentLoaded', () => {


  console.log('IronGenerator JS imported successfully!');

}, false);


function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}


let slideIndex = 0;
carousel();

function carousel() {
  let i;
  let x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {slideIndex = 1}
  if (x[slideIndex-1]) {
    x[slideIndex-1].style.display = "block";
  }
  setTimeout(carousel, 2000); // Change image every 2 seconds
}