import React, { useEffect, useState, useCallback, useReducer, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';
// import ErrorModal from '../UI/ErrorModal'

const ingReducer = (currentIng, action) => {
  switch(action.type) {
    case 'SET':
      return action.payload
    case 'ADD':
      return [...currentIng, {id: Math.random().toString(), ...action.payload}]
    case 'DELETE':
      return currentIng.filter(ing => ing.id !== action.payload)
    default:
      return currentIng
  }
}

function Ingredients() {
  const [ingState, dispatch] = useReducer(ingReducer, [])
  const [loading, setLoading] = useState(false)
  // const [error, setError] = useState(null)

  useEffect(() => {
    const storedIg = localStorage.getItem('Ingredients')
    dispatch({type: 'SET', payload: JSON.parse(storedIg)})
  }, [])

  const filteredIngHandler = useCallback(filteredIng => {
    dispatch({type: 'SET', payload: filteredIng})
  }, [])

  const addIngredient = useCallback(ingredient => {
    setLoading(true)
    dispatch({type: 'ADD', payload: ingredient})
    localStorage.setItem('Ingredients', JSON.stringify(ingState))
    setLoading(false)
  }, [ingState])
  

  const removeIngredient = useCallback(id => {
    const storedIng = localStorage.getItem('Ingredients')
    dispatch({type: 'DELETE', payload: id})
    localStorage.setItem('Ingredients', JSON.stringify(JSON.parse(storedIng).filter(ing => ing.id !== id)))
  }, [])

  const ingredientList = useMemo(() => {
    return (
      <IngredientList ingredients={ingState} onRemoveItem={removeIngredient} />
    )
  }, [ingState, removeIngredient])

  return (
    <div className="App">
      <IngredientForm addIngredient={addIngredient} loading={loading} />

      <section>
        <Search onLoadIngs={filteredIngHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
