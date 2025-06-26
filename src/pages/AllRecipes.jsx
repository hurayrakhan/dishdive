import React, { useState } from 'react';
import { FaHeart, FaStar, FaInfoCircle } from 'react-icons/fa';
import Header from '../Components/Header/Header';
import { useLoaderData, useNavigate } from 'react-router';
import { Fade } from 'react-awesome-reveal';

const AllRecipes = () => {
  const initialRecipes = useLoaderData();
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState(initialRecipes);
  const [likedIds, setLikedIds] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [gridView, setGridView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const recipesPerPage = 12;

  const handleLike = (id) => {
    setRecipes((prev) =>
      prev.map((r) =>
        r._id === id
          ? {
              ...r,
              likes: likedIds.includes(id) ? r.likes - 1 : r.likes + 1,
            }
          : r
      )
    );
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredRecipes = recipes
    .filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((recipe) =>
      selectedCuisine ? recipe.cuisine === selectedCuisine : true
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.prepTime - b.prepTime;
      if (sortOrder === 'desc') return b.prepTime - a.prepTime;
      return 0;
    });

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  const indexOfLast = currentPage * recipesPerPage;
  const indexOfFirst = indexOfLast - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirst, indexOfLast);

  const paginate = (page) => setCurrentPage(page);
  const goPrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              i === currentPage ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            {i}
          </button>
        );
      } else if (
        (i === currentPage - 2 || i === currentPage + 2) &&
        i !== 1 &&
        i !== totalPages
      ) {
        pages.push(
          <span key={`dots-${i}`} className="px-2 text-gray-500">
            ...
          </span>
        );
      }
    }
    return pages;
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-12 px-6">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
            All Recipes
          </h1>

          {/* Controls */}
          <div className="flex flex-wrap items-center mb-8 gap-4">
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="px-4 py-2 border border-gray-300 text-black rounded-lg shadow-sm"
            >
              <option value="">All Cuisines</option>
              {[...new Set(initialRecipes.map((r) => r.cuisine))].map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 flex-1 text-black rounded-lg shadow-sm w-64"
            />

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-2 border border-gray-300 text-black rounded-lg shadow-sm"
            >
              <option value="">Sort by Prep Time</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>

            <button
              onClick={() => setGridView(!gridView)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
            >
              {gridView ? 'List View' : 'Grid View'}
            </button>
          </div>

          {/* Recipes */}
          <div className={`${gridView ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8' : 'flex flex-col gap-6'}`}>
            {currentRecipes.map((recipe) => (
              <Fade key={recipe._id}>
                <div className={`relative bg-white rounded-3xl border border-gray-200 group overflow-hidden shadow-md hover:shadow-blue-400 transition-all duration-500 ${gridView ? 'h-[380px]' : 'flex h-[280px]'}`}>
                  <div className={`${gridView ? '' : 'w-1/3'}`}>
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      onError={(e) => (e.currentTarget.src = '/fallback-image.jpg')}
                      className={`${
                        gridView ? 'w-full h-56 object-cover' : 'w-full h-full object-cover'
                      } transform group-hover:scale-105 transition-transform duration-500`}
                    />
                  </div>

                  <div className={`p-6 ${gridView ? '' : 'w-2/3'}`}>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">{recipe.title}</h2>
                    <p className="text-sm text-gray-500 mb-1">Cuisine: {recipe.cuisine}</p>
                    <p className="text-sm text-gray-500">Prep Time: {recipe.prepTime} mins</p>
                  </div>

                  <div className="absolute bottom-4 right-4 flex flex-col items-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-md">
                      <span className="text-md font-bold text-red-600">{recipe.likeCount}</span>
                      <button
                        onClick={() => handleLike(recipe._id)}
                        className={`p-2 rounded-full shadow transition-all duration-300 ${
                          likedIds.includes(recipe._id) ? 'bg-red-500 text-white' : 'bg-white text-red-500 hover:bg-red-100'
                        }`}
                      >
                        <FaHeart />
                      </button>
                    </div>
                    <button
                      onClick={() => toggleWishlist(recipe._id)}
                      className={`p-2 rounded-full shadow transition-all duration-300 ${
                        wishlist.includes(recipe._id) ? 'bg-yellow-400 text-white' : 'bg-white text-yellow-500 hover:bg-yellow-100'
                      }`}
                    >
                      <FaStar />
                    </button>
                    <button
                      onClick={() => navigate(`/recipes/${recipe._id}`)}
                      className="p-2 rounded-full shadow bg-white text-blue-500 hover:bg-blue-100 transition-all duration-300"
                    >
                      <FaInfoCircle />
                    </button>
                  </div>
                </div>
              </Fade>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center items-center gap-2">
            <button onClick={goPrev} disabled={currentPage === 1} className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50">Previous</button>
            {renderPageNumbers()}
            <button onClick={goNext} disabled={currentPage === totalPages} className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRecipes;
