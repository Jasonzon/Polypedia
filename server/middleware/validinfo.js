module.exports = function(req, res, next) {
  const { mail, name, password } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/register") {
    if (![mail, name, password].every(Boolean)) {
      return res.json("Missing Credentials");
    } else if (!validEmail(mail)) {
      return res.json({invalid:true});
    }
  } else if (req.path === "/login") {
    if (![mail, password].every(Boolean)) {
      return res.json("Missing Credentials");
    } else if (!validEmail(mail)) {
      return res.json("Invalid Email");
    }
  }

  next();
};