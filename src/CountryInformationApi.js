const countryInformationApiUrl = "https://api.countrystatecity.in/v1"

const headers = new Headers();
headers.append("X-CSCAPI-KEY", "TlpiYXU2N0NkaUJJVDdRNk40Q3NBUlQ4Vm1DQjQxdmZzb3EwOUJmNw==\n");
const requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};


export let getAllCountryInformation = async () =>{
    try{
        let response = await fetch(`${countryInformationApiUrl}/countries`, requestOptions)
        let countryJson = await response.json()
        let stateJson = await getAllStateInformation()
        const map = new Map()
        countryJson.forEach(x=>{
            map.set(x.iso2,{name:x.name,states:[]})
        })
        stateJson.forEach(x=>{
            map.get(x.country_code).states.push(x)
        })

        return map
    }
    catch (error){
        console.log(error)
    }


}

 let getAllStateInformation = async () =>{
    try{
        let response = await fetch(`${countryInformationApiUrl}/states`, requestOptions)
        return await response.json()
    }
    catch (error){
        console.log(error)
    }
}


export let getStateInformationOfCountry = async (iso) =>{
    try{
        let response = await fetch(`${countryInformationApiUrl}/countries/${iso}/states`, requestOptions)
        let json = await response.json()
        let cityStateArray = []
        for (const state of json) {
            cityStateArray.push({name:state.name,iso:state.iso2})
        }
        return cityStateArray
    }
    catch (error){
        console.log(error)
    }
}
export let getCityInformationOfState = async (countryIso,stateIso) =>{
    try{
        let response = await fetch(`${countryInformationApiUrl}/countries/${countryIso}/states/${stateIso}/cities`, requestOptions)
        let json = await response.json()
        let cityStateArray = []
        for (const state of json) {
            cityStateArray.push({name:state.name,iso:state.iso2})
        }
        return cityStateArray
    }
    catch (error){
        console.log(error)
    }
}