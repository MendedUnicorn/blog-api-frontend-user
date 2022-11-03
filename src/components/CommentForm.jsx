import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import style from './CommentForm.module.css';

export const CommentForm = ({ updateParent }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const { id } = useParams();
  const [showForm, setShowForm] = useState(true);
  const [focus, setFocus] = useState();

  const handleChange = (e, set) => {
    e.preventDefault();
    set(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/posts/${id}/comments`, reqOpt)
      .then((response) => response.json())
      .then((data) => {
        console.log('new data ', data);
        updateParent();
      })
      .catch((err) => console.log(err));
    console.log(updateParent);
  };
  const toggleCommentForm = (e) => {
    e.preventDefault();
    setShowForm((prev) => !prev);
  };

  const reqOpt = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, text }),
  };
  const handleOnFocus = (e) => {
    console.log(e);
    setShowForm(true);
  };
  const handleOnBlur = (e) => {
    console.log(e);
    setShowForm(false);
  };

  return (
    <div className={style.form}>
      <form action=''>
        <input
          style={{ display: showForm ? 'block' : 'none' }}
          type='text'
          name='name'
          id='name'
          placeholder='Name'
          onChange={(e) => handleChange(e, setName)}
          value={name}
        />
        <textarea
          style={{ display: showForm ? 'block' : 'none' }}
          name='comment'
          id='comment'
          cols='30'
          rows='10'
          onChange={(e) => handleChange(e, setText)}
          value={text}
          placeholder='Write your comment...'
        ></textarea>

        <button type='submit' onClick={handleSubmit}>
          Post
        </button>
      </form>
    </div>
  );
};
