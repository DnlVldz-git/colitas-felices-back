
module.exports = (sequelize, Sequelize) => {
    const Proyecto = sequelize.define("proyecto", {
        titulo: {
            type: Sequelize.STRING(29)
        },

        texto: {
            type: Sequelize.TEXT
        },

        imagenes: {
            type: Sequelize.ARRAY(Sequelize.TEXT)  
        },

        dineroActual: {
            type: Sequelize.FLOAT                                            
        },

        dineroMeta: {
            type: Sequelize.FLOAT
        },

        mostrarInicio: {
            type: Sequelize.BOOLEAN
        },

        activo: {
            type: Sequelize.BOOLEAN
        },

        textoDetalle: {
            type: Sequelize.STRING(1000000)
        },

        donadores: {
            type: Sequelize.INTEGER
        },

        apoyos: {
            type: Sequelize.INTEGER
        }


    });

    return Proyecto;
};
