const db = require("../models");
const TestimonioModel = db.testimonio;
const Op = db.Sequelize.Op;

// Crear y guardar una nueva solicitud
exports.create = (req, res) => {
    // Validar request
    if(!req.body.testimonio && !req.body.autor && !req.body.ocupacion && !req.body.imagen){
        res.status(400).send({
            message: "El contenido no puede ser vacio"
        });
        return;
    }    
    
    const testimonio = {
        testimonio: req.body.testimonio,
        autor: req.body.autor,
        ocupacion: req.body.ocupacion,
        imagenPerfil: req.body.imagenPerfil        
    };    
    
    TestimonioModel.create(testimonio)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Ocurrio un error al registrar el testimonio."
            });
        });

};

// Recuperar todos las solicitudes de la base de datos
exports.findAll = (req, res) => {
    const testimonio = req.query.testimonio;
    var condition = testimonio ? { testimonio: { [Op.iLike]: `%${testimonio}%` } } : null;

    TestimonioModel.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrio un error al recuperar todos los testimonios."
        });
      });
};

// Encontrar solicitud por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    TestimonioModel.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar el testimonio con id = " + id
            });
        });
};

// Actualizar solicitud por id
exports.update = (req, res) => {
    const id = req.params.id;

    TestimonioModel.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Testimonio se actualizo con exito."
                });
            } else{
                res.send({
                    message: `No se encontro el testimonio con id = ${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar testimonio con id = " + id
            });
        });
};

// Eliminar una solicitud por id
exports.delete = (req, res) => {
    const id = req.params.id;

    TestimonioModel.destroy({
        where: { id: id }
    }).then(num => {
            if(num == 1){
                res.send({
                    message: "Testimonio eliminado con exito!"
                });
                //db.sequelize.query("ALTER SEQUENCE \"users_id_seq\" RESTART; UPDATE public.\"users\" SET id = DEFAULT;");
            } else{
                res.send({
                    message: `No se encontro el testimonio de apoyo con id = ${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar el testimonio con id = " + id
            });
        });
};

// Eliminar todos las solicitudes de la base de datos
exports.deleteAll = (req, res) => {
    TestimonioModel.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Testimonios fueron eliminadas con exito!` })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || ""
            });
        });
};