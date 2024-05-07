
/*Hämta data online */
const urlUm = 'https://opendata.umea.se/api/explore/v2.1/catalog/datasets/vaxthusgasutslapp_umea/records?limit=20&refine=huvudsektor%3A%22Alla%22&refine=huvudsektor%3A%22Transporter%22'

fetch(urlUm)
    .then((response) => response.json())
    .then ((data) => console.log(data));

/*Chart nummer 1 */

/* ska läggas i en funktion sen? */
/* const totalChart = new CharacterData(document.getElementById('totalChart',{
    type: 'line',
})) */

/*Chart nummer 2 */

/* histogram, CO2/år  2018-2022*/

/*Chart nummer 3 */

/* bar chart, sidled, nivålista sammanfattad, CO2/undersektor */



