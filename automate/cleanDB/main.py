'''
    Drop All the collection:
        $ python main.py -A
        $ python main.py -All

    Drop selected collections
        $ python main.py -C coll1 coll2 ....
        $ python main.py -collections coll1 coll2 ....

    Drop except selected collection
        $ python main.py -E coll1 coll2 ...
        $ python main.py -except coll1 coll2 ...
'''

import pymongo, json, os, sys
import mongoUtil as MU

os.chdir("../")
configs = json.loads(open("pyConfigs.json").read())

try:
    con = pymongo.Connection(host=configs['mongo']['host'], port=configs['mongo']['port'])
except:
    print "Cannot connect with MongoDB."
db = con['talhat']

os.chdir("./cleanDB")

opt = sys.argv[1]

if (opt == "-A") or (opt == "-all") :
    collections = db.collection_names()

    MU.dropCollections(db, collections)
    MU.addTestUser(db)

elif (opt == "-C") or (opt == "-colections") :
    collections = sys.argv[2:]

    MU.dropCollections(db, collections)
    if "user_details" in sys.argv[2:]:
        MU.addTestUser(db)

elif (opt == "-E") or (opt == "-exception") :
    collections = db.collection_names()
    exceptions = sys.argv[2:]
    ud = False

    for exception in exceptions:
        if exception in collections:
            collections.remove(exception)

            if exception is "user_details":
                ud = True
        else:
            print "[ERROR] No " + exception + " colllection found."

    MU.dropCollections(db, collections)

    if ud :
        MU.addTestUser(db)
