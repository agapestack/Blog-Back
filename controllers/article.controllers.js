const { Articles } = require('../config/db')

module.exports = {
  findArticle: async (req, res, next) => {
    const slug = req.params.slug
    if(!slug){
      next()
    }

    Articles.find({ slug: slug }, (err, article) => {
      if(err) next(err)
      if(!article)  return res.status(404).json({ message: "Article not Found"})

      console.log(article)
      return res.status(200).json(article)
    })
  },

  findAll: async(req, res, next) => {
    Articles.find({}, (err, articles) => {
      if(err) next(err)

      res.status(200).json(articles)
    })
  },

  postArticle: async (req, res, next) => {
    const { title, content } = req.body
    const { username } = req.decoded.data

    if(!username || !title || !content){
      return res.status(400).json({ message: "Missing Field"})
    }
    if(title === "all"){
      return res.status(403).json({ message: "Invalid Title"})
    }
    // console.log(title, content, username)

    const newArticle = new Articles({
      title: title,
      content: content,
      author: username
    })

    newArticle.save(err => {
      if(err) next(err)
      return res.status(201).json({ message: "Article published"})
    })
  }
}