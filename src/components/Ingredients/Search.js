import React, { useEffect, useState, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const {onLoadIngs} = props
  const [text, setText] = useState('')
  const inputRef = useRef()

  const handleChange = e => {
    setText(e.target.value)
  }


  useEffect(() => {
    const storedIg = localStorage.getItem('Ingredients')
    const timer = setTimeout(() => {
      if (text === inputRef.current.value && text.trim() !== '') { 
        onLoadIngs(JSON.parse(storedIg).filter(ing => ing.title.toLowerCase() === text))
      }
    }, 1000);
    return () => {
      clearTimeout(timer)
    }
  }, [onLoadIngs, text])



  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input ref={inputRef} type="text" value={text} onChange={handleChange} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
