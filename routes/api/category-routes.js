const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories,included its associated Products
router.get('/', (req, res) => {

  Category.findAll({
    include: [Product],
  })
    .then((getCategories) => res.json(getCategories))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

// find one category by its `id` value,included the associated products with that category
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [Product],
  })
    .then(getIdCategories => {
      if (!getIdCategories) {
        res.status(404).json({ message: 'No categories found with this id' });
        return;
      }
      res.json(getIdCategories);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a new category
router.post('/', (req, res) => {

  Category.create({
    category_name: req.body.category_name
  })
    .then(postCategory => res.json(postCategory))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {

    category_name: req.body.category_name
  },
    {
      where: {
        id: req.params.id
      }
    }
    )
    .then(updateIdCategories => {
      if (!updateIdCategories[0]) {
        res.status(404).json({ message: 'No categories found with this id' });
        return;
      }
      res.json(updateIdCategories);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

 // delete a category by its `id` value
router.delete('/:id', (req, res) => {
 
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(deleteCategories => {
    if (!deleteCategories) {
      res.status(404).json({ message: 'No categories found with this id' });
      return;
    }
    res.json(deleteCategories);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
