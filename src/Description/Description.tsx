import { FaSeedling } from "react-icons/fa";
import {FaUser} from "react-icons/fa"
const practices = ["No till", "Agroforestry"];
const crops = ["OilHemp"];

export function Description() {
  return (
    <div className="rounded-lg w-96 shadow-lg p-4 flex flex-col items-start [&>*]:m-4">
      <div className="relative w-fit h-10">
        <h2 className="text-3xl font-bold">About</h2>
        <div className="absolute bottom-0 h-[0.3rem] w-full bg-gradient-to-r from-gaia-light-blue to-gaia-blue solid" />
      </div>
      <p className="text-left">
        Roots & Culture (RC) is an indoor hemp farm in Nelson County, Virginia,
        USA where high CBD hemp flowers are grown and harvest, then processed
        into CBD extract which is infused into CBD skincare products. They have
        been growing elite quality hemp extract indoors since 2018 because they
        can control all aspects of the environment to ensure their plants
        experience only the most favourable conditions for proper development.
      </p>
      <div className="flex flex-row">
        <div className="rounded-full border-green-500 border-4 mr-2 overflow-hidden flex items-center justify-center" style={{width:"70px", height:"70px"}}>
          <FaUser size={40} />
        </div>
        <img
          src="/matthew.jpg"
          style={{width:"70px", height:"70px"}}
          className="rounded-full border-violet-700 border-4 object-fill"
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
