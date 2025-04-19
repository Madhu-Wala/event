let express = require("express");
let cors = require("cors");
let mysql2 = require("mysql2");

let app= express();
app.use(cors());
app.use(express.json());

// let con = mysql2.createConnection
// (
//     {
//         host: "localhost",
//         user:"root",
//         password:"Madhura#3005",
//         database:"mern"
//     }
// );

let con = mysql2.createConnection(
    {
        host: "sql12.freesqldatabase.com",
        user: "sql12774016",
        password:"6cJu5ShFbh",
        database:"sql12774016"
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
app.listen(9000,()=>{console.log("Express is Ready")});