// allows us to read csv file
let csv = require('neat-csv')

// allows us to read files from disk
let fs = require('fs')

// define lambda function
exports.handler = async function(event) {
    
    console.log(event)

    // read censusdata CSV file from disk
    let censusDataFile = fs.readFileSync(`./uscities.csv`)

    // turn the censusData file into javascript object, wait for that to happen
    let censusDataFromCsv = await csv(censusDataFile)

    //log to the backend console, to inspect file for queryStringParameters needed
    // console.log(censusDataFromCsv)

    // test for data quality. REMOVE
    let returnValue = JSON.stringify(censusDataFromCsv)

    // define variables for key stats to return in response to user search
    let totalPopulation = censusDataFromCsv.

    return {
        statusCode: 200,
        body: `Hello from the back end!`
    }

}

