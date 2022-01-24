const express = require('express');
const router = express.Router();

const { chat, email } = require('../controllers/chat');

router.get('/', chat);

router.get('/:email', email);

module.exports = router;