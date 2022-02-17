module.exports = (sequelize, Sequelize) => {
    const Volunteer = sequelize.define("volunteer", {
        nombre: {
            type: Sequelize.STRING
        },

        paterno: {
            type: Sequelize.STRING
        },

        materno: {
            type: Sequelize.STRING
        },

        correo: {
            type: Sequelize.STRING
        },

        telefono: {
            type: Sequelize.STRING
        },

        facebook: {
            type: Sequelize.STRING
        },
        
        instagram: {
            type: Sequelize.STRING
        },

        twitter: {
            type: Sequelize.STRING
        },

        linkedin: {
            type: Sequelize.STRING
        },

        activo: {
            type: Sequelize.BOOLEAN
        },

        inicio: {
            type: Sequelize.BOOLEAN
        },

        imagen: {
            type: Sequelize.STRING
        }
    });

    return Volunteer;
};