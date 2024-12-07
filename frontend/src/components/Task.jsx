import { useState } from 'react';
import { FilePenLine } from 'lucide-react';
import useTasksStore from '../store/tasksStore.js';
import { Draggable } from '@hello-pangea/dnd';

const Task = ({ id, text, userName, category, index }) => {
  const { updateTasks, deleteTasks } = useTasksStore();

  const [inputText, setInputText] = useState(text);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const updatedTask = {
    text: inputText,
    status: category,
    _id: id,
  };

  const handelUpdate = async () => {
    await updateTasks(updatedTask);
    setIsModalOpen(false);
  };

  const handelDelete = async () => {
    await deleteTasks(id);
    setIsModalOpen(false);
  };

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="flex flex-row justify-between">
              <div className="text-lg flex flex-col">
                <span>{inputText}</span>
                <p className="text-left text-xs self-start text-gray-600">
                  {userName}
                </p>
              </div>
              <div className="justify-self-end">
                <button
                  className="w-15 justify-self-end hover:text-gray-600"
                  onClick={() => setIsModalOpen(true)}
                >
                  <FilePenLine />
                </button>
              </div>
            </div>
          </li>
        )}
      </Draggable>

      {isModalOpen && (
        <dialog id="my_modal_3" className="modal" open>
          <div className="modal-box">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Update Task</h3>
            <label className="input input-bordered flex items-center gap-2 mt-6">
              <input
                type="text"
                className="grow"
                placeholder="Update task text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </label>
            <button className="btn my-3 mr-4" onClick={handelUpdate}>
              Update
            </button>
            <button className="btn my-3 hover:bg-error" onClick={handelDelete}>
              Delete
            </button>
            <p className="py-4">Press ESC key or click on ✕ button to close</p>
          </div>
        </dialog>
      )}
    </>
  );
};

export default Task;
