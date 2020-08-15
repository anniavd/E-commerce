const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {

  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price','stock', 'category_id'],
        through: ProductTag,
        as: 'products'
      }
    ],
  })
    .then((getTags) => res.json(getTags))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// find a single tag by its `id` to included its associated Product data
router.get('/:id', (req, res) => {
  
  Tag.findOne(
    {
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock','category_id'],
          through: ProductTag,
          as: 'products'
        }
      ],
    })
    .then(getIdTags=> {
      if (!getIdTags) {
        res.status(404).json({ message: 'No tags found with this id' });
        return;
      }
      res.json(getIdTags);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

router.post('/', (req, res) => {
  Tag.create({
    tag_name:req.body.tag_name
  })
  .then((posTags) => res.json(posTags))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(
    {

    tag_name: req.body.tag_name
  },
    {
      where: {
        id: req.params.id
      }
    }
    )
    .then(updateIdTags => {
      if (!updateIdTags[0]) {
        res.status(404).json({ message: 'No tags found with this id' });
        return;
      }
      res.json(updateIdTags);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


  // delete on tag by its `id` value
router.delete('/:id', (req, res) => {
Tag.destroy({
  where:{
    id:req.params.id
  }
})
.then(deleteTags=> {
  if (!deleteTags) {
    res.status(404).json({ message: 'No tags found with this id' });
    return;
  }
  res.json(deleteTags);
})
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});

module.exports = router;
