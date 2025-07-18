import React from 'react';

interface Props {
    userId: string;
    onClaim: () => void;
}

const ClaimButton: React.FC<Props> = ({ userId, onClaim }) => {
    return (
        <button
            disabled={!userId}
            onClick={onClaim}
            className={`px-4 py-2 rounded font-semibold transition duration-200 ${userId
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                }`}
        >
            Claim Points
        </button>
    );
};

export default ClaimButton;
