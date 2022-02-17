module.exports = app =>{
    const categoria = require("../controllers/categoria.controller.js");

    var router = require("express").Router();

    //Crear una categoria
    router.post("/", categoria.create);

    //Obtener todos los categoria
    router.get("/", categoria.findAll);

    //Encontrar un categoria por ID
    router.get("/:id", categoria.findOne);

    //Actualizar un categoria por id
    router.put("/:id", categoria.update);

    //Eliminar un categoria por id
    router.delete("/:id", categoria.delete);

    //Eliminar todos los categoria de la base de datos
    router.delete("/", categoria.deleteAll);
    
    app.use('/mexico-amparame/categoria', router);
}