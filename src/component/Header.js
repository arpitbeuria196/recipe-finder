import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { addLoginData, removeLoginData } from '../utils/userSlice';
import { FaSignOutAlt, FaUserPlus } from 'react-icons/fa'; // Importing icons

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            dispatch(removeLoginData());
            navigate("/");
        } catch (error) {
            console.error("Error signing out:", error);
            navigate("/error");
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const { uid, email, displayName } = currentUser;
                dispatch(addLoginData({ uid, email, displayName }));
                navigate("/browse");
            } else {
                dispatch(removeLoginData());
                navigate("/"); // Redirect to home page if not authenticated
            }
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, [dispatch, navigate]);

    return (
        <header className="bg-blue-600 p-4 text-white shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Welcome to My App</h1>
                {user?.email ? (
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium">
                            {`Hello, ${user.displayName || user.email}`}
                        </span>
                        <button
                            onClick={handleSignOut}
                            className="flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                        >
                            <FaSignOutAlt className="mr-1" />
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => navigate('/login')}
                        className="flex items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                    >
                        <FaUserPlus className="mr-1" />
                        Log In
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
