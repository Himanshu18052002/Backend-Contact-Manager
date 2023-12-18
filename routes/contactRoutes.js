const express = require("express");
const router = express.Router();
const { getContacts, getContactID, postContact, updateContact, deleteContact } = require("../controllers/contactControllers");
const validateToken = require("../middlewares/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getContacts).post(postContact);

router.route("/:id").get(getContactID).put(updateContact).delete(deleteContact);


module.exports = router;
