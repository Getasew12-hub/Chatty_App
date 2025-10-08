import { CronJob } from "cron";
import https from "https"

const url='https://chatty-app-btbh.onrender.com';

const job =new CronJob('0 */14 * * * *',function(){
    https.get(url,(res)=>{
        if(res.statusCode==200){
            console.log('Get successfuly')
        }else{
            console.log('Faild to get ')
        }
    }).on('error',(e)=>{
        console.log('Faild to get',e.message)
    })
})

export default job;