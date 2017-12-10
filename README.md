# up-koa
适用于APEX/UP无服务部署的KOA集成版本，基于XServer无服务框架开发

[传送门：XServer官网文档](http://xserver.top)

框架目录结构
>
    ├── Makefile
    ├── app.js
    ├── config
    │   ├── default.json
    │   ├── develop.json
    │   └── production.json
    ├── model
    │   └── BaseModel.js
    ├── node-v8.4.0-linux-x64
    ├── node_modules
    ├── package.json
    ├── up.json
    └── webpack.config.js（尚未使用打包，仅存留）

预置安装
>
    1、[npm](https://www.npmjs.com)

    2、[up](https://up.docs.apex.sh)

快速上手
>
    1、vim ./aws/credentials

    2、npm install && up
    
    PS：在AWS控制台上调整up创建的role的策略,以提供dynamodb等资源的访问权限,若对AWS或UP的细节不清楚,请移至其官网进一步了解
    
功能特性
>
    1、集成koa服务
    2、集成koa-xerror全局错误捕获中间件
    3、集成koa-router路由中间件
    4、集成koa-body解析中间件，可解析JSON入参
    5、集成koa-xauth认证中间件，基于jwt令牌身份识别
    6、集成koa-xlog日志中间件，异步日志处理
    7、集成config配置，配置文件位于/config目录
    8、集成dynamodb操作基类，位于/model目录
    9、集成node8运行环境构建，ES7代码，部署后可兼容AWS的Lambda运行时(Node V6.1.0)

帮助联系
>
	作者:cheneyxu
	邮箱:457299596@qq.com
	QQ:457299596

更新日志
>
	2017.12.08:初版
    2017.12.09:集成koa-xlog日志中间件
    2017.12.10:集成koa-xerror全局错误捕获中间件