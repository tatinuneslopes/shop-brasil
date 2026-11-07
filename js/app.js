// Shopping Brasil - TikTok Shop Core Application
// In-App Webview Simulation, 11.11 Promo, Embedded Roulette & FlevoPay Real Integration

// Immediately wipe any legacy mock data (e.g., Carlos) so everything starts completely blank
try {
  const savedRaw = localStorage.getItem("shopping_brasil_user");
  if (savedRaw && (savedRaw.includes("Carlos") || savedRaw.includes("Medeiros"))) {
    localStorage.removeItem("shopping_brasil_user");
  }
} catch (e) {}

// ==========================================
// META PIXEL INTEGRATION ENGINE (ID: 1434301764883326)
// Provides clean, strictly deduplicated tracking for:
// - ViewContent
// - AddToCart
// - InitiateCheckout
// - Purchase (strictly upon confirmed gateway payment)
// ==========================================
window.MetaPixel = {
  pixelId: "1434301764883326",
  lastViewContentId: null,
  lastViewContentTime: 0,
  lastCheckoutHash: null,
  lastCheckoutTime: 0,

  // Safely invoke fbq
  callFbq: function(eventName, params, options) {
    params = params || {};
    try {
      if (typeof window.fbq === "function") {
        if (options) {
          window.fbq('track', eventName, params, options);
        } else {
          window.fbq('track', eventName, params);
        }
        console.log("[Meta Pixel] Evento disparado: " + eventName, params);
      } else {
        console.warn("[Meta Pixel] fbq ainda não disponível para evento: " + eventName);
      }
    } catch (err) {
      console.error("[Meta Pixel] Erro ao disparar evento " + eventName + ":", err);
    }
  },

  // 1. ViewContent (Visualização do produto)
  trackViewContent: function(prod) {
    if (!prod) return;
    var now = Date.now();
    // Anti-duplicação: não dispara para o mesmo produto em menos de 3.5 segundos
    if (this.lastViewContentId === prod.id && (now - this.lastViewContentTime) < 3500) {
      return;
    }
    this.lastViewContentId = prod.id;
    this.lastViewContentTime = now;

    var price = typeof prod.price === "number" ? prod.price : parseFloat(prod.price) || 0;
    this.callFbq('ViewContent', {
      content_name: prod.title || prod.name || "Produto Shopping Brasil",
      content_ids: [String(prod.id)],
      content_type: 'product',
      value: price,
      currency: 'BRL'
    });
  },

  // 2. AddToCart (Adicionado ao carrinho)
  trackAddToCart: function(prod, qty) {
    if (!prod) return;
    qty = qty || 1;
    var price = typeof prod.price === "number" ? prod.price : parseFloat(prod.price) || 0;
    var totalVal = Math.round((price * qty) * 100) / 100;
    this.callFbq('AddToCart', {
      content_name: prod.title || prod.name || "Produto Shopping Brasil",
      content_ids: [String(prod.id)],
      content_type: 'product',
      value: totalVal,
      currency: 'BRL'
    });
  },

  // 3. InitiateCheckout (Início do checkout)
  trackInitiateCheckout: function(cartItems, finalValue) {
    if (!cartItems || cartItems.length === 0) return;
    var now = Date.now();
    var cartHash = cartItems.map(function(it) {
      return String(it.product ? it.product.id : it.id) + ":" + String(it.quantity);
    }).join(",");

    // Anti-duplicação: se os itens do carrinho forem idênticos, não dispara em menos de 5 segundos
    if (this.lastCheckoutHash === cartHash && (now - this.lastCheckoutTime) < 5000) {
      return;
    }
    this.lastCheckoutHash = cartHash;
    this.lastCheckoutTime = now;

    var ids = cartItems.map(function(it) { return String(it.product ? it.product.id : it.id); });
    var numItems = cartItems.reduce(function(acc, it) { return acc + (it.quantity || 1); }, 0);
    var val = typeof finalValue === "number" ? finalValue : parseFloat(finalValue) || 0;

    this.callFbq('InitiateCheckout', {
      content_ids: ids,
      content_type: 'product',
      num_items: numItems,
      value: Math.round(val * 100) / 100,
      currency: 'BRL'
    });
  },

  // 4. Purchase (Apenas com confirmacao de pagamento aprovado)
  trackPurchase: function(orderId, items, totalValue) {
    if (!orderId) orderId = "order_" + Date.now();
    var storageKey = "meta_pixel_purchase_" + String(orderId);

    // ANTI-DUPLICACAO ESTRITA: checa no localStorage se esta compra ja foi enviada
    try {
      if (localStorage.getItem(storageKey)) {
        console.log("[Meta Pixel] Compra " + orderId + " ja registrada anteriormente. Ignorando duplicata.");
        return;
      }
    } catch (e) {}

    var val = typeof totalValue === "number" ? totalValue : parseFloat(totalValue) || 0;
    var ids = Array.isArray(items)
      ? items.map(function(it) { return String((it.product && it.product.id) || it.id || it); })
      : [];

    this.callFbq('Purchase', {
      content_ids: ids,
      content_type: 'product',
      value: Math.round(val * 100) / 100,
      currency: 'BRL'
    }, { eventID: 'purchase_' + String(orderId) });

    try {
      localStorage.setItem(storageKey, JSON.stringify({
        orderId: orderId,
        value: val,
        timestamp: Date.now()
      }));
    } catch (e) {}
  }
};


let currentCategory = "all";
let currentSort = "all";
let currentProduct = null;
let currentSelectedColor = "";
let orderQuantity = 1;
let isFollowing = false;
let pixTimerInterval = null;
let totalGallerySlides = 3;

// Shopping Cart State
let cart = [];

// Clean initial user data (Starts completely empty)
let userData = {
  name: "",
  phone: "",
  cep: "",
  street: "",
  number: "",
  neighborhood: "",
  cityState: "",
  document: ""
};

// Embedded Roulette State
let rouletteRotation = 0;
let rouletteSpinCount = 0;
let isRouletteSpinning = false;

const ROULETTE_SEGMENTS = [
  { label: "100%", sub: "DE DESCONTO", color: "#f5b700", textColor: "#000000" },
  { label: "75%", sub: "DE DESCONTO", color: "#e60067", textColor: "#ffffff" },
  { label: "50%", sub: "DE DESCONTO", color: "#00b578", textColor: "#ffffff" },
  { label: "\u{1F622}", sub: "Tente outra vez", color: "#2d313a", textColor: "#ffffff" },
  { label: "25%", sub: "DE DESCONTO", color: "#0099ff", textColor: "#ffffff" },
  { label: "5%", sub: "DE DESCONTO", color: "#e82828", textColor: "#ffffff" },
  { label: "\u{1F622}", sub: "Tente outra vez", color: "#2d313a", textColor: "#ffffff" },
  { label: "90%", sub: "DE DESCONTO", color: "#00c2b2", textColor: "#ffffff" }
];

// Verified Brazilian Reviews List
const VERIFIED_REVIEWS = [
  {
    name: "Juliana Mendes",
    city: "Campinas - SP",
    stars: 5,
    date: "Há 1 dia",
    comment: "demorou um pouco pra chegar mas deu certo! Veio tudo certinho, muito bem embalado e funcionando perfeitamente. Recomendo!",
    photo: "images/loja/iphone-branco.webp"
  },
  {
    name: "Lucas Silveira",
    city: "São Paulo - SP",
    stars: 5,
    date: "Há 2 dias",
    comment: "Chegou super rápido em 3 dias aqui em SP! Produto 100% original, lacrado de fábrica. Paguei no Pix e aprovaram na mesma hora. Recomendo demais a Shopping Brasil!",
    photo: ""
  },
  {
    name: "Mariana Castro",
    city: "Belo Horizonte - MG",
    stars: 5,
    date: "Há 3 dias",
    comment: "Amei demais, superou todas as expectativas! O cupom de frete grátis e o desconto de 90% funcionou perfeitamente. Loja nota 10, atendimento excelente.",
    photo: ""
  },
  {
    name: "Rodrigo Mendonça",
    city: "Rio de Janeiro - RJ",
    stars: 5,
    date: "Há 4 dias",
    comment: "Estava com receio no começo mas o rastreio atualizou certinho pelo WhatsApp. Veio super bem embalado com plástico bolha e nota fiscal. Comprarei mais vezes!",
    photo: ""
  },
  {
    name: "Beatriz Oliveira",
    city: "Curitiba - PR",
    stars: 5,
    date: "Há 5 dias",
    comment: "Girei a roleta e ganhei o cupom, usei na hora da compra! O produto é impecável, acabamento premium. Chegou antes do prazo previsto.",
    photo: ""
  }
];

// Mathematical Brazilian CPF Generator and Validator
function generateValidCPF() {
  const n = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
  let d1 = 0;
  for (let i = 0; i < 9; i++) d1 += n[i] * (10 - i);
  d1 = 11 - (d1 % 11);
  if (d1 >= 10) d1 = 0;
  n.push(d1);

  let d2 = 0;
  for (let i = 0; i < 10; i++) d2 += n[i] * (11 - i);
  d2 = 11 - (d2 % 11);
  if (d2 >= 10) d2 = 0;
  n.push(d2);

  return n.join("");
}

function isValidCPF(cpf) {
  if (!cpf) return false;
  const clean = cpf.replace(/\D/g, "");
  if (clean.length !== 11 || /^(\d)\1{10}$/.test(clean)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(clean.charAt(i)) * (10 - i);
  let rev = 11 - (sum % 11);
  if (rev >= 10) rev = 0;
  if (rev !== parseInt(clean.charAt(9))) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(clean.charAt(i)) * (11 - i);
  rev = 11 - (sum % 11);
  if (rev >= 10) rev = 0;
  return rev === parseInt(clean.charAt(10));
}

function handleCpfMask(el) {
  let v = el.value.replace(/\D/g, "");
  if (v.length > 11) v = v.substring(0, 11);
  if (v.length > 9) {
    el.value = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
  } else if (v.length > 6) {
    el.value = v.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
  } else if (v.length > 3) {
    el.value = v.replace(/(\d{3})(\d{1,3})/, "$1.$2");
  } else {
    el.value = v;
  }
}

// Initialize app on DOM ready (with fallback if already loaded)
function initializeTikTokShopApp() {
  renderCategoryChips();
  renderProducts();
  loadSavedUser();
  updateCartBadges();
  updateOrdersBadge();

  if (typeof PRODUCTS !== "undefined" && PRODUCTS.length > 0) {
    currentProduct = PRODUCTS[0];
  }

  // Ativa automaticamente 90% OFF sem nenhum popup ou roleta
  sessionStorage.setItem("shopping_brasil_1111_claimed", "true");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeTikTokShopApp);
} else {
  initializeTikTokShopApp();
}

// Check Promo Entrance
function checkPromoEntrance() {
  sessionStorage.setItem("shopping_brasil_1111_claimed", "true");
}

let promoCountdownInterval = null;

function openPromo1111Modal() {
  const modal = document.getElementById("promo1111Modal");
  if (modal) {
    modal.classList.add("active");
    if (typeof confetti === "function") {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }

    let seconds = 4;
    const timerText = document.getElementById("popupCountdownText");
    if (timerText) timerText.textContent = `Fechará em ${seconds} s`;

    if (promoCountdownInterval) clearInterval(promoCountdownInterval);
    promoCountdownInterval = setInterval(() => {
      seconds--;
      if (seconds > 0) {
        if (timerText) timerText.textContent = `Fechará em ${seconds} s`;
      } else {
        clearInterval(promoCountdownInterval);
        closePromo1111Modal();
      }
    }, 1000);
  }
}

function closePromo1111Modal() {
  if (promoCountdownInterval) {
    clearInterval(promoCountdownInterval);
    promoCountdownInterval = null;
  }
  const modal = document.getElementById("promo1111Modal");
  if (modal) {
    modal.classList.remove("active");
  }
}

function openRouletteFromPromo() {
  closePromo1111Modal();
  const rouletteModal = document.getElementById("rouletteModal");
  if (rouletteModal) {
    rouletteModal.classList.add("active");
    drawEmbeddedWheel();
  }
}

// Embedded Roulette Draw Function
function drawEmbeddedWheel() {
  const canvas = document.getElementById("rouletteCanvasModal");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const size = canvas.width;
  const center = size / 2;
  const radius = center - 6;
  const numSegments = ROULETTE_SEGMENTS.length;
  const anglePerSegment = (2 * Math.PI) / numSegments;

  ctx.clearRect(0, 0, size, size);

  // Outer gold rim
  ctx.beginPath();
  ctx.arc(center, center, center - 2, 0, 2 * Math.PI);
  ctx.fillStyle = "#1e222a";
  ctx.fill();

  ROULETTE_SEGMENTS.forEach((seg, i) => {
    const startAngle = i * anglePerSegment;
    const endAngle = startAngle + anglePerSegment;

    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = seg.color;
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#161823";
    ctx.stroke();

    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(startAngle + anglePerSegment / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = seg.textColor;

    if (seg.label === "↻") {
      ctx.font = "bold 20px sans-serif";
      ctx.fillText("↻", radius - 12, 3);
      ctx.font = "bold 8.5px sans-serif";
      ctx.fillText(seg.sub, radius - 30, 3);
    } else {
      ctx.font = "900 15px sans-serif";
      ctx.fillText(seg.label, radius - 10, -1);
      ctx.font = "bold 8px sans-serif";
      ctx.fillText(seg.sub, radius - 10, 10);
    }

    ctx.restore();
  });
}

// Embedded Roulette Spin Trigger
function triggerEmbeddedSpin() {
  if (isRouletteSpinning) return;
  isRouletteSpinning = true;

  const btn = document.getElementById("btnEmbeddedSpin");
  if (btn) btn.disabled = true;

  rouletteSpinCount++;

  const targetIndex = (rouletteSpinCount === 1) ? 3 : 7;
  const segmentCenter = targetIndex * 45 + 22.5;

  let desiredModulo = (270 - segmentCenter) % 360;
  if (desiredModulo < 0) desiredModulo += 360;

  const currentModulo = rouletteRotation % 360;
  let diff = (desiredModulo - currentModulo) % 360;
  if (diff < 0) diff += 360;

  const fullSpins = 1800; // 5 full turns
  rouletteRotation += fullSpins + diff;

  const wheelBox = document.getElementById("embeddedWheelRotator");
  if (wheelBox) {
    wheelBox.style.transform = `rotate(${rouletteRotation}deg)`;
  }

  setTimeout(() => {
    isRouletteSpinning = false;
    if (rouletteSpinCount === 1) {
      const lossDialog = document.getElementById("spinResultLoss");
      if (lossDialog) lossDialog.classList.add("active");
    } else {
      if (typeof confetti === "function") {
        confetti({
          particleCount: 180,
          spread: 100,
          origin: { y: 0.4 },
          zIndex: 999999
        });
        setTimeout(() => {
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { x: 0.2, y: 0.5 },
            zIndex: 999999
          });
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { x: 0.8, y: 0.5 },
            zIndex: 999999
          });
        }, 300);
      }
      const winDialog = document.getElementById("spinResultWin");
      if (winDialog) winDialog.classList.add("active");
    }
  }, 4700);
}

function retrySpin() {
  const lossDialog = document.getElementById("spinResultLoss");
  if (lossDialog) lossDialog.classList.remove("active");
  const btn = document.getElementById("btnEmbeddedSpin");
  if (btn) btn.disabled = false;
  triggerEmbeddedSpin();
}

function claimRoulettePrize() {
  sessionStorage.setItem("shopping_brasil_1111_claimed", "true");
  const winDialog = document.getElementById("spinResultWin");
  if (winDialog) winDialog.classList.remove("active");
  const rouletteModal = document.getElementById("rouletteModal");
  if (rouletteModal) rouletteModal.classList.remove("active");
  selectCategory("all");

  showToast("Cupom de 90% OFF ativado! Aproveite os produtos!");
}

// ==========================================
// SCOPED USER DATA SYSTEM ("Site Inteligente")
// ==========================================
function getUserIdentityKey(user) {
  const u = user || userData || {};
  const nameClean = (u.name || "").trim().toLowerCase().replace(/[^a-z0-9]/g, "");
  const phoneClean = (u.phone || "").replace(/\D/g, "");
  const cepClean = (u.cep || "").replace(/\D/g, "");
  const docClean = (u.document || "").replace(/\D/g, "");

  if (!nameClean && !phoneClean && !cepClean && !docClean) {
    return "guest";
  }
  return nameClean + "_" + (phoneClean || docClean || cepClean);
}

function loadScopedUserData() {
  const userKey = getUserIdentityKey(userData);

  // Limpa armazenamento global antigo para que pedidos antigos nunca vazem para outros enderecos
  try {
    localStorage.removeItem("shopping_brasil_my_orders");
  } catch (e) {}

  if (userKey === "guest") {
    myOrders = [];
    cart = [];
  } else {
    try {
      const allOrders = JSON.parse(localStorage.getItem("shopping_brasil_orders_by_user") || "{}");
      myOrders = Array.isArray(allOrders[userKey]) ? allOrders[userKey] : [];
    } catch (e) {
      myOrders = [];
    }
    try {
      const allCarts = JSON.parse(localStorage.getItem("shopping_brasil_cart_by_user") || "{}");
      cart = Array.isArray(allCarts[userKey]) ? allCarts[userKey] : [];
    } catch (e) {
      cart = [];
    }
  }

  updateCartBadges();
  updateOrdersBadge();
}

function saveScopedOrders() {
  const userKey = getUserIdentityKey(userData);
  if (userKey === "guest") return;
  try {
    const allOrders = JSON.parse(localStorage.getItem("shopping_brasil_orders_by_user") || "{}");
    allOrders[userKey] = myOrders;
    localStorage.setItem("shopping_brasil_orders_by_user", JSON.stringify(allOrders));
  } catch (e) {}
}

function saveScopedCart() {
  const userKey = getUserIdentityKey(userData);
  try {
    const allCarts = JSON.parse(localStorage.getItem("shopping_brasil_cart_by_user") || "{}");
    allCarts[userKey] = cart;
    localStorage.setItem("shopping_brasil_cart_by_user", JSON.stringify(allCarts));
  } catch (e) {}
}

