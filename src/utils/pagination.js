const  getPagination = (req)=>{
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    return{page,limit,offset}
}

const getPaginationData = (data,page,limit)=>{

    const {count:TotalItem,rows:Data} = data;
    const totalpage = Math.ceil(TotalItem/limit);
    return{
        pagination:{
            TotalItem,
            totalpage,
            CurrentPages:page,
            limit,

        },
        Data
    }
}
export {
    getPagination,
    getPaginationData
} 