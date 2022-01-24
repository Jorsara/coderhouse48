const { logger } = require("../logs/logConfig");
const { Usuario } = require('../schemas/usuario');

const chat = async (req, res, next) => {
  const chat = true;
  try {
    res.render("./layouts/chat", {chat});
  } catch (err) {
    logger.error(err);
  }
};

const email = async ( req, res, next ) => {   
  try{    
    let chat = req.params.email;
    res.render("./layouts/chat", {chat});
  }
  catch(err){
    logger.error(err);
  }
};

module.exports.chat = chat;
module.exports.email = email;
