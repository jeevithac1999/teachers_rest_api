const express = require("express");
const teachers = require("../models/teachers");
const teacherRouter = express.Router();
teacherRouter
  .get("/:id", (req, res) => {
    const teacher = teachers.find(teacher => {
      return teacher.id.toString() === req.params.id;
    });
    if (teacher) {
      res.status(200).send({ teach: teacher });
    } else {
      res.status(404).send( "Not found" );
    }
  })
  .post("/", (request, response) => {
    if (request.body.id && request.body.firstname) {
      teachers.push(request.body);
      response.status(200).json({ message: "New Teacher added to the list successfully" });
    } else {
      response.status(400).send( "Bad Request" );
    }
  })
  .patch("/:id", (req, res) => {
    let teacherIndex;
    const Teacher = teachers.find((teacher, index) => {
      teacherIndex = index;
      return teacher.id.toString() === req.params.id;
    });
    if (Teacher) {
      const {
        firstname = Teacher.firstname,
        lastname = Teacher.lastname,
        age = Teacher.age,
        gender = Teacher.gender,
        course1 = Teacher.courses.course1,
        course2 = Teacher.courses.course2
      } = req.body;
      teachers[teacherIndex] = {
        id: Teacher.id,
        firstname,
        lastname,
        age,
        gender,
        course1,
        course2
      };
      res.status(200).send({ message: "Teacher details were updated" });
    } else {
      res.status(400).send("Bad Request" );
    }
  })
  .delete("/:id", (req, res) => {
    let teacherIndex;
    const requiredTeacher = teachers.find((teacher, index) => {
      teacherIndex = index;
      return teacher.id.toString() === req.params.id;
    });
    if (requiredTeacher) {
      teachers.splice(teacherIndex, 1);
      res.status(200).send({ message: "Teacher was removed" });
    } else {
      res.status(400).send( "Bad request");
    }
  });

module.exports = teacherRouter;
