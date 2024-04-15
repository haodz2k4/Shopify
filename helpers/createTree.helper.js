module.exports = createTree = (arr,parentId="") =>{
    const tree = [];
    for(const item of arr){
        if(item.parent_category === parentId){
            const newItem = item;
            const children = createTree(arr,item.id);
            if(children.length > 0){
                newItem.children =children
            }
            tree.push(newItem);
        }   
    }
    return tree;
}