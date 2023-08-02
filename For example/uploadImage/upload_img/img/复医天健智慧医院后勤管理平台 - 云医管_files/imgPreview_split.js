$(function(){
	xOffset = 10;
	yOffset = 30;
	$(document).on("mouseover", ".preview",function(a){
		this.t = this.title;
		this.title = "";
		var b = (this.t != "") ? "<br/>" + this.t : "";
		$("body").append("<p id='imgpreview'><img src='" + $(this).attr("ref")+ "' alt='正在加载预览图...' />" + b + "</p>");
		$("#imgpreview").css("top", (a.pageY - xOffset) + "px").css("left", (a.pageX + yOffset) + "px").fadeIn("fast")
	});
	$(document).on("mouseout", ".preview",function(e){
		this.title = this.t;
		$("#imgpreview").remove()
	});
	$(document).on("mousemove", ".preview",function(a){
		$("#imgpreview").css("top", (a.pageY - xOffset) + "px").css("left", (a.pageX + yOffset) + "px")
	});
});