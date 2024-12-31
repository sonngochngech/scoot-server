const fs = require('fs');
const { Country, City ,State} = require('country-state-city');

const getCities = async () => {
    const countries = await Country.getAllCountries();
    let items = countries.map(country => {
        const cities = State.getStatesOfCountry(country.isoCode);
        const newCities = cities.map(city => {
            return {
                name:`${city.name}, ${country.name}`,
                code: `${city.isoCode}-${country.isoCode}`
            }
        });
        return newCities;
    });

    // Flatten the nested arrays
    items = items.flat();

    // Write the data to a JSON file
    fs.writeFileSync('cities.json', JSON.stringify(items, null, 2), 'utf-8');

    console.log('Cities and countries saved to cities.json');
};

getCities();