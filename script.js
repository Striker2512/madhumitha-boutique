(() => {
  const cfg = window.BOUTIQUE_CONFIG || {};
  const products = window.BOUTIQUE_PRODUCTS || [];
  const waNumber = String(cfg.whatsappNumber || "917695957823").replace(/\D/g, "");
  const money = n => new Intl.NumberFormat("en-IN", {style:"currency", currency:cfg.currency || "INR", maximumFractionDigits:0}).format(n || 0);
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem("msk-boutique-cart") || "[]"); } catch { cart = []; }
  const grid = document.getElementById("productGrid");
  const filter = document.getElementById("categoryFilter");
  const cartPanel = document.getElementById("cartPanel");
  const backdrop = document.getElementById("cartBackdrop");
  const safe = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const categoryClass = c => c === "Kurtis" ? "kurtis" : c === "Traditional jewellery" ? "jewellery" : "";
  function renderProducts() {
    const selected = filter.value;
    const list = products.filter(p => selected === "All" || p.category === selected);
    if (!list.length) { grid.innerHTML = '<p class="empty-cart">No products in this collection yet.</p>'; return; }
    grid.innerHTML = list.map(p => {
      const priced = Number.isFinite(p.price) && p.price > 0;
      const image = p.image ? `<img src="${safe(p.image)}" alt="${safe(p.name)}" style="width:100%;height:100%;object-fit:cover">` : "";
      return `<article class="product-card">
        <div class="product-visual ${categoryClass(p.category)}">${image}<span class="placeholder-tag">${p.image ? "BOUTIQUE PICK" : "PHOTO TO BE ADDED"}</span></div>
        <div class="product-info"><p class="product-category">${safe(p.category)}</p><h3>${safe(p.name)}</h3><p>${safe(p.description)}</p>
        <div class="product-price">${priced ? money(p.price) : "Price to be added"}</div>
        <button class="button ${priced && p.available ? "button-dark" : "button-outline"}" data-add="${safe(p.id)}" ${(!priced || !p.available) ? "disabled" : ""}>${!p.available ? "Currently unavailable" : priced ? "Add to bag +" : "Add price before selling"}</button></div>
      </article>`;
    }).join("");
  }
  function save() {
    localStorage.setItem("msk-boutique-cart", JSON.stringify(cart));
    renderCart();
  }
  function openCart() { cartPanel.classList.add("open"); cartPanel.setAttribute("aria-hidden","false"); backdrop.hidden = false; document.body.style.overflow = "hidden"; }
  function closeCart() { cartPanel.classList.remove("open"); cartPanel.setAttribute("aria-hidden","true"); backdrop.hidden = true; document.body.style.overflow = ""; }
  function total() { return cart.reduce((sum, item) => { const p = products.find(x => x.id === item.id); return sum + (p && Number.isFinite(p.price) ? p.price * item.qty : 0); }, 0); }
  function renderCart() {
    const count = cart.reduce((n, x) => n + x.qty, 0);
    document.getElementById("cartCount").textContent = count;
    document.getElementById("cartTotal").textContent = money(total());
    const root = document.getElementById("cartItems");
    if (!cart.length) { root.innerHTML = '<p class="empty-cart">Your bag is empty. Add a product after its price has been entered.</p>'; return; }
    root.innerHTML = cart.map(item => {
      const p = products.find(x => x.id === item.id);
      if (!p) return "";
      return `<div class="cart-item"><div><strong>${safe(p.name)}</strong><small>${safe(p.category)} · ${money(p.price)} each</small><div class="qty-controls"><button data-qty="${safe(p.id)}" data-delta="-1" aria-label="Decrease quantity">−</button><span>${item.qty}</span><button data-qty="${safe(p.id)}" data-delta="1" aria-label="Increase quantity">+</button><button data-remove="${safe(p.id)}" aria-label="Remove product" title="Remove">×</button></div></div><span class="cart-item-price">${money(p.price * item.qty)}</span></div>`;
    }).join("");
  }
  grid.addEventListener("click", e => {
    const b = e.target.closest("[data-add]");
    if (!b) return;
    const p = products.find(x => x.id === b.dataset.add);
    if (!p || !Number.isFinite(p.price) || p.price <= 0 || !p.available) return;
    const existing = cart.find(x => x.id === p.id);
    if (existing) existing.qty++; else cart.push({id:p.id, qty:1});
    save(); openCart();
  });
  document.getElementById("cartItems").addEventListener("click", e => {
    const qty = e.target.closest("[data-qty]");
    const rem = e.target.closest("[data-remove]");
    if (rem) cart = cart.filter(x => x.id !== rem.dataset.remove);
    if (qty) {
      const item = cart.find(x => x.id === qty.dataset.qty);
      if (item) { item.qty += Number(qty.dataset.delta); if (item.qty <= 0) cart = cart.filter(x => x.id !== item.id); }
    }
    save();
  });
  filter.addEventListener("change", renderProducts);
  document.querySelectorAll("[data-category-link]").forEach(a => a.addEventListener("click", () => { filter.value = a.dataset.categoryLink; renderProducts(); }));
  document.getElementById("cartToggle").addEventListener("click", openCart);
  document.getElementById("cartClose").addEventListener("click", closeCart);
  backdrop.addEventListener("click", closeCart);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeCart(); });
  document.getElementById("whatsappCheckout").addEventListener("click", () => {
    if (!cart.length) { alert("Your bag is empty."); return; }
    const lines = cart.map(item => { const p = products.find(x => x.id === item.id); return p ? `• ${p.name} (${p.category}) × ${item.qty} — ${money(p.price * item.qty)}` : ""; }).filter(Boolean);
    const message = `Hello ${cfg.brandName || "Boutique"}, I would like to enquire about this order:\n\n${lines.join("\n")}\n\nEstimated product total: ${money(total())}\n\nPlease confirm stock, final total, delivery charges, delivery timeline and payment options before I pay.`;
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  });
  document.getElementById("onlinePayment").addEventListener("click", () => {
    const link = String(cfg.paymentLink || "").trim();
    if (!link || !/^https:\/\/\S+/i.test(link)) {
      alert("Online payment is not connected yet. The boutique owner must add and test a verified payment-provider link in config.js. Do not enter card details on this starter website.");
      return;
    }
    if (!cart.length) { alert("Add a priced product to your bag first."); return; }
    alert("Please confirm your order total with the boutique first. The configured payment link may not calculate this bag's total automatically.");
    window.open(link, "_blank", "noopener");
  });
  document.getElementById("year").textContent = new Date().getFullYear();
  renderProducts(); renderCart();
})();
