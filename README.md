# TalHat

# ./config.js

```js
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

# Database Schema

- user_details

```js
{
	name: String,
	passion: String,
	mail: String,
	password: String,
	bio: String,
	recognize: {
		count: Int,
		users: [{
			name: String,
			mail: String,
		}]
	},
}
```

- passions

```
{
	_id: Int,
	count: Int,
	passion: String,
}
```
