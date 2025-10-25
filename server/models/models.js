import sequelize from "../db.js";
import {DataTypes} from "sequelize";

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING,},
    role: {type: DataTypes.STRING, defaultValue: "user"}
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketProducts = sequelize.define('basketProducts', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER, defaultValue: 1, allowNull: false, validate: {min: 1}}
})

const Products = sequelize.define('Products', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    about: {type: DataTypes.STRING, allowNull: false},
    quantityInStock: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 1}
})

const TypeProducts = sequelize.define('typeProducts', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    about: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false}
})

const BrandProducts = sequelize.define('brandProducts', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

// const Rating = sequelize.define('rating', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     rate: {type: DataTypes.INTEGER, allowNull: false}
// })

const Characters = sequelize.define('characters', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
})

const TypeBrand = sequelize.define('typeBrand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


User.hasOne(Basket, {onDelete: 'CASCADE'})
Basket.belongsTo(User)

// User.hasMany(Rating)
// Rating.belongsTo(User)

Basket.hasMany(BasketProducts, {onDelete: 'CASCADE'})
BasketProducts.belongsTo(Basket)

TypeProducts.hasMany(Products, {onDelete: 'CASCADE'})
Products.belongsTo(TypeProducts)

// BrandProducts.hasMany(Products)
// Products.belongsTo(BrandProducts)

// Products.hasMany(Rating)
// Rating.belongsTo(Products)

Products.hasMany(BasketProducts, {onDelete: 'CASCADE'})
BasketProducts.belongsTo(Products)

Products.hasMany(Characters, {onDelete: 'CASCADE'})
Characters.belongsTo(Products)

// TypeProducts.belongsToMany(BrandProducts, {through: TypeBrand})
// BrandProducts.belongsToMany(TypeProducts, {through: TypeBrand})

export default {
    User,
    Basket,
    BasketProducts,
    Products,
    TypeProducts,
    // BrandProducts,
    // Rating,
    Characters,
    // TypeBrand
}