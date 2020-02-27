const router = require('express').Router()
const express = require('express')
const podcastController = require('../controller/PodcastController')
const fileupload = require('express-fileupload')
const { checkToken } = require('../middleware')
router.use(fileupload())
router.use(express.static('public/'))

// POST upload podcast
router.post('/upload/:id_post', checkToken, podcastController.uploadPodcast)

// GET show podcast by post
router.get('/:id_post', podcastController.showPodcastByPost)

// DELETE podcast by id
router.delete('/:id', checkToken, podcastController.deletePodcastById)

// Show Podcast on HTM
router.get('/:id/show', podcastController.showPodcastOnHTM)

// Stream Podcast
router.get('/stream/:id', podcastController.streamPodcast)

module.exports = router
