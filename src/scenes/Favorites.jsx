import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';

import { delFav } from '../utils/redux/favorites';

const Favorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { favorites } = useSelector((state) => state.favorites);

  const handleDelFav = (i) => {
    dispatch(delFav(i));
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    const updateFavorites = favorites.filter((fav) => fav.name !== i.name);
    localStorage.setItem('favorites', JSON.stringify(updateFavorites));
  };

  return (
    <section className="flex sm:flex-row flex-col mt-20 p-5 gap-2">
      {favorites?.map((item, index) => (
        <div
          key={index}
          className="transition ease-in-out duration-300 rounded-lg flex p-5 text-[16px] justify-start items-center cursor-pointer hover:bg-indigo-600"
        >
          <p onClick={() => navigate(`/track/${item.name}`)} className="px-5 text-[24px] font-bold">
            <div className="flex items-center justify-between w-[280px] border-b-2">
              {item.name}
            </div>
            <div className="font-normal text-[16px] text-[violet]">{item.artist}</div>
          </p>
          <span>
            {favorites.find((i) => i.name === item.name) && (
              <AiFillStar onClick={() => handleDelFav(item)} size={24} className="transition ease-in-out duration-300 text-[cyan] hover:text-white" />
            )}
          </span>
        </div>
      ))}
    </section>
  );
};

export default Favorites;