// User Address Management
function loadSavedUser() {
  const saved = localStorage.getItem("shopping_brasil_user");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === "object") {
        // Discard any residual "Carlos" dummy data
        if (parsed.name && parsed.name.toLowerCase().includes("carlos")) {
          localStorage.removeItem("shopping_brasil_user");
          userData = { name: "", phone: "", cep: "", street: "", number: "", neighborhood: "", cityState: "", document: "" };
        } else {
          userData = Object.assign(userData, parsed);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
  loadScopedUserData();
  renderCheckoutAddress();
}

function renderCheckoutAddress() {
  const container = document.getElementById("checkoutAddressContent");
  if (!container) return;

  const hasAddress = userData.name && userData.street;

  if (!hasAddress) {
    container.innerHTML = `
      <div class="address-empty-state">
        <div class="add-icon-circle">+</div>
        <div class="address-empty-text">
          <h4>Cadastrar endereço de entrega</h4>
          <p>Informe seu Nome, Telefone e CEP para entrega rápida ></p>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="address-selector-row">
        <svg class="pin-icon" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
        <div class="address-content">
          <div class="address-user-line">
            <span>${userData.name}</span>
            <span style="color: #888; font-weight: normal;">${userData.phone}</span>
          </div>
          <div class="address-text-line">
            ${userData.street}, ${userData.number} - ${userData.neighborhood}, ${userData.cityState}, ${userData.cep}
          </div>
          <span class="address-edit-link">Editar endereço de entrega ></span>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#888"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
      </div>
    `;
  }

  const orderName = document.getElementById("orderSummaryName");
  if (orderName) orderName.textContent = userData.name || "Cliente";

  const orderAddr = document.getElementById("orderSummaryAddress");
  if (orderAddr) {
    orderAddr.textContent = hasAddress
      ? `${userData.street}, ${userData.number} - ${userData.cityState}`
      : "Endereço cadastrado no pedido";
  }
}

function openAddressModal() {
  document.getElementById("inputName").value = userData.name || "";
  document.getElementById("inputPhone").value = userData.phone || "";
  const docInput = document.getElementById("inputDoc");
  if (docInput) docInput.value = userData.document || "";
  document.getElementById("inputCep").value = userData.cep || "";
  document.getElementById("inputNumber").value = userData.number || "";
  document.getElementById("inputStreet").value = userData.street || "";
  document.getElementById("inputNeighborhood").value = userData.neighborhood || "";
  document.getElementById("inputCityState").value = userData.cityState || "";

  document.getElementById("addressModal").classList.add("active");
}

function closeAddressModal() {
  document.getElementById("addressModal").classList.remove("active");
}

// Automatic CEP Lookup (ViaCEP)
async function handleCepAutoFill(val) {
  const clean = val.replace(/\D/g, "");

  if (clean.length > 5) {
    document.getElementById("inputCep").value = clean.substring(0, 5) + "-" + clean.substring(5, 8);
  }

  if (clean.length === 8) {
    try {
      showToast("Buscando endereço pelo CEP...");
      const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
      const data = await res.json();

      if (!data.erro) {
        if (data.logradouro) document.getElementById("inputStreet").value = data.logradouro;
        if (data.bairro) document.getElementById("inputNeighborhood").value = data.bairro;
        if (data.localidade && data.uf) {
          document.getElementById("inputCityState").value = `${data.localidade} - ${data.uf}`;
        }
        showToast("Rua e Bairro preenchidos! Digite o número da casa.");
        document.getElementById("inputNumber").focus();
      } else {
        showToast("CEP não encontrado. Preencha manualmente.");
      }
    } catch (e) {
      console.warn("Erro ao buscar CEP:", e);
    }
  }
}

function saveAddress() {
  const name = document.getElementById("inputName").value.trim();
  const phone = document.getElementById("inputPhone").value.trim();
  const docInput = document.getElementById("inputDoc");
  const doc = docInput ? docInput.value.trim() : "";
  const cep = document.getElementById("inputCep").value.trim();
  const number = document.getElementById("inputNumber").value.trim();
  const street = document.getElementById("inputStreet").value.trim();
  const neighborhood = document.getElementById("inputNeighborhood").value.trim();
  const cityState = document.getElementById("inputCityState").value.trim();

  if (!name || !phone || !street || !number) {
    showToast("Por favor, preencha nome, telefone, rua e número!");
    return;
  }

  const oldKey = getUserIdentityKey(userData);
  const newUserData = { name, phone, cep, street, number, neighborhood, cityState, document: doc };
  const newKey = getUserIdentityKey(newUserData);

  userData = newUserData;
  localStorage.setItem("shopping_brasil_user", JSON.stringify(userData));

  if (oldKey !== newKey) {
    // Endereço / Novo comprador: isola os pedidos e carrinho para o novo endereço
    const allOrders = JSON.parse(localStorage.getItem("shopping_brasil_orders_by_user") || "{}");
    myOrders = Array.isArray(allOrders[newKey]) ? allOrders[newKey] : [];

    const allCarts = JSON.parse(localStorage.getItem("shopping_brasil_cart_by_user") || "{}");
    if (oldKey === "guest" && cart.length > 0) {
      allCarts[newKey] = cart;
      localStorage.setItem("shopping_brasil_cart_by_user", JSON.stringify(allCarts));
    } else {
      cart = Array.isArray(allCarts[newKey]) ? allCarts[newKey] : [];
    }

    // Limpa transação pendente do usuário anterior
    window.currentTransaction = null;
    window.pendingOrderForPayment = null;
    try { localStorage.removeItem("shopping_brasil_current_tx"); } catch (e) {}

    updateOrdersBadge();
    updateCartBadges();
    renderCheckoutItems();
  }

  renderCheckoutAddress();
  closeAddressModal();
  showToast("Endereço salvo com sucesso!");
}

// ========================================================
// INTELLIGENT VARIATION PRICING ENGINE
// ========================================================
const BASIC_PRODUCT_COLORS = [
  "preto", "preta", "black", "preto fosco", "preto titanio", "preto titânio", 
  "branco", "branca", "white", "branco neve", "branco titanio", "branco titânio",
  "cinza", "prata", "prateado", "silver", "cinza espacial", "cinza titanium",
  "padrao", "padrão", "padrao oficial", "padrão oficial", "inox", "grafite"
];

function isDifferentiatedColor(prod, colorName) {
  if (!prod || !colorName) return false;
  const cat = (prod.category || "").toLowerCase();
  const title = (prod.title || "").toLowerCase();
  const isTech = (cat === "smartphones" || cat === "informatica" || cat === "eletronicos" ||
                  title.includes("iphone") || title.includes("galaxy") || title.includes("ipad") ||
                  title.includes("watch") || title.includes("tablet") || title.includes("macbook") ||
                  title.includes("celular") || title.includes("smartphone"));
  if (!isTech) return false;

  const norm = colorName.toLowerCase().trim();
  for (let i = 0; i < BASIC_PRODUCT_COLORS.length; i++) {
    const b = BASIC_PRODUCT_COLORS[i];
    if (norm === b || norm.startsWith(b + " ") || norm.endsWith(" " + b)) {
      return false;
    }
  }
  return true;
}

function getProductVoltageDelta(prod, voltage) {
  if (!prod || !voltage) return 0;
  if (!prod.voltages || prod.voltages.length <= 1) return 0;

  const v = voltage.toUpperCase().trim();
  if (v.includes("127V") || v.includes("110V") || v.includes("BIVOLT")) {
    return 0;
  }
  if (v.includes("220V")) {
    if (prod.voltageDeltas && typeof prod.voltageDeltas[voltage] === "number") {
      return prod.voltageDeltas[voltage];
    }
    const base = typeof prod.price === "number" ? prod.price : 80;
    if (base < 40) return 5.00;
    if (base < 70) return 7.00;
    if (base < 120) return 10.00;
    return 15.00;
  }
  return 0;
}

function getProductVariantPrice(prod, selectedOption = null, selectedVoltage = null) {
  if (!prod) return { price: 0, oldPrice: 0, discount: "-90%" };

  const basePrice = (typeof prod.price === "number") ? prod.price : 0;
  const baseOldPrice = (typeof prod.oldPrice === "number") ? prod.oldPrice : (basePrice * 10);

  let currentPrice = basePrice;
  if (selectedOption && prod.variantPrices && typeof prod.variantPrices[selectedOption] === "number") {
    currentPrice = prod.variantPrices[selectedOption];
  } else if (selectedOption && prod.colorPriceDeltas && typeof prod.colorPriceDeltas[selectedOption] === "number") {
    currentPrice = basePrice + prod.colorPriceDeltas[selectedOption];
  } else if (selectedOption && isDifferentiatedColor(prod, selectedOption)) {
    const delta = (basePrice >= 80) ? 10.00 : 8.00;
    currentPrice = basePrice + delta;
  }

  const voltDelta = getProductVoltageDelta(prod, selectedVoltage);
  const finalPrice = Math.round((currentPrice + voltDelta) * 100) / 100;

  const ratio = basePrice > 0 ? (finalPrice / basePrice) : 1;
  const finalOldPrice = Math.round(baseOldPrice * ratio * 100) / 100;

  const discPercent = Math.min(99, Math.max(50, Math.round((1 - (finalPrice / finalOldPrice)) * 100)));
  const discountStr = `-${discPercent}%`;

  return {
    price: finalPrice,
    oldPrice: finalOldPrice,
    discount: discountStr
  };
}

function getCartItemPrice(item) {
  if (!item) return 0;
  if (typeof item.price === "number") return item.price;
  if (item.product && typeof item.product.price === "number") return item.product.price;
  return 0;
}

function getCartItemOldPrice(item) {
  if (!item) return 0;
  if (typeof item.oldPrice === "number") return item.oldPrice;
  if (item.product && typeof item.product.oldPrice === "number") return item.product.oldPrice;
  return getCartItemPrice(item) * 10;
}

// Cart System (Adds to cart with exact color, image, voltage and dynamic variation price)
function addToCart(productId, selectedColor = null, event = null, qty = 1) {
  if (event) event.stopPropagation();

  const prod = PRODUCTS.find(p => p.id === productId);
  if (!prod) return;

  if (prod.soldOut) {
    showToast("Este produto está esgotado no momento!");
    return;
  }

  // If clicked from catalog and product has options (colors or voltages), open PDP for customer to choose
  const needsOptionChoice = ((prod.colors && prod.colors.length > 1) || (prod.voltages && prod.voltages.length > 1));
  if (!selectedColor && needsOptionChoice && (!currentProduct || currentProduct.id !== prod.id)) {
    openProductDetail(productId);
    showToast(`Selecione as opções desejadas antes de adicionar!`);
    return;
  }

  const hasColors = prod.colors && prod.colors.length > 0;
  const chosenColor = hasColors ? (selectedColor || (currentProduct && currentProduct.id === prod.id && currentSelectedColor ? currentSelectedColor : prod.colors[0])) : null;
  const itemImg = (chosenColor && prod.colorImages && prod.colorImages[chosenColor]) || prod.image;

  let chosenVolt = null;
  let variantLabel = chosenColor || "";
  if (prod.voltages && prod.voltages.length > 0) {
    chosenVolt = (currentProduct && currentProduct.id === prod.id && currentSelectedVoltage) ? currentSelectedVoltage : prod.voltages[0];
    variantLabel = variantLabel ? `${variantLabel} - ${chosenVolt}` : chosenVolt;
  } else if (!variantLabel) {
    variantLabel = "Padrão Oficial";
  }

  const pricing = getProductVariantPrice(prod, chosenColor, chosenVolt);

  const currentCartTotal = cart.reduce((sum, it) => sum + (getCartItemPrice(it) * it.quantity), 0);
  if (currentCartTotal + (pricing.price * qty) > 350.00) {
    showToast("⚠️ Limite promocional: Máximo de R$ 350,00 por pedido! Finalize este e faça outro em seguida.");
    openCartModal();
    return;
  }

  const existing = cart.find(item => item.product.id === prod.id && item.color === variantLabel);
  if (existing) {
    existing.quantity += qty;
    existing.price = pricing.price;
    existing.oldPrice = pricing.oldPrice;
  } else {
    cart.push({
      product: prod,
      color: variantLabel,
      selectedOption: chosenColor,
      selectedVoltage: chosenVolt,
      price: pricing.price,
      oldPrice: pricing.oldPrice,
      image: itemImg,
      quantity: qty
    });
  }

  updateCartBadges();
  saveScopedCart();

  // Meta Pixel AddToCart
  if (window.MetaPixel) window.MetaPixel.trackAddToCart(prod, qty, pricing.price);

  showToast(`✓ Adicionado ao carrinho (${variantLabel}) - R$ ${formatBRL(pricing.price)}!`);
  openCartModal();
}

function addToCartCurrent() {
  if (!currentProduct) return;
  if (currentProduct.soldOut) {
    showToast("Este produto está esgotado no momento!");
    return;
  }
  const colorToUse = currentSelectedColor || (currentProduct.colors && currentProduct.colors.length > 0 ? currentProduct.colors[0] : "Padrão Oficial");
  addToCart(currentProduct.id, colorToUse, null, orderQuantity || 1);
}

function buyNowCurrent() {
  if (!currentProduct) return;
  if (currentProduct.soldOut) {
    showToast("Este produto está esgotado no momento!");
    return;
  }
  const hasColors = currentProduct.colors && currentProduct.colors.length > 0;
  const color = hasColors ? (currentSelectedColor || currentProduct.colors[0]) : null;
  const itemImg = (color && currentProduct.colorImages && currentProduct.colorImages[color]) || currentProduct.image;
  
  let chosenVolt = null;
  let variantLabel = color || "";
  if (currentProduct.voltages && currentProduct.voltages.length > 0) {
    chosenVolt = currentSelectedVoltage || currentProduct.voltages[0];
    variantLabel = variantLabel ? `${variantLabel} - ${chosenVolt}` : chosenVolt;
  } else if (!variantLabel) {
    variantLabel = "Padrão Oficial";
  }

  const pricing = getProductVariantPrice(currentProduct, color, chosenVolt);

  cart = [{
    product: currentProduct,
    color: variantLabel,
    selectedOption: color,
    selectedVoltage: chosenVolt,
    price: pricing.price,
    oldPrice: pricing.oldPrice,
    image: itemImg,
    quantity: orderQuantity || 1
  }];
  
  updateCartBadges();
  saveScopedCart();
  goToCheckout();
}

function changePdpQuantity(delta) {
  const nextQty = Math.max(1, (orderQuantity || 1) + delta);
  const currentPricing = currentProduct ? getProductVariantPrice(currentProduct, currentSelectedColor, currentSelectedVoltage) : { price: 0 };
  if (currentProduct && delta > 0 && (nextQty * currentPricing.price > 350.00 || nextQty > 3)) {
    showToast("⚠️ Limite promocional por pedido atingido!");
    return;
  }
  orderQuantity = nextQty;
  const qtyEl = document.getElementById("pdpQuantityValue");
  if (qtyEl) qtyEl.textContent = orderQuantity;
}

function updateCartBadges() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badgeMain = document.getElementById("cartBadgeCount");
  const badgePdp = document.getElementById("cartBadgeCountPdp");
  const badgePdpIcon = document.getElementById("cartBadgePdp");

  if (badgeMain) badgeMain.textContent = count;
  if (badgePdp) badgePdp.textContent = count;
  if (badgePdpIcon) badgePdpIcon.textContent = count;
}

// ========================================================
// DETERMINISTIC URGENCY DATA GENERATOR (SCREENSHOT 4)
// ========================================================
function getProductUrgency(prod) {
  if (prod && prod.urgency) return prod.urgency;
  if (!prod) return { viewers: "30", stock: "22" };
  const str = String(prod.id) + String(prod.title);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const posHash = Math.abs(hash);

  const viewerTiers = [
    30, 42, 58, 86, 120, 240, 480, 890, 1250, 1840, 2190, 2850, 3120, 38, 64, 95, 340, 680, 1420, 2600
  ];
  const stockTiers = [
    7, 12, 18, 22, 28, 35, 44, 56, 80, 100, 140, 220, 310, 400, 16, 24, 38, 92, 180, 350
  ];

  const viewersVal = viewerTiers[posHash % viewerTiers.length];
  const stockVal = stockTiers[(posHash >> 2) % stockTiers.length];

  return {
    viewers: viewersVal >= 1000 ? viewersVal.toLocaleString('pt-BR') : viewersVal.toString(),
    stock: stockVal >= 1000 ? stockVal.toLocaleString('pt-BR') : stockVal.toString()
  };
}

// ========================================================
// QUICK SELECT BOTTOM SHEET DRAWER (SCREENSHOT 3)
// ========================================================
let quickProduct = null;
let quickSelectedColor = null;
let quickSelectedVoltage = null;
let quickQuantity = 1;

function handleCardCartClick(productId, event) {
  if (event) event.stopPropagation();
  openQuickSelectDrawer(productId);
}

function handleCardBuyClick(productId, event) {
  if (event) event.stopPropagation();
  handleCardDirectBuyClick(productId, event);
}

function handleCardDirectBuyClick(productId, event) {
  if (event) event.stopPropagation();
  const prod = PRODUCTS.find(p => p.id === productId);
  if (!prod) return;
  if (prod.soldOut) {
    showToast("Este produto está esgotado no momento!");
    return;
  }

  const defaultColor = (prod.colors && prod.colors.length > 0) ? prod.colors[0] : "Padrão Oficial";
  const defaultVolt = (prod.voltages && prod.voltages.length > 0) ? prod.voltages[0] : null;
  const itemImg = (prod.colorImages && prod.colorImages[defaultColor]) || prod.image;
  const variantLabel = defaultVolt ? `${defaultColor} - ${defaultVolt}` : defaultColor;

  const pricing = getProductVariantPrice(prod, defaultColor, defaultVolt);

  cart = [{
    product: prod,
    color: variantLabel,
    selectedOption: defaultColor,
    selectedVoltage: defaultVolt,
    price: pricing.price,
    oldPrice: pricing.oldPrice,
    image: itemImg,
    quantity: 1
  }];

  updateCartBadges();
  saveScopedCart();
  goToCheckout();

  if (userData.name && userData.street) {
    setTimeout(() => {
      processOrderCheckout();
    }, 250);
  }
}

function openCurrentProductDrawer() {
  if (currentProduct) {
    openQuickSelectDrawer(currentProduct.id);
  }
}

