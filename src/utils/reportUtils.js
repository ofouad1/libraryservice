const { Parser } = require('json2csv');
const xlsx = require('xlsx');

const convertToCSV = (data) => {
    const parser = new Parser();
    return parser.parse(data);
};

module.exports = {
    convertToCSV
};
