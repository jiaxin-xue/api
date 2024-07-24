var express = require('express');
var router = express.Router();
const path = require('path');

// Import the filesystem module 
const fs = require('fs').promises;

async function getDirJsonTree(dirPath)
{
	// Function to get current filenames 
	// in directory 
	const items = await fs.readdir(dirPath, (err, files) =>
	{
		return files;
	});

	// 过滤出所有的目录
	const files = await Promise.all(items.map(async item =>
	{
		const fullPath = path.join(dirPath, item);
		const stats = await fs.stat(fullPath);
		if (stats.isDirectory() && item && !item.startsWith("."))
		{
			console.log("  item=", item);

			const dir = {
				"id": "id" + Math.random().toString(16).slice(2),
				"label": item,
				"type": "directory",
			};

			const subDirs = await getDirJsonTree(fullPath);

			if (subDirs.length > 0)
			{
				dir["children"] = subDirs;
			}

			return dir;
		}
		return undefined;
	}));

	return files.filter($ => $);
}

router.get('/', async (req, res, next) =>
{
	const { dir } = req.query;
	const reqPath = dir ? dir : '';
	const rootPath = '/Users/zhongpingxue/Music/';
	const dirPath = rootPath + reqPath;
	const directories = await getDirJsonTree(dirPath);
	res.send(directories);
});

module.exports = router;