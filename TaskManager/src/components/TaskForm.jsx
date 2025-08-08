import { forwardRef } from "react";

const TaskForm = forwardRef(({ onSubmit, task }, ref) => {
  return (
    <form
      ref={ref}
      onSubmit={onSubmit}
      className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-lg w-full max-w-md mx-auto"
    >
      {/* Heading */}
      <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
        {task ? "Edit Task" : "Add New Task"}
      </h2>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Status
        </label>
        <select
          name="status"
          defaultValue={task?.status || "Select Status"}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
        >
          <option value="Select Status">Select Task Status</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Title
        </label>
        <input
          name="title"
          defaultValue={task?.title || ""}
          placeholder="Enter task title"
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Description
        </label>
        <textarea
          name="description"
          defaultValue={task?.description || ""}
          placeholder="Write a short description..."
          className="w-full border border-gray-300 rounded-lg p-2 h-24 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
        />
      </div>

      {/* Due Date */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Due Date
        </label>
        <input
          type="date"
          name="dueDate"
          defaultValue={task?.dueDate || ""}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
        >
          Save Task
        </button>
      </div>
    </form>
  );
});

export default TaskForm;
