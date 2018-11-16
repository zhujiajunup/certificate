var centerClassName = 'main-content';//中右边的claaName
var centerMenuClassName = 'breadcrumbs';//中右边的菜单className
var centerPageIdName = 'iframe';//被加载DIV或者iframe框架 的IDName
var searchFormIdName = 'searchForm';//搜索表单的IdName

//小提示框
function xtiptest(message){
	$('.xtip').remove();
	var divhtml = $("<div class='xtip'><div class='xtiptop'><span id='xtipMessage'>" + message + "</span></div></div>");
	divhtml.appendTo('body').fadeIn();
	$('.xtip').fadeIn(200).fadeOut(5000);
}

//自定义提示框
function tipPopup(message){
	$(".sure").unbind();
	$('.tip').remove();
	var divhtml =$("<div class='tip'> <div class='tiptop'><span>提示信息</span><a onclick='closePopup("+"\"tip"+"\")'></a></div>"
      +"<div class='tipinfo'><span><img src='"+path + "/images/basic/ticon.png' /></span><div class='tipright'>"
      + "<p id='tipMessage'>" + message + "</p><cite>如果是请点击确定按钮 ，否则请点取消。</cite>"
      + "</div></div><div class='tipbtn'><input  type='button'  class='sure' value='确定' onclick='closePopup("+"\"tip"+"\");' />&nbsp;"
      + "<input  type='button' class='cancel' value='取消'  onclick='closePopup("+"\"tip"+"\")'/></div></div>");
	divhtml.appendTo('body').fadeIn();
}

//自定义大提示框
function dtipPopup(message){
	$(".sure").unbind();
	$('.dtip').remove();
	var divhtml =$("<div class='dtip'> <div class='dtiptop'><span>提示信息</span><a onclick='closePopup("+"\"dtip"+"\")'></a></div>"
      +"<div class='tipinfo'><span><img src='"+path + "/images/basic/ticon.png' /></span><div class='tipright'>"
      + "<p id='tipMessage'>" + message + "</p><cite>如果是请点击确定按钮 ，否则请点取消。</cite>"
      + "<form role='form' id='approvalForm'><div class='form-group'><label for='name'>审批意见</label>"
      + "<textarea class='form-control' rows='3' name='approvalContent' id='approvalContent'></textarea></div></form>"
      + "</div></div><div class='tipbtn'><input  type='button'  class='sure' value='确定' onclick='closePopup("+"\"tip"+"\");' />&nbsp;"
      + "<input  type='button' class='cancel' value='取消'  onclick='closePopup("+"\"dtip"+"\")'/></div></div>");
	divhtml.appendTo('body').fadeIn();
}


//关闭自定义提示框
function closePopup(className){
	$("."+ className).fadeOut(200);
}


//求easyUI的高度
function esayUIHeight() {
	// outerHeight(true)包含该div本身的高度, 以及padding,border,margin上下的总高度
	var centerPageHeight = $('#'+centerPageIdName).height();
	if(null == centerPageHeight  || 'undefined' == typeof(centerPageHeight) || centerPageHeight < 0){
		centerPageHeight = $('#'+centerPageIdName, window.parent.document).height();
	}
	return (centerPageHeight  - $('#'+searchFormIdName).outerHeight(true) - $('#operate').outerHeight(true))
}

//流程功能页面求easyUI的高度
function newEsayUIHeight() {
	// outerHeight(true)包含该div本身的高度, 以及padding,border,margin上下的总高度
	var centerPageHeight = $('#'+centerPageIdName).height();
	if(null == centerPageHeight  || 'undefined' == typeof(centerPageHeight) || centerPageHeight < 0){
		centerPageHeight = $('#'+centerPageIdName, window.parent.document).height();
	}
	return (centerPageHeight  - $('#search').outerHeight(true) - $('#operate').outerHeight(true)-8)
}

//流程功能页面求easyUI的高度
function newEsayUIHeight2() {
	// outerHeight(true)包含该div本身的高度, 以及padding,border,margin上下的总高度
	var centerPageHeight = $('#'+centerPageIdName).height();
	if(null == centerPageHeight  || 'undefined' == typeof(centerPageHeight) || centerPageHeight < 0){
		centerPageHeight = $('#'+centerPageIdName, window.parent.document).height;
	}
	return (centerPageHeight  - $('#search').outerHeight(true) - $('#operate').outerHeight(true)-8)
}
function newEsayUIWidth() {
	return "100%";
	//return $("body").width()*0.985;
}

//提交表单时将参数序列化
$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

//自定义提示框
var confirmFunc;
function tipConfirm(title, tips, func) {
	var html = '<div class="modal fade" id="confirmModal" tabindex="-1" data-backdrop="static" data-keyboard="false" aria-hidden="true" role="dialog" aria-labelledby="confirmModal">' +
					'<div class="modal-dialog" role="document">' +
						'<div class="modal-content">' +
							'<div class="modal-header">' +
								'<h4 class="modal-title" id="confirmModalLabel"></h4>' +
							'</div>' +
							'<div class="modal-body" id="confirmModalBody">' +
							'</div>' +
							'<div class="modal-footer">' +
								'<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>' +
								'<button type="button" class="btn btn-primary" onclick="confirm();">确定</button>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>';
	if($("#confirmModal").length <= 0) {
		$("body").append(html);
	}
	$("#confirmModal #confirmModalLabel").html(title);
	$("#confirmModal #confirmModalBody").html(tips);
	confirmFunc = func;
	$("#confirmModal").modal("show");
}

function confirm() {
	confirmFunc();
	$("#confirmModal").modal("hide");
}

(function(){
	$.plugin={
		plugLoading:function(msg){
			var html = "<div id=\"jquery-plug-loading\"><div class=\"datagrid-mask\" style=\"display:block;z-index:16777270;\"></div>" +
		 		"<div class=\"datagrid-mask-msg\" style=\"display: block; left: 50%; height: 40px; margin-left: -85.5px; line-height: 16px;z-index:16777271;\">" +
		 		msg+"</div></div>";
			$(window.document.body).append(html);
		},
		close:function(){
			$("#jquery-plug-loading").remove();
		}
	};  
})(jQuery);

function printExport(url,json){
	var curWwwPath=window.document.location.href; 
	var pathName=window.document.location.pathname; 
	var pos=curWwwPath.indexOf(pathName); 
	var localhostPaht=curWwwPath.substring(0,pos); 
	var jsonLenght = 0;
	var re ="";
	for(var jn in json){
			if(jsonLenght == 0){
				re += "?"+jn+"="+json[jn];	
			}else{
				re += "&"+jn+"="+json[jn];	
			}
			jsonLenght ++;
	}
	return  'PageOffice://|'+localhostPaht+path +url+re+'|width=800px;height=800px;|DlELURlHBUwPQnNBeDcKLng1ZzIIMXpECzEJLwhACkMKQXY2fDMLQXc0eTk=|';
}

//返回指定当前时间,没有时间则为当前时间 格式为'yyy-mm-dd'
function returnNowDate(date) {
	var mydate;
	if (typeof date == 'undefined' || date == "" || date == null) {
		return "";
	} else {
		mydate = new Date(date);
	}
	var str = mydate.getFullYear() + "-";
	str += (mydate.getMonth() >= 9 ? (mydate.getMonth() + 1) : "0"+(mydate.getMonth() + 1)) + "-";
	str += mydate.getDate() > 9 ? mydate.getDate() : "0"+mydate.getDate();
	return str;
}

/*
$(function(){
	var parentHeight = $(window.parent.document).find("#iframe").height();
	$("body").height(parentHeight);
});*/