//文件上传
function openUploadFileView(typeId,relatedId,isMulti,mimeTypes,isRefresh){
	//url:跳转地址；w:弹出框宽；h:弹出框高；
	var index = parent.layer.getFrameIndex(window.name);//获取当前窗口的index
	if(isMulti == null || typeof(isMulti)=="undefined"){ 
		isMulti = true;
	}
	if(mimeTypes == null || typeof(mimeTypes)=="undefined"){ 
		mimeTypes = '';
	}
	if(isRefresh == null || typeof(isRefresh)=="undefined"){ 
		isRefresh = '0';
	}
	var url = path+"/fileUploadMongoDB/fileUpload?relatedId="+relatedId+"&typeId="+typeId+"&isMulti="+isMulti+"&mimeTypes="+mimeTypes+"&isRefresh="+isRefresh;
	parent.layer.open({
        type: 2,
        title: ['文件上传','height:50px'],
        maxmin: true,
        shadeClose: false, //点击遮罩关闭层
        area : ['700px' , '450px'],
        content: url,
    });
}
//文件上传
function openUploadFileViewReturnMethod(typeId,relatedId,isMulti,mimeTypes,isRefresh,methodName){
	//url:跳转地址；w:弹出框宽；h:弹出框高；
	var index = parent.layer.getFrameIndex(window.name);//获取当前窗口的index
	if(isMulti == null || typeof(isMulti)=="undefined"){ 
		isMulti = true;
	}
	if(mimeTypes == null || typeof(mimeTypes)=="undefined"){ 
		mimeTypes = '';
	}
	if(isRefresh == null || typeof(isRefresh)=="undefined"){ 
		isRefresh = '0';
	}
	var url = path+"/fileUploadMongoDB/fileUploadReturnMethod?relatedId="+relatedId+"&typeId="+typeId+"&isMulti="+isMulti+"&mimeTypes="+mimeTypes+"&isRefresh="+isRefresh+"&methodName="+methodName;
	parent.layer.open({
		type: 2,
		title: ['文件上传','height:50px'],
		maxmin: true,
		shadeClose: false, //点击遮罩关闭层
		area : ['700px' , '450px'],
		content: url,
	});
}
//图片预览
function fileView(typeId,relatedId){
	var params = {};
	params.relatedId =relatedId;
	params.typeId = typeId;
	var url = path+'/fileUploadMongoDB/getFileList';
	var html =0;
	$.ajax({url :url,
		type:'POST',
		data:params,
		async:false,
		success:function(result){
			if(result.success){
				if(result.data !=null && result.data.length > 0){
					var url = path+"/fileUploadMongoDB/fileView?relatedId="+relatedId+"&typeId="+typeId;
					parent.layer.open({
						type : 2,
						title : [ '预览', 'height:40px' ],
						maxmin : false,
						shadeClose : false, //点击遮罩关闭层
						area : [ '700px', '640px' ],
						content : url
					});
				}else{
					layer.msg("请先上传文件");
				}
			}else{
				layer.msg("系统出错，请联系管理员");
			}
		}
	});
}
//文件下载
function downloadFile(relatedId,typeId){
	var params = {};
	params.relatedId =relatedId;
	params.typeId = typeId;
	var url = path+'/fileUploadMongoDB/getFileList';
	var html =0;
	$.ajax({url :url,
		type:'POST',
		data:params,
		async:false,
		success:function(result){
			if(result.success){
				if(result.data !=null && result.data.length > 0){
					window.open(path+"/fileUploadMongoDB/getMongodbFile?relatedId="+relatedId+"&typeId="+typeId);
				}else{
					layer.msg("未上传文件");
				}
			}else{
				layer.msg("系统出错，请联系管理员");
			}
		}
	});
}
//文件下载列表
function downloadList(id,typeId){
	var params = {};
	params.relatedId =id;
	params.typeId = typeId;
	var url1 = path+'/fileUploadMongoDB/getFileList';
	var html =0;
	$.ajax({url :url1,
		type:'POST',
		data:params,
		async:false,
		success:function(result){
			if(result.success){
				if(result.data !=null && result.data.length > 0){
					var url2 = path + '/uploadFile/downloadList.xtml?id='+id+"&typeId="+typeId;
					parent.layer.open({
						type : 2,
						title : [ '下载列表', 'height:40px' ],
						maxmin : true,
						shadeClose : false, //点击遮罩关闭层
						area : [ '600px', '500px' ],
						content : [url2, 'yes']
					});
				}else{
					layer.msg("未上传文件");
				}
			}else{
				layer.msg("系统出错，请联系管理员");
			}
		}
	});
}
//单个文件下载
function downloadById(id){
	var params = {};
	params.id =id;
	var url1 = path+'/fileUploadMongoDB/getFileOne';
	var html =0;
	$.ajax({url :url1,
		type:'POST',
		data:params,
		async:false,
		success:function(result){
			if(result.success){
				$.each(result.data,function(key,val){
					window.open(path+"/fileUploadMongoDB/getMongodbFile?relatedId="+val.relatedId+"&typeId="+val.typeId+"&tarFileName="+val.tarFileName);
				})
				/*if(result.data !=null && result.data.length > 0){
				}else{
					layer.msg("未上传文件");
				}*/
			}else{
				layer.msg("系统出错，请联系管理员");
			}
		}
	});
}
//文件删除列表
function deleteDownload(id,typeId){
	var params = {};
	params.relatedId =id;
	params.typeId = typeId;
	var url1 = path+'/fileUploadMongoDB/getFileList';
	var html =0;
	$.ajax({url :url1,
		type:'POST',
		data:params,
		async:false,
		success:function(result){
			if(result.success){
				if(result.data !=null && result.data.length > 0){
					var url2 = path + '/uploadFile/deleteDownload.xtml?id='+id+"&typeId="+typeId;
					parent.layer.open({
						type : 2,
						title : [ '删除列表', 'height:40px' ],
						maxmin : true,
						shadeClose : false, //点击遮罩关闭层
						area : [ '600px', '500px' ],
						content : [url2, 'yes']
					});
				}else{
					layer.msg("未上传文件");
				}
			}else{
				layer.msg("系统出错，请联系管理员");
			}
		}
	});
}
//单个文件删除
function deleteById(id){
			var params = {};
			params.id =id;
			var url1 = path+'/fileUploadMongoDB/getFileOne';
			$.ajax({
				url :url1,
				type:'POST',
				data:params,
				async:false,
				success:function(result){
					if(result.success){
						$.each(result.data,function(key,val){
							params={};
							params.relatedId=val.relatedId;
							params.typeId=val.typeId;
							params.tarFileName=val.tarFileName;
							var delUrl=path+"/fileUploadMongoDB/deleteFile";
							$.ajax({
								url:delUrl,
								data:params,
								async:false,
								success:function(data){
									if(data.success){
										layer.msg("删除成功");
									}else{
										layer.msg("删除失败");
									}
								}
							})
						})
					}else{
						layer.msg("系统出错，请联系管理员");
					}
				}
			});
		
	
}
