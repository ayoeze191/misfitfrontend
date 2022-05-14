


export const getCookie = (name) => {
    var cookieArr = document.cookie.split(";");
    
    for (var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");
      if (name === cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return null;
  };


export const add_cookie_items = (
    ProductId,
    productAmount,
    productname,
    productimage,
    product_category
  ) => {
    let cart = JSON.parse(getCookie("cart"));
    if(cart.find((product) =>product.product.id === ProductId)){
      cart = cart.map((car) => 
        car.product.id === ProductId?{...car, product: {id:car.product.id, stock_price: car.product.stock_price, name:car.product.name, category: {'title': car.product.category.title}, productimage: [car.product.productimage[0]]}, quantity: car.quantity + 1, }:{...car} 
      )
    }
    else{
      const new_product = {product: {id: ProductId, stock_price: productAmount,name: productname, category: { 'title': product_category}, productimage: [productimage]},  quantity: 1}
      cart.push(new_product)
    }
    
    document.cookie = "cart=" + JSON.stringify(cart) + ";domain=;path=/";
  }


  export const remove_cookie_items = (
    ProductId,
    productAmount,
    productname,
    productimage,
    product_category
  ) => {
    let cart = JSON.parse(getCookie("cart"));
  
    if(cart.find((product) => product.product.id === ProductId)){
      cart = cart.map((car) => 
        car.product.id === ProductId?{...car, product: {id:car.product.id, stock_price: car.product.stock_price, name:car.product.name, category: {'title': car.product.category.title}, productimage: [car.product.productimage[0]]}, quantity: car.quantity - 1}:{...car} 
      )
    }


    cart = cart.filter((car) => 
      car.quantity > 0  
    )
    document.cookie = "cart=" + JSON.stringify(cart) + ";domain=;path=/";
}

