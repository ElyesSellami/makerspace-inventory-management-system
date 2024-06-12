const express = require("express");
const router = express.Router();
const { sequelize, Project, ProjectEnrolment, User, Part } = require("../models/index");


//available for everyone
router.get('/parts', async (req, res) => {
    try {
        const partsList = await Part.findAll({
            attributes: [
                'partid',
                'name', 
                'reference',
                sequelize.fn('COUNT', [
                    sequelize.col('Part.availability'),
                    {where: {
                        availability: 'available',
                    }}]
                ),
                sequelize.fn('COUNT', sequelize.col('Part.availability')),
                'price',
                'pictureurl',
                'quotationurl',
            ],
            group: 'reference'
        });
        res.json(partsList)
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

//more detailed view that doesn't group the parts, available for admin/superuser only
router.get('/parts/detailed', async (req, res) => {
    try {
        const partsList = await Part.findAll({
            attributes: [
                'partid',
                'name', 
                'reference',
                'projectid',
                'availability',
                'price',
                'pictureurl',
                'quotationurl',
            ],
            order: [Part, 'reference', 'ASC']
        });
        res.json(partsList)
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/parts/part', async (req, res) => {
    try {
        const id = req.body;
        const partDetails = await Part.findAll({
            attributes: [
                'partid',
                'name', 
                'reference',
                'projectid',
                'availability',
                'price',
                'pictureurl',
                'quotationurl',
            ],
            where: {
                partid: id,
            }
        });
        res.json(partDetails);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
})

//only available to admin
router.post('/parts/add', async (req, res) => {
    try {
        const { information } = req.body;
        await Part.create(
            {
                name: information.name,
                reference: information.reference,
                projectid: information.projectid,
                price: information.price,
                pictureurl:information.pictureurl,
                quotationurl: information.quotationurl,
            }
        )
        console.log('Part information successfully added!')
    } catch (error) {
        res.status(500).json( { error: error.message })
    }
})

//only available to admin
router.put('/parts/edit', async (req, res) => {
    try {
        const { information } = req.body;
        await Part.update(
            {
                name: information.name,
                reference: information.reference,
                projectid: information.projectid,
                availability: information.availability,
                price: information.price,
                pictureurl:information.pictureurl,
                quotationurl: information.quotationurl,
            },
            {
                where: { partid: information.partid }
            }
        )
        console.log('Part information successfully added!')
    } catch (error) {
        res.status(500).json( { error: error.message })
    }
})

//deleting parts in case needed, only usable by 
router.delete('/parts/delete', async (req, res) => {
    try {
      const idToDelete = req.body;
      await Part.destroy({
        where: {
            partid: idToDelete,
        },
      });
    } catch(error) {
      res.status(500).json({ error: error.message })
    }
  })