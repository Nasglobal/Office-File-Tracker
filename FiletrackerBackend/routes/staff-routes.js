const express = require('express');
const {check} = require('express-validator');
const staffController = require('../controllers/staffs-controller');

const router = express.Router();

router.get('/',staffController.getStaffs);

router.post('/registerstaff',
[check('name').not().isEmpty(),
check('email').normalizeEmail().isEmail(),
check('office').not().isEmpty(),
check('password').not().isEmpty()],
staffController.registerStaff );

router.patch('/updatestaff/:staffId',
[check('name').not().isEmpty(),
check('email').normalizeEmail().isEmail(),
check('office').not().isEmpty(),
check('password').not().isEmpty()]
,staffController.updateStaffById);

router.delete('/deletestaff/:staffId',staffController.deleteStaffById);

router.post('/login',
[check('email').normalizeEmail().isEmail(),
check('password').not().isEmpty()],
staffController.login);

module.exports = router;