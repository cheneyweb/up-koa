// 系统配置参数
const config = require('config')
// 路由相关
const Router = require('koa-router')
const router = new Router()
// 认证相关
const jwt = require('jsonwebtoken')
// 持久层相关
const BaseModel = require('./model/BaseModel')
// 工具相关
const _ = require('lodash')
// 日志相关
const log = require('tracer').colorConsole({ level: config.log.level })

// 普通数据库查询
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
// 分页数据库查询
router.get('/pagetest', async function (ctx, next) {
    let inparam = {
        role: '1',
        page: {
            limit: 1000,
            startKey: null,
            lastEvaluatedKeyTemplate: ['createdAt', 'role', 'sn', 'userId']
        }
    }
    let res = await new BaseModel().page({
        TableName: 'ZeusPlatformLog',
        IndexName: 'LogRoleIndex',
        KeyConditionExpression: '#role = :role',
        ExpressionAttributeNames: {
            '#role': 'role'
        },
        ExpressionAttributeValues: {
            ':role': inparam.role
        }
    }, inparam.page)
    ctx.body = res
})
// 筛选查询
router.get('/filtertest', async function (ctx, next) {
    let inparam = {
        role: '1',
        query: {
            type: 'login'
        }
    }
    let query = {
        TableName: 'ZeusPlatformLog',
        IndexName: 'LogRoleIndex',
        KeyConditionExpression: '#role = :role',
        ExpressionAttributeNames: {
            '#role': 'role'
        },
        ExpressionAttributeValues: {
            ':role': inparam.role
        }
    }
    new BaseModel().bindFilterParams(query, inparam.query, true)
    let res = await new BaseModel().query(query)
    ctx.body = res
})

module.exports = router