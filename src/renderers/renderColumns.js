export default function renderColumns(container,{columns,currentColumnsItem,currentColumn},{makeLoading,makeHeader,makeItem,showHeaders,onSelect,onKeyUp,makeColumn,classPrefix,itemEnterTimeout,itemLeaveTimeout}){
	let _path=[];
	let _id = []
	return columns.map(function(column,columnPosition){
		_path = _path.concat(columnPosition);
		_id = _id.concat(column.name);
		let path = _path.slice();
		let columnId = _id.join('/').replace(/\s/g,'-');
		let isColumnFocused = (currentColumn == columnPosition);
		let columnCurrentItem = currentColumnsItem[columnPosition] || 0;
		return makeColumn({makeHeader,makeLoading,container,column,path,columnId,columnPosition,isColumnFocused,columnCurrentItem,onSelect,showHeaders,classPrefix,makeItem,itemEnterTimeout,itemLeaveTimeout});
	});
}