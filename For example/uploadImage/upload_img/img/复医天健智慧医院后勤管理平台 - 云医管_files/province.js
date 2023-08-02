function settingFormatter(value, row, index) {
	var s
	if (row.status == 0) {
		s = '<a href="javascript:void(0)" class="btn btn-default btn-start"style="margin-left:25px;">选定</a>'
	} else{
		s = '<a href="#" class="btn btn-default btn-stop">取消选定</a>'
	}
	return [
	        '<div style="height:20px;text-align: center;">'
	        ,'<div class="btn-group btn-group-xs">'
			,s
			,'<a href="img_deatil.html" class="btn btn-default" data-toggle="modal" data-target=".staticModal" style="margin-left:10px;">查看</a>'
	        ,'</div>'
	        ,'</div>'].join("");
}


function isEnableFormatter(value, row, index) {
	return value == 1 ? "选定" : "未选定"
}

settingEvents = {
	'click .btn-stop': function (e, value, row, index) {
		$.messager.confirm("提示", "您确定要取消选定<span style='color:red'>"+row.name+"</span>吗？", function() {
			$.post(ias.config.ctx+"config/address/disable.do",{
				id:row.id
			},function(data) {
				if(data.status == 200) {
					$.messager.notifySuccess("操作成功",data.results)
					$('[data-toggle="table"]').bootstrapTable('refresh');
				} else {
					$.messager.notifyError("操作失败",data.results)
				}
			});
		});
   	},
	'click .btn-start': function (e, value, row, index) {
		$.messager.confirm("提示", "您确要选定<span style='color:red'>"+row.name+"</span>吗？", function() {
			$.post(ias.config.ctx+"config/address/start.do",{
				id:row.id
			},function(data) {
				if(data.status == 200) {
					$.messager.notifySuccess("操作成功",data.results)
					$('[data-toggle="table"]').bootstrapTable('refresh');
				} else {
					$.messager.notifyError("操作失败",data.results)
				}
			});
		});
   },
}
//上传图片
   	$("#file-img").fileinput({
           uploadUrl: ias.config.ctx + 'upload/baidu/image.do', 
           allowedFileExtensions : ['jpg', 'png','gif'],
           overwriteInitial: false,
           uploadAsync:true,
           layoutTemplates:{
   //      		actionDelete:'', //去除上传预览的缩略图中的删除图标
               actionUpload:'',//去除上传预览缩略图中的上传图片；
   //          actionZoom:''   //去除上传预览缩略图中的查看详情预览的缩略图标。
           },
           showDelete:false,
           showUpload: false, //是否显示上传按钮
           maxFileSize: 1000,
           maxFilesNum: 5,
           //allowedFileTypes: ['image', 'video', 'flash'],
           slugCallback: function(filename) {
               return filename.replace('(', '_').replace(']', '_');
           }
   	}).on("filebatchselected",function(event, files) {
   		  	$(this).fileinput("upload");
   		 });	

   	$('#file-img').on('fileuploaded', function(event, data, previewId, index) {
   		var id_str = $("#pics").val()
   		if(id_str != ''){
   		    id_str += ',' + data.response.results.id
   		} else {
   			id_str = data.response.results.id
   		}
   		$("#pics").val(id_str)
   		$('#' + previewId).attr('fileid', data.response.results.id);
   	}).on('filesuccessremove', function (event, previewId, extra) {
   　　　　 var deleteId =　$('#' + previewId).attr('fileid')
   		$("#pics").val($("#pics").val().split(',').remove(deleteId).join(','))
   		
    	}).on('fileclear', function(event, data, msg) {
          $("#pics").val('')
       });


