const mysql = require('mysql2')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


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


exports.registerUser = ( (req, res, next) => {
            con.query(
            `SELECT * FROM users WHERE LOWER(email) = LOWER(${con.escape(req.body.email)});`,
            (err, result) => {
              if (result.length) {
                res.status(409).send({
                message: 'This user is already in use!',
              });
            } else {
            // username is available
            bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
            return res.status(500).send({
            message: err
            });
            } else {
            // has hashed pw => add to database
            con.query(
            `INSERT INTO users (username, email, phone, password) VALUES ('${req.body.name}', ${con.escape(req.body.email)}, ${con.escape(req.body.phone)}, ${con.escape(hash)})`,
            (err, result) => {
            if (err) {
            throw err;
            return res.status(400).send({
            message: err
            });
            }
            const id =  result.insertId;
            return res.status(201).send({
            message: 'The user has been registerd with us!',
            id:id,
            });
            }
            );
            }
            });
            }
            }
            );

    })    
    
    exports.loginUser = ((req, res, next) => {
      con.query(
        `SELECT * FROM users WHERE email = ${con.escape(req.body.email)};`,
        (err, result) => {
        // user does not exists
        console.log(result)
        if (err) {
            throw err;
              return res.status(400).send({
              message: err
            });
          }
        if (!result.length) {
        return res.status(401).send({
        massage: 'Email or password is incorrect!'
        });
        }
        // check password
        bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
        // wrong password
        if (bErr) {
        throw bErr;
        return res.status(401).send({
        message: 'Email or password is incorrect!'
        });
        }
        if (bResult) {
        const token = jwt.sign({id:result[0].id},'the-super-strong-secrect',{ expiresIn: '5d' });
        con.query(
        `UPDATE users SET token = '${token}' WHERE id = '${result[0].id}'`
        );
        ; //we add secure: true, when using https.
        // con.query(
        //   `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
        //   );
        res.cookie('Token', token, { httpOnly: true, secure: true, SameSite: 'strict' , expires: new Date(Number(new Date()) + 30*60*1000) })
        // req.user = result[0]
        return res.status(200).send({
        message: 'Logged in!', 
        id: result[0].id,
        result
        });
        }
        return res.status(401).send({
        msg: 'Username or password is incorrect!'
        });
        });
        });
});

exports.logout = ((req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
exports.getUser = (req, res, next) => {
  const {theToken} = res.cookie
  console.log(theToken)
  const decoded = jwt.verify(theToken, 'the-super-strong-secrect');
  con.query('SELECT * FROM users where id=?', decoded.id, function (error, results, fields) {
  if (error) throw error;
  return res.send({ error: false, data: results[0], message: 'Fetch Successfully.' });
  });
  };


  exports.getUserDetails =  ((req, res, next) => {
    con.query("SELECT * FROM users WHERE id = ?",[req.params.id], (err, result)=>{
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


// Get all users(admin)
exports.getAllUser = ((req, res, next) => {
  con.query("SELECT * FROM users ", (err, result)=>{
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

exports.updateUserRole = ((req, res, next) => {
  con.query("UPDATE users set role = ? WHERE id = ?",[req.body.role, req.params.id], (err, result)=>{
    if(err)
    {
       return  res.status(400).json({
            success:false, 
            err
        })  
    }
    res.status(200).json({
        success:true,
        message:"Role updated" 
    })   
})     
});


exports.deleteUser = ((req, res, next) => {
  con.query("DELETE FROM users WHERE id = ?",[req.params.id], (err, result)=>{
    if(err)
    {
       return  res.status(400).json({
            success:false, 
            err
        })  
    }
    res.status(200).json({
        success:true,
        message: "User Deleted Successfully",     
    })   
})  
});


exports.createReview = ((req, res, next) => {
    
  const st = "INSERT INTO reviews (product_id , user_id , comment, rating) VALUES (?, ?, ?, ?)"    
  con.query(st, [req.body.product_id, req.body.user_id, req.body.comment, req.body.rating], (err, result)=>{
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
  
})
exports.getReview = ((req, res, next) => {
    
  const st = "SELECT * FROM reviews WHERE product_id = ? "    
  con.query(st, [req.params.product_id], (err, result)=>{
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
  
})
