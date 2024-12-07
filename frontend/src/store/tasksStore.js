import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

const useTasksStore = create((set, get) => ({
  tasks: { todo: [], inprogress: [], done: [] },
  users: [],
  getTasks: async () => {
    try {
      const res = await axiosInstance.get('/tasks/all-tasks');

      set({
        tasks: {
          todo: res.data.data.filter((task) => task.status === 'todo'),
          inprogress: res.data.data.filter(
            (task) => task.status === 'inprogress'
          ),
          done: res.data.data.filter((task) => task.status === 'done'),
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  addTasks: async (newTask) => {
    try {
      await axiosInstance.post('/tasks/new-task', newTask);
      toast.success('Added Successfully');
    } catch (error) {
      toast.error('Add failed');
      console.log('error from add', error);
    }
  },

  updateTasks: (updatedTask) => {
    const { getTasks } = get();
    try {
      axiosInstance.put(`/tasks/${updatedTask._id}`, updatedTask);
      toast.success('Task updated successfully');
      getTasks();
    } catch (error) {
      toast.error('Task update failed');
      console.log('Update failed', error);
    }
  },

  deleteTasks: async (taskId) => {
    const { getTasks } = get();
    try {
      await axiosInstance.delete(`/tasks/${taskId}`);
      toast.success('Deleted Successfully');
      getTasks();
    } catch (error) {
      toast.error('Deleted failed');
      console.log('error from delete', error);
    }
  },

  getUsersWithTasks: async () => {
    try {
      const res = await axiosInstance.get('/tasks/users/tasks');
      // console.log(res.data.usersWithTasks);

      set({
        users: res.data.usersWithTasks,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
}));

export default useTasksStore;
