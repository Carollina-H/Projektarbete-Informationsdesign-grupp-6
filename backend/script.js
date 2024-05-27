
/* 

Chart nummer 1 
ska läggas i en funktion sen? 
const totalChart = new CharacterData(document.getElementById('totalChart',{
    type: 'line',
}))

Chart nummer 2 
histogram, CO2/år  2018-2022

Chart nummer 3 
bar chart, sidled, nivålista sammanfattad, CO2/undersektor

*/ 


/* Hämta data */ 

//hämta data från en API.
function fetchData() {
    
    // URL till datamängden som ska användas.
    const urlUm = 'https://opendata.umea.se/api/explore/v2.1/catalog/datasets/vaxthusgasutslapp_umea/records?where=artal%20%3E%3D2018&limit=60&refine=huvudsektor%3A%22Alla%22&refine=huvudsektor%3A%22Transporter%22';
    
    //fetch för att hämta data från URL:en.
    fetch(urlUm)
        .then(response => response.json()) // Omvandlar serverns svar till JSON-format.
        .then(data => dataProcessing(data.results)) // Skickar den bearbetade datan till en annan funktion för vidare bearbetning.
        .catch(error => console.error('Error fetching data:', error));  // Om det finns några fel vid hämtningen, loggas dessa i konsolen.
}


/* Bearbeta datan */ 


// Bearbetar datan och förbereder den för att visas i ett diagram.
function dataProcessing(data) {
    // Definierar de år som ska visas i diagrammen.
    const years = ['2018', '2019', '2020', '2021', '2022'];

    // Skapa en datamodell för varje år med totala transport- och fordonsutsläpp inställda på 0.
    const emissionsData = years.map(year => ({
        year: year,
        total: 0,
        transport: 0,
        cars: 0
    }));

    // Loopar igenom varje datapost och aggregerar utsläpp för varje år och kategori.
    data.forEach(item => {
        const index = years.indexOf(item.artal);
        if (index !== -1) {
            if (item.huvudsektor === 'Alla') {
                emissionsData[index].total += item.varde_co2e;
            }
            if (item.huvudsektor === 'Transporter') {
                emissionsData[index].transport += item.varde_co2e;
                if (item.undersektor === 'Personbilar') {
                    emissionsData[index].cars += item.varde_co2e;
                }
            }
        }
    });

     
    // Skapar diagram med den bearbetade datan.
    createLineChart(years, emissionsData.map(data => data.total));
    createHistogram(years, emissionsData.map(data => (data.total > 0) ? (data.transport / data.total * 100) : 0));
    createCarChart(years, emissionsData.map(data => data.cars), emissionsData.map(data => data.total));
}


/* Skapa diagram */ 


// Funktion för att skapa linjediagram.
function createLineChart(years, data) {
    const canvas = document.getElementById('totalaUtsläppLineChart'); // Hämtar canvas-elementet för diagrammet.
    new Chart(canvas, {
        type: 'bar', // Typ av diagram.
        data: {
            labels: years, // Åren blir x-axelns etiketter.
            datasets: [{
                label: 'Totala utsläpp', // Namn på dataserien.
                data: data, // Data för diagrammet.
                borderColor: 'rgba(61, 76, 49, 0.5)', // Färg på linjen.
                backgroundColor: 'rgba(61, 76, 49, 1)' // Färg på fyllningen under linjen.
            }]
        },

        options: Object.assign(
            standardChartOptions('Ton CO2e'), // Använder standardalternativen
            {
                 scales: {
                    y: {
                        beginAtZero: false, // Börjar inte vid noll.
                        min: 300000, // Börjar vid 250 000.
                        
                    }
                }
            }
        )
    });
}




// Funktion för att skapa bar-chart.
function createHistogram(years, data) {
    const canvas = document.getElementById('transportHistogram'); // Hämtar canvas-elementet för diagrammet.
    new Chart(canvas, {
        type: 'bar', // Typ av diagram.
        data: {
            labels: years, // Åren blir x-axelns etiketter.
            datasets: [{
                label: 'Andel av utsläpp från transportsektorn (%)', // Namn på dataserien.
                data: data, // Data för diagrammet.
                backgroundColor: 'rgba(56, 62, 73, 1)' // Färg på fyllningen under linjen.
            }]
        },
        
        options: Object.assign(
        standardChartOptions('Procent (%)'), // Konfigurerar diagrammets utseende och funktion.
        {
        scales: {
            y: {
                beginAtZero: false, // Börjar inte vid noll.
                min: 40 // Börjar vid 40%.
            }
        }
    }
)
});
}

// Funktion för att skapa bar-chart.
function createCarChart(years, carData, totalData) {
    const canvas = document.getElementById('personBilarChart'); // Hämtar canvas-elementet för diagrammet.
    new Chart(canvas, {
        type: 'bar', // Typ av diagram.
        data: {
            labels: years, // Åren blir x-axelns etiketter.
            datasets: [{
                label: 'Totala utsläpp', // Namn på dataserien.
                data: totalData, // Data för diagrammet.
                backgroundColor: 'rgba(61, 76, 49, 1)' // Färg på fyllningen under linjen.

            }, {
                label: 'Personbilars utsläpp', // Namn på dataserien.
                data: carData, // Data för diagrammet.
                backgroundColor: 'rgb(255, 115, 115, 1)' // Färg på fyllningen under linjen.
            }]
        },
        options: Object.assign(
        standardChartOptions('Ton CO2e'),
        {
            plugins: {
                legend: {display: true}
            }
        }
    )
    });
}

// Återanvändbar funktion för att ställa in diagramalternativ.
function standardChartOptions(title) {
    return {
        responsive: true, // Gör diagrammet responsivt.
        plugins: {
            legend: { display: false}, // Gömmer förklaring ovanför diagrammet.
            title: { display: true, text: title, position: "left"} // Anger den använda enheten.
        }
    };
}

// När sidan laddas körs fetchData funktionen för att starta datanhämtningen.
document.addEventListener('DOMContentLoaded', fetchData);


// Skapa function för när användaren rör sig nedåt 20px från toppen av dokumentet, visa knappen

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// skapa en funtion för när användaren klickar på knappen, scrolla till toppen av dokumentet

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

