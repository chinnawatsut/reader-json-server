'use strict'

const express = require('express')
const cors = require('cors')
const AuthService = require('./services/auth.service')
const UserService = require('./services/user.service')
const ReviewService = require('./services/review.service')
const security = require('./middlewares/security.middleware')

module.exports = (app) => {
    const router = express.Router()

    router.options('*', cors())
    router.post('/auth/login', cors(), AuthService.login)
    router.post('/users', cors(), UserService.createUser)
    router.patch('/users/:id', [cors(), security.secure], UserService.updateUser)
    router.patch('/me', [cors(), security.secure], UserService.updateMe)
    router.get('/me', [cors(), security.secure], UserService.getMe)

    router.get('/reviews', cors(), ReviewService.getReviews)
    
    router.get('/reviews/:id', cors(), ReviewService.getReview)
    router.post('/reviews', [cors(), security.secure], ReviewService.createReview)
    router.patch('/reviews/:id', [cors(), security.secure], ReviewService.updateReview)
    router.delete('/reviews/:id', [cors(), security.secure], ReviewService.deleteReview)

    app.use(router)
    app.use((err, req, res, next) => {
        console.log(err)
        res.status(err.code)
        res.send(err.data.message)
    })
}
