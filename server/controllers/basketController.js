const { Basket, BasketDevice } = require("../models/models");
const ApiError = require("../error/ApiError");

class BasketController {
  async addDevice(req, res) {
    const { userId, deviceId } = req.body.params;
    console.log(userId);
    const basket = await Basket.findOne({
      where: userId,
    });
    const basketId = basket.dataValues.userId;
    const basketDevice = await BasketDevice.create({ basketId, deviceId });
    return res.json(basketDevice);
  }

  async updateDevice(req, res) {
    const { id, quantity } = req.body.params;

    console.log(quantity);
    const device = await BasketDevice.update(
      { quantity: quantity },
      {
        where: {
          id: id,
        },
      }
    );
    return res.json(device);
  }

  async removeDevice(req, res) {
    const { id } = req.body.params;
    console.log(id);
    const basket = await BasketDevice.destroy({
      where: { id: id },
    });
    console.log(basket);
    // return res.json(brands);
  }

  async clearBasket(req, res) {
    const basket = await Basket.findAll();
    return res.json(brands);
  }

  async getBasket(req, res, next) {
    try {
      const { userId } = req.query;
      const basket = await Basket.findOne({
        where: { userId: userId },
      });
      const basketId = basket.dataValues.userId;
      const deviceInBasket = await BasketDevice.findAll({
        where: { basketId: basketId },
      });
      return res.json(deviceInBasket);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new BasketController();
