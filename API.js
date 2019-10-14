let axios = require('axios');
let db = require('./firebase.js');
let moment = require('moment');

//let userRef = db.ref(getCurDate().toString());
let userRef = db.ref('2019-10-15');
//console.log(userRef);

let setOfICAO = new Set();

let ICAO;

let fligtsArrUnique = [];

userRef.once('value').then(function (Snapshot) {
    const res = Snapshot.val();
    for (let prop in res) {
        ICAO = res[prop][0];
        setOfICAO.add(ICAO);
    }

    setOfICAO.forEach(item => {
        for (let prop in res) {
            ICAO = res[prop][0];
            if (ICAO == item){
                fligtsArrUnique.push({ [prop] : res[prop]} )
                return;
            }
        }
    })

    //console.log(fligtsArrUnique.length);
   // console.log(fligtsArrUnique[0]);

})

function getCurDate() {
    let date = new Date();
    let dateFormatter = new Intl.DateTimeFormat("ru");
    let curDate = dateFormatter.format(date);
    return curDate;
}


// //date to Unix Timestamp 
// console.log(Math.floor(new Date() / 1000));

// //Unix Timestamp to Date
// console.log(new Date(1570708445 * 1000));


function getCurDate() {
    let date = new Date();
    let dateFormatter = new Intl.DateTimeFormat("ru");
    let curDate = dateFormatter.format(date);
    return curDate;
}

//console.log(getCurDate());

moment.locale('ru');
console.log(moment(new Date()).format('L'));
console.log(moment(new Date(1571054279 * 1000)).format('L'));

