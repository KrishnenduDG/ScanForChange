import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Rank() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("https://scanforchange.onrender.com/api/waste/leaderboard",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "x-auth-token": localStorage.getItem("token"),
                        },
                    }
                );

                if (response.data.status === "success") {
                    // Sort by points in descending order
                    const sortedLeaderboard = response.data.leaderboard.sort((a, b) => b.points - a.points);
                    setLeaderboard(sortedLeaderboard);
                }
            } catch (err) {
                setError("Failed to load leaderboard. Please try again.");
                console.error("Error fetching leaderboard:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    if (loading) return <p>Loading leaderboard...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold mt-10 mb-5">Rank</h2>
            <div className="grid md:grid-cols-1 gap-6 grid-cols-1">
                {leaderboard.length > 0 ? (
                    <>
                        {/* Top Rank */}
                        <div className="flex bg-gray-200 p-5 pr-7 rounded-sm justify-between font-semibold text-lg">
                            <span>{leaderboard[0].name}</span>
                                    <div className="flex gap-5">
                                    <span>{leaderboard[0].points} points</span>
                                    -
                                    <span>{leaderboard[0].scan_counts} scan count</span>
                                    </div>
                        </div>

                        {/* Other Ranks */}
                        <div className="bg-gray-300 p-2 rounded-xl">
                            {leaderboard.slice(1).map((user, index) => (
                                <div key={index} className="flex mb-1 bg-gray-200 p-5 pr-7 rounded-sm justify-between">
                                    <span className="font-semibold">{index +1 }. {user.name}</span>
                                    <div className="flex gap-5">
                                    <span>{user.points} points</span>
                                    -
                                    <span>{user.scan_counts} scan count</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p>No leaderboard data available.</p>
                )}
            </div>
        </div>
    );
}
