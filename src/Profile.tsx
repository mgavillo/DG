import { users } from "./App"

interface props{
    user: string
}

export function Profile({user}:props){
    const userInfo = users.filter(el => el.name == user)[0]

    return(
        <div className="rounded-tl-lg mb-0 backdrop-blur-sm right-0 bottom-0 flex flex-row p-6 fixed items-center justify-around"
        style={{ background : 'linear-gradient(94.09deg, rgba(232, 232, 232, 0.67) -7.42%, rgba(232, 232, 232, 0.29) 63.42%, rgba(232, 232, 232, 0.71) 90.9%, rgba(232, 232, 232, 0.15) 109.83%)'}}>
            <img className="w-16 h-16 rounded-full mr-6" src={userInfo.photo}/>
            <p className="text-xl">{userInfo.name}</p>
        </div>
    )
}