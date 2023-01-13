export default function GetPhoto(players, player){
    try{
        let photo = players.filter((item) => item.name === player)[0].photo
        return photo
    }
    catch(e){
        
    }
}