import db from '../../_helpers/mongoose.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllersFilterableIndex = async (req, res) => {
  try {
    const dietaries = await db.Dietary.find({}, { restaurants: 0 })
    const categories = await db.Category.find({}, { restaurants: 0 })

    return res.status(200).json({ dietaries, categories })
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersFilterableIndex
