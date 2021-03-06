$(document).ready(function() {
	$('.auth-info').click(function() {
		document.title = "CubGrub - login";
	});
	$('.reg-button').click(function() {
		document.title = "CubGrub - register";
	});
	$('.cancel').click(function() {
		document.title = "CubGrub";
	});	
	$('#video_cover').click(function(){
		$('#video_player').show();
		$('#video_cover').hide();
	});
	$('.register').click(function() {
		var area = $('#register .area').val();
		var first = $('#register .first').val();
		var last = $('#register .last').val();
		var tele = area + first + last;
		var pwd = $('#register .pwd').val();
		var pwd_conf = $('#register .pwd_conf').val();	
		if (tele.length != 10) {
			humane.log("only as many digits as you have on your paws");
			return false;
		}
		else if (typeof parseInt(tele) != "number") {
			humane.log("no special characters");
			return false;
		}
		else if (pwd != pwd_conf) {
			humane.log("passwords do not match");
		return false;
		} 
		else if (pwd.length < 6) {
			humane.log("please choose a longer password");
			return false;
		}
		else {
			localStorage.setItem("tele", tele);
			location.href = "index#verify";	
		}
	});
	$('.verify').click(function() {
		var code = $('#verify .code').val();
		if (code.length != 6) {
			humane.log("please enter only the 6 digits you were sent");
			return false;
		}
		else if (typeof code != "number") {
			humane.log("no special characters");
			return false;
		}
		else {
			location.href = "favorites";
		}
	});
	$('.login').click(function() {
		var area = $('#login .area').val();
		var first = $('#login .first').val();
		var last = $('#login .last').val();
		var tele = area + first + last;
		var pwd = $('#login .pwd').val();
		if (tele.length != 10) {
			humane.log("only as many digits as you have on your paws");
			return false;
		}
		else if (typeof parseInt(tele) != "number") {
			humane.log("no special characters");
			return false;
		}
		else if (pwd.length < 6) {
			humane.log("please choose a longer password");
			return false;
		}
		else {
			localStorage.setItem("tele", tele);
			location.href = "favorites";	
		}
	});
	$('#verify .code').keyup(function(){
		if($(this).val().length>=$(this)[0].maxLength){
			$('#verify .verify').focus();
		}
	});
	$('#register .phone.area').keyup(function(){
		if($(this).val().length>=$(this)[0].maxLength){
			$('#register .phone.first').focus();
		}
	});
	$('#login .phone.area').keyup(function(){
		if($(this).val().length>=$(this)[0].maxLength){
			$('#login .phone.first').focus();
		}
	});
	$('#register .phone.first').keyup(function(){
		if($(this).val().length>=$(this)[0].maxLength){
			$('#register .phone.last').focus();
		}
	});
	$('#login .phone.first').keyup(function(){
		if($(this).val().length>=$(this)[0].maxLength){
			$('#login .phone.last').focus();
		}
	});	
	$('#register .phone.last').keyup(function(){
		if($(this).val().length>=$(this)[0].maxLength){
			$('#register .pwd').focus();
		}
	});
	$('#login .phone.last').keyup(function(){
		if($(this).val().length>=$(this)[0].maxLength){
			$('#login .pwd').focus();
		}
	});
	$('#fav_search').keypress(function(e) {
		if(e.which == 13) {
			addFav();
			return false;
		}
	});
	$('#fav_add').click(function() {
		addFav();
		return false;
	});

});
	function searchOpen() {
    	var search = $('#fav_search').val()
    	var keyword = {
        	search: search
    	};
    	$.ajax({
        	url: 'api/fav_search',
        	data: keyword,
        	dataType: 'jsonp',
        	jsonp: 'callback',
        	jsonpCallback: 'searchResult'
    	});
	}

$(document).on("dblclick", "li.24hrs", function(){ 
	var el = $(this);
	var inside = el.html();
	el.remove();
	$.post('api/remove_favorite', [localStorage.getItem("tele"), inside]);
	humane.log("unloved", {timeout:400});
});

function searchResult(data) {
   	$( "#fav_search" ).autocomplete ({
       	source: data
   	});
}
localStorage.setItem("tele", 8053455180)
function addFav() {
	var fav = $('#fav_search').val();
	var telephone = localStorage.getItem("tele");
	$('#chosen_favorites').prepend("<li class=\"24hrs\">" + fav + "</li>");
	$('#fav_search').val('');
	humane.log("added", {timeout:500});
	function getCookie(name) {
	    var cookieValue = null;
	    if (document.cookie && document.cookie != '') {
	        var cookies = document.cookie.split(';');
	        for (var i = 0; i < cookies.length; i++) {
	            var cookie = jQuery.trim(cookies[i]);
	            // Does this cookie string begin with the name we want?
	            if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                break;
	            }
	        }
	    }
	    return cookieValue;
	}
	var csrftoken = getCookie('csrftoken');

	function csrfSafeMethod(method) {
	    // these HTTP methods do not require CSRF protection
	    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
	}
	function sameOrigin(url) {
	    // test that a given url is a same-origin URL
	    // url could be relative or scheme relative or absolute
	    var host = document.location.host; // host + port
	    var protocol = document.location.protocol;
	    var sr_origin = '//' + host;
	    var origin = protocol + sr_origin;
	    // Allow absolute or scheme relative URLs to same origin
	    return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
	        (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
	        // or any other URL that isn't scheme relative or absolute i.e relative.
	        !(/^(\/\/|http:|https:).*/.test(url));
	}
	$.ajaxSetup({
	beforeSend: function(xhr, settings) {
	    if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
	        // Only send the token to relative URLs i.e. locally.
	        xhr.setRequestHeader("X-CSRFToken",
	                             $('input[name="csrfmiddlewaretoken"]').val());
	    }
	}
	});
	var postdata = {
		'favorites': fav,
		'telephone': telephone
	}
	$.post('api/add_favorite', {
		data: postdata
	});
	
	
	
}

function adjustSize() {
	var width = $(window).width() - .3 * $(window).width();
	var videoHeight = width/2.39;
	var footerWidth = $(window).width();
	$('#landing .video, body, header, #landing, #favorites, footer > div').width(width);
	$('#landing .video').height(videoHeight);	
	$('footer').width(footerWidth);
	$('#landing .left_column, #landing .right_column').width(width/2 - 10);
	$('#favorites #fav_search').width(width/7 * 6 - 10);
	$('#favorites #fav_add').width(width/7 - 30);
}



window.onresize = adjustSize;
window.onload = adjustSize;
