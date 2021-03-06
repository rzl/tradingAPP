/* 网站案例模块 */

const router=require('koa-router')();
const goodsModel=require('../../model/goods');
const homeModel=require('../../model/layoutModel');
const layout=require('../../model/layoutCommon');
const info=require('../../middlewares/info');

router
    .get('/', async (ctx)=>{

        // 商品类别数据
        const classify=await homeModel.classify('公司案例');

        // 热门产品数据
        const hotGoods=await layout.hotGoods(1);
        const I=await layout.webI();

        // 商品列表
        const params=ctx.query;
        const page=parseInt(params.page) || 1;
        const pagesize=parseInt(params.pagesize) || 10;

        const data=await goodsModel.goodsList(page,pagesize,params.sid,params.name,1,1);
        const dataList = await data.list;
        const totalRows = await data.totalRows;
        const totalPage=Math.ceil(totalRows[0].n/pagesize);

        // 输出模板
        await ctx.render('shop',{
            signId: 'case', // 商品及案例区别标志
            classify, // 商品类别数据
            hotGoods, // 热门产品数据
            goodsList: info.paging(dataList,page,totalPage,totalRows), // 商品列表
            I:I[0] // logo

        });
    });
module.exports=router.routes();