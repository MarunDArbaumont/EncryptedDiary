import React, { createContext, useState, ReactNode } from "react";

interface DiaryEntry {
  id: string;
  title: string;
  encryptedContent: string;
  date: Date;
}

interface DiaryContextType {
  entries: DiaryEntry[];
  addEntry: (entry: DiaryEntry) => void;
  deleteEntry: (id: string) => void;
  updateEntry: (id: string, updatedEntry: DiaryEntry) => void;
}

const DiaryContext = createContext<DiaryContextType>({
  entries: [],
  addEntry: () => { },
  deleteEntry: () => { },
  updateEntry: () => { },
});

const DiaryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  const addEntry = (entry: DiaryEntry) => {
    setEntries((prevEntries) => [...prevEntries, entry]);
  };

  const deleteEntry = (id: string) => {
    setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
  };

  const updateEntry = (id: string, updatedEntry: DiaryEntry) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) => (entry.id === id ? updatedEntry : entry))
    );
  };

  return (
    <DiaryContext.Provider value={{ entries, addEntry, deleteEntry, updateEntry }}>
      {children}
    </DiaryContext.Provider>
  );
};

export { DiaryProvider, DiaryContext };
export type { DiaryEntry };
