$(function(){
  $(document).on("click", ".btn-print", function() {
	  var $ifr = $("iframe.ifr-print");
	  if($ifr.length == 0) {
			$ifr = $('<iframe src="about:blank" style="width:0;height:0;overflow: hidden;position: absolute;left:-900px;" class="ifr-print"></iframe>').appendTo("body");
		}
		$ifr.attr("src", $(this).data("href"));
		
	});
});