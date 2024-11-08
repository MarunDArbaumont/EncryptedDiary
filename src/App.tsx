import React, { useContext, useState } from "react";
import { DiaryProvider, DiaryContext, DiaryEntry } from "./context/DiaryContext";
import CreateEntry from "./components/CreateEntry";
import EntryList from "./components/EntryList";
import ReadEntry from "./components/ReadEntry";

const App: React.FC = () => {
  const [viewingEntry, setViewingEntry] = useState<DiaryEntry | null>(null);
  const { entries } = useContext(DiaryContext);
  return (
    <DiaryProvider>
      <div className="App">
        <h1>Encrypted Diary</h1>
        <CreateEntry />
        <DiaryContext.Consumer>
          {({ entries }) => (
            viewingEntry ? (
              <ReadEntry entry={viewingEntry} />
            ) : (
              <EntryList
                onView={(id) => setViewingEntry(entries.find((entry: DiaryEntry) => entry.id === id) || null)}
                onUpdate={(id) => console.log("Update entry with id", id)}
              />
            )
          )}
        </DiaryContext.Consumer>
      </div>
    </DiaryProvider>
  );
};

export default App;
