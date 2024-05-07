
module.exports.generateString = (length) =>{
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

module.exports.generateRandomNumber = (length) =>{
  const NumberCharater = '0123456789';
  let result = "";
  for(let i = 0; i < length; i++){
    result += NumberCharater.charAt(Math.floor(Math.random() * NumberCharater.length));
  }
  return result;
}