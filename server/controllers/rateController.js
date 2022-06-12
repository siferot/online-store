const { Rating, Device } = require('../models/models')
const ApiError = require("../error/ApiError")

class RateController {
    async create(req, res) {
        const { rating, userId, deviceId } = req.body

        let [rate, created] = await Rating.findOrCreate({
          where: {userId, deviceId},
          defaults: {rate: rating, userId, deviceId}
        })

        if (!created) {
          rate = await Rating.update({rate: rating}, {
                where : {userId, deviceId},
                returning: true
              })

              const rates = await Rating.findAll({ where: { deviceId }})
              let avgRate = rates.reduce((sum, elem) => 
                sum + elem.dataValues.rate, 0
              ) / rates.length
              const rateIsUpdated = await Device.update({rating: avgRate}, {
                where : {id: deviceId}
              })
              if (!rateIsUpdated) {
                console.log("RATE WAS NOT UPDATE")
              } else {
                console.log(`New rate is ${avgRate}`)
              }
              return res.json(rate[1][0])
        }

        const rateIsUpdated = await Device.update({rating}, {
          where : {id: deviceId}
        })
        return res.json(rate)
    }

    async get(req, res) {
        const { userId, deviceId } = req.query
        const rate = await Rating.findAll({ where: { userId, deviceId }})
        return res.json(rate)
    }

}

module.exports = new RateController()