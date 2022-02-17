module.exports = app =>{
    const Proyecto = require("../controllers/proyectos.controller.js");
    var router = require("express").Router();

    //Crear un proyecto
    router.post("/", Proyecto.create);

    router.get("/activo/", Proyecto.findByActivo);

    router.get("/inicio/", Proyecto.findByMostrarInicio);

    //Obtener todos los proyectos
    router.get("/", Proyecto.findAll);

    //Encontrar un proyecto por ID
    router.get("/:id", Proyecto.findOne);

    //Actualizar un proyecto por id
    router.put("/:id", Proyecto.update);

    //Eliminar un proyecto por id
    router.delete("/:id", Proyecto.delete);

    //Eliminar todos los proyectos de la base de datos
    router.delete("/", Proyecto.deleteAll);

    
    
    app.use('/mexico-amparame/proyectos', router);
}