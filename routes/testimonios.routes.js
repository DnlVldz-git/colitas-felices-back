module.exports = app =>{
    const Testimonio = require("../controllers/testimonio.controller.js");
    var router = require("express").Router();

    //Crear un solicitud de apoyo
    router.post("/", Testimonio.create);

    //Obtener todos las solicitudes
    router.get("/", Testimonio.findAll);

    //Encontrar una solicitud por ID
    router.get("/:id", Testimonio.findOne);

    //Actualizar una solicitud por id
    router.put("/:id", Testimonio.update);

    //Eliminar una solicitud por id
    router.delete("/:id", Testimonio.delete);

    //Eliminar todos las solicitudes de la base de datos
    router.delete("/", Testimonio.deleteAll);
    
    app.use('/mexico-amparame/testimonios', router);
}