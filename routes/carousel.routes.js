module.exports = app =>{
    const carousel = require("../controllers/carousel.controller.js");

    var router = require("express").Router();

    //Crea
    router.post("/", carousel.create);

    router.get("/activos/", carousel.findTodo);

    //Obtener todos los carousel
    router.get("/", carousel.findAll);

    //Encontrar un carousel por ID
    router.get("/:id", carousel.findOne);

    //Obtener todos los carousel activos

    //Actualiza
    router.put("/:id", carousel.update);

    //Eliminar por id
    router.delete("/:id", carousel.delete);

    //Eliminar todos 
    router.delete("/", carousel.deleteAll);
    
    app.use('/mexico-amparame/carousel', router);
}