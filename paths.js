let dates = require('./dates.js');

const Paths = {
    getPath: function (date) {
        return dates.getYear(date) + '/' + dates.getMonth() + '/' +  dates.getDate();
    },
    getPathSort: function (date) {
        return dates.getYear(date) + '-sort/' + dates.getMonth() + '-sort/' +  dates.getDate() + '-sort';
    }
}

module.exports = Paths;

