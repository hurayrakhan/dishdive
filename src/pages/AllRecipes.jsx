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

    return (
        <div>
            <Header />

            <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-12 px-6">
                <div className="max-w-10/12 mx-auto">
                    <h1 className="text-5xl font-bold text-center text-gray-800 mb-14">All Recipes</h1>

                    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {recipes.map((recipe) => (
                            <Fade key={recipe._id}>
                                <div
                                    className="relative bg-white h-[380px] rounded-3xl border border-gray-200 group overflow-hidden shadow-lg hover:shadow-blue-400 transition-all duration-500"
                                >
                                    {/* Image */}
                                    <div className="overflow-hidden">
                                        <img
                                            src={recipe.image}
                                            alt={recipe.title}
                                            onError={(e) => e.currentTarget.src = '/fallback-image.jpg'}
                                            className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>

                                    <div className="p-6">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{recipe.title}</h2>
                                        <p className="text-sm text-gray-500 mb-1">Cuisine: {recipe.cuisine}</p>
                                        <p className="text-sm text-gray-500">Prep Time: {recipe.prepTime} mins</p>
                                    </div>

                                    {/* Button group */}
                                    <div className="absolute bottom-4 right-4 flex flex-col items-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">

                                        {/* Like with count */}
                                        <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-md">
                                            <span className="text-md font-bold text-red-600">
                                                {recipe.likeCount}
                                            </span>
                                            <button
                                                onClick={() => handleLike(recipe._id)}
                                                title="Like"
                                                className={`p-3 rounded-full shadow-lg transition-all duration-300 ${likedIds.includes(recipe._id)
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-white text-red-500 hover:bg-red-100'
                                                    }`}
                                                aria-label="Like"
                                            >
                                                <FaHeart />
                                            </button>
                                        </div>

                                        {/* Wishlist */}
                                        <button
                                            onClick={() => toggleWishlist(recipe._id)}
                                            title="Add to Wishlist"
                                            className={`p-3 rounded-full shadow-lg transition-all duration-300 ${wishlist.includes(recipe._id)
                                                ? 'bg-yellow-400 text-white'
                                                : 'bg-white text-yellow-500 hover:bg-yellow-100'
                                                }`}
                                            aria-label="Add to Wishlist"
                                        >
                                            <FaStar />
                                        </button>

                                        {/* Details */}
                                        <button
                                            onClick={() => navigate(`/recipes/${recipe._id}`)}
                                            title="View Details"
                                            className="p-3 rounded-full shadow-lg bg-white text-blue-500 hover:bg-blue-100 transition-all duration-300"
                                            aria-label="View Details"
                                        >
                                            <FaInfoCircle />
                                        </button>
                                    </div>
                                </div>
                            </Fade>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllRecipes;
