module.exports = app =>{
    const donador = require("../controllers/donador.controller.js");

    var router = require("express").Router();

    router.post("/", donador.create);

    router.get("/", donador.findAll);

    router.get("/pagados", donador.findAllPaid);

    router.get("/:id", donador.findOne);

    router.put("/:id", donador.update);

    router.delete("/:id", donador.delete);

    router.delete("/", donador.deleteAll);
    
    app.use('/mexico-amparame/donador', router);
}