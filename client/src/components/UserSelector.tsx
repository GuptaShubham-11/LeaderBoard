import React from 'react';

interface Props {
    users: { name: string; userId: string }[];
    selectedId: string;
    onChange: (id: string) => void;
}

const UserSelector: React.FC<Props> = ({ users, selectedId, onChange }) => {
    return (
        <select
            value={selectedId}
            onChange={(e) => onChange(e.target.value)}
            className="px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded"
        >
            <option value="">Select a user</option>
            {users.map((user) => (
                <option key={user.userId} value={user.userId}>
                    {user.name}
                </option>
            ))}
        </select>
    );
};

export default UserSelector;
