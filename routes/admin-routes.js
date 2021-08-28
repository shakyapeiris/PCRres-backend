const adminController = require("../controllers/admin-controller");
const router = require("express").Router();

router.post("/register", adminController.postRegister);

router.post("/login", adminController.postLogin);

router.get("/records/:hospitalId", adminController.getBookingsAndRecordings)

router.post("/add-record", adminController.postReport)

router.post('/update-record', adminController.updateReport)

module.exports = router;
