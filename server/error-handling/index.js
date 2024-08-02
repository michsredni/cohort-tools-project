function errorHandling(app) {

    app.use((req, res, next) => {
        //gestor de error 404
        res.status(404).json({errorMessage: "Ruta no encontrada"})
    })

    app.use((error, req, res, next) => {
        console.log(error)
        res.status(500).json({errorMessage: "Lo sentimos, problemas con el servidor"})
    })
}
module.exports = errorHandling