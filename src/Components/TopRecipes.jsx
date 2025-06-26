import { useEffect, useState } from "react";
import { Fade, Flip, Slide } from "react-awesome-reveal";
import { useNavigate } from "react-router";

export default function TopRecipes() {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://assignment-10-server-lime-beta.vercel.app/recipes/top/top-liked")
            .then(res => res.json())
            .then(data => setRecipes(data));
    }, []);

    return (
        <div className="bg-gray-50">
            <section className="py-12 px-4 w-10/12 mx-auto bg-gray-50 rounded-xl">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
                    Top Recipes
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recipes.map(recipe => (
                        <Fade 
                            key={recipe._id}>
                            <div
                            className="bg-white rounded-2xl shadow border border-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                        >
                            <div className="overflow-hidden rounded-t-2xl">
                                <img
                                    src={recipe.image || "https://via.placeholder.com/400x250?text=No+Image"}
                                    alt={recipe.title}
                                    className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                    {recipe.title}
                                </h3>
                                <p className="text-gray-600 mb-1">
                                    <strong>Cuisine:</strong> {recipe.cuisine || "Unknown"}
                                </p>
                                <p className="text-gray-600 mb-4">
                                    <strong>👍 Likes:</strong> {recipe.likeCount || 0}
                                </p>
                                <button
                                    onClick={() => navigate(`/recipes/${recipe._id}`)}
                                    className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                        </Fade>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button
                        onClick={() => navigate("/allRecipes")}
                        className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition"
                    >
                        See All Recipes
                    </button>
                </div>
            </section>
        </div>
    );
}
