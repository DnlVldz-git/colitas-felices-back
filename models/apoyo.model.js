module.exports = (sequelize, Sequelize) => {
    const Apoyo = sequelize.define("apoyo", {
        nombre: {
            type: Sequelize.STRING
        },

        paterno: {
            type: Sequelize.STRING
        },

        materno: {
            type: Sequelize.STRING
        },

        elector: {
            type: Sequelize.STRING
        },

        calle: {
            type: Sequelize.STRING
        },

        int: {
            type: Sequelize.STRING
        },

        ext: {
            type: Sequelize.STRING
        },

        cp: {
            type: Sequelize.INTEGER
        },

        colonia: {
            type: Sequelize.STRING
        },

        ciudad: {
            type: Sequelize.STRING
        },

        estado: {
            type: Sequelize.STRING
        },

        correo: {
            type: Sequelize.STRING
        },

        telefono: {
            type: Sequelize.STRING
        },

        programa: {
            type: Sequelize.INTEGER
        },

        situacion: {
            type: Sequelize.STRING(1000000)
        }
    });

    return Apoyo;
};