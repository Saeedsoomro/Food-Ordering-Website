const mysql = require('mysql2')
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

exports.Shipping = ((req, res, next) => {

    const st = "INSERT INTO shippings (address, city, state, phone) VALUES (?, ?, ?, ?)"    
    con.query(st, [req.body.address, req.body.city, req.body.state, req.body.phone])    
    res.status(200).json({
          success:true, 
        
      });
})
exports.Payment = ((req, res, next) => {
    const st = "INSERT INTO payments (payment_type, amount, account_no, date, user_id) VALUES (?, ?, ?, ?, ?)"    
    con.query(st, [req.body.paymentType, req.body.amount, req.body.accountNo, new Date(Date.now()), req.body.user_id ])    
    res.status(200).json({
          success:true, 
        
      });
})
exports.Order = ((req, res, next) => {
    const st = "INSERT INTO orders (user_id, product_id, product_name, amount, date) VALUES (?, ?, ?, ?, ?)"    
    con.query(st, [req.body.userId, req.body.productId, req.body.productName, req.body.amount, new Date(Date.now()) ])    
    res.status(200).json({
          success:true, 
        
      });
})