const obtenerPeliculas = async (text_input) => {
    try {
        const respuesta = await axios.post("http://localhost:4000/product", {
            voice: text_input,
        });

        console.log(respuesta.data);
    } catch (error) {
        console.log(error);
    }
};

obtenerPeliculas(
    "Un suavitel de 5 litros de sams club sino hay comprar otro detergente"
);
