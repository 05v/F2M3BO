<<<<<<< HEAD
"use strict"
const timeDelay = 10000; // time delay refresh data
let refreshTimer = window.setInterval(renderData, timeDelay); // timer data opvragen van server

// jouw persoonlijke URL
const mijnDataURL = "https://data.softwaredeveloper.amsterdam/api/device/04799dfc/latest";

const dataDiv = document.getElementById("dataDiv"); // hier komt de data

async function getSensorData() {
    let url = mijnDataURL;
    try {
        let response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderData() {
    let measurementRaw = await getSensorData();
    let measurement = measurementRaw.data[0];
    console.log(measurement);

    // Nieuwe Javascript date maken met de de datum en tijd van de meting
    let datum = new Date(measurement.datum);

    // De meting gegevens wegschrijven naar de div                
    dataDiv.innerText = `${measurement.value3}`;
}

renderData(); // start immediately
=======
var today = new Date();
var day = today.getDay();
var daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
 
document.getElementById("displayDateTime").innerHTML = dateTime + ' <br> Day : ' + daylist[day];
>>>>>>> fb168ac8b56c58060e485a8a6fa330e20715e330
