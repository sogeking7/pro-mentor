import { useState } from "react";

type Entry = {
  id: number;
  date: string;
  text: string;
};

export const ReflectionJournal = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [text, setText] = useState<string>("");

  const addEntry = (): void => {
    if (!text.trim()) return;
    const newEntry: Entry = {
      id: Date.now(),
      date: new Date().toLocaleString("kk-KZ"),
      text: text.trim(),
    };
    setEntries((prev) => [newEntry, ...prev]);
    setText("");
  };

  const deleteEntry = (id: number): void => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  return (
    <div className="mx-auto max-w-xl rounded-xl border bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-purple-600">
        📝 Рефлексия журналы
      </h2>

      <div className="mb-6 space-y-4">
        <textarea
          rows={4}
          className="w-full rounded-lg border border-gray-300 p-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
          placeholder="Бүгін не нәрсе қуантты/шаршатты? Нені жақсартуға болады?"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setText(e.target.value)
          }
        />
        <button
          onClick={addEntry}
          disabled={!text.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700 disabled:opacity-50"
        >
          📝 Жазба қосу
        </button>
      </div>

      <div className="max-h-96 space-y-3 overflow-y-auto">
        {entries.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            <p>📖 Әзірше жазбалар жоқ</p>
            <p className="text-sm">Жоғарыда өз ойларыңызды жазыңыз</p>
          </div>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className="rounded-lg border bg-gray-50 p-4 transition-all hover:shadow-md"
            >
              <div className="mb-2 flex items-start justify-between">
                <div className="text-sm text-gray-500">{entry.date}</div>
                <button
                  onClick={() => deleteEntry(entry.id)}
                  className="text-red-500 transition-colors hover:text-red-700"
                  title="Өшіру"
                >
                  🗑️
                </button>
              </div>
              <div className="whitespace-pre-wrap text-gray-800">
                {entry.text}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
