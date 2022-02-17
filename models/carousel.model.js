module.exports = (sequelize, Sequelize) => {
    const Carousel = sequelize.define("carousel", {
        titulo:{
            type: Sequelize.STRING
        },
        subtitulo: {
            type: Sequelize.STRING
        },
        linkImagen: {
            type: Sequelize.STRING
        },
        estatus:{
            type: Sequelize.BOOLEAN
        }//,
        /*texto: {
            type: Sequelize.STRING
        }*/
    });

    return Carousel;
};