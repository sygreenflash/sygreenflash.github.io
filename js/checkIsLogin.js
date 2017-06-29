var url="";
$(function(){
     url= document.URL;//取得当前页的URL  
    $.ajax({
             type: "post",
             async: false,
             url: "/hxzb/zb/checkSession",
             dataType: "jsonp",
             //data:{ "callback": "?"},
             jsonp: "callback",
             jsonpCallback:"jsonp",
             success:function(json){
	             if(json.isLogin==true){
                   document.getElementById("islogin").style.display="block";
                   document.getElementById("nologin").style.display="none";
                   $("#username").html(json.userName);
	             }else{
	             	document.getElementById("islogin").style.display="none";
                   document.getElementById("nologin").style.display="block";
	             }
             },
             error: function(){
                  //window.location.reload();
             }
         });

      $("#logout").click(function() {
		$.ajax({
             type: "post",
             async: false,
             url: "/hxzb/zb/logout",
             dataType: "jsonp",
             //data:{ "callback": "?"},
             jsonp: "callback",
             jsonpCallback:"jsonp",
             success: function(json){
	             window.location.reload();
             },
             error: function(){
                  window.location.reload();
             }
         });
	}); 
}); 

function jump()  {
	window.location.href="https://www.chinaamc.com/capital/zbdl/index.shtml?url="+encodeURIComponent(url);
}

var scheme = document.location.protocol;
	 if("http:" == scheme){
	 		window.location.href="https:"+window.location.href.substring(5);
	 }















