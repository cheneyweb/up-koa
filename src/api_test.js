// 系统配置参数
const config = require('config')
// 路由相关
const Router = require('koa-router')
const router = new Router()
// 认证相关
const jwt = require('jsonwebtoken')
// 持久层相关
const BaseModel = require('./model/BaseModel')
// 日志相关
const log = require('tracer').colorConsole({ level: config.log.level })

// ===== 开始：用户认证中间件例子，‘/auth’已经配置白名单，‘/test’路由受保护 =====
// 1、模拟用户登录，生成加密TOKEN令牌
router.use('/auth', function (ctx, next) {
    if (true) { // 判断用户名密码等认证方式，这里默认通过
        const tokenSign = jwt.sign({ userId: '123', iat: Date.now() }, config.auth.secret)
        ctx.tokenSign = tokenSign // 向后面的路由传递TOKEN加密令牌
        next()
    } else {
        ctx.status = 401
        ctx.body = '用户名或密码错误'
    }
})
// 2、向前端传递TOKEN加密令牌
router.get('/auth', function (ctx, next) {
    ctx.body = ctx.tokenSign
})
// 3、下次其余路由需要在请求时在header中加上token参数，如果没有token或者token错误，xauth中间件会提示错误
router.get('/test', function (ctx, next) {
    ctx.body = ctx.tokenVerify // 获取TOKEN解析结果
})
router.post('/test', function (ctx, next) {
    ctx.body = ctx.request.body // 获取请求参数
})
router.get('/dbtest', async function (ctx, next) {
    log.info('开始数据库查询')
    let res = await new BaseModel().isExist({
        TableName: 'ZeusPlatformLog',
        KeyConditionExpression: 'sn = :sn',
        ExpressionAttributeValues: {
            ':sn': '161f385d-c212-4f10-b5c7-4e4cd35597b9'
        }
    })
    ctx.body = res
})
// ===== 结束：用户认证中间件例子，‘/auth’已经配置白名单，‘/test’路由受保护 =====

module.exports = router