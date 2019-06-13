const Component = require('react');
const CommodityModel = require('../model/commodityModel');

class CommodityController {
  async getCommodity(ctx) {
    const { name, pageSize, current } = ctx.request.body;

    try {
      const total = await CommodityModel.find({ 'name': {$regex: name, $options:'i'} }).count();
      const commodity = await CommodityModel.find({ 'name': {$regex: name, $options:'i'} })
                                            .limit(pageSize)
                                            .skip((current - 1) * pageSize);
      ctx.body = { message: '查询商品成功', status: true, result: { commodity, total } };
      ctx.status = 200;
    } catch (err) {
      console.log(err);
      ctx.body = { message: '获取商品失败!', status: false };
      ctx.status = 500;
    }
  }

  async getMonth(ctx) {
    try {
      const month = await CommodityModel.find({}, { arrivalTime: 1, _id: 0 })
                                        .sort({ arrivalTime: -1 });
      const monthList = Array.from(new Set(month.map(item => item.arrivalTime)));
      const monthList_ = monthList.filter(item => item);
      ctx.body = { message: '查询到货列表成功', status: true, result: monthList_ };
    } catch (error) {
      console.log(error);
      ctx.body = { message: '获取到货列表失败!', status: false };
      ctx.status = 500;
    }
  }

  async getMonthList(ctx) {
    const { arrivalTime, pageSize, current } = ctx.request.body;

    try {
      const total = await CommodityModel.find({ arrivalTime }).count();
      const commodity = await CommodityModel.find({ arrivalTime })
                                            .limit(pageSize)
                                            .skip((current - 1) * pageSize);
      // const commodity_ = await CommodityModel.find({ arrivalTime }, { _id: 0, name: 1, status: 1 });
      ctx.body = { message: '查询月到货信息成功', status: true, result: { commodity, total } };
    } catch (error) {
      console.log(error);
      ctx.body = { message: '查询月到货信息失败!', status: false };
      ctx.status = 500;
    }
  }

  async editCommodity(ctx) {
    const { _id, ...infos } = ctx.request.body;

    try {
      const item = await CommodityModel.findOneAndUpdate({ _id }, { $set: { ...infos } })
                                    .exec();
      if (!item) {
        // 不存在，则新建
        const newClient = await new CommodityModel({ ...infos }).save();
        
        ctx.body = { message: 'success', status: true };
      } else {
        ctx.body = { message: 'success', status: true };
      }
    } catch (err) {
      console.log(err);
      ctx.body = { message: '更新信息失败！', status: false };
      ctx.status = 500;
    }
  }
}

module.exports = new CommodityController();