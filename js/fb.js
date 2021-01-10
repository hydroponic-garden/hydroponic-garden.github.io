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
		firebase.auth().onAuthStateChanged(firebaseUser =>{
		if(firebaseUser){
			firebaseUser.updateProfile({
				displayName: "Guest"
			})
		}
			})
			//
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
			device:"0"
		})
	}
		})
}
turnOn = function(){
	firebase.auth().onAuthStateChanged(firebaseUser =>{
	if(firebaseUser){
		firebase.database().ref().update({
			device:"1"
		})
	}
		})
}

editTimer = function(){
	document.getElementById('timer').disabled = false;
}

okTimer=function(){
	if(isNaN(document.getElementById('timer').value) || document.getElementById('timer').value.length < 1){
		document.getElementById('rp').innerHTML = "You need to input a number!";
		document.getElementById('rp_ok').innerHTML = "";
	}
	else{
		document.getElementById('timer').disabled = true;
		document.getElementById('rp').innerHTML = "";
		document.getElementById('rp_ok').innerHTML = "Time has been set!";
		firebase.auth().onAuthStateChanged(firebaseUser =>{
		if(firebaseUser){
			firebase.database().ref().update({
				timer:document.getElementById('timer').value
			})
		}
			})
		
	}
}
editProfile = function(){
	if(document.getElementById('nameAccount').disabled == false){
		if( document.getElementById('nameAccount').value.length > 1){
			document.getElementById('nameAccount').disabled = true;
			document.getElementById('nameAccount').placeholder = document.getElementById('nameAccount').value;
			firebase.auth().onAuthStateChanged(firebaseUser =>{
			if(firebaseUser){
				firebaseUser.updateProfile({
					displayName:document.getElementById("nameAccount").value
				})
			}
				})
		}
		else{
			document.getElementById('nameAccount').disabled = true;
		}
	}
	else{
		document.getElementById('nameAccount').disabled = false;
	}
}

firebase.database().ref().on('value',function(snapshot){
			// document.getElementById('temp').innerHTML= "1";
			// document.getElementById('humid').innerHTML= "1";
			document.getElementById('water').innerHTML= snapshot.val().water;
		});
firebase.auth().onAuthStateChanged(firebaseUser =>{
	console.log("TEST,",firebaseUser);
	if(firebaseUser){
		var user = firebase.auth().currentUser;
		//document.getElementById('nameAccount').innerHTML.replace(document.getElementById("nameAccount").placeholder,user.displayName);
		//console.log(user.email);
		document.getElementById('nameAccount').placeholder=user.displayName;
		document.getElementById('emailAccount').placeholder=user.email;
		
		console.log("12345");
		console.log("12345");
		firebase.database().ref().on('value',function(snapshot){
			// document.getElementById('temp').innerHTML= snapshot.val().temp;
			// document.getElementById('humid').innerHTML= snapshot.val().humid;
			// document.getElementById('water').innerHTML= snapshot.val().device;
			if(snapshot.val().water=="1"){
				document.getElementById('water').innerHTML= "Need water";
		}else if(snapshot.val().water=="2"){
			document.getElementById('water').innerHTML= "Hasn't been water yet.";
		}
		else{
			document.getElementById('water').innerHTML= "No need water";
		}
		if(snapshot.val().device=="1"){
			document.getElementById('device').innerHTML="On";
		}else{
			document.getElementById('device').innerHTML="Off";
		}
		});
		
		firebase.database().ref().update({
			test: "1"
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
