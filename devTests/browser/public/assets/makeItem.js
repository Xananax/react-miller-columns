import React from 'react';
import {components} from '../../../../src'
import MillerItemField from './MillerItemField';
let MillerItem = components.MillerItem;

export default	function makeItem(props){
	let {item,container} = props;
	if(item.type && item.type=='field'){
		let valueLink = container.linkState(props.path.concat([item.name]),item.value);
		return (<MillerItemField {...props} valueLink={valueLink}/>)
	}
	return (<MillerItem {...props}/>);
}