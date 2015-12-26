'use strict'

var TileReduce = require('tile-reduce');
var turf = require('turf');
var argv = require('minimist')(process.argv.slice(2));
var mbtilesPath = argv.mbtiles;

var opts = {
    zoom: 12,
    bbox: [72.334, 7.068, 89.539, 16.973],
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