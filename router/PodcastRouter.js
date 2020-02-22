const router = require('express').Router()
const podcastController = require('../controller/PodcastController')
const fileupload = require('express-fileupload')
const { checkToken } = require('../middleware')
router.use(fileupload())

// POST upload podcast
router.post('/upload/:id_post', checkToken, podcastController.uploadPodcast)

// GET show podcast by post
router.get('/:id_post', podcastController.showPodcastByPost)

// DELETE podcast by id
router.delete('/:id', checkToken, podcastController.deletePodcastById)

module.exports = router