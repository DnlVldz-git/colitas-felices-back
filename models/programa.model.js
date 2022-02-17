module.exports = (sequelize, Sequelize) => {
    const Programa = sequelize.define("programa", {
        titulo: {
            type: Sequelize.STRING
        },

        subtitulo: {
            type: Sequelize.STRING
        },

        descripcion: {
            type: Sequelize.STRING(1000000)
        },

        activo: {
            type: Sequelize.BOOLEAN
        },

        inicio: {
            type: Sequelize.BOOLEAN
        },

        imagenes: {
            type: Sequelize.ARRAY(Sequelize.TEXT)
        },

        icono: {
            type: Sequelize.STRING
        },

        colorIcono: {
            type: Sequelize.STRING
        }
    });

    return Programa;
};