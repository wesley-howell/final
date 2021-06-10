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

      // fetch the URL, wait for the response, store the response in memory

      // refresh the page

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
