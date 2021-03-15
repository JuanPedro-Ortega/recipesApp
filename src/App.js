import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () =>{
//primero creamos las constantes con la ID y la KEY para la API que vamos a usar en el fetch
  const APP_ID = "b7bacfcc";
  const APP_KEY = "550b0ad792bd5a94f080698dbdd33c30";

  const [recipes, setRecipes]= useState([]);
  const [search, setSearch]= useState("");
  const [query, setQuery]= useState('chicken');

  
  useEffect(()=>{
    getRecipes();
  }, [query]);

  //aqui llamamos a la API 
  const getRecipes = async ()=>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  }

  //cuando escribamos algo en la barra va a darnos unos valores
  const updateSearch = e => {
    setSearch(e.target.value);
  }

  //creamos la constante para decir que nuestro formulario va a buscar algo en el input
  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
  }

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
     <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
    </div>

    </div>
  )

}


export default App;
