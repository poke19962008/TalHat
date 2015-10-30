import pymongo, os, json

os.chdir("../");

configs = json.loads(open("pyConfigs.json").read())

try:
    con = pymongo.Connection(host=configs['mongo']['host'], port=configs['mongo']['port'])
except:
    print "Cannot connect with MongoDB."

db = con['talhat']

os.chdir("./insertPassion")
passions = open("passions.txt", "r").read().split("\n")

index = 0
for passion in passions:
    # passion = passion.lower()
    try:
        db.passions.insert({"passion": passion, "_id": index, "count": 0})
        index = index+1
    except:
        print "[error] "+ passion + " failed to insert."

print "[success] Inserted " + str(index) + " of " + str(len(passions)) + " passions"
