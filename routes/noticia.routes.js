module.exports = app =>{
    const noticia = require("../controllers/noticia.controller.js");

    var router = require("express").Router();

    //Crear una noticia
    router.post("/", noticia.create);

    //Obtener todos los noticias
    router.get("/", noticia.findAll);

    //Obtener todas las noticias que tienen estatus activo
    router.get("/activos", noticia.findAllActive);
    
    //Encontrar un noticia por ID
    router.get("/:id", noticia.findOne);    

    

    //Actualizar un noticia por id
    router.put("/:id", noticia.update);

    //Eliminar un noticia por id
    router.delete("/:id", noticia.delete);

    //Eliminar todos los noticias de la base de datos
    router.delete("/", noticia.deleteAll);
    
    app.use('/mexico-amparame/noticias', router);
}