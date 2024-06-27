import React, { useState } from 'react';

function EditTaskPopup({ task, onSave, onCancel }) {
  const [taskName, setTaskName] = useState(task);

  const handleSave = () => {
    onSave(taskName);
  };

  return (
    <div className="edit-popup">
      <h2>Edit task</h2>
      <input
        type="text"
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
      />
      <button className="save-button" onClick={handleSave}>Save</button>
      <button className="cancel-button" onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default EditTaskPopup;