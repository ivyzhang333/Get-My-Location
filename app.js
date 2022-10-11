const btn = document.getElementById("btn");
const country_container = document.getElementById("country-container");
const map = document.getElementById("map");

function geo() {
  //Geolocation API
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      map.innerHTML = `<iframe src="https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed" width="100%" height="100%" frameborder="0" style="border:0" allowfullscreen></iframe>`;

      getLocation(lat, long);
    });
  }
}

const getLocation = async (lat, long) => {
  try {
    const response = await fetch(
      `http://api.positionstack.com/v1/reverse?access_key=f8dd49f0027dbb2043d4e0714b1439f4&query=${lat},${long}`
    );

    const data = await response.json(); //data is an array
    console.log(data);
    //get actually data
    const country = data.data[0];
    country_container.innerHTML = `      
    <div class="content">
      <h2>Continent</h2>
      <p>${country.continent}</p>
    </div>
    <div class="region">
      <h2>Region</h2>
      <p>${country.region}</p>
    </div>
    <div class="city">
      <h2>City</h2>
      <p>${country.locality}</p>
    </div>
    <div class="street">
      <h2>Street</h2>
      <p>${country.street}</p>
    </div>`;
  } catch (error) {
    console.log(error);
  }
};

btn.addEventListener("click", geo);
