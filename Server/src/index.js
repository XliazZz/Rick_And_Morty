const http = require("http");
const data = require("./utils/data");
const getCharById = require("./controllers/getCharById");


http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const { url } = req;
    const id = url.split("/").at(-1);

    if(url.includes("detail")){
        getCharById(res, id)
    }

})
.listen(3001, "localhost")