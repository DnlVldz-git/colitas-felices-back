module.exports = app =>{
    const Solicitud = require("../controllers/solicitud.controller.js");
    var router = require("express").Router();

    //Crear un voluntario
    router.post("/", Solicitud.create);

    //Obtener todos los voluntarios
    router.get("/", Solicitud.findAll);

    //Encontrar un voluntario por ID
    router.get("/:id", Solicitud.findOne);

    //Actualizar un voluntario por id
    router.put("/:id", Solicitud.update);

    //Eliminar un voluntario por id
    router.delete("/:id", Solicitud.delete);

    //Eliminar todos los voluntarios de la base de datos
    router.delete("/", Solicitud.deleteAll);
    
    app.use('/mexico-amparame/solicitudes', router);
}