import json, pymongo, os

os.chdir("../")
configs = json.loads(open("pyConfigs.json").read())

try:
    con = pymongo.Connection(host=configs['mongo']['host'], port=configs['mongo']['port'])
except:
    print "Connot connect with mongodb"

db = con['talhat']

os.chdir("./addTestUsers")
user = json.loads(open("user.json").read())
print json.dumps(user, indent=2)
try:
    db.user_details.insert(user)
    print "\n[INFO] Successfully inserted \n"
except:
    print "\n[INFO] Cannot insert data into \'user_details\'"