function cookies(getExpanded) {
	var cookies = {};
	$(getExpanded).each(function() {
		if (this.state.selected || this.state.expanded || this.state.checked) {
			cookies[this.id] = {
					state: {
						expanded:this.state.expanded
						,selected:this.state.selected
						,checked:this.state.checked
					}
				}
		}

	})
	cookies=JSON.stringify(cookies);
	$.cookie('treeview-remember', cookies);
}
function datas(node) {
	var cookies = $.cookie("treeview-remember")
	if (cookies) {					
		cookies = JSON.parse(cookies)
	}
    if(node && cookies){
        for(x in node){
            $.extend(node[x], cookies[node[x].id]);
            if(node[x].nodes){
            	node[x].nodes = datas(node[x].nodes);
            }
        }
    }
   return node;
	
}

$(function() {
	$.get('../../../../../dist/data/addtree.json',function(data) {
		
		$('#tree-container').treeview({
			data: datas(data.results),
			levels: 2,
			nodeIcon: 'icon-layers',
			showBorder: false,
			enableLinks:true,
			showTags: true,
			onNodeSelected:function(event, node) {
				//
//				if(node.nodes){
//					
//					$("#toolbar").hide()
//				}else{
//					
//					$("#toolbar").show()
//				}
				$('[data-toggle="table"]').bootstrapTable("refreshOptions",{
					url : ias.config.ctx+"config/address/refresh.json?&areaId="+node.id
				});
				
				var getExpanded = $('#tree-container').treeview('getNodes');
     			cookies(getExpanded);
				
			},
			/*onNodeChecked: function(event, node) { //选中节点
	            var getExpanded = $('#tree-container').treeview('getNodes');
	            cookies(getExpanded);
	        },
	        onNodeUnchecked: function (event, node) { //取消选中节点
	            var getExpanded = $('#tree-container').treeview('getNodes');
	            cookies(getExpanded);
	        },*/
	        onNodeCollapsed: function (event, node) {
	        	/*var getExpanded = $('#tree-container').treeview('getNodes');
	        	cookies(getExpanded);*/
	        },
	        onNodeExpanded: function (event, node) {
	        	/*var getExpanded = $('#tree-container').treeview('getNodes');
	        	cookies(getExpanded);*/
	        }
		});

		$(".layout-tree").unmask();
		
		var arrs = $('#tree-container').treeview('getSelected')
		if(arrs.length>0){
			$('[data-toggle="table"]').bootstrapTable("refreshOptions",{
				url : ias.config.ctx+"config/address/refresh.json?&areaId="+arrs[0].id
			});
		}
		
	})
	
	
	
	$("#new_select").on("click",function(event){
		event.stopPropagation();
		var title_id = $('#tree-container').treeview('getSelected')[0].id;
		var e = event || window.event;

		$(".context-menu-list").remove();
		
		var list='<ul class="context-menu-list context-menu-root" style="width: 182px; position: absolute; top: '+ e.clientY +'px; left: '+ e.clientX +'px; z-index: 3;">'
			+'<li class="context-menu-item"><span><a href="'+ias.config.ctx+'config/address/addArea.do?id='+title_id+'" data-toggle="modal" data-target=".staticModal">新增</a></span></li>'
			+'<li class="context-menu-item"><span><a id="del_title" href="javascript:void(0)" >删除</a></span></li>'
			+'</ul>'
		
		$('body').append(list);
	})
	$('body').on("click", function(){
		$(".context-menu-list").remove();
	})
	
	$('body').on("click", "#del_title", function(){
		var title_id = $('#tree-container').treeview('getSelected')[0].id;
		var teamName = $('#tree-container').treeview('getSelected')[0].text;
		$.messager.confirm("提示", "您确定要删除<span style='color:red'>"+teamName+"</span>吗？", function() {
			$.post(ias.config.ctx+"config/address/remove.do",{
				"id":title_id
			},function(data) {
				if(data.status == 200) {
					$.messager.notifySuccess("操作成功",data.results)
					window.location.reload();
					$(".staticModal").modal('hide');
				} else {
					$.messager.notifyError("操作失败",data.results)
				}
			});
		});
	})
	
	
	
	
	
	
})



