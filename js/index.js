function fetchData() {
  fetch("./ZonAnn.Ts+dSST.csv")
    .then((response) => {
      console.log(response);
      return response.text();
    })
    .then((data) => console.log(typeof data));
}

fetchData();


