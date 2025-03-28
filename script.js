const searchbtn=document.querySelector("#searchbtn");
const Home=document.querySelector("#Home");
const searchbox=document.querySelector("#searchbar");
const recipecont=document.querySelector(".recipes");
const recipedetailscontent=document.querySelector(".recipedetailcontent");
const recipeclosebtn=document.querySelector("#recipeclosebtn");
const openpopup=(meal)=>{
  recipedetailscontent.parentElement.style.display="block";

  recipedetailscontent.innerHTML=`

    <h2 id="recipeName">${meal.strMeal}</h2>
    <h3 id="IngredientList">Ingredients:</h3>
    ${fetchIngredients(meal)}
    <h3 class="Instructions">Instructions:</h3>
    <p class="Instructions">${meal.strInstructions}</p>
  `
  
}

const fetchIngredients=(meal)=>{
   let content="<ul>";
  for(let i=1;i<=20;i++){
    const ingred = meal[`strIngredient${i}`];
    if(ingred){
      const measure = meal[`strMeasure${i}`];
      content+=`<li>${measure} ${ingred}</li>`;
    }
    else break;

  }
  content+=`</ul>`
  return content;
}
const fetchRecipe= async (inputquery)=>{
  recipecont.innerHTML="<h2>Fetching Recipes...</h2>";
  const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputquery}`);
  // if(!data.ok){
  //   console.log("hello");
  //   recipecont.innerHTML=`
  //   <h3>Sorry.. no items match your search</h3>
  // ` 
  // }
  const response=await data.json();
  recipecont.innerHTML=""
  // console.log(typeof(response));
  if(response.meals){
    response.meals.forEach(meals=>{
      flag=true;
      const newrecipe=document.createElement('div');
      newrecipe.classList.add('newrecipe');
      newrecipe.innerHTML=`
        <img src="${meals.strMealThumb}">
        <h3>${meals.strMeal}</h3>
        <p>${meals.strArea}</p>
        <p>${meals.strCategory}</p>
      `
      const viewrec=document.createElement('button');
      viewrec.textContent="View Recipe";
      newrecipe.appendChild(viewrec);
      
      viewrec.addEventListener('click',()=>{
        openpopup(meals);
      })

      recipecont.appendChild(newrecipe);
    });
  }
  else{
    recipecont.innerHTML=`<h2>Sorry.. No items match your search. Try searching other food recipes.</h2>`
  }

  // console.log(response.meals);

}

searchbtn.addEventListener('click',(event)=>{

  event.preventDefault();
  recipedetailscontent.parentElement.style.display="none";
  const searchinput=searchbox.value.trim();
  if(!searchinput){
    recipecont.innerHTML=`
      <h2>Type the meal in the search box</h2>
    `
  }
  else{
    fetchRecipe(searchinput);
  }
  // console.log(searchinput);
  
 
  // console.log(searchbox.value);
  
})
recipeclosebtn.addEventListener('click',()=>{
  recipedetailscontent.parentElement.style.display="none";
  console.log("close");
})
Home.addEventListener('click',()=>{
  recipedetailscontent.parentElement.style.display="none";

  recipecont.innerHTML="<h2>Search for your favourite recipes...</h2>";
})