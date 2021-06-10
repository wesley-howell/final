// note: reference logic from wk9 lecture, create_posts.js

// goal: provide a function to log a new user-generated search in firebase

// allows us to use firebase
let firebase = require(`./firebase`)
 
// define the lambda function
exports.handler = async function(event) {

     console.log(event) 
     

    // get the necessary query string parameters and store in memory
    let userName = event.queryStringParameters.userName
    let state = event.queryStringParameters.state
    let city = event.queryStringParameters.city 


    // establish a connection to firebase in memory
    let db = firebase.firestore()

    // create new post to firestore db for new user search
    await db.collection('searches').add({
        userName: userName,
        state: state,
        city: city,
        created: firebase.firestore.FieldValue.serverTimestamp()
    })

    return {
        statusCode: 200
    }
}