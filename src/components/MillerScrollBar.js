import React from 'react';
import renderScrollBarChunks from '../renderers/renderScrollBarChunks'

export default class MillerScrollBar extends React.Component{
	static propTypes = {
		items: React.PropTypes.number
	,	position: React.PropTypes.number
	,	classPrefix: React.PropTypes.func.isRequired
	,	direction:React.PropTypes.oneOf(['x','y']).isRequired
	}
	static defaultProps = {
		items:1
	,	position:0
	,	classPrefix:'miller-'
	,	direction:'x'
	}
	constructor(){
		super();
		this.state = {
			mouseIsDown:false
		}
	}
	clickItem = (i) =>{
		this.props.onClick(i)
	}
	onMouseDown = (evt) => {
		this.setState({mouseIsDown:true})
	}
	onMouseUp = (evt) => {
		this.setState({mouseIsDown:false})
	}
	render(){
		let clickItem = this.clickItem
		let {classPrefix,direction} = this.props;
		let itemsObjs = renderScrollBarChunks(this.props,this.state,clickItem)
		return (
			<div className={classPrefix('scrollbar',`scrollbar-${direction}`)}
				onMouseUp={this.onMouseUp}
				onMouseDown={this.onMouseDown}
			>
				<div className={classPrefix('scrollbar-pane')}>
					{itemsObjs}
				</div>
			</div>
		);
	}
}