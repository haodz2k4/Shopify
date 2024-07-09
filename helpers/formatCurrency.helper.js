const numeral = require('numeral');

module.exports.formatCurrency = (amount) => {
  return numeral(amount).format('0,0') + ' ₫';
};