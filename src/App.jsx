import { useState, useEffect, useMemo } from "react";
import "./App.css";
import "./index.css";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
function App() {
  const [ipAddress, setIPAddress] = useState("");
  const [userData, setUserData] = useState({
    as: {
      asn: 13335,
      domain: "https://www.cloudflare.com",
      name: "CLOUDFLARENET",
      route: "104.28.114.0/24",
      type: "Content",
    },
    ip: "",
    isp: "Cloudflare, Inc.",
    location: {
      city: "Nové Město",
      country: "CZ",
      geonameId: 3069467,
      lat: 50.07829,
      lng: 14.42089,
      postalCode: "",
      region: "Hlavní město Praha",
      timezone: "+02:00",
    },
  });
  const APIkey = "add API key from https://geo.ipify.org";

  const googleAPI = "add google API key";

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleAPI,
  });

  const defaultMapOptions = {
    fullscreenControl: false,
    clickableIcons: false,
    disableDefaultUI: true,
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // fetch(
    //   `https://geo.ipify.org/api/v2/country,city?apiKey=${APIkey}&ipAddress=${ipAddress}`
    // )
    //   .then((response) => response.json())
    //   .then((data) => setUserData(data))
    //   .catch((error) => console.log(error));

    console.log(userData);
  };

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => setIPAddress(data.ip))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <header className="h-[40%] flex flex-col items-center justify-center bg-[url(./assets/pattern-bg-mobile.png)] bg-no-repeat bg-cover pt-5 gap-6">
        <h1 className="text-3xl text-white">IP Address tracker</h1>
        <form className="w-[80%] flex flex-row" onSubmit={handleSearch}>
          <input
            type="text"
            name="ip-address"
            placeholder={ipAddress}
            className="w-full p-2 px-5 h-16 text-xl rounded-l-xl"
          />
          <button className="bg-black w-16 flex items-center justify-center rounded-r-xl">
            <img
              src="src/assets/icon-arrow.svg"
              alt="submit-arrow-icon"
              className=""
            ></img>
          </button>
        </form>
        <div className="flex flex-col justify-center items-center py-3 bg-white w-[80%] gap-5 mb-[-150px] rounded-xl z-10 shadow-lg">
          <div className="flex flex-col justify-center items-center">
            {" "}
            <p className="text-xs text-gray-600 uppercase tracking-wider">
              IP ADDRESS
            </p>
            <p>{ipAddress}</p>
          </div>

          <div className="flex flex-col justify-center items-center">
            {" "}
            <p className="text-xs text-gray-600 uppercase tracking-wider">
              location
            </p>
            <p>
              {userData.location.city}, {userData.location.country}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            {" "}
            <p className="text-xs text-gray-600 uppercase tracking-wider">
              timezone
            </p>
            <p>UTC {userData.location.timezone}</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            {" "}
            <p className="text-xs text-gray-600 uppercase tracking-wider">
              isp
            </p>
            <p>{userData.isp}</p>
          </div>
        </div>
      </header>
      <main className="h-[60%] w-full bg-slate-800">
        {isLoaded ? (
          <GoogleMap
            zoom={12}
            center={{
              lat: userData.location.lat,
              lng: userData.location.lng,
            }}
            mapContainerClassName="w-full h-full"
            options={defaultMapOptions}
          >
            <Marker
              key="marker"
              position={{
                lat: userData.location.lat,
                lng: userData.location.lng,
              }}
            />
          </GoogleMap>
        ) : (
          "Loading..."
        )}
      </main>
    </>
  );
}

export default App;
