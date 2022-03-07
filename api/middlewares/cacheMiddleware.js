module.exports = cacheMiddleware = (req,res,next)=>{
    res.set('Cache-control', 'no-cache')
    next()
  }
  