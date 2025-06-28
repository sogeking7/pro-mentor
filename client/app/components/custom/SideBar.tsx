import React, { useState } from "react";

export type SideBarSection = {
  title: string;
  content: React.ReactNode;
};

export type SideBarSections = Array<SideBarSection>;

interface SideBarProps {
  title?: string;
  sections: SideBarSections;
}

export const SideBar = ({ title = "Бөлімшелер", sections }: SideBarProps) => {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <div className="sticky top-4 rounded-xl bg-white p-4 shadow-lg">
          <h3 className="mb-4 font-semibold">{title}</h3>
          <nav className="space-y-2">
            {sections.map((section, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSection(idx)}
                className={`w-full rounded-lg p-3 text-left transition-colors ${
                  activeSection === idx
                    ? "border-l-4 border-blue-500 bg-blue-100 text-blue-700"
                    : "hover:bg-gray-50"
                }`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="lg:col-span-3">
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold">
            {sections[activeSection].title}
          </h2>
          {sections[activeSection].content}
        </div>
      </div>
    </div>
  );
};
