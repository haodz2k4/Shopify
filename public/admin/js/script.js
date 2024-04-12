
//Handle filter status
const btnFilterStatus = document.querySelectorAll("[btn-filter-status]");

if(btnFilterStatus.length > 0){
    let url = new URL(window.location.href);
    for(const item of btnFilterStatus){
        item.addEventListener("click",() =>{
            const status = item.getAttribute("btn-filter-status");
            if(status){
                url.searchParams.set("status",status);
            }else{
                url.searchParams.delete("status");
            }

            window.location.href = url.href;
            
        })
    }
}
//end handle filter status 

//handle formSearch here 
const formSearch = document.querySelector("[form-search-product]");
if(formSearch){
    const url = new URL(window.location.href);
    formSearch.addEventListener("submit",(event) =>{
        event.preventDefault();

        const keyword = event.target.elements.keyword.value;

        if(keyword){
            url.searchParams.set("keyword",keyword);
        }else{
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href

    })
}
//end handle formSearch 

//handle pagination here

const btnPagination = document.querySelectorAll("[btn-pagination]");

if(btnPagination.length > 0){
    let url = new URL(window.location.href);
    btnPagination.forEach((item) =>{
        item.addEventListener("click",() =>{
            const position = item.getAttribute("btn-pagination");

            if(position && parseInt(position) !== 1){
                url.searchParams.set("page",position);  
            }else{
                url.searchParams.delete("page");
            }

            window.location.href = url.href;
        })
    })
}
//handle change status product
const btnChangeStatus = document.querySelectorAll("[btn-change-status]");
if(btnChangeStatus.length > 0){
    const formChangeStatus = document.querySelector("[form-change-status]");
    btnChangeStatus.forEach((item) =>{
        item.addEventListener("click",() =>{
            const id = item.getAttribute("btn-change-status");
            const status = item.innerHTML;

            const dataPath = formChangeStatus.getAttribute("data-path");

            const action = `${dataPath}/${status}/${id}?_method=PATCH`;

            formChangeStatus.action = action;
            formChangeStatus.submit();


            
        })
    })
}

//handle checked change multi here 
const changeMulti = document.querySelector("[change-multi]");
if(changeMulti){
    const checkAll = changeMulti.querySelector("input[name='checkall']");
    const checkMulti = changeMulti.querySelectorAll("input[name='ids']");
    
    checkAll.addEventListener("click",() =>{
        if(checkAll.checked){
            checkMulti.forEach((item) =>{
                item.checked = true
            })
        }else{
            checkMulti.forEach((item) =>{
                item.checked = false;
            })
        }
    })

    checkMulti.forEach((item) =>{
        item.addEventListener("click",() =>{
            
        const countChecked = changeMulti.querySelectorAll("input[name='ids']:checked").length;
        const checkedLength = checkMulti.length;
        if(countChecked === checkedLength){
            checkAll.checked = true;
        }
        })
    })
}
//end handle 

//handle formChangeMulti
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
    formChangeMulti.addEventListener("submit",(event) =>{
        event.preventDefault();
        const inputId = formChangeMulti.querySelector("input[name='id']");
        const checkedList = document.querySelectorAll("input[name='ids']:checked");
        const IdList = [];
        for(const item of checkedList){
            const value = item.value;

            IdList.push(value);
        }
        const stringIdJoin = IdList.join("; ");
        inputId.value = stringIdJoin;
        formChangeMulti.submit();
        
    })
}
//end handle