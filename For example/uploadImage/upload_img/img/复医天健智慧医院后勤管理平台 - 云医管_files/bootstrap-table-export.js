/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * extensions: https://github.com/kayalshri/tableExport.jquery.plugin
 */

(function ($) {
    'use strict';
    var sprintf = $.fn.bootstrapTable.utils.sprintf;
    var calculateObjectValue = $.fn.bootstrapTable.utils.calculateObjectValue;

    var TYPE_NAME = {
        json: '导出JSON',
        xml: '导出XML',
        png: '导出PNG',
        csv: '导出CSV',
        txt: '导出TXT',
        sql: '导出SQL',
        doc: '导出Word',
        excel: '导出Excel',
        powerpoint: '导出Powerpoint',
        pdf: '导出PDF'
    };

    $.extend($.fn.bootstrapTable.defaults, {
        showExport: false,
        serverExportUrl:"",
        exportDataType: 'basic', // basic, all, selected
        // 'json', 'xml', 'png', 'csv', 'txt', 'sql', 'doc', 'excel', 'powerpoint', 'pdf'
        exportTypes: ['json', 'xml', 'csv', 'txt', 'sql', 'excel'],
        exportOptions: {}
    });
    $.extend($.fn.bootstrapTable.defaults.icons, {
        "export": "glyphicon-export icon-share"
    });

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initToolbar = BootstrapTable.prototype.initToolbar;

    BootstrapTable.prototype.initToolbar = function () {
        this.showToolbar = this.options.showExport;
        this.serverExport = this.options.serverExport;

        _initToolbar.apply(this, Array.prototype.slice.apply(arguments));

        if (this.options.showExport) {
            var that = this,
                $btnGroup = this.$toolbar.find('>.btn-group'),
                $export = $btnGroup.find('div.export');

            if (!$export.length) {
                $export = $([
                    '<div class="export btn-group">',
                        '<button class="btn btn-default' +
                            sprintf(' btn-%s', this.options.iconSize) +
                            ' dropdown-toggle" ' +
                            'data-toggle="dropdown" type="button">',
                            sprintf('<i class="%s %s"></i> ', this.options.iconsPrefix, this.options.icons["export"]),
                            '<span class="caret"></span>',
                        '</button>',
                        '<ul class="dropdown-menu" role="menu">',
                        '</ul>',
                    '</div>'].join('')).appendTo($btnGroup);

                var $menu = $export.find('.dropdown-menu'),
                    exportTypes = this.options.exportTypes;

                if (typeof this.options.exportTypes === 'string') {
                    var types = this.options.exportTypes.slice(1, -1).replace(/ /g, '').split(',');

                    exportTypes = [];
                    $.each(types, function (i, value) {
                        exportTypes.push(value.slice(1, -1));
                    });
                }
                $.each(exportTypes, function (i, type) {
                    if (TYPE_NAME.hasOwnProperty(type)) {
                        $menu.append(['<li data-type="' + type + '">',
                                '<a href="javascript:void(0)">',
                                    TYPE_NAME[type],
                                '</a>',
                            '</li>'].join(''));
                    }
                });
                $menu.find('li').click(function () {
                    var type = $(this).data('type'),
                    	serverExportUrl = that.options.serverExportUrl,
                        doExport = function () {
                            that.$el.tableExport($.extend({}, that.options.exportOptions, {
                                type: type,
                                escape: false
                            }));
                        };
                    //如果是server端导出
                    if(serverExportUrl) {
                		var data = that.queryData();
                		if (data === false) {
                            return;
                        }
                		data["exportType"] = type;
                		for(var name in data) {
                			var value = data[name];
                			if(name != undefined && value != undefined) {
                				if (/\?/g.test(serverExportUrl)) {  
            			        	serverExportUrl += "&" + name + "=" + value;  
                			    } else {  
                			    	serverExportUrl += "?" + name + "=" + value;  
                			    }
                			}
                		}
                		if($("iframe.export-iframe").length > 0) {
                			$("iframe.export-iframe").attr("src",serverExportUrl);
                		} else {
                			$("<iframe></iframe>").addClass("export-iframe").css("display","none")
                			.attr("src",serverExportUrl)
							.appendTo("body");
                		}
                	} else if (that.options.exportDataType === 'all' && that.options.pagination) {
                        that.$el.one('load-success.bs.table page-change.bs.table', function () {
                            doExport();
                            that.togglePagination();
                        });
                        that.togglePagination();
                    } else if (that.options.exportDataType === 'selected') {
                        var data = that.getData(),
                            selectedData = that.getAllSelections();

                        that.load(selectedData);
                        doExport();
                        that.load(data);
                    } else {
                        doExport();
                    }
                });
            }
        }
    };
})(jQuery);
