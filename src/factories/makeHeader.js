import MillerHeader from '../components/MillerHeader';
import React from 'react';

export default function makeHeader(props){
	if(!props.showHeaders){return false;}
	return (<MillerHeader {...props}/>)
}