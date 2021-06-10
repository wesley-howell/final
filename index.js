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

    // <-------RECIPE TO FETCH USER SEARCH FROM BACKEND---------->

    // get a reference to the 'get data' button
    let getDataButton = document.querySelector(`#get-data-button`)

    // handle the clicking of the 'get data' button
    getDataButton.addEventListener(`click`, async function(event) {
    
      // prevent the default behavior (submitting the form)
      event.preventDefault()

      // get a reference to the input holding the searched city
      let cityInput = document.querySelector(`#search-for-city`)
      let stateInput = document.querySelector(`#state`) 
      
      // store the user-inputted location in memory
      let city = cityInput.value 
      let state = stateInput.value 
      let userName = user.displayName

      // create the URL for census data API 
      // let url = `/.netlify/functions/censusdata?city=${city}`
      let url = `/.netlify/functions/censusdata`

      // fetch the URL, wait for the response, store the response in memory
      let response = await fetch(url)

      // Ask for the json-formatted data from the response, wait for the data, store it in memory
      let json = await response.json()

      // write the json-formatted data to the JS console
      // console.log(json)

      // create reference to the HTML element we are going to append to
      let searchResults = document.querySelector(`#search-results`)

      // loop through the locations data
      for (let i=0; i < json.length; i++) {
        // store a reference to each location in memory
        let locationElement = json[i]

        // create conditional to match user-inputted location
        // removed from appended html: <h1 class="text-xl font-bold text-left m-2 p-2 text-blue-800>Search Results:</h1>

        if (locationElement.city == city && locationElement.state_id == state) {
          document.querySelector(`.search-results`).innerHTML = `
          <div class="w-1/2 m-4 p-4 space-y-4 border-2 border-black rounded bg-gray-100 text-justified text-lg">
           
              <ul class = text-lg font-normal text-justified space-y-4>
                <li class="m-1">Location: ${locationElement.city}, ${locationElement.state_id}</li>
                <li class="m-1">Population: ${locationElement.population}</li>
                <li class="m-1">Median Age: ${locationElement.age_median}</li>
                <li class="m-1">% Married: ${locationElement.married}%</li>
                <li class="m-1">% College Education: ${locationElement.education_college_or_above}%</li>
                <li class="m-1">Median Household Income: $${locationElement.income_household_median}</li>
                <li class="m-1">% Home Ownership: ${locationElement.home_ownership}%</li>
                <li class="m-1">Median Home Value: $${locationElement.home_value}</li>
                <li class="m-1">Median Rent, Monthly: $${locationElement.rent_median}</li>
              </ul>
          </div>
          `
        } else {}
  
      }
    })

    // <----RECIPE TO CREATE_SEARCH (POST TO FIRESTORE DB)---->
    // NOTE: CODE MAY HAVE PROBLEMS B/C TWO SET OF CODE SUBSCRIBED TO SAME BUTTON CLICK EVENT??

    // handle the clicking of the 'get data' button
    getDataButton.addEventListener(`click`, async function(event) {
      // prevent default behavior
      event.preventDefault()

      // <---begin duplicative variables - remove if doesn't work--->
      // get a reference to the input holding the searched city
      let cityInput = document.querySelector(`#search-for-city`)
      let stateInput = document.querySelector(`#state`) 
      
      // store the user-inputted location in memory
      let city = cityInput.value 
      let state = stateInput.value 
      let userName = user.displayName
      // <---end duplicative variables. ---> 

      // create URL for 'create_search' lambda function
      let url = `.netlify/functions/create_search?userName=${user.displayName}&city=${city}&state=${state}`
 
      // fetch the URL, wait for the response, and store reponse in memory
      let response = await fetch(url)

      // refresh the page [did not add yet - how to refresh page without clearing search results]
      // location.reload()
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
