import getDB from './getDB';

export default function parseDB(db,rootDB){
	if(Array.isArray(db)){
		return db.map(function(item){
			return parseDB(item,rootDB);
		});
	};
	if(typeof db == 'object' && db.constructor == Object){
		if(db.path){
			return getDB(db.path,rootDB);
		}	
		for(var n in db){
			db[n] = parseDB(db[n],rootDB);
		}
	}
	return db;
}