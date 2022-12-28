const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllMembers = () => {
    try {
        return DB.members;
    } catch (error) {
        throw {
            status: 500,
            message: error
        };
    }
};

const getOneMember = (memberId) => {
    try {
        const member = DB.members.find((member) => member.id === memberId);
        if (!member) {
            throw {
                status: 400,
                message: `Can't find member with the id '${memberId}'`
            };
        }
        return member;
    } catch (error) {
        throw {
            status: error?.status || 500, message: error?.message || error 
        };
    }
};

const createNewMember = (newMember) => {
    try {
        const isAlreadyAdded =
          DB.members.findIndex((member) => member.name == newMember) > -1;
          if (isAlreadyAdded) {
            throw {
                status: 400,
                message: `Member with the name '${newMember.name}' already exists`,
            };
          }
          DB.members.push(newMember);
          saveToDatabase(DB);
          return newMember;
    } catch (error) {
        throw {
            status: 500,
            message: error?.message || error
        };
    }
};

const updateOneMember = (memberId, changes) => {
    try {
        const isAlreadyAdded =
          DB.members.findIndex((member) => member.name === changes.name) > -1;
        if (isAlreadyAdded) {
            throw {
                status: 400,
                message: `Member with the name '${changes.name}' already exists`
            };
        }
        const indexForUpdate = DB.members.findIndex(
            (member) => member.id === memberId
        );
        if (indexForUpdate === -1) {
            throw {
                status: 400,
                message: `Can't find memeber with the id '${memberId}'`,
            };
        }
        const updatedMember = {
            ...DB.members[indexForUpdate],
            ...changes,
            updatedAt: new Date().toLocaleDateString("en-US", {timeZone: "UTC"}),
        };
        DB.members[indexForUpdate] = updatedMember;
        saveToDatabase(DB);
        return updatedMember;
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        };
    }
};

const deleteOneMember = (memberId) => {
    try {
        const indexForDeletion = DB.members.findIndex(
            (member) => member.id === memberId
        );
        if (indexForDeletion === -1) {
            throw {
                status: 400,
                message: `Can't find member with the id '${memberId}'`,
            };
        }
        DB.members.splice(indexForDeletion, 1);
        saveToDatabase(DB);
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        };
    }
};

module.exports = {
    getAllMembers,
    createNewMember,
    getOneMember,
    updateOneMember,
    deleteOneMember,
}