'use strict'

var TileReduce = require('tile-reduce');
var turf = require('turf');
var argv = require('minimist')(process.argv.slice(2));
var mbtilesPath = argv.mbtiles;

var opts = {
    zoom: 15,
    bbox: [68.599, 7.014, 92.461, 22.736],
    sources: [
    {
        name: 'osm',
        mbtiles: mbtilesPath,
    }
    ],
    map: __dirname+'/density.js'
};

var results = turf.featurecollection([]);

var tilereduce = TileReduce(opts);

tilereduce.on('reduce', function(result) {
    results.features = results.features.concat(result);
});

tilereduce.on('end', function(error) {
    console.log(JSON.stringify(results));
});