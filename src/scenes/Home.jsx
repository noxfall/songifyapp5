import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
    <section className="flex flex-col sm:justify-center justify-start items-center h-screen">
      <div className="sm:w-[360px] w-full">
        <input
          type="text"
          placeholder="Search..."
          className="h-[36px] p-5 text-[24px] w-full min-w-[360px]"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <div className="flex flex-col items-center justify-center min-w-[360px] w-full">
            {results.length != 0 ? (
              <div className="max-h-[400px] overflow-auto w-full">
                {results.track.map((item, index) => (
                  <div
                    key={index}
                    className="hover:bg-gray-600 cursor-pointer sm:p-4 p-4 sm:text-[14px] text-[18px]"
                    onClick={() => handleClick(item)}
                  >
                    {item.name} by {item.artist}
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