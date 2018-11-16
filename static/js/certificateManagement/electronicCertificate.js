var id=T.p("id");
$(function(){
	loadView(id);
});
/**
 * 加载页面数据
 */
function loadView(id){
	var url=path+"/certificateManagement/getElectoronicCertificateById";
	var params={};
	params.id=id;
	$.post(url,params,function(result){
		if(result.success){
			debugger;
			$.each(result.data,function(key,val){
				$("#"+key).html(val).attr("readonly","readonly");
				debugger
				if('identificationNumber'==key){
					$("#imageId").attr("src",path+"/ticketsManagement/getMongodbFileImgByPrintId?idCard="+val);
				}
			})
		}else{
			layer.msg("查找信息失败");
		}
	})
}
