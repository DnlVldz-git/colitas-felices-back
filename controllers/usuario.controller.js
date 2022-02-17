const db = require("../models");
const Usuario = db.usuario;
const Op = db.Sequelize.Op;

// Crear y guardar un nuevo usuario
exports.create = (req, res) => {
    // Validar request
    if(!req.body.nombre && !req.body.paterno && !req.body.materno && !req.body.correo && !req.body.password){
        res.status(400).send({
            message: "El contenido no puede ser vacio, nombre = " + req.body.nombre + " , " + 
            "apellido paterno = " + req.body.paterno + ", apellido materno = " + req.body.materno
            + ", correo = " + req.body.correo
        });
        return;
    }

    // Crear un usuario
    const usuario = {
        nombre: req.body.nombre,
        paterno: req.body.paterno,
        materno: req.body.materno,
        correo: req.body.correo,
        password: req.body.password,
        sesion: req.body.sesion,
        imagen: req.body.imagen,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        twitter: req.body.twitter,
        linkedin: req.body.linkedin,
        rol: req.body.rol
    };

    // Guardar Usuario en la base de datos
    Usuario.create(usuario)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Ocurrio un error al registrar el usuario."
            });
        });

};

// Recuperar todos los Usuarios de la base de datos
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Usuario.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrio un error al recuperar todos los usuarios."
        });
      });
};

// Encontrar Usuario por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Usuario.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar usuario con id = " + id
            });
        });
};

// Actualizar Usuario por id
exports.update = (req, res) => {
    const id = req.params.id;

    Usuario.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Usuario se actualizo con exito."
                });
            } else{
                res.send({
                    message: `No se encontro al usuario con id = ${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar usuario con id = " + id
            });
        });
};

// Eliminar un Usuario por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Usuario.destroy({
        where: { id: id }
    })
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Usuario eliminado con exito!"
                });
                //db.sequelize.query("ALTER SEQUENCE \"users_id_seq\" RESTART; UPDATE public.\"users\" SET id = DEFAULT;");
            } else{
                res.send({
                    message: `No se encontro el usuario con id = ${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar Usuario con id = " + id
            });
        });
};

// Eliminar todos los Usuarios de la base de datos
exports.deleteAll = (req, res) => {
    Usuario.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Usuarios fueron eliminados con exito!` })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || ""
            });
        });
};

// Encontrar todos los Usuarios por correo
exports.findByEmail= (req, res) => {
    const correo = req.params.correo;
    var condition = correo ? { correo: { [Op.eq]: `${correo}` } } : null;

    Usuario.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al recuperar usuarios por correo."
            });
        });
};

// Encontrar todos los Usuarios por correo
exports.findByRol= (req, res) => {
    const rol = req.params.rol;
    var condition = rol ? { rol: { [Op.eq]: `${rol}` } } : null;

    Usuario.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al recuperar usuarios por rol."
            });
        });
};