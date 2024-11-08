import React, { useState } from "react";
import { decrypt } from "../utils/cryptoUtils";
import type { DiaryEntry } from "../context/DiaryContext"; // Comprend pas l'erreur ici

const ReadEntry: React.FC<{ entry: DiaryEntry }> = ({ entry }) => {
  const [decryptedContent, setDecryptedContent] = useState<string | null>(null);
  const [password, setPassword] = useState("");

  const handleDecrypt = () => {
    try {
      const content = decrypt(entry.encryptedContent, password);
      if (content) {
        setDecryptedContent(content);
      } else {
        alert("Incorrect password");
      }
    } catch (error) {
      alert("An error occurred during decryption");
    }
  };

  return (
    <div>
      <h2>{entry.title}</h2>
      {decryptedContent ? (
        <p>{decryptedContent}</p>
      ) : (
        <div>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button onClick={handleDecrypt}>Decrypt</button>
        </div>
      )}
    </div>
  );
};

export default ReadEntry;
