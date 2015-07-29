import objectAssign from 'object-assign'
import React from 'react'
import {components} from '../../../src'
import MillerItemColumn from './MillerItemColumn'
let {MillerColumn} = components

export default function makeColumn(properties){
	let {column} = properties
	let additionalProps = {
		key:properties.path
	,	columnPosition:properties.columnPosition+1
	,	ref:properties.columnPosition
	}
	let props = objectAssign({},column,properties,additionalProps)
	if(props.isDirectory){
		return (<MillerColumn {...props} />);
	}
	return (<MillerItemColumn {...props} />);
}