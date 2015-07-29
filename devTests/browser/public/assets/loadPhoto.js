export default function loadPhoto({name,artist,rating},cb){
	var col = {
		name
	,	items:[
			{
				type:'field'
			,	value:name
			,	name:'name'
			,	subType:'text'
			}
		,	artist
		,	{
				type:'field'
			,	value:rating
			,	name:'rating'
			,	subType:'number'
			}
		]
	}
	cb(col);
}