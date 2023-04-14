import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchResults } from '../utils/redux/search';

const Home = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const { results } = useSelector((state) => state.search);

  useEffect(() => {
    searchTerm && dispatch(fetchResults(searchTerm));
  }, [searchTerm]);

  return (
    <section className="flex flex-col justify-center items-center h-screen">
      <div className="w-[360px]">
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
                  <div key={index}>{item.name}</div>
                ))}
              </div>
            ) : (
              <div><p>Track not found...</p></div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;