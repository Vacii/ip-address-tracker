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

  const geoAPIkey = import.meta.env.VITE_GEO_API_KEY;

  const googleAPIkey = import.meta.env.VITE_GOOGLE_API_KEY;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleAPIkey,
  });

  const defaultMapOptions = {
    fullscreenControl: false,
    clickableIcons: false,
    disableDefaultUI: true,
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // fetch(
    //   `https://geo.ipify.org/api/v2/country,city?apiKey=${geoAPIkey}&ipAddress=${ipAddress}`
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
      <header className="h-[40%] max-h-[400px] flex flex-col items-center justify-center bg-[url(./assets/pattern-bg-mobile.png)] md:bg-[url(./assets/pattern-bg-desktop.png)] bg-no-repeat bg-cover gap-10">
        <h1 className="text-3xl font-medium text-white">IP Address Tracker</h1>
        <form
          className="w-[80%] max-w-[600px] flex flex-row "
          onSubmit={handleSearch}
        >
          <input
            type="text"
            name="ip-address"
            placeholder={ipAddress}
            className="w-full p-2 px-5 h-16 text-xl rounded-l-xl font-normal cursor-pointer"
          />
          <button className="bg-black hover:bg-[#2b2b2b] w-16 flex items-center justify-center rounded-r-xl">
            <img
              src="src/assets/icon-arrow.svg"
              alt="submit-arrow-icon"
              className=""
            ></img>
          </button>
        </form>
        <div className="flex flex-col flex-wrapper md:flex-row justify-center md:justify-evenly items-center py-7 bg-white w-[80%] md:w-[90%] ld:w-[80%] max-w-[1200px] md:min-h-[150px] gap-6  mb-[-150px] md:mb-[-100px] rounded-xl z-10 shadow-lg px-10">
          <div className="flex flex-col flex-item justify-center md:justify-start items-center md:items-start userData gap-1 md:gap-3 px-5 md:h-full">
            {" "}
            <p className="text-xs text-[#969696] uppercase tracking-wider md:tracking-widest vertical-scaling">
              IP ADDRESS
            </p>
            <p className="text-xl md:text-2xl">{ipAddress}</p>
          </div>

          <div className="flex flex-col flex-item justify-center md:justify-start items-center md:items-start userData gap-1 md:gap-3 px-5 md:h-full">
            {" "}
            <p className="text-xs text-[#969696] uppercase tracking-wider md:tracking-widest vertical-scaling">
              location
            </p>
            <p className="text-xl md:text-2xl">
              {userData.location.city}, {userData.location.country}
            </p>
          </div>
          <div className="flex flex-col flex-item justify-center md:justify-start items-center md:items-start userData gap-1 md:gap-3 px-5 md:h-full">
            {" "}
            <p className="text-xs text-[#969696] uppercase tracking-wider md:tracking-widest vertical-scaling">
              timezone
            </p>
            <p className="text-xl md:text-2xl">
              UTC {userData.location.timezone}
            </p>
          </div>
          <div className="flex flex-col flex-item justify-center md:justify-start items-center md:items-start userData gap-1 md:gap-3 px-5 md:h-full">
            {" "}
            <p className="text-xs text-[#969696] uppercase tracking-wider md:tracking-widest vertical-scaling">
              isp
            </p>
            <p className="text-xl md:text-2xl">{userData.isp}</p>
          </div>
        </div>
      </header>
      <main className="h-full w-full bg-slate-800">
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
