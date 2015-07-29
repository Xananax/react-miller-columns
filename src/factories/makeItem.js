import React from 'react';

export default	function makeItem(props){
	let MillerItem = require('../components/MillerItem')
	return (<MillerItem {...props}/>);
}