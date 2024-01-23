import db from '../../_helpers/mongoose.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllersRestaurantsShow = async (req, res) => {
  try {
    const { params: { _id } } = req

    const restaurant = await db.Restaurant
      .findOne({ _id })
      .populate({ path: 'dietaries', select: 'name' })
      .populate({ path: 'categories', select: 'name' })
      .populate({
        path: 'foods',
        populate: {
          path: 'meals'
        }
      })

    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' })
    return res.status(200).json(restaurant)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersRestaurantsShow
