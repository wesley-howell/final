// allows us to read csv file
let csv = require('neat-csv')

// allows us to read files from disk
let fs = require('fs')

// define lambda function
exports.handler = async function(event) {
    
    // console.log(event)

    // read censusdata CSV file from disk
    let censusDataFile = fs.readFileSync(`./uscities.csv`)

    // turn the censusData file into javascript object, wait for that to happen
    let censusDataFromCsv = await csv(censusDataFile)

    //log to the backend console, to inspect file for queryStringParameters needed
    // console.log(censusDataFromCsv)

    // test for data quality. REMOVE
    let returnValue = JSON.stringify(censusDataFromCsv)

    // save reference to each relevant query string parameter in memory
    // let stateId = event.queryStringParameters.state_id
    // let city = event.queryStringParameters.city 

    // create a new object to hold the locations data
    
    // loop through all location census data
    for (let i=0; i < censusDataFromCsv.length; i++) {
        // store each location in memory
        let locationData = censusDataFromCsv[i]

        // check to see if the location matches the user's input search criteria, and if so:

        // push to the array of listings to return

    }

    return {
        statusCode: 200,
        body: returnValue
    }

}

