const app = require("./app");
const { checkerDicks } = require("./checkDicks");
const PORT = process.env.PORT || 8080;
const { targetChecker } = require("./targetCheck")

//Fn: timeout func for calls
const timeOut = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
};

const init = async () => {
  try {
    //start listening (and create a 'server' object representing our server)
    app.listen(PORT, () =>
      console.log(`Mixing it up on port http://localhost:${PORT}`)
    );
    // while (true) {
    //   console.log('Stock Checker System Initiated.....')
    //   await targetChecker('https://www.target.com/p/stanley-adventure-40oz-stainless-steel-quencher-tumbler/-/A-84086723?preselect=84083458#lnk=sametab', 'Petal-Pink Stanley 40oz Tumbler') //petel-pink-tumbler
    //   await targetChecker('https://www.target.com/p/stanley-adventure-40oz-stainless-steel-quencher-tumbler/-/A-84086723?preselect=84083455#lnk=sametab', 'White Stanley 40oz Tumbler') //white-tumbler
    //   await timeOut(60000) //trigger checker funcs every minute
    // }
    await checkerDicks('Pink-Stanley-40oz', 23386052,'https://www.dickssportinggoods.com/p/stanley-40-ozadventure-quencher-tumbler-22stau40zstnlyqnchyda/22stau40zstnlyqnchyda?enteredSearchTerm=stanley%2040');
  } catch(err) {
    console.log(err);
  }
};

init();
