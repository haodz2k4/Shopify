
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