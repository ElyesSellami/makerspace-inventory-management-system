const express = require("express");
const router = express.Router();
const { sequelize, Project, ProjectEnrolment, User } = require("../models/index");


router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.findAll({
      attributes: [
        "name",
        "professorid",
        [sequelize.fn("COUNT", sequelize.col("ProjectEnrolment.userid")), 'numberOfStudents'],
      ],
      include: [
        {
          model: ProjectEnrolment,
          attributes: [],
        },
      ],
      group: ["Project.projectid", "Project.name", "Project.professorid"]
    });
    res.json(projects)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/projects/details', async(req, res) => {
    try {
        const projectid = req.body;
        const details = await User.findAll({
            attributes: ['firstName', 'lastName'],
            where: {
                userid: await ProjectEnrolment.findAll({
                    attributes: 'studentid',
                    where: {
                        projectid: projectid,
                    },
                })
            }
        });
        res.json(details)
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
})
