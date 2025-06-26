import React from 'react';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer';

const teamsData = [
    {
        name: 'Hurayra Khan',
        role: 'Founder & CEO',
        image: 'https://i.ibb.co.com/zh641sgL/de248a20-fe13-4e29-a4b9-a6a8244fcdda.jpg',
    },
    {
        name: 'Maruf Khan',
        role: 'Chief Technology Officer',
        image: 'https://i.ibb.co.com/m5NNCL9T/1715741617155.jpg',
    },
    {
        name: 'Jhankar Mahbub',
        role: 'Senior Advisor',
        image: 'https://i.ibb.co.com/BK4wZ0qn/467444869-10160351769061891-3964624160658220491-n.jpg',
    },
];

const AboutUs = () => {
    return (

        <div>
            <Header>
                <div className="px-6 py-16 bg-gradient-to-b from-orange-50 via-white to-orange-100 min-h-screen">
                    {/* Hero Title */}
                    <section className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-orange-600 mb-4 tracking-tight">
                            Welcome to DishDive
                        </h1>
                        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                            A place where recipes aren't just shared—they're celebrated. Discover new dishes, create your own, and build a kitchen legacy one bite at a time.
                        </p>
                    </section>

                    {/* Mission Section */}
                    <section className="text-center mb-20">
                        <h2 className="text-4xl font-bold text-orange-500 mb-4">Our Mission</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-md leading-relaxed">
                            At DishDive, we're blending tech and taste to build a connected, creative food-loving community. Whether you're posting your grandma's secret curry or saving spicy pasta to your wishlist, every action adds flavor to our table.
                        </p>
                    </section>

                    {/* Team Section */}
                    <section>
                        <h2 className="text-4xl font-bold text-center text-orange-500 mb-12">Meet the Team</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                            {teamsData.map((member, index) => (
                                <div
                                    key={index}
                                    className="group relative bg-white p-6 rounded-3xl shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 duration-300 border-b-4 border-orange-500 rounded-b-3xl"
                                >
                                    <div className="w-28 h-28 mx-auto overflow-hidden rounded-full border-4 border-orange-200 shadow">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <h3 className="mt-4 text-xl font-semibold text-gray-800">{member.name}</h3>
                                    <p className="text-sm text-gray-500">{member.role}</p>

                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                <Footer></Footer>
            </Header>

        </div>
    );
};

export default AboutUs;
