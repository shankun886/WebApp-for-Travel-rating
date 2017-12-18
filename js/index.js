// JavaScript Document
function id(obj) {
    return document.getElementById(obj);
}
function bind(obj, ev, fn) { 
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}
function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}
function addClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}

function removeClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
}
function fnLoad(){
	var iTime=new Date().getTime();
	var oW=id("welcome");
	var arr=[""];
	var bImgLoad=true;
	var bTime=false;
	// for (var i = 0; i < arr.length; i++) {
	// 	var oImg= new Image();
	// 	oImg.src=arr[i];
	// 	oImg.onload=function(){

	// 	}
	var oTimer=0;
	bind(oW,"webkitTransitonEnd",end);//bin(obj,ev,fn)绑定事件
	bind(oW,"transitionend",end);    //transitionend 事件在 CSS 完成过渡后触发。这里使进场动画页面display：none；
	oTimer=setInterval(function(){
		if (new Date().getTime()-iTime>=5000) {
			bTime=true;
		}
		if (bImgLoad&&bTime){
			clearInterval(oTimer);
			oW.style.opacity=0;
		}
	},1000);
	function end(){
		removeClass(oW,"pageShow");
		fnTab();
	}
}
/*function fnLoad()
{
	var iTime=new Date().getTime();
	var oW=id("welcome");
	var arr=[""];
	var bImgLoad=true;
	var bTime=false;
	var oTimer=0;
	bind(oW,"webkitTransitionEnd",end);
	bind(oW,"transitionend",end);
	oTimer=setInterval(function(){
		if(new Date().getTime()-iTime>=5000)
		{
			bTime=true;
		}	
		if(bImgLoad&&bTime)
		{
			clearInterval(oTimer);
			oW.style.opacity=0;
		}
	},1000);
	function end()
	{
		removeClass(oW,"pageShow");
		fnTab();
	}
	/*for(var i=0;i<arr.length;i++)
	{
		var oImg=new Image();
		oImg.src=arr[i];
		oImg.onload=function()
		{
			
		}
		
	}*/
