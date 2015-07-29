import {components,renderers} from '../../../src'
import React from 'react'
let {MillerColumn,MillerTransition,MillerScrollBar} = components
let {renderItems} = renderers

export default class MillerItemColumn extends MillerColumn{
	getCurrentItem(){
		let columnCurrentItem = this.props.columnCurrentItem || 0;
		return this.refs[columnCurrentItem];
	}
	getContainer(){
		return this.refs.container;
	}
	getPane(){
		return this.refs.pane;
	}
	getOffset(){
		let node = React.findDOMNode(this);
		return node.offsetLeft + node.offsetWidth;	
	}
	focusItem = (n) => {
		let {container} = this.props;
		container.focusItem(n);
	}
	scrollToCurrent(){
		let item = this.getCurrentItem();
		if(!item){return;}
		let container = React.findDOMNode(this.getContainer());
		let limitBottom = item.getBottom();
		let top = (limitBottom - container.offsetHeight);
		item.focus();
		this.scrollTo(top);
	}
	scrollTo(y){
		let pane = React.findDOMNode(this.getPane());
		if(y<0){y=0;}
		pane.style.top = -(y)+'px';
	}
	getSubElement(){
		let {type,fullPath} = this.props;
		if(type=='image'){
			let {size:{width:width,height:height}} = this.props;
			return (<img src={'/meta/'+fullPath+'?read'} width={width} height={height}/>)
		}
		if(type=='text'){
			//console.log(this.props)
			let {fileContents} = this.props;
			return (<p>{fileContents}</p>)
		}
		console.log(this.props)
	}
	render(){
		let {
			columnId
		,	classPrefix
		,	isColumnFocused
		,	columnCurrentItem
		,	items
		,	showHeaders
		,	name
		,	isLoading
		,	makeHeader
		,	makeLoading
		,	itemEnterTimeout
		,	itemLeaveTimeout
		} = this.props;
		let contents = this.getSubElement();
		return (
			<div id={columnId} className={classPrefix('item-column',["column",{focus:isColumnFocused,isLoading}])} ref="column" key="column" unselectable="on">
				{makeHeader(this.props)}
				<div className={classPrefix("column-items-container","container")} ref="container" unselectable="on">
					<div>
						{contents}
					</div>
				</div>
				<MillerScrollBar
					items={items.length}
					classPrefix={classPrefix}
					position={columnCurrentItem}
					direction="y"
					onClick={this.focusItem}
				/>
			</div>
		);
	}
}