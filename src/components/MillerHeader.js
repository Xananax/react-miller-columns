import React from 'react'

export default class MillerHeader extends React.Component{
	static propTypes = {
		name: React.PropTypes.string.isRequired
	,	classPrefix: React.PropTypes.func.isRequired
	}
	render(){
		let {classPrefix,name} = this.props;
		return (<div className={classPrefix("column-title")}>
			<h2>{name}</h2>
		</div>);
	}
}