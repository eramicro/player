function player(config){
    if ((navigator.userAgent.indexOf("MSIE") >= 0) || (navigator.userAgent.indexOf("Trident") >= 0)) {
        alert("本播放器在IE浏览器和兼容模式下无法播放，请将浏览器设置为 极速模式！");
    }
    $.ajaxSettings.timeout="30000"; 
    $.ajaxSettings.async = true;
    $.post("API.php", {"url":config.url,"time":config.time,"key":config.key},
    function(data) {
    	if(data.code=="200"){
    		MPlayer(data.url,data.type,config.title,config.vkey,config.next,config.contextmenu,config.contextlink,config.background,config.themeColor,config.dragSpotShape,config.zantingguanggaoqidong,config.zantingguanggaourl,config.zantingguanggaolianjie);
		}else{
			TheError();
		}
	},'json').error(function (xhr, status, info) {
        TheError();
    });
}
function MPlayer(url,type,tittle,vkey,nexturl,contextmenu,contextlink,background,themeColor,dragSpotShape,zantingguanggaoqidong,zantingguanggaourl,zantingguanggaolianjie){
    $("#loading").remove();
    if(!nexturl){
        playcss(1,zantingguanggaoqidong,zantingguanggaourl,zantingguanggaolianjie);
    }else{
        playcss(2,zantingguanggaoqidong,zantingguanggaourl,zantingguanggaolianjie);
    }
    var playerConfig={
        container: '#mui-player',
	    themeColor: themeColor,
	    src:url,
	    title: tittle,
	    poster: background,
	    autoplay: true,
	    initFullFixed: true,
	    preload: 'auto',
	    autoOrientaion: true,
	    dragSpotShape: dragSpotShape,
	    lang: 'zh-cn',
	    volume: '1',
	    videoAttribute:[
	        {attrKey:'webkit-playsinline',attrValue:'webkit-playsinline'},
	        {attrKey:'playsinline',attrValue:'playsinline'},
	        {attrKey:'x5-video-player-type',attrValue:'h5-page'},
	        ],
	    plugins: [
            new MuiPlayerDesktopPlugin({
                    leaveHiddenControls: true,
	                fullScaling: 1,
	            }),
	        new MuiPlayerMobilePlugin({
	                key:'01I01I01H01J01L01K01J01I01K01J01H01D01J01G01E',
	                showMenuButton: true,
	            }),
	       new MuiPlayerDesktopPlugin({
  	                contextmenu:[
    	               {
    	                   name:'contextmenu',
    	                   context:contextmenu,
    	                   zIndex:0,
    	                   show:true,
    	                   click:function(close) {
    	                       window.open(contextlink,'_blank');
    	                   }
    	               },
    	           ],
	           })
	        ]
        };
    if(url.indexOf(".m3u8")>0){
        zhetype="hls";
	}else if(url.indexOf(".flv")>0){
	    zhetype="flv";
    }else{
        if(type=="hls"||type=="m3u8"){
            zhetype="hls";
        }else{
            zhetype=type;
        }
    }
    if(zhetype=="hls"){
        playerConfig.parse= { 
            type:'hls',
	        loader:Hls,
	        config: {
	           debug:false,
	       },
	   };
	}else if(zhetype=="flv"){
	    playerConfig.parse= { 
           type:'flv',
           loader:flvjs,
	        config: {
	           cors:true,
	        },
	   };
    }
    if(!!nexturl){
        playerConfig.custom={
            footerControls:[{
                slot:'nextMedia',
                position:'left',
                tooltip:'下一集',
                oftenShow:true,
                click:function(e) {
                    top.location.href=nexturl;
                },
            }]
        };
    }
    var mp = new MuiPlayer(playerConfig);
    mp.on('ready',function(){
        var video = mp.video();
        var currentTime = localStorage.getItem(vkey);
        video.addEventListener("loadedmetadata",function(){
            this.currentTime = currentTime;
        });
        video.addEventListener("timeupdate",function(){
            var currentTime = Math.floor(video.currentTime);
            localStorage.setItem(vkey,currentTime);
        });
        video.addEventListener("pause",function(){
            if(zantingguanggaoqidong==1){
                document.getElementById("player_pic").style.display="";
            }
        });
        video.addEventListener("play",function(){
            if(zantingguanggaoqidong==1){
                document.getElementById("player_pic").style.display="none";
            }
        });
        video.addEventListener("ended",function(){
            localStorage.removeItem(vkey);
            if(!!nexturl){
                top.location.href=nexturl;
            }
        });
    });
}
function playcss(num,zantingguanggaoqidong,zantingguanggaourl,zantingguanggaolianjie){
    if(num==1){
        $("body").append("<div id=\"mui-player\" class=\"content\"></div>");
    }else{
        $("body").append("<div id=\"mui-player\" class=\"content\"><template slot=\"nextMedia\"><svg t=\"1584686776454\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1682\"><path d=\"M783.14692466 563.21664097L240.85307534 879.55472126c-39.1656664 24.10194914-90.38230866-6.02548665-90.38230865-51.21664226v-632.676158c0-45.19115433 51.21664097-75.31859011 90.38230865-51.21664226l542.29384932 316.33808029c39.1656664 21.08920518 39.1656664 81.34407804 0 102.43328194z\" p-id=\"1683\" fill=\"#ffffff\"></path><path d=\"M873.52923331 734.94302767c0 42.17841036-39.1656664 78.33133408-90.38230865 78.33133407s-90.38230866-36.15292371-90.38230735-78.33133407V289.05697233c0-42.17841036 39.1656664-78.33133408 90.38230735-78.33133407s90.38230866 36.15292371 90.38230865 78.33133407v445.88605534z\" p-id=\"1684\" fill=\"#ffffff\"></path></svg></template></div>");
    }
    if(zantingguanggaoqidong==1){
        $("body").append("<div id=\"player_pic\" style=\"display: none;\"><div class=\"player_pic_box\"><div class=\"close-player_pic\" onclick=\"document.getElementById('player_pic').style.display='none'\">✕</div><div class=\"player_pic_link\" onclick=\"window.open('"+zantingguanggaolianjie+"');\"><img alt=\"\" src=\""+zantingguanggaourl+"\" /></div></div></div>");
    }
}
function TheError(){
    $("body").append("<div id=\"error\"><h1>解析失败，请切换线路或刷新！</h1></div>");
	$("#loading").remove();
}