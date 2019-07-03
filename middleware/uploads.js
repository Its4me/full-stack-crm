const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const keys = require('../config/keys')


const s3 = new aws.S3({
  secretAccessKey: keys.IAM_USER_SECRET,
  accessKeyId: keys.IAM_USER_KEY,
  region: 'eu-north-1'
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: keys.BUCKET_NAME,
    acl: 'public-read',
    fileFilter,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
})
function fileFilter(req, file, cb) {
  if (file.size >= 5242880) {
    cb(null, false)
  }
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } 
  cb(new Error('Тип файла долже быть jpeg или png, а размер меньше 5 мб'))
  
}
module.exports = upload