const PRODUCTS = [{"name": "Alphabet Resin Keychain", "category": "Keychains", "price": "₹99", "description": "Personalized alphabet keychain with dried-flower details.", "image": "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=85"}, {"name": "Photo Resin Keychain", "category": "Keychains", "price": "₹149", "description": "Custom photo keychain finished in clear glossy resin.", "image": "https://images.unsplash.com/photo-1582561833407-b95380302f7a?auto=format&fit=crop&w=900&q=85"}, {"name": "Floral Resin Bookmark", "category": "Bookmarks", "price": "₹149", "description": "Elegant transparent bookmark with preserved floral accents.", "image": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=85"}, {"name": "Resin Jhumka Earrings", "category": "Jewellery", "price": "₹199", "description": "Handcrafted resin jhumkas with floral sparkle.", "image": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85"}, {"name": "Petal Resin Jhumka", "category": "Jewellery", "price": "₹349", "description": "Statement petal-style resin earrings for festive looks.", "image": "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=85"}, {"name": "Resin Pendant", "category": "Jewellery", "price": "₹199", "description": "Minimal floral resin pendant on a premium chain.", "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85"}, {"name": "Resin Bracelet", "category": "Jewellery", "price": "₹149", "description": "Glossy handmade resin bracelet with delicate details.", "image": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85"}, {"name": "Resin Ring", "category": "Jewellery", "price": "₹99", "description": "Small-batch resin ring with a polished finish.", "image": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85"}, {"name": "Custom Resin Photo Frame", "category": "Home Decor", "price": "₹799", "description": "Personalized photo frame with flowers and resin art.", "image": "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=900&q=85"}, {"name": "Resin Wall Clock", "category": "Home Decor", "price": "₹1499", "description": "Statement resin clock for a premium handmade interior accent.", "image": "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=900&q=85"}, {"name": "Resin Coaster Set", "category": "Home Decor", "price": "₹499", "description": "Set of four decorative handmade resin coasters.", "image": "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=85"}, {"name": "Custom Name Keychain", "category": "Custom Gifts", "price": "₹129", "description": "Personalized name keychain made to order.", "image": "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85"}, {"name": "Premium Resin Chess Set", "category": "Premium Collection", "price": "₹3499", "description": "Luxury handcrafted resin chess set with artistic board and premium pieces.", "image": "https://images.unsplash.com/photo-1586165368502-1bad197a6461?auto=format&fit=crop&w=900&q=85"}, {"name": "Luxury Resin Chess Board", "category": "Premium Collection", "price": "₹2499", "description": "Statement resin chess board designed as a premium décor and gifting piece.", "image": "https://images.unsplash.com/photo-1560174038-da43ac74f01b?auto=format&fit=crop&w=900&q=85"}];