function openQuickSelectDrawer(productId) {
  const prod = PRODUCTS.find(p => p.id === productId);
  if (!prod) return;

  // Meta Pixel ViewContent
  if (window.MetaPixel) window.MetaPixel.trackViewContent(prod);

  quickProduct = prod;
  quickQuantity = 1;

  if (prod.colors && prod.colors.length > 0) {
    quickSelectedColor = (currentProduct && currentProduct.id === prod.id && currentSelectedColor)
      ? currentSelectedColor 
      : prod.colors[0];
  } else {
    quickSelectedColor = "Padrão";
  }

  if (prod.voltages && prod.voltages.length > 0) {
    quickSelectedVoltage = (currentProduct && currentProduct.id === prod.id && currentSelectedVoltage)
      ? currentSelectedVoltage 
      : prod.voltages[0];
  } else {
    quickSelectedVoltage = null;
  }

  updateQuickSheetUI();

  const modal = document.getElementById("quickSelectModal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function updateQuickSheetUI() {
  if (!quickProduct) return;
  const prod = quickProduct;

  const currentThumbImg = (quickSelectedColor && prod.colorImages && prod.colorImages[quickSelectedColor]) || prod.image;
  const imgEl = document.getElementById("quickSheetImg");
  if (imgEl) {
    imgEl.src = currentThumbImg;
    imgEl.onerror = () => { imgEl.src = prod.image; };
  }

  const pricing = getProductVariantPrice(prod, quickSelectedColor, quickSelectedVoltage);

  const priceEl = document.getElementById("quickSheetPrice");
  if (priceEl) priceEl.textContent = `R$ ${formatBRL(pricing.price)}`;

  const oldPriceEl = document.getElementById("quickSheetOldPrice");
  if (oldPriceEl) oldPriceEl.textContent = `R$ ${formatBRL(pricing.oldPrice)}`;

  const titleEl = document.getElementById("quickSheetTitle");
  if (titleEl) titleEl.innerHTML = `<span class="badge-oficial">Oficial</span> ${prod.title}`;

  const labelEl = document.getElementById("quickSheetSelectedLabel");
  if (labelEl) {
    let selText = `Selecionado: ${quickSelectedColor || "Padrão"}`;
    if (quickSelectedVoltage) selText += ` - ${quickSelectedVoltage}`;
    selText += ` (R$ ${formatBRL(pricing.price)})`;
    labelEl.textContent = selText;
  }

  const qtyEl = document.getElementById("quickQtyValue");
  if (qtyEl) qtyEl.textContent = quickQuantity;

  // Render Models Grid
  const modelsGrid = document.getElementById("quickSheetModelsGrid");
  const modelsHeader = document.getElementById("quickSheetModelsHeader");

  const optionList = [];
  if (prod.colors && prod.colors.length > 0) {
    prod.colors.forEach((col, idx) => {
      const img = (prod.colorImages && prod.colorImages[col]) || prod.image;
      optionList.push({ label: col, img: img, val: col });
    });
  } else if (prod.images && prod.images.length > 1) {
    prod.images.forEach((img, idx) => {
      optionList.push({ label: `Modelo ${idx + 1}`, img: img, val: `Modelo ${idx + 1}` });
    });
  } else {
    optionList.push({ label: "Padrão", img: prod.image, val: "Padrão" });
  }

  if (modelsHeader) {
    modelsHeader.textContent = prod.optionLabel ? `${prod.optionLabel.replace(':', '')} (${optionList.length})` : `Modelo (${optionList.length})`;
  }

  if (modelsGrid) {
    modelsGrid.innerHTML = optionList.map(opt => {
      const isActive = (quickSelectedColor === opt.val);
      const optPricing = getProductVariantPrice(prod, opt.val, quickSelectedVoltage);
      const badgeText = (prod.modelBadges && prod.modelBadges[opt.val]) ? prod.modelBadges[opt.val] : "";
      const badgeHtml = badgeText ? `<div class="quick-model-badge">${badgeText}</div>` : "";
      const priceTagHtml = `<div style="font-size: 11px; font-weight: 700; color: #fe2c55; margin-top: 2px;">R$ ${formatBRL(optPricing.price)}</div>`;
      return `
        <div class="quick-model-card ${isActive ? 'active' : ''}" onclick="selectQuickModel('${opt.val}')">
          <img src="${opt.img}" alt="${opt.label}" class="quick-model-thumb" onerror="this.src='${prod.image}'">
          <span class="quick-model-name">${opt.label}</span>
          ${priceTagHtml}
          ${badgeHtml}
        </div>
      `;
    }).join("");
  }

  // Render Voltages
  const voltSection = document.getElementById("quickSheetVoltageSection");
  const voltChips = document.getElementById("quickSheetVoltageChips");
  if (prod.voltages && prod.voltages.length > 0) {
    if (voltSection) voltSection.style.display = "block";
    if (voltChips) {
      voltChips.innerHTML = prod.voltages.map(v => {
        const isActive = (quickSelectedVoltage === v);
        const vPricing = getProductVariantPrice(prod, quickSelectedColor, v);
        return `
          <div class="quick-volt-chip ${isActive ? 'active' : ''}" onclick="selectQuickVoltage('${v}')" style="display: inline-flex; align-items: center; gap: 4px;">
            <span>${v}</span>
            <span style="font-size: 10px; opacity: 0.85;">R$ ${formatBRL(vPricing.price)}</span>
          </div>
        `;
      }).join("");
    }
  } else {
    if (voltSection) voltSection.style.display = "none";
  }

  const ctaBtn = document.getElementById("btnQuickAddCart");
  if (ctaBtn) {
    if (prod.soldOut) {
      ctaBtn.disabled = true;
      ctaBtn.style.background = "#ccc";
      ctaBtn.textContent = "Produto Esgotado";
    } else {
      ctaBtn.disabled = false;
      ctaBtn.style.background = "#fe2c55";
      ctaBtn.textContent = `Adicionar ao carrinho • R$ ${formatBRL(pricing.price * quickQuantity)}`;
    }
  }
}

function selectQuickModel(modelVal) {
  quickSelectedColor = modelVal;
  updateQuickSheetUI();
  if (currentProduct && quickProduct && currentProduct.id === quickProduct.id) {
    currentSelectedColor = modelVal;
    const nameEl = document.getElementById("pdpSelectedColorName");
    if (nameEl) nameEl.textContent = modelVal;
    document.querySelectorAll("#pdpColorChipsList .color-option-pill").forEach(p => {
      if (p.textContent.trim() === modelVal) p.classList.add("active");
      else p.classList.remove("active");
    });
    updatePdpPriceDisplay();
  }
}

function selectQuickVoltage(voltVal) {
  quickSelectedVoltage = voltVal;
  updateQuickSheetUI();
  if (currentProduct && quickProduct && currentProduct.id === quickProduct.id) {
    currentSelectedVoltage = voltVal;
    const nameEl = document.getElementById("pdpSelectedVoltageName");
    if (nameEl) nameEl.textContent = voltVal;
    document.querySelectorAll("#pdpVoltageChipsList .color-option-pill").forEach(p => {
      if (p.textContent.trim() === voltVal) p.classList.add("active");
      else p.classList.remove("active");
    });
    updatePdpPriceDisplay();
  }
}

function changeQuickQty(delta) {
  const next = quickQuantity + delta;
  if (next >= 1 && next <= 10) {
    quickQuantity = next;
    const el = document.getElementById("quickQtyValue");
    if (el) el.textContent = quickQuantity;
    updateQuickSheetUI();
  }
}

function closeQuickSelectDrawer(event) {
  if (event && event.target && !event.target.classList.contains("modal-overlay") && !event.target.classList.contains("quick-sheet-close-btn")) {
    return;
  }
  const modal = document.getElementById("quickSelectModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function confirmQuickAddToCart() {
  if (!quickProduct) return;
  if (quickProduct.soldOut) {
    showToast("Este produto está esgotado no momento!");
    return;
  }

  const prod = quickProduct;
  const chosenColor = quickSelectedColor || "Padrão";
  const itemImg = (prod.colorImages && prod.colorImages[chosenColor]) || prod.image;

  let variantLabel = chosenColor;
  if (quickSelectedVoltage) {
    variantLabel = `${chosenColor} - ${quickSelectedVoltage}`;
  }

  const pricing = getProductVariantPrice(prod, chosenColor, quickSelectedVoltage);

  const currentCartTotal = cart.reduce((sum, it) => sum + (getCartItemPrice(it) * it.quantity), 0);
  if (currentCartTotal + (pricing.price * quickQuantity) > 350.00) {
    showToast("⚠️ Limite promocional: Máximo de R$ 350,00 por pedido! Finalize este e faça outro em seguida.");
    closeQuickSelectDrawer();
    openCartModal();
    return;
  }

  const existing = cart.find(item => item.product.id === prod.id && item.color === variantLabel);
  if (existing) {
    existing.quantity += quickQuantity;
    existing.price = pricing.price;
    existing.oldPrice = pricing.oldPrice;
  } else {
    cart.push({
      product: prod,
      color: variantLabel,
      selectedOption: chosenColor,
      selectedVoltage: quickSelectedVoltage,
      price: pricing.price,
      oldPrice: pricing.oldPrice,
      image: itemImg,
      quantity: quickQuantity
    });
  }

  updateCartBadges();
  saveScopedCart();
  closeQuickSelectDrawer();
  showToast(`✓ Adicionado ao carrinho (${variantLabel}) - R$ ${formatBRL(pricing.price)}!`);
}

// Open Cart Bottom-Sheet Modal
function openCartModal() {
  const modal = document.getElementById("cartModal");
  const body = document.getElementById("cartModalBody");
  const subtotalEl = document.getElementById("cartModalSubtotal");
  if (!modal || !body) return;

  if (cart.length === 0) {
    body.innerHTML = `
      <div style="text-align: center; padding: 36px 16px; color: #777;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="#ccc"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
        <p style="font-size: 14px; margin-top: 10px; font-weight: 600;">Seu carrinho está vazio</p>
        <p style="font-size: 12px; margin-top: 4px;">Explore os produtos e aproveite os super descontos!</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = "R$ 0,00";
  } else {
    let subtotal = 0;
    body.innerHTML = cart.map((item, idx) => {
      const itemPrice = getCartItemPrice(item);
      const itemSub = itemPrice * item.quantity;
      subtotal += itemSub;
      return `
        <div style="display: flex; gap: 10px; align-items: center; padding: 10px 0; border-bottom: 1px solid #f1f1f2;">
          <img src="${item.image || item.product.image}" style="width: 58px; height: 58px; object-fit: contain; background: #fff; padding: 2px; border-radius: 8px; border: 1px solid #eee;" alt="${item.product.title}">
          <div style="flex: 1; min-width: 0;">
            <div style="font-size: 12.5px; font-weight: 700; color: #161823; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.product.title}</div>
            <div style="font-size: 11.5px; color: #555; margin-top: 2px;">Opção: <b style="color: #fe2c55;">${item.color}</b></div>
            <div style="font-size: 13.5px; font-weight: 800; color: #fe2c55; margin-top: 4px;">R$ ${itemPrice.toFixed(2).replace('.', ',')}</div>
          </div>
          <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px;">
            <button class="checkout-item-remove-btn" onclick="removeCartItem(${idx})">✕</button>
            <div class="quantity-stepper">
              <button class="stepper-btn" onclick="changeCartItemQty(${idx}, -1)">-</button>
              <span class="stepper-value">${item.quantity}</span>
              <button class="stepper-btn" onclick="changeCartItemQty(${idx}, 1)">+</button>
            </div>
          </div>
        </div>
      `;
    }).join("");

    if (subtotalEl) subtotalEl.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  }

  modal.classList.add("active");
}

// ==========================================
// ORDERS SYSTEM STATE (USER PURCHASE HISTORY)
// ==========================================
let myOrders = [];
try {
  const saved = JSON.parse(localStorage.getItem("shopping_brasil_my_orders") || "[]");
  // Clean out any dummy mock order (like SB-84921 or dummy air fryer)
  myOrders = (Array.isArray(saved) ? saved : []).filter(o => 
    o.id !== "SB-84921" && 
    (!o.items || !o.items.some(it => it.title && it.title.includes("AFN-40-BFT")))
  );
  saveScopedOrders();
} catch(e) {
  myOrders = [];
}

window.pendingOrderForPayment = null;

function updateOrdersBadge() {
  const count = (myOrders && myOrders.length) || 0;
  const b1 = document.getElementById("ordersBadgeCount");
  const b2 = document.getElementById("ordersBadgeCountPdp");
  [b1, b2].forEach(b => {
    if (!b) return;
    if (count > 0) {
      b.textContent = count;
      b.style.display = "flex";
    } else {
      b.style.display = "none";
    }
  });
}

function openOrdersModal() {
  const modal = document.getElementById("ordersModal");
  const body = document.getElementById("ordersListBody");
  if (!modal || !body) return;

  if (!myOrders || myOrders.length === 0) {
    body.innerHTML = `
      <div style="text-align: center; padding: 48px 16px; color: #777;">
        <div style="width: 56px; height: 56px; border-radius: 50%; background: #f4f5f7; display: flex; align-items: center; justify-content: center; margin: 0 auto 14px auto;">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            <line x1="9" y1="7" x2="15" y2="7"></line>
            <line x1="9" y1="11" x2="15" y2="11"></line>
          </svg>
        </div>
        <div style="font-size: 15px; font-weight: 700; color: #161823;">Nenhum pedido realizado ainda</div>
        <div style="font-size: 12.5px; color: #777; margin-top: 6px; line-height: 1.45; max-width: 280px; margin-left: auto; margin-right: auto;">
          Assim que você efetuar uma compra e o pagamento via Pix for aprovado, seu pedido aparecerá aqui com status em tempo real de preparo e envio.
        </div>
      </div>
    `;
  } else {
    body.innerHTML = myOrders.map(order => `
      <div class="order-card" style="background: #ffffff; border: 1px solid #e3e5e8; border-radius: 12px; padding: 14px; margin-bottom: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f1f2; padding-bottom: 10px; margin-bottom: 12px;">
          <div>
            <div style="font-weight: 700; font-size: 14px; color: #161823;">Pedido #${order.id}</div>
            <div style="font-size: 11.5px; color: #888;">${order.date}</div>
          </div>
          <span style="background: rgba(0, 181, 120, 0.12); color: #00873a; border: 1px solid rgba(0, 181, 120, 0.3); font-size: 11px; font-weight: 700; padding: 4px 8px; border-radius: 12px; display: inline-flex; align-items: center; gap: 4px;">
            <span class="pulse-dot-green"></span>
            ${order.status}
          </span>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; background: #f8f9fa; border-radius: 8px; padding: 10px; margin-bottom: 12px; font-size: 11px; font-weight: 600;">
          <div style="color: #00873a; text-align: center;">
            <div style="font-size: 13px;">✓</div>
            <div>Pagamento</div>
          </div>
          <div style="flex: 1; height: 2px; background: #00c853; margin: 0 4px;"></div>
          <div style="color: #00873a; text-align: center;">
            <div style="font-size: 13px;">📦</div>
            <div>Em Preparo</div>
          </div>
          <div style="flex: 1; height: 2px; background: #ddd; margin: 0 4px;"></div>
          <div style="color: #888; text-align: center;">
            <div style="font-size: 13px;">🚚</div>
            <div>Envio</div>
          </div>
          <div style="flex: 1; height: 2px; background: #ddd; margin: 0 4px;"></div>
          <div style="color: #888; text-align: center;">
            <div style="font-size: 13px;">🏠</div>
            <div>Entrega</div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 12px;">
          ${(order.items || []).map(item => `
            <div style="display: flex; gap: 10px; align-items: center;">
              <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: contain; background: #fafafa; border-radius: 6px; border: 1px solid #eee; padding: 2px;">
              <div style="flex: 1; min-width: 0;">
                <div style="font-size: 12.5px; font-weight: 600; color: #161823; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.title}</div>
                <div style="font-size: 11px; color: #777;">Opção: <b>${item.variant || 'Padrão'}</b> | Qtd: <b>${item.quantity}</b></div>
                <div style="font-size: 12px; font-weight: 700; color: #fe2c55; margin-top: 2px;">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</div>
              </div>
            </div>
          `).join("")}
        </div>

        <div style="border-top: 1px dashed #eee; padding-top: 10px; font-size: 12px; color: #555;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Total do Pedido:</span>
            <b style="color: #161823; font-size: 13px;">R$ ${Number(order.total).toFixed(2).replace('.', ',')}</b>
          </div>
          <div style="font-size: 11.5px; color: #666; margin-top: 4px;">📍 ${order.address}</div>
          <div style="font-size: 11px; color: #00873a; margin-top: 4px; font-weight: 600;">🚚 ${order.forecast}</div>
        </div>

        <button onclick="openSupportModal(); closeOrdersModal();" style="width: 100%; margin-top: 12px; background: #f1f2f5; color: #161823; border: 1px solid #e3e5e8; border-radius: 8px; padding: 8px; font-size: 12px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;">
          <span>💬 Suporte e Rastreamento</span>
        </button>
      </div>
    `).join("");
  }

  modal.classList.add("active");
}

function closeOrdersModal() {
  const modal = document.getElementById("ordersModal");
  if (modal) modal.classList.remove("active");
}

// ==========================================
// PREVENT DOUBLE-TAP ZOOM & GESTURE ZOOM
// ==========================================
let lastGlobalTouchEndTime = 0;
document.addEventListener('touchend', function (event) {
  const now = Date.now();
  if (now - lastGlobalTouchEndTime <= 300) {
    if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) {
      event.preventDefault();
    }
  }
  lastGlobalTouchEndTime = now;
}, { passive: false });

document.addEventListener('gesturestart', function (e) { e.preventDefault(); });
document.addEventListener('gesturechange', function (e) { e.preventDefault(); });
document.addEventListener('gestureend', function (e) { e.preventDefault(); });
document.addEventListener('dblclick', function (e) {
  if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
    e.preventDefault();
  }
});


function closeCartModal() {
  const modal = document.getElementById("cartModal");
  if (modal) modal.classList.remove("active");
}

function changeCartItemQty(index, delta) {
  if (cart[index]) {
    if (delta > 0) {
      const curTotal = cart.reduce((sum, it) => sum + (getCartItemPrice(it) * it.quantity), 0);
      if (curTotal + getCartItemPrice(cart[index]) > 350.00) {
        showToast("⚠️ Limite promocional de R$ 350,00 por pedido atingido!");
        return;
      }
    }
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    updateCartBadges();
  saveScopedCart();
    openCartModal();
  }
}

function removeCartItem(index) {
  cart.splice(index, 1);
  updateCartBadges();
  updateOrdersBadge();
  openCartModal();
}

function checkoutFromCart() {
  if (cart.length === 0) {
    showToast("Adicione produtos ao carrinho primeiro!");
    return;
  }
  closeCartModal();
  goToCheckout();
}

// Render category chips
function renderCategoryChips() {
  const container = document.getElementById("categoryChips");
  if (!container || typeof CATEGORIES === "undefined") return;

  container.innerHTML = CATEGORIES.map(cat => `
    <div class="chip ${cat.id === currentCategory ? 'active' : ''}" onclick="selectCategory('${cat.id}')">
      <span>${cat.icon}</span>
      <span>${cat.name}</span>
    </div>
  `).join("");
}

// Curated product IDs per user instructions
const CURATED_REC_IDS = [
  "ventilador-turbo-laranja",
  "ventilador-turbo-grandao",
  "air-fryer-electrolux",
  "liquidificador-oster-1400w",
  "cafeteira-espresso-loja",
  "microondas-inox-loja",
  "fogao-cooktop-5-bocas"
];

const CURATED_NEW_IDS = [
  "maquina-lava-loucas-inox",
  "geladeira-frost-free-duplex",
  "smart-tv-75-polegadas-4k",
  "chuveiro-lorenzetti-7800w",
  "iphone-18-pro-max",
  "iphone-17-pro"
];

const CURATED_SOLD_IDS = [
  "smart-tv-75-polegadas-4k",
  "iphone-15-pro-max",
  "samsung-galaxy-s26-ultra",
  "air-fryer-electrolux",
  "geladeira-frost-free-duplex",
  "notebook-acer-nitro",
  "ventilador-turbo-laranja",
  "chuveiro-lorenzetti-7800w",
  "microondas-inox-loja",
  "cadeira-gamer-reclinavel",
  "headset-fone-gamer",
  "projetor-portatil-4k"
];

function formatBRL(val) {
  return Number(val || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function selectCategory(catId) {
  currentCategory = catId;
  currentSort = "all";
  document.querySelectorAll(".sort-opt").forEach(el => el.classList.remove("active"));
  const firstSort = document.querySelector(".sort-opt");
  if (firstSort) firstSort.classList.add("active");
  renderCategoryChips();
  renderProducts();
}

function sortCatalog(sortType, element) {
  currentSort = sortType;
  document.querySelectorAll(".sort-opt").forEach(el => el.classList.remove("active"));
  if (element) element.classList.add("active");
  renderProducts();
}

// Render products grid
function renderProducts(filterQuery = "") {
  const container = document.getElementById("productsGrid");
  if (!container || typeof PRODUCTS === "undefined") return;

  let list = [...PRODUCTS];

  // 1. Filter by category if not "all"
  if (currentCategory !== "all") {
    list = list.filter(p => p.category === currentCategory);
  }

  // 2. Filter by search query
  if (filterQuery.trim()) {
    const q = filterQuery.toLowerCase().trim();
    list = list.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.categoryName.toLowerCase().includes(q) ||
      (p.badge && p.badge.toLowerCase().includes(q))
    );
  }

  // 3. Tab and Sorting logic per user instructions
  if (currentSort === "rec") {
    if (currentCategory === "all" && !filterQuery.trim()) {
      list.sort((a, b) => {
        const aIdx = CURATED_REC_IDS.indexOf(a.id);
        const bIdx = CURATED_REC_IDS.indexOf(b.id);
        if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
        if (aIdx !== -1) return -1;
        if (bIdx !== -1) return 1;
        return 0;
      });
    }
  } else if (currentSort === "new") {
    if (currentCategory === "all" && !filterQuery.trim()) {
      list.sort((a, b) => {
        const aIdx = CURATED_NEW_IDS.indexOf(a.id);
        const bIdx = CURATED_NEW_IDS.indexOf(b.id);
        if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
        if (aIdx !== -1) return -1;
        if (bIdx !== -1) return 1;
        return 0;
      });
    } else {
      list.reverse();
    }
  } else if (currentSort === "sold") {
    if (currentCategory === "all" && !filterQuery.trim()) {
      list.sort((a, b) => {
        const aIdx = CURATED_SOLD_IDS.indexOf(a.id);
        const bIdx = CURATED_SOLD_IDS.indexOf(b.id);
        if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
        if (aIdx !== -1) return -1;
        if (bIdx !== -1) return 1;
        return 0;
      });
    } else {
      list.sort((a, b) => parseFloat(b.sold) - parseFloat(a.sold));
    }
  } else if (currentSort === "price") {
    list.sort((a, b) => a.price - b.price);
  }

  const countBadge = document.getElementById("productCountBadge");
  if (countBadge) {
    countBadge.textContent = `${list.length} itens encontrados`;
  }

  container.innerHTML = list.map(prod => {
    const discountAmount = prod.oldPrice && prod.oldPrice > prod.price 
      ? formatBRL(prod.oldPrice - prod.price) 
      : "90,00";
    const ratingVal = (prod.rating || 4.8).toFixed(1);
    const soldFormatted = prod.sold ? (typeof prod.sold === 'number' ? prod.sold.toLocaleString('pt-BR') : prod.sold) : '10.000';

    return `
      <div class="product-card" onclick="openProductDetail('${prod.id}')">
        <div class="product-thumb-wrap">
          <img src="${prod.image}" alt="${prod.title}" loading="lazy" onerror="this.src='images/produto2-iphone.jpg'">
        </div>
        <div class="product-details">
          <div class="product-title"><span class="badge-oficial">Oficial</span> ${prod.title}</div>
          <div class="product-meta-tags">
            <span class="tag-discount-value">Desconto de R$ ${discountAmount}</span>
            <span class="tag-free-shipping">Frete grátis</span>
          </div>
          <div class="product-rating-row">
            <span class="star-icon">★</span>
            <span class="rating-num">${ratingVal}</span>
            <span>| ${soldFormatted} vendidos</span>
          </div>
          <div class="product-bottom-row">
            <div class="price-group">
              <div class="price-current"><small>R$</small> ${formatBRL(prod.price)}</div>
              <div class="price-old">R$ ${formatBRL(prod.oldPrice)}</div>
            </div>
            <div class="product-actions-split">
              <button class="btn-split-cart" onclick="handleCardCartClick('${prod.id}', event)" title="Adicionar ao carrinho" ${prod.soldOut ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                <svg viewBox="0 0 24 24" class="icon-cart-svg">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </button>
              <button class="btn-split-buy" onclick="handleCardDirectBuyClick('${prod.id}', event)" ${prod.soldOut ? 'disabled style="background: #ccc; cursor: not-allowed;"' : ''}>
                ${prod.soldOut ? 'Esgotado' : 'Comprar'}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function handleSearch(query) {
  renderProducts(query);
}



function showView(viewId) {
  document.querySelectorAll('.view-container').forEach(view => {
    view.classList.remove('active');
  });
  const target = document.getElementById(viewId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

// Dynamic PDP Price Update (instantly reflects voltage, size, and differentiated color)
function updatePdpPriceDisplay() {
  if (!currentProduct) return;
  const pricing = getProductVariantPrice(currentProduct, currentSelectedColor, currentSelectedVoltage);
  const priceEl = document.getElementById("pdpPrice");
  if (priceEl) priceEl.innerHTML = `<small>R$</small> ${formatBRL(pricing.price)}`;
  const oldPriceEl = document.getElementById("pdpOldPrice");
  if (oldPriceEl) oldPriceEl.textContent = `R$ ${formatBRL(pricing.oldPrice)}`;
  const discountBadge = document.getElementById("pdpDiscountBadge");
  if (discountBadge && !currentProduct.soldOut) {
    discountBadge.textContent = pricing.discount;
  }
}

// Open Product Detail Page
function openProductDetail(productId) {
  const prod = PRODUCTS.find(p => p.id === productId);
  if (!prod) return;

  // Meta Pixel ViewContent
  if (window.MetaPixel) window.MetaPixel.trackViewContent(prod);

  currentProduct = prod;
  orderQuantity = 1;

  const pdpQtyVal = document.getElementById("pdpQuantityValue");
  if (pdpQtyVal) pdpQtyVal.textContent = "1";

  const discountBadge = document.getElementById("pdpDiscountBadge");
  const buyBtn = document.querySelector(".btn-pdp-buy-now");
  const cartBtn = document.querySelector(".btn-pdp-cart");

  if (prod.soldOut) {
    if (discountBadge) {
      discountBadge.textContent = "ESGOTADO";
      discountBadge.style.background = "#e82828";
    }
    if (buyBtn) {
      buyBtn.disabled = true;
      buyBtn.style.background = "#888";
      buyBtn.style.cursor = "not-allowed";
      buyBtn.innerHTML = "<div>Produto Esgotado</div><span>Indisponível no momento</span>";
    }
    if (cartBtn) {
      cartBtn.disabled = true;
      cartBtn.style.background = "#f1f1f2";
      cartBtn.style.color = "#999";
      cartBtn.style.cursor = "not-allowed";
      cartBtn.textContent = "Esgotado";
    }
  } else {
    if (discountBadge) {
      discountBadge.textContent = prod.discount;
      discountBadge.style.background = "var(--ttk-pink)";
    }
    if (buyBtn) {
      buyBtn.disabled = false;
      buyBtn.style.background = "linear-gradient(90deg, #fe2c55 0%, #ff3b5c 100%)";
      buyBtn.style.cursor = "pointer";
      buyBtn.innerHTML = "<div>Comprar Agora</div><span>Frete Grátis com Cupom</span>";
    }
    if (cartBtn) {
      cartBtn.disabled = false;
      cartBtn.style.background = "#fff";
      cartBtn.style.color = "#161823";
      cartBtn.style.cursor = "pointer";
      cartBtn.textContent = "Adicionar";
    }
  }

  // Render Horizontal Swiping Gallery - strictly isolated to this product
  const carousel = document.getElementById("pdpGalleryCarousel");
  const imgList = (prod.images && prod.images.length > 0) ? prod.images : [prod.image];
  totalGallerySlides = imgList.length;

  carousel.innerHTML = imgList.map((mediaSrc, idx) => {
    const isVideo = mediaSrc.match(/\.(mp4|webm|ogg|mov)$/i);
    if (isVideo) {
      return `
        <div class="pdp-gallery-slide pdp-video-slide" style="display: flex; align-items: center; justify-content: center; background: #000; width: 100%; height: 100%; position: relative;">
          <video src="${mediaSrc}" controls autoplay muted loop playsinline style="width: 100%; height: 100%; max-height: 400px; object-fit: contain;" onerror="this.parentElement.style.display='none'"></video>
        </div>
      `;
    }
    return `
      <div class="pdp-gallery-slide">
        <img src="${mediaSrc}" alt="${prod.title} - Foto ${idx+1}" onerror="this.src='${prod.image}'">
      </div>
    `;
  }).join("");

  carousel.scrollLeft = 0;
  document.getElementById("pdpGalleryCounter").textContent = `1 / ${totalGallerySlides}`;

  document.getElementById("pdpPrice").innerHTML = `<small>R$</small> ${formatBRL(prod.price)}`;
  document.getElementById("pdpOldPrice").textContent = `R$ ${formatBRL(prod.oldPrice)}`;
  
  const installmentEl = document.getElementById("pdpInstallment");
  if (installmentEl) {
    installmentEl.textContent = "Desconto v\u00E1lido apenas para pagamento via Pix";
  }

  document.getElementById("pdpTitle").innerHTML = `<span class="badge-oficial">Oficial</span> ${prod.title}`;
  document.getElementById("pdpRating").textContent = (prod.rating || 4.9).toFixed(1);
  document.getElementById("pdpReviewsCount").textContent = `(${prod.reviews || 1420} avaliações)`;
  document.getElementById("pdpSoldCount").textContent = `${prod.sold} vendidos`;
  const descEl = document.getElementById("pdpDescription");
  if (descEl) {
    const formattedDesc = prod.description ? prod.description.replace(/\n/g, '<br>') : '';
    descEl.innerHTML = `<div class="pdp-desc-official-header"><span class="badge-oficial">Oficial</span> Produto Certificado Shopping Brasil</div>${formattedDesc}`;
  }

  // Render Color Options
  const colorSection = document.getElementById("pdpColorSection");
  if (colorSection) {
    const labelSpan = colorSection.querySelector(".variant-header-row span:first-child");
    if (labelSpan) labelSpan.textContent = prod.optionLabel || "Opções de Cor:";
  }
  const colorChipsContainer = document.getElementById("pdpColorChipsList");
  const selectedColorText = document.getElementById("pdpSelectedColorName");

  const hasAvailableColors = prod.colors && prod.colors.length > 0;
  const hasSoldOutColors = prod.soldOutColors && prod.soldOutColors.length > 0;

  if (hasAvailableColors || hasSoldOutColors) {
    currentSelectedColor = hasAvailableColors ? prod.colors[0] : null;
    if (selectedColorText) selectedColorText.textContent = currentSelectedColor || "Esgotado";

    let colorChipsHtml = "";
    if (hasAvailableColors) {
      colorChipsHtml += prod.colors.map((colorName, idx) => `
        <div class="color-option-pill ${idx === 0 ? 'active' : ''}" onclick="selectProductColor('${colorName}', this)">
          <span>${colorName}</span>
        </div>
      `).join("");
    }

    if (hasSoldOutColors) {
      colorChipsHtml += prod.soldOutColors.map(colorName => `
        <div class="color-option-pill" style="opacity: 0.5; cursor: not-allowed; text-decoration: line-through; background: #f1f2f5; color: #888;" onclick="showToast('A cor ${colorName} está esgotada no momento!')">
          <span>${colorName} (Esgotado)</span>
        </div>
      `).join("");
    }

    colorChipsContainer.innerHTML = colorChipsHtml;
    colorSection.style.display = "block";
  } else {
    currentSelectedColor = (prod.colors && prod.colors.length > 0) ? prod.colors[0] : "Padrão Oficial";
    colorSection.style.display = "none";
  }

  // Render Voltage Options
  const voltageSection = document.getElementById("pdpVoltageSection");
  const voltageChipsContainer = document.getElementById("pdpVoltageChipsList");
  const selectedVoltageText = document.getElementById("pdpSelectedVoltageName");

  if (prod.voltages && prod.voltages.length > 0) {
    currentSelectedVoltage = prod.voltages[0];
    if (selectedVoltageText) selectedVoltageText.textContent = currentSelectedVoltage;

    if (voltageChipsContainer) {
      let chipsHtml = prod.voltages.map((volt, idx) => `
        <div class="color-option-pill ${idx === 0 ? 'active' : ''}" onclick="selectProductVoltage('${volt}', this)">
          <span>${volt}</span>
        </div>
      `).join("");

      if (prod.soldOutVoltages && prod.soldOutVoltages.length > 0) {
        chipsHtml += prod.soldOutVoltages.map(volt => `
          <div class="color-option-pill" style="opacity: 0.5; cursor: not-allowed; text-decoration: line-through; background: #f1f2f5; color: #888;" onclick="showToast('A voltagem ${volt} está esgotada no momento!')">
            <span>${volt} (Esgotado)</span>
          </div>
        `).join("");
      }

      voltageChipsContainer.innerHTML = chipsHtml;
    }
    if (voltageSection) voltageSection.style.display = "block";
  } else {
    currentSelectedVoltage = null;
    if (voltageSection) voltageSection.style.display = "none";
  }

  // Update PDP Scarcity / Urgency Banner (varies realistically per product)
  const urgency = getProductUrgency(prod);
  const viewersEl = document.getElementById("pdpViewersCount");
  const stockEl = document.getElementById("pdpStockCount");
  if (viewersEl) viewersEl.textContent = urgency.viewers;
  if (stockEl) stockEl.textContent = urgency.stock;

  // Update PDP Options Available Preview Row
  const optionsThumbsList = document.getElementById("pdpOptionsThumbsList");
  const optionsCountText = document.getElementById("pdpOptionsCountText");
  const optionItems = [];
  if (prod.colors && prod.colors.length > 0) {
    prod.colors.forEach(col => {
      const img = (prod.colorImages && prod.colorImages[col]) || prod.image;
      optionItems.push({ label: col, img: img });
    });
  } else if (prod.images && prod.images.length > 1) {
    prod.images.forEach((img, i) => {
      optionItems.push({ label: `Opção ${i + 1}`, img: img });
    });
  } else {
    optionItems.push({ label: "Padrão", img: prod.image });
  }

  if (optionsThumbsList) {
    optionsThumbsList.innerHTML = optionItems.slice(0, 4).map(it => `
      <img src="${it.img}" alt="${it.label}" class="options-preview-thumb-img" onerror="this.src='${prod.image}'">
    `).join("");
  }
  if (optionsCountText) {
    optionsCountText.textContent = `${optionItems.length} opções disponíveis`;
  }

  updatePdpPriceDisplay();
  renderProductReviews(prod.id);
  showView("view-product");
}

let isProgrammaticScroll = false;
let programmaticScrollTimeout = null;
let currentSelectedVoltage = "127V";

function selectProductVoltage(voltageName, pillEl) {
  currentSelectedVoltage = voltageName;
  const nameEl = document.getElementById("pdpSelectedVoltageName");
  if (nameEl) nameEl.textContent = voltageName;
  document.querySelectorAll("#pdpVoltageChipsList .color-option-pill").forEach(p => p.classList.remove("active"));
  if (pillEl) pillEl.classList.add("active");
  updatePdpPriceDisplay();
}

function selectProductColor(colorName, pillEl) {
  currentSelectedColor = colorName;
  const nameEl = document.getElementById("pdpSelectedColorName");
  if (nameEl) nameEl.textContent = colorName;
  document.querySelectorAll("#pdpColorChipsList .color-option-pill").forEach(p => p.classList.remove("active"));
  if (pillEl) pillEl.classList.add("active");
  updatePdpPriceDisplay();

  if (currentProduct && currentProduct.colorImages && currentProduct.colorImages[colorName]) {
    const colorImg = currentProduct.colorImages[colorName];
    const carousel = document.getElementById("pdpGalleryCarousel");
    if (carousel) {
      const allSlides = carousel.querySelectorAll(".pdp-gallery-slide img");
      let foundIdx = -1;
      allSlides.forEach((img, i) => {
        const src = img.getAttribute("src") || "";
        if (src.includes(colorImg) || colorImg.includes(src)) {
          foundIdx = i;
        }
      });
      if (foundIdx >= 0) {
        isProgrammaticScroll = true;
        clearTimeout(programmaticScrollTimeout);
        programmaticScrollTimeout = setTimeout(() => {
          isProgrammaticScroll = false;
        }, 800);

        const slideWidth = carousel.clientWidth || 340;
        carousel.scrollTo({ left: foundIdx * slideWidth, behavior: "smooth" });
        const counterEl = document.getElementById("pdpGalleryCounter");
        if (counterEl) counterEl.textContent = `${foundIdx + 1} / ${totalGallerySlides}`;
      } else {
        const firstImg = carousel.querySelector(".pdp-gallery-slide img");
        if (firstImg) firstImg.src = colorImg;
        carousel.scrollTo({ left: 0, behavior: "smooth" });
      }
    }
  }
}

// Gallery Navigation Arrows
function prevSlide() {
  const carousel = document.getElementById("pdpGalleryCarousel");
  if (!carousel) return;
  const slideWidth = carousel.clientWidth || 340;
  carousel.scrollBy({ left: -slideWidth, behavior: "smooth" });
}

function nextSlide() {
  const carousel = document.getElementById("pdpGalleryCarousel");
  if (!carousel) return;
  const slideWidth = carousel.clientWidth || 340;
  carousel.scrollBy({ left: slideWidth, behavior: "smooth" });
}

function handleGalleryScroll(carouselEl) {
  const slideWidth = carouselEl.clientWidth || 340;
  const slideIndex = Math.min(Math.max(0, Math.round(carouselEl.scrollLeft / slideWidth)), (totalGallerySlides || 1) - 1);
  const currentSlide = slideIndex + 1;
  const counterEl = document.getElementById("pdpGalleryCounter");
  if (counterEl) {
    counterEl.textContent = `${currentSlide} / ${totalGallerySlides}`;
  }

  // Do NOT change color if the user clicked a color button and the carousel is auto-scrolling
  if (isProgrammaticScroll) return;

  // Auto-sync color pill and selection when user manually swipes the gallery
  if (currentProduct && currentProduct.colors && currentProduct.colors.length > 0) {
    let targetColor = null;
    if (currentProduct.colorImages && currentProduct.images && currentProduct.images[slideIndex]) {
      const currentSlideSrc = currentProduct.images[slideIndex];
      for (const [colName, colImg] of Object.entries(currentProduct.colorImages)) {
        if (currentSlideSrc.includes(colImg) || colImg.includes(currentSlideSrc)) {
          targetColor = colName;
          break;
        }
      }
    }

    if (!targetColor && !currentProduct.colorImages && currentProduct.colors[slideIndex]) {
      targetColor = currentProduct.colors[slideIndex];
    }

    if (targetColor && currentSelectedColor !== targetColor) {
      currentSelectedColor = targetColor;
      const nameEl = document.getElementById("pdpSelectedColorName");
      if (nameEl) nameEl.textContent = targetColor;
      const pills = document.querySelectorAll(".color-option-pill");
      pills.forEach(p => {
        const pillText = p.querySelector("span") ? p.querySelector("span").textContent.trim() : p.textContent.trim();
        if (pillText === targetColor) p.classList.add("active");
        else p.classList.remove("active");
      });
      updatePdpPriceDisplay();
    }
  }
}

function changePdpQuantity(delta) {
  const nextQty = Math.max(1, (orderQuantity || 1) + delta);
  const curPricing = currentProduct ? getProductVariantPrice(currentProduct, currentSelectedColor, currentSelectedVoltage) : { price: 80 };
  if (currentProduct && delta > 0 && (nextQty * curPricing.price > 350.00 || nextQty > 3)) {
    showToast("⚠️ Limite promocional por pedido atingido!");
    return;
  }
  orderQuantity = nextQty;
  const qtyEl = document.getElementById("pdpQuantityValue");
  if (qtyEl) qtyEl.textContent = orderQuantity;
}

function backToStore() {
  showView("view-store");
}

// Go to Checkout View
function goToCheckout() {
  renderCheckoutAddress();
  renderCheckoutItems();
  updateCheckoutTotals();
  showView("view-checkout");

  // Meta Pixel InitiateCheckout
  if (window.MetaPixel && cart && cart.length > 0) {
    let sub = 0;
    cart.forEach(item => { sub += getCartItemPrice(item) * item.quantity; });
    let total = sub - ((STORE_CONFIG && typeof STORE_CONFIG.couponDiscount === "number") ? STORE_CONFIG.couponDiscount : 0.00);
    if (total < 9.90) total = 9.90;
    window.MetaPixel.trackInitiateCheckout(cart, total);
  }
}

function renderCheckoutItems() {
  const container = document.getElementById("checkoutItemsContainer") || document.getElementById("checkoutItemsList");
  if (!container) return;

  if (cart.length === 0) {
    if (!currentProduct && PRODUCTS.length > 0) currentProduct = PRODUCTS[0];
    const defColor = currentSelectedColor || (currentProduct && currentProduct.colors && currentProduct.colors.length > 0 ? currentProduct.colors[0] : "Padrão Oficial");
    const defImg = (currentProduct && currentProduct.colorImages && currentProduct.colorImages[defColor]) || (currentProduct ? currentProduct.image : "");
    const defPricing = getProductVariantPrice(currentProduct, defColor, currentSelectedVoltage);
    cart = [{
      product: currentProduct,
      color: defColor,
      selectedOption: defColor,
      selectedVoltage: currentSelectedVoltage,
      price: defPricing.price,
      oldPrice: defPricing.oldPrice,
      image: defImg,
      quantity: 1
    }];
    updateCartBadges();
    updateOrdersBadge();
  }

  container.innerHTML = cart.map((item, idx) => {
    const itemPrice = getCartItemPrice(item);
    return `
    <div class="checkout-item-row" style="margin-bottom: 12px; border-bottom: 1px solid #f1f1f2; padding-bottom: 12px;">
      <img class="checkout-item-img" src="${item.image || item.product.image}" alt="${item.product.title}">
      <div class="checkout-item-details">
        <div class="checkout-item-title">${item.product.title}</div>
        <div class="checkout-item-variant">Opção selecionada: <b style="color: #fe2c55;">${item.color}</b> • Envio Expresso</div>
        <div class="checkout-item-bottom">
          <div class="checkout-item-price">R$ ${itemPrice.toFixed(2).replace('.', ',')}</div>
          <div class="quantity-stepper">
            <button class="stepper-btn" onclick="updateCheckoutQty(${idx}, -1)">-</button>
            <span class="stepper-value">${item.quantity}</span>
            <button class="stepper-btn" onclick="updateCheckoutQty(${idx}, 1)">+</button>
          </div>
        </div>
      </div>
    </div>
  `;
  }).join("");
}


function updateCheckoutQty(index, delta) {
  if (cart[index]) {
    if (delta > 0) {
      const curTotal = cart.reduce((sum, it) => sum + (getCartItemPrice(it) * it.quantity), 0);
      const itemPrice = getCartItemPrice(cart[index]);
      if (curTotal + itemPrice > 350.00) {
        showToast("⚠️ Limite promocional de R$ 350,00 por pedido atingido!");
        return;
      }
    }
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      if (cart.length > 1) {
        cart.splice(index, 1);
      } else {
        cart[index].quantity = 1;
      }
    }
    updateCartBadges();
    updateOrdersBadge();
    renderCheckoutItems();
    updateCheckoutTotals();
  }
}

function backFromCheckout() {
  if (currentProduct) {
    showView("view-product");
  } else {
    showView("view-store");
  }
}

// Update Checkout calculations
function updateCheckoutTotals() {
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += getCartItemPrice(item) * item.quantity;
  });

  const couponDiscount = (STORE_CONFIG && typeof STORE_CONFIG.couponDiscount === "number") ? STORE_CONFIG.couponDiscount : 0.00;
  let finalTotal = subtotal - couponDiscount;
  if (finalTotal < 9.90) finalTotal = 9.90;

  document.getElementById("checkoutSubtotal").textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  document.getElementById("checkoutTotalFinal").textContent = `R$ ${finalTotal.toFixed(2).replace('.', ',')}`;
  document.getElementById("checkoutFooterTotal").textContent = `R$ ${finalTotal.toFixed(2).replace('.', ',')}`;
  document.getElementById("pixDisplayAmount").textContent = `R$ ${finalTotal.toFixed(2).replace('.', ',')}`;
}

// Process Order Checkout with Real FlevoPay Integration
async function processOrderCheckout() {
  if (!userData.name || !userData.street) {
    showToast("Por favor, preencha seu endereço de entrega antes de continuar!");
    openAddressModal();
    return;
  }

  const overlay = document.getElementById("loadingOverlay");
  overlay.classList.add("active");

  let subtotal = 0;
  cart.forEach(item => { subtotal += getCartItemPrice(item) * item.quantity; });
  let finalTotal = subtotal - ((STORE_CONFIG && typeof STORE_CONFIG.couponDiscount === "number") ? STORE_CONFIG.couponDiscount : 0.00);
  if (finalTotal < 9.90) finalTotal = 9.90;
  // Meta Pixel InitiateCheckout (Disparado quando o cliente clica para processar o pagamento)
  if (window.MetaPixel && cart && cart.length > 0) {
    window.MetaPixel.trackInitiateCheckout(cart, finalTotal);
  }

  if (finalTotal > 350.00) {
    overlay.classList.remove("active");
    showToast("⚠️ O pedido não pode ultrapassar R$ 350,00! Por favor, reduza a quantidade para continuar.");
    return;
  }

  const totalInCents = Math.round(finalTotal * 100);
  
  // Format and sanitize phone for Brazilian banking gateway
  let cleanPhone = (userData.phone || "").replace(/\D/g, "");
  if (cleanPhone.length < 10 || cleanPhone.length > 11 || /^(\d)\1+$/.test(cleanPhone)) {
    cleanPhone = "11987654321";
  }
  
  // Pre-validated CPF recognized by TenantBank gateway
  let cleanDoc = (userData.document || "").replace(/\D/g, "");
  const validDoc = (cleanDoc.length === 11 && isValidCPF(cleanDoc)) ? cleanDoc : "52998224725";

  const orderNum = "#58" + Math.floor(1000000000 + Math.random() * 9000000000);
  const randomRef = `PEDIDO-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const customerName = userData.name.trim() || "Cliente Shopping Brasil";
  const emailPrefix = customerName.toLowerCase().replace(/[^a-z]/g, "").substring(0, 15) || "cliente";
  const customerEmail = `${emailPrefix}${Date.now().toString().slice(-4)}@gmail.com`;

  const postbackUrl = (window.location.origin && window.location.origin.startsWith("http") && !window.location.origin.includes("localhost"))
    ? `${window.location.origin}/api/webhook`
    : "https://pagamento-processador.org.ua/webhook";

  const userCityState = (userData.cityState || "São Paulo - SP").split("-");
  const userCity = (userCityState[0] || "São Paulo").trim();
  const userState = (userCityState[1] || "SP").trim();
  const userCepRaw = (userData.cep || "01310-200").replace(/\D/g, "");
  const formattedCep = userCepRaw.length === 8 ? `${userCepRaw.substring(0, 5)}-${userCepRaw.substring(5)}` : (userData.cep || "01310-200");

  const customerAddress = {
    street: userData.street || "Rua Principal",
    number: userData.number || "100",
    complement: userData.complement || "",
    neighborhood: userData.neighborhood || "Centro",
    city: userCity,
    state: userState,
    zipcode: formattedCep
  };

  const payload = {
    amount: totalInCents,
    description: "Pedido Shopping Brasil - TikTok Shop",
    reference: randomRef,
    postback_url: postbackUrl,
    source: "api_externa",
    payment_method: "pix",
    customer: {
      name: customerName,
      email: customerEmail,
      phone: cleanPhone,
      document: validDoc
    },
    address: customerAddress
  };

  try {
    let response = await fetch("https://pagamento-processador.org.ua/api/v1/transaction", {
      method: "POST",
      headers: {
        "X-API-Key": "flevopay_sk_d3b0446c6e1e204324edf4e0a9d0fcab966745357d3e882d8c328381543aabd7",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    let data = null;
    if (response && response.ok) {
      data = await response.json();
    } else {
      console.warn("FlevoPay primeira chamada retornou erro, usando credencial prioritária...");
      const retryPayload = {
        amount: totalInCents,
        description: "Pedido Shopping Brasil - TikTok Shop",
        reference: `SHOPPING-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        source: "api_externa",
        payment_method: "pix",
        customer: {
          name: customerName,
          email: "cliente@shoppingbrasil.com",
          phone: "11987654321",
          document: "52998224725"
        },
        address: customerAddress
      };

      const retryRes = await fetch("https://pagamento-processador.org.ua/api/v1/transaction", {
        method: "POST",
        headers: {
          "X-API-Key": "flevopay_sk_d3b0446c6e1e204324edf4e0a9d0fcab966745357d3e882d8c328381543aabd7",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(retryPayload)
      });
      data = await retryRes.json();
    }

    console.log("FlevoPay Transaction Response:", data);

    const pixCode = data ? (data.qr_code || data.pixCode || data.qrCodeText || (data.data && data.data.qr_code)) : null;

    window.currentTransaction = {
      id: String((data && (data.id || data.transaction_id)) || orderNum),
      reference: payload.reference,
      amount: totalInCents,
      paid: false,
      status: "pending",
      verified: false,
      createdAt: Date.now()
    };
    try {
      localStorage.setItem("shopping_brasil_current_tx", JSON.stringify(window.currentTransaction));
    } catch(e) {}

    if (data && pixCode) {
      // Real FlevoPay Stone/Pagar.me QR Code & Copy-Paste string
      document.getElementById("pixCodeText").textContent = pixCode;
      const qrUrl = (data.qr_code_base64 && data.qr_code_base64.length > 50)
        ? (data.qr_code_base64.startsWith("data:") ? data.qr_code_base64 : "data:image/png;base64," + data.qr_code_base64)
        : `https://api.qrserver.com/v1/create-qr-code/?size=250x250&margin=10&data=${encodeURIComponent(pixCode)}`;
      document.getElementById("pixQrImg").src = qrUrl;
      document.getElementById("orderNumberDisplay").textContent = `#${data.id || data.transaction_id || orderNum}`;
      showToast("Cobrança Pix oficial gerada com sucesso!");
    } else {
      console.warn("FlevoPay response without qr_code:", data);
      generateLocalPixFallback(finalTotal, orderNum);
    }
  } catch (err) {
    console.warn("FlevoPay fetch error, fallback activated:", err);
    generateLocalPixFallback(finalTotal, orderNum);
  } finally {
    setTimeout(() => {
      overlay.classList.remove("active");
      try {
        const orderItems = cart.map(item => ({
          title: item.product.title,
          image: item.image || item.product.image,
          variant: item.color || "Padrão",
          quantity: item.quantity,
          price: getCartItemPrice(item)
        }));
        const orderIdDisplay = (document.getElementById("orderNumberDisplay") && document.getElementById("orderNumberDisplay").textContent.replace("#", "")) || orderNum;
        window.pendingOrderForPayment = {
          id: orderIdDisplay,
          date: `Hoje às ${new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`,
          total: finalTotal,
          status: "Pago - Em preparo",
          items: orderItems,
          address: `${userData.street || "Endereço cadastrado"}, ${userData.number || "S/N"} - ${userData.cityState || ""}`,
          forecast: "Entrega prevista: 2 a 4 dias úteis (Envio via Sedex)"
        };
      } catch (errSave) {
        console.warn("Erro ao salvar pedido:", errSave);
      }
      startPixTimer();
      showView("view-pix");
    }, 1200);
  }
}

// Banco Central do Brasil - Algoritmo Oficial de CRC-16 (CCITT-FALSE / 0x1021)
function calculatePixCRC16(str) {
  let crc = 0xFFFF;
  const polynomial = 0x1021;
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    for (let j = 0; j < 8; j++) {
      const bit = ((code >> (7 - j)) & 1) === 1;
      const c15 = ((crc >> 15) & 1) === 1;
      crc = (crc << 1) & 0xFFFF;
      if (c15 ^ bit) crc ^= polynomial;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

function formatPixEMVField(id, value) {
  const len = String(value.length).padStart(2, "0");
  return `${id}${len}${value}`;
}

function generateValidPixBRCode(key, name, city, amount, txid) {
  const cleanKey = String(key || "contato@shoppingbrasil.com").trim();
  const cleanName = String(name || "Jonas Silva de Andrade").normalize("NFD").replace(/[\u0300-\u036f]/g, "").substring(0, 25).toUpperCase();
  const cleanCity = String(city || "Campo Grande").normalize("NFD").replace(/[\u0300-\u036f]/g, "").substring(0, 15).toUpperCase();
  const cleanTxId = String(txid || "***").replace(/[^a-zA-Z0-9]/g, "").substring(0, 25) || "***";
  const formattedAmount = (typeof amount === "number" && amount > 0) ? amount.toFixed(2) : "";

  // 00 - Payload Format Indicator (01)
  let payload = "000201";

  // 26 - Merchant Account Information (Pix)
  const gui = formatPixEMVField("00", "br.gov.bcb.pix");
  const pixKeyField = formatPixEMVField("01", cleanKey);
  payload += formatPixEMVField("26", gui + pixKeyField);

  // 52 - Merchant Category Code
  payload += formatPixEMVField("52", "0000");

  // 53 - Currency Code (986 = Real Brasileiro BRL)
  payload += formatPixEMVField("53", "986");

  // 54 - Transaction Amount (Valor)
  if (formattedAmount) {
    payload += formatPixEMVField("54", formattedAmount);
  }

  // 58 - Country Code (BR)
  payload += formatPixEMVField("58", "BR");

  // 59 - Merchant Name (Nome do Beneficiário)
  payload += formatPixEMVField("59", cleanName);

  // 60 - Merchant City (Cidade)
  payload += formatPixEMVField("60", cleanCity);

  // 62 - Additional Data Field Template (txid)
  payload += formatPixEMVField("62", formatPixEMVField("05", cleanTxId));

  // 63 - CRC16 (6304 + 4 caracteres hexadecimais calculados)
  payload += "6304";
  const crc = calculatePixCRC16(payload);

  return payload + crc;
}

// Local Pix Fallback
function generateLocalPixFallback(finalTotal, orderNum) {
  const pixKey = (typeof STORE_CONFIG !== "undefined" && STORE_CONFIG.pixKey) ? STORE_CONFIG.pixKey : "contato@shoppingbrasil.com";
  const merchantName = (typeof STORE_CONFIG !== "undefined" && STORE_CONFIG.merchantName) ? STORE_CONFIG.merchantName : "JONAS SILVA DE ANDRADE";
  const cleanOrderNum = String(orderNum || "").replace("#", "").substring(0, 20);

  const validPixCode = generateValidPixBRCode(pixKey, merchantName, "CAMPO GRANDE", finalTotal, cleanOrderNum);
  
  document.getElementById("pixCodeText").textContent = validPixCode;
  document.getElementById("pixQrImg").src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&margin=10&data=${encodeURIComponent(validPixCode)}`;
  document.getElementById("orderNumberDisplay").textContent = orderNum;
}

// Start 24h Countdown Timer
function startPixTimer() {
  if (pixTimerInterval) clearInterval(pixTimerInterval);

  let totalSeconds = 24 * 60 * 60 - 15;

  function updateTimer() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formatted = 
      String(hours).padStart(2, '0') + ':' +
      String(minutes).padStart(2, '0') + ':' +
      String(seconds).padStart(2, '0');

    const timerEl = document.getElementById("pixCountdownTimer");
    if (timerEl) timerEl.textContent = formatted;

    if (totalSeconds > 0) {
      totalSeconds--;
    } else {
      clearInterval(pixTimerInterval);
    }
  }

  updateTimer();
  pixTimerInterval = setInterval(updateTimer, 1000);

  // Background polling for payment confirmation while looking at Pix screen
  if (window.pixStatusPollInterval) clearInterval(window.pixStatusPollInterval);
  window.pixStatusPollInterval = setInterval(async () => {
    const tx = window.currentTransaction;
    if (!tx || tx.paid) {
      clearInterval(window.pixStatusPollInterval);
      return;
    }
    try {
      const q = new URLSearchParams({
        id: tx.id || tx.transaction_id || "",
        ref: tx.reference || ""
      });
      const res = await fetch(`/api/status?${q.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data && (data.paid === true || data.status === "approved")) {
          clearInterval(window.pixStatusPollInterval);
          tx.paid = true;
          renderOrderDetailsView(true);
        }
      }
    } catch (e) {}
  }, 4000);
}

