# gh-proxy-buttons
## 简介

一个油猴脚本，为github中的特定链接（releases、文件、项目地址）添加一个悬浮按钮，提供代理后的加速链接。不需要修改hosts，不需要导入仓库，所需的仅仅是在油猴中安装本脚本。

Add a button beside github link(releases,files and repository url), click to get alternative url according to previously specified proxy.

## 安装

### 自动安装

敬请期待

### 手动安装

1. 首先你需要为你的浏览器安装[油猴脚本管理器](https://www.tampermonkey.net/)。

2. 点击扩展图标，它通常长这个样子：![image-20200728152241242](https://github.com/du33169/gh-proxy-buttons/raw/master/README.assets/image-20200728152241242.png)

3. 点击“管理面板”，选择“实用工具”选项卡：![image-20200728152334351](https://github.com/du33169/gh-proxy-buttons/raw/master/README.assets/image-20200728152334351.png)

4. 此时你可以选择下列方式安装：

	1. “文件”：下载代码中的gh-proxy-buttons.js并在此处导入。
	2. “Install from url”：复制此[链接](https://github.com/du33169/gh-proxy-buttons/gh-proxy-buttons.js)，填入并点击“安装”。

## 使用

安装后打开GitHub的网页，将你的鼠标悬浮于下述链接/按钮即可触发：

对于链接，点击出现的按钮将会通过代理开始下载该文件；

对于仓库地址，点击按钮将会复制代理后的链接（基于[ClipboardJS](https://clipboardjs.com/)），可直接用于git clone。

| 对象                               | 图示                                  | 说明                                                         |
| ---------------------------------- | ------------------------------------- | ------------------------------------------------------------ |
| Releases页面的下载按钮             | ![release](https://github.com/du33169/gh-proxy-buttons/raw/master/README.assets/release.png) | 点击按钮通过代理下载或右键复制链接                           |
| 代码页面的文件链接（不支持文件夹） | ![file](https://github.com/du33169/gh-proxy-buttons/raw/master/README.assets/file.png)       | 点击按钮通过代理下载或右键复制链接                           |
| 仓库地址的复制按钮                 | ![copy](https://github.com/du33169/gh-proxy-buttons/raw/master/README.assets/copy.png)       | 点击复制仓库链接（基于[ClipboardJS](https://clipboardjs.com/)） |
| 完整仓库的压缩包下载               | ![zip](https://github.com/du33169/gh-proxy-buttons/raw/master/README.assets/zip.png)         | 点击按钮通过代理下载或右键复制链接                           |

## 自定义代理服务器

本脚本是基于[gh-proxy](https://github.com/hunshcn/gh-proxy)项目的二次包装，默认代理服务器为该项目的演示服务器[https://gh.api.99988866.xyz/](https://gh.api.99988866.xyz/)，也可直接点击以网页形式代理下载。

由于演示服务器限制，如果需要大量下载，请自行部署服务器。

可以直接编辑脚本修改使用的代理服务器（**末尾斜杠不可省略**）：

![image-20200728160207769](https://github.com/du33169/gh-proxy-buttons/raw/master/README.assets/image-20200728160207769.png)

### 声明

不是专业前端，代码写的乱乱；

如果觉得很赞，点个star围观；

大佬路过看看，批评不要手软！
