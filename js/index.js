const ctx = document.querySelector(".js-chart").getContext("2d");
const GLOBAL_MIN_TEMPERATURE = 14;
console.log(ctx);
// ===============расброс по функциям=========

fetchData()
  .then(parsData)
  .then(getLabelAndData)
  .then(({ years, temps, NHem, SHem }) => drawChart(years, temps, NHem, SHem));

function fetchData() {
  return fetch("./ZonAnn.Ts+dSST.csv").then((response) => response.text());
}

function parsData(data) {
  return Papa.parse(data, { header: true }).data;
  //   console.log(Papa.parse(data, { header: true }).data);
}

function getLabelAndData(data) {
  return data.reduce(
    (acc, entry) => {
      acc.years.push(entry.Year);
      acc.temps.push(Number(entry.Glob) + GLOBAL_MIN_TEMPERATURE);
      acc.NHem.push(Number(entry.NHem) + GLOBAL_MIN_TEMPERATURE);
      acc.SHem.push(Number(entry.SHem) + GLOBAL_MIN_TEMPERATURE);
      return acc;
    },
    { years: [], temps: [], NHem: [], SHem: [] }
  );
}

function drawChart(labels, ...args) {
  const newData = [...args];
  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "# Average Global Temps",
          data: newData[0],
          borderColor: "blue",
          borderWidth: 1,
        

          //  ===
          animations: {
            tension: {
              duration: 1000,
              easing: "easeInQuart",
              from: 0,
              to: 1,
              loop: true,
              delay: 500,
            },
          },
          //   ===
        },
        {
          label: "# Temerature of Nothern",
          data: newData[1],
          borderColor: "tomato",
          borderWidth: 2,
         
          //  ===
          animations: {
            tension: {
              duration: 1000,
              easing: "easeInCubic",
              from: 0,
              to: 1,
              loop: true,
              delay: 400,
            },
          },

          //   ==
        },
        {
          label: "# Temperature of South",
          data: newData[2],
          borderColor: "teal",
          borderWidth: 3,
        
          //  ===
          animations: {
            tension: {
              duration: 1000,
              easing: "easeInBack",
              from: 0,
              to: 1,
              loop: true,
              delay: 800,
            },
          },

          //   ==
        },
      ],
    },
    options: {
      scales: {
        y: {
          ticks: {
            beginAtZero: false,
            callback(value) {
              return value + "°";
            },
          },
        },
      },
    },
  });
}
// ===============расброс по функциям=========

// ===========в одном коде без разброса============

// function fetchData() {
//   fetch("./ZonAnn.Ts+dSST.csv")
//     .then((response) => response.text())
//     .then((data) => {
//       const parsData = Papa.parse(data, { header: true }).data;

//       const mappedData = parsData.reduce(
//         (acc, entry) => {
//           acc.years.push(entry.Year);
//           acc.temps.push(Number(entry.Glob) + GLOBAL_MIN_TEMPERATURE);
//           return acc;
//         },
//         { years: [], temps: [] }
//       );
//       console.log(mappedData);

//       // =============заменил на reduce=======

//       //   const years = parsData.map((entry) => entry.Year);
//       //   const temps = parsData.map(
//       //     (entry) => Number(entry.Glob) + GLOBAL_MIN_TEMPERATURE
//       //   );

//       //   console.log(temps);

//       //   console.log(years);
//       // =============заменил на reduce=======

//   new Chart(ctx, {
//     type: "line",
//     data: {
//       labels: mappedData.years,
//       datasets: [
//         {
//           label: "# Average Global Temps",
//           data: mappedData.temps,
//           borderColor: "rgba(255, 99, 132, 1)",
//           borderWidth: 1,
//         },
//       ],
//     },
//     options: {
//       scales: {
//         y: {
//           ticks: {
//             beginAtZero: true,
//             callback(value) {
//               return value + "°";
//             },
//           },
//         },
//       },
//     },
//     // ====

//     // ===
//   });
//     });
// }

// fetchData();
