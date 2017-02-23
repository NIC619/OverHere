var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var marker_geo = new Schema({
	lat: Number,
	lng: Number,
	name: String,
	title: String,
	dir: String,
	photoIDs: [String]
});

mongoose.model('marker_geo' , marker_geo);
mongoose.connect('mongodb://localhost/marker_database');