// ==UserScript==
// @name         gh-proxy-buttons
// @name:zh-CN   github加速按钮
// @namespace    https://github.com/du33169/gh-proxy-buttons
// @version      0.5
// @require      https://cdn.bootcdn.net/ajax/libs/clipboard.js/2.0.6/clipboard.min.js
// @description  add a button beside github link(releases,files and repository url), click to get alternative url according to previously specified proxy.
// @description:zh-CN  为github中的特定链接（releases、文件、项目地址）添加一个悬浮按钮，提供代理后的加速链接
// @author       du33169
// @match        *://github.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==
(function() 
{
    'use strict'; 
	
//--------------------------代理设置-------------------------------      
//用于在线代理的workers地址                                                                                                            
var proxy_url= 'https://gh-proxy.du33169.workers.dev/'; 
/*      
	备用： 'https://gh.api.99988866.xyz/';   （来自gh-proxy项目作者）
	代理服务器地址可自行修改，末尾斜杠不可省略！
*/
	
//--------------------------目标设置------------------------------
//[↓Code ] 按钮中仓库git地址文本框
var repo_url_input=document.querySelector(`div.p-3:nth-child(1) > tab-container:nth-child(3) > div:nth-child(2) > div:nth-child(1) > input:nth-child(1)`);

// 仓库界面容器
var repo_container=document.querySelector('#js-repo-pjax-container');

// releases 页面内容容器
var release_container=document.querySelector('#repo-content-pjax-container');

//--------------------------其他设置------------------------------
//是否打开调试输出
var open_log=false;



	console.log('[gh-proxy-buttons] processing...');
	function moveHere(e,originLink)//用于注册mouseenter事件,e为当前元素
	{
		if(document.getElementById('gh-proxy-button'))//如果已经产生按钮则返回，删去在Firefox会死循环（原因未知）
			return;
		
		//创建按钮对象,github中使用.btn的class可以为<a>标签加上按钮外观
		var btn=document.createElement(e.tagName=="INPUT"?'button':'a');//对于仓库地址使用button以实现点击复制
			btn.setAttribute('class','btn');
			btn.id="gh-proxy-button";
			btn.title="get proxy link";
			btn.style.position="absolute";
			btn.role="button";
			btn.innerText="🚀";

		if(e.tagName=="INPUT")//仓库地址input标签特殊处理，使用ClipboardJS实现点击复制
		{		
			btn.innerText+="📄";
			new ClipboardJS(btn);
			btn.setAttribute('data-clipboard-text',proxy_url+originLink);
			//console.log('[gh-proxy-buttons] input url processed');
		}
		else btn.href=proxy_url+originLink;

		e.parentNode.appendChild(btn);
		
		//按钮位置左上角，与原元素有小部分重叠以确保从原元素移到按钮时不会因移出元素消失
		var padding=Math.min(20,e.offsetHeight/2,e.offsetWidth/4);
        btn.style.top=(e.offsetTop-btn.offsetHeight+padding).toString()+'px';//top等样式必须带有单位且为字符串类型
        btn.style.left=(e.offsetLeft-btn.offsetWidth+padding).toString()+'px';

		if(open_log)console.debug('[gh-proxy-buttons] mousein');
		
		//以下逻辑处理鼠标移出的情况
		
		var onbtn=false;//鼠标移到btn上
		btn.addEventListener('mouseenter',function(){
				if(open_log)console.debug('[gh-proxy-buttons] onbtn');
				onbtn=true;
			});
		btn.addEventListener('mouseleave',function(){
				e.parentNode.removeChild(btn);
				if(open_log)console.debug('[gh-proxy-buttons] mouseleave-btn');
			});

		function emoveout(){//鼠标移出原元素
			setTimeout(function(){//setTimeout是个trick，确保在btn的mouseenter之后执行下述流程
					if(!onbtn)
					{				
						e.parentNode.removeChild(btn);
						if(open_log)
							console.debug('[gh-proxy-buttons] mouseleave',originLink);
						e.removeEventListener('mouseleave',emoveout);
					}
				},3);
			}
		e.addEventListener('mouseleave',emoveout);
	}
		

	//使用事件委托添加代理下载按钮
	function eventDelegation(e) 
	{
    // e.target 是事件触发的元素
		if(e.target!=null) 
		{
			var ourTarget=e.target;
			while(ourTarget!=e.currentTarget&&ourTarget.tagName!='A'&&ourTarget!=repo_url_input)//releases页面触发元素为<a>内的span，需要上浮寻找
			{
				ourTarget=ourTarget.parentNode;
			}

			if(open_log)
				console.log('[gh-proxy-buttons] ',ourTarget);
			if(
				ourTarget.tagName=='A'			
				&&(
					ourTarget.getAttribute('class')!=null//利用&&短路特性防止没有class属性的元素导致脚本终止
					&&ourTarget.getAttribute('class').indexOf("js-navigation-open")!=-1
					&&ourTarget.parentNode.parentNode.previousElementSibling
					.querySelector('svg[aria-label=File]')//仓库文件
					
					||	

					ourTarget.rel=="nofollow"
					&&ourTarget.title!="Go to parent directory"
					&&/github.com/.test(ourTarget.href)==true//"Download ZIP"
				)
			)
			{
				//console.log('[gh-proxy-buttons] added button on <a>');
				moveHere(ourTarget,ourTarget.href);
			}
			else if(ourTarget==repo_url_input)//地址input标签
			{
				//console.log('[gh-proxy-buttons] added button on <input>');
				moveHere(ourTarget,ourTarget.value);
			}
		}
	}
	if(repo_container!=null)
		repo_container.addEventListener("mouseover", eventDelegation);
	if(release_container!=null)
		release_container.addEventListener("mouseover", eventDelegation);

})();
