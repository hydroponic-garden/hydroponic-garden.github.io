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

  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();

onLogin = function(){
	var email = document.getElementById("loginEmail").value;
	var password = document.getElementById("loginPassword").value;
	document.getElementById("loginPanel").style.display = 'block';
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		document.getElementById('loginStatus').innerHTML = error.message;
		console.log(error);
		document.getElementById("loginPanel").style.display = 'block';
	});
	console.log("OKKK");
}
onRegister = function(){
	var isSuccessful = true;
	if(document.getElementById("registerPassword").value == document.getElementById("repeatPassword").value){
		var email = document.getElementById("registerEmail").value;
		var password = document.getElementById("registerPassword").value;
		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
			if(error.code){
				isSuccessful = false;
				document.getElementById('registerStatus').innerHTML = error.message;
				document.getElementById('registerOK').innerHTML = ""
				console.log(error);
			}
			else{
				isSuccessful = false;
				document.getElementById('registerStatus').innerHTML = 'Wrong confirm password!';
				document.getElementById('registerOK').innerHTML = ""
			}
		});
	}	
	if(isSuccessful){
		document.getElementById('registerStatus').innerHTML = "";
		document.getElementById('registerOK').innerHTML = "Đăng kí thành công";
	}
	
}

onLogout = function(){
	firebase.auth().signOut();
	console.log('Log out');
	document.getElementById("devicePanel").style.display = 'none';
	document.getElementById("loginPanel").style.display = 'block';
}

turnOff = function(){
	firebase.auth().onAuthStateChanged(firebaseUser =>{
	if(firebaseUser){
		firebase.database().ref().update({
			device:0
		})
	}
		})
}
turnOn = function(){
	firebase.auth().onAuthStateChanged(firebaseUser =>{
	if(firebaseUser){
		firebase.database().ref().update({
			device:1
		})
	}
		})
}
firebase.database().ref().on('value',function(snapshot){
			document.getElementById('temp').innerHTML= "1";
			document.getElementById('humid').innerHTML= "1";
			document.getElementById('water').innerHTML= snapshot.val().water;
		});
firebase.auth().onAuthStateChanged(firebaseUser =>{
	console.log("TEST,",firebaseUser);
	if(firebaseUser){
		var user = firebase.auth().currentUser;
		document.getElementById('nameAccount').innerHTML.replace(document.getElementById("nameAccount").placeholder,user.displayName);
		console.log(user.email);
		document.getElementById('emailAccount').innerHTML= user.email;
		
		console.log("12345");
		console.log("12345");
		firebase.database().ref().on('value',function(snapshot){
			document.getElementById('temp').innerHTML= snapshot.val().temp;
			document.getElementById('humid').innerHTML= snapshot.val().humid;
			// document.getElementById('water').innerHTML= snapshot.val().device;
			if(snapshot.val().water==1){
				document.getElementById('water').innerHTML= "Need Water";
		}else{
			document.getElementById('water').innerHTML= "No need Water";
		}
		if(snapshot.val().device==1){
			document.getElementById('device').innerHTML="On";
		}else{
			document.getElementById('device').innerHTML="Off";
		}
		});
		
		firebase.database().ref().update({
			tmp : "NaN",
			humid : "NaN",
			water: "1"
		}, (error) => {
  if (error) {
	  console.log("ERROR",error);
  } else {
	console.log("Wrote");
  }
		});
		document.getElementById("devicePanel").style.display = 'block';
		document.getElementById("loginPanel").style.display = 'none';
	}else {
		console.log("Logout!");
	}
});
