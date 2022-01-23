const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
    const tags = await Tag.findAll({
      include:[
        Product, {
          model: Product,
          through: ProductTag
        }
      ]
    });
    
    res.json(tags)
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tags = await Tag.findByPk(req.params.id, {
    include:[
      Product, {
        model: Product,
        through: ProductTag
      }
    ]
  });
  
  res.json(tags)
});

router.post('/', async (req, res) => {
  // create a new tag
  const newTag = await Tag.create({tag_name: req.body.tag_name })
  res.json(newTag)
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const updateTag = await Tag.update({tag_name: req.body.tag_name},{ 
    where: {
      id: req.params.id
    }
    
    })
    res.json(updateTag)
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  await Tag.destroy({where:
  {
    id: req.params.id
  }})
  res.json('tag succesfully removed')
});

module.exports = router;
