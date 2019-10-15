let dates = require('./dates.js');

const Paths = {
    getPath: function (date) {
        return dates.getYear(date) + '/' + dates.getMonth() + '/' +  dates.getDate();
    }
}

module.exports = Paths;