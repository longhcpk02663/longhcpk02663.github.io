
  /** xu ly form */
  
  function renderTable(products) {
    let content = '';
    for(let i = 0; i < products.length; i++) {
      const item = products[i];
      content += `
      <tr>
                  <td>${item.id}</td>
                  <td>${item.name}</td>
                  <td>${item.description}</td>
                  <td>${item.price}</td>
                  <td><img id="image" src="${item.image}" class="card-img-top-1" alt="..."><td>
                  <td>
                    <button type="button" class="btn btn-primary" onclick="onEdit('${item.id}')">edit</button>
                    <button type="button" class="btn btn-danger" onclick="onRemove('${item.id}')">remove</button>
                    <a href="./product-detail.html?id=${item.id}">Xem chi tiết</a>
                  </td>
                </tr>
      `
    }
    document.getElementById('tableBody').innerHTML = content
  }
  
  renderTable(store.getProduct())
  document.getElementById('frmProductCreate').addEventListener('submit', function(event){
    event.preventDefault();
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;
    if(id === '' || name === '' || description === '' || image === '' || price === '') {
      alert('Vui lòng nhập đầy đủ thông tin')
      return
    } else {
      const product = new Product(id,name,price,description, image)
      const isCreate = store.add(product)
      console.log('isCreate',isCreate)
      if(isCreate) {
        alert('thêm thành công')
        store.save()
        renderTable(store.getProduct())
      } else {
        alert('thêm thất bại')
      }
    }
  })
  
  function onRemove(id) {
    const isRemove = store.remove(id)
    if(isRemove) {
      alert('xóa thành công')
      store.save()
      renderTable(store.getProduct())
    } else {
      alert('xóa thất bại')
    }
  }
  
  
  function onEdit(id) {
  
    var myModal = new bootstrap.Modal(document.getElementById('modalProductEdit'), {
    keyboard: false
  })
  // get detail
  const product = store.getById(id)
   document.getElementById('prodId').value= product.id;
   document.getElementById('prodName').value = product.name;
   document.getElementById('prodPrice').value = product.price;
   document.getElementById('prodDescription').value = product.description;
  document.getElementById('prodImage').value = product.image;
  myModal.show()
  
  }
  
  
  document.getElementById('frmProductEdit').addEventListener('submit', function(event){
    event.preventDefault();
    const id = document.getElementById('prodId').value;
    const name = document.getElementById('prodName').value;
    const price = document.getElementById('prodPrice').value;
    const description = document.getElementById('prodDescription').value;
    const image = document.getElementById('prodImage').value;
    if(id === '' || name === '' || description === '' || image === '' || price === '') {
      alert('Vui lòng nhập đầy đủ thông tin')
      return
    } else {
      const product = new Product(id,name,price,description, image)
      const isUpdate = store.update(product)
      if(isUpdate) {
        alert('Cập nhật thành công')
        store.save()
        renderTable(store.getProduct())
      } else {
        alert('Cập nhật thất bại')
      }
    }
  })
  document.getElementById('btn-sort-gia-tang').addEventListener('click', function(){
    store.sapXepTheoGia(true);
    store.save();
    renderTable(store.getProduct());
  })
  document.getElementById('btn-sort-gia-giam').addEventListener('click', function(){
    store.sapXepTheoGia(false);
    store.save();
    renderTable(store.getProduct());
  })