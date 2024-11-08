import React, { useContext } from "react";
import { DiaryContext } from "../context/DiaryContext";

const EntryList: React.FC<{ onView: (id: string) => void; onUpdate: (id: string) => void }> = ({ onView, onUpdate }) => {
  const { entries, deleteEntry } = useContext(DiaryContext)!;

  return (
    <div>
      <h2>Your Entries</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            <h3>{entry.title}</h3>
            <p>{entry.date.toLocaleDateString()}</p>
            <button onClick={() => onView(entry.id)}>View</button>
            <button onClick={() => onUpdate(entry.id)}>Update</button>
            <button onClick={() => deleteEntry(entry.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntryList;
