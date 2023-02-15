import { GrAdd } from "react-icons/gr";
import { getDatabase, ref, set, push } from "firebase/database";

import React, { useState } from "react";

const types = [
  "💊 Fertilizer",
  "🪲 Pesticide",
  "💀 Herbicide",
  "💦 Irrigation",
  "🌱 Seeding",
  "✂️ Harvest",
];

export function NewEvent() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [changedEndDate, setChangedEndDate] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedType, setSelectedType] = useState(types[0]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const db = getDatabase();
    push(ref(db, "fields/" + 0 + "/Events/"), {
      type: selectedType,
      startDate: startDate.getTime(),
      endDate: endDate.getTime(),
      description: description
    });

    console.log("Start date:", startDate);
    console.log("End date:", endDate);
    console.log("Description:", description);
    console.log("Type:", selectedType);
  };

  const changeEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value);
    const roundedStart = new Date(startDate.setHours(0, 0, 0, 0));
    if (newDate.getTime() >= roundedStart.getTime()) {
      setEndDate(new Date(event.target.value));
      setChangedEndDate(true);
    }
    if (newDate.getTime() == roundedStart.getTime()) setChangedEndDate(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-8 [&>*]:mb-6 w-1/5">
        <select
          value={selectedType}
          onChange={(event) => setSelectedType(event.target.value)}
          className={"text-xl rounded-md p-3"}
        //   readOnly={true}
        >
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

      <textarea
        className="w-full h-56 p-3 focus:border-amber-500"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Description"
        readOnly={true}
      />
      <div className="flex flex-row">
        <label className="flex flex-col w-fit">
          Start Date
          <input
            className="mr-2"
            type="date"
            value={startDate.toISOString().substr(0, 10)}
            onChange={(event) => setStartDate(new Date(event.target.value))}

/>
        </label>
        <label
          className={`flex flex-col justify-start ml-3 ${
            changedEndDate ? "" : "opacity-40"
          }`}
        >
          End Date
          <input
            className=""
            type="date"
            value={endDate.toISOString().substr(0, 10)}
            onChange={(event) => changeEndDate(event)}
            // onFocus={() => setChangedEndDate(true)}
            min={startDate.toISOString().split("T")[0]}
          />
        </label>
      </div>
      <div className="w-full flex items-center justify-center">
        <button
          type="submit"
          className="py-1 px-3 rounded-md border-2 border-neutral-800 hover:bg-neutral-800 hover:text-gray-50 w-fit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
