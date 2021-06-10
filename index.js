firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    // Signed in
    console.log('signed in')
    console.log(user)

    // build markup for sign-out button and set HTML in the header
    document.querySelector(`.sign-in-or-sign-out`).innerHTML = `
      <button class="text-blue-500 underline sign-out">Sign Out</button>
    `
    // get a reference to the sign out button
    let signOutButton = document.querySelector(`.sign-out`)

    // handle the sign out button click
    signOutButton.addEventListener(`click`, function(event) {
      // sign out of firebase authentication
      firebase.auth().signOut()

      // redirect to the home page
      document.location.href = `index.html`
    })

    // <-------RECIPE TO ADD NEW USER SEARCHES TO FIRESTORE DATABASE---------->

    // get a reference to the 'get data' button
    let getDataButton = document.querySelector(`#get-data-button`)

    // handle the clicking of the 'get data' button
    getDataButton.addEventListener(`click`, async function(event) {
    
      // prevent the default behavior (submitting the form)
      event.preventDefault()

      // get a reference to the input holding the searched location
      let locationInput = document.querySelector(`#location`)
      
      // store the user-inputted location in memory
      let location = locationInput.value 

      // create the URL for our 'create search' lambda function [NOTE: NEED TO CREATE SEPARATE LAMBDA FUNCTION FOR THIS]
      let url = `/.netlify/functions/censusdata?city=${location}`

      // fetch the URL, wait for the response, store the response in memory
      let response = await fetch(url)

      // Ask for the json-formatted data from the response, wait for the data, store it in memory
      let json = await response.json()

      // write the json-formatted data to the JS console
      // console.log(json)

      // create a variable for the locations data
      let locationsData = json

      // create reference to the HTML element we are going to append to
      let searchResults = document.querySelector(`#search-results`)

      // loop through the locations data
      for (let i=0; i < json.length; i++) {
        // store a reference to each location in memory
        let locationElement = json[i]

        // create conditional to match user-inputted location
        if (locationElement.city == location) {
          searchResults.insertAdjacentHTML(`beforeend`,`
          <h1 class="text-xl text-center">Location: ${locationElement.city}, ${locationElement.state_id}</h1>
          <h1 class="text-xl text-center">Population: ${locationElement.population}</h1>
          `)
        } else {}
  
      }
    })






  } else {
    // Signed out
    console.log('signed out')

    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: 'index.html'
    }

    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
  }
})
