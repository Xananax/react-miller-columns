let reg = /^\/+|\/+$/g;

export default function getPath(path){
	if(Array.isArray(path)){return path.slice()}
	if(!Array.isArray(path)){
		return path.replace(reg,'')
			.split('/')
			.filter(Boolean)
		;
	}
	throw new Error('mamma!')
}