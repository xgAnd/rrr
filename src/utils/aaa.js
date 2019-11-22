getTodayHoursList=()=>{
    //获取今天的剩余小时数
    let date=new Date()
    let hours = date.getHours(); //当前的小时数字  0~23 点
    let useHour=hours

    let minutes = date.getMinutes(); //获取分钟数  0~50 分
    let useMinutes=minutes
    if(minutes>=50){
        //小时数应该加1 如果小时数已经达到最大 即 23 则保持不变
        if(hours<23){
            useHour+=1
            useMinutes=0
        }
    }else {
        useMinutes+=10
        let timestr=useMinutes+''
        let useStr = timestr[0]+'0';
        useMinutes = parseInt(useStr,10);
    }
    let AlloutList=[]
    console.log('useHour',useHour,'useMinutes',useMinutes)
    for (let i=useHour;i<=23;i++){
        let outList=[]
        let outInfo={value:i,label:useHour+'点'}
        if(i!==useHour){
            useMinutes=0
        }
        for (let j=useMinutes;j<=50;j+=10){
            let innerInfo={value:useMinutes,label:useMinutes+'分'}
            outList.push(innerInfo)
        }
        outInfo.children=outList
        AlloutList.push(outInfo)

    }
    return AlloutList
}

let todayHoursList = getTodayHoursList();
console.log(todayHoursList)