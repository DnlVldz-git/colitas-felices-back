module.exports = app =>{
    const Apoyo = require("../controllers/apoyo.controller.js");
    var router = require("express").Router();

    //Crear un solicitud de apoyo
    router.post("/", Apoyo.create);

    //Obtener todos las solicitudes
    router.get("/", Apoyo.findAll);

    //Encontrar una solicitud por ID
    router.get("/:id", Apoyo.findOne);

    //Actualizar una solicitud por id
    router.put("/:id", Apoyo.update);

    //Eliminar una solicitud por id
    router.delete("/:id", Apoyo.delete);

    //Eliminar todos las solicitudes de la base de datos
    router.delete("/", Apoyo.deleteAll);
    
    app.use('/mexico-amparame/apoyos', router);
}