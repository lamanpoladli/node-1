const express = require('express');
const app = express();
const crypto = require('crypto')
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const dotenv = require ('dotenv')
dotenv.config();




app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())

const PORT = 8080;
app.use(cors());
const StudentSchema = new mongoose.Schema({
  name: String,
  surname: String,
  birhdate: Number,
  faculty: String,
  occupation: String,
  isMarriend: String,
  GPA: Number

});

//Artist Model
const StudentModel = mongoose.model('Students', StudentSchema);

//MONGO DATABASE CONNECTION
DB_CONNECTION = process.env.DB_CONNECTION
DB_PASSWORD = process.env.DB_PASSWORD
mongoose.connect(DB_CONNECTION.replace("<password>", DB_PASSWORD))
  .then(() => console.log("Mongo DB Connected!"))


// const students =[
    
//         {
//             "id": 1,
//             "name": "Aysel",
//             "surname": "Amrahova",
//             "birthdate":"04.11.2002",
//             "faculty":"CS",
//             "Occupation":"Doktor",
//             "IsMarried":false,
//             "GPA":88
//         },
//         {
//             "id": 2,
//             "name": "Laman",
//             "surname": "Poladli",
//             "birthdate":"05.05.2002",
//             "faculty":"CS",
//             "Occupation":"Doktor",
//             "IsMarried":false,
//             "GPA":88
//         },
//         {
//             "id": 3,
//             "name": "Nurlana",
//             "surname": "Hasanzada",
//             "birthdate":"12.03.2002",
//             "faculty":"CS",
//             "Occupation":"Doktor",
//             "IsMarried":false,
//             "GPA":88
//         }
        
    
// ]



//Get all  students

app.get('/students', async (req, res) => {
  // const page = parseInt(req.query.page)
  // const limit = parseInt(req.query.limit)
  // const startIndex = (page-1)* limit
  // const endIndex = page * limit
  // const results ={}
  // if(endIndex < students.length){
  //   results.next = {
  //     page: page +1,
  //     limit: limit
  //   }
  // }
  // if(startIndex > 0){
  //   results.previous = {
  //     page: page -1,
  //     limit: limit
  //   }
  // }
  // results.results = students.slice(startIndex,endIndex)
  // res.json(results)




  const { name } = req.query;
  const students = await StudentModel.find();
  if (name === undefined) {
    res.status(200).send({
      data: students,
      message: "data get success!",
    });
  } else {
    res.status(200).send({
      data: students.filter((x) => x.name.toLowerCase().trim().includes(name.toLowerCase().trim())),
      message: "data get success!",
    });
  }
    
  })

  //Get student by Id

  app.get('/students/:id', async (req, res) => {
    const id = req.params.id;
  const student = await StudentModel.findById(id);
  console.log('student found: ', student);
  if (!student) {
    res.status(204).send("student not found!");
  } else {
    res.status(200).send({
      data: student,
      message: "data get success!",
    });
  }
  })

  //Delete student

  app.delete('/students/:id', async (req, res) => {
    const id = req.params.id;
  const student = await StudentModel.findByIdAndDelete(id);
  if (student === undefined) {
    res.status(404).send("student not found");
  } else {
    res.status(203).send({
      data: student,
      message: "student deleted successfully",
    });
  }
  })
  
  //Create student

  app.post('/students', async (req, res) => {
    const { name, surname, birthdate, occupation, isMarriend, GPA } = req.body;
  const newStudent = new StudentModel({ 
    id: crypto.randomUUID(),
    name: name,
    surname: surname,
    birthdate: birthdate,
    occupation: occupation,
    isMarriend: isMarriend,
    GPA: GPA
  });
  await newStudent.save();
  res.status(201).send("created");
    
    
  })

  //Update student

app.put("/students/:id", (req, res) => {
  const id = req.params.id;
  const { name, surname, birthdate, occupation, isMarriend, GPA } = req.body;
  const existedStudent = STUDENTS.find((x) => x.id == id);
  if (existedStudent == undefined) {
    res.status(404).send("Student not found!");
  } else {
    if (name) {
      existedStudent.name = name;
    }
    if (surname) {
      existedStudent.surname = surname;
    }
    if (birthdate) {
      existedStudent.birthdate = birthdate;
    }
    if (occupation) {
      existedStudent.occupation = occupation;
    }
    if (isMarriend) {
      existedStudent.isMarriend = isMarriend;
    }
    if (GPA) {
      existedStudent.GPA = GPA;
    }

    res.status(200).send(`student: ${existedStudent.name}`);
  }
  });
  

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })