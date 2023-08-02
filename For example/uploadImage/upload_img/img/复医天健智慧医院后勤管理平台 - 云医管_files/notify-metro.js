$.notify.addStyle("metro", {
    html: "<div>" +
        "<div class='image' data-notify-html='image'/>" +
        "<div class='text-wrapper'>" +
        "<div class='title' data-notify-html='title'/>" +
        "<div class='text' data-notify-html='text'/>" +
        "</div>" +
        "</div>",
    classes: {
        error: {
            "color": "#fff !important",
            "background-color": "#cc222a",
            "border-color": "#EED3D7",
            "width": "160px"
        },
        success: {
            "color": "#fff !important",
            "background-color": "#2cba27",
            "border-color": "#D6E9C6",
            "width": "160px"
        },
        info: {
            "color": "#fafafa !important",
            "background-color": "#1E90FF",
            "border": "1px solid #1E90FF",
            "width": "160px"
        },
        warning: {
            "background-color": "#FAFA47",
            "border": "1px solid #EEEE45",
            "width": "160px"
        },
        black: {
            "color": "#fafafa !important",
            "background-color": "#333",
            "border": "1px solid #000",
            "width": "160px"
        },
        white: {
            "background-color": "#f1f1f1",
            "border": "1px solid #ddd",
            "width": "160px"
        }
    }
});
$.notify.addStyle("remind", {
    html: "<div>" +
        "<div class='image' data-notify-html='image'/>" +
        "<div class='text-wrapper'>" +
        "<div class='title' data-notify-html='title'/>" +
        "<div class='text' data-notify-html='text'/>" +
        "<button class='yes' data-notify-html='button'></button>" +
        "</div>" +
        "</div>",
    classes: {
        error: {
            "color": "#fff !important",
            "background-color": "#cc222a",
            "border-color": "#EED3D7",
            "width": "160px"
        },
        success: {
            "color": "#fff !important",
            "background-color": "#2cba27",
            "border-color": "#D6E9C6",
            "width": "160px"
        },
        info: {
            "color": "#fafafa !important",
            "background-color": "#1E90FF",
            "border": "1px solid #1E90FF",
            "width": "160px"
        },
        warning: {
            "background-color": "#FAFA47",
            "border": "1px solid #EEEE45",
            "width": "160px"
        },
        black: {
            "color": "#fafafa !important",
            "background-color": "#333",
            "border": "1px solid #000",
            "width": "160px"
        },
        white: {
            "background-color": "#f1f1f1",
            "border": "1px solid #ddd",
            "width": "160px"
        }
    }
});
/**
 * @author wei.zhao
 * @param {*提示消息类型} style 
 * @param {*提示的消息内容} text 
 * @param {*跳转的地址} href 
 * @date 20171130 15.19 
 */
function notify(style, text, href) {
        $.notify({
            title: '消息',
            text: text,
            button: '<a href=' + href + '  target="_self">点击查看</a>',
            image: '<i class="fa fa-envelope-o fa-fw" style="color:#189cf0;font-size: 30px;"></i>'
        }, {
            style: 'remind',
            globalPosition: 'bottom right',
            className: style,
//          autoHideDelay: 30000,
            autoHide: false,
            clickToHide: true
        });
    }