(function($,window){
	'use strict';
	var pluginName = 'selectTree';
	
	var _default = {
		settings:{
			onNodeSelected: undefined
			,onNodeChecked: undefined
			,onNodeUnchecked: undefined
			,isCheckChild:false	//是否全选子级
			,isCheckParent:false //是否全选父级
			,isShowFullName:false //是否显示全路径
			,separator:" - " 		   //全路径分隔符
			,idField:"id"
			,textField:"text"
			,fullNameField:"_fullName"
		}
		,options:{
			onLoadingFailed: undefined
		}
		,ajax:{
			method: 'POST',
			dataType: 'json',
			cache: false
		}
		,downIcon:"iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEBJREFUeNpiYBhxgHHmzJkGQHo/EAtgkf8AxI7p6ekXiDYQROAwlGTD4AZiMZQsw1AMRDJ0PRAHkmPYCAUAAQYAqDoXBSkcaRUAAAAASUVORK5CYII="
	};
	
	var SelectTree = function(element, options) {
		this.$element = $(element);
		this.$el = this.$element.clone()
					.attr("name", this.uuidExp("xxxxxxxxxxxxxxxx"))
					.removeAttr("id")
					.removeAttr("value")
					.css({
						"background": "url(data:image/png;base64,"+_default.downIcon+") no-repeat center right"
						,"padding-right": "25px"
					})
					.insertBefore(this.$element);
		this.$element.hide();
		this._init(options);
		this.resize();
		return this;
	}
	
	SelectTree.prototype._init = function(options) {
		this._tree = [];
		this._initialized = false;
		this._options = $.extend(true, {}, _default.settings, options);
		this._destroy();
		this._subscribeEvents();
		this.$el.parent().mask("数据加载中");
		this._load(options)
            .then($.proxy(function(data) {
                // load done
                return this._options.data = $.extend(true, [], this._prepareTreeStyle(data));
            }, this), $.proxy(function(error) {
                // load fail
                this._triggerEvent('loadingFailed', error, _default.options);
            }, this))
			.then($.proxy(function() {
                // render to DOM
                this._render();
                this.$el.parent().unmask();
            }, this));
	}
	SelectTree.prototype._render = function() {
		var that = this;
        if (!that._initialized) {
            that._initialized = true;
			
			that.$el.on("click",function(e) {
				that._showTree();
			})
			.on('keydown', function(e) {
				if (e.keyCode == 13) {
					e.preventDefault()
				}
				that._search(that,e);
			});
	
			that.$tree = $("<div></div>").appendTo(that.$element.parent()).treeview($.extend(true, {}, that._options, {
				onNodeSelected:function(event, node) {
					if (!that._options.showCheckbox) {
						that.$element.val(node[that._options.idField]);
						that.resetForm();
						that._hideTree();
					}
					that._triggerEvent('nodeSelected', node, that._options);
				},
				onNodeChecked: function(event, node) { //选中节点
					that.checkedChildNodes(node);
					that.checkedParentNodes(node);
		            that._triggerEvent('nodeChecked', node, that._options.onNodeChecked);
		        },
		        onNodeUnchecked: function (event, node) { //取消选中节点
		        	that.unCheckedParentNodes(node);
		            that._triggerEvent('nodeUnchecked', node, that._options.onNodeChecked);
		        }
			})).hide();
        }
    };
    
    /**
     * 根据节点选中所有子节点
     * @param {Object} node
     */
    SelectTree.prototype.checkedChildNodes = function(node){
    	var that = this;
    	if (that._options.isCheckChild) {
			$.each(that.getChildNodes(node), function() {
				that.$tree.treeview('checkNode', [this.nodeId,{silent: true}]);
			});
			that.checkedEnd();
			that.resetForm();
		}
	}
    
    /**
     * 根据节点选中所有父节点
     * @param {Object} node
     */
    SelectTree.prototype.checkedParentNodes = function(node){
    	var that = this;
    	if (that._options.isCheckParent) {
			$.each(that.getParentNodes(node), function() {
				that.$tree.treeview('checkNode', [this.nodeId,{silent: true}]);
			});
			that.checkedEnd();
			that.resetForm();
		}
	}
    
    /**
     * 根据节点取消选中所有子节点
     * @param {Object} node
     */
    SelectTree.prototype.unCheckedParentNodes = function(node){
    	var that = this;
    	if (that._options.isCheckChild) {
			$.each(that.getChildNodes(node), function() {
				that.$tree.treeview('uncheckNode', [this.nodeId,{silent: true}]);
			});
			that.checkedEnd();
			that.resetForm();
		}
	}
    
    /**
     * 多选框选择后，重置文本框的内容
     * @param {Object} node
     */
    SelectTree.prototype.checkedEnd = function(){
    	var that = this;
    	var _values = new Array();
    	var _texts = new Array();
    	$.each(this.$tree.treeview("getChecked"),function(){
			if(this[that._options.idField]) {
				_values.push(this[that._options.idField]);
				
				if(that._options.isShowFullName) {
					_texts.push(this[that._options.fullNameField]);
				} else {
					_texts.push(this[that._options.textField]);
				}
			}
		});
		that.$element.val(_values.join());
		that.$el.val(_texts.join());
	}
    
    /**
     * 根据节点获取所有子节点
     * @param {Object} node
     */
    SelectTree.prototype.getChildNodes = function(node){
    	var that = this;
        var ts = new Array();
        ts.push(node);
        if(node["nodes"] && node["nodes"].length > 0){
        	$.each(node["nodes"], function() {
        		$.each(that.getChildNodes(this),function() {
    				ts.push(this);
    			});
        	});
        }
        return ts;
	}
    
    /**
     * 根据节点获取所有父节点
     */
    SelectTree.prototype.getParentNodes = function( node ){
    	var that = this;
	   var _fs = new Array();
	   var _parent = that.$tree.treeview('getParents', node);
   		$.each(_parent,function() {
   			_fs.push(this);
   			if(this.parentId) {
   				$.each(that.getParentNodes(_parent), function() {
   					_fs.push(this);
   				});
			}
		});
	   return _fs;
	}
	
	SelectTree.prototype._hideTree = function() {
		var that = this;
		$.each(that.$tree.treeview('getNodes'),function() {
			if(this[that._options.idField] == that.$element.val()) {
				if(that._options.isShowFullName) {
					that.$el.val(this[that._options.fullNameField]);
				} else {
					that.$el.val(this[that._options.textField]);
				}
				that.$tree.treeview('selectNode', this, {silent: true});
			}
		});
		that.$tree.hide();
	}
	
	/**
     * 结合bootstrapValidator验证框架，当值发生改变时重置form验证
     */
    SelectTree.prototype.resetForm = function(){
    	var $form = this.$element.closest("form.bv-form"); //重置select的验证规则
        if ( $form && $form.length > 0 ) {
            $form.data('bootstrapValidator').resetForm();
		}
    }
	
	SelectTree.prototype._showTree = function() {
		var that = this;
		if(that.$tree.is(":hidden")) {
			that.$tree.show();
			var _maxHeight = $(window).height() - that.$el.offset().top - that.$el.height();
			if(_maxHeight > 10) {
				_maxHeight - 10;
			}
			if(_maxHeight < 0) {
				_maxHeight - 10;
			}
			that.$tree.css({
				"position":"absolute"
				,"top":that.$el.position().top + that.$el.outerHeight()
				,"left":that.$el.position().left
				,"width":that.$el.outerWidth()
				,"z-index":2999
			})
			if(that._options.height) {
				var str = that._options.height
				if (str.substring(str.length,str.length-1) == "%") {
					that._options.height = str.substring(0,str.length-1) + "vh"
				}
				that.$tree.css({
				    "max-height": that._options.height
				    ,"overflow-y": "auto"
				    ,"border-bottom": "1px solid #ccc"
				    ,"border-left": "1px solid #ccc"
				});
			}
			that.$tree.treeview('clearSearch');
		}
		this._bindHide(that);
	}
	
	/**
	 * 重置位置
	 */
	SelectTree.prototype.resize = function() {
		this._resize();
		this._keydown();
	}
	
	/**
	 * 监听键盘点击事件
	 */
	SelectTree.prototype._keydown = function() {
		var that = this;
		$(window).one("keydown", function(e) {
			if(e.keyCode==27){
				that._hideTree();
    　　　　} else {
    			that._keydown();
    　　　　}
		});
	}
	
	/**
	 * 浏览器窗口移动事件
	 */
	SelectTree.prototype._resize = function() {
		var that = this;
		$(window).one("resize scroll", function(e) {
			that._offset();
			that._resize();
		});
	}
	
	SelectTree.prototype._offset = function() {
		this.$tree.css({
			"top":this.$el.position().top + this.$el.outerHeight()
			,"left":this.$el.position().left
		})
	}
	
	SelectTree.prototype._bindHide = function(that) {
		$(window).one("click",{"that":that}, function(e) {
			var $this = $(e.target),that = e.data.that;
			var _tree = $this.closest(".treeview");
			if(that.$tree.length>0 && _tree[0] != that.$tree[0] && $this[0] != that.$el[0]) {
				that._hideTree();
			} else {
				that._bindHide(that);
			}
		});
	}
	
	SelectTree.prototype._search = function(that,e) {
		window.clearTimeout(this.timeout);
		that.timeout = window.setTimeout(function() {
			that.$tree.treeview('search', [$(e.target).val(), { ignoreCase: false, exactMatch: false }]);
		},100);
	}
	
	SelectTree.prototype._load = function(options) {
        var done = new $.Deferred();
        if (options.data) {
            this._loadLocalData(options, done);
        } else if (options.dataUrl) {
            this._loadRemoteData(options, done);
        }
        return done.promise();
    };
	
	SelectTree.prototype._loadRemoteData = function(options, done) {
        $.ajax($.extend(true, {}, _default.ajax, options.dataUrl))
            .done(function(data) {
                done.resolve(data);
            })
            .fail(function(xhr, status, error) {
                done.reject(error);
            });
    };

    SelectTree.prototype._loadLocalData = function(options, done) {
        done.resolve((typeof options.data === 'string') ?
            JSON.parse(options.data) :
            $.extend(true, [], options.data));
    };
	
	/**
	 * 销毁
	 */
	SelectTree.prototype._destroy = function() {
        if (!this._initialized) return;
        this._initialized = false;

        // Switch off events
        this._unsubscribeEvents();
    };
	
	/**
	 * 取消绑定事件
	 */
	SelectTree.prototype._unsubscribeEvents = function() {
		this.$element.off('nodeSelected');
		this.$element.off('loadingFailed');
		this.$element.off('nodeChecked');
		this.$element.off('nodeUnchecked');
    };
	
	/**
	 * 绑定事件
	 */
	SelectTree.prototype._subscribeEvents = function() {
        this._unsubscribeEvents();
		if (typeof(this._options.onNodeSelected) === 'function') {
            this.$element.on('nodeSelected', this._options.onNodeSelected);
        }
		if (typeof(this._options.onLoadingFailed) === 'function') {
            this.$element.on('loadingFailed', this._options.onLoadingFailed);
        }
		if (typeof (this._options.onNodeChecked) === 'function') {
			this.$element.on('nodeChecked', this._options.onNodeChecked);
		}
		if (typeof (this._options.onNodeUnchecked) === 'function') {
			this.$element.on('nodeUnchecked', this._options.onNodeUnchecked);
		}
	}
	SelectTree.prototype._triggerEvent = function(event, data, options) {
        if (options && !options.silent) {
            this.$element.trigger(event, $.extend(true, {}, data));
        }
    }
	
	SelectTree.prototype._prepareTreeStyle = function(data, parent) {
		var tree = data["results"]?data["results"]:data;
		var result = [];
		if(tree != undefined){
			var that = this;
			if($.isArray(tree)){
				$.each(tree, function(){
					result.push(that._prepareTreeItem(this, parent));
				});
			} else {
				result.push(that._prepareTreeItem(tree, parent));
			}
		}
		return result;
   }
	
	SelectTree.prototype._prepareTreeItem = function(treeItem, parent){
		if(treeItem){
			if(!treeItem[this._options.fullNameField]) {
				if(parent && parent[this._options.idField] && parent[this._options.fullNameField]) {
					treeItem[this._options.fullNameField] = parent[this._options.fullNameField] + this._options.separator + treeItem[this._options.textField];
				} else {
					treeItem[this._options.fullNameField] = treeItem[this._options.textField];
				}
			}
			
			var _val = this.$element.val().split(",");
			if(this.$element.val().split(",").contains(treeItem[this._options.idField])) {
				var _text = treeItem[this._options.fullNameField];
				if(!this._options.isShowFullName) {
					_text = treeItem[this._options.textField];
				}
				if(this._options.showCheckbox) {
					$.extend(true, treeItem, {state: {checked:true}});
					$.extend(true, parent, {state: {expanded:false}});
					if (this.$el.val()) {
						_text = this.$el.val() + ", " + _text;
					} else {
						_text =  _text;
					}
					this.$el.val(_text);
				} else if(_val.length == 1){
					$.extend(true, treeItem, {state: {selected:true}});
					$.extend(true, parent, {state: {expanded:true}});
					this.$el.val(_text);
				}
				
			}
			if(treeItem.selectable != undefined && treeItem.selectable == false) {
				$.extend(true, treeItem, {color: "#000000"});
			}
			if($.isArray(treeItem.nodes)){
	//            $.extend(treeItem, {icon: 'fa fa-home'});
				treeItem.nodes = this._prepareTreeStyle(treeItem.nodes, treeItem);
			}
		}
		return treeItem;
	}
	SelectTree.prototype.uuidExp = function(exp) {
	    return exp.replace(/[xy]/g, function(c) {
	        var r = Math.random() * 16 | 0,
	            v = c == 'x' ? r : (r & 0x3 | 0x8);
	        return v.toString(16);
	    });
	};
	
    $.fn[pluginName] = function(options, args) {

        var result;
        if (this.length == 0) {
            throw "No element has been found!";
        }

        this.each(function() {
            var _this = $.data(this, pluginName);
            if (typeof options === 'string') {
                if (!_this) {
                    logError('Not initialized, can not call method : ' + options);
                } else if (!$.isFunction(_this[options]) || options.charAt(0) === '_') {
                    logError('No such method : ' + options);
                } else {
                    if (!(args instanceof Array)) {
                        args = [args];
                    }
                    result = _this[options].apply(_this, args);
                }
            } else if (typeof options === 'boolean') {
                result = _this;
            } else {
                $.data(this, pluginName, new SelectTree(this, $.extend(true, {}, options)));
            }
        });

        return result || this;
    };
    
})(jQuery,window);

/**
 * 判断元素是否在数组内
 */
Array.prototype.contains = function(obj) {
	var i = this.length;
	while (i--) {
		if (this[i] === obj) {
			return true;
		}
	}
	return false;
}