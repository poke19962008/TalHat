function load(){
    var config = {};

    config['mongodb'] = {
        "mongo_path": "mongodb://127.0.0.1:27017/talhat",
        "colection": ["user_details"],
    };

    config['mysqli'] = {
        "db": "...",
        "host": "...",
        "password": "...",
    };

    config['auth'] = {
        "key": 'iloveapple',
        "algorithm": 'sha1',
        "digest": 'hex'
    };

    config['session'] = {
        "key": "thisissecret"
    };

    return config;
}

exports.load = load;
