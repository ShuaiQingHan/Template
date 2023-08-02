(function($){
	//ICHECK
//	$('input:checkbox,input:radio').iCheck({
//		checkboxClass: 'icheckbox_square-aero',
//		radioClass: 'iradio_square-aero',
//		increaseArea: '20%' // optional
//	});
	$.messager.model = {
       ok: { text : "确定", classed : 'btn-success' },
       cancel: { text : "取消", classed : 'btn-danger' }
   };
   $(document).on("click",".modal .closeBtn", function() {
      var _model = $(this).closest(".modal");
      $(this).closest(".modal").modal('hide');
      _model.removeData("bs.modal");
  });
   $(document).on("hidden.bs.modal", ".staticModal", function() {
       $(this).removeData("bs.modal");
   });
   $(document).on("hide.bs.modal", ".staticModal", function() {
       $(this).removeData("bs.modal");
   });
   $(document).on("shown.bs.modal", ".staticModal", function() {
      var $input = $('.staticModal input.file[type=file]');
      if ($input.length) {
        $input.fileinput();
    }
    var $selectpicker = $('.staticModal .selectpicker');
    if ($selectpicker.length) {
       $selectpicker.each(function() {
          if(!$(this).parent().hasClass("bootstrap-select")) {
             $(this).selectpicker();
         }
     })
   }
   var $forms = $('.staticModal .form-horizontal form');
   if ($forms.length) {
       $forms.each(function() {
          if(!$(this).hasClass("bv-form")) {
             $(this).bootstrapValidator().on('success.form.bv', function(e) {
                e.preventDefault();
                $form = $(e.target);
                if (e.isDefaultPrevented()) {
                   if($form.attr("enctype") == "multipart/form-data") {
                      var formData = new FormData($form[0]);
                      $form.async({
                        url: $form.attr("action")
                        , type: $form.attr("method")
                        , data: formData
                        , showMask: true
                        , processData: false
                        , contentType: false
                        , success: function (data) {
                           if(data.status == 200) {
                              $.messager.notifySuccess("操作成功",data.results || data.message)
                              $('[data-toggle="table"]').bootstrapTable('refresh');
                              $(".staticModal").modal('hide');
                          } else {
                            $.messager.notifyError("操作失败",data.results || data.message)
                        }
                    }
                    , error: function (event, jqXHR, ajaxSettings, thrownError) {
                        if (event.status == 0) {
                           $.messager.notifyError("操作失败",data.results || data.message);
                       }
                   },complete:function(event,xhr,options) {
                       $form.bootstrapValidator('disableSubmitButtons', false); 
                   }
               })
                  } else {
                      var formData = $form.serializeArray();
                      $form.async({
                          url: $form.attr("action")
                          , type: $form.attr("method")
                          , data: formData
                          , showMask: true
                          , global: false
                          , success: function(data) {
                             if(data.status == 200) {
                                $.messager.notifySuccess("操作成功",data.results || data.message)
                                $('[data-toggle="table"]').bootstrapTable('refresh');
                                $(".staticModal").modal('hide');
                            } else {
                                $.messager.notifyError("操作失败",data.results || data.message);
                            }
                        },complete:function(event,xhr,options) {
                           $form.bootstrapValidator('disableSubmitButtons', false); 
                       }
                   });
                  }
              }
          })
         }
     })
   }
});
})(jQuery);

function prepareTreeStyle(tree){
    var result = [];
    if(tree != undefined){

        if(!$.isArray(tree)){
            result.push(_prepareTreeItem(tree));
        }else{
            $.each(tree, function(){
                result.push(_prepareTreeItem(this));
            });
        }
    }
    return result;
}

function _prepareTreeItem(treeItem){
    if(treeItem){
        if(treeItem.selectable != undefined && treeItem.selectable == false)
            $.extend(treeItem, {color: "#ABB7B7"});
        if($.isArray(treeItem.nodes)){
//            $.extend(treeItem, {icon: 'fa fa-home'});
treeItem.nodes = prepareTreeStyle(treeItem.nodes);
}
}
return treeItem;
}
/*
(function(className,$){
	$.fn.extend($.fn.multipleSelect.defaults,{
		selectAll: false,
		single: true,
		isShowButton: false,
		noMatchesFound: "没有找到匹配项",
		width: "100%"
	});
	setTimeout(function(){
		$(className).multipleSelect();
	},1);
})(".ms-select",jQuery);*/
/**
 * table序号
 */
function indexFormatter(value, row, index) {
	//console.log(row)
	return index+1;
}
/**
 * table值日期格式化，yyyy-MM-dd
 */
function dateFormatter(value, row, index) {
	if (value) {
		return new Date(value).format("yyyy-MM-dd");
	} else {
		return "-";
	}
}

/**
 * table值日期格式化，yyyy-MM-dd
 */
function dateTimeFormatter(value, row, index) {
	if (value) {
		return new Date(value).format("yyyy-MM-dd hh:mm:ss");
	} else {
		return "-";
	}
}

/**
 * table值两位小数
 */
function tableColumnTwoDecimalFormatter(value, row, index) {
	if (value){
		return parseFloat(value).toDecimal2();
	} else {
		return "";
	}
}
/**
 * table值两位小数，带百分比
 */
function percentageFormatter(value, row, index) {
	if (value) {
		return parseFloat(value).toDecimal2() + "%";
	} else {
		return "";
	}
}