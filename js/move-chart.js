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
  // console.log(Papa.parse(data, { header: true }).data);
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
// == chart.js
const data = [];
const data2 = [];
const data3 = [];
let prev;
let prev2;
let prev3;
for (let i = 0; i < 1000; i++) {
  prev += 5 - Math.random() * 10;
  data.push({ x: i, y: prev });

  prev2 += 5 - Math.random() * 10;
  data2.push({ x: i, y: prev2 });

  prev3 += 5 - Math.random() * 10;
  data3.push({ x: i, y: prev3 });
}
// == chart.js

function drawChart(labels, ...args) {
  const newData = [...args];
  // ==chart.js
  const totalDuration = 100000;
  const delayBetweenPoints = totalDuration / data.length;
  const previousY = (ctx) =>
    ctx.index === 0
      ? ctx.chart.scales.y.getPixelForValue(100)
      : ctx.chart
          .getDatasetMeta(ctx.datasetIndex)
          .data[ctx.index - 1].getProps(["y"], true).y;
  const animation = {
    x: {
      type: "number",
      easing: "linear",
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
        if (ctx.type !== "data" || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
      },
    },
    y: {
      type: "number",
      easing: "linear",
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== "data" || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
      },
    },
  };
  // ==chart.js
  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "# Average Global Temps",
          //   data: newData[0],
          borderColor: "blue",
          borderWidth: 1,
          //   ==
          radius: 0,
          data: newData[0],
          //   ==

          //  ===

          //   ===
        },
        {
          label: "# Temerature of Nothern",
          //   data: newData[1],
          borderColor: "tomato",
          borderWidth: 2,
          //   ==chartjs
          radius: 0,
          data: newData[1],
          // ==chart.js

          //  ===

          //   ==
        },
        {
          label: "# Temperature of South",
          //   data: newData[2],
          borderColor: "teal",
          borderWidth: 3,

          // ==
          radius: 0,
          data: newData[2],

          //==

          //  ===

          //   ==
        },
      ],
    },
    // ==chart.js
    options: {
      animation,

      interaction: {
        intersect: false,
      },
      plagins: {
        legend: false,
      },
      x: {
        type: "linear",
      },
    },
    // == chart js
  });
}
