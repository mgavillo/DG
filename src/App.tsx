import { Timeline } from "./Timeline";
import { Charts } from "./Charts";
import { Maps } from "./Maps";
import { Description } from "./Description";

function App() {
  return (
    <div className="App flex justify-start items-start flex-col [&>*]:mb-32">
      <div className="flex flex-row items-start justify-between w-screen p-8">
        <div>
          <h1 className="pb-12 text-4xl w-full text-start">Absurbary Farm</h1>
          <Maps />
        </div>
        <Description />
      </div>
      <Charts />
      <Timeline />
    </div>
  );
}

export default App;
