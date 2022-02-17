const db = require("../models");
const Volunteer = db.voluntario;
const Op = db.Sequelize.Op;

// Crear y guardar un nuevo voluntario
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

    // Crear un voluntario
    const voluntario = {
        nombre: req.body.nombre,
        paterno: req.body.paterno,
        materno: req.body.materno,
        correo: req.body.correo,
        telefono: req.body.telefono,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        twitter: req.body.twitter,
        linkedin: req.body.linkedin,
        activo: req.body.activo,
        inicio: req.body.inicio,
        imagen: req.body.imagen
    };

    // Guardar voluntario en la base de datos
    Volunteer.create(voluntario)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Ocurrio un error al registrar al voluntario."
            });
        });

};

// Recuperar todos los voluntarios de la base de datos
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Volunteer.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrio un error al recuperar todos los voluntarios."
        });
      });
};

// Encontrar voluntario por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Volunteer.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar al voluntario con id = " + id
            });
        });
};

// Actualizar voluntario por id
exports.update = (req, res) => {
    const id = req.params.id;

    Volunteer.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Voluntario se actualizo con exito."
                });
            } else{
                res.send({
                    message: `No se encontro al voluntario con id = ${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar voluntario con id = " + id
            });
        });
};

// Eliminar un voluntario por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Volunteer.destroy({
        where: { id: id }
    })
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Voluntario eliminado con exito!"
                });
                //db.sequelize.query("ALTER SEQUENCE \"users_id_seq\" RESTART; UPDATE public.\"users\" SET id = DEFAULT;");
            } else{
                res.send({
                    message: `No se encontro al voluntario con id = ${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar al voluntario con id = " + id
            });
        });
};

// Eliminar todos los voluntarios de la base de datos
exports.deleteAll = (req, res) => {
    Volunteer.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Voluntarios fueron eliminados con exito!` })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || ""
            });
        });
};

// Encontrar todos los voluntarios por correo
exports.findByEmails= (req, res) => {
    const correo = req.params.correo;
    var condition = correo ? { correo: { [Op.eq]: correo } } : null;

    Volunteer.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al recuperar los voluntarios por correo."
            });
        });
};

// Recuperar todos los voluntarios activos
exports.findAllActive = (req, res) => {
    const activo = req.query.activo;
    var condition = activo ? { activo: { [Op.eq]: true } } : null;

    Volunteer.findAll( { where: { activo: { [Op.eq]: true } } })
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

// Recuperar todos los voluntarios habilitados en el inicio
exports.findAllHomePage = (req, res) => {
    const inicio = req.query.inicio;
    var condition = inicio ? { inicio: { [Op.eq]: true } } : null;

    Volunteer.findAll( { where: { inicio: { [Op.eq]: true } } })
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