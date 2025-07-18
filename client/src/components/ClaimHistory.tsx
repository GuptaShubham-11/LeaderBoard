import React, { useEffect, useState } from 'react';
import { userApi } from '../api/userApi';

interface HistoryItem {
    date: string;
    points: number;
}

interface Props {
    userId: string;
}

const ClaimHistory: React.FC<Props> = ({ userId }) => {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!userId) return;

        const fetchHistory = async () => {
            setLoading(true);
            try {
                const res = await userApi.getClaimHistory(userId);
                console.log(res);

                setHistory(res || []);
            } catch {
                setHistory([]);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [userId]);

    if (!userId) return null;

    return (
        <div className="mt-10">
            <h2 className="text-xl font-bold text-yellow-300 mb-3">Claim History</h2>

            {loading ? (
                <p className="text-gray-400">Loading history...</p>
            ) : history.length === 0 ? (
                <p className="text-gray-500">No history found.</p>
            ) : (
                <div className="overflow-x-auto rounded shadow">
                    <table className="min-w-full bg-gray-800 text-white text-sm md:text-base">
                        <thead className="bg-gray-700 text-left">
                            <tr>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((item: any, i) => (
                                <tr key={i} className="border-t border-gray-700">
                                    <td className="px-4 py-2">{new Date(item.claimedAt).toLocaleString()}</td>
                                    <td className="px-4 py-2">{item.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ClaimHistory;
