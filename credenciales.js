module.exports = {
    database: {
        connectionLimit: 25,
        host: "superbear.mysql.database.azure.com",
        database: "superbear",
        user: "alexisluisedgarmauriciomiguel",
        password:
            "$Beartual1412AELMMFornite$1412mareenplatano777pillomaumiguelin",
    },
    env: {
        //Definimos los datos para JWT
        JWT_SECRETO: "elMarinnosmato",

        //tiempo en el que expira el token
        JWT_TIEMPO_EXPIRA: "7d",

        //tiempo en el que expira la cookie
        JWT_COOKIE_EXPIRES: 90,
    },
    /*
    database: {
        connectionLimit: 25,
        host: "localhost",
        database: "superbear",
        user: "root",
        password: "maika",
    }*/
};
