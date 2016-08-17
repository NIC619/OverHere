var mongoose = require('mongoose');
var markers = mongoose.model('marker_geo');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	/*
	markers.find().remove().exec();
	var marker = new markers();
	marker.lat =  24;
	marker.lng = 120.3;
	marker.title = "fuck";
	marker.save();
	marker = new markers();
	marker.lat =  24.01;
	marker.lng = 120.31;
	marker.title = "you";
	marker.save();
	marker = new markers();
	marker.lat =  24.02;
	marker.lng = 120.32;
	marker.title = "bi3s";
	marker.save();
	*/
	/*
	var location_list = [];
	markers.find(function(err,marker_list){
		for (i in marker_list){
			location_list.push(marker_list[i]);
		}
		console.log(location_list);
		
	});
	*/
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

module.exports = router;
