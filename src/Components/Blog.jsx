// src/Pages/Blog.jsx
import React from 'react';
import { useNavigate } from 'react-router';

const blogData = [
  {
    id: 1,
    title: '5 Quick Tips for Perfect Pasta',
    description: 'Learn quick tricks to make your pasta perfectly al dente every time. These tips are simple, fast, and super effective for any home cook.',
    image: 'https://i.ibb.co/3yQS7p7V/Gemini-Generated-Image-27ydi427ydi427yd.png',
    date: '2025-06-26',
    author: 'Chef Amina'
  },
  {
    id: 2,
    title: 'Top 10 Healthy Ingredients You Should Use More',
    description: 'Boost your daily meals with these superfoods and healthy ingredients that add flavor, nutrition, and balance to your cooking.',
    image: 'https://i.ibb.co/ZR9nNrHs/Gemini-Generated-Image-woco5hwoco5hwoco.png',
    date: '2025-06-20',
    author: 'DishDive Team'
  },
  {
    id: 3,
    title: 'Why Your Baking Fails (And How to Fix It)',
    description: 'From flat cakes to hard cookies, we’ve all been there. Let’s solve your most common baking issues with simple science-backed fixes.',
    image: 'https://i.ibb.co/zqWKVxC/Gemini-Generated-Image-u5w91qu5w91qu5w9.png',
    date: '2025-06-15',
    author: 'Chef Nayeem'
  }
];

const Blog = () => {
  const navigate = useNavigate();

  const handleReadMore = (id) => {
    const blog = blogData.find(b => b.id === id);
    if (blog) {
      navigate(`/blog/${id}`, { state: blog });
    }
  };

  return (
    <div className="max-w-7xl bg-white mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-10">DishDive Blog</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogData.map(blog => (
          <div key={blog.id} className="bg-white rounded-xl shadow hover:shadow-green-300 transition duration-300 overflow-hidden flex flex-col">
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-xl font-bold text-green-600 mb-1">{blog.title}</h2>
              <p className="text-sm text-gray-500 mb-2">{blog.date} · {blog.author}</p>
              <p className="text-gray-700 mb-4 flex-grow">{blog.description.slice(0, 120)}...</p>
              <button
                onClick={() => handleReadMore(blog.id)}
                className="mt-auto self-start btn btn-outline text-green-600  rounded hover:bg-green-700 hover:text-white transition "
              >
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
