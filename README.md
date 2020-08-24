# gh-proxy-buttons
## 简介

一个基于[gh-proxy](https://github.com/hunshcn/gh-proxy)的油猴脚本，为github中的特定链接（releases、文件、项目地址）添加一个悬浮按钮，提供代理后的加速链接。不需要修改hosts，不需要导入仓库，所需的仅仅是在油猴中安装本脚本。

Add a button beside github link(releases,files and repository url), click to get alternative url according to previously specified proxy.

## 安装

无论如何，首先你需要为你的浏览器安装[油猴脚本管理器](https://www.tampermonkey.net/)。

### 自动安装

点击此处[链接](https://gh-proxy.du33169.workers.dev/https://github.com/du33169/gh-proxy-buttons/blob/master/gh-proxy-buttons.js)，如果一切顺利，会跳转到油猴的脚本安装页面，点击“安装”即可。

### 手动安装

2. 点击油猴脚本管理器的图标，它通常长这个样子：![image-20200728152241242](https://gh-proxy.du33169.workers.dev/https://github.com/du33169/gh-proxy-buttons/blob/master/README.assets/image-20200728152241242.png)

2. 点击“管理面板”，选择“实用工具”选项卡：![image-20200728152334351](https://gh-proxy.du33169.workers.dev/https://github.com/du33169/gh-proxy-buttons/blob/master/README.assets/image-20200728152334351.png)

3. 此时你可以选择下列方式安装：

  1. “文件”：下载代码中的gh-proxy-buttons.js并在此处导入。
  2. “Install from url”：复制如下链接，填入并点击“安装”。

```txt
https://gh-proxy.du33169.workers.dev/https://github.com/du33169/gh-proxy-buttons/blob/master/gh-proxy-buttons.js
```

## 使用

安装后打开GitHub的网页，将你的鼠标悬浮于下述链接/按钮即可触发：

对于链接，点击出现的按钮将会通过代理开始下载该文件；

对于仓库地址，点击按钮将会复制代理后的链接（基于[ClipboardJS](https://clipboardjs.com)，可直接用于git clone。

| 对象                               | 图示                                                         | 说明                                                         |
| ---------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Releases页面的下载按钮             | ![release](https://gh-proxy.du33169.workers.dev/https://github.com/du33169/gh-proxy-buttons/blob/master/README.assets/release.png) | 点击按钮通过代理下载或右键复制链接                           |
| 代码页面的文件链接（不支持文件夹） | ![file](https://gh-proxy.du33169.workers.dev/https://github.com/du33169/gh-proxy-buttons/blob/master/README.assets/file.png) | 点击按钮通过代理下载或右键复制链接                           |
| 仓库地址的文本框                   | ![copy](https://gh-proxy.du33169.workers.dev/https://github.com/du33169/gh-proxy-buttons/blob/master/README.assets/input.png) | 点击复制仓库链接（基于[ClipboardJS](https://clipboardjs.com/)） |
| 完整仓库的压缩包下载               | ![zip](https://gh-proxy.du33169.workers.dev/https://github.com/du33169/gh-proxy-buttons/blob/master/README.assets/zip.png) | 点击按钮通过代理下载或右键复制链接                           |

## 自定义代理服务器

本脚本是[gh-proxy](https://github.com/hunshcn/gh-proxy)项目的二次包装，原项目的演示服务器为[https://gh.api.99988866.xyz](https://gh.api.99988866.xyz)，也可直接点击链接以网页形式使用。

**注意**：由于cloudflare免费版worker有单日请求数限制，如果需要大量下载，请根据[教程](https://github.com/hunshcn/gh-proxy#cf-worker%E7%89%88%E6%9C%AC%E9%83%A8%E7%BD%B2)自行部署worker。

我也部署了一个worker用于分流，也是目前脚本中默认使用的：[https://gh-proxy.du33169.workers.dev/](https://gh-proxy.du33169.workers.dev/)。

当然如果有条件也请自行按要求部署（免费）。


要修改使用的代理服务器，可以直接编辑脚本（**末尾斜杠不可省略**）：

![image-20200728160207769](https://gh-proxy.du33169.workers.dev/https://github.com/du33169/gh-proxy-buttons/blob/master/README.assets/image-20200728160207769.png)


## 相关项目

[Tampermonkey](https://github.com/Tampermonkey/tampermonkey) [gh-proxy](https://github.com/hunshcn/gh-proxy) [ClipboardJS](https://github.com/zenorocha/clipboard.js) 
