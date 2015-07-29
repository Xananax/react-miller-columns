/**********************************************************
 *
 *  MILLER CONTAINER
 *  
 * *********************************************************
 * - Contains columns
 * - Does all the glue stuff
 * - Receives all events
 */

import React from 'react';
import MillerScrollBar from './MillerScrollBar';
import makeColumn from '../factories/makeColumn';
import makeItem from '../factories/makeItem';
import makeHeader from '../factories/makeHeader';
import makeLoading from '../factories/makeLoading';
import renderColumns from '../renderers/renderColumns';
import onSelect from '../behaviors/onSelect';
import MillerTransition from './MillerTransition';
import ReactLink from 'react/lib/ReactLink'
import ReactStateSetters from 'react/lib/ReactStateSetters';

export default class MillerContainer extends React.Component {
	static propTypes = {
		showHeaders: React.PropTypes.bool
	,	makeItem: React.PropTypes.func.isRequired
	,	makeColumn: React.PropTypes.func.isRequired
	,	makeHeader: React.PropTypes.func.isRequired
	,	makeLoading: React.PropTypes.func.isRequired
	,	onSelect: React.PropTypes.func.isRequired
	,	columns: React.PropTypes.array.isRequired
	,	classPrefix: React.PropTypes.func.isRequired
	,	columnEnterTimeout: React.PropTypes.number.isRequired
	,	columnLeaveTimeout: React.PropTypes.number.isRequired
	,	itemEnterTimeout: React.PropTypes.number.isRequired
	,	itemLeaveTimeout: React.PropTypes.number.isRequired
	}
	static defaultProps = {
		showHeaders: true // if false, no headers will be shown
	,	columns:[] // original columns
	,	makeColumn:makeColumn
	,	makeItem:makeItem
	,	makeHeader:makeHeader
	,	makeLoading:makeLoading
	,	onSelect:onSelect
	,	columnEnterTimeout:300
	,	columnLeaveTimeout:300
	,	itemEnterTimeout:300
	,	itemLeaveTimeout:300
	}
	constructor(props){
		super();
		this.state = {
			columns:props.columns
		,	currentColumn:0
		,	currentColumnsItem:[0]
		};
	}
	componentDidMount(){
		if(this.props.useKeyboard){
			this.getNode().focus();
		}
		this.scrollToCurrent();
	}
	componentDidUpdate(){
		this.scrollToCurrent();
	}
	getStateNode = (path) => {
		let keys = path.slice();
		let current = this.state.columns;
		let value;
		let key;
		while(keys.length){
			key = keys.shift();
			if(Array.isArray(current)){
				if(typeof key == 'number' && key < current.length){
					let item = current[key]
					if(!keys.length){
						return {obj:current,key:key,item}
					}
					current = item.items ? item.items : item;
					continue;
				}
				let i = 0, l = current.length;
				for(;i<l;i++){
					let item = current[i];
					if(item && item.name && (item.name == key)){
						if(!keys.length){
							return {obj:current,key:i,value:item};
						}
						current = item.items ? item.items : item;
						break;
					}
				}
				continue;
			}
			if(current[key]){
				if(!keys.length){
					value = current[key];
					return {obj:current,key:key,value:value};
				}else{
					current = current[key];
					continue;
				}
			}
			throw new Error(`key ${key} does not exist in object ${current}`);
		}
		throw new Error(`key ${key} does not exist in object ${current}`);
	}
	linkState = (path) =>{
		if(Array.isArray(path)){
			try{
				let {obj,key} = this.getStateNode(path);
				let getSet = ReactStateSetters.createStateKeySetter(obj, key);
				return new ReactLink(obj,getSet);
			}catch(e){
				return false;
			}
		}else{
			let obj = this.state[path];
			let getSet = ReactStateSetters.createStateKeySetter(this, path);
			return new ReactLink(obj,getSet);
		}
	}
	scrollToCurrent(){
		let column = this.getCurrentColumn();
		let limitRight = column.getOffset()
		let width = this.getNode().offsetWidth;
		let left = limitRight-width;
		this.scrollTo(left);
		column.scrollToCurrent();
	}
	getNode(){
		return React.findDOMNode(this);
	}
	/**
	 * Scroll the container lateraly to the x value
	 * @param  {number} x value in pixels
	 */
	scrollTo(x){
		let container = this.getPane().getDOMNode();
		if(x<0){x=0}
		container.style.left = -(x)+'px';
	}
	/**
	 * Adds a column to the container
	 * @param {Object} column  an object with "name" and "items"
	 * @param {int} rank       where to place the column
	 * @param {int} itemRank   selected item number (0 by default);
	 */
	addColumn(column,rank,itemRank){
		let currentColumnsItem = this.state.currentColumnsItem.slice(0,rank);
		currentColumnsItem[rank] = 0;
		this.setState({
			columns: this.state.columns.slice(0,rank).concat(column)
		,	currentColumn: rank
		,	currentColumnsItem:currentColumnsItem
		});
	}
	setColumn(column,rank,itemRank){
		let columns = this.state.columns.slice(0,rank)
		if(rank<columns.length){
			columns[rank] = column;
		}else{
			columns.push(column);
		}
		let currentColumnsItem = this.state.currentColumnsItem.slice(0,rank);
		currentColumnsItem[rank] = 0;
		currentColumnsItem[rank-1] = itemRank
		this.setState({
			columns:columns
		,	currentColumn:rank
		,	currentColumnsItem:currentColumnsItem
		})
	}
	/**
	 * Closes columns from the specified integer onwards
	 * @param  {int} rank which column to close
	 */
	closeColumnsFrom(rank){
		if(rank>0){
			let columns = this.state.columns.slice(0,rank);
			let currentColumnsItem = this.state.currentColumnsItem.slice(0,rank);
			this.setState({
				columns: columns
			,	currentColumn: rank-1
			});		
		}
	}
	/**
	 * Closes current column and any following column
	 */
	closeColumnsFromCurrent(){
		this.closeColumnsFrom(this.state.currentColumn);
	}
	/**
	 * Returns the container
	 * @return {React Component}
	 */
	getContainer(){
		return this.refs.container;
	}
	/**
	 * Returns the scrolling pane
	 * @return {React Component}
	 */
	getPane(){
		return this.refs.pane;
	}
	/**
	 * Returns the current column
	 * @return {React Component}
	 */
	getCurrentColumn(){
		return this.getColumnAt(this.state.currentColumn);
	}
	/**
	 * Returns a column
	 * @param {int} n the column number
	 * @return {React Component}
	 */
	getColumnAt(n){
		return this.refs[n];
	}
	/**
	 * Triggers opening of the currently selected item
	 */
	openCurrent(){
		this.getCurrentColumn().getCurrentItem().select();
	}
	/**
	 * Sets the focus on the column number n
	 * @param  {int} n the column to set focus on
	 */
	focusColumn= (n)=>{
		if(n>this.state.columns.length || n<0){return;}
		this.setState({currentColumn:n});
	}
	/**
	 * Sets the focus on the previous column if the current column is different from 0
	 */
	focusPreviousColumn(){
		let {currentColumn} = this.state;
		if(currentColumn>0){this.focusColumn(currentColumn-1);}
	}
	focusItem = (n) =>{
		let {currentColumnsItem,currentColumn} = this.state;
		let length = this.state.columns[currentColumn].items.length;
		if(n>length || n<0){return;}
		currentColumnsItem = currentColumnsItem.slice();
		currentColumnsItem[currentColumn]=n;
		this.setState({currentColumnsItem:currentColumnsItem});
	}
	/**
	 * Sets the focus on the next column if the next column exists
	 */
	focusNextColumn(){
		let {currentColumn,columns} = this.state;
		let length = columns.length-1;
		if(currentColumn<length){this.focusColumn(currentColumn+1);}
	}
	/**
	 * Sets the focus on the previous item in the currently selected column, if
	 * the previous item is different from 0
	 */
	focusPreviousItem(){
		let {currentColumnsItem,currentColumn} = this.state;
		let itemFocus = currentColumnsItem[currentColumn];
		this.focusItem(itemFocus-1)
	}
	/**
	 * Sets the focus on the next item in the currently selected column, if
	 * the next item exists
	 */
	focusNextItem(){
		let {currentColumnsItem,currentColumn} = this.state;
		let itemFocus = currentColumnsItem[currentColumn];
		this.focusItem(itemFocus+1)
	}
	render(){
		let {classPrefix,onSelect,onKeyUp,onKeyDown,columnLeaveTimeout,columnEnterTimeout} = this.props;
		let {currentColumn} = this.state;
		let columns = renderColumns(this,this.state,this.props);
		return (<div
				className={classPrefix("columns-container","container")}
				ref="container"
				tabIndex={1}
				onKeyUp={onKeyUp}
				onKeyDown={onKeyDown}
				>
				<div
					className={classPrefix("columns-pane",["pane",columns.length])}
					ref="pane"
					>
					<MillerTransition
						enterTimeout={columnEnterTimeout}
						leaveTimeout={columnLeaveTimeout}
						transitionName={classPrefix("column")+''}
						>
					{columns}
					</MillerTransition>
				</div>
				<MillerScrollBar
					items={columns.length}
					classPrefix={classPrefix}
					position={currentColumn}
					onClick={this.focusColumn}
				/>
		</div>);
	}
}