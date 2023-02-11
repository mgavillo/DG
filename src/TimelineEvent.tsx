export function TimelineEvent(e:any){
    console.log(e.data.type)
    return(
        <div className="w-[calc(80rem/7*3+calc(calc(2px*3)+1px))] absolute rounded-md bg-gradient-to-r from-amber-400 to-amber-500 border-amber-500 top-12 hover:cursor-pointer">
            <div className="text-3xl">{e.data.type.split(" ")[0]}</div>
        </div>
    )
}