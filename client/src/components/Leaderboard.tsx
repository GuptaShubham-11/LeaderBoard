import React from 'react';

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

    const getRankStyle = (rank: number) => {
        switch (rank) {
            case 1:
                return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold';
            case 2:
                return 'bg-gradient-to-r from-gray-300 to-gray-500 text-black font-semibold';
            case 3:
                return 'bg-gradient-to-r from-orange-400 to-red-500 text-black font-semibold';
            default:
                return '';
        }
    };

    const getRankEmoji = (rank: number) => {
        switch (rank) {
            case 1:
                return '🥇';
            case 2:
                return '🥈';
            case 3:
                return '🥉';
            default:
                return `#${rank}`;
        }
    };

    return (
        <div className="overflow-x-auto mt-6 w-full">
            <h2 className="text-xl font-bold mb-4 text-yellow-300">Leaderboard</h2>

            <table className="min-w-full bg-gray-800 text-white rounded-md shadow overflow-hidden">
                <thead className="bg-gray-700">
                    <tr>
                        <th className="px-4 py-2 text-left">Rank</th>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Total Points</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((u) => (
                        <tr
                            key={u.userId}
                            className={`border-t border-gray-700 transition hover:bg-gray-700 ${getRankStyle(u.rank)}`}
                        >
                            <td className="px-4 py-2">{getRankEmoji(u.rank)}</td>
                            <td className="px-4 py-2">{u.name}</td>
                            <td className="px-4 py-2">{u.totalPoints}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="px-4 py-1 bg-blue-600 hover:bg-blue-700 rounded disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    Prev
                </button>
                <span className="text-sm text-white">
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
