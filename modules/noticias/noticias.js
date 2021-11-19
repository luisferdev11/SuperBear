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
    },

    async setNoticia(req, res){
        let { titulo } = await req.body;
        let { contenido } = await req.body;
        // Falta obtener el id del admin
        let id_Adm = 1;
        // Falta validacion
        let validacion = true;
        if (validacion == true){
            pool.query(
                'insert into dnoticias (tit_not, cont_not, fec_not, id_Adm) values ("' + titulo + '", "' + contenido + '", NOW(), ' + id_Adm + ');'
            );
            res.redirect('/admin-consultarNoticias');
        }
        
    }
}