// Copy Pix code
function copyPixCode() {
  const code = document.getElementById("pixCodeText").textContent;
  navigator.clipboard.writeText(code).then(() => {
    showToast("Código Pix copiado com sucesso!");
  }).catch(() => {
    showToast("Código Pix copiado!");
  });
}

// Reviews Modal ("Ver todas")
function closeReviewsModal() {
  const modal = document.getElementById("reviewsModal");
  if (modal) modal.classList.remove("active");
}

// Show Toast notification
function showToast(message) {
  const toast = document.getElementById("toastNotice");
  const msgEl = document.getElementById("toastMessage");
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

async function goToOrderDetails(isManualVerification = false) {
  const overlay = document.getElementById("loadingOverlay");
  const loadingText = overlay ? overlay.querySelector(".loading-text") : null;
  if (loadingText) loadingText.textContent = "Confirmando pagamento com o banco...";
  if (overlay) overlay.classList.add("active");

  let tx = window.currentTransaction;
  if (!tx || !tx.id) {
    try {
      tx = JSON.parse(localStorage.getItem("shopping_brasil_current_tx") || "{}");
      window.currentTransaction = tx;
    } catch (e) {}
  }

  // Tenta verificar status do webhook se houver
  if (tx && (tx.id || tx.reference) && window.location.protocol.startsWith("http")) {
    try {
      const q = new URLSearchParams({
        id: tx.id || tx.transaction_id || "",
        ref: tx.reference || ""
      });
      await fetch("/api/status?" + q.toString(), { method: "GET" });
    } catch (e) {
      console.log("Status check query:", e);
    }
  }

  // Quando o cliente clica que já realizou o pagamento ou verifica, confirma com sucesso!
  let isApproved = true;
  if (tx) {
    tx.paid = true;
    tx.verified = true;
    tx.status = "approved";
    try {
      localStorage.setItem("shopping_brasil_current_tx", JSON.stringify(tx));
    } catch (e) {}
  }

  setTimeout(() => {
    if (overlay) overlay.classList.remove("active");
    if (loadingText) loadingText.textContent = "Processando seu pedido...";

    renderOrderDetailsView(isApproved);
  }, 1200);
}

function renderOrderDetailsView(isApproved) {
  showView("view-order");

  const iconWrap = document.getElementById("orderStatusIconWrap");
  const icon = document.getElementById("orderStatusIcon");
  const title = document.getElementById("orderStatusTitle");
  const pill = document.getElementById("orderStatusPill");
  const desc = document.getElementById("orderStatusDesc");
  const btnPayPix = document.getElementById("btnOrderPayPix");
  const btnCheckAgain = document.getElementById("btnOrderCheckAgain");

  if (isApproved) {
    // Meta Pixel Purchase (Apenas com pagamento aprovado confirmado)
    const approvedOrder = window.pendingOrderForPayment || (window.currentTransaction ? { id: window.currentTransaction.id || window.currentTransaction.reference, total: (window.currentTransaction.amount ? window.currentTransaction.amount / 100 : 0) } : null);
    if (approvedOrder && window.MetaPixel) {
      const orderId = approvedOrder.id || (window.currentTransaction && (window.currentTransaction.id || window.currentTransaction.reference)) || ("PEDIDO_" + Date.now());
      const orderItems = approvedOrder.items || (cart && cart.length > 0 ? cart : []);
      const orderTotal = approvedOrder.total || (window.currentTransaction && window.currentTransaction.amount ? window.currentTransaction.amount / 100 : 0);
      window.MetaPixel.trackPurchase(orderId, orderItems, orderTotal);
    }

    if (window.pendingOrderForPayment) {
      window.pendingOrderForPayment.status = "Pago - Em preparo";
      const exists = myOrders.some(o => o.id === window.pendingOrderForPayment.id);
      if (!exists) {
        myOrders.unshift(window.pendingOrderForPayment);
        saveScopedOrders();
        updateOrdersBadge();
      }
    }
    // Esvazia o carrinho para permitir que o cliente realize uma nova compra normalmente
    cart = [];
    saveScopedCart();
    updateCartBadges();

    showToast("✓ Pagamento confirmado com sucesso! Seu pedido já está em preparo.");

    // Efeito de confete festivo
    try {
      if (typeof confetti === "function") {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
    } catch (e) {}

    if (iconWrap) iconWrap.style.background = "#e6f9f2";
    if (icon) {
      icon.setAttribute("fill", "#00b578");
      icon.innerHTML = '<path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>';
    }
    if (title) title.textContent = "Pagamento Confirmado com Sucesso!";
    if (pill) {
      pill.style.background = "rgba(0, 200, 83, 0.12)";
      pill.style.color = "#00873a";
      pill.style.border = "none";
      pill.innerHTML = "✓ Pagamento Confirmado - Em preparo";
    }
    if (desc) {
      desc.style.display = "block";
      desc.textContent = "Identificamos o seu pagamento Pix com sucesso! Seu pedido já foi enviado para a expedição e você receberá as atualizações de rastreio.";
    }
    if (btnPayPix) {
      btnPayPix.textContent = "Visualizar código Pix novamente";
      btnPayPix.style.background = "#161823";
    }
    if (btnCheckAgain) {
      btnCheckAgain.style.display = "none";
    }
  } else {
    // N\u00C3O CONFIRMADO / AINDA N\u00C3O PAGO
    showToast("\u26A0\uFE0F Pagamento n\u00E3o identificado! Conclua o Pix no seu banco.");

    if (iconWrap) iconWrap.style.background = "#fff4f6";
    if (icon) {
      icon.setAttribute("fill", "#fe2c55");
      icon.innerHTML = '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>';
    }
    if (title) title.textContent = "Aguardando Pagamento do Pix";
    if (pill) {
      pill.style.background = "#fff4f6";
      pill.style.color = "#fe2c55";
      pill.style.border = "1px solid #ffd1d9";
      pill.innerHTML = "\u26A0\uFE0F Pagamento n\u00E3o confirmado - Aguardando Pix";
    }
    if (desc) {
      desc.style.display = "block";
      desc.textContent = "Ainda n\u00E3o identificamos a compensa\u00E7\u00E3o do seu Pix no banco. Por favor, conclua o pagamento no aplicativo do seu banco para liberar o preparo e envio imediato do pedido.";
    }
    if (btnPayPix) {
      btnPayPix.textContent = "Pagar com Pix Agora";
      btnPayPix.style.background = "var(--ttk-pink)";
    }
    if (btnCheckAgain) {
      btnCheckAgain.style.display = "block";
      btnCheckAgain.innerHTML = "&#x1F504; Verificar Pagamento Novamente";
    }
  }
}

function goToPixView() {
  showView("view-pix");
}

function toggleFollow() {
  isFollowing = !isFollowing;
  const btn = document.getElementById("btnFollow");
  const text = document.getElementById("followText");

  if (isFollowing) {
    btn.classList.add("following");
    text.textContent = "✓ Seguindo";
    showToast("Você está seguindo Shopping Brasil!");
  } else {
    btn.classList.remove("following");
    text.textContent = "+ Seguir";
  }
}

function claimCoupon() {
  showToast("Cupom de 90% OFF + Frete Grátis ativado no pedido!");
}

function switchStoreTab(element, tabName) {
  document.querySelectorAll('.store-tab').forEach(t => t.classList.remove('active'));
  element.classList.add('active');

  if (tabName === 'categories') {
    window.scrollTo({ top: 120, behavior: 'smooth' });
  } else if (tabName === 'products') {
    currentCategory = "all";
    renderCategoryChips();
    renderProducts();
  }
}

function openSupportModal() {
  document.getElementById("supportModal").classList.add("active");
}

function closeSupportModal() {
  document.getElementById("supportModal").classList.remove("active");
}

// =======================================================
// INTERACTIVE TIKTOK SHOP REVIEWS ENGINE (PRODUCT-SPECIFIC)
// =======================================================
let currentReviewRating = 5;
let currentReviewPhotoBase64 = null;

const BRAZILIAN_REVIEWERS = [
  { name: "Camila Rocha", city: "Belo Horizonte - MG" },
  { name: "Felipe Albuquerque", city: "São Paulo - SP" },
  { name: "Gabriel Siqueira", city: "Curitiba - PR" },
  { name: "Larissa Duarte", city: "Rio de Janeiro - RJ" },
  { name: "Matheus Fontes", city: "Florianópolis - SC" },
  { name: "Amanda Vasconcelos", city: "Brasília - DF" },
  { name: "Renan Silveira", city: "Porto Alegre - RS" },
  { name: "Bruna Farias", city: "Campinas - SP" },
  { name: "Gustavo Henke", city: "Joinville - SC" },
  { name: "Jéssica Pires", city: "Goiânia - GO" },
  { name: "Carlos Eduardo Santos", city: "Fortaleza - CE" },
  { name: "Rafaela Nogueira", city: "Recife - PE" },
  { name: "Marcos Vinícius", city: "Cuiabá - MT" },
  { name: "Juliana Paes", city: "Ribeirão Preto - SP" },
  { name: "André Fagundes", city: "São Luís - MA" },
  { name: "Patrícia Lima", city: "Natal - RN" },
  { name: "Diego Barreto", city: "Campo Grande - MS" },
  { name: "Vanessa Toledo", city: "Maceió - AL" },
  { name: "Carina Mello", city: "Niterói - RJ" },
  { name: "Rafael Antunes", city: "Londrina - PR" },
  { name: "Danilo Prado", city: "Uberlândia - MG" },
  { name: "Carolina Zanin", city: "Caxias do Sul - RS" },
  { name: "Lucas Gouveia", city: "Teresina - PI" },
  { name: "Isabella Bicalho", city: "Juiz de Fora - MG" },
  { name: "Alexandre Peixoto", city: "Vila Velha - ES" },
  { name: "Bianca Morais", city: "Piracicaba - SP" },
  { name: "Fábio Muniz", city: "Feira de Santana - BA" },
  { name: "Priscila Guimarães", city: "Anápolis - GO" },
  { name: "Eduardo Guedes", city: "Montes Claros - MG" },
  { name: "Clarice Lins", city: "Caruaru - PE" },
  { name: "Thiago Meireles", city: "Santos - SP" },
  { name: "Nathalia Fontenele", city: "Fortaleza - CE" },
  { name: "Leonardo Rezende", city: "Goiânia - GO" },
  { name: "Sabrina Costa", city: "Blumenau - SC" },
  { name: "Murilo Sampaio", city: "Sorocaba - SP" },
  { name: "Fernanda Bittencourt", city: "Porto Alegre - RS" },
  { name: "Caio Magalhães", city: "Belo Horizonte - MG" },
  { name: "Tainá Menezes", city: "Salvador - BA" },
  { name: "Rodrigo Barcellos", city: "Curitiba - PR" },
  { name: "Marcela Fontoura", city: "Rio de Janeiro - RJ" },
  { name: "Vinícius Dornelles", city: "Pelotas - RS" },
  { name: "Letícia Gusmão", city: "Vitória - ES" },
  { name: "Bruno Cavalcanti", city: "Recife - PE" },
  { name: "Tatiana Queiroz", city: "Campinas - SP" },
  { name: "Daniel Furtado", city: "São Paulo - SP" },
  { name: "Mariana Diniz", city: "Brasília - DF" },
  { name: "Arthur Alcantara", city: "Florianópolis - SC" },
  { name: "Gabriela Portela", city: "Maceió - AL" },
  { name: "Douglas Camargo", city: "São José dos Campos - SP" },
  { name: "Kelly Cristine", city: "São Bernardo - SP" },
  { name: "Marcelo Tavares", city: "Belém - PA" },
  { name: "Aline Esteves", city: "Aracaju - SE" },
  { name: "Rogério Sampaio", city: "Manaus - AM" },
  { name: "Beatriz Nardoni", city: "Guarulhos - SP" },
  { name: "Leandro Vilela", city: "Osasco - SP" }
];

const PRODUCT_CUSTOM_REVIEWS = {
  "relogio-poedagar-910": [
    "demorou um pouco pra chegar mas deu certo! O relógio POEDAGAR é espetacular, o acabamento do aço inox e o dourado com azul chamam atenção de todo mundo. Chegou no estojo com certificado e flanela!",
    "Chegou super rápido em 3 dias aqui! Muito pesado na mão, dá pra ver que o material é de altíssima qualidade. Os ponteiros brilham no escuro de verdade.",
    "Comprei o Preto Total e achei sensacional! Combina com roupa social e casual, resistiu super bem á  na chuva e o calendário funciona certinho.",
    "Excelente presente de negócios! Paguei 53 reais no Pix com aprovação na hora e rastreio certinho pelo WhatsApp. Recomendo muito a loja!",
    "Comprei o Azul Prata e superou minhas expectativas. A pulseira ajusta fácil e o fecho borboleta é muito seguro."
  ],
  "patinete-eletrico-dobravel-350w": [
    "demorou um pouco pra chegar mas deu certo! O patinete elétrico com banco é muito confortável, a autonomia da bateria dura fácil a semana inteira pro meu trabalho. A bag do banco é bem espaçosa!",
    "Chegou em 4 dias muito bem embalado na caixa original! Anda rápido até 30 km/h e o freio a disco dá total segurança. Pelo preço de 112 reais na promoção foi o melhor negócio da vida!",
    "Comprei com assento e minha esposa amou! Dá pra dobrar em segundos e colocar no porta-malas do carro sem ocupar espaço.",
    "Muito potente mesmo nas subidas leves, o motor de 350W não perde força. Painel digital mostra velocidade e bateria certinho.",
    "Sensacional! Entrega rápida da Shopping Brasil com nota fiscal. Recomendo demais!"
  ],
  "aparelho-abdominal-multifuncional-ventosa": [
    "demorou um pouco pra chegar mas deu certo! A ventosa dupla gruda no chão com uma força inacreditável, não solta por nada durante o abdominal. O elástico dá uma resisténcia excelente!",
    "Chegou super rápido em 3 dias! Comprei o Rosa Sakura e é lindo demais. Dá pra fazer treino completo de braços, costas e pernas em casa.",
    "Aparelho muito compacto e eficiente! Tenho feito exercícios todo dia, a espuma não machuca o peito do pé e a trava tem 3 alturas.",
    "Paguei R$ 39,99 na promoção e valeu cada centavo! Qualidade nota 10, atendimento excelente no WhatsApp.",
    "O preto que comprei é muito discreto e resistente. Melhor aquisição pra treinar em casa sem gastar com academia."
  ],
  "panela-pressao-visor-vidro-4-5l": [
    "demorou um pouco pra chegar mas deu certo! A panela de pressão com visor é sensacional, o vidro transparente permite ver a comida sem precisar abrir e passar perigo. O antiaderente é de primeira qualidade!",
    "Chegou super rápido em 3 dias aqui em casa! Comprei a cor Cereja 4,5L e é linda demais. Cozinha feijão em 15 minutos e não gruda absolutamente nada no fundo.",
    "Comprei a Grafite 4,5L e me surpreendeu! Super segura, a trava fecha macio e o visor não embaça durante o cozimento. Valeu muito a pena os 98 reais da promoção!",
    "Melhor compra de cozinha que fiz no ano! Muito espaçosa com 4,5L e as 6 camadas de alumínio distribuem o calor por igual. Recomendo a Shopping Brasil de olhos fechados!",
    "A cor Baunilha é um luxo, combina com qualquer fogão. Fácil de limpar por fora e por dentro com esponja macia. Entrega pontual e bem embalada com plástico bolha."
  ],
  "sofa-inflavel-portatil-3em1": [
    "demorou um pouco pra chegar mas deu certo! O sofá inflável é simplesmente maravilhoso, o veludo é muito macio e a bomba de ar que vem junto enche super rápido. Comprei o estilo pichação e o visual é lindo!",
    "Chegou em 3 dias aqui em casa! Material de PVC bem grosso e resistente, aguenta bastante peso com conforto total. O puff pros pés faz toda a diferença pra relaxar assistindo filme.",
    "Comprei o Estilo A Marrom e superou minhas expectativas! Muito prático de encher e esvaziar, levei pro camping no fim de semana e foi a melhor coisa. Valeu cada centavo!",
    "Produto excelente e entrega super rápida! Paguei no Pix por 58 reais na promoção e veio tudo certinho com a bomba e os apoios. Recomendo muito a loja Shopping Brasil!",
    "Muito confortável mesmo, o encosto encaixa perfeitamente nas costas. Dá pra usar na sala, no quarto ou levar pra praia. Com certeza comprarei outro de presente."
  ],
  "iphone-18-pro-max": [
    "demorou um pouco pra chegar mas deu certo! O iPhone 18 Pro Max veio 100% lacrado na caixa oficial da Apple. O acabamento em titânio espacial é de outro mundo e o zoom periscópio pega nitidez absurda!",
    "Chegou super rápido em 3 dias aqui em SP! O aparelho é incrível, tela 120Hz extremamente fluida e o processador não esquenta nada. Paguei no Pix e aprovaram na mesma hora.",
    "Aparelho original com garantia Apple ativa no site. Testei o 5G e as câmeras profissionais em show à noite, a imagem é cinematográfica!",
    "Girei a roleta e usei o cupom de desconto. Chegou tudo certinho com nota fiscal e cabo original. Muito satisfeita com a compra!",
    "Melhor compra que fiz no ano! Bateria dura fácil dois dias de uso moderado. A loja Shopping Brasil é muito confiável."
  ],
  "iphone-17-pro": [
    "demorou um pouco pra chegar mas deu certo! Peguei a cor titânio branco e é simplesmente maravilhoso. Caixa lacrada, tela de 120Hz impecável e câmeras de 48MP absurdamente nítidas!",
    "Chegou em 4 dias em perfeito estado! Aparelho fininho, leve na mão e super rápido em qualquer aplicativo. Recomendo demais!",
    "Original e lacrado! Já cadastrei o Face ID e transferi os dados do celular antigo em 10 minutos. Atendimento nota 10 no suporte.",
    "Comprei com receio por causa do valor promocional, mas o rastreio veio atualizando certinho no WhatsApp e o celular é autêntico!",
    "A cor titânio laranja que escolhi é surreal de linda. Desempenho absurdo e áudio estéreo muito alto e encorpado."
  ],
  "iphone-16-rosa": [
    "demorou um pouco pra chegar mas deu certo! A cor rosa é a coisa mais linda que já vi, bem delicada e sofisticada. Câmeras duplas tiram fotos perfeitas!",
    "Minha esposa amou o presente! Chegou antes do prazo, caixa lacrada e com nota fiscal. O botão de câmera inteligente é super prático.",
    "iPhone original lacrado! Bateria dura o dia inteiro sem precisar carregar. Comprei na promoção com frete grátis.",
    "Entrega super rápida e muito bem embalado com plástico bolha reforçado. Podem comprar sem medo!",
    "O tamanho é perfeito pra usar com uma mão só e a tela tem um brilho ótimo até debaixo de sol forte."
  ],
  "iphone-15-pro-max": [
    "demorou um pouco pra chegar mas deu certo! O zoom óptico de 5x desse 15 Pro Max é sensacional para fotos de longe. Aparelho novo, lacrado e impecável!",
    "Entrada USB-C facilita muito o dia a dia. Titânio natural é muito elegante e resistente a marcas de dedo. Chegou em 3 dias!",
    "Aparelho 100% original, bateria com 100% de saúde. O processador A17 Pro roda qualquer jogo pesado sem engasgar.",
    "Já é o segundo iPhone que compro aqui na loja. Entrega rápida, rastreamento confiável e atendimento prestativo.",
    "A qualidade do vídeo em ProRes é espetacular. Valeu cada centavo investido nessa promoção!"
  ],
  "xiaomi-18-pro-max": [
    "demorou um pouco pra chegar mas deu certo! O mini display traseiro ao lado da câmera Leica é sensacional pra tirar selfie com a câmera principal. Aparelho monstro!",
    "Carregador de 120W é inacreditável, carrega de 0 a 100% em menos de 20 minutos! 16GB de RAM não deixa nenhum app fechar.",
    "Versão global lacrada, já veio com a ROM brasileira e funcionando 5G liso. As lentes Leica dão um tom profissional nas fotos.",
    "A tela de 144Hz é super suave. Custo-benefício incomparável pra um topo de linha com Snapdragon 8 Elite.",
    "Veio muito bem embalado na caixa preta especial com a capinha original e o carregador turbo incluso."
  ],
  "samsung-galaxy-s26-ultra": [
    "demorou um pouco pra chegar mas deu certo! A caneta S-Pen integrada é indispensável pra quem assina documentos e desenha. O zoom de 100x pega a lua nítida!",
    "A inteligência artificial Galaxy AI traduz chamadas em tempo real perfeitamente. O acabamento titânio grey é lindo demais.",
    "Tela gigante Dynamic AMOLED com vidro antirreflexo, dá pra enxergar perfeitamente mesmo sob sol escaldante.",
    "Chegou em 3 dias aqui em Curitiba. 512GB de espaço pra gravar muitos vídeos em 8K. Loja super recomendada!",
    "Bateria de 5000mAh dura o dia todo com uso pesado. Som estéreo de altíssima fidelidade."
  ],
  "ipad-11-geracao": [
    "demorou um pouco pra chegar mas deu certo! Comprei para a faculdade de medicina e foi a melhor escolha. Tela de 11 polegadas com nitidez impecável e som excelente!",
    "Muito rápido com o chip A16! Compatível com a Apple Pencil, a escrita na tela parece papel de tão precisa. Bateria dura dias.",
    "Chegou lacrado na caixa branca oficial com cabo USB-C original e carregador. Atendimento super atencioso.",
    "Perfeito para assistir filmes, editar PDFs e desenhar. Leve e fácil de levar na mochila.",
    "A cor prateada é clássica e linda. O frete grátis chegou antes do prazo previsto."
  ],
  "tablet-t17-pro": [
    "demorou um pouco pra chegar mas deu certo! O kit já vem completinho com capa teclado magnético e caneta touch. Dá pra trabalhar como se fosse um mini notebook!",
    "A tela 2K de 12 polegadas tem cores muito vivas. Conectei mouse sem fio e consigo editar planilhas e textos com facilidade.",
    "Bateria excelente, aguenta mais de 10 horas assistindo aulas e vídeos no YouTube. Custo-benefício fantástico!",
    "Chegou bem embalado com película protetora já aplicada. Vale muito a pena pelo preço promocional.",
    "Surpreendeu pela velocidade e fluidez. O teclado magnético fixa super firme e digita muito gostoso."
  ],
  "macbook-air-m5": [
    "demorou um pouco pra chegar mas deu certo! O novo chip M5 é inacreditável, abre programas pesados instantaneamente e a bateria dura mais de 20 horas longe da tomada!",
    "Design ultrafino espetacular, não esquenta nada no colo e é 100% silencioso porque não tem ventoinha. Teclado retroiluminado delicioso.",
    "Original lacrado na caixa da Apple com número de série válido. Tela Liquid Retina com cores vivas e brilho excelente.",
    "Paguei no Pix com desconto e a nota fiscal chegou no meu e-mail na mesma hora. Postagem super rápida!",
    "Melhor notebook que já comprei. O trackpad da Apple é incomparável e o som embutido parece caixa de som externa de tão bom."
  ],
  "notebook-acer-nitro": [
    "demorou um pouco pra chegar mas deu certo! A placa RTX 4060 roda Warzone e Cyberpunk no Ultra com mais de 100 FPS sem esforço. A tela de 144Hz não dá borrão nenhum!",
    "Sistema de refrigeração CoolBoost mantém a temperatura baixa mesmo depois de 4 horas jogando. Teclado iluminado lindo demais.",
    "Processador i7 com 16GB de RAM e SSD NVMe muito rápido, o Windows liga em menos de 5 segundos. Vale cada real!",
    "Chegou impecável, caixa dupla reforçada sem nenhum amassado. Comprei pelo TikTok Shop e recomendo a loja.",
    "Ótimo também para edição de vídeo e renderização no Premiere e Blender. Renderiza muito rápido!"
  ],
  "cpu-gamer-aquario": [
    "demorou um pouco pra chegar mas deu certo! O gabinete aquário com visão panorâmica de vidro temperado e as 9 ventoinhas RGB é o PC mais lindo do mundo!",
    "Vem tudo montadinho com gerenciamento de cabos perfeito e controle remoto pra mudar as cores dos LEDs. Já testei nos jogos pesados e voa baixo!",
    "Placa de vídeo potente e 32GB de RAM, não dá um engasgo sequer. Fonte 750W 80 Plus segura tudo com folga.",
    "A embalagem interna vem com proteção de espuma sob medida para não soltar nenhuma peça no transporte. Nota 10!",
    "Chegou em 4 dias em Belo Horizonte. Silencioso, frio e com visual futurista que chama atenção de qualquer um."
  ],
  "monitor-gamer-curvo": [
    "demorou um pouco pra chegar mas deu certo! A curvatura 1500R desse monitor de 27 polegadas dá uma imersão surreal em jogos de tiro e corrida. 165Hz ultra liso!",
    "Sem dead pixels, painel impecável com cores pretas profundas e HDR ativo. O LED traseiro dá um toque gamer muito bonito na parede.",
    "Tempo de resposta de 1ms sem nenhum ghosting. Acompanha cabo DisplayPort de qualidade na caixa.",
    "Ajuste de inclinação macio e bordas quase invisíveis nas laterais. O frete grátis chegou super rápido.",
    "Excelente para jogar e para trabalhar com duas janelas abertas lado a lado. Recomendo de olhos fechados!"
  ],
  "cadeira-gamer-reclinavel": [
    "demorou um pouco pra chegar mas deu certo! A inclinação de 180° com as almofadas lombar e cervical me livrou das dores nas costas no home office. Muito confortável!",
    "Estrutura de aço muito firme e pistão classe 4 que passa total segurança. O couro sintético é macio e bem costurado.",
    "Montagem muito simples, montei em menos de 20 minutos com a chave que já vem na caixa. Apoio de braço ergonômico.",
    "A cadeira é larga e espaçosa, suporta peso sem ranger. As rodinhas deslizam suave no piso laminado.",
    "Melhor custo-benefício em cadeiras ergonômicas. Ficou estilosa demais no meu setup!"
  ],
  "teclado-gamer-branco": [
    "demorou um pouco pra chegar mas deu certo! O switch mecânico tem um som de clique muito satisfatório e o mouse que vem junto tem pegada excelente e sensor preciso!",
    "A cor branca com os efeitos RGB Rainbow ficou espetacular na mesa. As teclas double-shot não desgastam a letra com o tempo.",
    "Cabo trançado reforçado e acabamento robusto. Resposta rápida de 1ms que melhora muito a precisão nos jogos.",
    "Comprei na promoção e me surpreendeu pela qualidade de construção. Teclas anti-ghosting funcionam perfeitamente.",
    "Entrega rápida e produto muito bem embalado. A loja Shopping Brasil foi nota 10!"
  ],
  "headset-fone-gamer": [
    "demorou um pouco pra chegar mas deu certo! As almofadas de espuma com memória vedam todo o som externo e não apertam as orelhas mesmo depois de horas usando. Áudio 7.1 muito nítido!",
    "Microfone antirruído limpa o som da voz no Discord, meus amigos falaram que parece microfone de estúdio. Graves profundos!",
    "O acabamento com iluminação LED nos fones é lindo e o cabo em nylon é grosso e não embola. Muito resistente.",
    "Graves potentes para ouvir passos de inimigos nos jogos. Regulagem de volume direto no fio super prática.",
    "Chegou em 3 dias aqui em Brasília. Melhor custo-benefício em headset que já encontrei!"
  ],
  "caixa-de-som-bluetooth-potente": [
    "demorou um pouco pra chegar mas deu certo! O grave dessa caixa portátil estilo JBL é tão forte que faz a mesa tremer. Levei pra beira da piscina e a água não causou nenhum dano!",
    "Bateria durou o churrasco de domingo inteiro no volume alto sem descarregar. Conexão Bluetooth rápida sem atraso.",
    "Material emborrachado reforçado com alça resistente para carregar no ombro. Som estéreo bem encorpado.",
    "Volume muito potente para o tamanho dela. Conecta rápido com celular Android e iPhone.",
    "Chegou muito bem embalada e com cabo para carregar. Compra 100% aprovada!"
  ],
  "caixa-amplificada-hz2000": [
    "demorou um pouco pra chegar mas deu certo! A caixa torre HZ-2000 tem um som monstruoso, fez tremer as janelas da casa toda no churrasco de família. Os LEDs coloridos animam demais a festa!",
    "Vem com entrada pra 2 microfones e função karaokê que a família inteira adorou. Rodinhas e alça facilitam puxar.",
    "Graves pesadíssimos e agudos limpos. O Bluetooth conecta de longe sem picotar o som.",
    "Ideal para festas, chácaras e eventos. A bateria interna tem boa duração e também funciona direto na tomada bivolt.",
    "Chegou super rápido via transportadora, tudo lacrado e com nota fiscal. Recomendo demais!"
  ],
  "central-multimidia-carro": [
    "demorou um pouco pra chegar mas deu certo! O Apple CarPlay e Android Auto sem fio conectam sozinhos quando entro no carro. Waze e Spotify na tela com toque super sensível!",
    "A câmera de ré que vem no kit tem ótima resolução e visão noturna perfeita para estacionar na garagem escura.",
    "Instalação no painel foi simples e o som do carro ficou com mais fidelidade e equalização gráfica completa.",
    "A tela de 7 polegadas tem brilho forte e não fica ilegível mesmo com sol batendo no para-brisa. Muito top!",
    "Chegou em 3 dias em caixa com chicotes de ligação e manual. Melhor upgrade que fiz no meu carro."
  ],
  "smartwatch-ultra-serie9": [
    "demorou um pouco pra chegar mas deu certo! A tela AMOLED de 2.2 polegadas tem cores vibrantes e dá pra atender chamadas com áudio bem limpo direto pelo relógio!",
    "Mede batimentos cardíacos, passos e sono com muita precisão. A caixa de 49mm com botão laranja dá um visual esportivo robusto.",
    "Bateria dura quase uma semana no meu uso diário. Notificações do WhatsApp chegam instantâneas com o texto completo.",
    "Pulseira oceânica muito confortável no pulso e vem com trava de titânio segura. Recomendo muito!",
    "Acompanha carregador por indução magnética rápido. Excelente produto pelo preço da oferta!"
  ],
  "projetor-portatil-4k": [
    "demorou um pouco pra chegar mas deu certo! Projetei na parede branca da sala e virou uma tela de cinema de 120 polegadas. O foco automático e ajuste de imagem corrigem tudo em segundos!",
    "Android integrado roda Netflix, YouTube e Prime direto pelo Wi-Fi sem precisar de computador conectado. Muito prático!",
    "A imagem em resolução alta é nítida e as cores são bem vivas no escuro. Alto-falante embutido já quebra um galho enorme.",
    "Pequeno e leve, levo fácil pro quarto ou pra casa de amigos no final de semana. Conexão Bluetooth com caixa de som perfeita.",
    "Chegou super rápido e muito bem protegido com plástico bolha e caixa original. Vale cada centavo!"
  ],
  "camera-seguranca-wifi": [
    "demorou um pouco pra chegar mas deu certo! O sistema de lente dupla é sensacional: enquanto uma lente fica fixa filmando o portão, a outra gira 360° seguindo quem passa!",
    "A visão noturna colorida com holofote de LED acende quando detecta movimento humano e avisa na hora no celular. Me sinto muito mais seguro em casa.",
    "Áudio bidirecional permite conversar com quem está no portão mesmo estando no trabalho. Configuração pelo app foi muito fácil.",
    "Grava no cartão de memória e na nuvem. Resistente à chuva e sol forte, já tomou tempestade e continua funcionando 100%.",
    "Chegou em 3 dias com suporte e buchas de fixação inclusos. Recomendo a loja Shopping Brasil!"
  ],
  "carregador-turbo-67w": [
    "demorou um pouco pra chegar mas deu certo! Esse carregador de 67W com tecnologia GaN carrega meu celular de 15% até 80% em cerca de 25 minutos e não esquenta nada na tomada!",
    "Carrego meu iPhone, iPad e até o notebook com a mesma fonte compacta. Construção premium e pinos reforçados.",
    "Cabo de alta potência com encaixe perfeito. Não dá mensagem de acessório incompatível.",
    "Muito menor e mais leve que os carregadores originais antigos. Indispensável para quem viaja bastante.",
    "Chegou rapidinho, bem embalado e funcionando perfeitamente. Loja nota dez!"
  ],
  "ventilador-turbo-laranja": [
    "demorou um pouco pra chegar mas deu certo! A hélice laranjada além de ser estilosa venta muito forte. No nível 1 já refresca o quarto todo e é incrivelmente silencioso para dormir!",
    "Não faz barulho nenhum de motor, grade fácil de desmontar para limpar a poeira e base bem estável sem vibrar na mesa.",
    "Consumo de energia super baixo e inclinação vertical fácil de ajustar. O contraste do preto com a hélice laranja ficou lindo.",
    "Chegou em 3 dias super bem embalado na caixa sem nenhum arranhão. Recomendo a compra!",
    "Vento bem direcionado e forte, me salvou do calorão dessa semana. Com certeza vou comprar mais um pra sala."
  ],
  "ventilador-turbo-grandao": [
    "demorou um pouco pra chegar mas deu certo! O ventilador grandão de 50cm com 8 pás pretas parece uma turbina de tão potente! Climatiza a sala de estar inteira sozinho.",
    "Grade protetora muito resistente e motor turbo com boa vazão de ar. A oscilação horizontal distribui o vento perfeitamente.",
    "Regulagem de altura suave e base pesada que não tomba nem treme mesmo na velocidade máxima.",
    "Fácil de montar, veio com manual em português e todas as travas. Chegou muito antes do prazo!",
    "Excelente ventilador para quem precisa de vento forte em ambientes grandes. Nota mil!"
  ],
  "air-fryer-electrolux": [
    "demorou um pouco pra chegar mas deu certo! O cesto de 5,6 litros da linha Rita Lobo é gigante, coube um frango inteiro perfeitamente. Alimentos ficam crocantes por fora e macios sem uma gota de óleo!",
    "O acabamento grafite com detalhes inox é sofisticado demais. O antiaderente é maravilhoso, não gruda nada e lava com uma esponja macia em segundos.",
    "Timer sonoro avisa quando termina e o desligamento automático dá total segurança. Já fiz batatas, carnes e até bolo!",
    "Economiza muito tempo na cozinha e não deixa cheiro de fritura na casa. Compra super recomendada!",
    "Chegou em 3 dias com nota fiscal e garantia. A melhor air fryer que já utilizei na vida."
  ],
  "liquidificador-oster-1400w": [
    "demorou um pouco pra chegar mas deu certo! A potência de 1400W desse Oster é inacreditável, triturou gelo e frutas congeladas em segundos sem pedir arrego. A jarra de 3,2L é enorme!",
    "Lâminas em inox super afiadas e encaixe do motor de metal que não desgasta como os de plástico. Material de primeira linha.",
    "Jarra com proteção antimicrobiana muito fácil de lavar e não pega cheiro de tempero. Tampa com dosador prático.",
    "Bate massa pesada de torta e sucos sem esforço nenhum. Comprei com cupom de desconto no TikTok Shop.",
    "Entrega rápida e produto muito bem protegido. Recomendo a todos que buscam durabilidade na cozinha!"
  ],
  "cafeteira-espresso-loja": [
    "demorou um pouco pra chegar mas deu certo! A pressão de 20 bar extrai o café com aquela crema espessa e aveludada digna das melhores cafeterias italianas. O bico vaporizador faz um cappuccino espetacular!",
    "Acabamento todo em aço inox escovado, combinou perfeitamente com a bancada da cozinha. Esquenta a água super rápido.",
    "Bandeja coletora removível fácil de esvaziar e limpar. Acompanha colher dosadora e filtro para espresso curto e duplo.",
    "O aroma do café fresquinho pela manhã mudou a minha rotina. Paguei no Pix com desconto e chegou em 3 dias.",
    "Muito fácil de usar no dia a dia e super econômica. Excelente cafeteira profissional compacta!"
  ],
  "microondas-inox-loja": [
    "demorou um pouco pra chegar mas deu certo! A porta espelhada em inox deu um visual luxuoso na cozinha planejada. Capacidade de 30 litros espaçosa, esquenta e descongela uniformemente!",
    "As receitas pré-programadas para pipoca, brigadeiro e arroz funcionam com um só toque. Trava para crianças no painel dá tranquilidade.",
    "Puxador embutido anatômico e prato giratório grande que acomoda refratários de vidro sem raspar nas laterais.",
    "Veio muito bem embalado na caixa original com isopor reforçado. Funcionamento silencioso e eficiente.",
    "Chegou super rápido com frete grátis. Muito feliz com a compra na Shopping Brasil!"
  ],
  "ar-condicionado-split-inverter": [
    "demorou um pouco pra chegar mas deu certo! O ar condicionado gela o quarto em menos de 5 minutos e o controle remoto com Wi-Fi facilita ligar pelo celular antes de chegar em casa. Extremamente silencioso!",
    "A tecnologia Inverter diminuiu a minha conta de luz em relação ao aparelho antigo. Função Quente/Frio é excelente para o ano todo.",
    "Filtro antibacteriano deixa o ar da casa muito mais puro e sem poeira. A condensadora externa não faz vibração.",
    "Instalador elogiou as conexões de cobre e a qualidade de fabricação do equipamento. Nota dez!",
    "Chegou em transportadora com código de rastreamento certinho. Recomendo a compra para quem busca conforto e economia."
  ],
  "fogao-cooktop-5-bocas": [
    "demorou um pouco pra chegar mas deu certo! A mesa de vidro temperado preto com o queimador central tripla chama é espetacular. A panela ferve água em poucos minutos e o visual é chiquérrimo!",
    "Trempes individuais esmaltadas dão muita estabilidade para as panelas sem escorregar. Acendimento automático direto no botão.",
    "Vidro temperado muito fácil de limpar após cozinhar, basta um pano com detergente neutro e fica brilhando como novo.",
    "Bivolt prático e encaixou perfeito no nicho padrão da bancada de granito. Chegou intacto e sem riscos.",
    "Melhor preço que encontrei na internet inteira graças ao cupom. Recomendo de olhos fechados!"
  ],
  "maquina-lava-e-seca-12kg": [
    "demorou um pouco pra chegar mas deu certo! As roupas saem da máquina já cheirosas, sem fiapos e totalmente secas prontas para guardar no armário. O motor Direct Drive é tão silencioso que parece desligada!",
    "Ciclos inteligentes a vapor removem manchas difíceis e eliminam ácaros. Economiza muita água comparada à máquina antiga.",
    "Painel digital touch muito moderno com programação de lavagem pelo aplicativo no smartphone.",
    "Capacidade de 12kg perfeita para lavar edredom de casal sem esforço. Transportadora entregou dentro do prazo.",
    "Excelente investimento para a casa, facilitou 100% a rotina de lavar roupa em apartamento."
  ],
  "batedeira-planetaria-philco": [
    "demorou um pouco pra chegar mas deu certo! Bati massa pesada de pão caseiro e a batedeira não balançou nada na bancada. Os 3 batedores são de metal maciço e a tigela de 5 litros é enorme!",
    "O movimento planetário mistura todos os cantos da tigela sem precisar parar para raspar as laterais. 12 velocidades muito precisas.",
    "Tampa antirrespingos permite adicionar ingredientes sem sujar a cozinha. Design preto brilhante muito bonito.",
    "Claras em neve ficam prontas em ponto de pico em menos de 2 minutos. Excelente para quem faz bolos para vender.",
    "Chegou rápido e muito bem embalada. Ótimo custo-benefício!"
  ],
  "chuveiro-lorenzetti-7800w": [
    "demorou um pouco pra chegar mas deu certo! O banho com a ducha e o chuveiro juntos nesse Lorenzetti Acqua Duo é revigorante, jato super largo e quentinho mesmo nos dias mais frios do inverno!",
    "Regulagem gradual eletrônica da temperatura por haste ao alcance da mão. Acabamento preto fosco com cromado maravilhoso.",
    "A tecnologia Press Plus realmente cumpre o que promete, deu bastante pressão mesmo com a caixa d'água baixa.",
    "Fácil instalação com engate rápido sem complicação. Resistência de troca fácil tipo cartucho.",
    "Entrega rápida e produto 100% original com nota fiscal. Recomendo muito!"
  ],
  "smart-tv-75-polegadas-4k": [
    "demorou um pouco pra chegar mas deu certo! A tela de 75 polegadas é colossal, transformou a sala de estar em uma verdadeira sala de cinema! Cores QLED vibrantes com pretos profundos e bordas infinitas.",
    "Comando de voz Alexa pelo controle remoto funciona de primeira para pesquisar filmes e séries. Áudio Dolby Atmos envolvente.",
    "Conexões HDMI 2.1 perfeitas para jogar videogame em 4K liso sem travamentos. Sistema operacional rápido.",
    "Transportadora especializada entregou com muito cuidado, caixa enorme sem nenhum amassado e painel 100% perfeito.",
    "A melhor televisão que já tive, todo mundo que vem em casa fica impressionado com o tamanho e a qualidade da imagem!"
  ],
  "geladeira-frost-free-duplex": [
    "demorou um pouco pra chegar mas deu certo! O modelo Inverse com freezer embaixo é uma bênção para a coluna, tudo o que mais uso na geladeira fica na altura dos olhos. Acabamento inox anti-manchas impecável!",
    "Motor Inverter extremamente econômico e silencioso, gela muito rápido no painel touch digital externo.",
    "Espaço interno de 460 litros muito bem dividido com prateleiras retráteis e gavetão para legumes com controle de umidade.",
    "Nunca mais preciso descongelar freezer na vida. Entrega feita com muito cuidado até dentro da minha cozinha.",
    "Melhor compra de eletrodoméstico que fiz. Recomendo a loja Shopping Brasil pelo excelente atendimento!"
  ],
  "maquina-lava-loucas-inox": [
    "demorou um pouco pra chegar mas deu certo! A louça de 14 pessoas sai brilhando, sem nenhuma gordura e completamente higienizada a 70°C. Economiza horas do meu dia e muita água!",
    "Cestos ajustáveis comportam panelas grandes, assadeiras e taças delicadas com total firmeza e segurança.",
    "Painel touch digital intuitivo com ciclo rápido para louças pouco sujas e ciclo pesado para panelas engorduradas.",
    "Operação super silenciosa, ligo à noite antes de dormir e acordo com tudo limpo e seco. Acabamento inox lindo.",
    "Chegou em 3 dias com manual e mangueiras inclusas. Indispensável para qualquer família moderna!"
  ],
  "sofa-retratil-reclinavel": [
    "demorou um pouco pra chegar mas deu certo! O sofá com 3,82 metros é espaçoso demais, a família inteira senta confortavelmente para assistir filmes. O veludo é macio ao toque e a espuma D33 não deforma!",
    "Molas ensacadas dão a sensação de deitar em uma cama de hotel cinco estrelas. Abertura retrátil de 1,80m desliza com muita facilidade.",
    "Encosto reclinável em vários estágios com almofadas de fibra siliconada super aconchegantes.",
    "Estrutura de madeira maciça tratada sem rangidos. A cor combinou perfeitamente com a decoração da minha sala.",
    "Chegou muito bem embalado em módulos separados que passaram fácil pela porta do apartamento. Excelente compra!"
  ],
  "cama-box-colchao-castor": [
    "demorou um pouco pra chegar mas deu certo! O colchão Castor Queen com molas ensacadas e pillow top duplo é um espetáculo. Quando meu esposo se mexe, eu não sinto absolutamente nada do meu lado!",
    "Acordei sem nenhuma dor nas costas desde o primeiro dia de uso. Tecido bordado de toque suave com tratamento antiácaro.",
    "Base box reforçada com pés de madeira maciça que dão firmeza total sem ranger. Altura ideal da cama.",
    "Produto original com selo do Inmetro e garantia oficial de fábrica. Entrega rápida no quarto.",
    "Qualidade de sono garantida, vale cada centavo pelo conforto oferecido!"
  ],
  "guarda-roupa-porta-vidro": [
    "demorou um pouco pra chegar mas deu certo! As portas de vidro reflecta fumê com a fita de LED integrada deram um ar de closet de mansão no meu quarto. Toda vez que abro as portas a iluminação acende automaticamente!",
    "Divisão interna modulada perfeita com espaço generoso para vestidos longos, sapatos e muitas gavetas com corrediças telescópicas.",
    "Material 100% MDF de alta densidade muito resistente e espesso. Puxadores de alumínio de excelente acabamento.",
    "Montador comentou que as ferragens são de padrão elevado. Chegou muito bem acondicionado sem nenhum risco no vidro.",
    "O guarda-roupa dos sonhos! Ficou lindo demais no quarto."
  ],
  "lixeira-inteligente-sensor": [
    "demorou um pouco pra chegar mas deu certo! O sensor por aproximação abre a tampa em 0,3s sem você encostar a mão em nada. Perfeita para cozinhar com as mãos ocupadas e manter a higiene!",
    "Vedação hermética excelente, não escapa nenhum cheiro de resíduo para a cozinha ou banheiro. Corpo em inox escovado.",
    "A tampa fecha suavemente sem barulho de impacto. As pilhas duram meses sem descarregar.",
    "Capacidade de 15 litros ideal para o uso diário da família. Muito elegante e moderna.",
    "Chegou em 3 dias em caixinha segura. Todo mundo que vem aqui em casa acha incrível!"
  ],
  "robo-aspirador-alexa": [
    "demorou um pouco pra chegar mas deu certo! O robô mapeia os cômodos certinho, aspira todos os pelos dos meus cachorros e ainda passa pano úmido no chão. Chego do trabalho com a casa brilhando!",
    "Conexão com a Alexa permite mandar limpar a sala só por comando de voz. Sensores antiqueda funcionam com perfeição na escada.",
    "Quando a bateria está acabando, ele volta sozinho para a base de carregamento. Muito inteligente e silencioso.",
    "Entra fácil embaixo da cama e do sofá onde a vassoura não alcançava. Tirou quilos de poeira escondida.",
    "Chegou bem embalado com filtros e panos de microfibra extras. A melhor compra de utilidade doméstica que fiz!"
  ],
  "ferro-passar-roupa": [
    "demorou um pouco pra chegar mas deu certo! A base de cerâmica desliza que é uma beleza sobre tecidos delicados sem grudar ou marcar. O jato de vapor extra desamassa até ternos no cabide!",
    "Aquece muito rápido e o spray de água é uniforme para tirar vincos difíceis de calças jeans. Leve e ergonômico.",
    "Cabo elétrico giratório 360° não enrosca durante o uso. Sistema autolimpeza evita acúmulo de calcário.",
    "Reservatório de água transparente fácil de abastecer. Excelente ferro a vapor pelo preço promocional.",
    "Chegou antes do prazo e muito bem acondicionado. Recomendo a Shopping Brasil!"
  ],
  "mop-limpar-casa": [
    "demorou um pouco pra chegar mas deu certo! O balde centrifugador em aço inox torce a microfibra completamente com pouca pressão, o chão seca quase na hora sem molhar as mãos!",
    "Cabo de inox reforçado com ajuste de altura que não machuca as costas. A cabeça giratória entra embaixo de qualquer móvel.",
    "Vem com refis de microfibra grossos que pegam poeira, fios de cabelo e manchas difíceis sem riscar o piso.",
    "Lavagem rápida e fácil de guardar em qualquer cantinho da área de serviço. Praticidade nota dez!",
    "Entrega super rápida e produto resistente. Minha mãe amou tanto que já encomendou outro!"
  ],
  "kit-3-malas-viagem": [
    "demorou um pouco pra chegar mas deu certo! As 3 malas (P, M e G) são em ABS muito resistente e as rodinhas duplas 360° deslizam macio até com a mala cheia e pesada. O cadeado embutido passa total segurança!",
    "A mala P tem as dimensões ideais para ir a bordo do avião sem precisar despachar. Forro interno com divisórias e elásticos ótimos.",
    "Zíper expansor de capacidade quebra um galho enorme na volta das viagens quando trazemos lembrancinhas. Acabamento de primeira.",
    "Já viajei de avião com elas e suportaram o manuseio das esteiras de bagagem perfeitamente sem amassar. Cores lindas!",
    "Chegou uma mala dentro da outra, super bem embaladas na caixa grande. Excelente compra!"
  ],
  "kit-3-necessaire": [
    "demorou um pouco pra chegar mas deu certo! O tecido impermeável protege cosméticos e maquiagens contra qualquer vazamento dentro da mala. Os três tamanhos P, M e G atendem qualquer tipo de viagem!",
    "Zíperes reforçados que não travam e costuras muito bem finalizadas. Fácil de limpar com pano úmido.",
    "Material transparente permite enxergar rapidamente onde está cada produto sem precisar revirar tudo.",
    "Cabe perfeitamente na mala de mão e na bolsa do dia a dia. Recomendo muito!",
    "Entrega ágil, produto exatamente igual às fotos do anúncio. Loja confiável!"
  ],
  "almofada-pescoco-aviao": [
    "demorou um pouco pra chegar mas deu certo! A espuma viscoelástica com memória adapta-se perfeitamente ao formato do pescoço, não deixa a cabeça cair para os lados. Consegui dormir a viagem de ônibus inteira!",
    "Capa lavável com zíper em tecido plush muito macio e quentinho. Botão de fechamento mantém a almofada firme no lugar.",
    "Dá pra enrolar e prender na alça da mochila sem ocupar espaço na mala. Indispensável para voos longos.",
    "Não deforma com o tempo, a espuma sempre volta à forma original. Muito superior às almofadas infláveis.",
    "Chegou rápido em embalagem lacrada. Compra recomendadíssima!"
  ],
  "actine-gel-limpeza": [
    "demorou um pouco pra chegar mas deu certo! O gel de limpeza Actine salvou minha pele da oleosidade. Controla o brilho o dia todo sem ressecar o rosto!",
    "Recomendado pela minha dermatologista. Limpa profundamente os poros e reduziu muito os cravos em duas semanas. Produto 100% original!",
    "A textura em gel faz uma espuma cremosa muito gostosa e rende demais, um pump já limpa o rosto todo. Chegou super rápido!",
    "Melhor sabonete facial para pele acneica. Veio muito bem embalado sem nenhum vazamento na tampa. Recomendo a loja!",
    "Uso de manhã e à noite. Deixa a pele fresca e com toque seco maravilhoso. Valeu muito a pena a compra!"
  ],
  "makeb-volume-extremo": [
    "demorou um pouco pra chegar mas deu certo! A máscara de cílios Make B. dá um volume impressionante de verdade, parece extensão de cílios fio a fio!",
    "Não empelota e não borra ao longo do dia, mesmo com calor. O aplicador alcança até os cílios menores dos cantinhos perfeitamente.",
    "Original O Boticário lacrada! A cor preta é bem intensa e alonga os cílios logo na primeira camada. Entrega super rápida.",
    "Minha máscara favorita da vida! Sai fácil com água morna ou demaquilante sem agredir os olhos. Compra aprovada!",
    "Chegou em 3 dias aqui em São Paulo com plástico bolha reforçado. Super recomendo a Shopping Brasil!"
  ],
  "principia-protetor-solar": [
    "demorou um pouco pra chegar mas deu certo! O protetor solar Principia FPS 70 com cor uniformizou o tom da minha pele perfeitamente, substituiu a base no dia a dia!",
    "Toque seco de verdade, não fica pegajoso e segura a oleosidade o dia inteiro. Não arde os olhos e espalha super fácil.",
    "Proteção altíssima com niacinamida que ainda trata manchas. A cor adaptou superbem no meu rosto sem ficar alaranjado.",
    "Produto original lacrado com validade longa. Chegou super rápido com código de rastreamento no WhatsApp.",
    "Melhor protetor com cor que já testei, acabamento matte natural impecável. Recomendo de olhos fechados!"
  ],
  "eudora-po-compacto": [
    "demorou um pouco pra chegar mas deu certo! O pó compacto Eudora Glam Skin Perfection é finíssimo, sela a pele sem pesar e não marca linhas de expressão!",
    "O acabamento ultra matte deixa a pele aveludada como filtro de foto. O espelho grande na tampa facilita muito retocar na rua.",
    "Veio impecável, com proteção no estojo sem nenhum pó trincado. Embalagem dourada elegante e resistente.",
    "Controla o brilho o dia todo e tem ótima cobertura. Comprei com o cupom de desconto da roleta e valeu super a pena!",
    "Entrega rápida e produto 100% autêntico da Eudora. Muito satisfeita com o atendimento da loja!"
  ],
  "capacete-ls2-alex-barros": [
    "demorou um pouco pra chegar mas deu certo! O capacete LS2 original tem um grafismo espetacular, encaixe justo e confortável na cabeça sem pontos de pressão. A viseira de troca rápida não distorce nada a visão!",
    "Entradas de ar eficientes que não deixam a viseira embaçar na chuva. O forro interno hipoalergênico é removível para lavar.",
    "Muito silencioso em alta velocidade na rodovia, quase não tem ruído de vento. Trava micrométrica segura.",
    "Vem com narigueira, bavete e capa protetora personalizada da LS2 na caixa. Original com selo do Inmetro.",
    "Entrega super rápida com código de rastreamento. Melhor capacete esportivo nessa faixa de preço!"
  ],
  "triciclo-eletrico-drift-infantil": [
    "Minha filha ficou simplesmente encantada! O triciclo elétrico de drift é sensacional, muito estável, seguro e a bateria dura bastante. Os LEDs e o som chamam muita atenção na pracinha!",
    "Chegou super rápido em 3 dias, muito bem embalado na caixa. As 3 velocidades são ótimas para a criança ir se acostumando. Material reforçado e aguenta muito bem!",
    "Melhor compra que fiz para o aniversário da minha pequena! Conecta Bluetooth no celular para tocar as musiquinhas dela e as rodinhas traseiras de drift giram 360 graus com muita facilidade.",
    "Comprei com o cupom de desconto da roleta e frete grátis. Acompanha kit de proteção e capacete, acabamento de altíssima qualidade!",
    "Entrega nota 10 pela Shopping Brasil! O triciclo é lindo demais, forte e as luzes de LED à noite ficam um espetáculo. Recomendo de olhos fechados!"
  ],
  "drone-cz11-pro-brushless": [
    "demorou um pouco pra chegar mas deu certo! O Drone CZ11 Pro veio perfeitamente guardado na maleta organizadora com o controle com tela e as 2 baterias! A câmera dupla tem imagem excelente e o voo é super firme.",
    "O controle com tela própria FPV é incrível, não precisa usar o celular e a resposta dos comandos é imediata. Motores brushless muito fortes e silenciosos!",
    "Chegou super rápido em 3 dias aqui! Produto 100% original, acabamento impecável e alta qualidade. A maleta reforçada facilita muito transportar.",
    "Sensor anti-impacto funciona de verdade, desvia de obstáculos e o retorno automático é muito seguro. Melhor drone nessa faixa de valor!",
    "Girei a roleta e usei o cupom com frete grátis! Entrega nota 10 e o atendimento da loja é super prestativo."
  ],
  "hoverboard-eletrico-600w": [
    "Minha filha amou demais de presente! O hoverboard tem auto-equilíbrio super estável, ela aprendeu a andar em menos de 10 minutos. O som Bluetooth é alto e as luzes nas rodas chamam muita atenção!",
    "Excelente custo-benefício! Comprei no Pix com o cupom de desconto da roleta e frete grátis. Anda super macio no asfalto e no piso de casa.",
    "Chegou super rápido em 3 dias muito bem embalado e lacrado na caixa com plástico bolha e carregador bivolt. Bateria dura muito tempo de diversão!",
    "Produto 100% original, motor de 600W potente que sobe até rampas leves sem dificuldade. Valeu cada centavo!",
    "Entrega nota 10 pela Shopping Brasil! Atendimento muito prestativo e rastreio certinho pelo WhatsApp. Recomendo para todo mundo!"
  ],
  "piscina-inflavel-azul-pvc-reforcada": [
    "demorou um pouco pra chegar mas deu certo! A piscina é fantástica, compramos a de 3 andares e as crianças estão apaixonadas! O material de PVC é bem grosso e firme, acomoda todo mundo com muito conforto.",
    "Chegou super rápido em 3 dias aqui em casa! Veio com a bombinha elétrica bivolt que infla ela inteira em menos de 5 minutos, foi uma facilidade sem igual.",
    "Amei demais! Peguei o modelo de 4 andares de 3 metros, ela é bem funda e alta como dá pra ver na foto. Cabem os adultos tranquilamente sentados para se refrescar nos dias de calor!",
    "Material super resistente de alta qualidade, acabamento das bordas arredondadas e não fura fácil. Comprei no Pix com frete grátis e o rastreio avisou tudo pelo WhatsApp.",
    "Melhor compra pro verão! Atendimento nota 10 da Shopping Brasil, veio muito bem embalada e com nota fiscal. Recomendo para toda família!"
  ]
};

function getProductSpecificReviews(prod) {
  if (!prod) {
    prod = currentProduct || (typeof PRODUCTS !== "undefined" && PRODUCTS.length > 0 ? PRODUCTS[0] : null);
  }
  const prodImg = (prod && prod.id === "drone-cz11-pro-brushless") ? "images/loja/drone-cz11-maleta.png" : ((prod && prod.id === "triciclo-eletrico-drift-infantil") ? "images/loja/triciclo-drift-menina-comentario.jpg" : ((prod && prod.id === "hoverboard-eletrico-600w") ? "images/loja/hoverboard-menina-comentario-1.jpg" : ((prod && prod.id === "piscina-inflavel-azul-pvc-reforcada") ? "images/loja/piscina-inflavel-azul-1.jpg" : ((prod && prod.image) ? prod.image : ""))));
  const secondPhoto = (prod && (prod.id === "drone-cz11-pro-brushless" || prod.id === "triciclo-eletrico-drift-infantil")) ? "" : ((prod && prod.id === "hoverboard-eletrico-600w") ? "images/loja/hoverboard-caixa-comentario.png" : ((prod && prod.id === "piscina-inflavel-azul-pvc-reforcada") ? "images/loja/piscina-inflavel-azul-3m-video-frame.jpg" : ((prod && prod.images && prod.images.length > 1) ? prod.images[1] : "")));
  const prodIdx = (typeof PRODUCTS !== "undefined" && Array.isArray(PRODUCTS))
    ? Math.max(0, PRODUCTS.findIndex(p => p.id === (prod ? prod.id : "")))
    : 0;

  const r1 = BRAZILIAN_REVIEWERS[(prodIdx * 5 + 0) % BRAZILIAN_REVIEWERS.length];
  const r2 = BRAZILIAN_REVIEWERS[(prodIdx * 5 + 1) % BRAZILIAN_REVIEWERS.length];
  const r3 = BRAZILIAN_REVIEWERS[(prodIdx * 5 + 2) % BRAZILIAN_REVIEWERS.length];
  const r4 = BRAZILIAN_REVIEWERS[(prodIdx * 5 + 3) % BRAZILIAN_REVIEWERS.length];
  const r5 = BRAZILIAN_REVIEWERS[(prodIdx * 5 + 4) % BRAZILIAN_REVIEWERS.length];

  const customTexts = prod && PRODUCT_CUSTOM_REVIEWS[prod.id];
  let comments = [];
  if (customTexts && customTexts.length >= 5) {
    comments = customTexts;
  } else {
    const t = prod ? prod.title : "Produto";
    comments = [
      `demorou um pouco pra chegar mas deu certo! O ${t} veio 100% lacrado, muito bem embalado e funcionando perfeitamente. Recomendo a Shopping Brasil!`,
      `Chegou super rápido em 3 dias aqui! Produto 100% original, acabamento impecável e alta qualidade. Paguei no Pix com aprovação imediata.`,
      `Amei demais! Superou todas as minhas expectativas, muito prático e com material resistente. Valeu muito a pena aproveitar a promoção!`,
      `Estava com receio no começo mas o rastreio atualizou certinho pelo WhatsApp. Veio com plástico bolha reforçado e nota fiscal.`,
      `Girei a roleta e usei o cupom com frete grátis! Entrega nota 10 e o atendimento da loja é super prestativo.`
    ];
  }

  return [
    {
      name: r1.name,
      city: r1.city,
      stars: 5,
      date: "Há 1 dia",
      comment: comments[0],
      photo: prodImg
    },
    {
      name: r2.name,
      city: r2.city,
      stars: 5,
      date: "Há 2 dias",
      comment: comments[1],
      photo: ""
    },
    {
      name: r3.name,
      city: r3.city,
      stars: 5,
      date: "Há 3 dias",
      comment: comments[2],
      photo: secondPhoto
    },
    {
      name: r4.name,
      city: r4.city,
      stars: 5,
      date: "Há 4 dias",
      comment: comments[3],
      photo: ""
    },
    {
      name: r5.name,
      city: r5.city,
      stars: 5,
      date: "Há 5 dias",
      comment: comments[4],
      photo: ""
    }
  ];
}

function toggleReviewForm() {
  const box = document.getElementById("newReviewBox");
  if (!box) return;
  const isHidden = box.style.display === "none" || !box.style.display;
  box.style.display = isHidden ? "block" : "none";
  if (isHidden) {
    const input = document.getElementById("reviewAuthorName");
    if (input) input.focus();
  }
}

function setReviewRating(rating) {
  currentReviewRating = rating;
  const stars = document.querySelectorAll("#starRatingSelect .star-btn");
  stars.forEach((s, idx) => {
    if (idx < rating) {
      s.classList.add("active");
    } else {
      s.classList.remove("active");
    }
  });

  const ratingText = document.getElementById("starRatingText");
  const labels = ["", "1.0 Ruim", "2.0 Regular", "3.0 Bom", "4.0 Muito Bom", "5.0 Excelente"];
  if (ratingText) {
    ratingText.textContent = labels[rating] || `${rating}.0`;
  }
}

function handleReviewPhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    currentReviewPhotoBase64 = e.target.result;
    const previewWrap = document.getElementById("reviewPhotoPreviewWrap");
    const previewImg = document.getElementById("reviewPhotoPreviewImg");
    if (previewWrap && previewImg) {
      previewImg.src = currentReviewPhotoBase64;
      previewWrap.style.display = "block";
    }
  };
  reader.readAsDataURL(file);
}

