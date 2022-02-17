const db = require("../models");
const Noticia = db.noticia;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    //validar request
    if (!req.body.noticia) {
        res.status(400).send({
            message: "Error" + req.body.noticia
        });
        return;
    }

    const noticia = {
        noticia: req.body.noticia,
        textoPreview: req.body.textoPreview,
        textoNoticia: req.body.textoNoticia,
        linkImagen: req.body.linkImagen,
        autorId: req.body.autorId,
        autor: req.body.autor,
        autorImagen: req.body.autorImagen,
        estatus: req.body.estatus        
    };

    //Guardar la noticia en la BD
    Noticia.create(noticia)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error no se pudo guardar la noticia :("
            });
        });
};

//Obtener todos los noticias de la base de datos
exports.findAll = (req, res) => {
    const noticia = req.query.noticia;
    var condition = noticia ? { noticia: { [Op.iLike]: `%${noticia}%` } } : null;

    Noticia.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error no pudimos obtener las noticias :("
            });
        });
};

//Obtener un noticia por ID
exports.findOne = (req, res) => {
    const id = req.params.id;
    Noticia.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar la noticia " + id
            });
        });
};

//Actualizar los datos de un noticia por id
exports.update = (req, res) => {
    const id = req.params.id;

    Noticia.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La noticia se ah actualizado"
                });
            } else {
                res.send({
                    message: "Error al actualizar Noticia " + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error de servidor 500"
            });
        });
};

//Eliminar un noticia por ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Noticia.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Noticia eliminada"
                });
            } else {
                res.send({
                    message: "Error al Eliminar Noticia " + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error de servidor 500"
            });
        });
};

//Eliminar todos los noticias de la base de datos
exports.deleteAll = (req, res) => {
    Noticia.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: "Todas las noticias han sido eliminadas" });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar los noticias"
            });
        });
};

exports.findAllByCategoria = (req, res) => {
    const cateogiraid = req.params.id;
    Noticia.findAll({ where: { categoriaId: cateogiraid } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrio un error al recuperar esaa noticias"
            });
        });
};

// Recuperar todos las noticias activos
exports.findAllActive = (req, res) => {

    Noticia.findAll({ where: { estatus: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al recuperar todos los programas."
            });
        });
};