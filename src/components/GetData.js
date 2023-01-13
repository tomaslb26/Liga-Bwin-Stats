export default function GetData(dataset, type, outcome, progressive, playerId) {



    var temp = dataset.filter(item => {
        if(Number(item["playerId"]) === Number(playerId)) return item
                                        })
    

    if (Array.isArray(type)) {
        temp = temp.filter(item => type.includes(item["type"]))
    }
    else {
        temp = temp.filter(item => item["type"] === type)
    }

    if (outcome != null) temp = temp.filter(item => item["outcomeType"] === outcome)

    if (progressive != null) temp = temp.filter(item => item["progressive"] === progressive)

    return temp

}