window.addEventListener('load', function (event) {
    const param = new URLSearchParams(window.location.search)
    const id = param.get('id');
    const product = store.getById(id);
    console.log('product', product)
    console.log('id',id)
    if(product){
        this.document.getElementById('name').textContent = product.name;
        this.document.getElementById('price').textContent = product.price;
        this.document.getElementById('description').textContent = product.description;
        this.document.getElementById('image').src = product.image;
    }
})