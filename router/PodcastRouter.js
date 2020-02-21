const router = require('express').Router()
const podcastController = require('../controller/PodcastController')
const fileupload = require('express-fileupload')
router.use(fileupload())

// POST upload podcast
router.post('/upload/:id_post', podcastController.uploadPodcast)

// GET show podcast by post
router.get('/:id_post', podcastController.showPodcastByPost)

// DELETE podcast by id
router.delete('/:id', podcastController.deletePodcastById)

module.exports = router