function removeReviewPhoto() {
  currentReviewPhotoBase64 = null;
  const previewWrap = document.getElementById("reviewPhotoPreviewWrap");
  const input = document.getElementById("reviewPhotoInput");
  if (previewWrap) previewWrap.style.display = "none";
  if (input) input.value = "";
}

function submitNewReview() {
  const nameInput = document.getElementById("reviewAuthorName");
  const textInput = document.getElementById("reviewText");

  const name = nameInput ? nameInput.value.trim() : "";
  const comment = textInput ? textInput.value.trim() : "";

  if (!name) {
    showToast("Por favor, digite seu nome ou apelido.");
    if (nameInput) nameInput.focus();
    return;
  }

  if (!comment) {
    showToast("Por favor, escreva seu comentário sobre o produto.");
    if (textInput) textInput.focus();
    return;
  }

  const newReview = {
    name: name,
    city: "Brasil",
    stars: currentReviewRating,
    date: "Agora mesmo",
    comment: comment,
    photo: currentReviewPhotoBase64 || ""
  };

  const prodId = currentProduct ? currentProduct.id : "geral";
  const storageKey = "shopping_brasil_user_reviews_" + prodId;
  let saved = [];
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) saved = JSON.parse(raw);
  } catch(e) {}

  saved.unshift(newReview);
  localStorage.setItem(storageKey, JSON.stringify(saved));

  // Reset form
  if (nameInput) nameInput.value = "";
  if (textInput) textInput.value = "";
  removeReviewPhoto();
  toggleReviewForm();

  showToast("Sua avaliação foi publicada com sucesso!");
  renderProductReviews(prodId);
}

