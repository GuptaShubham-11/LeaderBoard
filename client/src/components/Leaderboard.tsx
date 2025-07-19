import React from 'react';
import { Medal, Trophy, Award } from 'lucide-react';

interface Leader {
    name: string;
    totalPoints: number;
    rank: number;
    userId: string;
}

interface Props {
    data: Leader[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Leaderboard: React.FC<Props> = ({
    data,
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    const topThree = data.slice(0, 3);
    const rest = data.slice(3);

    const rankColors = ['from-yellow-400 to-yellow-600', 'from-gray-300 to-gray-500', 'from-orange-400 to-red-500'];

    const icons = [<Trophy className="w-6 h-6 mr-2 text-black" />, <Medal className="w-6 h-6 mr-2 text-black" />, <Award className="w-6 h-6 mr-2 text-black" />];

    return (
        <div className="w-full mt-6">
            <h2 className="text-xl font-bold mb-4 text-yellow-300">Leaderboard</h2>

            {/* Top 3 in stair layout */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                {topThree.map((user, i) => (
                    <div
                        key={user.userId}
                        className={`flex items-center gap-2 px-4 py-3 rounded shadow text-black w-full sm:w-1/3 bg-gradient-to-r ${rankColors[i]} hover:scale-[1.02] transition`}
                    >
                        {icons[i]}
                        <div>
                            <div className="text-lg font-bold">{user.name}</div>
                            <div className="text-sm">Points: {user.totalPoints}</div>
                            <div className="text-sm">Rank: {user.rank}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Rest in table */}
            {rest.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-800 text-white rounded shadow">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-4 py-2 text-left">Rank</th>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Total Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rest.map((u) => (
                                <tr key={u.userId} className="border-t border-gray-700 hover:bg-gray-700 transition">
                                    <td className="px-4 py-2">#{u.rank}</td>
                                    <td className="px-4 py-2">{u.name}</td>
                                    <td className="px-4 py-2">{u.totalPoints}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3 text-white">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="px-4 py-1 bg-blue-600 hover:bg-blue-700 rounded disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    Prev
                </button>
                <span className="text-sm">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-4 py-1 bg-blue-600 hover:bg-blue-700 rounded disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Leaderboard;
