import objectAssign from 'object-assign';

export default function renderItems({items,path,isColumnFocused,columnPosition,columnId,onSelect,classPrefix,name,item_id,itemRank,columnCurrentItem,makeItem,container}){
	return items.map(function(item,itemPosition){
		let itemId = columnId+'/'+itemPosition;
		let key=itemId;
		let isItemFocused = (columnCurrentItem == itemPosition)
		let ref=itemPosition
		let props = objectAssign({},item,{item,container,onSelect,key,itemId,itemPosition,ref,columnPosition,isItemFocused,classPrefix,path});
		return makeItem(props);
	});
}