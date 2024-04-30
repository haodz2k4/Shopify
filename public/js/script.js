
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
//end sorted 
//start time out alert
const timeOutAlert = document.querySelector("[time-out-alert]");
if(timeOutAlert){
    setTimeout(() =>{
        timeOutAlert.classList.add("d-none")
    },5000)
}
//end start time out 
//start checked cart 
const checkCartMulti = document.querySelector("[check-cart-multi]");
if(checkCartMulti){
    const checkAll = checkCartMulti.querySelector("input[name='checkall']");
    const checkMulti = checkCartMulti.querySelectorAll("input[name='ids']");
    let total = 0;
    checkAll.addEventListener("click",() =>{
        if(checkAll.checked){
            
            checkMulti.forEach((item) =>{
                const value = parseInt(item.closest("tr").querySelector("[total]").innerHTML);
                total += value;
                item.checked = true;
                
                totalPrice.innerHTML = "Tổng tiền: "+total
            })
        }else{
            checkMulti.forEach((item) =>{
                item.checked = false;
                total = 0
                totalPrice.innerHTML = "Tổng tiền: "+total

            })
        }
    })
    //handle total price
    const totalPrice = document.querySelector("[total-price]");
    checkMulti.forEach((item) =>{
        item.addEventListener("click",() =>{
            const countChecked = checkCartMulti.querySelectorAll("input[name='ids']:checked").length;
            const lengthData = checkMulti.length;
            if(countChecked === lengthData){
                checkAll.checked = true;
            }
            if(item.checked){
                const value = parseInt(item.closest("tr").querySelector("[total]").innerHTML);
                total += value;
            }else{

            }
            totalPrice.innerHTML = "Tổng tiền: "+total
        })
    })
     

}
//end checked cart
//start update quantity
const inpQuantity = document.querySelectorAll("[inp-quantity]");
if(inpQuantity.length > 0){
    inpQuantity.forEach((item) =>{
        item.addEventListener("change",() =>{
            //quantity
            const value = item.value;
            const id = item.getAttribute("inp-quantity");
            window.location.href = `/cart/update/${value}/${id}`

        })
    })
}
