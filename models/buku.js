module.exports = (sequelize, DataTypes) => {
    const Buku = sequelize.define('Buku', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true
        },
        judul: {
            type: DataTypes.STRING,
            allowNull : true
        },
        pengarang: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tahun_terbit: {
            type: DataTypes.STRING,
            allowNull: true
        },
        bidang : {
            type: DataTypes.STRING,
            allowNull : true
        }
    });

    return Buku;
}