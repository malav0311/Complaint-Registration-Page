

  var firebaseConfig = {
    apiKey: "AIzaSyDV_CPfNZ_9D_gmQrxZcbo7SMS_9GQGYcE",
    authDomain: "city-5dc6f.firebaseapp.com",
    databaseURL: "https://city-5dc6f-default-rtdb.firebaseio.com",
    projectId: "city-5dc6f",
    storageBucket: "city-5dc6f.appspot.com",
    messagingSenderId: "876826563048",
    appId: "1:876826563048:web:d82f14c0aad5094cf6145d"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

document.getElementById('statusForm').addEventListener('submit', findProgress);
var data;
function findProgress(e){
    e.preventDefault();
    var cid = document.getElementById('CID').value;
    console.log(cid);
    if(cid===""){
        alert("Fill in all the fields")
    }
    else{
    var db = firebase.database();
    var users = db.ref('UserInfo').child(cid).child('progress').once('value').then(function(snapshot){
  data = snapshot.val();
  if(data===1){
    document.getElementById("hpro").innerHTML = "Complaint Status: Solved";
    document.getElementById("hpro1").innerHTML = "Thank you for your patience";
  }
  else if(data===0){
    document.getElementById("hpro").innerHTML = "Complaint Status: In Progress";
    document.getElementById("hpro1").innerHTML = "Thank you for your patience";
  }
  else{
    document.getElementById("hpro").innerHTML = "Error. Id does not exist";
  }
 });
}
}


  
