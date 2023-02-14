import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
      let reservationPromise = await fetch(`${config.backendEndpoint}/reservations/`)
      let reservationData = await reservationPromise.json()
  // Place holder for functionality to work in the Stubs
      return reservationData;
    }catch(e){
        return null
              }

}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
      if(reservations.length===0){
        document.getElementById("no-reservation-banner").style.display="block"
        document.getElementById("reservation-table-parent").style.display="none"
      }
      else{
        document.getElementById("no-reservation-banner").style.display="none"
        document.getElementById("reservation-table-parent").style.display="block"
        reservations.forEach(reservations => {
          
          let date = new Date(`${reservations.date}`).toLocaleDateString("en-IN")
          let time = new Date (`${reservations.time}`)
          .toLocaleString("en-IN",{day:"numeric",month:"long",year:"numeric",hour:"numeric",minute:"numeric",second:"numeric"})
          .replace( " at",",")
          let rowEle = document.getElementById("reservation-table")
          let eachRow = document.createElement("tr")
          eachRow.innerHTML +=   `<td >${reservations.id}</td>
                                  <td >${reservations.name}</td>
                                  <td >${reservations.adventureName}</td>
                                  <td >${reservations.person}</td>
                                  <td >${date}</td>
                                  <td >${reservations.price}</td>
                                  <td >${time}</td>
                                  <td ><button type="button" class="reservation-visit-button" id="${reservations.id}" >
                                  <a href="../detail/?adventure=${reservations.adventure}">Visit Adventure</a>
                                  </button></td>`
          rowEle.append(eachRow)
        });
      }
  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
