import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSelected } from '../utils/redux/search';
import { fetchGifs } from '../utils/redux/gif';
import { fetchLyricsID, fetchLyrics } from '../utils/redux/lyrics';

const Track = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const { id } = useParams();
  const [currGif, setCurrGif] = useState(null);
  const gifs = useSelector((state) => state.gif);
  const { lyricsID } = useSelector((state) => state.lyrics);
  const { lyrics } = useSelector((state) => state.lyrics);

  useEffect(() => {
    search.selected.length && dispatch(fetchSelected(id));

  }, []);

  useEffect(() => {
    if (Object.keys(search.selected).length) {
      dispatch(fetchGifs(search.selected.name));
      dispatch(fetchLyricsID(search.selected.name));
    }

  }, [search.selected]);

  useEffect(() => {
    lyricsID && dispatch(fetchLyrics(lyricsID))
  }, [lyricsID])

  useEffect(() => {
    gifs.gifs.length > 0 && setTimeout(() => {
      setCurrGif((prev) => (prev + 1) % gifs.gifs.length);
    }, 5000);
    clearTimeout();
  }, [gifs, currGif]);

  return (
    <section className="flex justify-center items-center h-screen">
      {search.selected && (
        <article className="flex sm:flex-row flex-col justify-center items-center w-full">
          <figure className="flex justify-center items-center w-full">
            {gifs.gifs.length ? (
              <img
                src={gifs.gifs[currGif]?.images?.downsized.url}
                alt="gif"
                className="w-[360px] h-[360px] object-contain"
              />
            ) : (
              <div>Loading...</div>
            )}
          </figure>
          <figure className="flex justify-start flex-col w-full border-l-2 h-[360px] px-10">
            <h1>{search.selected.name}</h1>
            <h4>Artist: {search.selected.artist}</h4>
            <h4>Listeners: {search.selected.listeners}</h4>
            <h4><a href={search.selected.url} target="_blank">LastFM</a></h4>
            <p>{lyrics?.lyrics?.lyrics_body}</p>
          </figure>
        </article>
      )}
    </section>
  );
};

export default Track;