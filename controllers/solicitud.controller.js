const db = require("../models");
const Solicitud = db.solicitud;
const Op = db.Sequelize.Op;

// Crear y guardar una nueva solicitud
exports.create = (req, res) => {
    // Validar request
    if(!req.body.nombre && !req.body.paterno && !req.body.materno && !req.body.correo && !req.body.telefono){
        res.status(400).send({
            message: "El contenido no puede ser vacio, nombre = " + req.body.nombre + " , " + 
            "apellido paterno = " + req.body.paterno + ", apellido materno = " + req.body.materno
            + ", correo = " + req.body.correo
        });
        return;
    }

    // Crear una solicitud
    const solicitud = {
        nombre: req.body.nombre,
        paterno: req.body.paterno,
        materno: req.body.materno,
        correo: req.body.correo,
        telefono: req.body.telefono,
        motivo: req.body.motivo
    };

    // Guardar solicitud en la base de datos
    Solicitud.create(solicitud)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Ocurrio un error al registrar la solicitud."
            });
        });

};

// Recuperar todos las solicitudes de la base de datos
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Solicitud.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrio un error al recuperar todos las solicitud."
        });
      });
};

// Encontrar solicitud por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Solicitud.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar la solicitud con id = " + id
            });
        });
};

// Actualizar solicitud por id
exports.update = (req, res) => {
    const id = req.params.id;

    Solicitud.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Solicitud se actualizo con exito."
                });
            } else{
                res.send({
                    message: `No se encontro la solicitud con id = ${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar solicitud con id = " + id
            });
        });
};

// Eliminar una solicitud por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Solicitud.destroy({
        where: { id: id }
    })
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Solicitud eliminada con exito!"
                });
                //db.sequelize.query("ALTER SEQUENCE \"users_id_seq\" RESTART; UPDATE public.\"users\" SET id = DEFAULT;");
            } else{
                res.send({
                    message: `No se encontro la solicitud con id = ${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar la solicitud con id = " + id
            });
        });
};

// Eliminar todos las solicitudes de la base de datos
exports.deleteAll = (req, res) => {
    Solicitud.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Solicitudes fueron eliminadas con exito!` })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || ""
            });
        });
};