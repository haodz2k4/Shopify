
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
//Handle soft delete
const btnSoftDelete = document.querySelectorAll("[btn-sort-delete]");
if(btnSoftDelete.length > 0){
    const formSoftDelete = document.querySelector("[form-soft-delete]");
    btnSoftDelete.forEach((item) =>{
        item.addEventListener("click",() =>{
            const id = item.getAttribute("btn-sort-delete");

            const dataPath = formSoftDelete.getAttribute("data-path");
            const action = `${dataPath}/${id}?_method=PATCH`;

            formSoftDelete.action = action;
            formSoftDelete.submit();

            
        })
    })
}
//handle delete
const btnDelete = document.querySelectorAll("[btn-delete]");
if(btnDelete){
    const formDelete = document.querySelector("[form-delete]")
    btnDelete.forEach((item) =>{
        
        item.addEventListener("click",() =>{
            const isConfirm = confirm("Bạn có muốn chắc xóa sản phẩm không");
            if(isConfirm){
                const id = item.getAttribute("btn-delete");
                const path = formDelete.getAttribute("data-path");
                const action = `${path}/${id}?_method=DELETE`;

                formDelete.action =action;
                formDelete.submit();
            }
            
        })
    })
}

//handle formChangeMulti
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
    formChangeMulti.addEventListener("submit",(event) =>{
        event.preventDefault();
        const inputId = formChangeMulti.querySelector("input[name='id']");
        if(inputId.value === ""){
            alert("Vui lòng chọn ít nhất 1 bản ghi")
            return;
        }
        const checkedList = document.querySelectorAll("input[name='ids']:checked");
        const select = formChangeMulti.querySelector("select[name='typeMulti']").value;
        if(select === 'delete-multi'){
            const isConfirm = confirm("Bạn có chắc muốn xóa tất cả sản phẩm này");
            if(!isConfirm){
                return;
            }
        }
        const IdList = [];
        for(const item of checkedList){
            let value = "";
            if(select === 'change-position-multi'){
                const isConfirm = confirm("Bạn có chắc muốn thay đổi vị trí của sản phẩm");
                if(isConfirm){
                    const position = item.closest("tr").querySelector("input[name='position']").value;
                    const idJoinPosition = `${item.value}-${position}`;
                    value = idJoinPosition;
                }
                
            }else{
                 value = item.value;
            }

            IdList.push(value);
        }
        const stringIdJoin = IdList.join("; ");
        inputId.value = stringIdJoin;
        formChangeMulti.submit();
        
    })
}
//end handle

//Handle timeout and close alert here
const timeOutAlert = document.querySelector("[time-out-alert]");
if(timeOutAlert){
    setTimeout(() =>{
        timeOutAlert.classList.add("d-none");
    }, 3000)
}
const btnCloseAlert = document.querySelector("[btn-close-alert]");

if(btnCloseAlert){  
    btnCloseAlert.addEventListener("click",() => {
        timeOutAlert.classList.add("d-none");
    })
}
//end handle
//handle sortTingSelect 
const sortingSelect  = document.querySelector("#sortingSelect");
if(sortingSelect){
    const url = new URL(window.location.href);
    sortingSelect.addEventListener("change",() =>{
        const value = sortingSelect.value;
        const [sortkey, sortValue] = value.split("-");
        if(sortkey && sortValue){
            url.searchParams.set("sortKey",sortkey);
            url.searchParams.set("sortValue",sortValue);
            window.location.href = url.href;
        }
    })
    const querySortKey = url.searchParams.get("sortKey");
       const querySortValue = url.searchParams.get("sortValue");
       if(querySortKey && querySortValue){
          const String = `${querySortKey}-${querySortValue}`;
          const option = sortingSelect.querySelector(`option[value='${String}']`);
          option.selected = true;
          
       }
    const btnClear = document.querySelector("[btn-clear]");
    if(btnClear){
        btnClear.addEventListener("click",() =>{
            url.searchParams.delete("sortKey");
            url.searchParams.delete("sortValue");

            window.location.href = url.href;
        })
}
}
//handle show image review 
const inpReview = document.querySelector("[inp-review]");

if(inpReview){
    const imgReview = document.querySelector("[img-review]");
    inpReview.addEventListener("change",() =>{
        const [file] = inpReview.files;
        if(file){
            
            imgReview.src = URL.createObjectURL(file);
        }
    })
}
//handle edit 
const btnEdit = document.querySelector("[btn-edit]");
if(btnEdit){
    btnEdit.addEventListener("click",() =>{
        const value = btnEdit.getAttribute("btn-edit");
        
    })
}
//handle restore 
const btnRestore = document.querySelectorAll("[btn-restore]");
if(btnRestore.length > 0){
    const formRestore = document.querySelector("[form-restore]");
    btnRestore.forEach((item) =>{
        item.addEventListener("click",() =>{
            const value = item.getAttribute("btn-restore");
            const path = formRestore.getAttribute("data-path");
            const action = `${path}/${value}?_method=PATCH`;
            formRestore.action =action;
            formRestore.submit();

        })
    })
}
//handle submit permission
const btnSubmitPermission = document.querySelector("[btn-submit-permissions]");
if(btnSubmitPermission){
    const roles = [];
    btnSubmitPermission.addEventListener("click",() =>{
        const tablePermission = document.querySelector("[table-permissions]");
        const row = tablePermission.querySelectorAll("tbody tr[data-name]");
        for(const item of row){
            const dataName = item.getAttribute("data-name");
            const inputs = item.querySelectorAll ("input");
            if(dataName === "id"){
                inputs.forEach((item) =>{
                    const id = item.value;
                    roles.push({
                        id: id,
                        permissions: []
                    })
                })
            }else{
                inputs.forEach((item, index) =>{
                    const inpChecked = item.checked
                    if(inpChecked){
                        roles[index].permissions.push(dataName)
                    }
                })
            }
        }
        console.log(roles);
    if(roles.length > 0){
        const formChangePermission = document.querySelector("[form-change-permissions]");
        const inpRoles = formChangePermission.querySelector("input[name='roles']")
        inpRoles.value = JSON.stringify(roles);
        formChangePermission.submit();
    }
        
    })
    
};
//handle data default here
const dataDefault = document.querySelector("[data-roles]");
if(dataDefault){
    const value = JSON.parse(dataDefault.getAttribute("data-roles"));
    const tablePermission = document.querySelector("[table-permissions]");
   
    value.forEach((item, index) =>{
        const permission = item.permissions;
        permission.forEach((item) =>{
            const row = tablePermission.querySelector(`tr[data-name="${item}"]`);
            const inp = row.querySelectorAll(`input`)[index];
            inp.checked = true;
        })
    })
    
    
    
}