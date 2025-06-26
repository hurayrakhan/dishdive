import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash, FaHeart } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";
import Header from "../Components/Header/Header";
import { Link } from "react-router";
import { Fade } from "react-awesome-reveal";
import Footer from "../Components/Footer";

export default function MyRecipes() {
    const { user } = useContext(AuthContext);
    const [recipes, setRecipes] = useState([]);
    const [editingRecipe, setEditingRecipe] = useState(null);


    useEffect(() => {
        if (user?.email) {
            fetch(`https://assignment-10-server-lime-beta.vercel.app/recipes?user=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setRecipes(data)
                })
                .catch(err => console.error("Error loading recipes:", err));
        }
    }, [user]);

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this recipe?")) {
            fetch(`https://assignment-10-server-lime-beta.vercel.app/recipes/${id}`, {
                method: "DELETE",
            })
                .then(() => setRecipes(prev => prev.filter(r => r._id !== id)))
                .catch(err => console.error("Delete error:", err));
        }
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const updated = {
            title: form.title.value,
            image: form.image.value,
            ingredients: form.ingredients.value,
            instructions: form.instructions.value,
            cuisine: form.cuisine.value,
            prepTime: form.prepTime.value,
            category: form.category.value,
        };

        fetch(`https://assignment-10-server-lime-beta.vercel.app/recipes/${editingRecipe._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated),
        })
            .then(() => {
                setRecipes(prev => prev.map(r => r._id === editingRecipe._id ? { ...r, ...updated } : r));
                setEditingRecipe(null);
            })
            .catch(err => console.error("Update error:", err));
    };

    return (
        <div>
            <Header>
                <div className="bg-gray-50 min-h-screen px-4 py-10">
                    <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">My Recipes</h1>

                    {
                        recipes.length === 0 ? <div className="flex flex-col items-center mx-auto justify-center h-[80vh] text-center bg-gray-50 px-4">
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">
                                You haven't added any recipes yet!
                            </h1>
                            <p className="text-lg text-gray-600 mb-6">
                                Start sharing your delicious creations with others.
                            </p>
                            <Link
                                to="/addRecipe"
                                className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition"
                            >
                                ➕ Add Your First Recipe
                            </Link>
                        </div> : <Fade><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recipes.map((recipe) => (
                                <div
                                    key={recipe._id}
                                    className="group bg-white rounded-xl border border-gray-200 shadow hover:shadow-xl transition-shadow duration-300"
                                >
                                    <img
                                        src={recipe.image}
                                        alt={recipe.title}
                                        className="h-48 w-full object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="p-5">
                                        <h2 className="text-2xl font-semibold text-gray-900 mb-1">{recipe.title}</h2>
                                        <p className="text-gray-700 mb-1"><strong>Cuisine:</strong> {recipe.cuisine}</p>
                                        <p className="text-gray-700 mb-1"><strong>Prep Time:</strong> {recipe.prepTime} mins</p>
                                        <p className="text-gray-700 mb-1"><strong>Category:</strong> {recipe.category}</p>
                                        <p className="text-gray-700 mb-1"><strong>Likes:</strong> {recipe.likeCount} <FaHeart className="inline text-red-500" /></p>
                                        <p className="text-sm text-gray-600"><strong>Ingredients:</strong> {recipe.ingredients}</p>
                                        <p className="text-sm text-gray-600"><strong>Instructions:</strong> {recipe.instructions}</p>

                                        <div className="flex justify-end gap-2 mt-4">
                                            <button
                                                onClick={() => setEditingRecipe(recipe)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md text-sm flex items-center gap-1"
                                            >
                                                <FaEdit /> Update
                                            </button>
                                            <button
                                                onClick={() => handleDelete(recipe._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm flex items-center gap-1"
                                            >
                                                <FaTrash /> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div></Fade>
                    }

                    {editingRecipe && (
                        <div className="fixed inset-0 bg-slate-900 bg-opacity-40 z-50 flex justify-center items-center">
                            <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full relative">
                                <h2 className="text-2xl text-black font-bold mb-4 text-center">Update Recipe</h2>
                                <form onSubmit={handleEditSubmit} className="space-y-3 text-black">
                                    <input name="title" defaultValue={editingRecipe.title} required className="w-full border border-gray-300 px-3 py-2 rounded" />
                                    <input name="image" defaultValue={editingRecipe.image} required className="w-full border border-gray-300 px-3 py-2 rounded" />
                                    <input name="ingredients" defaultValue={editingRecipe.ingredients} required className="w-full border border-gray-300 px-3 py-2 rounded" />
                                    <input name="instructions" defaultValue={editingRecipe.instructions} required className="w-full border border-gray-300 px-3 py-2 rounded" />
                                    <input name="cuisine" defaultValue={editingRecipe.cuisine} className="w-full border border-gray-300 px-3 py-2 rounded" />
                                    <input name="prepTime" defaultValue={editingRecipe.prepTime} className="w-full border border-gray-300 px-3 py-2 rounded" />
                                    <input name="category" defaultValue={editingRecipe.category} className="w-full border border-gray-300 px-3 py-2 rounded" />
                                    <div className="flex justify-end gap-3 pt-4">
                                        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setEditingRecipe(null)}
                                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
                <Footer></Footer>
            </Header>

        </div>
    );
}