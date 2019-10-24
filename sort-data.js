let db = require('./firebase-init.js');
let dates = require('./dates.js');


let date = '2019/10/23-10-2019';


let flightsObj = db.ref(date);


flightsObj.once('value').then(function (Snapshot) {

    const res = Snapshot.val();

    //console.log(Object.values(res).reduce((acc, c) => acc + c.velocity, 0) / Object.values(res).length);
    //console.log(Object.values(res).reduce((acc, c) => acc + c.geo_altitude, 0) / Object.values(res).length);

    let timeMin = "2019-10-23 15:52:00";
    let timeMax = "2019-10-23 16:52:59";

    sortedArr = Object.values(res).filter(item => {
        return ((item.last_contact > convertTimeToUnixTtme(timeMin)) && (item.last_contact < convertTimeToUnixTtme(timeMax)))
    })

    console.log(sortedArr.length);

})

function convertTimeToUnixTtme(datetme) {
    return Math.round(new Date(datetme).getTime() / 1000.0) + 3 * 60 * 60;
}





// let flightsObjSort = db.ref(paths.getPathSort(dates.getDate()));

// //get Array of unique objects
// flightsObjSort.once('value').then(function (Snapshot) {
//     const res = Snapshot.val();
//     let firstKey = Object.keys(res)[0];
//     let resArr = Object.values(res[firstKey]);

//     console.log(resArr);

// })