const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findAll()
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  const category = await Category.findOne({ where: { id: req.params.id } });
if (category === null) {
  console.log('Not found!');
} else {
  console.log(category instanceof Category); 
}
  // be sure to include its associated Products
  const assocProducts = await Product.findAll({
    where: {
      category_id: req.params.id
    }
  });
  let package = JSON.stringify(category)+ JSON.stringify(assocProducts)
  res.json(package)
});

router.post('/', async (req, res) => {
  // create a new category
  // how do I access the data input through insomnia/ how tf do i properly use insomnia
  const newCategory = await Category.create({ category_name: req.body.category_name });
  res.json(newCategory)
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const updatedCategory = await Category.update({ category_name: req.body.category_name }, {
    where: {
      id: req.params.id
    }
    
  });
  res.json(updatedCategory)
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  await Category.destroy({
    where: {
      id: req.params.id
    }
  });
  res.json('succesfully deleted' + Category.category_name)
});

module.exports = router;
