let moment = require('moment');

moment.locale('nl'); // Google Firebase doesn`t accept date like '18.10.2019'. It accepts 18-10-2019.

const datesSet = {

    getTime: function (date) {
        return (moment.utc(date)).format('LTS');
    },
    getDate: function (date) {
        return (moment.utc(date)).format('L');
    },
    getDay: function (date) {
        return (moment.utc(date)).format('D');
    },
    getMonth: function (date) {
        return (moment.utc(date)).format('M');
    },
    getYear: function (date) {
        return (moment.utc(date)).format('YYYY');
    }

}

module.exports = datesSet;

// console.log(datesSet.getDate(1571829517*1000));
// console.log(datesSet.getTime(1571829517*1000));

// console.log(datesSet.getDate(1571829517*1000));
// console.log(datesSet.getTime(1571829517*1000));


//console.log(datesSet.getTime(1571842881*1000));

//console.log(moment(1571842881*1000).format());