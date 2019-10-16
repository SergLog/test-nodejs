let db = require('./firebase-init.js');
let moment = require('moment');
let dates = require('./dates.js');
let fs = require('fs');
let paths = require('./paths.js');

let flightsObj = db.ref(paths.getPath(new Date()));

let ICAO;
let setOfICAO = new Set(); //set 
let fligtsArrUnique = {};

function delAll() {
    db.ref(paths.getPathSort(new Date())).set({});
}

function addObjOfDay(obj) {
    try {
        db.ref(paths.getPathSort(new Date())).push(obj);
    } catch (e) {
        fs.appendFileSync('log.txt', moment().format() + '  addFlight() function in sort-data.js. ' + e + '\n');
    }
}

flightsObj.once('value').then(function (Snapshot) {
    const res = Snapshot.val();
    for (let prop in res) {

        ICAO = res[prop].icao24;
        setOfICAO.add(ICAO);
    }

    setOfICAO.forEach(item => {
        for (let prop in res) {
            ICAO = res[prop].icao24;
            if (ICAO == item) {
                fligtsArrUnique[prop] = res[prop];
                return;
            }
        }
    })

   delAll();
   addObjOfDay(fligtsArrUnique);
})




// let flightsObjSort = db.ref(paths.getPathSort(new Date()));

// //get Array of unique objects
// flightsObjSort.once('value').then(function (Snapshot) {
//     const res = Snapshot.val();
//     let firstKey = Object.keys(res)[0];
//     let resArr = Object.values(res[firstKey]);

//     console.log(resArr);

// })