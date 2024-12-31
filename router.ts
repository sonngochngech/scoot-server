import express from 'express';
import * as appCtrl from './controllers/appCtrl';
const router = express.Router();


router.post('/fengShui/prediction',appCtrl.getFengShui);
router.get('/fengShui/cities',appCtrl.getCities);
router.post('/fengShui/tripPlanning',appCtrl.getTripPlanning);
router.get('/fengShui/:id',appCtrl.getPage);
router.post('/fengShui/create',appCtrl.createPage);

export default router;