// }
/*bind(document,"touchmove",function(ev){
	ev.preventDefault(); 拖拽图片时阻止默认事件，而css中加了overflow: auto也能解决，同时因为解决在低分辨率下需要滚动条拖动效果，故此默认事件需要存在
})*/
function fnTab(){
	var oTab=id("tabPic");
	var oList=id("picList");
	var aNav=oTab.getElementsByTagName("nav")[0].children;
	var iNow=0;//当前选中的是第0张
	var iX=0;//translateX
	var iW=view().w;//屏幕宽度
	var oTimer=0;
	var iStartTouchX=0; //手指触发事件时所在位置
	var iStartX=0;  //当前元素所处的位置
	auto();
	fnScore();
	function auto(){oTimer=setInterval(function(){
		iNow++;
		iNow=iNow%aNav.length;
		tab();
		
	},2000);
	}
	bind(oTab,"touchstart",fnStart);  //touchstart相当于onmousedown	
	bind(oTab,"touchmove",fnMove);
	bind(oTab,"touchend",fnEnd);
	function fnStart(ev){
		oList.style.transition="none";
		ev=ev.changedTouches[0];//ev.changedTouches触发当前事件的手指列表（多个手指同时触发）
		iStartTouchX=ev.pageX;
		iStartX=iX;
		clearInterval(oTimer);
	}
	function fnMove(ev){
		ev=ev.changedTouches[0];
		var iDis=ev.pageX-iStartTouchX;//手指在屏幕上移动的距离
		iX=iStartX+iDis;
		oList.style.WebkitTransform=oList.style.transform="translateX("+iX+"px)";
	}
	function fnEnd(){
		iNow=iX/iW;
		iNow=-Math.round(iNow);
		if (iNow<0) {iNow=0;}
		if (iNow>aNav.length-1) {iNow=aNav.length-1;}
		tab();
		auto();
	}
	function tab(){
		iX=-iNow*iW;
		oList.style.WebkitTransform=oList.style.transform="translateX("+iX+"px)";
		oList.style.transition="0.5s";
		for (var i = 0; i < aNav.length; i++) {
			removeClass(aNav[i],"active");
		}
		addClass(aNav[iNow],"active");
}
/*function fnTab()
{
	var oTab=id("tabPic");
	var oList=id("picList");
	var aNav=oTab.getElementsByTagName("nav")[0].children;
	var iNow=0;
	var iX=0;
	var iW=view().w;
	var oTimer=0;
	var iStartTouchX=0;
	var iStartX=0;
	bind(oTab,"touchstart",fnStart);
	bind(oTab,"touchmove",fnMove);
	bind(oTab,"touchend",fnEnd);
	auto();
	if(!window.BfnScore)
	{
		fnScore();
		window.BfnScore=true;
	}
	function auto()
	{
		oTimer=setInterval(function(){
			iNow++;	
			iNow=iNow%aNav.length;
			tab();
		},2000);
	}
	function fnStart(ev)
	{
		oList.style.transition="none";
		ev=ev.changedTouches[0];
		iStartTouchX=ev.pageX;
		iStartX=iX;
		clearInterval(oTimer);
	}
	function fnMove(ev)
	{
		ev=ev.changedTouches[0];
		var iDis=ev.pageX-iStartTouchX;
		iX=iStartX+iDis;
		oList.style.WebkitTransform=oList.style.transform="translateX("+iX+"px)";
	}
	function fnEnd()
	{
		iNow=iX/iW;
		iNow=-Math.round(iNow);
		if(iNow<0)
		{
			iNow=0;
		}
		if(iNow>aNav.length-1)
		{
			iNow=aNav.length-1;
		}
		tab();
		auto();
	}
	function tab()
	{
		iX=-iNow*iW;
		oList.style.transition="0.5s";
		oList.style.WebkitTransform=oList.style.transform="translateX("+iX+"px)";
		for(var i=0;i<aNav.length;i++)
		{
			removeClass(aNav[i],"active");
		}
		addClass(aNav[iNow],"active");
	}
}*/
function fnScore(){
	var oScore=id("score");
	var arr=["差评","中下","一般","中上","好评"];
	var aLi=oScore.getElementsByTagName("li");
	for (var i = 0; i < aLi.length; i++) {
		fn(aLi[i]);
	}
	function fn(oLi){
		var aNav=oLi.getElementsByTagName('a');
		var oInput=oLi.getElementsByTagName("input")[0];
		for (var i = 0; i < aNav.length; i++) {
			aNav[i].index=i;
			bind(aNav[i],"touchstart",function(){
				for (var i = 0; i < aNav.length; i++) {
					if (i<=this.index) {
						addClass(aNav[i],"active");
					}
					else{
						removeClass(aNav[i],"active");
					}
				}
				oInput.value=arr[this.index];
			});
		}
	}
	fnIndex();
}
/*function fnScore()
{
	var oScore=id("score");
	var aLi=oScore.getElementsByTagName("li");
	var arr=["好失望","没有想象的那么差","很一般","良好","棒极了"];
	for(var i=0;i<aLi.length;i++)
	{
		fn(aLi[i]);
	}
	function fn(oLi)
	{
		var aNav=oLi.getElementsByTagName("a");
		var oInput=oLi.getElementsByTagName("input")[0];
		for(var i=0;i<aNav.length;i++)
		{
			aNav[i].index=i;
			bind(aNav[i],"touchstart",function(){
				for(var i=0;i<aNav.length;i++)
				{
					if(i<=this.index)
					{
						addClass(aNav[i],"active");
					}					
					else
					{
						removeClass(aNav[i],"active");
					}
				}
				oInput.value=arr[this.index];
			});
		}
	}

	fnIndex();
}*/
function fnInfo(oInfo,sInfo)
{
	oInfo.innerHTML=sInfo;
	oInfo.style.WebkitTransform="scale(1)";
	oInfo.style.opacity=1;
	setTimeout(function(){
		oInfo.style.WebkitTransform="scale(0)";
		oInfo.style.opacity=0;
	},1000);
}
function fnInfo(oInfo,sInfo){
	oInfo.innerHTML=sInfo;
	oInfo.style.WebkitTransform="scale(1)";
	oInfo.style.opacity=1;
	setTimeout(function(){
		oInfo.style.WebkitTransform="scale(0)";
		oInfo.style.opacity=0;
	},1000);
}
function fnIndex(){
	var oIndex=id("index");
	var bScore=false;
	var oBtn=oIndex.getElementsByClassName("btn")[0];
	var oInfo= oIndex.getElementsByClassName("info")[0];
	bind(oBtn,"touchend",fnEnd);
	function fnEnd(){
		bScore=fnScoreChecked();
		if (bScore) {
			if (bTag()) {
				fnIndexOut();
			}
			else{
				fnInfo(oInfo,"给景区添加标签");
			}
		}
		else{
			fnInfo(oInfo,"请给景点评分");
		}
	}
	function fnScoreChecked(){
		var oScore=id("score");
		var aInput=oScore.getElementsByTagName("input");
		for (var i = 0; i < aInput.length; i++) {
			if(aInput[i].value==0){
				return false;
			}
		}
		return true;
	}
	function bTag(){
		var oTag=id("indexTag");
		var aInput=oTag.getElementsByTagName("input");
		for (var i = 0; i < aInput.length; i++) {
			if (aInput[i].checked) {
				return true;
			}
	}
	return false;
}
/*function fnIndex()
{
	var oIndex=id("index");
	var oBtn=oIndex.getElementsByClassName("btn")[0];
	var oInfo=oIndex.getElementsByClassName("info")[0];
	var bScore=false;
	bind(oBtn,"touchend",fnEnd);
	function fnEnd()
	{
		bScore=fnScoreChecked();
		if(bScore)
		{
			if(bTag())
			{
				fnIndexOut();		
			}
			else
			{
				fnInfo(oInfo,"给景区添加标签");	
			}
		}
		else
		{
			fnInfo(oInfo,"给景区评分");
		}
	}
	function fnScoreChecked()
	{
		var oScore=id("score");
		var aInput=oScore.getElementsByTagName("input");
		for(var i=0;i<aInput.length;i++)
		{
			if(aInput[i].value==0)
			{
				return false;
			}
		}
		return true;
	}
	function bTag()
	{
		var oTag=id("indexTag");
		var aInput=oTag.getElementsByTagName("input");
		for(var i=0;i<aInput.length;i++)
		{
			if(aInput[i].checked)
			{
				return true;
			}
		}
		return false;
	}
}*/
function fnIndexOut()
{ 	
	var oMask=id("mask");
	var oIndex=id("index");
	var oNew=id("news");
	addClass(oMask,"pageShow");
	addClass(oNew,"pageShow");
	fnNews();
	// oMask.style.opacity=1;//元素为display为none向block时，中间会有渲染过程，元素在渲染时transition时不起作用的，所以用定时器解决
	setTimeout(function(){
		oMask.style.opacity=1;
		oIndex.style.WebkitFilter=oIndex.style.filter="blur(5px)";//模糊
	},10);
	setTimeout(function(){
		oNew.style.transition="0.5s";
		oMask.style.opacity=0;
		oIndex.style.WebkitFilter=oIndex.style.filter="blur(0px)";
		oNew.style.opacity=1;
		removeClass(oMask,"pageShow");
	},3000);

	/*var oMask=id("mask");
	var oIndex=id("index");
	var oNew=id("news");
	addClass(oMask,"pageShow");
	addClass(oNew,"pageShow");
		fnNews();
	setTimeout(function(){
		oMask.style.opacity=1;	
		oIndex.style.WebkitFilter=oIndex.style.filter="blur(5px)";
	},14);
	setTimeout(function(){
		oNew.style.transition="0.5s";
		oMask.style.opacity=0;	
		oIndex.style.WebkitFilter=oIndex.style.filter="blur(0px)";	
		oNew.style.opacity=1;
		removeClass(oMask,"pageShow");
	},3000);
}*/
}
function fnNews(){
	var oNews=id("news");
	var oInfo=oNews.getElementsByClassName("info")[0];
	var aInput=oNews.getElementsByTagName("input");
	aInput[0].onchange=function(){
		//console.log(this.files);
		if (this.files[0].type.split("")[0]=="video") {
			fnNewsOut();
			this.value="";
		}
		else{
			fnInfo(oInfo,"请上传视频!");
		}
	}
	aInput[1].onchange=function(){
		//console.log(this.files);
		if (this.files[0].type.split("/")[0]=="image") {
			fnNewsOut();
			this.value="";
		}
		else{
			fnInfo(oInfo,"请上传图片!");
		}
	}
}
/*function fnNews()
{
	var oNews=id("news");
	var oInfo=oNews.getElementsByClassName("info")[0];
	var aInput=oNews.getElementsByTagName("input");
	aInput[0].onchange=function()
	{
		if(this.files[0].type.split("/")[0]=="video")
		{
			fnNewsOut();
			this.value="";
		}
		else
		{
			fnInfo(oInfo,"请上传视频");
		}
	};
	aInput[1].onchange=function()
	{
		if(this.files[0].type.split("/")[0]=="image")
		{
			fnNewsOut();
			this.value="";
		}
		else
		{
			fnInfo(oInfo,"请上传图片");
		}
	};
}*/
function fnNewsOut(){
	var oNews=id("news");
	var oForm=id("form");
	addClass(oForm,"pageShow");
	oNews.style.cssText="";
	removeClass(oNews,"pageShow");
	formIn();
}
/*function fnNewsOut()
{
	var oNews=id("news");
	var oForm=id("form");
	addClass(oForm,"pageShow");
	oNews.style.cssText="";
	removeClass(oNews,"pageShow");
		formIn();
}*/
function formIn(){
	var oForm=id("form");
	var bOff=false;
	var oOver=id("over");
	oBtn=oForm.getElementsByClassName("btn")[0];
	var aFormTag=id("formTag").getElementsByTagName("label");
	for (var i = 0; i < aFormTag.length; i++) {
		bind(aFormTag[i],"touchend",function(){
			 bOff=true;
			 addClass(oBtn,"submit");
			 over();
		});
	}
	bind(oBtn,"touchend",function(){
		if (bOff) {
			for (var i = 0; i < aFormTag.length; i++) {
				aFormTag[i].getElementsByTagName("input").checked=false;
			}
			bOff=false;
			addClass(oOver,"pageShow");
			removeClass(oForm,"pageShow");
			over();
		}
	})
}
/*function formIn()
{
	var oForm=id("form");
	var oOver=id("over");
	var aFormTag=id("formTag").getElementsByTagName("label");
	var oBtn=oForm.getElementsByClassName("btn")[0];
	var bOff=false;
	for(var i=0;i<aFormTag.length;i++)
	{
		bind(aFormTag[i],"touchend",function(){
			bOff=true;
			addClass(oBtn,"submit");
		});
	}
	bind(oBtn,"touchend",function(){
		if(bOff)
		{
			for(var i=0;i<aFormTag.length;i++)
			{
				aFormTag[i].getElementsByTagName("input")[0].checked=false;
			}
			bOff=false;
			addClass(oOver,"pageShow");
			removeClass(oForm,"pageShow");
			removeClass(oBtn,"submit");
			over();
		}
	});
}*/
function over()
{
	var oOver=id("over");
	var oBtn=oOver.getElementsByClassName("btn")[0];
	bind(oBtn,"touchend",function()
	{
		removeClass(oOver,"pageShow");
	});
}
}
}