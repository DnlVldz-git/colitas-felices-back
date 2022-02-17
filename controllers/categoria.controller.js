const db = require("../models");
const Categoria = db.categoria;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    //validar request
    if (!req.body.categoria) {
        res.status(400).send({
            message: "Error"+ req.body.categoria
        });
        return;
    }
    
    const categoria = {
        Categoria: req.body.categoria
    };

    //Guardar la categoria en la BD
    Categoria.create(categoria)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error no se pudo guardar la categoria :("
            });
        });
};

//Obtener todos las categorias de la base de datos
exports.findAll = (req, res) => {
    const categoria = req.query.categoria;
    var condition = categoria ? { categoria: { [Op.iLike]: `%${categoria}%` } } : null;

    Categoria.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error no pudimos obtener las categoria :("
            });
        });
};

//Obtener una categoria por ID
exports.findOne = (req, res) => {
    const id = req.params.id;
    Categoria.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar la categoria " + id
            });
        });
};

//Actualizar los datos de a categoria por id
exports.update = (req, res) => {
    const id = req.params.id;

    Categoria.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La categoria se ah actualizado"
                });
            } else {
           	    res.send({
                    message: "Error al actualizar categoria " + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error de servidor 500"
            });
        });
};

//Eliminar un categoria por ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Categoria.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "categoria eliminada"
                });
            } else {
                res.send({
                    message: "Error al Eliminar categoria " + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error de servidor 500"
            });
        });
};

//Eliminar todos los categoria de la base de datos
exports.deleteAll = (req, res) => {
    Categoria.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: "Todas las categoria han sido eliminadas" });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar los categoria"
            });
        });
};