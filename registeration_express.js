const express = require("express");
const app = express();

app.use(express.json());

// // Home
// app.get("/", (req, res) => {
//     res.send("Home Page");
// });

// // Registration array
// const registrations = [];

// // Registration API
// app.post("/register", (req, res) => {
//     const data = req.body;

//     registrations.push({
//         name: data.name,
//         email: data.email,
//         password: data.password,
//         branch: data.branch
//     });

//     res.send({
//         message: "Registration Successful",
//         data: registrations
//     });
// });

// // View all registrations
// app.get("/register", (req, res) => {
//     res.send(registrations);
// });






// registration page 
const credentials=[
    {email:"aman@gmail.com",password:"234"},
    {email:"shreyal@gmail.com",password:"123"},
    {email:"pragati@gmail.com",password:"456"}
];

app.post("/auth/register",async(req,res)=>{
    const data=req.body;
    // pasword should be contain atleast uppercase , lowercase , and special character number using regex
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
    if (!passwordRegex.test(data.password)) {
        return res.status(400).send("Invalid password format");
    }
    credentials.push(data);
    res.send("registration successful");
});

// login page 


app.post("/auth/login",async(req,res)=>{
    const {email,password}=req.body;
    const user=credentials.find(
        (cred)=>cred.email ==email && cred.password==password
);
console.log(user);

    if(user){
        res.send({message:"login successfully",user});

    }
    else{
        res.send("invalid credential");
    }


})



app.listen(8000, () => {
    console.log("Server started on port 8000");
});