let moment = require('moment');

moment.locale('nl'); // Google Firebase doesn`t accept date like '18.10.2019'. It accepts 18-10-2019.

const datesSet = {

    subtract2Hours: function (date) { // 2 hours - to get Moscow time (from Surgut)
        return moment(date).subtract(2, 'hours');
    },
    getTime: function (date) {
        return (this.subtract2Hours(moment(date))).format('LTS');
    },
    getDate: function (date) {
        return (this.subtract2Hours(moment(date))).format('L');
    },
    getDay: function (date) {
        return (this.subtract2Hours(moment(date))).format('D');
    },
    getMonth: function (date) {
        return (this.subtract2Hours(moment(date))).format('M');
    },
    getYear: function (date) {
        return (this.subtract2Hours(moment(date))).format('YYYY');
    },
    getDateSorted: function (date) {
        return (this.subtract2Hours(moment(date))).format('L') + '-sort';
    }

}

module.exports = datesSet;