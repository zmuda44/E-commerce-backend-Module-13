const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

console.log(ProductTag.id)

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  const tagData = await Tag.findAll({
    include: [{ model: Product, through: ProductTag, as: 'productIds' }]
  });
  res.status(200).json(tagData);
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'productIds' }]
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

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create({
    tag_name: req.body.tag_name,
  });
    res.status(200).json(TagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: {
        id: req.params.id,
        },
      },
    )
    if (!categoryData) {
      return res.status(404).json({ message: 'No tag found with this id!' });
    }

    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
    console.log("delete")
  try {
    const tagData = await Tag.destroy({
        where: {
          id: req.params.id
        }
    });
  
    if (!categoryData) {
      return res.status(404).json({ message: 'No tag found with this id!' });
    }
  
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
