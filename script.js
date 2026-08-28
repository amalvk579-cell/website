
const categories = [
  { name:"Chicken",    img:"https://placehold.co/300x300/e9c9a3/6b3a1f?text=Chicken" },
  { name:"Prawns",     img:"https://placehold.co/300x300/ead9c4/6b3a1f?text=Prawns" },
  { name:"Mutton",     img:"https://placehold.co/300x300/c98f83/4a1414?text=Mutton" },
  { name:"Crab",       img:"https://placehold.co/300x300/cfd6d6/2f3a3a?text=Crab" },
  { name:"Salmon fish",img:"https://placehold.co/300x300/e39a76/6b2f14?text=Salmon" }
];

const chickenProducts = [
  { id:"ck1", name:"Chicken drumstick", meta:"Pack of 6 · 6 pieces · Serves 2-3", price:211, old:379, off:"44% off", img:"https://placehold.co/400x340/f3d9b1/6b3a1f?text=Drumstick" },
  { id:"ck2", name:"Chicken breast boneless", meta:"4-5 pieces · Serves 2-3", price:201, old:369, off:"46% off", img:"https://placehold.co/400x340/f6e3c6/6b3a1f?text=Breast" },
  { id:"ck3", name:"Chicken", meta:"Pack of 6 · 6 pieces · Serves 2-3", price:311, old:379, off:"44% off", img:"https://placehold.co/400x340/f0d6ae/6b3a1f?text=Chicken" },
  { id:"ck4", name:"Chicken breast boneless", meta:"4-5 pieces · Serves 2-3", price:201, old:369, off:"46% off", img:"https://placehold.co/400x340/f6e3c6/6b3a1f?text=Breast" },
  { id:"ck5", name:"Chicken drumstick", meta:"6 pieces · Serves 2-3", price:211, old:379, off:"44% off", img:"https://placehold.co/400x340/f3d9b1/6b3a1f?text=Drumstick" },
  { id:"ck6", name:"Chicken curry cut", meta:"5-6 pieces · Serves 2-3", price:229, old:399, off:"42% off", img:"https://placehold.co/400x340/f0d6ae/6b3a1f?text=Curry+Cut" }
];

const muttonProducts = [
  { id:"mt1", name:"Mutton", meta:"9-14 pieces · Serves 4 · 500g", price:746, old:829, off:"10% off", img:"https://placehold.co/400x340/c98f83/4a1414?text=Mutton" },
  { id:"mt2", name:"Mutton curry cuts", meta:"4-5 pieces · Serves 2-3", price:500, old:369, off:"46% off", img:"https://placehold.co/400x340/b97b6f/4a1414?text=Curry+Cuts" },
  { id:"mt3", name:"Mutton curry cuts", meta:"9-14 pieces · Serves 4 · 500g", price:746, old:829, off:"10% off", img:"https://placehold.co/400x340/b97b6f/4a1414?text=Curry+Cuts" },
  { id:"mt4", name:"Mutton", meta:"4-5 pieces · Serves 2-3", price:500, old:369, off:"46% off", img:"https://placehold.co/400x340/c98f83/4a1414?text=Mutton" },
  { id:"mt5", name:"Mutton ribs", meta:"9-14 pieces · Serves 4 · 500g", price:746, old:829, off:"10% off", img:"https://placehold.co/400x340/ad6f63/4a1414?text=Ribs" },
  { id:"mt6", name:"Mutton leg", meta:"1 piece · Serves 2-3", price:846, old:969, off:"46% off", img:"https://placehold.co/400x340/c39184/4a1414?text=Leg" },
  { id:"mt7", name:"Mutton", meta:"9-14 pieces · Serves 4 · 500g", price:746, old:829, off:"10% off", img:"https://placehold.co/400x340/c98f83/4a1414?text=Mutton" }
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
