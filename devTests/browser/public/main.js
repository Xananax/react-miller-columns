import domReady from 'domready'
import {db} from '../db'
import style from '../../../src/style/index.styl'
import Miller from '../../../src'
import onSelect from './assets/onSelect'
import makeItem from './assets/makeItem'
import React from 'react'

domReady(function(){
	var el = document.getElementById('Wrapper');
	React.render(React.createElement(Miller,{
		columns:[db]
	//,	useKeyboard:true
	//,	onSelect:onSelect
	//,	makeItem:makeItem
	}),el);
});