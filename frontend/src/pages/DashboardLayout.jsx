import {
  Award,
  Coins,
  LayoutPanelLeft,
  QrCode,
  User,
  LogOut,
} from "lucide-react";
import React, { useState, createContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export const UserTokenContext = createContext();
export default function DashboardLayout() {
  const location = useLocation(); // Get current route
  const navigate = useNavigate(); // For redirecting after logout
  const [userTokens, setUserTokens] = useState(400);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/login"); // Redirect to login page
  };

  const tabs = [
    { id: 1, link: "/dashboard", title: "Dashboard", icon: LayoutPanelLeft },
    { id: 2, link: "/dashboard/scan", title: "Scan", icon: QrCode },
    { id: 3, link: "/dashboard/redeem", title: "Redeem", icon: Coins },
    { id: 4, link: "/dashboard/profile", title: "Profile", icon: User },
    { id: 5, link: "/dashboard/rank", title: "Rank", icon: Award },
  ];

  return (
    <div className="min-h-screen md:max-w-6xl p-4 mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">ScanForChange</h2>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition mt-3"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      <div className="flex md:flex-row flex-col-reverse">
        {/* Sidebar */}
        <div className="md:relative fixed bottom-0 md:w-1/6 w-full bg-gray-100 md:h-[45vh] p-5 pb-6 md:mr-5 md:mt-5 rounded-sm z-10">
          <ul className="flex md:block justify-evenly">
            {tabs.map((tab) => (
              <li key={tab.id} className="mb-5 md:mb-5">
                <Link
                  to={tab.link}
                  className={`flex items-center gap-2 p-2 rounded-sm ${
                    location.pathname === tab.link
                      ? "bg-green-500 text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <tab.icon className="text-xl" />
                  <span className="md:block hidden">{tab.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}

        <UserTokenContext.Provider value={{ userTokens, setUserTokens }}>
          <div className="flex-1 pb-30">
            <div className="grid grid-cols-3 mt-5 gap-6">
              <div className="bg-gray-200 rounded-sm p-5">
                <h2 className="text-sm font-semibold">Earned Tokens</h2>
                <span className="text-xl font-bold">{userTokens}</span>
              </div>
              <div className="bg-gray-200 rounded-sm p-5">
                <h2 className="text-sm font-semibold">Items Scanned</h2>
                <span className="text-xl font-bold">100</span>
              </div>
              <div className="bg-gray-200 rounded-sm p-5">
                <h2 className="text-sm font-semibold">Rank</h2>
                <span className="text-xl font-bold">10</span>
              </div>
            </div>
            <Outlet />
          </div>
        </UserTokenContext.Provider>
      </div>
    </div>
  );
}
