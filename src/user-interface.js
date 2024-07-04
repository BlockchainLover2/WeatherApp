import {
    getStateInformationOfCountry,
    getCityInformationOfState,
    getAllCountryInformation
} from "./CountryInformationApi";

import {convertTurkishLetterToEnglish} from "./TurkishLetterToEnglish"


import {getWeatherInformation} from "./WeatherApi"

const countrySelect = document.querySelector("#country")
const stateSelect = document.querySelector("#state")
const citySelect = document.querySelector("#city")
const weatherContainer = document.querySelector(".weather-container")

const countryInformation = await getAllCountryInformation()

const radioButtons = document.querySelectorAll("input[name=degree]")

let currentWeatherInfo

const degreeMap = new Map([
    ["celcius","°C"],
    ["fahrenheit", "°F"]
])
let degreeType


let start = async ()=>{
    countrySelect.addEventListener("change",selectEventListener)
    stateSelect.addEventListener("change",selectEventListener)
    citySelect.addEventListener("change",selectEventListener)
    countryInformation.forEach((values,keys)=>{
        let option = new Option(values.name,keys)
        countrySelect.add(option)
    })

    radioButtons.forEach(x=>{
        x.addEventListener("change",e=>{
            degreeType = degreeMap.get(e.target.id)
            changeDegreeType()
        })
    })

    degreeType = degreeMap.get(document.querySelector("input[name=degree]:checked").id)
    countryChangeEvent(countrySelect)

}


let selectEventListener =  async (e)=>{
    switch (e.target.id){
        case "country":
            countryChangeEvent(e.target)
            break
        case "state":
            await stateChangeEvent(e.target)
            break
        case "city":
            await cityChangeEvent(e.target)
    }
}

let countryChangeEvent = (select)=>{
    stateSelect.innerHTML = ""
    let states = countryInformation.get(select.value).states
    for (const state of states) {
        let option = new Option(state.name,state.iso2)
        stateSelect.add(option)
    }
    stateChangeEvent(stateSelect)
}
let stateChangeEvent = async (select)=>{
    citySelect.innerHTML = ""
    let cityInformation = await getCityInformationOfState(countrySelect.value,select.value)
    for (const city of cityInformation) {
        let option = new Option(city.name,city.iso)
        citySelect.add(option)
    }
    cityChangeEvent(citySelect)
}
let cityChangeEvent = async (select)=>{
    let cityName = convertTurkishLetterToEnglish(select.options[select.selectedIndex].textContent)
    weatherContainer.childNodes[0].textContent = "Loading..."
    currentWeatherInfo = await getWeatherInformation(cityName)
    let degreeAmount = degreeType === "°C"? currentWeatherInfo.celcius:currentWeatherInfo.fahrenheit
    weatherContainer.childNodes[0].textContent = degreeAmount + " " + degreeType
    weatherContainer.childNodes[1].src = currentWeatherInfo.condition.icon
    weatherContainer.childNodes[1].alt = currentWeatherInfo.condition.text

}

let changeDegreeType = ()=>{
    if(degreeType === "°C"){
        weatherContainer.childNodes[0].textContent = currentWeatherInfo.celcius + " " + degreeType
    }
    else{
        weatherContainer.childNodes[0].textContent = currentWeatherInfo.fahrenheit + " " + degreeType
    }
}

start()