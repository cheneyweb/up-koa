// 系统配置参数
const config = require('config')
const { PORT = 3000 } = process.env
// 应用服务与中间件相关
const Koa = require('koa')
const koaBody = require('koa-body')
const xerror = require('koa-xerror')
const xauth = require('koa-xauth')
const xlog = require('koa-xlog')
// 日志相关
const log = require('tracer').colorConsole({ level: config.log.level })
// 业务控制器
const testrouter = require('./src/api_test')

// 初始化应用服务，加载所有中间件
const app = new Koa()
app.use(xerror(config.error))           // 全局错误捕获中间件，必须第一位使用，参数1：错误配置
app.use(koaBody())                      // 入参JSON解析中间件
app.use(xlog(config.log, (ctx) => { log.info('异步日志处理', ctx.request.body) }))    //日志中间件，参数1：日志配置，参数2：额外日志处理
app.use(xauth(config.auth, (v) => v))   // TOKEN身份认证中间件，，参数1：认证配置，参数2：额外自定义TOKEN解析规则
app.use(testrouter.routes())            // 业务路由中间件

// 启动应用服务
app.listen(PORT)
log.info(`up-koa服务启动【执行环境:${process.env.NODE_ENV},端口:${PORT}】`)
