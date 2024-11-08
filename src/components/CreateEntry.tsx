import React, { useState, useContext } from "react";
import { DiaryContext } from "../context/DiaryContext";
import { encrypt } from "../utils/cryptoUtils";

const CreateEntry: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const { addEntry } = useContext(DiaryContext)!;

  const handleSave = () => {
    if (title && content && password) {
      const encryptedContent = encrypt(content, password);
      const newEntry = {
        id: Date.now().toString(),
        title,
        encryptedContent,
        date: new Date(),
      };
      addEntry(newEntry);
      setTitle("");
      setContent("");
      setPassword("");
    }
  };

  return (
    <div>
      <h2>Create New Entry</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleSave}>Save Entry</button>
    </div>
  );
};

export default CreateEntry;