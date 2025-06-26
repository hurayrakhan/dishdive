import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Link } from 'react-router';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const [allRecipes, setAllRecipes] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    // Fetch all recipes
    fetch('https://your-api.com/recipes') // Replace with your backend endpoint
      .then(res => res.json())
      .then(data => {
        setAllRecipes(data);
        const userAdded = data.filter(recipe => recipe.email === user.email);
        setUserRecipes(userAdded);

        // Optional: Wishlist total if data has wishlistCount
        const totalWishlist = userAdded.reduce((acc, recipe) => acc + (recipe.wishlistCount || 0), 0);
        setWishlistCount(totalWishlist);
      });
  }, [user?.email]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-green-600">DishDive</h2>
        <p className="text-gray-500 mb-4">{user?.displayName || 'User'}</p>
        <nav className="space-y-2">
          <Link to="/" className="block p-2 rounded hover:bg-gray-100 text-gray-700">← Back to Home</Link>
          <Link to="/addRecipe" className="block p-2 rounded hover:bg-green-100 text-green-700">Add Recipe</Link>
          <Link to="/myRecipes" className="block p-2 rounded hover:bg-green-100 text-green-700">My Recipes</Link>
          <Link to="/profile" className="block p-2 rounded hover:bg-green-100 text-green-700">My Profile</Link>
        </nav>
      </aside>

      {/* Main Dashboard */}
      <main className="flex-1 p-6">
        <h1 className="text-4xl font-bold text-green-600 mb-10">
          Welcome, {user?.displayName || 'User'} 👋
        </h1>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
            <h2 className="text-xl font-semibold text-gray-600">Total Recipes</h2>
            <p className="text-3xl font-bold text-green-600">{allRecipes.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
            <h2 className="text-xl font-semibold text-gray-600">Your Recipes</h2>
            <p className="text-3xl font-bold text-blue-600">{userRecipes.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
            <h2 className="text-xl font-semibold text-gray-600">Wishlisted</h2>
            <p className="text-3xl font-bold text-yellow-500">{wishlistCount}</p>
          </div>
        </div>

        {/* User Recipes Grid */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-green-700 mb-6">Your Recipes</h2>
          {userRecipes.length === 0 ? (
            <p className="text-gray-500">You haven’t added any recipes yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userRecipes.map(recipe => (
                <div key={recipe._id} className="border rounded-lg shadow p-4">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">{recipe.title}</h3>
                  <p className="text-sm text-gray-500">Cuisine: {recipe.cuisine}</p>
                  <p className="text-sm text-gray-500">Prep Time: {recipe.prepTime} mins</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
