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
    
    var email = getInputVal('email')
    var location = getInputVal('location')
    var message = getInputVal('message')
    if(email===''||location===''||message===''){
        alert("Fill in all the field!!")
    }
    else{
     e.preventDefault();
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
     
    saveUserInfo(trackId, email, location, message);
    localStorage.setItem("serialNumber", trackId);
    }
}

 function getInputVal(id){
     var ch = document.getElementById(id).value
     return ch;
 }   

 function saveUserInfo(trackId, email, location, message){
    var userInfo = firebase.database().ref("UserInfo/"+ trackId);
    userInfo.set({
      
        email: email,
        location: location,
        message: message,
        progressFlag: 0,
    }).then(() => {
        window.location = 'trackinfo.html';
    })
 }




