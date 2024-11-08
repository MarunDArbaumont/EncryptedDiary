import React, { useState, useContext } from "react";
import { DiaryContext, DiaryEntry } from "../context/DiaryContext";
import { encrypt, decrypt } from "../utils/cryptoUtils";

interface UpdateEntryProps {
  entry: DiaryEntry;
  onSave: () => void; // Callback function to close the update view after saving
}

const UpdateEntry: React.FC<UpdateEntryProps> = ({ entry, onSave }) => {
  const { updateEntry } = useContext(DiaryContext)!;
  const [title, setTitle] = useState(entry.title);
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [isDecrypted, setIsDecrypted] = useState(false);

  const handleDecrypt = () => {
    const decryptedContent = decrypt(entry.encryptedContent, password);
    if (decryptedContent !== null) {
      setContent(decryptedContent);
      setIsDecrypted(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  const handleSave = () => {
    if (title && content && password) {
      const encryptedContent = encrypt(content, password);
      const updatedEntry = { ...entry, title, encryptedContent, date: new Date() };
      updateEntry(entry.id, updatedEntry);
      onSave(); // Close the update view after saving
    }
  };

  return (
    <div>
      <h2>Update Entry</h2>
      {!isDecrypted ? (
        // Show password input for decryption if not yet decrypted
        <div>
          <input
            type="password"
            placeholder="Enter password to decrypt"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleDecrypt}>Decrypt</button>
        </div>
      ) : (
        // Show editable form after decryption
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter new password to re-encrypt"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSave}>Save Changes</button>
        </div>
      )}
    </div>
  );
};

export default UpdateEntry;
