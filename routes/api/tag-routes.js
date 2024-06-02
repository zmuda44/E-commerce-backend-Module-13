const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

console.log(ProductTag.id)

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  const tagData = await Tag.findAll({
    include: [{ model: Product, through: ProductTag, as: 'products' }]
  });
  res.status(200).json(tagData);
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'products' }]
    });
    
    if(!tagData) {
      return res.status(404).json( { message: 'No tag found with this id!' } )
    }

    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
