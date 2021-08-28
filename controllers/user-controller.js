const User = require("../models/User");
const Admin = require("../models/Admin");

const Booking = require("../models/Booking");
const Record = require("../models/Record");

exports.postRegister = (req, res, next) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.send({ successful: false, message: "Email repeated" });
    }
    var newUser = new User({
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      address: req.body.address,
      NIC: req.body.NIC,
      email: req.body.email,
      contactNo: req.body.contactNo,
      province: req.body.province,
      district: req.body.district,
    });

    newUser.setPassword(req.body.password);

    newUser
      .save()
      .then((result) => {
        return res.status(201).send({
          successful: true,
          message: "User added successfully.",
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).send({
          successful: false,
          message: "Failed to add user.",
        });
      });
  });
};

exports.postLogin = (req, res, next) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (user === null) {
      return res.status(400).send({
        successful: false,
        message: "User not found.",
      });
    } else {
      if (user.validPassword(req.body.password)) {
        return res.status(201).send({
          successful: true,
          message: "User Logged In",
          userId: user._id,
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

exports.postBooking = (req, res, next) => {
  Booking.find({
    hospital: req.body.hospital,
    date: req.body.date,
    time: req.body.time,
  }).then((result) => {
    if (result.length >= 100) {
      return res.send({
        successful: false,
        message:
          "Dear User, seems like the hospital you selected is  busy during that time. Please choose a different hospital or if you are available you can checkout another time slot.",
      });
    }

    const newBooking = new Booking({
      user: req.body.user,
      date: req.body.date,
      time: req.body.time,
      hospital: req.body.hospital,
      token: result.length,
    });

    newBooking
      .save()
      .then(() => {
        res.send({
          successful: true,
          message: "Booking successfully recorded!",
          token: result.length,
        });
      })
      .catch(console.log);
  });
};

exports.getBookings = (req, res, next) => {
  const userId = req.params.userId;
  Booking.find({ user: userId })
    .then((bookingArr) => {
      Record.find({ user: userId }).then((recordArr) => {
        res.send({
          bookings: bookingArr,
          records: recordArr,
        });
      });
    })
    .catch(console.log);
};

exports.getHospitals = (req, res, next) => {
  Admin.find({ verified: true })
    .then((result) => {
      res.send(
        result.map((i) => {
          return {
            id: i._id,
            name: i.portalName,
            address: i.address,
            price: i.price,
            date: i.dates
              .filter((item) => {
                return item.clicked === true;
              })
              .map((i) => i.date.toLowerCase()),
            time: i.time
              .filter((item) => {
                return item.clicked === true;
              })
              .map((i) => {
                return i.time;
              }),
          };
        })
      );
    })
    .catch();
};

exports.getProfile = (req, res, next) => {
  const userId = req.params.userId
  User.findById(userId).then(result => {
    Record.find({patient: userId}).then(records => {
      res.send({
        name: result.name,
        email: result.email,
        address: result.address,
        contactNo: result.contactNo,
        gender: result.gender,
        NIC: result.NIC,
        records: records
      })
    })
  })
}