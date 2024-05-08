
/* Hämta data online  */
const urlUm = 'https://opendata.umea.se/api/explore/v2.1/catalog/datasets/vaxthusgasutslapp_umea/records?limit=20&refine=huvudsektor%3A%22Alla%22&refine=huvudsektor%3A%22Transporter%22'

const APIum = fetch(urlUm)
    .then((response) => response.json())
    .then ((umData) => {
        const values = umData[1].varde_co2e.map((varde_co2e) => varde_co2e.code);
        console.log(values)
    });






/*
const urlUm = 'https://opendata.umea.se/api/explore/v2.1/catalog/datasets/vaxthusgasutslapp_umea/records?limit=20&refine=huvudsektor%3A%22Alla%22&refine=huvudsektor%3A%22Transporter%22'

function fetchAndCreateLineChart () {
    fetch(urlUm)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            const filteredData = data.records.filter(record => {
                const year = parseInt(record.fields.Årtal);
                return year >= 2018 && year <= 2022; 
            });
        });
};

const total = APIum.filter((huvudsektor) => huvudsektor.Alla);
        const CO2e = APIum.varde_co2e;
        console.log(total);
        console.log(CO2e);

*/



/* function fetchAndCreateLineChart () {
    const urlUm = 'https://opendata.umea.se/api/explore/v2.1/catalog/datasets/vaxthusgasutslapp_umea/records?limit=20&refine=huvudsektor%3A%22Alla%22&refine=huvudsektor%3A%22Transporter%22';

    fetch(urlUm)
    .then(response => response.json())
        .then(data => {
            console.log(data);
            const filteredData = data.records.filter(record => {
                const year = parseInt(record.fields.Årtal);
                return year >= 2018 && year <= 2022;
            
                const years = ['2018', '2019', '2020', '2021', '2022'];
                const emissionsByYear = years.map(year => {
                    const yearlyRecords = filteredData.filter(record => record.fields.Årtal === year);
                    const totalEmissions = yearlyRecords.reduce((sum, record) => sum + parseFloat(record.fields['[Ton] CO2e']), 0);
                    return totalEmissions;
                });

            createLineChart(years, emissionsByYear);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
} */




/*Chart nummer 1 */

/* ska läggas i en funktion sen? */
/* const totalChart = new CharacterData(document.getElementById('totalChart',{
    type: 'line',
})) */

/*Chart nummer 2 */

/* histogram, CO2/år  2018-2022*/

/*Chart nummer 3 */

/* bar chart, sidled, nivålista sammanfattad, CO2/undersektor */