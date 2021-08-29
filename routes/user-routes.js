const userController = require("../controllers/user-controller");
const router = require("express").Router();

router.post("/register", userController.postRegister);

router.post("/login", userController.postLogin);

router.post('/bookings/add', userController.postBooking)

router.get('/bookings/:userId', userController.getBookings)

router.get('/hospitals', userController.getHospitals)

router.post('/update', userController.updateProfile)

router.get('/analytics', userController.getAnalytics)

router.get('/:userId', userController.getProfile)


module.exports = router;
