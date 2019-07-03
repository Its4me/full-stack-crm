const Category = require('../models/Category')
const errorHandler = require('../utils/errorHandler')
const Position = require('../models/Position')
const aws = require('aws-sdk')
const keys = require('../config/keys')

const s3 = new aws.S3({
  secretAccessKey: keys.IAM_USER_SECRET,
  accessKeyId: keys.IAM_USER_KEY,
  region: 'eu-north-1'
})


module.exports.getAll = async function (req, res) {
  try {
    const categories = await Category.find({ user: req.user.id })
    res.status(200).json(categories)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getById = async function (req, res) {
  try {
    const category = await Category.findById(req.params.id)
    res.status(200).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async function (req, res) {
  try {
    const removedCategory = await Category.findOneAndDelete({ _id: req.params.id })
    await Position.remove({ category: req.params.id })
    
    if (removedCategory.imageSrc) {
      const params = {
        Bucket: keys.BUCKET_NAME,
        Key: removedCategory.key,
      };
      await s3.deleteObject(params)
    }
  
    res.status(200).json({
      message: 'Категория и товары в ней удалены'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function (req, res) {

  const category = new Category({
    name: req.body.name,
    user: req.user.id,
    key: req.file ? req.file.key : '',
    imageSrc: req.file ? req.file.location : ''
  })
  try {
    category.save()
    res.status(201).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.update = async function (req, res) {
  let updated = {
    name: req.body.name,
  }
  if (req.file) {
    updated.key = req.file.key
    updated.imageSrc = req.file.location
  }
  try {

    const category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updated }
    )
    const params = {
      Bucket: keys.BUCKET_NAME,
      Key: category.key,
    };
    await s3.deleteObject(params)

    res.status(200).json({message: 'Обновлено'})
  } catch (e) {
    errorHandler(res, e)
  }
}