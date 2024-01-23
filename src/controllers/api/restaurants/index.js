import db from '../../_helpers/mongoose.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllersRestaurantsIndex = async (req, res) => {
  try {
    const { query: { filter } } = req

    const query = {
      $or: [
        { categories: filter },
        { dietaries: filter }
      ]
    }

    const restaurants = await db.Restaurant
      .find(filter ? query : {})
      .populate({ path: 'dietaries', select: 'name' })
      .populate({ path: 'categories', select: 'name' })

    return res.status(200).json(restaurants)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersRestaurantsIndex
