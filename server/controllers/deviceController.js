const { Device, Brand, DeviceInfo } = require("../models/models");
const ApiError = require("../error/ApiError");
const path = require("path");

const uuid = require("uuid");
const { nextTick } = require("process");

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      console.log(img);
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        info,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        );
      }

      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 10;
    let offset = limit * (page - 1);
    let devices;
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({
        limit,
        offset,
        order: [["createdAt"]],
      });
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
        order: [["createdAt"]],
      });
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
        order: [["createdAt"]],
      });
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId, brandId },
        limit,
        offset,
        order: [["createdAt"]],
      });
    }

    return res.json(devices);
  }

  async getOne(req, res) {
    const { id } = req.params;
    let device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });
    const brand = await Brand.findOne({
      where: device.dataValues.brandId,
    });
    device.dataValues.brandName = brand.dataValues.name;
    return res.json(device);
  }
}

module.exports = new DeviceController();
