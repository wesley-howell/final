// allows us to read csv file
let csv = require('neat-csv')

// allows us to read files from disk
let fs = require('fs')

// define lambda function
exports.handler = async function(event) {
    
    // read censusdata CSV file from disk
    let censusDataFile = fs.readFileSync(`./censusData.csv`)

    // turn the censusData file into javascript object, wait for that to happen
    let censusDataFromCsv = await csv(censusDataFile)

    //log to the backend console, to inspect file for queryStringParameters needed
    console.log(censusDataFromCsv)

    // return for lambda function
    return {
        statusCode: 200,
        body: `census data will appear here`
    }


}