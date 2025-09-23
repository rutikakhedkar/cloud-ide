const express=require('express')
const router=express.Router()
const workspaceController= require('../controller/worksppace-controller')

router.get('/load/:stack',workspaceController.getFilesTree)

module.exports = router;