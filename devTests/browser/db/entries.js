export default {
	name:'db'
,	items:[
	{
		name:'categories'
	,	items:[
			{
				name:'photos'
			,	path:'/photos'
			}
		,	{
				name:'artists'
			,	path:'/artists'
			}
		]
	}
,	{
		name:'photos'
	,	items:[
			{
				name:'Photo 1'
			,	rating:0
			,	artist:{path:'/artists/ArtistA'}
			}
		,	{
				name:'Photo 2'
			,	rating:2
			,	artist:{path:'/artists/ArtistA'}
			}
		,	{
				name:'Photo 3'
			,	rating:5
			,	artist:{path:'/artists/ArtistB'}
			}
		,	{
				name:'Photo 4'
			,	rating:8
			,	artist:{path:'/artists/ArtistB'}
			}
		,	{
				name:'Photo 5'
			,	rating:0
			,	artist:{path:'/artists/ArtistA'}
			}
		,	{
				name:'Photo 6'
			,	rating:2
			,	artist:{path:'/artists/ArtistA'}
			}
		,	{
				name:'Photo 7'
			,	rating:5
			,	artist:{path:'/artists/ArtistB'}
			}
		,	{
				name:'Photo 8'
			,	rating:8
			,	artist:{path:'/artists/ArtistB'}
			}
		,	{
				name:'Photo 1'
			,	rating:0
			,	artist:{path:'/artists/ArtistA'}
			}
		,	{
				name:'Photo 2'
			,	rating:2
			,	artist:{path:'/artists/ArtistA'}
			}
		,	{
				name:'Photo 3'
			,	rating:5
			,	artist:{path:'/artists/ArtistB'}
			}
		,	{
				name:'Photo 4'
			,	rating:8
			,	artist:{path:'/artists/ArtistB'}
			}
		,	{
				name:'Photo 5'
			,	rating:0
			,	artist:{path:'/artists/ArtistA'}
			}
		,	{
				name:'Photo 6'
			,	rating:2
			,	artist:{path:'/artists/ArtistA'}
			}
		,	{
				name:'Photo 7'
			,	rating:5
			,	artist:{path:'/artists/ArtistB'}
			}
		,	{
				name:'Photo 8'
			,	rating:8
			,	artist:{path:'/artists/ArtistB'}
			}
		]
	}
,	{
		name:'artists'
	,	items:[
			{
				name:'ArtistA'
			,	photos:[
					{path:'/photos/Photo 1'}
				,	{path:'/photos/Photo 2'}
				]
			}
		,	{
				name:'ArtistB'
			,	photos:[
					{path:'/photos/Photo 3'}
				,	{path:'/photos/Photo 4'}
				]
			}
		]
	}
]
};