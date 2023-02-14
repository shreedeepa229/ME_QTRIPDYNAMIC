
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
const params = new URLSearchParams(search)
const cityid = params.get('city')
// console.log(cityid)
return cityid
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let citiesPromise = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    let citiesdata = await citiesPromise.json();
    // console.log(citiesdata)
    return citiesdata;
   }catch(error){
    return null
   }
  

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach(element => {
   
    let id = element.id
    let category = element.category
    let image = element.image
    let name = element.name
    let costPerHead = element.costPerHead
    let duration = element.duration
    // console.log(duration )

    let childEle = document.createElement("div")
    childEle.className = "col-6 col-lg-3 mb-4";
    childEle.style.position="relative";
    childEle.innerHTML = `<a href="detail/?adventure=${id}" id="${id}">
                          <div class="category-banner" style:"postion:absolute">${category}</div>
                          <div  class="activity-card ">
                              <img class="card-img-top" src=${image} alt=${name}/>
                              <div class= "p-3 text-center text-lg-start w-100" >
                                <div class="d-lg-flex justify-content-between">
                                  <h6 class="card-tile">${name}</h6>
                                  <p class="card-text">₹ ${costPerHead}</p>
                                </div>
                                <div class="d-lg-flex justify-content-between mt-2">
                                  <h6>Duration</h5>
                                  <p class="mb-0">${duration} hours</p>
                                </div>
                              </div>
                            </div>
                            </a>
                         `
   document.getElementById("data").append(childEle)
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
      
      let number = list.filter(element => 
        element.duration > Number(low) &&
        element.duration <= Number(high))
       
       console.log(number)
        return number
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  const newArr = [];
  for(let i=0;i<list.length;i++){
     for(let j=0;j<categoryList.length;j++){
      if(list[i].category===categoryList[j]){
        newArr.push(list[i])
      }
     }
}
// console.log(newArr)
return newArr
}
// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let newDuration = filters.duration
  let newCategory = filters.category
  const array = newDuration.split("-")
  let number1 = array[0]
  let number2 = array[1]
  let filteredList =[];
  // console.log(array)
  if(newCategory.length!=0 && newDuration=="") {
     filteredList = filterByCategory(list,newCategory)
  }else if(newDuration!="" && newCategory.length==0){
   filteredList = filterByDuration(list,number1,number2)
  } else if(newCategory.length!=0 && newDuration!=""){
    let newlistDuration =  filterByDuration(list,number1,number2);
    let newlistcategory = filterByCategory(list,newCategory);
    for(let i=0;i<newlistDuration.length;i++){
      for(let j=0;j<newlistcategory.length;j++){
        if(newlistDuration[i].category===newlistcategory[j].category && (newlistDuration[i].duration===newlistcategory[j].duration)){
          filteredList.push(newlistDuration[i]);
        }
      }
    }
    } else{
      filteredList = list;
    }
  
 
  // Place holder for functionality to work in the Stubs
  console.log(filteredList);
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
    localStorage.setItem('filters',JSON.stringify(filters))
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(localStorage.getItem('filters'))

  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let durationElement = document.getElementById("duration-select");
  let optionsEle = durationElement.options;
  for(let i = 0; i < optionsEle.length; i++){
    if(optionsEle[i].value == filters.duration){
      optionsEle.selectedIndex = i;
    }
  }
  
  let categoryVar = filters.category
  console.log( categoryVar)
  let element = document.getElementById("category-list")
  for(let i=0;i<categoryVar.length;i++){
  element.innerHTML += `
                        <div class= category-filter>${categoryVar[i]}</div>
  `
  }  
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
