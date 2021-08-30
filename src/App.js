import "./App.css";
import React from "react";

function App() {
  const [ip, setIp] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [info, setInfo] = React.useState({
    city: "",
    state: "",
    country: "",
    currency: "",
    continent: "",
    lati: "",
    long: "",
    time: "",
    offset: "",
    flag: "",
  });

  const submitForm = (event) => {
    event.preventDefault();
    fetch("https://ip-spring.herokuapp.com/info?ip=" + ip)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setShow(true);
        let obj = new Date(data.time_zone.current_time).toLocaleTimeString();
        setInfo({
          city: data.city + ` ( ${data.zipcode} ) `,
          state: data.state_prov,
          country: data.country_name,
          currency: data.currency.code + ` ( ${data.currency.symbol} )`,
          lati: data.latitude,
          long: data.longitude,
          time: obj,
          offset: "GMT + ( " + data.time_zone.offset + " )",
          flag: data.country_flag,
          continent: data.continent_name,
        });
      });
  };

  return (
    <div className="App">
      <h1 style={{ textDecoration: "underline" }}> IP Tracker </h1>
      <form onSubmit={submitForm}>
        <input
          type="text"
          value={ip}
          required
          onChange={(event) => setIp(event.target.value)}
          placeholder="103.75.166.207"
        />
        <button type="submit">Check</button>
      </form>

      {show && (
        <div>
          <p> City : {info.city} </p>
          <p> State : {info.state}</p>
          <p> Country : {info.country}</p>
          <p> Currency : {info.currency}</p>
          <p> Continent : {info.continent} </p>
          <p> Latitude : {info.lati}</p>
          <p> Longitude : {info.long}</p>
          <p> Current Time : {info.time}</p>
          <p> Time Offset : {info.offset} </p>
          <div
            style={{
              margin: "8px 0",
              display: "flex",
              alignItem: "center",
              justifyContent: "center",
            }}
          >
            <p>National Flag :&nbsp;</p>
            <img src={info.flag} alt="img" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
