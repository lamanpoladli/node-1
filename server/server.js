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
const fakeData =[
    
        {
            "id": 1,
            "name": "defter",
            "price": 9
        },
        {
            "id": 2,
            "name": "qelem",
            "price": 2
        },
        {
            "id": 3,
            "name": "xetkes",
            "price": 3
        },
        {
            "id": 4,
            "name": "kitab",
            "price": 5
        },
        {
            "id": 5,
            "name": "yonan",
            "price": 3
        },
        {
            "id": 6,
            "name": "pozan",
            "price": 5
        }
    
]

if(fakeData.length==0){
    ID=1;
}
else{
    let maxID = fakeData.sort((a,b)=> b.id-a.id)[0].id
    ID = ++maxID;
}

app.get('/products', (req, res) => {

    if(fakeData.length===0){
        res.status(204).send('no content')
        return;
    }else{
        res.status(200).send(fakeData)
        return;
    }
    
  })

  app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const singleData = fakeData.find((data)=>data.id==id);
    if(singleData===undefined){
        res.status(404).send('data not found')
        return;
    }else{
        res.status(200).send(singleData)
        return;
    }
  })

  app.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    const data = fakeData.find((data)=>data.id==id);
    if(data===undefined){
        res.status(404).send('no such product found!')
        return;
    }
    else{
        const idx = fakeData.indexOf(data);
        fakeData.splice(idx,1)
        res.status(202).send('product deleted!')
    }
  })
  
  app.post('/products', (req, res) => {
    const newProduct = {
        id: ID,
        name:req.body.name,
        price:req.body.price
    }
    fakeData.push(newProduct);
    ID++;
    res.status(201).send("dat posted!")
    
    
  })

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })