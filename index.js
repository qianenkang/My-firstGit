const Koa=require('koa');
const Router=require('koa-router');
const glob=require('glob');
const {resolve}=require('path');
const fs=require('fs');
const logger=require('koa-logger');
const app=new Koa();
const router=new Router({prefix:'/api'});
glob.sync(resolve('./api',"**/*.json")).forEach((item,i)=>{
    console.log(item,'-----')
   let apiJsonPath=item&&item.split('/api')[1];
   let apiPath=apiJsonPath.replace('.json','');
   router.get(apiPath,(ctx,next)=>{
       try {
           let jsonStr=fs.readFileSync(item).toString();
           ctx.body={
               data:JSON.parse(jsonStr),
               state:200,
               type:'success'
           }
       }catch (e) {
           ctx.throw('服务器错误',500)
       }
   })
});
app.use(logger());
app.use(router.routes())
    .use(router.allowedMethods());
app.listen(3100);
