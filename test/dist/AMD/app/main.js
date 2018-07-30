define(function (require) {
    var byteData = require('../../../../dist/byte-data.es5.umd.js');
    console.log(byteData.pack(2, {bits: 16}));
});
