const mongoose = require('mongoose')
const Schema = mongoose.Schema
var uniqueValidator = require('mongoose-unique-validator');
const slugify = require('slugify')


const articleSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  slug: {
    type: String,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  }
},
{ timestamps: { createdAt: 'created_at', updateAt: 'updated_at' }}
)

articleSchema.pre(
  'save',
  async function(next) {
    const article = this
    this.slug = slugify(article.title, '_')
    next()
  }
)

articleSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Articles", articleSchema)
