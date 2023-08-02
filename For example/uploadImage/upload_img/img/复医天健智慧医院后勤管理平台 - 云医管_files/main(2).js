$(function() {
	$("body").on("mousedown",".updatePwd .input-group-addon", function(e) {
		$(e.target).parent().find("input").attr("type","text");
	});
	$("body").on("mouseup",".updatePwd .input-group-addon", function(e) {
		$(e.target).parent().find("input").attr("type","password");
	});
});