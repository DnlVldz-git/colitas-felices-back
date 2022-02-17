module.exports = app =>{
    const Programa = require("../controllers/programa.controller.js");
    var router = require("express").Router();

    //Crear un programa
    router.post("/", Programa.create);

    //Obtener todos los programas
    router.get("/", Programa.findAll);

    //Obtener todos los programas activos
    router.get("/activos", Programa.findAllActive);
    
    //Obtener todos los programas que se mostraran en el inicio
    router.get("/habilitados", Programa.findAllHomePage);

    //Encontrar un programa por ID
    router.get("/:id", Programa.findOne);

    //Actualizar un programa por id
    router.put("/:id", Programa.update);

    //Eliminar un programa por id
    router.delete("/:id", Programa.delete);

    //Eliminar todos los programas de la base de datos
    router.delete("/", Programa.deleteAll);
    
    
    app.use('/mexico-amparame/programas', router);
}