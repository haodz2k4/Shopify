
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
                const pages = item.getAttribute("btn-pagination");
                
                if(pages == 1){
                    url.searchParams.delete("pages");
                }
                else if(pages){
                    url.searchParams.set("pages",pages)
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
        event.preventDefault();
        const isConfirm = confirm("Bạn có muốn mua sản phẩm không");
        if(!isConfirm){
            return;
        }
        const formOrder = document.querySelector("[form-order]")
        
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
//end logout 

//start filter
const checkBoxCategory = document.querySelectorAll("[chb-category]");
if(checkBoxCategory.length > 0){
    checkBoxCategory.forEach((item) =>{
        item.addEventListener("click",() =>{
            const slug = item.value;
            if(item.checked == false){
                window.location.href = `/products/`
                return;
            }
            window.location.href = `/products/${slug}`;

            
        })
    })
}
//end filter
//start price range 
const priceRange = document.querySelector("[price-range]");
if(priceRange){
    const button = priceRange.querySelector("button");
    const url = new URL(window.location.href);
    button.addEventListener("click",() =>{
        const minPrice = priceRange.querySelector("input[name='minPrice']").value;
        const maxPrice = priceRange.querySelector("input[name='maxPrice']").value;
        if(minPrice >= maxPrice){
            alert("Giá trị bắt đầu phải nhỏ hơn giá trị xuất phát");
            return;
        }
        if(minPrice && maxPrice){
            url.searchParams.set("minPrice",minPrice);
            url.searchParams.set("maxPrice",maxPrice);
        }else{
            alert("Bạn chưa nhập gì cả");
            return;
        }
        

        window.location.href = url.href
    })
}
//handle chating side clients here
const formSendMessage = document.querySelector("[form-send-message]");
if(formSendMessage){
    formSendMessage.addEventListener("submit",(e) =>{
        e.preventDefault();
        const TextArea = formSendMessage.querySelector("textarea");
        if(TextArea.value){
            socket.emit("CLIENT_SEND_MESSAGE",TextArea.value);
            TextArea.value = "";
        }
        
    })
}
socket.on("SERVER_RETURN_MESSAGE",(data) =>{
    const contentChat = document.querySelector("[content-chat]");
    const div = document.createElement("div");
    const userId = contentChat.getAttribute("content-chat");
    if(userId === data.userId){
        div.innerHTML = `
        <div class="d-flex flex-row justify-content-end mb-4">
        <div class="p-3 me-3 border" style="border-radius: 15px; background-color: #fbfbfb;">
            <p class="small mb-0"> ${data.content} </p>
        </div><img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp" alt="avatar 1" style="width: 45px; height: 100%;" /></div>
        `
    }else{
        div.innerHTML = `
        <p> ${data.fullName} </p>
        <div class="d-flex flex-row justify-content-start mb-4"><img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="avatar 1" style="width: 45px; height: 100%;" />
        <div class="p-3 ms-3" style="border-radius: 15px; background-color: rgba(57, 192, 237,.2);">
            <p class="small mb-0"> ${data.content}</p>
        </div>
    </div>
        `
    }
    contentChat.appendChild(div);
    contentChat.scrollTop = contentChat.scrollHeight;
    
})  
//scroll top 
const contentChat = document.querySelector("[content-chat]");
if(contentChat){
    contentChat.scrollTop = contentChat.scrollHeight;
}
//handle emoji picker 
const emojiPicker = document.querySelector('emoji-picker')
if(emojiPicker){
    emojiPicker.addEventListener('emoji-click', event => {
        const unicode = event.detail.unicode;
        
        const TextArea = formSendMessage.querySelector("textarea");
        TextArea.value += unicode;
    });
}
//end emoji picker 
//show emoji picker 
const btnShowEmoji = document.querySelector("[btn-show-emoji]");
if(btnShowEmoji){
    btnShowEmoji.addEventListener("click",() =>{
        emojiPicker.classList.toggle("d-none")
    })
}
//end emoji picker 
//typing 
const TextArea = document.querySelector("textarea");
if(TextArea){
    TextArea.addEventListener("keyup",() =>{

        socket.emit("CLIENTS_SEND_TYPING","show");
    })
}
const listTyping = document.querySelector(".list-typing")
socket.on("SERVER_RETURN_TYPING",(data) =>{
    if(data.type === "show"){
        const existsBoxTyping = listTyping.querySelector(`[box-typing="${data.userId}"]`);
        if(!existsBoxTyping){
            const boxTyping = document.createElement("div");
            boxTyping.setAttribute("box-typing",data.userId)
            boxTyping.innerHTML= 
                `
                    <p style="color: red">${data.fullName} </p>
                    <p>Đang nhắn</p>
                `
            listTyping.appendChild(boxTyping);
            setTimeout(() =>{
                boxTyping.classList.add("d-none")
            },2000)
        }
        
    }
    
})
//end typing 
//handle sorting here 
const btnSorting = document.querySelectorAll("[btn-sorting]");
if(btnSorting.length > 0){
    const url = new URL(window.location.href);
    btnSorting.forEach((item) =>{
        item.addEventListener("click",() =>{
            const value = item.getAttribute("btn-sorting");
            const [sortKey,sortValue] = value.split("-");
            url.searchParams.set("sortKey",sortKey);
            url.searchParams.set("sortValue",sortValue);
            
            window.location.href = url.href;
        })
    })
}
//show form feed back 
const showFeedback = document.querySelectorAll("[show-feedback]");
if(showFeedback.length > 0){
    showFeedback.forEach((item) =>{
        item.addEventListener("click",() =>{
            const formFeedback = document.querySelector("[form-feedback]");
            const name = item.closest("tr").querySelector("[name]").innerHTML;
            const id = item.closest("tr").querySelector("[data-id]").getAttribute("data-id");
            const inp = formFeedback.querySelector("input[name='productId']");
            
            inp.value = id;
            const title = formFeedback.querySelector("h2");
            if(formFeedback.classList.contains("d-none")){
                
                formFeedback.classList.toggle("d-none");
            }
            title.innerHTML = `Bình Luận Sản Phẩm ${name}`
        })
    })
}
