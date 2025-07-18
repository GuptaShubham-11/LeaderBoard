import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import User from "../models/user";
import ClaimHistory from "../models/claimHistory";

const getCurrentUser = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        throw new ApiError(400, 'User ID is required.');
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, 'User not found.');
    }

    const users = await User.find().sort({ totalPoints: -1 });

    // Find the rank of the current user (index + 1)
    const currentRank =
        users.findIndex((u) => u._id.toString() === userId.toString()) + 1;

    res
        .status(200)
        .json(new ApiResponse(200, 'User fetched.', { user, rank: currentRank }));
});


const addUser = asyncHandler(async (req, res) => {
    if (!req.body) {
        throw new ApiError(400, 'Name is required.');
    }
    const { name } = req.body;

    if (!name) {
        throw new ApiError(400, 'Name is required.');
    }

    const user = await User.create({ name });
    res.status(200).json(new ApiResponse(200, "User created.", user));
});

const claimPoints = asyncHandler(async (req, res) => {
    if (!req.body) {
        throw new ApiError(400, 'User ID is required.');
    }
    const { userId } = req.body;

    if (!userId) {
        throw new ApiError(400, 'User ID is required.');
    }
    const randomPoints = Math.floor(Math.random() * 10) + 1;

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, 'User not found.');
    }

    user.totalPoints += randomPoints;
    await user.save();

    const history = new ClaimHistory({ userId, points: randomPoints });
    await history.save();

    res.status(200).json(new ApiResponse(200, "Points claimed.", { user, history }));
});

const getClaimHistory = asyncHandler(async (req, res) => {
    if (!req.body) {
        throw new ApiError(400, 'User ID is required.');
    }
    const { userId } = req.body;

    if (!userId) {
        throw new ApiError(400, 'User ID is required.');

    }

    const history = await ClaimHistory.find({ userId }).sort({ claimedAt: -1 }).limit(7);

    res.status(200).json(new ApiResponse(200, "Claim history fetched.", history));
});

const getLeaderboard = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();

    const users = await User.find()
        .sort({ totalPoints: -1 })
        .skip(skip)
        .limit(limit);

    const ranked = users.map((user, index) => ({
        rank: skip + index + 1,
        name: user.name,
        totalPoints: user.totalPoints,
        userId: user._id,
    }));

    res.status(200).json(
        new ApiResponse(200, "Leaderboard fetched.", {
            currentPage: page,
            totalPages: Math.ceil(totalUsers / limit),
            totalUsers,
            data: ranked,
        })
    );
});


export const userController = {
    addUser,
    getCurrentUser,
    claimPoints,
    getLeaderboard,
    getClaimHistory
};