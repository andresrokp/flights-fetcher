const fs = require('fs');
require('dotenv').config()

const url = process.env.URL;
const headers = JSON.parse(process.env.HEADERS);


module.exports = async function fetchFromApi(){

    // insert time un fetch url
    const nowInSeconds = Math.floor(Date.now() / 1000);
    const urlTimed = url.replace('NOW_TIME', nowInSeconds.toString());
    console.log(urlTimed)

    const response = await fetch(urlTimed, { method:'GET', headers: headers })
    
    if (response.status === 200) {
        
        const data =  await response.json();
        const arrivals_data = data.result.response.airport.pluginData.schedule.arrivals.data;
        // console.log('arrivals_data',arrivals_data);
        if (arrivals_data) console.log('There is data!');

        const data_array = [];

        arrivals_data.forEach(arrival => {

            // Taking main big properties
            const flight = arrival.flight || {};
            const identification = flight.identification || {};
            const status = flight.status || {};
            const aircraft = flight.aircraft || {};
            const airline = flight.airline || {};
            const airport = flight.airport || {};
            const time = flight.time || {};

            // Taking granular data from the main big props
            const flight_id = identification.id || "N/A";
            const flight_number = (identification.number && identification.number.default) || "N/A";
            const airline_name = airline.name || "N/A";
            const aircraft_model = (aircraft.model && aircraft.model.text) || "N/A";
            const aircraft_registration = aircraft.registration || "N/A";
            const origin = (airport.origin && airport.origin.code && airport.origin.code.iata) || "N/A";
            const destination = data.result.request.code;
            const departure_time = time.scheduled.departure || "N/A";
            const arrival_time = time.scheduled.arrival || "N/A";
            const eta_time = time.other.eta || "N/A";
            const status_text = status.text || "N/A";

            data_array.push({flight_id, flight_number, airline_name, aircraft_model, aircraft_registration, origin, destination, departure_time, arrival_time, eta_time, status_text});
        });

        return data_array;
    }else {
        console.log("BAD", response);
    }
}