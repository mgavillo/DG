import { Timeline } from "./Timeline";
import { Charts } from "./Charts";
import { Maps } from "./Maps";
import { Description } from "./Description";
import { Impact } from "./Impact";
import { useState } from "react";
import { Profile } from "./Profile";
import {FaUser} from "react-icons/fa"
export const users = [
  { name: "Gaia", photo: "/gaia.png" },
  { name: "Matthew", photo: "/matthew.jpg" },
  { name: "Qais", photo: "/avatar2.jpg" },
];

function App() {
  const [user, setUser] = useState<string | null>(null);

  if (!user)
    return (
      <div className="App flex justify-center items-center w-screen h-screen flex-col">
        <h1 className="text-4xl font-black mb-12">Hello! Who are you ?</h1>
        <div className="flex flex-row w-[54rem] justify-around">
          {users.map((el) => {
            return (
              <div
                className="rounded-xl transition-all shadow-md w-64 h-80 hover:cursor-pointer hover:shadow-lg hover:scale-110 flex flex-col items-center justify-around"
                onClick={() => setUser(el.name)}
              >
                {el.name == "Qais" ? <FaUser size={170} color={"#B3A1E3"}/> : <img src={el.photo} className="rounded-full w-40 h-40" />}
                <p className="text-xl font-semibold">{el.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  return (
    <div className="App flex justify-start items-start flex-col">
      <div className="flex flex-row items-start justify-between w-screen p-8 px-24 pt-24 mb-32">
        <div>
          <h1 className="pb-12 text-4xl w-full text-start font-black">
          Roots and Culture Indoor Farm
          </h1>
          <Maps />
        </div>
        <div className="flex flex-col items-center">
          <Impact />
          <Description />
        </div>
      </div>
      <Charts />
      <Timeline user={user}/>
      <Profile user={user}/>
    </div>
  );
}

export default App;
