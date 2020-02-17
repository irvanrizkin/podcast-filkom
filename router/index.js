const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({
        "success": true,
        "message": "This is homepage"
    })
})

router.use('/user', userRouter)
router.use(notFound)
router.use(errorHandler)

function notFound(req, res, next) {
    res.status(404)
    const error = new Error("Page Not Found")
    next(error)
}

function errorHandler(err, req, res, next) {
    res.status(res.statusCode || 500)
    const message = err.message || "Internal Server Error"
    res.json({
        "message": message
    })
}

module.exports = router