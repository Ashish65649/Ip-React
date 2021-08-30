import "./App.css";
import React from "react";

function App() {
  const [ip, setIp] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [info, setInfo] = React.useState({
    city: "",
    state: "",
    country: "",
    continent: "",
    lati: "",
    long: "",
    time: "",
    offset: "",
    flag: "",
  });

  const submitForm = (event) => {
    event.preventDefault();
    fetch("http://localhost:8500/info?ip=" + ip)
      .then((response) => response.json())
      .then((data) => {
        setShow(true);
        let obj = new Date(data.time_zone.current_time).toLocaleTimeString();
        setInfo({
          city: data.city + ` ( ${data.zipcode} ) `,
          state: data.state_prov,
          country: data.country_name,
          lati: data.latitude,
          long: data.longitude,
          time: obj,
          offset: data.time_zone.offset,
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
          placeholder="Enter IP address : "
        />
        <button type="submit">Check</button>
      </form>

      {show && (
        <div>
          <p> City : {info.city} </p>
          <p> State : {info.state}</p>
          <p> Country : {info.country}</p>
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
            <p>National Flag :</p>
            <img src={info.flag} alt="img" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
