const mysql = require('mysql2')
const ApiFeatures = require("../utils/apiFeatures");
// config


const con = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'Realme5i+',
  database: 'foodstations'
})

con.connect((err)=>
{
  if(err)
  {
    return console.log('connection failed')
  };
  console.log('connection succesful');


  })
  

exports.getAllProduct = (req, res) =>{
        
        con.query("SELECT * FROM products", (err, result)=>{
        if(err)
        {
           return  res.status(400).json({
                success:false, 
                err
            })  
        }
        res.status(200).json({
            success:true,
            result 
        })  
    });

};

exports.createProduct = ((req, res, next) => {
 
    const st = "INSERT INTO products (name, price) VALUES (?, ?)"    
    con.query(st, [req.body.name, req.body.price])    
    res.status(200).json({
          success:true, 
        
      });
})



exports.updateProduct = (  (req, res, next) => {
    con.query("UPDATE products set name = ?, price = ? WHERE id = ?",[req.body.name, req.body.price, req.params.id], (err, result)=>{
        if(err)
        {
           return  res.status(400).json({
                success:false, 
                err
            })  
        }
        res.status(200).json({
            success:true,
            result 
        })   
    })     
  });
exports.deleteProduct = (  (req, res, next) => {
    con.query("DELETE FROM products WHERE id = ?",[req.params.id], (err, result)=>{
        if(err)
        {
           return  res.status(400).json({
                success:false, 
                err
            })  
        }
        res.status(200).json({
            success:true,
            result 
        })   
    })     
  });


// get product detail
exports.getProductDetails =  ((req, res, next) => {
    con.query("SELECT * FROM products WHERE id = ?",[req.params.id], (err, result)=>{
        if(err)
        {
           return  res.status(400).json({
                success:false, 
                err
            })  
        }
        res.status(200).json({
            success:true,
            result 
        })   
    })
  });



