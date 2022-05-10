import catchAsync from '../util/catchAsync.js';
import projectModel from '../models/projectModel.js';
import blogModel from '../models/blogModel.js';
import userModel from '../models/userModel.js';
import commentModel from '../models/commentModal.js';
import messageModel from '../models/messageModal.js';
import mongoose from 'mongoose';

export const adminPage = catchAsync(async (req, res, next) => {
    const projects = await projectModel.find();
    const users = await userModel.find();
    const subscribers = await userModel.find({ role: "admin" });
    const messages = await messageModel.find();
    const blogs = await blogModel.aggregate([
        {
            $lookup: {
                from: 'comments',
                as: 'comments',
                let: { blog: '$_id' },
                pipeline: [
                    {
                        $match: { $expr: { $eq: ['$blog', '$$blog'] }, approve: true },
                    },
                ],
            },
        },
    ]);
    const comments = await commentModel.find();

    res.status(200).render('admin/index', {
        projects, users, messages, blogs, comments, subscribers
    });
});

export const adminMessagesPage = catchAsync(async (req, res, next) => {
    res.status(200).render('admin/messages');
});
export const adminProjectsPage = catchAsync(async (req, res, next) => {
    res.status(200).render('admin/projects');
});

export const adminCommentsPage = catchAsync(async (req, res, next) => {
    res.status(200).render('admin/comments');
});
export const adminSubscribersPage = catchAsync(async (req, res, next) => {
    res.status(200).render('admin/subscribers');
});

export const adminBlogsPage = catchAsync(async (req, res, next) => {
    const admin = await userModel.aggregate([{ $match: { role: 'admin' } }]);
    const blogs = await blogModel.aggregate([
        {
            $lookup: {
                from: 'comments',
                as: 'comments',
                let: { blog: '$_id' },
                pipeline: [
                    {
                        $match: { $expr: { $eq: ['$blog', '$$blog'] }, approve: true },
                    },
                ],
            },
        },
    ]);

    res.status(200).render('admin/blogs', {
        blogs,
        admin: admin[0],
    });
});

export const adminBlogPage = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const admin = await userModel.find({ role: 'admin' });
    const blogs = await blogModel.aggregate([
        {
            $lookup: {
                from: 'comments',
                as: 'comments',
                let: { blog: '$_id' },
                pipeline: [
                    {
                        $match: { $expr: { $eq: ['$blog', '$$blog'] }, approve: true },
                    },
                ],
            },
        },
    ]);

    const blog = await blogModel.aggregate([
        {
            $match: { _id: mongoose.Types.ObjectId(id) },
        },
        {
            $lookup: {
                from: 'comments',
                as: 'comments',
                let: { blog: '$_id' },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ['$blog', '$$blog'] },
                            approve: true,
                        },
                    },
                    {
                        $unwind: '$user',
                    },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'user',
                            foreignField: '_id',
                            as: 'user',
                        },
                    },
                    {
                        $unset: ['user.password', 'user.role', 'user.active', 'user.email'],
                    },
                ],
            },
        },
    ]);
    if (!blog) {
        return next(new AppError('No Blog found with that ID', 404));
    }

    res.status(200).render('admin/blogs', {
        blog: blog[0],
        blogs,
        admin: admin[0],
    });
});

export const adminUsersPage = catchAsync(async (req, res, next) => {
    const projects = await projectModel.find();

    res.status(200).render('admin/users', {
        projects,
    });
});

