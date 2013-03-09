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
	$('.verify').click(function() {
		var code = $('#verify .code').val();
		if (code.length != 6) {
			$('#verify .error').replaceWith("<p class=\"error\">please enter only the 6 digits you were sent</p>");
			return false;
		}
		else if (typeof code != "number") {
			$('#verify .error').replaceWith("<p class=\"error\">please only enter numbers for the code</p>");
			return false;
		}
		else {
			location.href = "favorites";
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

function searchResult(data) {
   	$( "#fav_search" ).autocomplete ({
       	source: data
   	});
}

function adjustSize() {
	var width = $(window).width() - .3 * $(window).width();
	var videoHeight = width/2.39;
	var footerWidth = $(window).width();
	$('#landing .video, body, header, #landing, #favorites, footer > div, #favorites #fav_search').width(width);
	$('#landing .video').height(videoHeight);	
	$('footer').width(footerWidth);
	$('#landing .left_column, #landing .right_column').width(width/2 - 10);
}


window.onresize = adjustSize;
window.onload = adjustSize;
