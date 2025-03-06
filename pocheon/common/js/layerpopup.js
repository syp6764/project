var date = new Date();
var year = String(date.getFullYear());
var month = String(date.getMonth() + 1);
var day = String(date.getDate());

var hours = String(date.getHours());
var minutes = String(date.getMinutes());

if (("" + month).length == 1){
	month = "0" + month;
}
if (("" + day).length == 1){
	day = "0" + day;
}
if (("" + hours).length == 1){
	hours = "0" + hours;
}
if (("" + minutes).length == 1){
	minutes = "0" + minutes;
}

var todatehours = year + month + day + hours + minutes;
var intdate = parseInt(todatehours);
var todate = year + "-" + month + "-" + day;

function main_getCookie(name){
	var nameOfCookie = name + "=";
	var x = 0;
	while (x <= document.cookie.length) {
			var y = (x + nameOfCookie.length);
			if (document.cookie.substring(x, y) == nameOfCookie) {
					if ((endOfCookie = document.cookie.indexOf(";", y)) == -1) 
							endOfCookie = document.cookie.length;
					return unescape(document.cookie.substring(y, endOfCookie));
			}
			x = document.cookie.indexOf(" ", x) + 1;
			if (x == 0) 
					break;
	}
	return "";
}

function main_setCookie( name, value, expiredays ) {
	var todayDate = new Date();
		todayDate.setDate( todayDate.getDate() + expiredays );
		document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

function main_closeWind( layer_name , form_name ) {
	if ( document.all[form_name].chkbox.checked ){
		main_setCookie( layer_name, "done" , 1 );
	}
	document.all[layer_name].style.visibility = "hidden";//화면에서 숨긴다
	var embedTags = document.getElementById(layer_name).getElementsByTagName("embed");//해당 div의 embed태그를 찾는다
	var length = embedTags.length;//embed태그의 길이를 구한다
	if(embedTags.length > 0) {//0개이상일경우
		for(var i = 0; i<length; i++) {
			embedTags[i].Stop();//다 꺼버린다.
		}
	}
}