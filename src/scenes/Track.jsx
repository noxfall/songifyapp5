import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSelected } from '../utils/redux/search';

const Track = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const { id } = useParams();

  useEffect(() => {
    search.selected.length && dispatch(fetchSelected(id));
  }, []);

  return (
    <section>
      <div>GIF</div>
      <div>
        {search.selected && (
          <article>
            <h1>{search.selected.name} by {search.selected.artist}</h1>
          </article>
        )}
      </div>
    </section>
  );
};

export default Track;