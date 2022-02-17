module.exports = app => {
    const users = require("../controllers/usuario.controller.js");
    var router = require("express").Router();

    // Crear un nuevo Usuario
    router.post("/", users.create);

    // Recuperar todos los Usuarios
    router.get("/", users.findAll);

    // Encontrar todos los Usuarios por correo
    router.get("/correo=:correo", users.findByEmail);

    // Encontrar todos los Usuarios por rol
    router.get("/rol=:correo", users.findByRol);

    // Encontrar Usuario por id
    router.get("/:id", users.findOne);

    // Actualizar Usuario por id
    router.put("/:id", users.update);

    // Eliminar un Usuario por id
    router.delete("/:id", users.delete);

    // Eliminar todos los Usuarios de la base de datos
    router.delete("/", users.deleteAll);

   // app.use('/api/usuarios', router)
   app.use('/mexico-amparame/usuarios', router);

};