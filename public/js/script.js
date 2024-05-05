
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
                const value = parseInt(item.closest("tr").querySelector("[total]").innerHTML);
                total -= value;
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
//end update quantity 
//start checkout here 
const btnCheckout = document.querySelector("[btn-checkout]");
if(btnCheckout){
    const formCheckout = document.querySelector("[form-checkout]");
    btnCheckout.addEventListener("click",() =>{
        
        const ids = checkCartMulti.querySelectorAll("input[name='ids']:checked");
        if(ids.length === 0){
            alert("Vui lòng chọn ít nhất 1 sản phẩm")
            return;
        }
        const inpCheckout = formCheckout.querySelector("input");
        const listCheckout = [];
        for(const item of ids){
            const productId = item.value;
            const quantity = item.closest("tr").querySelector("input[inp-quantity]").value;
            const stringCheckout = `${productId}-${quantity}`;
            listCheckout.push(stringCheckout)
        }
        inpCheckout.value = JSON.stringify(listCheckout);
        formCheckout.submit();
        
    })
}
//end checkout here 
//start order here 
const btnOrder = document.querySelector("[btn-submit-order]");
if(btnOrder){
    const orderProducts = document.querySelector("[order-products]")
    btnOrder.addEventListener("click",(event) =>{
        const formOrder = document.querySelector("[form-order]")
        event.preventDefault();
        const inpOrder = document.querySelector("[inp-order]");
        const dataId = orderProducts.querySelectorAll("tbody tr td[data-id]");
        const listOrder = [];
        dataId.forEach((item) =>{
            const EachId = item.getAttribute("data-id");
            const quantity = item.closest("tr").querySelector("[quantity]").innerHTML;
            const stringOrders = `${EachId}-${quantity}`;
            listOrder.push(stringOrders);
            
        })
        inpOrder.value = JSON.stringify(listOrder);
        formOrder.submit();

         
    })
}
//end handle order here 
const btnShowFormAddress = document.querySelector("[btn-show-form-addAddress]");
if(btnShowFormAddress){
    let count = 0; 
    btnShowFormAddress.addEventListener("click", () =>{
        
        const formAddress = document.querySelector("[form-address]");
        formAddress.classList.toggle("d-none");
        count++;
        if(count % 2 === 0){
            btnShowFormAddress.innerHTML = "Thêm địa chỉ"
        }else{
            btnShowFormAddress.innerHTML = "Ẩn"
        }
    })
}
//start select-address-default
const selectAddressDefault = document.querySelector("[select-address-default]");
if(selectAddressDefault){
    selectAddressDefault.addEventListener("change",(event) =>{
        event.preventDefault();
        window.location.href = `/user/profiles/address/update/${selectAddressDefault.value}`
    })
}
//end select address default 
//start logout 
const btnLogout = document.querySelector("[btn-logout]");
if(btnLogout){
    btnLogout.addEventListener("click",() =>{
        const isConfirm = confirm("Bạn có chắc muốn đăng xuất không");
        if(!isConfirm){
            return;
        }
        window.location.href = `/user/logout`
    })
}