// JavaScript Document
$(function(){
	$(".tc").click(function(){
	$("#pop-up1").show();
	});	   
	$(".close").click(function(){
	$("#pop-up1").hide();
	}); 
});


function openDiv(div) {
         var newDiv = document.getElementById(div);
         newDiv.style.display="block";
         newDiv.style.position = "absolute";
         newDiv.style.zIndex = "999";
//         newDiv.style.width = "700px";
//         newDiv.style.height = "300px";
         var scrolltop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
         var _clientheight=0;
         //ie FF 在有DOCTYPE时各有区别
         _clientheight = Math.min(document.body.clientHeight , document.documentElement.clientHeight);
         if(_clientheight==0)
         _clientheight= Math.max(document.body.clientHeight , document.documentElement.clientHeight);
         var _clientwidth= document.documentElement.clientWidth || document.body.clientWidth;
         //整个页面的高度
         var _pageheight = Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
         var msgtop = (scrolltop+(_clientheight-300)/2)+"px";
         var msgleft = (_clientwidth-470)/2+"px";
         newDiv.style.top = msgtop;
         newDiv.style.left =msgleft; // 屏幕居中
         document.body.appendChild(newDiv);
         // 锁屏图层
         var newMask = document.createElement("div");
         newMask.id = "div2";
         newMask.style.position = "absolute";
         newMask.style.zIndex = "998";
         newMask.style.width = _clientwidth + "px";
         newMask.style.height = _pageheight + "px";
         newMask.style.top = "0px";
         newMask.style.left = "0px";
         newMask.style.background = "#777";
         newMask.style.filter ="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75";
         //newMask.style.filter = "alpha(opacity=40)";
         newMask.style.opacity = "0.40";
         document.body.appendChild(newMask);
         }
    // 关闭锁屏
    function CloseLock(div)
    {
        document.body.removeChild(document.getElementById("div2"));
        document.getElementById(div).style.display="none";
    }
//if2自适应高
function reinitIframe2(){
var iframe = document.getElementById("if2");
try{
var long2=document.getElementById("long2");
var bHeight = iframe.contentWindow.document.body.scrollHeight;
var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
var height = Math.max(bHeight, dHeight);
iframe.height =  height;
var gao=height-13;
long2.style.top=gao+'px';
}catch (ex){}
}
window.setInterval("reinitIframe2()", 200);
//if5自适应高
function reinitIframe5(){
	var iframe = document.getElementById("if5");
	try{
		var long5=document.getElementById("long5");
		var bHeight =iframe.contentWindow.document.body.scrollHeight;
		var dHeight =iframe.contentWindow.document.documentElement.scrollHeight;
		var height = Math.max(bHeight,dHeight);
		iframe.height=height;
		var gao=height-13;
		long5.style.top=gao+'px';
		}catch(ex){}
}
window.setInterval("reinitIframe5()",200);	


//点击预约按钮触发
//基金编号
var fundCode = null; 
var isOK = false;
function reserve(bmoney,code,custtype){
	if(checkyuyuelogin()==true){  
    if(custtype=="J"){
	   fundCode = code;
	   $("#bmoney").text(bmoney);
	   openDiv('pop-up1');
    }else{
      openDiv('pop-up-buy');
    }
	}else{
	   var url=document.URL;
	   window.location.href="https://www.chinaamc.com/capital/zbdl/index.shtml?url="+encodeURIComponent(url);
	}
}
function closeMsg(id){
	CloseLock(id);
}
//确定预约
function okReserve(){
  url = document.URL;
	$.ajax({
         type: "post",
         async: false,
         url: "https://www.chinaamc.com/hxzb/zb/customer/reserve?fundCode="+fundCode,//;JSESSIONID="+$.cookie('JSESSIONID'),
         dataType: "jsonp",
         jsonp: "callback",
         jsonpCallback:"jsonp",
         success: function(json){
            if(json.isLogin==true){
               if(json.isSuccess=="1"){
                 CloseLock('pop-up1');
                 openDiv('pop-up2');
               }else if(json.isSuccess=="0"){
                 CloseLock('pop-up1');
                 openDiv('pop-up3');
               }else{
                 CloseLock('pop-up1');
                 alert("系统异常");
               }
            }else{
              window.location.href="https://www.chinaamc.com/capital/zbdl/index.shtml?url="+encodeURIComponent(url);
            }
         }
     });  
  }
  function selectReserve(){
	closeMsg("pop-up2");
	top.document.location.href="https://www.chinaamc.com/capital/wdzc/wdyy/index.shtml";
  }


  function checkyuyuelogin(){ 
    var flag=false;
	 $.ajax({
		 type:"post",
		 async:false,
		 url:"/hxzb/zb/checkSession",
		 dataType:"jsonp",
		 jsonp:"callback",
		 jsonpCallback:"jsonp",
		 error:function(json){
		    flag=false;
	     },
		 success:function(json){
		 	if(json.isLogin==true){
		      flag=true;
		 	}else{
		 	  flag=false;
		 	}
	      }
        });
     return flag;
 }
 
 //0128 add redeem
 function yidaotishi_redeem(){
	  openDiv('pop-up-redeem');
}

function yidaotishi_buy(custType,fundcode){
	if(checkyuyuelogin()==true){
	   if(custType == 'J'){
				window.open("https://www.chinaamc.com/hxzb/zb/evaluation/"+fundcode);
			}else{
				openDiv('pop-up-buy');
			}
	}else{
	   var url=document.URL;
	   window.location.href="https://www.chinaamc.com/capital/zbdl/index.shtml?url="+encodeURIComponent(url);
	}
}

//0331修改分红方式操作
function modify_dividend_method(fundcode,fundname,dividend_method){
	if(checkyuyuelogin()==true){
		$("#m_fundcode").val(fundcode);
		$("#m_fundname").html(fundname);
		if(dividend_method == '1'){
			$("#m_dividend_cur").html("现金分红");
			$("#m_select").find("option").eq(0).attr("selected","selected");
		}else{
			$("#m_dividend_cur").html("红利再投资");
			$("#m_select").find("option").eq(1).attr("selected","selected");
		}
		
		openDiv('pop-up-dividend-start');
	}else{
	   var url=document.URL;
	   window.location.href="https://www.chinaamc.com/capital/zbdl/index.shtml?url="+encodeURIComponent(url);
	}
}
//0331修改分红方式操作
function modify_dividend_method_submit(){
	var fundcode = $("#m_fundcode").val();
	var dividend_method = $("#m_select").val();
	$.post("/hxzb/zb/customer/modifyDividends/"+fundcode+"/"+dividend_method, {}, function (result) {
		CloseLock('pop-up-dividend-start');
		var resultLen = result.split('_');
		if(resultLen[0] != "true"){
			$("#error_message").html(resultLen[1]);
			openDiv('pop-up-error-msg');
		}else{
			$("#m_u_systemDate").html(resultLen[1]);
			openDiv('pop-up-dividend-over');
		}
	}).error(function(){
		CloseLock('pop-up-dividend-start');
		$("#error_message").html("请求异常，请联系管理员！");
		openDiv('pop-up-error-msg');
	});
}
//0331刷新当前页
function refresh_dividend_page(){
	CloseLock('pop-up-dividend-over');
	window.location.href=document.URL;
}






















