const fs = require('fs');
require('dotenv').config()

const url = process.env.URL;
const headers = JSON.parse(process.env.HEADERS);


fetch(url, { method:'GET', headers: headers })
    .then(response => {
        if (response.status === 200) {
            // console.log('response',response);
            return response.json();
        }else {
            console.log("BAD", response);
        }
    }).then( jsonResponse => {
        const data = jsonResponse;
        // console.log('data',data);
        const out_file = 'arrivalsOut.json';
        fs.writeFileSync(out_file, JSON.stringify(data, null, 4));

        const arrivals_data = data.result.response.airport.pluginData.schedule.arrivals.data;
        const table_data = [["ID", "Flight Number", "Airline", "Modelo", "Origin", "Destination", "Departure Time sch", "Arrival Time sch", "ETA", "Status"]];

        arrivals_data.forEach(arrival => {
            const flight = arrival.flight || {};
            const identification = flight.identification || {};
            const status = flight.status || {};
            const aircraft = flight.aircraft || {};
            const airline = flight.airline || {};
            const airport = flight.airport || {};
            const time = flight.time || {};

            const flight_id = identification.id || "N/A";
            const flight_number = (identification.number && identification.number.default) || "N/A";
            const airline_name = airline.name || "N/A";
            const aircraft_model = (aircraft.model && aircraft.model.text) || "N/A";
            const origin = (airport.origin && airport.origin.code && airport.origin.code.iata) || "N/A";
            const destination = data.result.request.code;
            const departure_time = time.scheduled.departure || "N/A";
            const arrival_time = time.scheduled.arrival || "N/A";
            const eta_time = time.other.eta || "N/A";
            const status_text = status.text || "N/A";

            table_data.push([flight_id, flight_number, airline_name, aircraft_model, origin, destination, departure_time, arrival_time, eta_time, status_text]);
        });

        // console.log(table_data.map(row => row.join('\t')).join('\n'));

        const txt_out_file = 'arrivalsOut.txt';
        fs.writeFileSync(txt_out_file, table_data.map(row => row.join('\t')).join('\n'));
    })
  .catch(error => {
    console.log('VERY BAD\n', error);
  });
