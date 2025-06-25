import React, { use, useState } from 'react';

import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import { Bounce, toast } from 'react-toastify';
import { AuthContext } from '../Provider/AuthProvider';

const AddRecipe = () => {
  const { user } = use(AuthContext);
  const { email, displayName } = user;
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    ingredients: '',
    instructions: '',
    cuisine: 'Italian',
    prepTime: '',
    categories: [],
    likeCount: 0,
  });

  const categoriesList = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Vegan'];

  const notify = () => toast.success('Recipe added successfully!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        categories: checked
          ? [...prev.categories, value]
          : prev.categories.filter((cat) => cat !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { likeCount, prepTime, cuisine, instructions, ingredients, title, image } = formData;
    console.log('Recipe submitted:', formData);

    const data = { image, likeCount, prepTime, cuisine, instructions, ingredients, title, email, displayName }
    // You can integrate with a backend here
    fetch('https://assignment-10-server-lime-beta.vercel.app/recipes', {

      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          notify()
          // Reset form state after successful submission
          setFormData({
            image: '',
            title: '',
            ingredients: '',
            instructions: '',
            cuisine: 'Italian',
            prepTime: '',
            categories: [],
            likeCount: 0,
          });
        }
      })
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[url(https://i.ibb.co/gFgdrMYG/bg1.webp)] bg-contain flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-black/30 backdrop-blur-xl border border-gray-800 rounded-3xl p-10 shadow-2xl transition-all duration-300 hover:scale-[1.01] relative">

        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 text-white hover:text-green-400 text-2xl flex items-center gap-2"
        >
          <AiOutlineArrowLeft />
          <span className="text-base font-semibold">Back</span>
        </button>

        <h2 className="text-4xl font-extrabold text-white text-center mb-8 drop-shadow-lg">Add a New Recipe</h2>

        <form onSubmit={handleSubmit} className="space-y-6 text-white">
          {/* Image URL */}
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            className="w-full p-3 rounded-xl bg-gray-800/60 focus:ring-2 ring-green-500 outline-none transition"
            value={formData.image}
            onChange={handleChange}
            required
          />

          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Recipe Title"
            className="w-full p-3 rounded-xl bg-gray-800/60 focus:ring-2 ring-green-500 outline-none transition"
            value={formData.title}
            onChange={handleChange}
            required
          />

          {/* Ingredients */}
          <textarea
            name="ingredients"
            placeholder="Ingredients"
            rows={3}
            className="w-full p-3 rounded-xl bg-gray-800/60 focus:ring-2 ring-green-500 outline-none transition"
            value={formData.ingredients}
            onChange={handleChange}
            required
          />

          {/* Instructions */}
          <textarea
            name="instructions"
            placeholder="Instructions"
            rows={4}
            className="w-full p-3 rounded-xl bg-gray-800/60 focus:ring-2 ring-green-500 outline-none transition"
            value={formData.instructions}
            onChange={handleChange}
            required
          />

          {/* Cuisine Dropdown */}
          <div>
            <label className="block mb-2 font-semibold">Cuisine Type</label>
            <select
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-gray-800/60 focus:ring-2 ring-green-500 outline-none transition"
            >
              <option>Italian</option>
              <option>Mexican</option>
              <option>Indian</option>
              <option>Chinese</option>
              <option>Others</option>
            </select>
          </div>

          {/* Preparation Time */}
          <input
            type="number"
            name="prepTime"
            placeholder="Preparation Time (minutes)"
            className="w-full p-3 rounded-xl bg-gray-800/60 focus:ring-2 ring-green-500 outline-none transition"
            value={formData.prepTime}
            onChange={handleChange}
            required
          />

          {/* Categories Checkboxes */}
          <div>
            <label className="block mb-2 font-semibold">Categories</label>
            <div className="flex flex-wrap gap-4">
              {categoriesList.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-2 bg-gray-700/40 px-4 py-2 rounded-lg hover:bg-green-500/20 transition cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name="categories"
                    value={category}
                    checked={formData.categories.includes(category)}
                    onChange={handleChange}
                    className="accent-green-500"
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          {/* Like Count - Read-only */}
          <div>
            <label className="block mb-2 font-semibold">Like Count</label>
            <input
              type="number"
              name="likeCount"
              value={formData.likeCount}
              readOnly
              className="w-full p-3 rounded-xl bg-gray-800/60 text-gray-400 cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-green-500/50"
          >
            Add Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
