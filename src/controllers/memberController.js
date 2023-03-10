const memberService = require("../services/memberService");

const getAllMembers = (req, res) => {
    try {
        const allMembers = memberService.getAllMembers();
        res.send({
            status: "OK", data: allMembers
        });
    } catch (error) {
        res
           .status(error?.status || 500)
           .send({
              status: "FAILED",
              data: { error: error?.message || error }
           });
    }
};

const getOneMember = (req, res) => {
    const {
        params: { memberId },
    } = req;
    if (!memberId) {
        res
           .status(400)
           .send({
              status: "FAILED",
              data: { error:  "Parameter ':workoutId' can't be empty"},
           });
    }
    try {
        const member = memberService.getOneMember(memberId);
        res.send({
            status: "OK",
            data: member
        });
    } catch (error) {
        res
           .status(error?.status || 500)
           .send({
              status: "FAILED",
              data: { error: error?.message || error}
           });
    }
};

const createNewMember = (req, res) => {
    const { body } = req;
    if (
        !body.name ||
        !body.gender ||
        !body.dateOfBirth ||
        !body.email ||
        !body.password
    ) {
        res
           .status(400)
           .send({
              status: "FAILED",
              data: {
                error:
                  "One of the following keys is missing or is empty in request body: 'name', 'gender', 'dateOfBirth', 'email', 'password'",
              },
           });
           return;
    }
    const newMember = {
        name: body.name,
        gender: body.gender,
        dateOfBirth: body.dateOfBirth,
        email: body.email,
        password: body.password,
    }
    try {
        const createdMember = memberService.createNewMember(newMember);
        res
           .status(201)
           .send({
              status: "OK",
              data: createdMember
           });
    } catch (error) {
        res
           .status(error?.status || 500)
           .send({
              status: "FAILED",
              data: { error: error?.message || error }
           });
    }
};

const updateOneMember = (req, res) => {
    const {
        body,
        params: {memberId},
    } = req;
    if (!memberId) {
        res
           .status(400)
           .send({
              status: "FAILED",
              data: { error: "Parameter ':workoutId' can't be empty"},
           });
    }
    try {
        const updatedMember = memberService.updateOneMember(memberId);
        res
           .send({
              status: "OK",
              data: updatedMember
           });
    } catch (error) {
        res
           .status({
              status: "FAILED",
              data: { error: error?.message || error }
           });
    }
};

const deleteOneMember = (req, res) => {
    const {
        params: { memberId },
    } = req;
    if (!memberId) {
        res
           .status(400)
           .send({
              status: "FAILED",
              data: { error: "Parameter 'memberId' can't be empty"},
           });
    }
    try {
        const deletedMember = memberService.deleteOneMember(memberId);
        res
           .status(204)
           .send({
              status: "OK"
           });
    } catch (error) {
        res
           .status(error?.status || 500)
           .send({
              status: "FAILED",
              data: { error: error?.message || error }
           });
    }
};

module.exports = {
    getAllMembers,
    getOneMember,
    createNewMember,
    updateOneMember,
    deleteOneMember,
};