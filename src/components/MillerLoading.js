import React from 'react'

export default class MillerLoading extends React.Component{
	static propTypes = {
		classPrefix: React.PropTypes.func.isRequired
	}
	render(){
		let {classPrefix} = this.props
		let className = classPrefix('loading');
		let innerClassName = className+'-inner'
		return (<div className={className}>
			<div className={innerClassName}>
				<span>loading...</span>
			</div>
		</div>)
	}
}