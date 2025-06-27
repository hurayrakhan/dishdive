// src/Pages/Blog.jsx
import React from 'react';
import { useNavigate } from 'react-router';

const blogData = [
  {
    id: 1,
    title: '5 Quick Tips for Perfect Pasta',
    description: "Cooking pasta may seem simple, but getting it just right—that perfect al dente texture—can elevate any dish from good to unforgettable. In this blog, we’re diving into five incredibly easy but powerful tips that every home cook should know. From choosing the right pot size and water ratio to understanding salt levels and timing, these techniques are designed to save you time while improving flavor and texture.Whether you're preparing a quick weekday dinner or impressing guests with your signature pasta recipe, mastering these tricks will help you avoid sticky strands, mushy noodles, or undercooked centers. We’ll also share chef-approved secrets to enhance your pasta sauces and finish dishes like a pro. Simple, fast, and super effective—this guide is your shortcut to pasta perfection every time you cook.",
    image: 'https://i.ibb.co/3yQS7p7V/Gemini-Generated-Image-27ydi427ydi427yd.png',
    date: '2025-06-26',
    author: 'Chef Amina'
  },
  {
    id: 2,
    title: 'Top 10 Healthy Ingredients You Should Use More',
    description: "Looking to make your meals healthier without sacrificing flavor? This blog is your go-to guide for upgrading everyday cooking with nutritious, flavorful ingredients that pack a serious health punch. We’ve curated a list of 10 powerful superfoods and clean-eating staples that not only elevate the taste of your dishes but also support overall well-being.From versatile leafy greens and ancient grains to plant-based proteins and heart-friendly oils, each ingredient we highlight brings its own unique benefits—be it boosting immunity, improving digestion, supporting heart health, or enhancing energy levels. You’ll discover how to seamlessly incorporate these wholesome options into breakfast, lunch, dinner, and even snacks without feeling like you're on a diet.Whether you're just beginning your healthy eating journey or looking to diversify your go-to ingredients, these ten simple additions can transform your kitchen and your health—one delicious bite at a time.",
    image: 'https://i.ibb.co/ZR9nNrHs/Gemini-Generated-Image-woco5hwoco5hwoco.png',
    date: '2025-06-20',
    author: 'DishDive Team'
  },
  {
    id: 3,
    title: 'Why Your Baking Fails (And How to Fix It)',
    description: "From flat cakes that refuse to rise to cookies that turn out rock-hard instead of chewy and soft—we’ve all experienced baking disasters that leave us frustrated and confused. But here’s the good news: most baking failures have simple, science-based explanations and even simpler solutions.In this blog, we dive deep into the most common baking mistakes made by home cooks and even seasoned bakers. Whether it's using cold ingredients, overmixing your batter, misjudging oven temperatures, or skipping proper measurements, we'll break down exactly what went wrong—and how to get it right next time.We’ll also provide you with practical fixes, expert tips, and foolproof techniques to improve your consistency and confidence in the kitchen. With the right knowledge and a few tweaks, you'll start producing golden-brown cookies, fluffy cakes, and picture-perfect pastries every single time.Baking is a science—but once you understand the rules, it becomes an art. Let’s fix those fails together and bring the joy back into your oven!",
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
    <div className=" bg-white mx-auto px-6 py-10">
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
