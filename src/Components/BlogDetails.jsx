// src/Pages/BlogDetail.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router';

const BlogDetail = () => {
    const { state: blog } = useLocation();
    const navigate = useNavigate();

    if (!blog) {
        return (
            <div className='bg-white h-screen'>
                <div className="text-center py-20">
                    <h1 className="text-2xl font-semibold text-red-500">No blog data found.</h1>
                    <button onClick={() => navigate('/')} className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                        Go Back to Blog
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className=' bg-white h-screen overflow-scroll'>
            <div className="max-w-4xl mx-auto px-6 py-12 bg-white">
                <img src={blog.image} alt={blog.title} className="w-full h-72 object-cover rounded-lg mb-6" />
                <p className="text-sm text-gray-500 mb-1">{blog.date} · {blog.author}</p>
                <h1 className="text-4xl font-bold text-green-700 mb-4">{blog.title}</h1>
                <p className="text-gray-800 leading-relaxed">
                    {blog.description} <br /><br />
                </p>

                <button
                    onClick={() => navigate(-1)}
                    className="mt-8 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    ← Back
                </button>
            </div>
        </div>
    );
};

export default BlogDetail;
