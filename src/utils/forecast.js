const request = require('request')


const forecast = (latitude, longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=fdf21d2ef684230b6b5231faecb640bb&query='+ latitude + ',' + longitude + '&units=f'
    
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Forecast api not available',undefined)
        }else if(response.body.error){
            callback('forecast is not available for given address',undefined)
        }else{
            callback(undefined,"it is currently "+response.body.current.temperature+" but it feels like "+response.body.current.feelslike); 
        }
         
    })
}

module.exports = forecast