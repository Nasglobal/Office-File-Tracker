const express = require('express');
const fileController = require('../controllers/file-controller');
const {check} = require('express-validator');

const router = express.Router();

router.get('/searchfile', fileController.searchFiles);
router.get('/availableFiles/:officeOfStaff',fileController.availableFiles );
router.get('/update/:fileId',fileController.getFileById );
router.get('/awaitingfiles/:office',fileController.awaitingFiles);
router.get('/incomingfiles/:distinationOffice',fileController.incomingFiles);
router.get('/outgoingfiles/:leavingOffice',fileController.outgoingFiles);

router.post('/registerfile',
[check('fileRef').not().isEmpty(),
check('subMatter').not().isEmpty(),
check('purpose').not().isEmpty(),
check('currentOffice').not().isEmpty(),
check('from').not().isEmpty(),
check('beneficiary').not().isEmpty(),
check('currentDate').not().isEmpty(),
check('paymentStatus').not().isEmpty(),
check('loggedinUser').not().isEmpty(),
check('pendingDestination').not().isEmpty()],
fileController.registerfile);


router.patch('/update/:fileId',
[check('fileRef').not().isEmpty(),
check('subMatter').not().isEmpty(),
check('purpose').not().isEmpty(),
check('from').not().isEmpty(),
check('beneficiary').not().isEmpty()],
fileController.updateFileById );

router.patch('/sendfile/:fileId',
[check('pendingDestination').not().isEmpty()],
fileController.sendFileById );

router.patch('/acceptfile/:fileId',
[check('pendingDestination').not().isEmpty(),
check('currentOffice').not().isEmpty(),
check('loggedinUser').not().isEmpty()],
fileController.AcceptFileById );

router.patch('/rejectfile/:fileId',fileController.rejectFileById);


router.delete('/delete/:fileId',fileController.deleteFileById );

module.exports = router;