import Task from '../models/taskModel.js';
import User from '../models/userModel.js';

export const getTasks = async (req, res) => {
  try {
    const data = await Task.find({}).populate('userId');
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log(error);
  }
};

export const addTask = async (req, res) => {
  const { text, status } = req.body;
  const userId = req.user._id;
  try {
    const newTask = new Task({
      userId,
      text,
      status,
    });
    await newTask.save();
    res.status(201).json({ task: newTask });
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log(error);
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { text, status },
      { new: true }
    );
    res.status(201).json({ newTask: updatedTask });
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log(error);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);
    res.status(201).json({ msg: 'Task Deleted' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log(error);
  }
};

export const getAllUsersWithTasks = async (req, res) => {
  try {
    const usersWithTasks = await User.aggregate([
      {
        $lookup: {
          from: 'tasks',
          localField: '_id',
          foreignField: 'userId',
          as: 'tasks',
        },
      },
      {
        $project: {
          _id: 1,
          fullName: 1,
          email: 1,
          tasks: 1,
        },
      },
    ]);

    res.status(201).json({ usersWithTasks });
  } catch (error) {
    console.error('Error fetching users with tasks:', error);
    res.status(500).json({ msg: error.message });
  }
};
