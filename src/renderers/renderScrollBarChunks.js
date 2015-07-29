import React from 'react'
import MillerScrollBarChunk from '../components/MillerScrollBarChunk';

export default function renderScrollBarChunks(props,state,clickItem){
	let {items} = props;
	let {mouseIsDown} = state;
	return Array.apply(null, Array(items)).map(function(v,i){
		return <MillerScrollBarChunk 
			{...props} 
			rank={i}
			key={i}
			onClick={clickItem}
			ref={i}
			mouseIsDown={mouseIsDown}
		/>
	});
}