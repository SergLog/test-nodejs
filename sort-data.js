let db = require('./firebase-init.js');
let moment = require('moment');
let dates = require('./dates.js');
let fs = require('fs');

let userRef = db.ref(dates.getCurDate());

let ICAO;
let setOfICAO = new Set(); //set 
let fligtsArrUnique = {};

function delAll() {
    db.ref(dates.getCurDateSorted()).set({});
}

function addObjOfDay(obj) {
    try {
        db.ref(dates.getCurDateSorted()).push(obj);
    } catch (e) {
        fs.appendFileSync('log.txt', moment().format() + '  addFlight() function in sort-data.js. ' + e + '\n');
    }
}

userRef.once('value').then(function (Snapshot) {
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
    
    //delAll();
    //addObjOfDay(fligtsArrUnique);
    //console.log(fligtsArrUnique);
})


//delAll();
//console.log((dates.getCurDateSorted));


let userRefSort = db.ref(dates.getCurDateSorted);

//get Array of unique objects
userRefSort.once('value').then(function (Snapshot) {
    const res = Snapshot.val();
    let firstKey = Object.keys(res)[0];
    let resArr = Object.values(res[firstKey]);

    
    console.log(Object.values(res[firstKey]));

})