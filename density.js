'use strict'

var turf = require('turf');

module.exports = function(data, tile, writeData, done) {
    var osm = data.osm.osm;
    var interesting = osm.features.filter(function (feature) {

        // filter for highway/road tags
        var interestedTags = {
            'trunk': true,
            'primary': true,
            'secondary': true,
            'tertiary': true,
            'unclassified': true,
            'residential': true,
            'track': true,
            'path': true,
            'motorway': true
        };

        var props = feature.properties;
        if (props.hasOwnProperty('highway')) {
            return (interestedTags[props.highway]);
        }
    });
};