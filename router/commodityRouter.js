const Router = require('koa-router');

const commodityController = require('../controller/commodityController');


const router = Router();

router.post('/api/commodity/get', commodityController.getCommodity)
      .post('/api/commodity/updata', commodityController.editCommodity)
      .post('/api/monthList/get', commodityController.getMonthList)
      .post('/api/month/get', commodityController.getMonth);


module.exports = router;