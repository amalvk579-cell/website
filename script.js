
const categories = [
  { name:"Chicken",    img:"images/Classic Chicken.jpg" },
  { name:"Prawns",     img:" images/prowns(1).png" },
  { name:"Mutton",     img:"images/Rectangle 238.png" },
  { name:"Crab",       img:"images/Rectangle 240.png" },
  { name:"Salmon fish",img:"images/Rectangle 237.png" }
];

const chickenProducts = [
  { id:"ck1", name:"Chicken drumstick", meta:"Pack of 6 · 6 pieces · Serves 2-3", price:211, old:379, off:"44% off", img:"  images/Rectangle 197.png " },
  { id:"ck2", name:"Chicken breast boneless", meta:"4-5 pieces · Serves 2-3", price:201, old:369, off:"46% off", img:" images/Rectangle 197 (1).png" },
  { id:"ck3", name:"Chicken", meta:"Pack of 6 · 6 pieces · Serves 2-3", price:311, old:379, off:"44% off", img:" images/Rectangle 197 (2).png " },
  { id:"ck4", name:"Chicken breast boneless", meta:"4-5 pieces · Serves 2-3", price:201, old:369, off:"46% off", img:" images/Rectangle 197 (4).png " },
  { id:"ck5", name:"Chicken drumstick", meta:"6 pieces · Serves 2-3", price:211, old:379, off:"44% off", img:"  images/Rectangle 197.png " },
  { id:"ck6", name:"Chicken curry cut", meta:"5-6 pieces · Serves 2-3", price:229, old:399, off:"42% off", img:" images/Rectangle 197 (3).png " }
];

const muttonProducts = [
  { id:"mt1", name:"Mutton", meta:"9-14 pieces · Serves 4 · 500g", price:746, old:829, off:"10% off", img:"images/Rectangle 197 (5).png  " },
  { id:"mt2", name:"Mutton curry cuts", meta:"4-5 pieces · Serves 2-3", price:500, old:369, off:"46% off", img:" images/Rectangle 197 (6).png  " },
  { id:"mt3", name:"Mutton curry cuts", meta:"9-14 pieces · Serves 4 · 500g", price:746, old:829, off:"10% off", img:" images/Rectangle 197 (7).png " },
  { id:"mt4", name:"Mutton", meta:"4-5 pieces · Serves 2-3", price:500, old:369, off:"46% off", img:" images/Rectangle 197 (8).png  " },
  { id:"mt5", name:"Mutton ribs", meta:"9-14 pieces · Serves 4 · 500g", price:746, old:829, off:"10% off", img:"  images/Rectangle 197 (9).png " },
  { id:"mt6", name:"Mutton leg", meta:"1 piece · Serves 2-3", price:846, old:969, off:"46% off", img:"  images/Rectangle 197 (10).png " },
  { id:"mt7", name:"Mutton", meta:"9-14 pieces · Serves 4 · 500g", price:746, old:829, off:"10% off", img:"  images/Rectangle 197 (6).png" }
];

let cart = [
  { id:"goat1", name:"Goat curry cut", size:"Small pieces", meta:"Rich & Flavorful · Bone-in & Boneless", price:570, old:695, off:"18% off", img:"https://placehold.co/160x160/9b3b2e/fff?text=Goat", qty:1 },
  { id:"beef1", name:"Beef", size:"Small pieces", meta:"Rich & Flavorful · Boneless", price:511, old:695, off:"18% off", img:"https://placehold.co/160x160/7a2420/fff?text=Beef", qty:1 }
];

const wishlist = new Set();

const categoryRow = document.getElementById("categoryRow");
categories.forEach(c=>{
  const el = document.createElement("div");
  el.className = "category-card";
  el.innerHTML = `<img src="${c.img}" alt="${c.name}"><span>${c.name}</span>`;
  categoryRow.appendChild(el);
});

