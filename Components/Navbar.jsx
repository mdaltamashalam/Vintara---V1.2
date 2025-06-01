import { Link, NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState(null);
  const { setShowSearch, getCartCount } = useContext(ShopContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <>
      <div className="flex items-center justify-between py-5 font-medium">
        <Link to="/">
          <img src={assets.logo} alt="logo" className="w-36" />
        </Link>

        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/collection" className="flex flex-col items-center gap-1">
            <p>COLLECTION</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/about" className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/contact" className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="https://cloudflare-chatbot.pages.dev/" className="flex flex-col items-center gap-1">
            <p>AI PERSONAL ASSISTANT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </ul>

        <div className="flex items-center gap-6">
          <img
            onClick={() => {
              setShowSearch(true);
            }}
            src={assets.search_icon}
            alt=""
            className="w-5 cursor-pointer"
          />

          <div className="relative group">
  {user ? (
    <>
      <img
        src={assets.profile_icon}
        alt="profile"
        className="w-5 cursor-pointer"
      />
      <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
        <p className="px-4 py-2 text-sm text-gray-700 border-b">
          Hi, {user.displayName || user.email.split('@')[0]}
        </p>
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </>
  ) : (
    <Link to="/login">
      <img
        src={assets.profile_icon}
        alt="profile"
        className="w-5 cursor-pointer"
      />
    </Link>
  )}
</div>


          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} alt="cart" className="w-5 min-w-5" />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </Link>

          <img
            src={assets.menu_icon}
            alt="menu"
            className="w-5 cursor-pointer sm:hidden"
            onClick={() => setVisible(!visible)}
          />
        </div>
      </div>

      {/* Sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white ease-in duration-300 ${
          visible ? 'w-full' : 'w-0'
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => {
              setVisible(false);
            }}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} alt="" className="h-4 rotate-180" />
            <p className="font-semibold">Back</p>
          </div>

          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/">HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/collection">COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/about">ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/contact">CONTACT</NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;
