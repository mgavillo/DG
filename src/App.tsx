import { Timeline } from "./Timeline";
import { Charts } from "./Charts";
import { Maps } from "./Maps";
import { Impact } from "./Impact";

function App() {
  return (
    <div className="App flex justify-start items-start flex-col p-8 [&>*]:mb-32">
      <div>
        <h1 className="pb-12 text-4xl w-full text-start">Absurbary Farm</h1>
        <Maps />
      </div>
      <Impact/>
      <Charts />
      <Timeline />
    </div>
  );
}

export default App;
