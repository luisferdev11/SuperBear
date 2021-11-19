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
        
    },

    async borrarNoticia(req, res){
        let { id } = req.params;
        // No revisa si existe el usuario
        // No revisa si es admin
        let validacion = true;
        if(validacion == true){
            pool.query('delete from dnoticias where idDNoticias=' + id );
            res.redirect('/admin-consultarNoticias');
        }
    },

    async redirectEditar(req, res){
        let { id } = req.params;
        let validacion = true;
        // No revisa si existe el usuario
        // No revisa si es admin
        if(validacion == true){
            let noticia = await pool.query("select idDNoticias, tit_not, cont_not from dnoticias where idDNoticias =" + id + ";");
            res.render('admin-editarNoticia', { noticia });
        }
    },

    async editarNoticia(req, res){
        let { contenido } = req.body;
        let { titulo } = req.body;
        let { id } = req.params;
        let validacion = true;
        // No revisa si existe el usuario
        // No revisa si es admin
        if(validacion == true){
            await pool.query('update dnoticias set cont_not = "' + contenido + '", tit_not = "' + titulo + '" where idDNoticias =' + id + ";");
            res.redirect('/admin-consultarNoticias');
        }
    }

}