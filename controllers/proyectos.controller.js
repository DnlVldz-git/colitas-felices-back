const db = require("../models");
const Proyecto = db.proyecto;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    
    if(!req.body.titulo && !req.body.texto && !req.body.imagenes && !req.body.dineroActual && !req.body.dineroMeta && !req.body.activo && !req.body.mostrarInicio){
        res.status(400).send({
            message: "El contenido no puede ser vacio"
        });
        return;
    }
    
    const proyecto = {
        titulo: req.body.titulo,
        texto: req.body.texto,
        imagenes: req.body.imagenes,        
        dineroActual: req.body.dineroActual,
        dineroMeta: req.body.dineroMeta,
        mostrarInicio: req.body.mostrarInicio,
        textoDetalle: req.body.textoDetalle,
        activo: req.body.activo,
        donadores: req.body.donadores,
        apoyos: req.body.apoyos
    };

    Proyecto.create(proyecto)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Ocurrio un error al registrar el proyecto"
            });
        });

};

exports.findAll = (req, res) => {
    const titulo = req.query.titulo;
    var condition = titulo ? { titulo: { [Op.iLike]: `%${titulo}%` } } : null;

    Proyecto.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrio un error al recuperar todos los proyectos"
        });
      });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Proyecto.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar proyecto con id = " + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Proyecto.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Proyecto se actualizo con exito."
                });
            } else{
                res.send({
                    message: `No se encontro al proyecti con id = ${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar proyecto con id = " + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Proyecto.destroy({
        where: { id: id }
    })
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Proyecto eliminado con exito!"
                });                
            } else{
                res.send({
                    message: `No se encontro al proyecto con id = ${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar al proyecto con id = " + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Proyecto.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Proyectos fueron eliminados con exito!` })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || ""
            });
        });
};

exports.findByActivo = (req, res) => {    
    Proyecto.findAll({where: {activo : true}}).then( data =>{        
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al recuperar los proyectos por activo."
            });
        });
};

exports.findByMostrarInicio = (req, res) => {    
    Proyecto.findAll({where: {mostrarInicio : true}}).then( data =>{        
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al recuperar los proyectos por mostrarInicio"
            });
        });
};
