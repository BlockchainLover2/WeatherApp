const baseApiUrl = "http://api.weatherapi.com/v1"
const headers = new Headers();
headers.append("key", "95a6e339f8f84db5bec110412240307");
headers.append("Content-Type", "charset=utf-8")


const requestOptions = {
    method: 'GET',
    headers: headers,


};

export let getWeatherInformation = async (cityName) =>{
    try{
        let response = await fetch(`${baseApiUrl}/current.json?q=${cityName}`, requestOptions)
        let json = await response.json()
        return {celcius:json.current.temp_c,fahrenheit:json.current.temp_f,condition:json.current.condition}
    }
    catch (error){
        console.log(error)
    }

}