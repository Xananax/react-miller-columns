import domReady from 'domready'
import style from '../../../src/style/index.styl'
import Miller from '../../../src'
import React from 'react'
import transformDirectory from './transformDirectory';
import get from './get';
import onSelect from './onSelect';
import error from './error';
import makeColumn from './makeColumn'
var el;

function render(columns){
	React.render(React.createElement(Miller,{
		columns:columns
	,	onSelect:onSelect
	,	makeColumn:makeColumn
	}),el);
}

domReady(function(){

	el = document.getElementById('Wrapper');

	function firstRender(res){
		var dir = transformDirectory(res);
		render([dir]);
	}

	get('')
		.then(firstRender)
		.catch(error);
});