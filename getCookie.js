(function getCookie(){
	var cookie = document.cookie.split(';');
	for(var val of cookie){
		var item = val.split('=');
		console.log(item.length >2?item.slice(1).join('='):item[1]);
	}
})();
