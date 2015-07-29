import React from 'react'

export default class MillerScrollBarChunk extends React.Component{
	static propTypes = {
		items: React.PropTypes.number
	,	position: React.PropTypes.number
	,	classPrefix: React.PropTypes.func.isRequired
	,	rank: React.PropTypes.number
	}
	onMouseUp = () => {
		if(this.props.mouseIsDown){
			this.props.onClick(this.props.rank);
		}
	}
	onClick = ()=> {
		this.props.onClick(this.props.rank);
	}
	render(){
		let {classPrefix,rank,position,items,onClick,mouseIsDown} = this.props;
		let selected = (position==rank);
		let first = (rank===0);
		let last = (rank===items-1);
		let middle = (!last && !first);
		let only = (first && last);
		let c = 'scrollbar-item'
		let className = classPrefix([c,rank,{only,first,last,middle,selected}])
		;
		return (<div className={className} onMouseOver={this.onMouseUp} onClick={this.onClick}>
			<div className={classPrefix('scrollbar-item-inside')}></div>
		</div>);
	}
}