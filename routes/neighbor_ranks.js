var mongoose = require('mongoose');
var contracts = mongoose.model('contracts');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	contracts.find(function(err , contracts){
		contracts.forEach(function(contract){
			var now = Date.now();
			//console.log(contract.verified_time);
			if(contract.verified_time==null){
				//console.log('d');
				if((now - contract.create_time)>30000){
					contract.verified_time = now;
					contract.save();
			}
			}
		});

		if(req.session.logined){
  			res.render('contract_view' , { title: 'Express' , logged : true , username : req.session.username , contracts : contracts , msg : ''});
			}
		else
			res.render('contract_view' , {title: 'Express' , logged : false , username : 'Guest' ,
										 contracts : contracts , msg : 'Please Log In to Submit New Contract'});
	});
	
});

router.get('/new_contract' , function(req , res){
	if(req.session.logined)
		res.render('new_contract' , { title: 'Express' , logged : true , username : req.session.username });
	else
		res.redirect('/contracts');
});

router.post('/new_contract' , function(req , res){
	var contract = new contracts();
	contract.contract_name = req.body.contract_name;
	contract.applicant = req.body.applicant;
	contract.benefitiant = req.body.benefitiant;
	contract.period = req.body.period;
	contract.amount = req.body.amount;
	contract.create_time = Date.now();
	contract.verified_time = null;
	contract.save();
	res.redirect('/contracts');
});

router.post('/query' , function(req , res){
	console.log(req.body.query_type);
	console.log(req.body.query_value);
	//if(req.body.query_value)

	contracts.find().where( req.body.query_type.toLowerCase() , req.body.query_value).exec(function(err , filt_contracts){
		//console.log(filt_contracts);
		if(req.session.logined)
  			res.render('contract_query_view' , { title: 'Express' , logged : true , username : req.session.username , contracts : filt_contracts});
		else
			res.render('contract_query_view' , {title: 'Express' , logged : false , username : 'Guest' ,contracts : filt_contracts });
	});
	
});

module.exports = router;
