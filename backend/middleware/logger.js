import colors from 'colors'


const logger = (req,res,next) => {

    const methodColors = {
        GET:'green',
        POST:'yellow',
        PUT:'blue',
        DELETE:'red',
    }
    const color = methodColors[req.method]
    console.log(`${req.method[color]} ${req.path} ${res.statusCode}`)
    next()
}

export default logger