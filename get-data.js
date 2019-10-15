let axios = require('axios');
let db = require('./firebase-init.js');
let moment = require('moment');
let fs = require('fs');
let dates = require('./dates.js');
let paths = require('./paths.js');

function addFlight(obj) {
    try {
        db.ref(paths.getPath(new Date())).push(obj);
    } catch (e) {
        fs.appendFileSync('log.txt', moment().format() + '  addFlight() function in get-data.js. ' + e + '\n');
    }
}

function delAll() {
    db.ref().set({});
}

let last_contact; // Unix timestamp (seconds) for the last update of the transponder

function getDataFromAPI() {
    axios
        .get(
            `https://opensky-network.org/api/states/all?lamin=55.995&lomin=37.440&lamax=56.015&lomax=37.550`
        )
        .then(response => {
            if (response.data.states !== null) {
                response.data.states.forEach((item, index, array) => {
                    last_contact = new Date(item[4] * 1000);
                    addFlight({
                        
                        'icao24': item[0],
                        'last_contact': item[4],
                        'date' : dates.getDate(last_contact),
                        'time': dates.getTime(last_contact),
                        'year' : dates.getYear(last_contact),
                        'month': dates.getMonth(unlast_contactixTime),
                        'day' : dates.getDay(last_contact),
                        'geo_altitude': item[13],
                        'velocity': item[9] * 18 / 5
                    });
                });
            }
        })
        .catch(e => {
            fs.appendFileSync('log.txt', moment().format() + ' getDataFromAPI() function. ' + e + '\n');
        });
}

delAll();
setInterval(() => getDataFromAPI(), 11000);