// goal: create a lambda function to log the statistical data fields accompanying each user-generated search, to the firestore database

// allows us to use firebase
let firebase = require(`./firebase`)
 
// define the lambda function
exports.handler = async function(event) {

    // get the necessary query string parameters and store in memory
    let userName = event.queryStringParameters.user.displayName
    let state = event.queryStringParameters.state
    let city = event.queryStringParameters.city

    // create the URL for census data API 
    let url = `/.netlify/functions/censusdata`

    // fetch the URL, wait for the response, store the response in memory
    let response = await fetch(url)

    // Ask for the json-formatted data from the response, wait for the data, store it in memory
    let json = await response.json()

    // create an empty object to hold the returned location data
    // let locationElementToReturn = {
    //    city: (),
    //    state: (),
    //    population: ()
    //}

    // loop through the locations data
    for (let i=0; i < json.length; i++) {
        // store a reference to each location in memory
        let locationElement = json[i]

        // create conditional to match user-inputted city and state

        if (locationElement.city == city && locationElement.state_id == state) {
            // and add the matching location element to locationElementToReturn object (then to be added to firestore)
            let cityToReturn = locationElement.city
            let stateToReturn = locationElement.state_id
            let populationToReturn = locationElement.population

        } else {}  
    }

    // establish a connection to firebase in memory
    let db = firebase.firestore()

    // create new post to firestore db for new user search
    await db.collection('locations').add({
        city: cityToReturn,
        state: stateToReturn,
        population: populationToReturn,
        created: firebase.firestore.FieldValue.serverTimestamp()
    })

    return {
        statusCode: 200
    }
}