function renderProducts(list, mount){
  list.forEach(p=>{
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-thumb">
        <img src="${p.img}" alt="${p.name}">
        <button class="wish-btn" data-id="${p.id}" aria-label="Save to wishlist">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7.5-4.6-10-9.1C.5 8.4 2.4 5 6 5c2 0 3.5 1.1 4.5 2.4C11.5 6.1 13 5 15 5c3.6 0 5.5 3.4 4 6.9C19.5 16.4 12 21 12 21z"/></svg>
        </button>
      </div>
      <p class="product-name">${p.name}</p>
      <p class="product-meta">${p.meta}</p>
      <div class="product-foot">
        <div>
          <span class="price-now">₹ ${p.price}</span><span class="price-old">₹${p.old}</span>
          <span class="product-off">${p.off}</span>
        </div>
        <button class="add-btn" data-id="${p.id}" aria-label="Add ${p.name} to cart">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>
    `;
    mount.appendChild(card);
  });
}
renderProducts(chickenProducts, document.getElementById("chickenRow"));
renderProducts(muttonProducts, document.getElementById("muttonRow"));

const allProducts = [...chickenProducts, ...muttonProducts];

document.querySelectorAll(".wish-btn").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const id = btn.dataset.id;
    if(wishlist.has(id)){ wishlist.delete(id); btn.classList.remove("liked"); }
    else { wishlist.add(id); btn.classList.add("liked"); }
  });
});
document.getElementById("wishlistIcon").addEventListener("click", function(){
  this.classList.toggle("liked");
});

document.querySelectorAll(".add-btn").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const p = allProducts.find(x=>x.id===btn.dataset.id);
    if(!p) return;
    const existing = cart.find(c=>c.id===p.id);
    if(existing){ existing.qty += 1; }
    else{
      cart.push({ id:p.id, name:p.name, size:p.meta, meta:p.off, price:p.price, old:p.old, off:p.off, img:p.img, qty:1 });
    }
    renderCart();
    openCart();
  });
});

const cartItemsEl = document.getElementById("cartItems");
const cartEmptyEl = document.getElementById("cartEmpty");
const billItemTotal = document.getElementById("billItemTotal");
const billDiscount = document.getElementById("billDiscount");
const billTotal = document.getElementById("billTotal");
const railBadge = document.getElementById("railBadge");
const fabBadge = document.getElementById("fabBadge");

function renderCart(){
  cartItemsEl.querySelectorAll(".cart-line").forEach(n=>n.remove());

  if(cart.length === 0){
    cartEmptyEl.style.display = "block";
  } else {
    cartEmptyEl.style.display = "none";
    cart.forEach(item=>{
      const line = document.createElement("div");
      line.className = "cart-line";
      line.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div class="cart-line-info">
          <p class="cart-line-name">${item.name} <b>- ${item.size}</b></p>
          <p class="cart-line-meta">${item.meta}</p>
          <div class="cart-line-bottom">
            <span class="cart-line-price">₹ ${item.price}</span>
            <div class="qty">
              <button data-act="dec" data-id="${item.id}" aria-label="Decrease quantity">−</button>
              <span>${item.qty}</span>
              <button data-act="inc" data-id="${item.id}" aria-label="Increase quantity">+</button>
            </div>
          </div>
        </div>
      `;
      cartItemsEl.appendChild(line);
    });
  }

  const itemTotal = cart.reduce((sum,i)=> sum + i.price*i.qty, 0);
  const oldTotal = cart.reduce((sum,i)=> sum + (i.old||i.price)*i.qty, 0);
  const discount = Math.max(0, oldTotal - itemTotal);
  const total = itemTotal;
  const count = cart.reduce((sum,i)=> sum + i.qty, 0);

  billItemTotal.textContent = `₹ ${itemTotal}`;
  billDiscount.textContent = `-₹${discount}`;
  billTotal.textContent = `₹ ${total}`;
  railBadge.textContent = count;
  fabBadge.textContent = count;
}

cartItemsEl.addEventListener("click", (e)=>{
  const btn = e.target.closest("button[data-act]");
  if(!btn) return;
  const item = cart.find(i=>i.id===btn.dataset.id);
  if(!item) return;
  if(btn.dataset.act === "inc") item.qty += 1;
  if(btn.dataset.act === "dec"){
    item.qty -= 1;
    if(item.qty <= 0) cart = cart.filter(i=>i.id!==item.id);
  }
  renderCart();
});

document.getElementById("checkoutBtn").addEventListener("click", ()=>{
  if(cart.length === 0){
    alert("Your cart is empty — add some meat first!");
    return;
  }
  alert("Taking you to checkout... (demo only)");
});

const cartDrawer = document.getElementById("cartDrawer");
function openCart(){ cartDrawer.classList.add("open"); }
function closeCart(){ cartDrawer.classList.remove("open"); }

document.getElementById("cartFab").addEventListener("click", openCart);
document.getElementById("cartRailIcon").addEventListener("click", openCart);
document.getElementById("cartClose").addEventListener("click", closeCart);

const dots = document.querySelectorAll(".hero-dots span");
let dotIndex = 0;
setInterval(()=>{
  dots[dotIndex].classList.remove("on");
  dotIndex = (dotIndex + 1) % dots.length;
  dots[dotIndex].classList.add("on");
}, 3200);

renderCart();
