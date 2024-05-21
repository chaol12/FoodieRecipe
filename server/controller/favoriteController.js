const recipeModal = require("../models/favoriteSchema");
require("dotenv").config();

const postFavorite = async (req, res) => {
  const { userId, recipe } = req.body;

  const NewRecipe = new recipeModal({
    userId,
    recipeUid:recipe?.id,
    recipe,
  });

  try {
    await NewRecipe.save();
    res.status(201).send("Recipe saved successfully");
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).send("Error saving recipe");
  }
};

const getFavorite = async (req,res) =>{
    const {userId} = req.body;

    try{
        const recipes = await recipeModal.find(userId).sort({ createdAt: -1 }).select("recipe");
        if (!recipes.length) {
            return res.status(404).send('No recipes found');
          }
          res.status(200).json(recipes);
    }catch(e){
        console.error('Error fetching recipes:', error);
        res.status(500).send('Error fetching recipes');
    }
}

module.exports = {
  postFavorite,
  getFavorite
};
