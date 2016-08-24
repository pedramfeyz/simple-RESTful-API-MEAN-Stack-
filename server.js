var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
/*app.get('/', function(req, res){
	res.send('server is runing');
});*/

app.get('/contactlist', function(req, res){
	console.log('received the request from user');
	db.contactlist.find(function(err, docs){
		res.json(docs);
	});	
});

app.post('/contactlist', function(req, res){
	console.log(req.body);
	db.contactlist.insert(req.body, function(err, docs){
		res.json(docs);
	});
});

app.delete('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id:mongojs.ObjectId(id)}, function(err, docs){
		res.json(docs);
	});
});

app.get('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id:mongojs.ObjectId(id)}, function(err, docs){
		res.json(docs);
	})
});

app.put('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({query: {_id:mongojs.ObjectId(id)},
       update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
       new: true }, function(err, docs){
       	res.json(docs);
          }
       );
});

app.listen(3000);
console.log('server is running on port 3000');