const categoria = require('./categoria.model');

module.exports = (sequelize, Sequelize) => {
    const Noticia = sequelize.define("noticia", {
        noticia: {
            type: Sequelize.STRING
        },
        textoPreview: {
            type: Sequelize.STRING
        },
        textoNoticia: {
            type: Sequelize.STRING(1000000)
        },
        linkImagen: {
            type: Sequelize.STRING
        },
        autorId: {
            type: Sequelize.INTEGER
        },
        autor: {
            type: Sequelize.STRING
        },        
        autorImagen: {
            type: Sequelize.STRING
        },
        estatus: {
            type: Sequelize.BOOLEAN
        }
    });

    

    
    return Noticia;
};
