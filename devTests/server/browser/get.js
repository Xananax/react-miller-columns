import Promise from 'bluebird'
import request from 'superagent'

var get = Promise.promisify(function(url,cb){
	url = url ? '/' + url :'';
	request
	.post('/meta'+url)
	.set('Accept', 'application/json')
	.end(function(err, res){
		if(err){return cb(err);}
		cb(null,res.body);
	});
});

export default get;