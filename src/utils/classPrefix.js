function classesToString(prefix,variations){
	return variations
		.filter(function(item){
			return !(typeof item == 'undefined' || item == null);
		})
		.map(function(item){
			if(typeof item == 'string'){
				return prefix+'-'+item;
			}
			if(typeof item == 'number'){
				return prefix+'-has-'+item;
			}
			if(Array.isArray(item)){
				let c = prefix+'-'+item[0];
				return c+' '+classesToString(c,item.slice(1));
			};
			let temp = [];
			for(let n in item){
				if(item[n]){
					temp.push(n);
				}
			};
			return classesToString(prefix,temp);
		})
		.join(' ')
	;
}

export default function classPrefix(prefix){
	prefix = (prefix||'');
	return function makePrefixedClasses(...variations){
		let classes = variations;
		classes.toString = function(){
			return classesToString(prefix,variations);
		}
		return classes;
	}
}