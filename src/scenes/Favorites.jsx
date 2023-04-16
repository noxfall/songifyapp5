import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

import { addFav, delFav } from '../utils/redux/favorites';

const Favorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { favorites } = useSelector((state) => state.favorites);

  const handleAddFav = (i) => {
    dispatch(addFav(i));
    const favorites = JSON.parse(localStorage.getItem('favorites'));

    favorites ? localStorage.setItem('favorites', JSON.stringify([...favorites, i])) : localStorage.setItem('favorites', JSON.stringify([i]));
  };

  const handleDelFav = (i) => {
    dispatch(delFav(i));
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    const updateFavorites = favorites.filter((fav) => fav.name !== i.name);
    localStorage.setItem('favorites', JSON.stringify(updateFavorites));
  };

  return (
    <section className="mt-10">
      {favorites?.map((item, index) => (
        <div
          key={index}
          className="flex p-10 text-[16px] justify-start items-center cursor-pointer"
        >
          <p onClick={() => navigate(`/track/${item.name}`)} className="px-16 text-[24px]">{item.name} by {item.artist}</p>
          <span>
            {favorites.find((i) => i.name === item.name) && (
              <AiFillStar onClick={() => handleDelFav(item)} size={24} />
            )}
          </span>
        </div>
      ))}
    </section>
  );
};

export default Favorites;