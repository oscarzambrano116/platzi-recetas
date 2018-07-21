import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import mealdb from '../mealdb-api'
import RecipeIngredients from '../components/RecipeIngredients'
import RecipeInstructions from '../components/RecipeInstructions'

class Recipe extends Component {

  constructor(props) {
    super(props)
    this.state = {
      recipe: null,
      isLoading: true,
    };
  }

  async componentDidMount() {
    let recipe;
    const {
      match: {
        params: {
          recipeId,
        },
      },
    } = this.props;

    try {
      recipe = await mealdb.getRecipe(recipeId);
    } catch(e) {
      recipe = null;
    }
    this.setState({
      recipe,
      isLoading: false,
    });
  }

  render() {
    const {
      recipe,
      isLoading,
    } = this.state

    if( isLoading ) {
      return (
        <div className="message">{'Cargando...'}</div>
      );
    }

    if(!recipe) {
      return (
        <div className="message">{'Hubo un problema!'}</div>
      );
    }

    const {
      name,
      thumbnail,
      origin,
      ingredients,
      instructions,
    } = recipe;

    return (
      <div className="Recipe">
        <Helmet>
          <title>{name}</title>
        </Helmet>
        <div className="hero" style={{ backgroundImage: `url(${thumbnail})` }} />
        <div className="title">
          <div className="info">
            <h1>{name}</h1>
            <p>{origin}</p>
          </div>
        </div>
        <RecipeIngredients ingredients={ingredients} />
        <RecipeInstructions instructions={instructions} />
      </div>
    );
  }
}

export default Recipe;
