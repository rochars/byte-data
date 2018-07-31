define(function (require) {
  try {
  	var byteData = require('../../../../dist/byte-data.umd.js');
  	console.log(byteData.pack(2, {bits: 16}));
  	document.write('OK');
  } catch (err) {
   	document.write('ERROR');
  }
});
