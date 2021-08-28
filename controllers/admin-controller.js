const { populate } = require("../models/Admin");
const Admin = require("../models/Admin");
const Booking = require("../models/Booking");
const Record = require("../models/Record");

exports.postRegister = (req, res, next) => {
  Admin.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.send({ successful: false, message: "Email repeated" });
    }
    var newUser = new Admin({
      portalName: req.body.name,
      email: req.body.email,
      address: req.body.address,
      contactNo: req.body.contactNo,
      dates: req.body.dates,
      time: req.body.times,
      price: req.body.price,
    });

    newUser.setPassword(req.body.password);

    newUser
      .save()
      .then((result) => {
        return res.status(201).send({
          successful: true,
          message: "Admin added successfully.",
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).send({
          successful: false,
          message: "Failed to add admin.",
        });
      });
  });
};

exports.postLogin = (req, res, next) => {
  Admin.findOne({ email: req.body.email }, function (err, user) {
    if (user === null) {
      return res.status(400).send({
        successful: false,
        message: "User not found.",
      });
    } else {
      if (user.validPassword(req.body.password)) {
        return res.status(201).send({
          message: user.verified
            ? "User Logged In"
            : "You must have a verified account to continue",
          verified: user.verified,
          userId: user.verified ? user._id : null,
        });
      } else {
        return res.status(400).send({
          successful: false,
          message: "Wrong Password",
        });
      }
    }
  });
};

exports.getBookingsAndRecordings = (req, res, next) => {
  const hospitalId = req.params.hospitalId;
  Booking.find({ hospital: hospitalId }).populate('user')
    .then((bookingArr) => {
      Record.find({ hospital: hospitalId, pending: true }).populate('patient').then((recordArr) => {
        res.send({
          bookings: bookingArr,
          records: recordArr,
        });
      });
    })
    .catch(console.log);
};

exports.verifyAdmin = (req, res, next) => {
  const admin = req.params.adminId;
  Admin.findById(admin)
    .then((user) => {
      if (user && user.verified) return res.send({ validated: true });
      res.send({ validated: false });
    })
    .catch((err) => {
      res.send({ validated: false });
    });
};

exports.postReport = (req, res, next) => {
  const bookingId = req.body.Id;
  const hospitalId = req.body.hospitalId;
  const userId = req.body.userId;

  const newRecord = new Record({
    patient: userId,
    hospital: hospitalId,
    testId: bookingId
  });
  newRecord.save().then(() => {
    Booking.deleteOne({ _id: bookingId }).then(() => {
      res.send({
        successful: true,
        message: "Record added successfully!",
      });
    });
  }).catch(console.log);
};

exports.updateReport = (req, res, next) => {
  const recordId = req.body.recordId;
  const status = req.body.status

  Record.findById(recordId).then(result => {
    result.result = status;
    result.pending = false;

    result.save().then(() => {
      res.send({
        successful: true,
        message: "Record updated successfully"
      })
    })
  })
}
