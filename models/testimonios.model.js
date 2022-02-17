module.exports = (sequelize, Sequelize) => {
    const TestimonioModel = sequelize.define("testimonio", {
        testimonio: {
            type: Sequelize.STRING
        },

        autor: {
            type: Sequelize.STRING
        },

        ocupacion: {
            type: Sequelize.STRING
        },

        imagenPerfil: {
            type: Sequelize.STRING
        }
    });

    return TestimonioModel;
};