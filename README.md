# up-koa
适用于APEX/UP无服务部署的KOA集成版本，基于XServer无服务框架开发

[传送门：XServer官网文档](http://www.xserver.top)

框架目录结构
>
    ├── app.js                  应用入口
    ├── config                  系统配置
    │   ├── default.json
    │   ├── develop.json
    │   └── production.json
    ├── node_modules            外部模块
    ├── package.json
    ├── src                     应用源码（编码工作区）
    │   ├── api_authtest.js     业务控制器
    │   ├── api_dbtest.js       业务控制器
    │   └── model               业务模型
    └── up.json                 UP配置

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
    5、集成koa-xauth认证中间件，基于jwt令牌身份识别和拓展角色身份识别
    6、集成koa-xlog日志中间件，异步日志处理
    7、集成config配置，配置文件位于/config目录
    8、集成dynamodb操作基类，位于/src/model目录
    9、集成node8运行环境构建，ES7代码，部署后可兼容AWS的Lambda运行时(Node v8.10.0)

帮助联系
>
	作者:cheneyxu
	邮箱:457299596@qq.com
	QQ:457299596

更新日志
>
	2017.12.08:初版
    2017.12.09:集成koa-xlog日志中间件
    2017.12.10:集成koa-xerror全局错误捕获中间件，优化代码目录组织，业务代码集中放置于src/
    2017.12.11:更新BaseModel数据库操作基类
    2017.12.12:更新koa-xauth认证中间件，增加角色路由保护
    2017.12.13:数据库操作更新
    2018.01.07:更新koa-xauth认证中间件，增加跨域处理
    2018.01.10:更新koa-xauth认证中间件，可配置跨域处理
    2018.01.28:升级所有依赖
    2018.01.29:更新koa-xlog/koa-xerror/koa-xauth中间件
    2018.02.11:更新BaseModel数据库操作基类，批量插入支持递归插入失败数据
    2018.02.12:升级node环境为8.9.4
    2018.03.07:更新koa-xauth和koa-xerror
    2018.04.04:原生支持node8.10环境
    2018.10.15:升级所有依赖
    2018.10.29:升级所有依赖