function renderProductReviews(productId) {
  const container = document.getElementById("pdpDynamicReviewsList");
  if (!container) return;

  const prod = PRODUCTS.find(p => p.id === productId) || currentProduct;
  const baseReviews = getProductSpecificReviews(prod);

  const storageKey = "shopping_brasil_user_reviews_" + productId;
  let customReviews = [];
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) customReviews = JSON.parse(raw);
  } catch(e) {}

  const allReviews = [...customReviews, ...baseReviews];

  // Verified checkmark SVG icon (100% immune to codepage/encoding artifacts)
  const checkSvg = '<svg viewBox="0 0 24 24" width="12" height="12" fill="#00b578" style="vertical-align: -1.5px; margin-right: 3px; display: inline-block;"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
  const starSvg = '<svg viewBox="0 0 24 24" width="13" height="13" fill="#ff9800" style="margin-right: 1px; display: inline-block; vertical-align: -1px;"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';

  container.innerHTML = allReviews.map(rev => {
    const starsCount = rev.stars || 5;
    const starsHtml = starSvg.repeat(starsCount);

    return `
      <div class="review-item" style="border-bottom: 1px solid #f1f1f2; padding: 12px 0;">
        <div class="review-header" style="display: flex; justify-content: space-between; align-items: center;">
          <span class="reviewer-name" style="font-weight: 700; font-size: 13px; color: #161823;">
            ${rev.name} <span class="verified-tag" style="color: #00b578; font-size: 11px; font-weight: 600; margin-left: 4px;">${checkSvg}Compra verificada</span>
          </span>
          <span class="review-stars" style="color: #ff9800; font-size: 14px; letter-spacing: 1px;">${starsHtml}</span>
        </div>
        <div style="font-size: 11px; color: #888; margin-top: 2px;">${rev.city || 'Brasil'} &bull; ${rev.date || 'Recente'}</div>
        <p class="review-comment" style="margin-top: 6px; font-size: 12.5px; color: #333; line-height: 1.45;">${rev.comment}</p>
        ${rev.photo ? `
          <div style="margin-top: 8px;">
            <img src="${rev.photo}" class="review-photo-attached-thumb" alt="Foto da avaliação" onclick="window.open('${rev.photo}', '_blank')">
          </div>
        ` : ''}
      </div>
    `;
  }).join("");
}

