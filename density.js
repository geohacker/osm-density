'use strict'

var turf = require('turf');
var tilebelt = require('tilebelt');

module.exports = function(data, tile, writeData, done) {
    var osm = data.osm.osm;
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
        'motorway': true,
        'trunk_link': true,
        'primary_link': true,
        'secondary_link': true,
        'tertiary_link': true
    };

    var interestingFeatures = osm.features.filter(function (feature) {
        var props = feature.properties;
        if (props.hasOwnProperty('highway')) {
            return (interestedTags[props.highway]);
        }
    });

    var tileFeature = {
        'type': 'Feature',
        'properties': {}
    };

    tileFeature.geometry = tilebelt.tileToGeoJSON(tile);
    var density = interestingFeatures.length || 0;
    tileFeature.properties['density'] = density;
    // writeData(JSON.stringify(tileFeature));
    done(null, tileFeature);
};