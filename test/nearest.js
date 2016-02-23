var OSRM = require('../');
var test = require('tape');
var berlin_path = require('./osrm-data-path').data_path;

test('nearest', function(assert) {
    assert.plan(4);
    var osrm = new OSRM(berlin_path);
    osrm.nearest({
        coordinates: [[52.4224, 13.333086]]
    }, function(err, result) {
        assert.ifError(err);
        assert.equal(result.waypoints.length, 1);
        assert.equal(result.waypoints[0].location.length, 2);
        assert.ok(result.waypoints[0].hasOwnProperty('name'));
    });
});

test('nearest: can ask for multiple nearest pts', function(assert) {
    assert.plan(2);
    var osrm = new OSRM(berlin_path);
    osrm.nearest({
        coordinates: [[52.4224, 13.333086]],
        number: 3
    }, function(err, result) {
        assert.ifError(err);
        assert.equal(result.waypoints.length, 3);
    });
});

test('nearest: throws on invalid args', function(assert) {
    assert.plan(3);
    var osrm = new OSRM(berlin_path);
    var options = {};
    assert.throws(function() { osrm.nearest(options); },
        /two arguments required/);
    assert.throws(function() { osrm.nearest(null, function(err, res) {}); },
        /first arg must be an object/);
    options.coordinates = [52.4224];
    assert.throws(function() { osrm.nearest(options, function(err, res) {}); },
        /coordinates must be an array of /);
});
