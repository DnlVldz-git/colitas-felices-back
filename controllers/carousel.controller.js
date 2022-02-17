const db = require("../models");
const Carousel = db.carousel;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    //validar request
    if (!req.body.titulo && !req.body.subtitulo) {
        res.status(400).send({
            message: "Error"
        });
        return;
    }

    const carousel = {
        titulo: req.body.titulo,
        subtitulo: req.body.subtitulo,
        linkImagen: req.body.linkImagen,
        estatus: req.body.estatus,
        //texto: req.body.texto
    };

    //Guardar en la BD
    Carousel.create(carousel)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error no se guardo correctamente"
            });
        });
};

exports.findAll = (req, res) => {
    //const titulo = req.query.titulo;
    //var condition = titulo ? { titulo: { [Op.iLike]: `%${titulo}%` } } : null;
    //{ where: condition }
    Carousel.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al recuperar todos los Datos"
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Carousel.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar  " + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Carousel.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Actualizacion Correcta"
                });
            } else {
                res.send({
                    message: "Error al actualizar Datos de id No." + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error de servidor 500"
            });
        });
};


//Eliminar por ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Carousel.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Eleminado correctamente"
                });
            } else {
                res.send({
                    message: "Error al Eliminarn" + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error de servidor 500"
            });
        });
};

//Eliminar todos los datos de la base de datos
exports.deleteAll = (req, res) => {
    Carousel.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: "Todas las Datos han sido eliminadas" });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar"
            });
        });
};


exports.findTodo = (req,res) =>{
    //var condition = {estatus: {[Op.eq]: true}};    
    Carousel.findAll({where: {estatus : true}})
    .then(data =>{
        res.send(data);
    })
    .catch(err =>{
        res.status(500).send({
            message:
                err.message || "Ocurrio un problema al recuperar sus datos"
        })
    })
}