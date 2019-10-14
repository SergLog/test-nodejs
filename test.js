let axios = require('axios');
let db = require('./firebase.js');
let email = require('./email.js');

function getCurDate() {
    let date = new Date();
    let dateFormatter = new Intl.DateTimeFormat("ru");
    let curDate = dateFormatter.format(date);
    return curDate;
}

let set = new Set();

// function addFlight(obj) {
//     db.ref(getCurDate()).push(obj);
// }

function addFlight(obj) {
    db.ref('2019-10-15').push(obj);
}


function delAll() {
    db.ref('2019-10-15').set({});
}

// let date = new Date(1570708445 * 1000);
// let year = date.getFullYear();
// let month = date.getMonth();
// let day = date.getDate();

// let formattedTime = day + '.' + month + '.' + year;

let t1 = new Date(1570708347 * 1000).toUTCString();
let t2 = new Date().toUTCString();


function getJson() {
    axios
        .get(
            `https://SergLog:CellarDOOR@opensky-network.org/api/states/all?lamin=55.995&lomin=37.440&lamax=56.015&lomax=37.550`
        )
        .then(response => {
            if (response.data.states !== null) {

                //console.log(response.data.states);

                response.data.states.forEach((item, index, array) => {
                    addFlight(item);
                    //console.log(item[0] + ' ' + item[1]);
                });
            }

        })
        .catch(e => {
            //console.warn(e);            
            console.warn('1');            
            //email('get JSON from API error. Error Text: ' + e)
        });
}

setInterval(() => getJson(), 11000);

// getJson()

//delAll();