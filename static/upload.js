var firebaseConfig = {
    apiKey: "AIzaSyDV_CPfNZ_9D_gmQrxZcbo7SMS_9GQGYcE",
    authDomain: "city-5dc6f.firebaseapp.com",
    projectId: "city-5dc6f",
    storageBucket: "city-5dc6f.appspot.com",
    messagingSenderId: "876826563048",
    appId: "1:876826563048:web:d82f14c0aad5094cf6145d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


 
 document.getElementById('contactForm').addEventListener('submit',submitform);
 function submitform(e){
    e.preventDefault();
    $("#loadingicon").css("display","block");
    var email = getInputVal('email')
    var location = getInputVal('location')
    var message = getInputVal('message')
    if(email===''||location===''||message===''){
        alert("Fill in all the field!!")
    }
    else{
     
     var date = new Date();
     var components = [
         date.getYear(),
         date.getMonth(),
         date.getDate(),
         date.getHours(),
         date.getMinutes(),
         date.getSeconds(),
         date.getMilliseconds()
     ];
     var trackId = components.join("");
    localStorage.setItem("serialNumber", trackId); 
    saveUserInfo(trackId, email, location, message);
    
    }
}

 function getInputVal(id){
     var ch = document.getElementById(id).value
     return ch;
 }   

 function saveUserInfo(trackId, email, location, message){
    // var userInfo = firebase.database().ref("UserInfo/"+ trackId);
    // userInfo.set({
      
    //     email: email,
    //     location: location,
    //     message: message,
    //     progress: 0,
    //     severity:"",
    //     issue:"",
    // }).then(() => {
    //     window.location = 'trackinfo';
    // })

    var data = {
           'TId': trackId,
           'email': email,
           'location': location,
           'message': message,
           
                };
           
          
           $.ajax({
                    url: '/Complaint',
                    type: 'POST',
                    data: {
                        'TId': trackId,
                        'email': email,
                        'location': location,
                        'message': message,
                       
                    },
                    success: function(response){
                      console.log(response);
                    }
                  }) 
                console.log("sent")
                window.location.href = "trackinfo";      
         

        // this will create a new FORM which is mapped to the Java Object of myForm, with an id of TestForm. Equivalent to: <form id="TestForm"></form>

          
        //   var xhr = new XMLHttpRequest();
        //   var params = 'TId='+ trackId +'&email='+email +'&location='+location +'&message='+message;
        //   xhr.open("POST", "/Complaint", true);
        //   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        //   xhr.send(params);

         // window.location.href = "trackinfo";  
          
         
 }




