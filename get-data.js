let axios = require('axios');
let db = require('./firebase-init.js');
let moment = require('moment');
let fs = require('fs');
let dates = require('./dates.js');
let paths = require('./paths.js');

function addFlight(obj, date) {
    try {
        //db.ref(paths.getPath(new Date())).push(obj);
        db.ref(paths.getPath(date)).push(obj);
    } catch (e) {
        fs.appendFileSync('log.txt', moment().format() + '  addFlight() function in get-data.js. ' + e + '\n');
    }
}

function delAll() {
    db.ref().set({});
}

async function isInDbCheck(callsign, date) {

    //let flightsData = db.ref(paths.getPath(new Date()));
    let flightsData = db.ref(paths.getPath(date));

    let check = await flightsData.once('value').then(function (Snapshot) {

        const res = Snapshot.val();

        if (res == null) {
            return false;
        }

        for (let prop in res) {
            if (res[prop].callsign == callsign) {
                return true;
            }
        }
    })

    return check || false;
}

let last_contact; // Unix timestamp (seconds) for the last update of the transponder

function getDataFromAPI() {
    axios
        .get(
            `https://opensky-network.org/api/states/all?lamin=55.995&lomin=37.460&lamax=56.015&lomax=37.510`
        )
        .then(response => {

            if (response.data.states !== null) {
                response.data.states.forEach((item, index, array) => {

                    last_contact = (item[4] + 3 * 60 * 60) * 1000; // ms => sec, 3 * 60 * 60 - 3 hours to get Moscow time from utc

                    if (item[13] < 1500) { //geo_altitude < 1500 meters

                        isInDbCheck(item[1].trim(), last_contact).then(res => { //isInDbCheck - check if the flight is in the database (within the day)
                            if (res == false)
                                addFlight({
                                    'icao24': item[0],
                                    'callsign': item[1].trim(),
                                    'last_contact': last_contact/1000, //unixtime + 3 hours to get Moscow time
                                    'vertical_rate': item[5],
                                    'latitude': item[6],
                                    'vertical_rate': item[11],
                                    'date': dates.getDate(last_contact),
                                    'time': dates.getTime(last_contact),
                                    'year': dates.getYear(last_contact),
                                    'month': dates.getMonth(last_contact),
                                    'day': dates.getDay(last_contact),
                                    'geo_altitude': item[13],
                                    'velocity': item[9] * 18 / 5
                                },last_contact)
                        });
                    }
                });
            }
        })
        .catch(e => {
            fs.appendFileSync('log.txt', moment().format() + ' getDataFromAPI() function. ' + e + '\n');
        });
}

delAll();
setInterval(() => getDataFromAPI(), 11000);

//console.log(dates.getDate());

//условия 1 - снижение 2 - высота 3 - область фикисрования