var mongoose = require('mongoose');
var markers = mongoose.model('marker_geo');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	//markers.find().remove().exec();
	res.render('layout_body_test', {title: 'OverHere'});
});

router.get('/ajax',function(req,res) {
	var location_list = [];
	markers.find(function(err,marker_list){
		console.log(marker_list);
		for (i in marker_list){
			location_list.push(marker_list[i]);
		}
		//console.log(location_list);
		res.send(location_list);
	});
	
});

router.get('/newLocation',function(req,res) {
	var newMarker = new markers();
	//console.log('name: ' + req.query.name);
	newMarker.lat = req.query.lat;
	newMarker.lng = req.query.lng;
	newMarker.name = req.query.name;
	newMarker.title = req.query.title;
	newMarker.save();
	res.send("complete");
});

router.post('/newLocation',function(req,res) {
	var newMarker = new markers();
	//console.log(req.body.name);
	newMarker.lat = req.body.lat;
	newMarker.lng = req.body.lng;
	newMarker.name = req.body.name;
	newMarker.title = req.body.title;
	newMarker.save();
	res.send("complete");
});

module.exports = router;
