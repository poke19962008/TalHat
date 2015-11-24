import json, pymongo

def dropCollections(db, collections):
    count = 0
    for collection in collections:
        try:
            coll = pymongo.collection.Collection(db, collection)
            coll.drop()
            print "[INFO]" + collection + " Dropped successfully."
            count = count + 1
        except:
            print "[ERROR]" + collection + " failed to drop"
    print "----------------------------------------------------------------"
    print "[INFO] Dropped " + str(count) + " of " + str(len(collections)) + " from TalHat\n\n"

def addTestUser(db):
    testData = { "mail" : "test@test.com",
                 "password" : "6dafd5b49320d2919b897f275219cc2f6918c0be",
                 "passion" : "Coder",
                 "name" : "test",
                 "recognize": {
                   "count": 0,
                   "users": [],
                 },
                 "bio" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est." }

    collections = db.collection_names()
    print "Test User:-"
    print json.dumps(testData, indent=2)

    try:
        db.user_details.insert(testData)
        print "[INFO] Inserted Test User in \'user_details\'"
    except:
        print "[ERROR] Unable to add test user in \'user_details\'"
