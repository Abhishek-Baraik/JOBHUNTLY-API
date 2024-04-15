import { CatchAsyncError } from '../middlewares/CatchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import { Job } from '../models/jobSchema.js';

export const getAllJobs = CatchAsyncError(async (req, res, next) => {
    const jobs = await Job.find({ expired: false });
    res.status(200).json({
        success: true,
        jobs,
    });
});

export const postJob = CatchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("Job Seeker is not allowed to access this resource", 400));
    }
    const { title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo } = req.body;

    if (!title || !description || !category || !country || !city || !location) {
        return next(new ErrorHandler("Please provide full job details", 400));
    }
    if ((salaryTo || salaryFrom) && fixedSalary) {
        return next(new ErrorHandler("Please either provide fixed salary or ranged salary!", 400));
    }
    if (fixedSalary && (salaryFrom || salaryTo)) {
        return next(new ErrorHandler("Cannot enter fixed salary and ranged salary together!", 400));
    }
    const postedBy = req.user._id;
    const job = await Job.create({
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
        postedBy
    });

    res.status(200).json({
        success: true,
        message: "Job posted successfully!",
        job
    });
});

export const getMyJobs = CatchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("Job Seeker is not allowed to access this resource", 400));
    }
    try {
        const myJobs = await Job.find({ postedBy: req.user._id });
        res.status(200).json({
            success: true,
            myJobs
        });
    } catch (error) {
        return next(new ErrorHandler("An error occurred while fetching jobs", 500));
    }
});

export const updateJob = CatchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("Job Seeker is not allowed to access this resource", 400));
    }
    const { id } = req.params;
    try {
        let job = await Job.findById(id);
        if (!job) {
            return next(new ErrorHandler("Oops! Job not found.", 404));
        }
        job = await Job.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
        res.status(200).json({
            success: true,
            job,
            message: "Job updated successfully!",
        });
    } catch (error) {
        return next(new ErrorHandler("An error occurred while updating the job", 500));
    }
});

export const deleteJob = CatchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("Job Seeker is not allowed to access this resource", 400));
    }
    const { id } = req.params;
    try {
        const job = await Job.findById(id);
        if (!job) {
            return next(new ErrorHandler("Oops! Job not found.", 404));
        }
        await Job.deleteOne({ _id: id });
        res.status(200).json({
            success: true,
            message: "Job deleted successfully!"
        });
    } catch (error) {
        return next(new ErrorHandler("An error occurred while deleting the job", 500));
    }
});

export const getSingleJob = CatchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    try {
        const job = await Job.findById(id);
        if (!job) {
            return next(new ErrorHandler("Job not found!", 404));
        }
        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        return next(new ErrorHandler("Invalid id / Cast Error", 400));
    }
});
