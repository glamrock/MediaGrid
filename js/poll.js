$(document).ready(function(){ 

if (document.cookie.indexOf('uploaded=1') != -1) {
	document.cookie = 'uploaded=0';
	$('<div id="message"><h4>Upload successful! Your file should appear shortly.</h4></div>').insertAfter('#path');
	setTimeout("$('#message').fadeOut(300);",4000);
}

getData($('.epoch').first().text());

});

var getData = function(lastupdate) {
var polltime;
if (lastupdate) { polltime = lastupdate; } else { polltime = ''; }
$.ajax({
	type: "GET",
	// set the destination for the query
	url: window.location + '&poll='+polltime,
	// needs to be set to true to avoid browser loading icons
	async: true,
	// timeout after 30 seconds
	timeout:30000,
	// process a successful response
	success: function(response) {
		$(response).insertAfter('#headers').fadeIn("slow");
		getData($('.epoch').first().text());
	},
	// handle error
	error: function(XMLHttpRequest, textStatus, errorThrown){
		setTimeout('getData('+$('.epoch').first().text()+');', 1000);
	},
});
};