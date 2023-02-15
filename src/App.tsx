import Maps from "./Maps";
import Timeline from "./Timeline";
function App(){
  return(
    <div className="App flex justify-start items-start flex-col p-8">
      <h1 className="pb-12 text-4xl">Absurbary Farm</h1>
      <Maps />
      <Timeline/>
    </div>
  )
}

export default App