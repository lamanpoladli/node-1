const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
const PORT = 8080;
let ID = undefined;
const students =[
    
        {
            "id": 1,
            "name": "Aysel",
            "surname": "Amrahova",
            "birthdate":"04.11.2002",
            "faculty":"CS",
            "Occupation":"Doktor",
            "IsMarried":false,
            "GPA":88
        },
        {
            "id": 2,
            "name": "Laman",
            "surname": "Poladli",
            "birthdate":"05.05.2002",
            "faculty":"CS",
            "Occupation":"Doktor",
            "IsMarried":false,
            "GPA":88
        },
        {
            "id": 3,
            "name": "Nurlana",
            "surname": "Hasanzada",
            "birthdate":"12.03.2002",
            "faculty":"CS",
            "Occupation":"Doktor",
            "IsMarried":false,
            "GPA":88
        }
        
    
]

if(students.length==0){
    ID=1;
}
else{
    let maxID = students.sort((a,b)=> b.id-a.id)[0].id
    ID = ++maxID;
}

//Get students

app.get('/students', (req, res) => {

  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const startIndex = (page-1)* limit
  const endIndex = page * limit
  const results ={}
  if(endIndex < students.length){
    results.next = {
      page: page +1,
      limit: limit
    }
  }
  if(startIndex > 0){
    results.previous = {
      page: page -1,
      limit: limit
    }
  }
  
  results.results = students.slice(startIndex,endIndex)
  res.json(results)
    if(students.length===0){

        res.status(204).send('no content')
        return;
    }else{
        res.status(200).send(students)
        return;
    }
    
  })

  //Get student by Id

  app.get('/students/:id', (req, res) => {
    const id = req.params.id;
    const singleData = students.find((data)=>data.id==id);
    if(singleData===undefined){
        res.status(404).send('data not found')
        return;
    }else{
        res.status(200).send(singleData)
        return;
    }
  })

  //Delete student

  app.delete('/students/:id', (req, res) => {
    const id = req.params.id;
    const data = students.find((data)=>data.id==id);
    if(data===undefined){
        res.status(404).send('no such product found!')
        return;
    }
    else{
        const idx = students.indexOf(data);
        students.splice(idx,1)
        res.status(202).send('product deleted!')
    }
  })
  
  //Create student

  app.post('/students', (req, res) => {
    const newStudent = {
        id: ID,
        name:req.body.name,
        surname:req.body.surname,
        birthdate:req.body.birthdate,
        faculty:req.body.faculty,
        Occupation:req.body.Occupation,
        IsMarried:req.body.IsMarried,
        GPA:req.body.GPA
    }
    students.push(newStudent);
    ID++;
    res.status(201).send("data posted!")
    
    
  })

  //Update student

app.put("/students/:id", (req, res) => {
    const id = req.params.id;
    const { name, surname, birthdate,faculty, Occupation, IsMarried, GPA } = req.body;
    const existedStudent = students.find((x) => x.id == id);
    if (existedStudent == undefined) {
      res.status(404).send("student not found!");
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
      if (faculty) {
        existedStudent.faculty = faculty;
      }
      if (Occupation) {
        existedStudent.Occupation = Occupation;
      }
      if (IsMarried) {
        existedStudent.IsMarried = IsMarried;
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