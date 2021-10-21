const getUsuario = () => {
    return localStorage.getItem("usuario")
}

module.exports = { getUsuario };