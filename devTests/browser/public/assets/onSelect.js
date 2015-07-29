import loadPhoto from './loadPhoto';
import loadArtist from './loadArtist';

export default function onSelect(item,props,path,rank,itemRank,container){
	if(props.items){
		props.isLoading = true;
		container.setColumn(props,rank,itemRank);
		setTimeout(function(){
			props.isLoading = false;
			container.setColumn(props,rank,itemRank);
		},100)
	}
	else if(props.type=='field'){
		console.log(props)
	}
	else if(props.photos){
		loadArtist(props,function(column,err){
			if(err){throw err;}
			container.setColumn(column,rank,itemRank)
		});	
	}
	else if(props.artist){
		loadPhoto(props,function(column,err){
			if(err){throw err;}
			container.setColumn(column,rank,itemRank)
		});
	}
}