'use server';

import { revalidatePath } from 'next/cache';
import { QueryFilter, SortOrder } from 'mongoose';

import { connectToDB } from '../mongoose';

import User from '../models/user.model';
import Thread from '../models/thread.model';
import Community from '../models/community.model';

interface Params {
    userId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
}

export const updateUser = async ({ userId, username, name, bio, image, path }: Params): Promise<void> => {
    try {
        connectToDB();
        await User.findOneAndUpdate(
            { id: userId },
            { username: username.toLowerCase(), name, bio, image, onboarded: true },
            { upsert: true }
        );

        if (path === '/profile/edit') {
            revalidatePath(path);
        }
    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`);
    }
};

export const fetchUser = async (userId: string) => {
    try {
        connectToDB();
        return await User.findOne({ id: userId }).populate({
            path: 'communities',
            model: Community
        });
    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
};

export const fetchUserPosts = async (userId: string) => {
    try {
        connectToDB();
        const threads = await User.findOne({ id: userId }).populate({
            path: 'threads',
            model: Thread,
            populate: [
                {
                    path: 'community',
                    model: Community,
                    select: 'name id image _id'
                },
                {
                    path: 'children',
                    model: Thread,
                    populate: {
                        path: 'author',
                        model: User,
                        select: 'name image id'
                    }
                }
            ]
        });
        return threads;
    } catch (error: any) {
        throw new Error(`Failed to fetch posts: ${error.message}`);
    }
};

export const fetchUsers = async ({
    userId,
    pageNumber = 1,
    pageSize = 20,
    search = '',
    sortBy = 'desc'
}: {
    userId?: string;
    pageNumber?: number;
    pageSize?: number;
    search?: string;
    sortBy?: SortOrder;
}) => {
    try {
        connectToDB();
        const skipAmount = (pageNumber - 1) * pageSize;

        const regex = new RegExp(search, 'i');

        const query: QueryFilter<typeof User> = {
            id: { $ne: userId }
        };

        if (search.trim() !== '') {
            query.$or = [{ username: { $regex: regex } }, { name: { $regex: regex } }];
        }

        const sortOptions = { createdAt: sortBy };

        const usersQuery = User.find(query).sort(sortOptions).skip(skipAmount).limit(pageSize);

        const totalUsersCount = await User.countDocuments(query);

        const users = await usersQuery.exec();

        const isNext = totalUsersCount > skipAmount + users.length;

        return { users, isNext };
    } catch (error: any) {
        throw new Error(`Failed to fetch users: ${error.message}`);
    }
};

export const getActivites = async (userId: string) => {
    try {
        connectToDB();

        const userThreads = await Thread.find({ author: userId });

        const childThreadIds = userThreads.reduce((acc, userThreads) => {
            return acc.concat(userThreads.children);
        }, []);

        const replies = await Thread.find({ _id: { $in: childThreadIds }, author: { $ne: userId } }).populate({
            path: 'author',
            model: User,
            select: 'name image id'
        });

        return replies;
    } catch (error: any) {
        throw new Error(`Failed to fetch activities: ${error.message}`);
    }
};

export const fetchUserReplies = async (userId: string) => {
    try {
        connectToDB();

        const userReplies = await Thread.find({
            author: userId,
            parentId: { $not: { $in: [null, undefined] } }
        }).populate({
            path: 'author',
            model: User,
            select: 'name image id'
        });
        return userReplies;
    } catch (error: any) {
        throw new Error(`Failed to fetch replies: ${error.message}`);
    }
};
