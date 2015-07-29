import React from 'react';
import {components} from '../../../../src'
let MillerItem = components.MillerItem;

export default class MillerField extends MillerItem{
	render(){
		let {name,classPrefix,id,focus,subType,valueLink} = this.props;
		let className = classPrefix(["item",{focus}]);
		let inputId = id+'_input';
		return name ? (
			<li id={id} className={className} onClick={this.onSelect}>
				<label htmlFor={inputId}>{name}</label>
				<input type={subType} id={inputId} valueLink={valueLink}/>
			</li>
		) : false;
	}	
}