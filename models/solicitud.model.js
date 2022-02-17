module.exports = (sequelize, Sequelize) => {
    const Solicitud = sequelize.define("solicitude", {
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

        motivo: {
            type: Sequelize.STRING(1000000)
        }
    });

    return Solicitud;
};