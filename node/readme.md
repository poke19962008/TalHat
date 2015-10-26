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
} 

export.load = load;

```

# Mongo

```
mongod --dbpath ./data
```
