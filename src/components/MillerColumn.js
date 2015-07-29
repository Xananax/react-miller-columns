import React from 'react';
import MillerContainer from './MillerContainer'
import MillerHeader from './MillerHeader';
import renderItems from '../renderers/renderItems';
import MillerTransition from './MillerTransition';
import MillerScrollBar from './MillerScrollBar';

export default class MillerColumn extends React.Component {
	static propTypes = {
		showHeaders: React.PropTypes.bool.isRequired
	,	onSelect: React.PropTypes.func.isRequired
	,	container: React.PropTypes.instanceOf(MillerContainer).isRequired
	,	makeItem: React.PropTypes.func.isRequired
	,	makeHeader: React.PropTypes.func.isRequired
	,	makeLoading: React.PropTypes.func.isRequired
	,	classPrefix: React.PropTypes.func.isRequired
	,	itemEnterTimeout: React.PropTypes.number.isRequired
	,	itemLeaveTimeout: React.PropTypes.number.isRequired
	,	isLoading: React.PropTypes.bool
	}
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
		let itemsObjs = isLoading ? makeLoading(this.props) : renderItems(this.props);
		return (
			<div id={columnId} className={classPrefix(["column",{focus:isColumnFocused,isLoading}])} ref="column" key="column" unselectable="on">
				{makeHeader(this.props)}
				<div className={classPrefix("column-items-container","container")} ref="container" unselectable="on">
					<MillerTransition
						component="ul"
						className={classPrefix("column-items-pane",["pane",items.length])}
						ref="pane"
						transitionName={classPrefix("item")+''}
						enterTimeout={itemEnterTimeout}
						leaveTimeout={itemLeaveTimeout}
						>
						{itemsObjs}
					</MillerTransition>
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