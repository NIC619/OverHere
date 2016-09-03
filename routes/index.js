var mongoose = require('mongoose');
var markers = mongoose.model('marker_geo');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	//markers.find().remove().exec();
	res.render('test', {title: 'OverHere'});
});

router.get('/ajax',function(req,res) {
	var location_list = [];
	markers.find(function(err,marker_list){
		//console.log(marker_list);
		for (i in marker_list){
			location_list.push(marker_list[i]);
		}
		//console.log(location_list);
		res.send(location_list);
	});
	
});

router.get('/newLocation',function(req,res) {
	var newMarker = new markers();
	//console.log(req.query.title);
	newMarker.lat = req.query.lat;
	newMarker.lng = req.query.lng;
	newMarker.title = req.query.title;
	newMarker.save();
	res.send("complete");
});

module.exports = router;
