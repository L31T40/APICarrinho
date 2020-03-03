 const numberFormat = (value) =>{
    return new Intl.NumberFormat('pt-PT', {style: 'currency', currency: 'EUR' }).format(value);
     
}

export {numberFormat}