import React from 'react';
import { Bounce, Hinge, Roll, Rotate, Slide, Zoom } from 'react-awesome-reveal';

const upcoming = [
  {
    id: 1,
    title: 'Grilled Lemon Herb Chicken',
    image: 'https://i.ibb.co/Mky0ZzgR/Grilled-Lemon-Chicken-4.jpg',
    description:
      'This zesty grilled lemon herb chicken is marinated in a delightful blend of citrus, garlic, and rosemary. It’s perfect for summer evenings, served with grilled vegetables, mashed potatoes, or even tossed into a salad. A favorite among family gatherings for its bold flavors and juicy tenderness. You’ll love how easy it is to prepare with minimal cleanup!',
  },
  {
    id: 2,
    title: 'Creamy Mushroom Pasta',
    image: 'https://i.ibb.co/FqNK1Grk/BA-0919-Creamy-Pasta-Crispy-Mushroom-Playbook.webp',
    description:
      'A comforting, creamy mushroom pasta that delivers rich umami flavor with every bite. Made with sautéed garlic mushrooms, parmesan cheese, and a touch of white wine. This upcoming recipe is ideal for a cozy night in or an elegant date night dish. Serve with crusty garlic bread and a glass of your favorite red wine.',
  },
];

export default function UpcomingRecipes() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Upcoming Recipes
        </h2>

        <div className="space-y-14">
          {upcoming.map((recipe, index) => (
            <Zoom key={recipe.id} triggerOnce={true}><div
              
              className={`flex flex-col  ${
                index % 2 === 0 ? 'flex-col md:flex-row' : 'flex-col md:flex-row-reverse '
              } items-center bg-gray-50 rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden md:h-[400px] `}
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full md:w-1/2 h-full object-cover"
              />
              <div className="p-8 md:w-1/2 h-full flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {recipe.title}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {recipe.description}
                </p>
              </div>
            </div></Zoom>
          ))}
        </div>
      </div>
    </section>
  );
}
