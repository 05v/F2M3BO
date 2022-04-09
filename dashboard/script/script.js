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

    // De meting gegevens wegschrijven naar de div                
    dataDiv.innerText = `Lokaal 0.92 Lichtsterkte: ${measurement.value3} Lux`;
}

// Date and time

function updateTime() {
    var dateInfo = new Date();

    /* time */
    var hr,
        _min = (dateInfo.getMinutes() < 10) ? "0" + dateInfo.getMinutes() : dateInfo.getMinutes(),
        sec = (dateInfo.getSeconds() < 10) ? "0" + dateInfo.getSeconds() : dateInfo.getSeconds(),
        ampm = (dateInfo.getHours() >= 12) ? "PM" : "AM";

    // replace 0 with 12 at midnight, subtract 12 from hour if 13–23
    if (dateInfo.getHours() == 0) {
        hr = 12;
    } else if (dateInfo.getHours() > 12) {
        hr = dateInfo.getHours() - 12;
    } else {
        hr = dateInfo.getHours();
    }

    const ctx = document.getElementById('mychart2').getContext("2d");


    let gradient = ctx.createLinearGradient(0, 0, 0, 400)
    gradient.addColorStop(0, 'rgba(58,123,213,1');
    gradient.addColorStop(1, 'rgba(0,210,255, 0.3)');


    const labels = [
        '6:00',
        '8:00',
        '10:00',
        '12:00',
        '14:00',
        '16:00',
        '18:00',
    ];

    const data = {
        labels,
        datasets: [{
            data: [10, 11, 15, 20, 22, 19, 15],
            label: "graden celcius",
            fill: true,
            backgroundColor: gradient,
        }]
    };

    const config = {
        type: "line",
        data: data,
        options: {
            responsive: true,
            scales: {
                y: {
                    ticks : {
                        callback: function (value){
                            return "$" + value +"m";
                        },
                    },
                },
            },
        },
    };

    const mychart2 = new Chart(ctx, config);

    
    
    var currentTime = hr + ":" + _min + ":" + sec;

    // print time
    document.getElementsByClassName("hms")[0].innerHTML = currentTime;
    document.getElementsByClassName("ampm")[0].innerHTML = ampm;

    /* date */
    var dow = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ],
        month = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],
        day = dateInfo.getDate();

    // store date
    var currentDate = dow[dateInfo.getDay()] + ", " + month[dateInfo.getMonth()] + " " + day;

    document.getElementsByClassName("date")[0].innerHTML = currentDate;
};

// print time and date once, then update them every second
updateTime();
setInterval(function() {
    updateTime()
}, 1000);

const apiZonOp_Onder = "";

const zon_op = document.getElementById("js--zon--op"); // hier komt de data
const zon_ond = document.getElementById("js--zon--onder"); // hier komt de data
console.log(zon_op)

let zonapifetch = fetch("https://api.sunrise-sunset.org/json?lat=52.370216&lng=4.895168&date=today")
    .then(function(response) {
        return response.json();
    })
    .then(function(realData) {
        zon_op.innerText = realData.results.sunrise + "- Zon Opkomst";
        zon_ond.innerText = realData.results.sunset + "- Zon Ondergang";
    });