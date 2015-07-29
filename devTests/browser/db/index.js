import entries from './entries'
import getDB from './getDB'
import getPath from './getPath'
import parseDBFile from './parseDBFile';

getDB.getPath = getPath;
getDB.entries = entries;
getDB.db = parseDBFile(entries,entries);
export default getDB;