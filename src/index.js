const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";
// Initialize an empty array to store dog breeds
let breeds = [];

// When the DOM content is loaded, execute the following functions
document.addEventListener("DOMContentLoaded", function () {
  loadImages();
  loadBreedOptions();
});

// Fetch random dog images and display them
function loadImages() {
  fetch(imgUrl)
    .then((res) => res.json())
    .then((results) => {
      results.message.forEach((image) => addImage(image));
    });
}

// Add a dog image to the specified container
function addImage(dogPicUrl) {
  let container = document.querySelector("#dog-image-container");
  let newImageEl = document.createElement("img");
  newImageEl.src = dogPicUrl;
  container.appendChild(newImageEl);
}

// Fetch all dog breeds and populate the breed list
function loadBreedOptions() {
  fetch(breedUrl)
    .then((res) => res.json())
    .then((results) => {
      breeds = Object.keys(results.message);
      updateBreedList(breeds);
      addBreedSelectListener();
    });
}

// Update the breed list based on the selected letter
function updateBreedList(breeds) {
  let ul = document.querySelector("#dog-breeds");
  removeChildren(ul);
  breeds.forEach((breed) => addBreed(breed));
}

// Remove all child elements from a given parent element
function removeChildren(element) {
  let child = element.lastElementChild;
  while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
}

// Filter and display breeds starting with a specific letter
document.addEventListener("DOMContentLoaded", () => {
  function filterBreedsByLetter(letter) {
    let filteredBreeds = breeds.filter((breed) => breed.startsWith(letter));
    updateBreedList(filteredBreeds);
  }
  // Add event listener to the dropdown element
  document
    .querySelector("#breed-dropdown")
    .addEventListener("change", function (event) {
      let selectedLetter = event.target.value;
      filterBreedsByLetter(selectedLetter);
    });
});

// Add a breed to the list with click event to update color
function addBreed(breed) {
  let ul = document.querySelector("#dog-breeds");
  let li = document.createElement("li");
  li.innerText = breed;
  li.style.cursor = "pointer";
  ul.appendChild(li);
  li.addEventListener("click", updateColor);
}

// Update the color of a clicked breed
function updateColor(event) {
  event.target.style.color = "palevioletred";
}
