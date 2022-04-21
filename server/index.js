const app = require("./app");
const PORT = process.env.PORT || 8080;

const init = async () => {
  try {
    //start listening (and create a 'server' object representing our server)
    app.listen(PORT, () =>
      console.log(`Mixing it up on port http://localhost:${PORT}`)
    );
  } catch(err) {
    console.log(err);
  }
};

init();
