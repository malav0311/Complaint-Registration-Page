
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

function loading(){
var db = firebase.database().ref("UserInfo");

user = db.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
    
      
      if(childData.progress === 1){
       
          const container = document.getElementById("cardinfo"); 
          //create a card element
          const card = document.createElement("div");
          card.classList = "card-body";
          const content = `       
          <div class="card">
    
          <div class="card-body">
            <div class="row">
              <div class="col-sm id="keyval">
                ${childSnapshot.key}
              </div>
              <div class="col-sm">
                ${childData.issue.toUpperCase()}
              </div>
              <div class="col-sm">
              ${childData.severity.toUpperCase()}
              </div>
              
            </div>
            
            <p class="card-text" style="text-align:left; margin-left:50px;margin-top:20px;">${childData.message}</p>
           
          </div>
        </div>
          `;
          //append newly created card to the container

        container.innerHTML += content;

      }
 
   
    });

});

};


document.getElementById("filterform").addEventListener('submit',function(e){
  e.preventDefault();
  var sev = document.getElementById("severebool").value;
  var loc = document.getElementById("location").value;
  var iss = document.getElementById("issue").value;
 
  console.log(sev,loc,iss);
  
 
 
  $("#cardinfo").empty();
  var db = firebase.database().ref("UserInfo");
  var f = 0;

  var arr = [];
  user = db.on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val(); 
        var key = childSnapshot.key;
        var s = childData;
        s["key"] = key;
        arr.push(s);


      });
      

  });
  //filter issue
  if(iss == ""){
    var loc_arr = arr;
  }
  else{
    var loc_arr = [];
    var i;
    for(i=0;i<arr.length;i++){
      if(arr[i].issue == iss){
        loc_arr.push(arr[i]);
      }
    }
  }

    //filter location
    if(loc == ""){
      var sev_arr = loc_arr;
    }
    else{
      var i;
      var sev_arr = [];
      for(i=0;i<loc_arr.length;i++){
        if(loc_arr[i].location == loc){
          sev_arr.push(loc_arr[i]);
        }
      }
      
    }

    //filter severity
    if(sev == ""){
      var final = sev_arr;
    }
    else{
      var final = [];
      var i;
      for(i=0;i<sev_arr.length;i++){
        if(sev_arr[i].severity == sev){
          final.push(sev_arr[i]);
        }
      }
    }

    //display cards;
    var i;
    for(i=0;i<final.length;i++){
      f =1;
          const container = document.getElementById("cardinfo"); 
          //create a card element
          const card = document.createElement("div");
          card.classList = "card-body";
          const content = `       
          <div class="card">
    
          <div class="card-body">
            <div class="row">
              <div class="col-sm id="keyval">
                ${final[i].key}
              </div>
              <div class="col-sm">
                ${final[i].issue.toUpperCase()}
              </div>
              <div class="col-sm">
              ${final[i].severity.toUpperCase()}
              </div>
              
            </div>
            
            <p class="card-text" style="text-align:left; margin-left:50px;margin-top:20px;">${final[i].message}</p>
           
          </div>
        </div>
          `;
          //append newly created card to the container

        container.innerHTML += content;
    }
     if(f == 0){
          alert("No items Found!");
          window.location.reload();
      }
  

  
});


