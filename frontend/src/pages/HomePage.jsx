import Columns from '../components/Columns.jsx';
import { useAuthStore } from '../store/authStore';
import useTasksStore from '../store/tasksStore.js';
import { useEffect, useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { logout } = useAuthStore();
  const { getTasks, tasks, addTasks, updateTasks } = useTasksStore();

  const [newTask, setNewTask] = useState('');
  const task = { text: newTask, status: 'todo' };

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const handelAddTask = async () => {
    addTasks(task);
    setNewTask('');
    getTasks();
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId ||
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = tasks[source.droppableId];

    const task = sourceColumn.find((e) => {
      return e._id === draggableId;
    });

    const updatedTask = { ...task, status: destination.droppableId };

    updateTasks(updatedTask);
    getTasks();
  };
  return (
    <>
      <div className=" flex justify-center mt-7">
        {' '}
        <Link to={'/users'}>
          <button className="btn">User</button>
        </Link>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col justify-start items-center h-screen ">
          <button
            onClick={logout}
            className="btn btn-active btn-neutral fixed right-6 top-6"
          >
            Logout
          </button>
          <div className="mockup-window bg-base-300 border w-4/5 my-8 ">
            <div className="bg-base-200 flex justify-center gap-5 py-10 md:flex-col">
              <div className="h-64 w-80 flex justify-center overflow-x-auto ">
                <Columns tasks={tasks.todo} title={'Todo'} id={'todo'} />
              </div>
              <div className="divider divider-horizontal"></div>
              <div className="h-64 w-80 flex justify-center overflow-x-auto ">
                <Columns
                  tasks={tasks.inprogress}
                  title={'Inprogress'}
                  id={'inprogress'}
                />
              </div>
              <div className="divider divider-horizontal"></div>
              <div className="h-64 w-80 flex justify-center overflow-x-auto ">
                <Columns tasks={tasks.done} title={'Done'} id={'done'} />
              </div>
            </div>
          </div>
          <div className="flex w-1/3">
            <label className="input input-bordered flex items-center gap-2 w-full mr-4">
              <input
                type="text"
                className="grow"
                placeholder="New Task"
                value={newTask}
                onChange={(e) => {
                  setNewTask(e.target.value);
                }}
              />
            </label>
            <button
              className="btn"
              onClick={() => {
                handelAddTask();
              }}
            >
              Add
            </button>
          </div>
        </div>
      </DragDropContext>
    </>
  );
};

export default HomePage;
