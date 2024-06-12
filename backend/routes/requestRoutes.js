const express = require("express");
const router = express.Router();
const { sequelize, Project, Request, User, Part } = require("../models/index");

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
  try {
    const requests = Request.findAll({
      order: [Request, "decision", "ASC"],
    });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    const userid = req.body;
    const requests = await Request.findAll({
      where: {
        requesterid: userid,
      },
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
