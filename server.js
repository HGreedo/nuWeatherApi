var button = document.querySelector('.button');
var inputValue = document.querySelector('.inputValue');
var cityName = document.querySelector('.name');
var description = document.querySelector('.desc');
var temperature = document.querySelector('.temp');
var humidity = document.querySelector('.humidity');
var icon = document.querySelector('.icon');
var weatherApiKey = "a84fabc2e8f4177338edf11ed9c6b406";
const newSideBar = document.getElementById("#sidebar");



button.addEventListener('click', function(){
fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&units=imperial&appid=a84fabc2e8f4177338edf11ed9c6b406')
.then(response => response.json())
.then(data => {
    var nameValue = data['name'];
    var temperatureValue = 'the temperatre is '+ data['main']['temp'];
    var descriptionValue = 'you can expect '+data['weather'][0]['description'];
    var iconValue = data['weather'][0]['icon'];
    var humidityValue = 'with humidity at '+ data['main']['humidity']+'%';
    
    cityName.innerHTML = nameValue;
    temperature.innerHTML = temperatureValue;
    description.innerHTML = descriptionValue;
    icon.innerHTML = iconValue;
    humidity.innerHTML = humidityValue

    
}).catch(err => alert("Wrong city name!"))

//code to store past searches in local storage
function storePastSearch(){
const pastSearch = 
    inputValue.value

let pastSearch_serialized = JSON.stringify(pastSearch);
localStorage.setItem("pastSearch", pastSearch_serialized);
//console.log(pastSearch_serialized)
};

storePastSearch();

const sidebar = JSON.parse(localStorage.getItem("pastSearch"));
console.log({sidebar});


// sidebar: pastSearch = inputValue.value 
// key value in local storage = pastSearch : "" 


function createSidebar(){
    const newSideBar = {
    sidebar: [i++],

}

array.forEach(pastSearch => {
    let newItem = sidebar.value++
    document.appendChild(newItem);
    console.log(newSideBar);
    
});

createSidebar();
}


});


//sidebar for previous searched cities }
// const saveCities = (array) => {
//     window.localStorage.setItem('pastSearch', JSON.stringify(array))
// };


//const saveCityList = JSON.parse (window.localStorage.setItem('pastSearch')) || [];

//console.log(saveCityList);



//need to create 5 future dat forecasts 



//and figure out how to get icons from values 



