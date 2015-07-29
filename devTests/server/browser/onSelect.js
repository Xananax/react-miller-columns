import get from './get';
import transformDirectory from './transformDirectory';
import error from './error'

export default function onSelect(item,props,path,rank,itemRank,container){
	props.isLoading = true;
	props.items = [];
	//container.setColumn(props,rank,itemRank);
	get(props.fullPath).then(function(stats){
		var dir = transformDirectory(stats);
		dir.isLoading = false;
		container.setColumn(dir,rank,itemRank);
	}).catch(error)
}