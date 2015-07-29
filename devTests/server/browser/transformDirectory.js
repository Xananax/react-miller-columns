function getName(filename){
	return filename.replace(/\/$/,'').split('/').pop();
}

function fileListToItems(files,target){
	files.forEach(function(file){
		file.name = getName(file.path);
		target.push(file);
	})
}

export default function transformDirectory(dir){
	dir.name = getName(dir.path);
	dir.items = [];
	if(dir.isDirectory){
		fileListToItems(dir.files.directories,dir.items);
		fileListToItems(dir.files.files,dir.items);
	}
	return dir;
}