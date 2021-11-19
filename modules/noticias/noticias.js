const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const pool = require("../../database");
const { promisify } = require("util");
const { env } = require("../../credenciales");

module.exports = {

    async getNoticias(req, res){
        let noticias = await pool.query('SELECT * FROM dnoticias');
        res.render('consultarNoticias-usuario', {noticias: noticias});
    },

    async getNoticiasAdmin(req, res){
        let noticias = await pool.query('SELECT * FROM dnoticias');
        res.render('admin-consultarNoticias', {noticias: noticias});
    }

}