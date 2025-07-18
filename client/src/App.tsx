import { useEffect, useState } from 'react';
import './index.css';
import AddUserForm from './components/AddUserForm';
import UserSelector from './components/UserSelector';
import ClaimButton from './components/ClaimButton';
import Leaderboard from './components/Leaderboard';
import ClaimHistory from './components/ClaimHistory';
import { userApi } from './api/userApi';

function App() {
  const [users, setUsers] = useState<{ name: string; userId: string }[]>([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [currentUser, setCurrentUser] = useState<null | {
    name: string;
    totalPoints: number;
    rank: number;
  }>(null);

  const fetchCurrentUser = async () => {
    if (!selectedUserId) return;
    try {
      const response = await userApi.getCurrentUser(selectedUserId);
      setCurrentUser({
        name: response.user.name,
        totalPoints: response.user.totalPoints,
        rank: response.rank,
      });
    } catch {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [selectedUserId]);

  const fetchLeaderboard = async (page = 1) => {
    setLoading(true);
    try {
      const response = await userApi.getLeaderboard(page);
      const { data, currentPage, totalPages } = response;

      setLeaderboard(data);
      setCurrentPage(currentPage);
      setTotalPages(totalPages);
      setUsers(
        data.map((user: any) => ({
          name: user.name,
          userId: user.userId,
        }))
      );
    } catch (error) {
      setMessage('Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const handleClaim = async () => {
    if (!selectedUserId) return;
    setLoading(true);
    try {
      const result = await userApi.claimPoints(selectedUserId);
      setMessage(`${result.user.name} got ${result.history.points} points!`);
      await fetchLeaderboard(currentPage);
      await fetchCurrentUser();
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setMessage('Error claiming points.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    fetchLeaderboard(page);
  };

  return (
    <div className="min-h-screen bg-[#1b1b1b] text-white px-4 py-6 md:p-10 mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-400 text-center md:text-left">
        🏆 Leaderboard
      </h1>

      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-6">
        <AddUserForm onUserAdded={() => fetchLeaderboard(currentPage)} />

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <UserSelector
            users={users}
            selectedId={selectedUserId}
            onChange={setSelectedUserId}
          />
          <ClaimButton userId={selectedUserId} onClaim={handleClaim} />
        </div>
      </div>

      {message && (
        <div className="text-sm mb-4 px-4 py-2 bg-gray-700 text-green-300 rounded shadow text-center">
          {message}
        </div>
      )}

      {currentUser && (
        <div className="mb-6 bg-gray-800 p-4 rounded shadow-md text-white w-full max-w-xl mx-auto">
          <h2 className="text-lg font-semibold text-yellow-300 mb-2">
            Current User Details
          </h2>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <p>
              <span className="text-gray-400">👤 Name:</span> {currentUser.name}
            </p>
            <p>
              <span className="text-gray-400">🏅 Rank:</span> #{currentUser.rank}
            </p>
            <p>
              <span className="text-gray-400">⭐ Points:</span> {currentUser.totalPoints}
            </p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <Leaderboard
            data={leaderboard}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          <ClaimHistory userId={selectedUserId} />
        </>
      )}
    </div>
  );
}

export default App;
