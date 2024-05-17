module.exports.products = (req) =>{
    //handle button sorted by 
    const objectButtonSorted = [
        {
            name: "position-desc",
            value: "Mới nhất"
        },
        {
            name: "position-asc",
            value: "Cũ nhất"
        },
        {
            name: "price-asc",
            value: "Giá thấp nhất"
        },
        {
            name: "price-desc",
            value: "Giá cũ nhất"
        },
        {
            name: "sold-desc",
            value: "Mua nhiều nhất"
        }
    ];
    if(req.query.sortKey && req.query.sortValue){
        const stringName = `${req.query.sortKey}-${req.query.sortValue}`;
        const index = objectButtonSorted.findIndex(item => item.name == stringName);
        objectButtonSorted[index].class = "active"
    }else{
        objectButtonSorted[0].class = "active"
    }
    return objectButtonSorted;
}