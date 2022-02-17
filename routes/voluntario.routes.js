module.exports = app =>{
    const Volunteer = require("../controllers/voluntario.controller.js");
    var router = require("express").Router();

    //Crear un voluntario
    router.post("/", Volunteer.create);

    //Obtener todos los voluntarios
    router.get("/", Volunteer.findAll);

    //Obtener todos los programas activos
    router.get("/activos", Volunteer.findAllActive);
    
    //Obtener todos los programas que se mostraran en el inicio
    router.get("/habilitados", Volunteer.findAllHomePage);

    //Encontrar un voluntario por ID
    router.get("/:id", Volunteer.findOne);

    //Actualizar un voluntario por id
    router.put("/:id", Volunteer.update);

    //Eliminar un voluntario por id
    router.delete("/:id", Volunteer.delete);

    //Eliminar todos los voluntarios de la base de datos
    router.delete("/", Volunteer.deleteAll);

    // Encontrar todos los voluntarios por correo
    router.get("/voluntario=:correo", Volunteer.findByEmails);
    
    app.use('/mexico-amparame/voluntarios', router);
}