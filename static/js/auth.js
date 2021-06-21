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


  document.getElementById("signIn").addEventListener('submit',check);

  function check(e){
        e.preventDefault();
        const email = document.getElementById("adminID").value;
        const pass = document.getElementById("password").value;
        firebase.auth().signInWithEmailAndPassword(email, pass)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    window.location = "Dashboard1"
    // ...
  })
  .catch((error) => {
    alert("Wrong Id or Password!")
    var errorCode = error.code;
    var errorMessage = error.message;
  });
    };