const ipAddress = document.getElementById("ipid");
const loc = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");
const inp_alert = document.getElementById("inp-alert") 
const ShowIpAdd = document.getElementById("show-ipAdd")


function showIps(){
  let p = ''
  const ips = JSON.parse(localStorage.getItem("IpAddress"))
  console.log(ips);
  ips.forEach(ip => {
      // const p = document.createElement("p")
      // p.innerText = ip
      p = p+`<p class="bg-dark text-light px-2 py-1 rounded-3">${ip}</p>`
      // ShowIpAdd.appendChild(`<p>${ip}</p>`)
      
    });
  // console.log(p);
  ShowIpAdd.innerHTML = p
}


//-----For map---------//

function maps(lat, long) {

  var map = L.map("map").setView([lat, long], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);
  var marker = L.marker([lat, long]).addTo(map);
  var popup = L.popup()
    .setLatLng([lat, long])
    .setContent("I am a standalone popup.")
    .openOn(map);
}

//-----

function search() {
  const searchElement = document.getElementById("ip-add");

  if (!searchElement.value) {
    return (searchElement.style.border = "3px solid red");
  }
  if (!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(searchElement.value)) {  
    inp_alert.classList.remove('d-none')
    return
  } 
  fetch(
    `https://geo.ipify.org/api/v2/country?apiKey=at_3J5A9PokRUWVpXHZ3l4wirJ86CgsL&ipAddress=${searchElement.value}`
  )
    .then((res) => {  
      return res.json();
    })
    .then((data) => {
      
      ipAddress.innerText = data.ip;
      loc.innerText = `${data.location.region},${data.location.country}       `;
      timezone.innerText = `UTC${data.location.timezone}`;
      isp.innerText = data.isp;
      ShowIpAdd.innerHTML = data.ip
      inp_alert.classList.add('d-none')
      ShowIpAdd.classList.remove('d-none')
    });
  fetch(
    `https://ipgeolocation.abstractapi.com/v1/?api_key=f62c08003cb646dcb698199c8a40cc6f&ip_address=${searchElement.value}`
  )
    .then((res1) => {
      return res1.json();
    })
    .then((data1) => {

      let newArry
      if(!localStorage.getItem("IpAddress")){
        newArry = []
      }else{
        newArry = JSON.parse(localStorage.getItem("IpAddress"))
      }

      newArry.push(searchElement.value)
      localStorage.setItem("IpAddress", JSON.stringify(newArry))
      maps(data1.latitude, data1.longitude);
      showIps() 
      
    });
}