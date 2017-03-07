var mongoose = require('mongoose');
var markers = mongoose.model('marker_geo');
var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({
	dest: 	'./public/gallery',
	limits: {	fileSize:	5242880},
	fileFilter: function(req, file, cb) {
		var type = file.mimetype;
		//console.log(type);
		var typeArray = type.split("/");
		if (typeArray[0] == "image") {
			cb(null, true);
		}else {
			cb(null, false);
  }
	}
})

/* GET home page. */
router.get('/', function(req, res) {
	//markers.find().remove().exec();
	res.render('layout_body_test', {title: 'OverHere'});
});

router.get('/ajax', function(req,res) {
	var location_list = [];
	markers.find(function(err,marker_list){
		//console.log(marker_list);
		console.log(marker_list.length);
		for (i in marker_list){
			location_list.push(marker_list[i]);
		}
		//console.log(location_list);
		res.send(location_list);
	});
	
});
/*
router.get('/newLocation', function(req,res) {
	var newMarker = new markers();
	//console.log('name: ' + req.query.name);
	newMarker.lat = req.query.lat;
	newMarker.lng = req.query.lng;
	newMarker.name = req.query.name;
	newMarker.title = req.query.title;
	newMarker.save();
	res.send("complete");
});
*/
router.post('/newLocation', upload.array('img', 3) , function(req, res) {
	var newMarker = new markers();
	//console.log(req.files);
	//console.log(req.body.name);
	var _photoIDs = [];
	for (i in req.files) {
		_photoIDs.push(req.files[i].filename);
	}
	newMarker.lat = req.body.lat;
	newMarker.lng = req.body.lng;
	newMarker.name = req.body.name;
	newMarker.title = req.body.title;
	newMarker.dir = req.body.dir;
	newMarker.photoIDs = _photoIDs;
	newMarker.save();
	res.send("Success");
});

router.post('/newPhoto', upload.array('img', 3) , function(req, res) {
	markers.findById( req.body.id ,function(err, doc){
		//console.log(doc);
		if(req.files.length == 0) {
			res.send("No Files");
			return;
		}
		var _photoIDs = doc.photoIDs;
		for (i in req.files) {
			_photoIDs.push(req.files[i].filename);
		}
		doc.save();
		res.send("Success");
	});
	
});

router.get('/surrounding', function(req, res){
	var surroundingList = [];
	//console.log("lat: " + req.query.lat + ", lng: " + req.query.lng);
	//console.log("" + (req.query.lng -1.5) + "," + (req.query.lng+1.5));
	markers.find(
			{ 
				lat : { 
					$gt : (req.query.lat - req.query.range),
					$lt : (req.query.lat + req.query.range)
				}, 
				lng : { 
					$gt : (req.query.lng - req.query.range),
					$lt : (req.query.lng + req.query.range)
				} 
			}, function(err, list){
				console.log(list);
				res.send(list);
	});
});

module.exports = router;
