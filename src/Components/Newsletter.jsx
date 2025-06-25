import React from 'react';

export default function Newsletter() {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log("Subscribed email:", email);
    // TODO: send `email` to your backend or a service like Mailchimp
  };

  return (
    <div className="bg-blue-100 py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200 rounded-b-2xl">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Stay in the loop!
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Subscribe to our newsletter and never miss a recipe, update, or tip!
        </p>

        <form
          onSubmit={handleSubscribe}
          className="mt-8 sm:flex sm:justify-center"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="w-full px-5 py-3 border border-green-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 sm:max-w-xs"
          />
          <button
            type="submit"
            className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto px-5 py-3 bg-green-600 text-white rounded-md shadow hover:bg-blue-700 transition-all duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
