import parseDBFile from './parseDBFile';
import getPath from './getPath';

export default function getDB(path,db){
	path = getPath(path);
	//console.log('----------------')
	//console.log(path);
	return path.reduce(function(db,key){
		//console.log('searching for',key,'in',db)
		if(!db){return null;}
		if(!db.items || !db.items.length){
			if(db[key]){
				//console.log('found property',key)
				return db[key]
			}
			return null;
		}
		//console.log('searching items',items)
		var items = db.items;
		for(var i=0, l=items.length;i<l;i++){
			var item = items[i];
			if(item.name==key){
				//console.log('found item named',key,':',item);
				return item;
			}
		}
		//console.log('did not find',key,'in `items` or as a property')
		return null;
	},db)
}