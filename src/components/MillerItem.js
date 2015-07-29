import React from 'react';
import MillerContainer from './MillerContainer'

export default class MillerItem extends React.Component {
	static propTypes = {
		columnPosition: React.PropTypes.number.isRequired
	,	onSelect: React.PropTypes.func.isRequired
	,	container: React.PropTypes.instanceOf(MillerContainer).isRequired
	,	path: React.PropTypes.array.isRequired
	,	name: React.PropTypes.string.isRequired
	,	itemPosition: React.PropTypes.number.isRequired
	,	itemId: React.PropTypes.string.isRequired
	,	isItemFocused: React.PropTypes.bool.isRequired
	,	classPrefix: React.PropTypes.func.isRequired
	}
	focus(){
		this.getNode().focus();
	}
	getNode(){
		return React.findDOMNode(this);
	}
	select(){
		let {columnPosition,onSelect,path,name,itemPosition,addColumn,container,select} = this.props;
		if(select){
			return select(this,this.props,path,columnPosition,itemPosition,container)
		}
		onSelect(this,this.props,path,columnPosition,itemPosition,container);
	}
	onSelect = (evt) => {
		evt.preventDefault();
		this.select();
	}
	getBottom(){
		let item = this.getNode();
		let limitTop = item.offsetTop;
		let limitBottom = item.offsetTop+item.offsetHeight;
		return limitBottom;
	}
	render(){
		let {name,classPrefix,itemId,isItemFocused} = this.props;
		let className = classPrefix(["item",{focus:isItemFocused}]);
		return name ? (
			<li id={itemId} className={className} onClick={this.onSelect}>
				{name}
			</li>
		) : false;
	}
}