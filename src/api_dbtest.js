// 系统配置参数
const config = require('config')
// 路由相关
const Router = require('koa-router')
const router = new Router()
// 工具相关
const _ = require('lodash')
// 日志相关
const log = require('tracer').colorConsole({ level: config.log.level })
// 持久层相关
const BaseModel = require('./model/BaseModel')
const LogModel = require('./model/LogModel')

// 普通数据库查询
router.get('/dbtest', async function (ctx, next) {
    log.info('开始数据库查询')
    let res = await new BaseModel().isExist({
        TableName: 'ZeusPlatformLog',   // 使用BaseModel查询需要指定表名
        KeyConditionExpression: 'sn = :sn',
        ExpressionAttributeValues: {
            ':sn': '161f385d-c212-4f10-b5c7-4e4cd35597b9'
        }
    })
    ctx.body = res
})
// 继承分页查询
router.get('/pagetest', async function (ctx, next) {
    // 模拟输入参数,page为约定对象
    let inparam = {
        role: '1',
        page: {
            limit: 1000,
            startKey: null,
            lastEvaluatedKeyTemplate: ['createdAt', 'role', 'sn', 'userId']
        }
    }
    // 组装查询条件并查询
    let res = await new LogModel().page({
        IndexName: 'LogRoleIndex',
        KeyConditionExpression: '#role = :role',
        ExpressionAttributeNames: {
            '#role': 'role'
        },
        ExpressionAttributeValues: {
            ':role': inparam.role
        }
    }, inparam.page)
    // 返回结果
    ctx.body = res
})
// 继承筛选查询,query为约定对象
router.get('/filtertest', async function (ctx, next) {
    // 模拟输入参数
    let inparam = {
        role: '1',
        query: {
            type: 'login'
        }
    }
    // 组装查询条件
    let query = {
        IndexName: 'LogRoleIndex',
        KeyConditionExpression: '#role = :role',
        ExpressionAttributeNames: {
            '#role': 'role'
        },
        ExpressionAttributeValues: {
            ':role': inparam.role
        }
    }
    // 绑定筛选参数并查询
    let res = await new LogModel().bindFilterQuery(query, inparam.query, true)
    // 返回结果
    ctx.body = res
})

module.exports = router