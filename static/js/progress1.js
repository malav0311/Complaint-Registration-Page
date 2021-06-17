
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
    user = db.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val(); 
          
          if(childData.issue==iss && childData.severity==sev && childData.location==loc && childData.progress==1){
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
        if(f == 0){
            alert("No items Found!");
            window.location.reload();
        }

    });
    

    
});



