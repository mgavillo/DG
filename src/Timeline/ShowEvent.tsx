import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { GrEdit, GrClose, GrPrevious } from "react-icons/gr";
import { BsCalendar } from "react-icons/bs";
import "./EventCard.css";
import { getDatabase, ref, remove } from "firebase/database";
import { PopUp } from "../components";

export function ShowEvent({ e, setShowSelf, setEditEvent, left}: any) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [removePopUp, setRemovePopUp] = useState<boolean>(false);

  const removeEvent = async () => {
    const db = getDatabase();
    const ret = remove(ref(db, "fields/" + 0 + "/Events/" + e.key));
    setRemovePopUp(false);
  };

  const editEvent = () => {
    setShowSelf(false);
    setEditEvent(e);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
      setShowSelf(false);
    }
  };

  const handlePrevClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowSelf(false);
  };

  useEffect(() => {
    setTimeout(() => {
      document.addEventListener("click", handleClickOutside);

    }, 100)
    return () => {
      document.removeEventListener("click", handleClickOutside);
    }
  }, []);

  return (
    <div
      className={`cardContainer absolute hover:cursor-default top-10 z-50 ${left ? "left-0" : "right-0"} bg-neutral-50 border`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={cardRef}
    >
      {hovered && (
        <div className="flex flex-row [&>*]:ml-2 absolute m-4 top-0 right-0">
          {/* <GrEdit className="hover:cursor-pointer" onClick={editEvent} /> */}
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
        onClick={(e: React.MouseEvent) => handlePrevClick(e)}
      />
      <h1 className="text-2xl rounded-md font-bold">{e.crop ? e.crop : "Hemp"}</h1>
      <h1 className="text-xl rounded-md">{e.type}</h1>
      <h3>{e.amount ? 0 : e.amount} </h3>
      <p className="description">{e.description}</p>
      <div className="italic"> {`${new Date(e.startDate).toLocaleDateString()} ${new Date(e.startDate).toLocaleDateString() !== new Date(e.endDate).toLocaleDateString() ? "-"  + new Date(e.endDate).toLocaleDateString() : ""}`}</div>

      {/* <div className="datesContainer">
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
      </div> */}
    </div>
  );
}
