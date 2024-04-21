const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");
const UsersModel = require("./models/Users");

const app = express();
app.use(express.json());
app.use(cors());

// mongoose.connect("mongodb://127.0.0.1:27017/employee");
mongoose.connect('mongodb://127.0.0.1:27017/twc-test')
.then(() => {
  console.log("MongoDB connected");
})
.catch((err) => console.log(err));

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  EmployeeModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      }else {
        res.json({ error: "Password is incorrect. Please try again" });
      }
    } else {
      res.json({ error: "Invalid user. Please register" });
    }
  });
});

// app.post("/register", (req, res) => {
//   EmployeeModel.create(req.body)
//     .then((employees) => res.json(employees))
//     .catch((err) => res.json(err));
// });

app.post("/register", (req, res) => {
  const { email, password } = req.body;

  EmployeeModel.findOne({ email: email }).then((user) => {
    if (user) {
      res.json({ error: "User already registered. Please login" });
    } else {
      EmployeeModel.create(req.body)
        .then((newUser) => res.json(newUser))
        .catch((err) => res.status(500).json({ error: "An error occurred while registering the user" }));
    }
  });
});

app.get("/contacts", (req, res) => {
  UsersModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
})

app.post("/createUsers", (req, res) => {
  UsersModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
})


app.get('/editUser/:id', (req, res) => {
  const id = req.params.id
  UsersModel.findById({_id: id})
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
})

app.put('/editUser/:id', (req, res) => {
  const id = req.params.id
  UsersModel.findByIdAndUpdate({_id: id}, req.body)
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => res.json(err));
})


app.delete('/deleteUser/:id', (req, res) => {
  const id = req.params.id
  UsersModel.findByIdAndDelete({_id: id})
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
