// сортировка
export function sortData(data, field, direction) {
    const result = [...data].sort((a, b) => {
        if (!a.hasOwnProperty(field) || !b.hasOwnProperty(field)) {
            console.warn(`Поле "${field}" отсутствует в элементах массива`)
            return 0
        }

        if (field === 'date') {
            try {
                const dateA = new Date(a.date)
                const dateB = new Date(b.date)
                
                if (isNaN(dateA)) return direction === 'asc' ? 1 : -1
                if (isNaN(dateB)) return direction === 'asc' ? -1 : 1
                
                return direction === 'asc' 
                ? dateA - dateB 
                : dateB - dateA
            } catch (e) {
                console.error('Ошибка при сравнении дат:', e)
                return 0
            }
        }
        else {
            const valA = Number(a[field])
            const valB = Number(b[field])
            console.log(typeof(valA))
            
            if (isNaN(valA)) return 1
            if (isNaN(valB)) return -1
            
            return direction === 'asc' 
                ? valA - valB 
                : valB - valA
        }
        
        return 0
    })
    return result
}

//фильтрация
export function filterData(data, field, fieldName, status){
    const filteredIncomes = []
    if(fieldName==='warehouse'){
        for(const item of data){
            if(item.warehouse_name == field && !filteredIncomes.includes(item.warehouse_name)){
                filteredIncomes.push(item)
            }
        }
    }
    else if(fieldName==='income_id'){

        for(const item of data){
            if(item.income_id == field && !filteredIncomes.includes(item.income_id)){
                filteredIncomes.push(item)
            }
        }
    }
    else if(fieldName==='nm_id'){
        
        for(const item of data){
            if(item.nm_id == field && !filteredIncomes.includes(item.nm_id)){
                filteredIncomes.push(item)
            }
        }
    }
    
    if (status === false){
        filteredIncomes = []
    }
    return filteredIncomes
}
