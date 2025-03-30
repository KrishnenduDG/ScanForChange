import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not logged in");
          setIsLoading(false);
          return;
        }

        const { data } = await axios.get(
          "https://scanforchange.onrender.com/api/auth/profile",
          {
            headers: { "x-auth-token": token },
          }
        );

        setUserData(data.data);
        console.log(data.data); // Log after updating state
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1 className="text-red-500">{error}</h1>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold">User Details</h1>
      <p>Email: {userData.email}</p>
      <p>Joined At: {new Date(userData.joinedAt).toLocaleDateString()}</p>
      <p>Points: {userData.points}</p>
      <p>Rank: {userData.rank}</p>

      <h2 className="text-xl font-semibold mt-4">Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {userData.reports.map((report, index) => (
          <div key={index} className="p-4 rounded-md shadow-md">
            <img
              src={report.imgUrl}
              alt="Reported Waste"
              className="w-full h-40 object-cover rounded-md"
            />
            <p className="text-sm mt-2">
              <span className="font-bold">Reported At:</span>{" "}
              {new Date(report.reported_at).toLocaleString()}
            </p>
            <p className="text-sm">
              <span className="font-bold">Points Earned:</span> {report.points_earned}
            </p>
            <p className="text-sm">
              <span className="font-bold">Wastes Reported:</span>{" "}
              {report.wastes_reported.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
