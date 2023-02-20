import { FaSeedling } from "react-icons/fa";
const practices = ["No till", "Agro forestry"];
const crops = ["Hemp"];

export function Description() {
  return (
    <div className="rounded-lg w-96 shadow-lg p-4 flex flex-col items-start [&>*]:m-4">
      <div className="relative w-fit h-10">
        <h2 className="text-3xl font-bold">About</h2>
        <div className="absolute bottom-0 h-[0.3rem] w-full bg-gradient-to-r from-gaia-light-blue to-gaia-blue solid"/>
      </div>
      <p className="text-left">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <div className="flex flex-row">
        <img
          src="/avatar1.jpg"
          width="70px"
          className="rounded-full border-green-500 border-4 mr-2"
        />
        <img
          src="/avatar2.jpg"
          width="70px"
          className="rounded-full border-violet-700 border-4"
        />
      </div>
      <div className="flex flex-col items-start">
        <div className="flex flex-row items-center justify-center mb-2">
          <FaSeedling size={15} />
          <h3 className="ml-2 text-xl">Practices</h3>
        </div>
        <div className="flex flex-row flex-wrap">
          {practices.map((element, index) => {
            return (
              <div
                className="py-1 px-3 rounded-md hover:cursor-pointer mr-2 hover:border-neutral-800 border w-fit"
                key={index}
              >
                {element}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col items-start">
        <div className="flex flex-row items-center justify-center mb-2">
          <FaSeedling size={15} />
          <h3 className="ml-2 text-xl">Crops</h3>
        </div>
        <div className="flex flex-row flex-wrap">
          {crops.map((element, index) => {
            return (
              <div
                className="py-1 px-3 rounded-md hover:cursor-pointer hover:border-neutral-800 border w-fit"
                key={index}
              >
                {element}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
