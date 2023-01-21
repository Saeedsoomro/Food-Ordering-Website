
const jwt = require("jsonwebtoken");


exports.isAuthenticatedUser = ((req, res, next) => {
    
    if(
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
        ){
         res.status(422).json({
        message: "Please provide the token",
        });
        return next()
        }
        const theToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(theToken, 'the-super-strong-secrect');
        db.query('SELECT * FROM users where id=?', decoded.id, function (error, results, fields) {
        if (error) throw error;
        res.send({ error: false, data: results[0], message: 'Fetch Successfully.' });
        return next()
    });
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.json({
            message: `Role: ${req.user.role} is not allowed to access this resouce `
        })
      }
  
      next();
    };
  };