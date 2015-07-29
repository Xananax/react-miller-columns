/**
 * This is taken almost as-is from
 * https://github.com/Khan/react-components/blob/master/js/timeout-transition-group.jsx
 *
 * And modified for ES6+ syntax.
 * 
 * The CSSTransitionGroup component uses the 'transitionend' event, which
 * browsers will not send for any number of reasons, including the
 * transitioning node not being painted or in an unfocused tab.
 *
 * This TimeoutTransitionGroup instead uses a user-defined timeout to determine
 * when it is a good time to remove the component. Currently there is only one
 * timeout specified, but in the future it would be nice to be able to specify
 * separate timeouts for enter and leave, in case the timeouts for those
 * animations differ. Even nicer would be some sort of inspection of the CSS to
 * automatically determine the duration of the animation or transition.
 *
 * This is adapted from Facebook's CSSTransitionGroup which is in the React
 * addons and under the Apache 2.0 License.
 */

import React from 'react'
import ReactTransitionGroup from 'react/lib/ReactTransitionGroup';
import MillerTransitionChild from './MillerTransitionChild';

export default class MillerTransition extends React.Component{
	static propTypes = {
		enterTimeout: React.PropTypes.number.isRequired
	,	leaveTimeout: React.PropTypes.number.isRequired
	,	transitionName: React.PropTypes.string.isRequired
	,	transitionAppear: React.PropTypes.bool
	,	transitionEnter: React.PropTypes.bool
	,	transitionLeave: React.PropTypes.bool
	}
	static defaultProps = {
		transitionEnter: true
	,	transitionLeave: true
	,	transitionAppear: true
	}
	_wrapChild = (child) => {
		let {
			enterTimeout
		,	leaveTimeout
		,	transitionName
		,	transitionEnter
		,	transitionLeave
		,	transitionAppear
		} = this.props;
		return(
			<MillerTransitionChild
					enterTimeout={enterTimeout}
					leaveTimeout={leaveTimeout}
					name={transitionName}
					enter={transitionEnter}
					leave={transitionLeave}
					appear={transitionAppear}
			>
				{child}
			</MillerTransitionChild>
		);
	}
	render(){
		return (<ReactTransitionGroup {...this.props} childFactory={this._wrapChild}/>);
	}
};