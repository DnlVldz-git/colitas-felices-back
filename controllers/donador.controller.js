const db = require("../models");
const Donacion = db.Donaciones;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    let data = {
        nombreDonador: req.body.donador,
        cantidad: req.body.cantidad,
        causaID: req.body.causaID,
        causa: req.body.causa,
        idPaypal: req.body.idPaypal,
        pagado: false,
        apellidos: req.body.apellidos,
        email: req.body.email,
        mensaje: req.body.mensaje,
        numeroTelefonico: req.body.numeroTelefonico
    }
    Donacion.create(data)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error no se pudo guardar la donacion"
            });
        });
}

exports.findAll = (req, res) => {
    const nombreDonador = req.query.nombreDonador;
    var condition = nombreDonador ? { nombreDonador: { [Op.iLike]: `%${nombreDonador}%` } } : null;
    console.log(nombreDonador);
    Donacion.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al recuperar todos los donadores."
            });
        });
};

exports.findAllPaid = (req, res) => {
    Donacion.findAll({ where: { pagado: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:
                err.message || `Ocurrio un eeror al recuperar los donadores que si pagaron`
            })
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    Donacion.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar el donador con id = " + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Donacion.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Donacion se actualizo con exito."
                });
            } else {
                res.send({
                    message: `No se encontro la Donacion con id = ${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar Donacion con id = " + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Donacion.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Donacion eliminado con exito!"
                });
                //db.sequelize.query("ALTER SEQUENCE \"users_id_seq\" RESTART; UPDATE public.\"users\" SET id = DEFAULT;");
            } else {
                res.send({
                    message: `No se encontro la Donacion con id = ${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar la Donacion con id = " + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Donacion.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Donaciones fueron eliminados con exito!` })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || ""
            });
        });
};
