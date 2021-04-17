const fetch = require("node-fetch")
//https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
//https://maps.googleapis.com/maps/api/geocode/outputFormat?parameters
const URL = "https://maps.googleapis.com/maps/api/geocode/json?"
const API_KEY = process.env["GOOGLE_MAP_API_KEY"]

const getGeoLocationForAddress = async (address) => {
    const endPoint = `${URL}address=${address}&key=${API_KEY}`
    let response = await fetch(endPoint, {
        method : "GET"
    })
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
}

module.exports = {getGeoLocationForAddress}