import { useEffect } from 'react';
import useTasksStore from '../store/tasksStore.js';
import { Link } from 'react-router-dom';

const UsersTasks = () => {
  const { getUsersWithTasks, users } = useTasksStore();

  useEffect(() => {
    getUsersWithTasks();
  }, [getUsersWithTasks]);

  console.log(users);

  return (
    <>
      <div className=" flex justify-center mt-7">
        <Link to={'/'}>
          <button className="btn">Tasks</button>
        </Link>
      </div>
      <div className="w-full flex justify-center">
        <div className="mockup-window bg-base-300 border w-4/5 my-8">
          <div className="bg-base-200 py-10 ">
            <ul className="menu bg-base-200 flex flex-row rounded-box w-full gap-9">
              {users?.length === 0 ? (
                <li className="menu-title text-center text-2xl flex justify-center">
                  No users with tasks available
                </li>
              ) : (
                users.map((user) => (
                  <li
                    key={user._id}
                    className="menu-title text-center text-3xl"
                  >
                    <span>{user.fullName}</span>
                    <ul className="mt-4">
                      {user.tasks?.length === 0 ? (
                        <li className="text-gray-500 text-sm">
                          No tasks for this user
                        </li>
                      ) : (
                        user.tasks.map((task) => (
                          <li key={task._id}>
                            <span>{task.text}</span>
                            <p className="text-left text-xs self-start text-gray-600">
                              {task.status}
                            </p>
                          </li>
                        ))
                      )}
                    </ul>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersTasks;