let cart = JSON.parse(localStorage.getItem("miniaura_cart")||"[]");
const money = p => p.replace("₹","₹");
function save(){localStorage.setItem("miniaura_cart",JSON.stringify(cart));updateCount()}
function updateCount(){document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0)}
function renderFilters(){
 const cats=["All",...new Set(PRODUCTS.map(p=>p.category))];
 document.getElementById("filters").innerHTML=cats.map((c,i)=>`<button class="filter ${i===0?"active":""}" onclick="filterProducts('${c}')">${c==="Premium Collection"?"Premium Chess":c}</button>`).join("");
}
function filterProducts(category){
 document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b.textContent.toLowerCase()===category.toLowerCase() || (category==="All"&&b.textContent==="All")));
 const list=category==="All"?PRODUCTS:PRODUCTS.filter(p=>p.category===category);
 document.getElementById("productGrid").innerHTML=list.map((p)=>`<article class="product">
 <img src="${p.image}" alt="${p.name}" loading="lazy"><div class="info"><span class="tag">${p.category}</span><h3>${p.name}</h3><p>${p.description}</p><div class="price">${p.price}</div>
 <button class="add" onclick="addToCart('${p.name.replaceAll("'","\\'")}')">Add to Cart</button></div></article>`).join("");
 document.getElementById("shop").scrollIntoView({behavior:"smooth",block:"start"});
}
function addToCart(name){let x=cart.find(i=>i.name===name); if(x)x.qty++; else cart.push({name,qty:1});save();renderCart();openCart()}
function changeQty(name,d){let x=cart.find(i=>i.name===name);if(!x)return;x.qty+=d;if(x.qty<=0)cart=cart.filter(i=>i.name!==name);save();renderCart()}
function renderCart(){
 const box=document.getElementById("cartItems");
 if(!cart.length){box.innerHTML='<div class="empty">Your cart is empty.<br>Add some beautiful resin creations ✦</div>';document.getElementById("cartTotal").textContent="₹0";return}
 let total=0;
 box.innerHTML=cart.map(i=>{let p=PRODUCTS.find(x=>x.name===i.name);let n=parseInt(p.price.replace(/[^\d]/g,""));total+=n*i.qty;return `<div class="cartrow"><img src="${p.image}"><div><h4>${p.name}</h4><div>${p.price} × ${i.qty}</div><div class="qty"><button onclick="changeQty('${p.name.replaceAll("'","\\'")}',-1)">−</button> <button onclick="changeQty('${p.name.replaceAll("'","\\'")}',1)">+</button></div></div><b>₹${n*i.qty}</b></div>`}).join("");
 document.getElementById("cartTotal").textContent="₹"+total;
}
function openCart(){document.getElementById("overlay").classList.add("open");renderCart()}
function closeCart(){document.getElementById("overlay").classList.remove("open")}
function orderWhatsApp(){
 if(!cart.length){alert("Please add products to your cart first.");return}
 const name=document.getElementById("customerName").value.trim(),email=document.getElementById("customerEmail").value.trim(),address=document.getElementById("customerAddress").value.trim();
 if(!name||!email||!address){alert("Please enter your name, email and delivery address.");return}
 let total=0, lines=cart.map(i=>{let p=PRODUCTS.find(x=>x.name===i.name),n=parseInt(p.price.replace(/[^\d]/g,""));total+=n*i.qty;return `• ${p.name} × ${i.qty} = ₹${n*i.qty}`}).join("\n");
 const orderId="MA"+Date.now().toString().slice(-7);
 const msg=`NEW ORDER — ${orderId}\n\nCustomer: ${name}\nEmail: ${email}\nAddress: ${address}\n\nItems:\n${lines}\n\nTOTAL: ₹${total}\n\nPlease confirm my order.`;
 const url="https://wa.me/"+SITE_CONFIG.whatsappNumber+"?text="+encodeURIComponent(msg);
 window.open(url,"_blank");
 if(SITE_CONFIG.emailJS.enabled) sendOrderEmail(orderId,name,email,address,lines,total);
}
function sendOrderEmail(orderId,name,email,address,lines,total){
 const s=document.createElement("script");s.src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
 s.onload=()=>{emailjs.init({publicKey:SITE_CONFIG.emailJS.publicKey});emailjs.send(SITE_CONFIG.emailJS.serviceId,SITE_CONFIG.emailJS.templateId,{to_email:email,customer_name:name,order_id:orderId,order_items:lines,total:"₹"+total,address:address,reply_to:SITE_CONFIG.businessEmail}).then(()=>alert("Order sent to WhatsApp. Confirmation email sent to "+email+"."),()=>alert("WhatsApp order opened, but email confirmation could not be sent. Please check EmailJS setup."))}
 document.head.appendChild(s)
}
function sendEnquiry(e){e.preventDefault();const n=document.getElementById("cname").value,em=document.getElementById("cemail").value,m=document.getElementById("cmsg").value;window.open("https://wa.me/"+SITE_CONFIG.whatsappNumber+"?text="+encodeURIComponent(`Website enquiry\nName: ${n}\nEmail: ${em}\nMessage: ${m}`),"_blank")}
document.getElementById("year").textContent=new Date().getFullYear();renderFilters();filterProducts("All");updateCount();
