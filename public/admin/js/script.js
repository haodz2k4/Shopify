
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