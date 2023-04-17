import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input } from '@material-tailwind/react';

import { fetchResults, select } from '../utils/redux/search';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { results } = useSelector((state) => state.search);

  useEffect(() => {
    searchTerm && dispatch(fetchResults(searchTerm));
  }, [searchTerm]);

  const handleClick = (item) => {
    dispatch(select(item));
    navigate(`/track/${item.name}`);
  };

  return (
    <section className={`flex flex-col sm:justify-center justify-start items-center h-screen`}>
      <div className="sm:w-[360px] w-full">
        <Input
          type="text"
          placeholder="Search..."
          variant="standard"
          className="h-[36px] text-[26px] w-full min-w-[360px]"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <div className="flex flex-col items-center justify-center min-w-[360px] w-full">
            {results.length != 0 ? (
              <div className="max-h-[400px] overflow-auto w-full">
                {results.track.map((item, index) => (
                  <div
                    key={index}
                    className="transition ease-in-out duration-300 hover:bg-indigo-300 cursor-pointer py-4 px-2 rounded-lg sm:text-[18px] text-[18px]"
                    onClick={() => handleClick(item)}
                  >
                    {item.name} by <span className="font-bold text-[#A70984]">{item.artist}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div>Track not found...</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;