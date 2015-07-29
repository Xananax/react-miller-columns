import React from 'react'
import {addClass,removeClass,hasClass,animationSupported} from '../utils'

const TICK = 17;

export default class TimeoutTransitionGroupChild extends React.Component {
	transition(animationType, finishCallback){
		let node = this.getNode();
		let className = this.props.name + '-' + animationType;
		let activeClassName = className + '-active';

		function endListener(){
			removeClass(node, className);
			removeClass(node, activeClassName);
			// Usually this optional callback is used for informing an owner of
			// a leave animation and telling it to remove the child.
			finishCallback && finishCallback();
		};

		if(!animationSupported()){
			endListener();
		}
		else{
			if(animationType === "enter"){
				this.animationTimeout = setTimeout(endListener,this.props.enterTimeout);
			}
			else if(animationType === "leave"){
				this.animationTimeout = setTimeout(endListener,this.props.leaveTimeout);
			}
			else if(animationType === "appear"){
				this.animationTimeout = setTimeout(endListener,this.props.enterTimeout);
			}
		}
		addClass(node, className);
		// Need to do this to actually trigger a transition.
		this.queueClass(activeClassName);
	}
	getNode(){
		return React.findDOMNode(this);
	}
	queueClass(className){
		this.classNameQueue.push(className);
		if(!this.timeout){
			this.timeout = setTimeout(this.flushClassNameQueue, TICK);
		}
	}
	flushClassNameQueue = () =>{
		if(this._isMounted){
			this.classNameQueue.forEach(function(name){
				addClass(this.getNode(), name);
			}.bind(this));
		}
		this.classNameQueue.length = 0;
		this.timeout = null;
	}
	componentDidMount(){
		this._isMounted = true;
	}
	componentWillMount(){
		this.classNameQueue = [];
	}
	componentWillUnmount(){
		if(this.timeout) {clearTimeout(this.timeout);}
		if(this.animationTimeout) {clearTimeout(this.animationTimeout);}
		this._isMounted = false;
	}
	componentWillEnter(done){
		if (this.props.enter) {this.transition('enter', done);} 
		else{done();}
	}
	componentWillAppear(done){
		if(this.props.appear){this.transition('appear', done);} 
		else{done();}
	}
	componentWillLeave(done){
		if(this.props.leave){this.transition('leave', done);} 
		else{done();}
	}
	render(){
		return React.Children.only(this.props.children);
	}
};