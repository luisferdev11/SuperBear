const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const pool = require("../../database");
const { promisify } = require("util");
const { env } = require("../../credenciales");

module.exports = {

    async getNoticias(req, res){
        try{
            let noticias = await pool.query('SELECT * FROM dnoticias');
            res.render('consultarNoticias-usuario', {noticias: noticias});
        }catch{
            res.redirect('/error');
        }
    },

    async getNoticiasAdmin(req, res){
        try{
            let noticias = await pool.query('SELECT * FROM dnoticias');
            res.render('admin-consultarNoticias', {noticias: noticias});
        }catch{
            res.redirect('/error');
        }
    },

    async setNoticia(req, res){
        try{
            let { titulo } = await req.body;
            let { contenido } = await req.body;
            // Falta obtener el id del admin
            let id_Adm = 1;
            // Falta validacion
            let validacion = true;
            if (validacion == true){
                await pool.query(
                    'insert into dnoticias (tit_not, cont_not, fec_not, id_Adm) values ("' + titulo + '", "' + contenido + '", NOW(), ' + id_Adm + ');'
                );
                res.redirect('/admin-consultarNoticias');
            }
        }catch{
            res.redirect('/error');
        }
        
    },

    async borrarNoticia(req, res){
        try{
            let { id } = req.params;
            // No revisa si existe el usuario
            // No revisa si es admin
            let validacion = true;
            if(validacion == true){
                await pool.query('delete from dnoticias where idDNoticias=' + id );
                res.redirect('/admin-consultarNoticias');
            }
        }catch{
            res.redirect('/error');
        }
    },

    async redirectEditar(req, res){
        try{
            let { id } = req.params;
            let validacion = true;
            // No revisa si existe el usuario
            // No revisa si es admin
            if(validacion == true){
                let noticia = await pool.query("select idDNoticias, tit_not, cont_not from dnoticias where idDNoticias =" + id + ";");
                res.render('admin-editarNoticia', { noticia });
            }
        }catch{
            res.redirect('/error');
        }
    },

    async editarNoticia(req, res){
        try{
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
        }catch{
            res.redirect('/error');
        }
    }

}