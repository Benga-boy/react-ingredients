import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';
import LoadingIndicator from '../UI/LoadingIndicator'

const IngredientForm = React.memo(props => {
  const [ingredient, setIngredient] = useState({title: '', amount: ''})

  const handleInputChange = e => {
    setIngredient({...ingredient, [e.target.name]: e.target.value})
  }



  const submitHandler = event => {
    event.preventDefault()
    props.addIngredient(ingredient)
    setIngredient({title: '', amount: ''})
  }


  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" value={ingredient.title} onChange={handleInputChange} />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" name="amount" value={ingredient.amount} onChange={handleInputChange} />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading ? <LoadingIndicator /> : null}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
