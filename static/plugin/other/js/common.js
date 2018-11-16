//工具集合Tools
window.T = {};
//获取请求参数
//使用示例
//location.href = http://localhost:8080/index.html?id=123
//T.p('id') --> 123;
var url = function(name) {
	var reg = new RegExp("(^|&|\\?)"+ name +"=([^&]*)(&|$)");
	var r = decodeURIComponent(window.location.search.substr(1)).match(reg);
	if(r!=null)return  unescape(r[2]); return null;
};
T.p = url;


function slipe() {
	if (document.getElementById('hiddenDiv').style.display == "none") {
		$("#hiddenDiv").slideDown("slow");
		$("#openBtn").val('收起筛选');
	} else {
		$("#openBtn").val('展开筛选');
		$("#hiddenDiv").slideUp("slow");
	}
}
