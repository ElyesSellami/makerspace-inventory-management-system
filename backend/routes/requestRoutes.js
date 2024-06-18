require("dotenv");
const express = require("express");
const router = express.Router();
const { sequelize, Project, Request, User, Part } = require("../models/index");
const { getUserInfo } = require("../middleware/storeInfo");

const fetchRequests = async (type) => {
  const requests = await Request.findAll({
    where: {
      decision: type,
    },
  });
  return requests;
};

//make request, available to everyone
router.post("/request", async (req, res) => {
  try {
    const { reqInfo } = req.body;
    await Request.create({
      partid: reqInfo.partid,
      requesterid: reqInfo.userid,
      projectid: reqInfo.projectid,
      requestDate: reqInfo.requestDate,
      loanDate: reqInfo.loanDate,
      returnDate: reqInfo.returnDate,
    });
    console.log("Request successfully registered!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//view all requests, accepted or otherwise, viewable by superusers/admin
router.get("/requests/all", async (req, res) => {
  const role = getUserInfo().accountType;
  if (role in ["superuser", "admin"]) {
    try {
      const requests = Request.findAll({
        order: [Request, "decision", "ASC"],
      });
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
});

//for different types, this can be used to see incoming requests, or to see only specific types of requests
router.get("/requests", async (req, res) => {
  try {
    const type = req.body;
    const requests = await fetchRequests(type);
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//for everyone to see their own past requests
router.get("requests/myrequests", async (req, res) => {
  try {
    const requests = await Request.findAll({
      attributes: [
        "requestid",
        User.findOne(
          { attributes: ["firstName", "lastName"] },
          { where: { userid: getUserInfo().userid } }
        ),
        User.findOne(
          { attributes: ["firstName", "lastName"] },
          { where: { userid: superuserid } }
        ),
        Project.findOne(
          { attributes: ["name"] },
          { where: { projectid: projectid } }
        ),
        'requestDate',
        'loanDate',
        'returnDate',
      ],
      where: {
        requesterid: userid,
      },
      include: [User, Project],
      order: [Request, 'requestDate', 'DESC']
    });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//for superuser/admin to manage incoming requests
router.patch("requests/update", async (req, res) => {
    try {
        const { requestid, superuser, decision } = req.body;
        await Request.update(
            {
            superuserid: superuser,
            decision: decision,
            },
            { where: { requestid: requestid } }
        );
        console.log('Request managed successfully!')
    } catch(error) {
        res.status(500).json({ error: error.message });
    }  
});

module.exports = router;