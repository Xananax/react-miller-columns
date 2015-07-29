import MillerColumn from '../components/MillerColumn';
import React from 'react';

export default function makeColumn({makeHeader,makeLoading,container,column,path,columnId,columnPosition,isColumnFocused,columnCurrentItem,onSelect,showHeaders,classPrefix,makeItem,itemEnterTimeout,itemLeaveTimeout}){
	return (<MillerColumn
		{...column}
		key={path}
		path={path}
		columnId={columnId}
		columnPosition={columnPosition+1}
		ref={columnPosition}
		isColumnFocused={isColumnFocused}
		columnCurrentItem={columnCurrentItem}
		onSelect={onSelect}
		container={container}
		makeItem={makeItem}
		makeHeader={makeHeader}
		makeLoading={makeLoading}
		showHeaders={showHeaders}
		classPrefix={classPrefix}
		itemEnterTimeout={itemEnterTimeout}
		itemLeaveTimeout={itemLeaveTimeout}
	/>);
}