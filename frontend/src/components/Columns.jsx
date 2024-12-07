import Task from './Task.jsx';
import { Droppable } from '@hello-pangea/dnd';

const Columns = ({ tasks, title, id }) => {
  const columnId = id;

  return (
    <div className="w-full">
      <Droppable droppableId={columnId}>
        {(provided) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="menu bg-base-200 block rounded-box w-full"
            id={id}
          >
            <li className="menu-title text-center text-3xl">
              {title.toUpperCase()}
            </li>
            {tasks.map((task, index) => (
              <Task
                key={task._id}
                id={task._id}
                text={task.text}
                userName={task.userId.fullName}
                category={task.status}
                index={index}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default Columns;
