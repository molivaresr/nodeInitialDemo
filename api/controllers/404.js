const others = (req, res) => {
    try {
        res.status(404).json({msg:'Página no existe - 404'});
    }
    catch (error) {
        console.log(error)
        res.status(400).json({msg:'Petición erronéa'})
    }
}

module.exports = {others}