let coutries = []

let countryname = []
let searchInput = document.querySelector("#searchInput")
let searchul = document.querySelector(".searchul")
let bigdiv = document.querySelector(".countrycontainer")


fetch('https://restcountries.com/v3.1/all').then((response) => {

  return response.json()

}).then((data) => {

  coutries = data
  console.log(coutries)
  showdata(data)
  afterdata()
  
}).catch((error) => {
  console.log(error)
})

// loading all data here 

function showdata(obj) {

  let countryhtml = ''


  coutries.forEach((item)=>{

    let index = 0

       countryhtml += `
    <div class="itemCountry">
          <img class="flagimg" src="${item.flags.png}" alt="">
          <h2>${item.name.common}</h2>
          <p class="para"><span>Capital :</span> ${item.capital}</p>
          <p class="para"><span>Languages :</span> </span>${item.languages && Object.values(item.languages).length > 0 ? Object.values(item.languages) : 'no language'}</p>
          <p class="para"><span>Continents :</span> ${Object.values(item.continents)}</p>
          <p class="para"><span>Currency :</span> ${  item.currencies && Object.keys(item.currencies).length > 0 
            ? item.currencies[Object.keys(item.currencies)[0]].name : 'No Currency'}, ${item.currencies && Object.keys(item.currencies).length > 0 
              ? item.currencies[Object.keys(item.currencies)[0]].symbol : 'Not applicable'}
          
          </p>
          <p class="para"><span>Population :</span> ${item.population}</p>
          <p class="para"><span>Car Side :</span> ${item.car.side}</p>
          <p class="para"><span>Location on map :</span> <a class="maplink" href="${item.maps.googleMaps}">Get directions</a>  </p>
          <img class="csymbol" src="${item.coatOfArms?.png || item.flags.svg }" alt="">
        </div>
        
    `
    bigdiv.innerHTML=countryhtml
    index++
    //console.log(countryhtml)
  })

}

// accessing only country name 

function afterdata() {
  for (let i = 0; i < coutries.length; i++) {
    countryname.push(coutries[i].name.common)
  }

  console.log(countryname)
}


// code for searching countries in search 
searchInput.addEventListener("input", ulshow)
let searchcount
function ulshow() {

  searchul.innerText = ""
  searchul.style.display = "none"

  if (searchInput.value) {
     searchul.style.display = "block"
     let userenter = searchInput.value

    console.log(userenter)

    searchcount = countryname.filter((item) => {
           item = item.slice(0, userenter.length)

      return item.toLowerCase().includes(userenter.toLowerCase())

      console.log(searchcount)
    })
  }


  let allitems = searchcount.map((item) => {
    let line = document.createElement("li")
    line.innerText = item

    searchul.append(line)

    line.onclick = () => {
      searchInput.value = item
      searchul.style.display = "none"
      singlecountry()

    }
  })

}

function singlecountry(){
 
  console.log("Search Input:", searchInput.value);


  let mycou = coutries.filter(item=>{
  if (item.name && item.name.common && item.name.common.toLowerCase().includes(searchInput.value.toLowerCase())) {
    
    return item;
  }
  
   })
   console.log(mycou)

   
   bigdiv.innerHTML = ""
   mycou.forEach(item=>{

    let innerselect = `
    <div class="selectitemCountry">
          <img class="flagimg" src="${item.flags.png}" alt="">
          <h2>${item.name.common}</h2>
          <p class="para"><span>Capital :</span> ${item.capital}</p>
          <p class="para"><span>Languages :</span> </span>${item.languages && Object.values(item.languages).length > 0 ? Object.values(item.languages) : 'no language'}</p>
          <p class="para"><span>Continents :</span> ${Object.values(item.continents)}</p>
          <p class="para"><span>Currency :</span> ${  item.currencies && Object.keys(item.currencies).length > 0 
            ? item.currencies[Object.keys(item.currencies)[0]].name : 'No Currency'}, ${item.currencies && Object.keys(item.currencies).length > 0 
              ? item.currencies[Object.keys(item.currencies)[0]].symbol : 'Not applicable'}
          
          </p>
          <p class="para"><span>Population :</span> ${item.population}</p>
          <p class="para"><span>Car Side :</span> ${item.car.side}</p>
          <p class="para"><span>Location on map :</span> <a class="maplink" href="${item.maps.googleMaps}"> Get directions</a>  </p>
          <img class="ccsymbol" src="${item.coatOfArms?.png || item.flags.svg }" alt="">
        </div>
    `

 bigdiv.innerHTML +=innerselect
   })

  
}
