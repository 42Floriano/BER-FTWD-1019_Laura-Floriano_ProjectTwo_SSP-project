document.addEventListener('DOMContentLoaded', () => {


  console.log('IronGenerator JS imported successfully!');

}, false);


function myFunction() {
  var x = document.getElementById("buttonMenu");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}