 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBVri71wDojtK31uS46pZTQEwvutheY_b8",
    authDomain: "hydroponic-garden-khmt.firebaseapp.com",
    databaseURL: "https://hydroponic-garden-khmt.firebaseio.com",
    projectId: "hydroponic-garden-khmt",
    storageBucket: "hydroponic-garden-khmt.appspot.com",
    messagingSenderId: "968097949384",
    appId: "1:968097949384:web:9e6e8feddaf8e2a530a7fd",
    measurementId: "G-RBHNLGGD1S"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  onLogin = function(){
	var email = document.getElementById("loginEmail").value;
	var password = document.getElementById("loginPassword").value;
	document.getElementById("loginLoader").style.display = 'block';
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		document.getElementById('loginStatus').innerHTML = error.message;
		console.log(error);
		document.getElementById("loginLoader").style.display = 'none';
	});
}
onRegister = function(){
	
	if(document.getElementById("registerPassword").value == document.getElementById("repeatPassword").value){
		var email = document.getElementById("registerEmail").value;
		var password = document.getElementById("registerPassword").value;
		document.getElementById("loginLoader").style.display = 'block';
		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
			document.getElementById('registerStatus').innerHTML = error.message;
			console.log(error);
			document.getElementById("loginLoader").style.display = 'none';
		});
	}else{
		document.getElementById('registerStatus').innerHTML = 'Wrong confirm password!';
	}	
}

onLogout = function(){
	firebase.auth().signOut();
}
