const express = require('express');
const router = express.Router();
const worksSpaceController = require('../controller/workspace-controller');

router.get("/load/:stack",worksSpaceController.getFiles)

module.exports = router;