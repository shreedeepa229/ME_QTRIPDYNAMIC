import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

let adventureidobject = new URLSearchParams(search)
// console.log(idobject)
let adventure = adventureidobject.get('adventure')
// console.log(id)
  // Place holder for functionality to work in the Stubs
  return adventure;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
try {
  let detailsPromise = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`)
  let deatils =  await detailsPromise.json()
  // console.log(deatils)
  return deatils
} catch (error) {
  return null
}

  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let name = document.getElementById("adventure-name")
  let subtitle = document.getElementById("adventure-subtitle")
  let content = document.getElementById("adventure-content")
  // console.log(name)
  // console.log(subtitle)
  // console.log(content)
  name.innerHTML = adventure.name
  subtitle.innerHTML = adventure.subtitle
  content.innerHTML = adventure.content
  let imgArr = adventure.images
  // console.log(imgArr)
  imgArr.forEach(element => {
    let images = document.getElementById("photo-gallery")
    let imgEle = document.createElement("div")
    
    
    imgEle.innerHTML = `<img class = "activity-card-image" src=${element}/>`
    // console.log(imgEle)
    images.append(imgEle)
  });
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let imageShown = document.getElementById("photo-gallery")
  imageShown.innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="Important">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`
 images.forEach((element,i) => {
  let mainParent = document.getElementById("Important")
  mainParent.innerHTML += `<div class="carousel-item${i === 0 ? " active" : ""}">
  <img class ="activity-card-image" src="${element}" class="d-block w-100">
</div>`
});
    // console.log(imageShown)
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display="none"
    document.getElementById("reservation-panel-available").style.display="block"
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead
    // console.log("hi")
  }
  else{
    document.getElementById("reservation-panel-available").style.display="none"
    document.getElementById("reservation-panel-sold-out").style.display="block"
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  console.log(persons)
   let total = adventure.costPerHead*parseInt(persons)
   let totalEle = document.getElementById("reservation-cost")
   totalEle.innerHTML = `${total}`
   
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  const makeRequest = (dataObject) => {
    const url = `${config.backendEndpoint}/reservations/new`;

    return  fetch(url, {
      method: "POST",
      body: JSON.stringify(dataObject),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
  };
  
  let form = document.getElementById("myForm");
  form.addEventListener("submit", async (e) => {
    // console.log("anything", e);
    e.preventDefault();
   
     makeRequest({
        name: form.elements.name.value,
        date: form.elements.date.value,
        person: form.elements.person.value,
        adventure: adventure.id})
        .then((res) => {
          let rk= res.json();
          // console.log(rk);
          // console.log(res);
          return rk;
        }).then(data=>{console.log(data);
          alert("Success!")}).catch(err => alert("failed"))
  
     // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
})

}
//
//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
let reserve = document.getElementById("reserved-banner")
console.log(adventure)
if (adventure.reserved){
  reserve.style.display = "block"
}
else{
  reserve.style.display = "none"
}
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
