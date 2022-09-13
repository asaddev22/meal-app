const container=
document.querySelector('.container');
const form = document.querySelector('.form'),
input = form.querySelector('#input'),
search = form.querySelector('.search'),
random = document.querySelector('.random'),
mealsEl = document.querySelector('.meals'),
mealsImg = document.querySelector('.meal-image')
showError = document.querySelector('.show-error')
displayRand = document.querySelector('.random-show');


//Calling Data Through Search Meal API
const callingData = async (text) => {

const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`);

const data = await response.json();
return data;

}


//Meals By Search
const searchMeal = async ()=>{

const text = input.value;
const getData = await callingData(text);

//Checking to see if the user typed some input or not.
if (getData.meals === null || undefined) {
showError.innerHTML = `Nothing to show here`
}

else{
mealsEl.innerHTML = getData.meals.map(meal => 
    `<div class="meal">Name: </span>${meal.strMeal}</div>
    <img class = "meal-img" src="${meal.strMealThumb}"></img>
      `);
       //   meals.filter(item => !item.textContent.includes(text)).forEach(item => {
        //     item.classList.add('filtered');
        //   });
   }

};

//Calling Data Through Random Meal API
const randomMeal = async ()=>{
const responseRandom = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
const dataRandom = await responseRandom.json()
return dataRandom;
};


//Displaying Random Meals
const displayUI = async () =>{
const getRand = await randomMeal();

displayRand.innerHTML =  ` <div class = rand-contain><div class="rand-heading"><h2>Random Meal:</h2></div>
<div class = "rand-meal">${getRand.meals[0].strMeal}</div>
<img class = "meal-img" id = "rand-img" src="${getRand.meals[0].strMealThumb}"></img>
</div> `
};

//Requesting Random Meal By A Click
random.addEventListener('click', ()=>{
randomMeal().then(dataRandom => displayUI(dataRandom)).catch(errRand => console.log(errRand));
});

//Submitting Search Meal
form.addEventListener('submit', async (e)=>{
e.preventDefault();

callingData().then((data)=>{
    searchMeal(data);
});

});

