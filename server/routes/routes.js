const express = require('express');
const { ReportScanner } = require('../controller/MedicalScanner');
const { PeriodTracker } = require('../controller/PeriodTracker');

const router = express.Router();

// Example route: Home
router.post('/reportScanner', ReportScanner);
router.post('/periodTracker', PeriodTracker);



module.exports = router;