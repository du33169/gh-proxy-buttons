// ==UserScript==
// @name         gh-proxy-buttons
// @name:zh-CN   github加速按钮
// @namespace    https://github.com/du33169/gh-proxy-buttons
// @version      0.1
// @require      https://cdn.bootcdn.net/ajax/libs/clipboard.js/2.0.6/clipboard.min.js
// @description  add a button beside github link(releases,files and repository url), click to get alternative url according to previously specified proxy.
// @description:zh-CN  为github中的特定链接（releases、文件、项目地址）添加一个悬浮按钮，提供代理后的加速链接
// @author       du33169
// @match        *://github.com/*
// @grant        none
// ==/UserScript==
(function() {
    'use strict'; 
	
	/***********************自定义设置**********************/
	/**/                                                 /**/
	/**/  var proxy_url='https://gh.api.99988866.xyz/';  /**/ 
	/**/                                                 /**/
	/*****代理服务器地址可自行修改，末尾斜杠不可省略！******/
	
	function moveHere(e,originLink)//用于注册mouseenter事件,e为当前元素
	{
		if(document.getElementById('gh-proxy-button'))//如果已经产生按钮则返回，删去在Firefox会死循环（原因未知）
			return;
		
		//创建按钮对象,github中使用.btn的class可以为<a>标签加上按钮外观
		var btn=document.createElement(e.tagName=="CLIPBOARD-COPY"?'button':'a');//对于仓库地址使用button以实现点击复制
		btn.setAttribute('class','btn');
		btn.id="gh-proxy-button";
		btn.title="get proxy link";
		btn.style.position="absolute";
		btn.role="button";
		btn.innerText="🚀";
		if(e.tagName=="CLIPBOARD-COPY")//复制仓库地址按钮适配，使用ClipboardJS实现点击复制
		{		
			btn.innerText+="📄";
			new ClipboardJS(btn);
			btn.setAttribute('data-clipboard-text',proxy_url+originLink);
		}
		else btn.href=proxy_url+originLink;

		e.parentNode.appendChild(btn);
		
		//按钮位置左上角，与原元素有小部分重叠
		var padding=Math.min(20,e.offsetHeight/2,e.offsetWidth/4);
        btn.style.top=(e.offsetTop-btn.offsetHeight+padding).toString()+'px';//top等样式必须带有单位且为字符串类型
        btn.style.left=(e.offsetLeft-btn.offsetWidth+padding).toString()+'px';

		console.log('mousein');
		
		//以下逻辑处理鼠标移出的情况
		
		var onbtn=false;//鼠标移到btn上
		btn.addEventListener('mouseenter',function(){
			console.log('onbtn');
			onbtn=true;
			});
		btn.addEventListener('mouseleave',function(){
				e.parentNode.removeChild(btn);
				console.log('mouseout-btn');
			});

		function emoveout(){//鼠标移出原元素
			setTimeout(function(){//setTimeout是个trick，确保在btn的mouseenter之后执行下述流程
				if(!onbtn)
				{
					e.parentNode.removeChild(btn);
					console.log('mouseout',originLink);
					e.removeEventListener('mouseleave',emoveout);
				}
			},3);

			}
		e.addEventListener('mouseleave',emoveout);
	}

	//releases页面的下载链接 
	var aList=document.querySelectorAll('a[rel=nofollow]');
	for(var i=0;i<aList.length;++i)
    {
        var x=aList[i];
        if(/github.com/.test(aList[i].href)==true)
        {
			console.log(aList[i].href);
			aList[i].addEventListener('mouseenter',
			function(){
				moveHere(event.currentTarget,event.currentTarget.href);
				});

        }
    }
	
	//代码界面的文件链接（不支持文件夹）
	var fileList=document.querySelectorAll('#files~div a.js-navigation-open');
	for(var i=0;i<fileList.length;++i)
    {
        var x=fileList[i];
        if(fileList[i]
		.parentNode
		.parentNode
		.previousElementSibling
		.querySelector('svg[aria-label=File]'))//根据前面的图标判断是否是文件夹
        {
			console.log(fileList[i].href);
			fileList[i].addEventListener('mouseenter',
			function(){
				moveHere(event.currentTarget,event.currentTarget.href);
				});
        }
    }
	
	//仓库地址的复制按钮
	var gitLink=document.querySelector('clipboard-copy:nth-child(1)');
	if(gitLink)
	{
		gitLink.addEventListener('mouseenter',
		function(){
			moveHere(event.currentTarget,document.querySelector(
			`#js-repo-pjax-container 
			> div.container-xl.clearfix.new-discussion-timeline.px-3.px-md-4.px-lg-5 
			> div > div.gutter-condensed.gutter-lg.d-flex.flex-column.flex-md-row 
			> div.flex-shrink-0.col-12.col-md-9.mb-4.mb-md-0 
			> div.file-navigation.mb-3.d-flex.flex-items-start 
			> span > get-repo > details > div > div > div:nth-child(1) 
			> div > div > div > input`
			).value);//获取前面input里的项目地址
			});
	}
})();