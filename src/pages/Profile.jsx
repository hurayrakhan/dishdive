import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Header from "../Components/Header/Header";

export default function Profile() {
    const { user } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState(user?.displayName || "");
    const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

    const handleSave = () => {
        console.log("Updated Profile:", { name, photoURL });
        // TODO: Update logic here (API or Firebase)
        setIsModalOpen(false);
    };

    return (
        <div>
            <Header>
                <div className="h-[80vh] flex items-center justify-center bg-gray-50 px-4">
                    <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-sm w-full">
                        <img
                            src={photoURL || "https://via.placeholder.com/120?text=User"}
                            alt="Profile"
                            className="mx-auto w-32 h-32 rounded-full border-4 border-blue-500 object-cover mb-5"
                        />
                        <h2 className="text-2xl font-semibold text-gray-900 mb-1">{name || "No Name"}</h2>
                        <p className="text-gray-600 mb-6">{user?.email || "No Email"}</p>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
                        >
                            Edit Profile
                        </button>

                        {isModalOpen && (
                            <div className="fixed inset-0 bg-black text-black bg-opacity-40 z-50 flex justify-center items-center px-4">
                                <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
                                    <h3 className="text-xl font-semibold mb-4 text-center">Edit Profile</h3>
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            handleSave();
                                        }}
                                        className="space-y-4"
                                    >
                                        <div>
                                            <label className="block text-gray-700 font-medium mb-1">Name</label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 font-medium mb-1">Photo URL</label>
                                            <input
                                                type="text"
                                                value={photoURL}
                                                onChange={(e) => setPhotoURL(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 font-medium mb-1">Email (read-only)</label>
                                            <input
                                                type="email"
                                                value={user?.email || ""}
                                                disabled
                                                className="w-full px-3 py-2 border border-gray-200 rounded bg-gray-100 cursor-not-allowed"
                                            />
                                        </div>

                                        <div className="flex justify-end gap-3 pt-4">
                                            <button
                                                type="submit"
                                                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
                                            >
                                                Save
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsModalOpen(false)}
                                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>

                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                                    >
                                        &times;
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Header>

        </div>
    );
}
