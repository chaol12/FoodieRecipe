import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchDetail from "./SearchDetail";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [data, setData] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/recipes/search?searchTerm=${searchTerm}&cuisine=${searchCuisine}`
      );
      console.log(response.data.results);
      setData(response.data.results);
    } catch (error) {
      console.error("Error fetching recipes:", error.message);
    }
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchCuisineChange = (event) => {
    setSearchCuisine(event.target.value);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleNumerofResult = async (e) => {
    fetchRecipes();
    e.preventDefault();
  };

  const openDetail = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeDetail = () => {
    setSelectedRecipe(null);
  };

  // Function to strip HTML tags
  const stripHtmlTags = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  };

  return (
    <>
      <div style={{ marginTop: "90px", textAlign: "center" }}>
        <form>
          <input
            style={{ margin: "3px" }}
            type="text"
            value={searchTerm}
            placeholder="Search by Term"
            autoComplete="off"
            onChange={handleSearchTermChange}
          />
          <input
            style={{ margin: "3px" }}
            type="text"
            value={searchCuisine}
            placeholder="Search by Cuisine"
            autoComplete="off"
            onChange={handleSearchCuisineChange}
          />
          <button type="submit" onClick={handleNumerofResult}>
            Search
          </button>
        </form>
        {data &&
          data.map((recipes) => {
            return (
              <div key={recipes.id}>
                <p>{recipes.title}</p>
                <img src={recipes.image} alt={recipes.title}></img>
                <p>
                  <button onClick={() => openDetail(recipes)}>Detail</button>
                </p>
              </div>
            );
          })}
      </div>
      {selectedRecipe && (
        <SearchDetail
          selectedRecipe={selectedRecipe}
          onClose={closeDetail}
          stripHtmlTags={stripHtmlTags}
        />
      )}
    </>
  );
}

export default Search;
