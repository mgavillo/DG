interface PopUpProps {
  title: string;
  options: any[];
  setClose: any;
}

export function PopUp({ title, options, setClose }: PopUpProps) {

  return (
    <div className="fixed m-0 top-0 right-0 bottom-0 left-0 z-50 w-screen h-screen bg-[#000000CC] flex flex-col justify-center items-center">
      <div className="w-3/5 h-fit bg-white rounded-lg flex flex-col align-center">
        <h1 className="text-3xl mt-4">{title}</h1>
        <div className="flex flex-row [&>*]:m-2 m-4 justify-center">
          {options.map((option) => (
            <div
              className={`rounded-md border-2 px-4 py-2 w-fit border-black hover:cursor-pointer ${
                option.primary ? "bg-black text-white" : "bg-white "
              }`}
              onClick={option.action}
            >
              {option.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
