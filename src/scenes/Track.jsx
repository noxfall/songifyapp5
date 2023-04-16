import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

import { fetchSelected } from '../utils/redux/search';
import { fetchGifs } from '../utils/redux/gif';
import { fetchLyricsID, fetchLyrics } from '../utils/redux/lyrics';
import { fetchSong } from '../utils/redux/song';
import { addFav, delFav } from '../utils/redux/favorites';

const Track = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const { id } = useParams();
  const [currGif, setCurrGif] = useState(null);
  const gifs = useSelector((state) => state.gif);
  const { lyricsID } = useSelector((state) => state.lyrics);
  const { lyrics } = useSelector((state) => state.lyrics);
  const [commonWord, setCommonWord] = useState('');
  const { song } = useSelector((state) => state.song);
  const { favorites } = useSelector((state) => state.favorites);

  useEffect(() => {
    search.selected.length && dispatch(fetchSelected(id));

  }, []);

  useEffect(() => {
    if (Object.keys(search.selected).length) {
      dispatch(fetchGifs(search.selected.name + ' ' + commonWord));
      dispatch(fetchLyricsID(search.selected.name + '+' + search.selected.artist));
      dispatch(fetchSong(search.selected.name));
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

  useEffect(() => {
    const wordList = lyrics?.lyrics_body?.substring(0, lyrics.lyrics_body.length - 57).split(' ');
    let mf = 1;
    let m = 0;
    for (let i in wordList) {
      for (let j in wordList) {
        if (wordList[i] === wordList[j]) m++;
        if (mf < m) {
          mf = m;
          setCommonWord(wordList[i]);
        }
      }
      m = 0;
    }
    console.log(commonWord);
  }, [lyrics, lyricsID]);

  const handleAddFav = (i) => {
    dispatch(addFav(i));
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    favorites ? localStorage.setItem('faavorites', JSON.stringify([...favorites, i])) : localStorage.setItem('favorites', JSON.stringify([i]));
  };

  const handleDelFav = (i) => {
    dispatch(delFav(i));
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    const updateFavorites = favorites.filter((fav) => fav.name !== i.name);
    localStorage.setItem('favorites', JSON.stringify(updateFavorites));
  };

  return (
    <section className="flex sm:flex-row flex-col justify-center h-screen">
      {search.selected && (
        <article className="flex sm:flex-row flex-col justify-center items-center w-full">
          <figure className="flex flex-col justify-center items-center w-full">
            <h4 className="text-[24px]">Keywords:
              <span className="text-[purple] font-bold"> {commonWord} | {search.selected.name} | {search.selected.artist}</span></h4>
            {gifs.gifs.length ? (
              <img
                src={gifs.gifs[currGif]?.images?.downsized.url}
                alt="gif"
                className="sm:w-[480px] w-full h-[400px] object-contain"
              />
            ) : (
              <div>Loading...</div>
            )}
          </figure>
          <figure className="flex justify-start flex-col w-full border-l-[1px] border-[cyan] h-[360px] sm:px-10 px-2">
            <div className="flex justify-start border-b-[1px] border-[cyan] mb-2 items-center">
              <h1 className="text-[#A70984]">{search.selected.name}</h1>
              <span className="px-20">
                {favorites.find((i) => i.name === search.selected.name) ? (
                  <AiFillStar
                    className="transition ease-in-out duration-300 text-[cyan] hover:text-white cursor-pointer"
                    size={32}
                    onClick={() => handleDelFav(search.selected)}
                  />
                ) : (
                  <AiOutlineStar
                    className="transition ease-in-out duration-300 text-[white] hover:text-[cyan] cursor-pointer"
                    size={32}
                    onClick={() => handleAddFav(search.selected)}
                  />
                )}
              </span>
            </div>
            <ReactPlayer url={song} playing loop />
            <h4 className="py-2">Artist: <strong>{search.selected.artist}</strong></h4>
            <h4 className="py-1">Listeners: <strong>{search.selected.listeners}</strong></h4>
            <h4 className="py-1"><a href={search.selected.url} target="_blank">LastFM</a></h4>
            <h4 className="text-[18px] text-[cyan] border-b-[1px] border-[#A70984] w-[360px]">Lyrics </h4>
            <p className="w-[320px] py-2">{lyrics?.lyrics_body}</p>

          </figure>
        </article>
      )}
    </section>
  );
};

export default Track;