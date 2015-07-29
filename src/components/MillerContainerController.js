import React from 'react';
import keyCodes from '../consts/keyCodes';
import MillerContainer from './MillerContainer';
import classPrefixMaker from '../utils/classPrefix';

function has(arr,val){
	return (arr && arr.indexOf(val)>=0);
}

export default class KeyboardMillerContainer extends React.Component{
	static propTypes = {
		key_left: React.PropTypes.arrayOf(React.PropTypes.number)
	,	key_right: React.PropTypes.arrayOf(React.PropTypes.number)
	,	key_up: React.PropTypes.arrayOf(React.PropTypes.number)
	,	key_down: React.PropTypes.arrayOf(React.PropTypes.number)
	,	key_select: React.PropTypes.arrayOf(React.PropTypes.number)
	,	key_cancel: React.PropTypes.arrayOf(React.PropTypes.number)
	,	classPrefix: React.PropTypes.string.isRequired
	,	useKeyboard: React.PropTypes.bool
	}
	static defaultProps = {
		key_left: [keyCodes.LEFT]
	,	key_right: [keyCodes.RIGHT]
	,	key_up: [keyCodes.UP]
	,	key_down: [keyCodes.DOWN]
	,	key_select: [keyCodes.ENTER]
	,	key_cancel: [keyCodes.ESCAPE]
	,	classPrefix: 'miller' // prepended to all class names
	,	useKeyboard: true
	}
	constructor(props){
		super(props);
		this.state = {
			classPrefix: classPrefixMaker(props.classPrefix)
		}
	}
	onKeyUp = (evt) => {
		let {key_select,key_cancel} = this.props
		,	{container} = this.refs
		,	k = evt.keyCode
		;
		if(has(key_select,k)){
			evt.preventDefault();
			container.openCurrent();
		}
		else if(has(key_cancel,k)){
			evt.preventDefault();
			container.closeColumnsFromCurrent();
		}
	}
	onKeyDown = (evt) => {
			let {key_left,key_right,key_up,key_down} = this.props
		,	{container} = this.refs
		,	k = evt.keyCode
		;
		if(has(key_left,k)){
			evt.preventDefault();
			container.focusPreviousColumn();
		}
		else if(has(key_right,k)){
			evt.preventDefault();
			container.focusNextColumn();
		}
		else if(has(key_up,k)){
			evt.preventDefault();
			container.focusPreviousItem();
		}
		else if(has(key_down,k)){
			evt.preventDefault();
			container.focusNextItem();
		}	
	}
	render(){
		let {classPrefix} = this.state;
		let {useKeyboard} = this.props;
		let {onKeyUp,onKeyDown} = useKeyboard ? this : {};
		return (<MillerContainer 
			{...this.props}
			classPrefix={classPrefix}
			ref="container" 
			onKeyUp={onKeyUp}
			onKeyDown={onKeyDown}
		/>);
	}
}