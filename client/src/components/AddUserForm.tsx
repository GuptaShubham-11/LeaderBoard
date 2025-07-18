import React, { useState } from 'react';
import { userApi } from '../api/userApi';

interface Props {
    onUserAdded: () => void;
}

const AddUserForm: React.FC<Props> = ({ onUserAdded }) => {
    const [name, setName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        await userApi.addUser(name);
        setName('');
        onUserAdded();
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4">
            <input
                className="border px-3 py-1 outline-none rounded text-white"
                type="text"
                value={name}
                placeholder="Enter user name"
                onChange={(e) => setName(e.target.value)}
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
                Add User
            </button>
        </form>
    );
};

export default AddUserForm;