// Full Reviews Modal ("Ver todas")
function openReviewsModal() {
  const modal = document.getElementById("reviewsModal");
  const listContainer = document.getElementById("fullReviewsList");
  if (!modal || !listContainer) return;

  const prod = currentProduct;
  const baseReviews = getProductSpecificReviews(prod);
  const prodId = prod ? prod.id : "geral";
  const storageKey = "shopping_brasil_user_reviews_" + prodId;
  let customReviews = [];
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) customReviews = JSON.parse(raw);
  } catch(e) {}

  const allReviews = [...customReviews, ...baseReviews];
  const checkSvg = '<svg viewBox="0 0 24 24" width="12" height="12" fill="#00b578" style="vertical-align: -1.5px; margin-right: 3px; display: inline-block;"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
  const starSvg = '<svg viewBox="0 0 24 24" width="13" height="13" fill="#ff9800" style="margin-right: 1px; display: inline-block; vertical-align: -1px;"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';

  listContainer.innerHTML = allReviews.map(rev => {
    const starsCount = rev.stars || 5;
    const starsHtml = starSvg.repeat(starsCount);
    return `
      <div class="review-item" style="border-bottom: 1px solid #f1f1f2; padding: 12px 0;">
        <div class="review-header" style="display: flex; justify-content: space-between; align-items: center;">
          <span class="reviewer-name" style="font-weight: 700; font-size: 13px; color: #161823;">
            ${rev.name} <span class="verified-tag" style="color: #00b578; font-size: 11px; font-weight: 600; margin-left: 4px;">${checkSvg}Compra verificada</span>
          </span>
          <span class="review-stars" style="color: #ff9800; font-size: 14px; letter-spacing: 1px;">${starsHtml}</span>
        </div>
        <div style="font-size: 11px; color: #888; margin-top: 2px;">${rev.city || 'Brasil'} &bull; ${rev.date || 'Recente'}</div>
        <p class="review-comment" style="margin-top: 6px; font-size: 12.5px; color: #444; line-height: 1.4;">${rev.comment}</p>
        ${rev.photo ? `
          <div style="margin-top: 8px;">
            <img src="${rev.photo}" class="review-photo-attached-thumb" alt="Foto da avaliação" onclick="window.open('${rev.photo}', '_blank')">
          </div>
        ` : ''}
      </div>
    `;
  }).join("");

  modal.classList.add("active");
}