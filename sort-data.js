let db = require('./firebase-init.js');
let dates = require('./dates.js');
let fs = require('fs');


let date = '2019/10/30-10-2019';


let flightsObj = db.ref(date);


flightsObj.once('value').then(function (Snapshot) {

    let res = Snapshot.val();
    console.log(Object.values(res).length);

})

// })