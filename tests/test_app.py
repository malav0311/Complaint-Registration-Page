import pyrebase
import json

def test_index(app,client):
      
        firebaseConfig = {
                "apiKey": "AIzaSyDV_CPfNZ_9D_gmQrxZcbo7SMS_9GQGYcE",
                "authDomain": "city-5dc6f.firebaseapp.com",
                "databaseURL": "https://city-5dc6f-default-rtdb.firebaseio.com",
                "projectId": "city-5dc6f",
                "storageBucket": "city-5dc6f.appspot.com",
                "messagingSenderId": "876826563048",
                "appId": "1:876826563048:web:d82f14c0aad5094cf6145d"
    }
        firebase = pyrebase.initialize_app(firebaseConfig)

        db = firebase.database()
        users = db.child("UserInfo").get()
        if users is not None:
                del app
                res = client.get('/test')
                assert res.status_code == 200
                expected = {'success': '1'}
                assert expected == json.loads(res.get_data(as_text=True))



