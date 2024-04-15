console.log("hello");
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