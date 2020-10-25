const request = require('postman-request')

const geocode = (address,callback) =>
{
  const mapbox_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidmVkaWtzaGV0dHkiLCJhIjoiY2tmdTZlYW9xMmF5azJyczUzZmZ4Ynl0eiJ9.lJbJQFeHPA9gPiBRgtOdQQ&limit=1'
  request({url: mapbox_url, json: true}, (error, {body}) => {
      if (error)
      {
        callback('Unable to connect to location services')
      }
      else if (body.features.length === 0)
      {
        callback('Unable to find location. Try another search')
      }
      else
      {
        callback(undefined,
          {
            latitude: body.features[0].center[1], 
            longitude: body.features[0].center[0] ,
            location: body.features[0].place_name
          })            
      }
    })    
}

const forecast = (latitude, longitude, callback) =>
{
  const weatherstack_url = 'http://api.weatherstack.com/current?access_key=21f7ddcd8ff0f2c5d9158aab57cad9ad&query=' + latitude + ',' + longitude + '&units=f'
  request({url: weatherstack_url, json: true}, (error, response) => {
      if (error)
      {
        callback('Unable to connect to weather service')
      }
      else if (response.body.error)
      {
        callback('Unable to find location')
      }
      else
      {
        callback(undefined, 'It is currently ' + response.body.current.temperature + ' degress out. There is a ' + response.body.current.precip  + '% chance of rain.')                    
      }
    })    
  }

    



module.exports = {geocode, forecast}