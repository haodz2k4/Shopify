
//handle btnSeeMore here
const btnSeeMore = document.querySelector("[btn-see-more]");

if(btnSeeMore){
    const url = new URL(window.location.href);
    btnSeeMore.addEventListener("click",() =>{
        console.log("Heelo")
        url.searchParams.set("page",'2');
        window.location.href = url.href;
    })
}
//handle pagination here
const btnPagination = document.querySelectorAll("[btn-pagination]");
if(btnPagination){
    let url = new URL(window.location.href);
    btnPagination.forEach((item) =>{
            item.addEventListener("click",() =>{
                const value = item.getAttribute("btn-pagination");
                if(value === '1'){
                    url.searchParams.delete("page")
                }else if(value){
                    url.searchParams.set("page",value);
                }
                window.location.href = url.href;
            })
    })
}
//handle sorted here
const btnSorted = document.querySelectorAll("[btn-sorted]");
if(btnSorted.length > 0){
    let url = new URL(window.location.href);
    btnSorted.forEach((item) =>{
        item.addEventListener("click",() =>{
            const value = item.getAttribute("btn-sorted");

            const [keySort,valueSort] = value.split("-");
            
            if(keySort && valueSort){
                url.searchParams.set("keySort",keySort);
                url.searchParams.set("valueSort",valueSort);
            }

            window.location.href = url.href;
        })
    })
    const quertSortKey = url.searchParams.get("keySort");
    const quertSortValue = url.searchParams.get("valueSort");
    if(quertSortKey && quertSortValue){
        btnSorted.forEach((item) => {
            const value = item.getAttribute("btn-sorted");
            console.log(value);
            if(value === `${quertSortKey}-${quertSortValue}`){
                item.classList.add("btn-secondary")
            }
        })
    }else{
        const value = document.querySelector("[btn-sorted='price-desc']");
        value.classList.add("btn-secondary");
         
    }
}
