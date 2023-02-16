import { useState } from "react";
import { GrEdit, GrClose, GrPrevious } from "react-icons/gr";
import { BsCalendar } from "react-icons/bs";
import "./EventCard.css";
import { getDatabase, ref, remove } from "firebase/database";
import PopUp from "./components/PopUp";

export default function ShowEvent({ e, setShowEvent, setEditEvent }: any) {
  const [hovered, setHovered] = useState(false);
  const [removePopUp, setRemovePopUp] = useState<boolean>(false);
  console.log(e);

  const removeEvent = async () => {
    const db = getDatabase();
    console.log(e);
    const ret = remove(ref(db, "fields/" + 0 + "/Events/" + e.key));
    setRemovePopUp(false);
  };

  const editEvent = () => {
    setShowEvent(null);
    setEditEvent(e);
  };
  return (
    <div
      className="cardContainer bg-amber-100"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <div className="flex flex-row [&>*]:ml-2 absolute m-4 top-0 right-0">
          <GrEdit className="hover:cursor-pointer" onClick={editEvent} />
          <GrClose
            className="hover:cursor-pointer"
            onClick={() => setRemovePopUp(true)}
          />
        </div>
      )}

      {removePopUp && (
        <PopUp
          title={"Are you sure you want to delete this event ?"}
          setClose={setRemovePopUp}
          options={[
            {
              content: "Cancel",
              primary: false,
              action: () => setRemovePopUp(false),
            },
            { content: "Delete", primary: true, action: () => removeEvent() },
          ]}
        />
      )}
      <GrPrevious
        className="absolute top-0 left-0 m-4 hover:cursor-pointer"
        color={"#000"}
        onClick={() => setShowEvent(null)}
      />
      <h1 className="text-xl rounded-md">{e.type}</h1>
      <p className="description">{e.description}</p>
      <div className="datesContainer">
        <div className="dateContainer">
          <p className="w-fit">Start date</p>
          <div className="flex flex-row justify-between items-center w-32">
            <p className="w-fit">
              {new Date(e.startDate).toLocaleDateString()}
            </p>
            <BsCalendar />
          </div>
        </div>
        <div className="dateContainer">
          <p className="w-fit">End date</p>
          <div className="flex flex-row justify-between items-center w-32">
            <p className="w-fit">{new Date(e.endDate).toLocaleDateString()}</p>
            <BsCalendar />
          </div>
        </div>
      </div>
    </div>
  );
}
