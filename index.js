let express = require("express");
let cors = require("cors");
let mysql2 = require("mysql2");

const dotenv = require('dotenv');
dotenv.config();

let app= express();
app.use(cors());
app.use(express.json());

let con = mysql2.createConnection(
    {
        host: process.env.HOST,
        user:  process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    }
);
app.post("/save",(request,response)=>
{
    let{name,std,roll,marks} = request.body;
    let data = [name,std,roll,marks];
    let sql ="insert into students(name,std,roll,marks) values(?,?,?,?)";
    con.query(sql,data,(error,result)=>
    {
        if(error)
        {
            response.send(error);
        }
        else
        {
            response.send("Succssfull");
        }
    });
});
app.get("/get", (request, response) => {
    const sql = "SELECT * FROM students";
    con.query(sql, (error, results) => {
    if (error) {
    return response.status(500).send(error);
    }
    response.json(results);
    });
    });

app.delete("/delete/:id",(request,response)=>{
    let id=request.params.id;
    let sql="delete from students where id=?";
    con.query(sql,[id],(error,result)=>{
        if(error){
            return response.send(error);
        }
        else{
            response.send("successful");
        }
    })
})

const PORT = process.env.PORT || 9000;
app.listen(PORT,()=>{console.log("Express is Ready")});