const obtenerPeliculas = async (text_input) => {
    try {
        const respuesta = await axios.post(
            "https://gepetto-iii.azurewebsites.net/product",
            {
                voice: text_input,
            }
        );

        console.log(respuesta.data);
    } catch (error) {
        console.log(error);
    }
};

obtenerPeliculas("3 kilos de arroz Sos de Walmart, si no hay no comprar nada");
