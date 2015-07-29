export default function loadArtist(props,cb){
	let {name} = props;
	var col = {
		name
	,	items:[
			{
				type:'field'
			,	value:name
			,	name:'name'
			,	subType:'text'
			}
		,	{
				name:'photos'
			,	items:props.photos
			}
		]
	}
	cb(col);
}