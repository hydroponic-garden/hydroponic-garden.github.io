var attemp = 10;
dashLogin = function(){
	var user = document.getElementById("username").value;
	var pw = document.getElementById("password").value;
	
	if(pw == "khmt" && user == "admin") 
	{ 
		
		window.location = "#";
		
	}
	else{

		
		if(attemp >= 0){
			attemp--;
			document.getElementById('loginStatus').innerHTML = 'Sai tên đăng nhập hoặc mật khẩu. Xin hãy điền chính xác';
		}
		else{
			document.getElementById('loginStatus').innerHTML = 'Nhập sai tài khoản với mật khẩu quá nhiều lần! Xin hãy liên hệ nhóm để lấy mật khẩu!';
		}
	}
	
}
loadClasses = function(){
	
	if(window.location.search == "?login=true"){
		window.location = "#";
	}
	if(window.location.search == "?login=false"){
		if(attemp >= 0){
			attemp--;
			document.getElementById('loginStatus').innerHTML = 'Sai tên đăng nhập hoặc mật khẩu. Xin hãy điền chính xác!';
		}
		else{
			document.getElementById('loginStatus').innerHTML = 'Nhập sai tài khoản với mật khẩu quá nhiều lần! Xin hãy liên hệ nhóm để lấy mật khẩu!';
		}
	}
}