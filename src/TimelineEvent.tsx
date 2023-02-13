import { timeFrame } from "./utils"

interface TimelineEventProps{
    e: any,
    timeSelected: number
}
export function TimelineEvent({e, timeSelected}: TimelineEventProps){
    const eventLength = new Date(e.endDate - e.startDate).getDate()
    const nCols = timeFrame.nCols[timeSelected]
    console.log(nCols, eventLength)
    // console.log(timeFrame.nCols[timeSelected]*eventLength)
    // const width = `calc(calc(80rem/${nCols})*${eventLength}+calc(calc(2px*${eventLength})+1px))`
    const length = (((1280 / nCols) * eventLength)).toFixed(2)
    
    return(
        <div className={`absolute rounded-md bg-gradient-to-r from-amber-400 to-amber-500 border-amber-500 top-12 hover:cursor-pointer`} style={{width: `calc(${eventLength}*calc(80vw/${nCols}))`}}>
            <div className="text-3xl">{e.type.split(" ")[0]}</div>
        </div>
    )
}