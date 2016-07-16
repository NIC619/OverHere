var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user_profile = new Schema({
		user_name : String,
		password  : String,
		email 	  : String
});

var contracts = new Schema({
		contract_name : String,
		applicant : String,
		benefitiant : String,
		period	  : Number,
		amount	  : Number,
		create_time : Date,
		verified_time : Date
});

mongoose.model('user_profile' , user_profile);
mongoose.model('contracts' , contracts);
mongoose.connect('mongodb://localhost/user_database');