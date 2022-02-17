const db = require("../models");
const Programa = db.programa;
const Op = db.Sequelize.Op;

// Crear y guardar un nuevo programa
exports.create = (req, res) => {
    // Validar request
    if(!req.body.titulo && !req.body.subtitulo && !req.body.descripcion){
        res.status(400).send({
            message: "El contenido no puede ser vacio, titulo = " + req.body.titulo + " , " + 
            "subtitulo = " + req.body.subtitulo + ", descripcion = " + req.body.descripcion
        });
        return;
    }

    // Crear un programa
    const programa = {
        titulo: req.body.titulo,
        subtitulo: req.body.subtitulo,
        descripcion: req.body.descripcion,
        activo: req.body.activo,
        inicio: req.body.inicio,
        imagenes: req.body.imagenes,
        icono: req.body.icono,
        colorIcono: req.body.colorIcono
    };

    // Guardar programa en la base de datos
    Programa.create(programa)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Ocurrio un error al registrar el programa."
            });
        });

};

// Recuperar todos los programas de la base de datos
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Programa.findAll({ where: condition })
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

// Encontrar programa por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Programa.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar al programa con id = " + id
            });
        });
};

// Actualizar programa por id
exports.update = (req, res) => {
    const id = req.params.id;

    Programa.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Programa se actualizo con exito."
                });
            } else{
                res.send({
                    message: `No se encontro al programa con id = ${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar programa con id = " + id
            });
        });
};

// Eliminar un programa por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Programa.destroy({
        where: { id: id }
    })
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Programa eliminado con exito!"
                });
                //db.sequelize.query("ALTER SEQUENCE \"users_id_seq\" RESTART; UPDATE public.\"users\" SET id = DEFAULT;");
            } else{
                res.send({
                    message: `No se encontro al programa con id = ${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar al programa con id = " + id
            });
        });
};

// Eliminar todos los programas de la base de datos
exports.deleteAll = (req, res) => {
    Programa.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Programas fueron eliminados con exito!` })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || ""
            });
        });
};

// Recuperar todos los programas activos
exports.findAllActive = (req, res) => {
    const activo = req.query.activo;
    var condition = activo ? { activo: { [Op.eq]: true } } : null;

    Programa.findAll( { where: { activo: { [Op.eq]: true } } })
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

// Recuperar todos los programas habilitados en el inicio
exports.findAllHomePage = (req, res) => {
    const inicio = req.query.inicio;
    var condition = inicio ? { inicio: { [Op.eq]: true } } : null;

    Programa.findAll( { where: { inicio: { [Op.eq]: true } } })
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