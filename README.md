# Node Files

# ./config.js

```
function load(){
	var config = {};

	config['mongodb'] = {
		"mongo_path": "...",
		"colection": ["...", "..."],
	};

	config['mysqli'] = {
		"db": "...",
		"host": "...";
		"password": "...",
	};

	config['auth'] = {
		"key": '....',
		"algorithm": '....',
		"digest": '...'
	};

	config['session'] = {
		"key": "...."
	};
}

return config;

exports.load = load;

```

# Mongo

```
$ sudo rm -rf ./data
$ sudo mongod --dbpath ./data
```
