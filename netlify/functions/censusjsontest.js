// create URL to call census data web page
let url = `https://data.census.gov/cedsci/table?q=evanston,%20il&tid=ACSDP1Y2019.DP05&hidePreview=true&moe=false&tp=false`

// fetch URL, wait for a response, store response in memory
let response = await fetch(url)

// ask for json-formatted data from the response, wait for the data, store it in memory
let json = await response.json()

// write the json-formatted data to the javascript console
console.log(json)
