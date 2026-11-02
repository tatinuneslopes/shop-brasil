// Catálogo Oficial Shopping Brasil - TikTok Shop
// Imagens estritamente isoladas e verificadas direto da pasta oficial
// Preços reduzidos para iPhones e itens principais (330 / 325)

const STORE_CONFIG = {
  name: "Shopping Brasil",
  badge: "Vendedor do TikTok Shop",
  verified: true,
  followers: "428.5k",
  rating: "4.9",
  reviewsCount: "48.9k",
  totalProductsCount: 15480,
  logo: "images/logo-shopping-brasil.jpg",
  supportDomain: "shoppingbrasil.com.br",
  supportEmail: "suporte@shoppingbrasil.com.br",
  supportWhatsapp: "(11) 98765-4321",
  couponDiscount: 0.00
};

const CATEGORIES = [
  { id: "all", name: "Todos", icon: "🔥" },
  { id: "smartphones", name: "Smartphone e Acessórios", icon: "📱" },
  { id: "informatica", name: "PC Gamer", icon: "💻" },
  { id: "eletro", name: "Eletrodomésticos", icon: "⚡" },
  { id: "casa", name: "Casa & Conforto", icon: "🏠" },
  { id: "eletronicos", name: "Eletrônicos", icon: "🛸" },
  { id: "beleza", name: "Saúde & Beleza", icon: "✨" },
  { id: "brinquedos", name: "Brinquedos", icon: "🧸" },
  { id: "viagem", name: "Viagem", icon: "✈️" }
];

const PRODUCTS = [
  // ==========================================
  // DESTAQUE DA SEMANA / CASA & CONFORTO
  // ==========================================
  {
    id: "sofa-inflavel-portatil-3em1",
    title: "Sofá Inflável Portátil 3 em 1 com Bomba de Ar Poltrona Cama Dobrável Para Camping Praia e Casa",
    category: "casa",
    categoryName: "Casa & Conforto",
    price: 58.00,
    oldPrice: 169.00,
    discount: "-90%",
    sold: "3.2k",
    rating: 4.9,
    reviews: 980,
    image: "images/loja/sofa-inflavel-estilo-a-marrom.jpg",
    images: [
      "images/loja/sofa-inflavel-estilo-a-marrom.jpg",
      "images/loja/sofa-inflavel-estilo-a-azul.jpg",
      "images/loja/sofa-inflavel-estilo-a-vermelho.jpg",
      "images/loja/sofa-inflavel-estilo-a-pichacao.jpg"
    ],
    colors: [
      "Estilo A Marrom",
      "Estilo A Azul",
      "Estilo A Vermelho",
      "Estilo A Pichação"
    ],
    colorImages: {
      "Estilo A Marrom": "images/loja/sofa-inflavel-estilo-a-marrom.jpg",
      "Estilo A Azul": "images/loja/sofa-inflavel-estilo-a-azul.jpg",
      "Estilo A Vermelho": "images/loja/sofa-inflavel-estilo-a-vermelho.jpg",
      "Estilo A Pichação": "images/loja/sofa-inflavel-estilo-a-pichacao.jpg"
    },
    badge: "Bomba Inclusa",
    freeShipping: true,
    description: "Sofá Inflável Portátil 3 em 1 com Bomba de Ar Poltrona Cama Dobrável Para Camping Praia e Casa. Confeccionado em tecido de veludo impermeável toque suave com PVC ecológico ultra resistente ao desgaste. Dimensões do sofá: 130 cm x 76 cm x 99 cm. Dimensões do apoio para os pés / pedal: 64 cm x 28 cm. Capacidade de carga: até 195 kg. Peso: cerca de 1,9 kg. Bomba de ar inclusa no kit. Encha, use e guarde com máxima praticidade. Perfeito para relaxar em casa, praia, camping e viagens."
  },
  {
    id: "panela-pressao-visor-vidro-4-5l",
    title: "Panela de Pressão com Visor de Vidro Grande Antiaderente 4,5L 6 Camadas de Alumínio Alta Durabilidade Cozimento Rápido e Seguro ENVIO IMEDIATO",
    category: "casa",
    categoryName: "Casa & Conforto",
    price: 98.50,
    oldPrice: 172.60,
    discount: "-90%",
    sold: "2.4k",
    rating: 4.9,
    reviews: 1280,
    image: "images/loja/panela-pressao-visor-trio.png",
    images: [
      "images/loja/panela-pressao-visor-trio.png",
      "images/loja/panela-pressao-visor-baunilha.jpg",
      "images/loja/panela-pressao-visor-cereja.jpg",
      "images/loja/panela-pressao-visor-grafite.png"
    ],
    colors: [
      "Baunilha 4,5L",
      "Cereja 4,5L",
      "Grafite 4,5L"
    ],
    colorImages: {
      "Baunilha 4,5L": "images/loja/panela-pressao-visor-baunilha.jpg",
      "Cereja 4,5L": "images/loja/panela-pressao-visor-cereja.jpg",
      "Grafite 4,5L": "images/loja/panela-pressao-visor-grafite.png"
    },
    modelBadges: {
      "Baunilha 4,5L": "Mais de 100 vendidos",
      "Cereja 4,5L": "Mais de 100 vendidos",
      "Grafite 4,5L": "Mais de 100 vendidos"
    },
    urgency: { viewers: "2.140", stock: "14" },
    badge: "Visor de Vidro",
    freeShipping: true,
    description: "Panela de Pressão com Visor de Vidro Grande Antiaderente 4,5L 6 Camadas de Alumínio Alta Durabilidade Cozimento Rápido e Seguro ENVIO IMEDIATO. Tampa com visor de vidro temperado transparente que permite acompanhar o cozimento dos alimentos sem abrir a panela. Revestimento antiaderente cerâmico interno e externo com 6 camadas que não gruda nada e facilita a limpeza. Cozimento ultra rápido com total segurança, cabo ergonômico antitérmico e trava de fechamento reforçada. Capacidade: 4,5 Litros."
  },  // ==========================================
  // SMARTPHONES & TABLETS
  // ==========================================
  {
    id: "iphone-18-pro-max",
    title: "Apple iPhone 18 Pro Max 256GB Bordô 6,9\" 48MP iOS 27 5G",
    category: "smartphones",
    categoryName: "Smartphone e Acessórios",
    price: 91.90,
    oldPrice: 11699.00,
    discount: "-99%",
    sold: "4.8k",
    rating: 4.9,
    reviews: 1420,
    image: "images/loja/iphone-18-bordo.png",
    images: [
      "images/loja/iphone-18-bordo.png",
      "images/loja/iphone-18-prateado.png",
      "images/loja/iphone-18-preto.png"
    ],
    colors: ["Bordô", "Prateado", "Preto"],
    colorImages: {
      "Bordô": "images/loja/iphone-18-bordo.png",
      "Prateado": "images/loja/iphone-18-prateado.png",
      "Preto": "images/loja/iphone-18-preto.png"
    },
    badge: "Mais Vendido",
    freeShipping: true,
    description: "Apple iPhone 18 Pro Max 256GB Bordô 6,9\" 48MP iOS 27 5G Original Lacrado com garantia oficial Apple. Disponível nas opções de cores Bordô, Prateado e Preto. Equipado com chip ultra avançado, tela OLED Super Retina XDR de 6,9 polegadas com ProMotion, corpo em titânio e sistema de câmeras profissionais quádruplas de 48MP com zoom periscópio 10x. Aparelho novo, 100% original e lacrado de fábrica. Envio imediato da Loja Oficial Shopping Brasil no TikTok Shop."
  },
  {
    id: "iphone-17-pro",
    title: "Apple iPhone 17 Pro Max 256GB - Tela 120Hz 5G Lacrado",
    category: "smartphones",
    categoryName: "Smartphone e Acessórios",
    price: 89.90,
    oldPrice: 9669.00,
    discount: "-99%",
    sold: "3.2k",
    rating: 4.9,
    reviews: 980,
    image: "images/loja/iphone-branco.webp",
    images: [
      "images/loja/iphone-branco.webp",
      "images/loja/iphone-laranja.webp",
      "images/loja/iphone-17-azul-intenso.jpg"
    ],
    colors: ["Prateado", "Laranja Cósmico", "Azul Intenso"],
    colorImages: {
      "Prateado": "images/loja/iphone-branco.webp",
      "Laranja Cósmico": "images/loja/iphone-laranja.webp",
      "Azul Intenso": "images/loja/iphone-17-azul-intenso.jpg"
    },
    badge: "Super Oferta",
    freeShipping: true,
    description: "Design ultrafino com acabamento aeroespacial. Câmera cinematográfica de 48MP com sensor avançado para fotos perfeitas em baixa luminosidade, tela com taxa de atualização adaptativa de 120Hz e bateria de longa duração."
  },
  {
    id: "iphone-16-rosa",
    title: "Apple iPhone 16 128GB Original Lacrado",
    category: "smartphones",
    categoryName: "Smartphone e Acessórios",
    price: 87.90,
    oldPrice: 4899.00,
    discount: "-98%",
    sold: "2.1k",
    rating: 4.9,
    reviews: 740,
    image: "images/loja/iphone-16-rosa.png",
    images: [
      "images/loja/iphone-16-rosa.png",
      "images/loja/iphone-16-verde.png",
      "images/loja/iphone-16-branco.png",
      "images/loja/iphone-16-preto.png",
      "images/loja/iphone-16-azul.png"
    ],
    colors: ["Rosa", "Verde", "Branco", "Preto", "Azul"],
    colorImages: {
      "Rosa": "images/loja/iphone-16-rosa.png",
      "Verde": "images/loja/iphone-16-verde.png",
      "Branco": "images/loja/iphone-16-branco.png",
      "Preto": "images/loja/iphone-16-preto.png",
      "Azul": "images/loja/iphone-16-azul.png"
    },
    badge: "Edição Especial",
    freeShipping: true,
    description: "Apple iPhone 16 128GB Original Lacrado com garantia oficial Apple. Disponível nas cores Rosa, Verde, Branco, Preto e Azul. Equipado com o novo chip A18 ultra rápido, inovador botão de Controle da Câmera, corpo resistente em alumínio aeroespacial com vidro traseiro colorido por infusão, tela Super Retina XDR e classificação IP68. Aparelho novo, 100% original e lacrado de fábrica."
  },
  {
    id: "iphone-15-pro-max",
    title: "Apple iPhone 15 Pro Max 256GB Titânio Natural 5G - Câmera Zoom 5x",
    category: "smartphones",
    categoryName: "Smartphone e Acessórios",
    price: 88.90,
    oldPrice: 4410.00,
    discount: "-98%",
    sold: "4.1k",
    rating: 4.9,
    reviews: 1890,
    image: "images/loja/iphone-15-pro-max-cores.png",
    images: [
      "images/loja/iphone-15-pro-max-cores.png",
      "images/loja/iphone-15-pro-max.webp",
      "images/loja/iphone-15-pro-max-branco-titanio.png",
      "images/loja/iphone-15-pro-max-azul-titanio.png",
      "images/loja/iphone-15-pro-max-preto-titanio.png"
    ],
    colors: ["Prata Titânio", "Branco Titânio", "Azul Titânio", "Preto Titânio"],
    colorImages: {
      "Prata Titânio": "images/loja/iphone-15-pro-max.webp",
      "Branco Titânio": "images/loja/iphone-15-pro-max-branco-titanio.png",
      "Azul Titânio": "images/loja/iphone-15-pro-max-azul-titanio.png",
      "Azul Titanium": "images/loja/iphone-15-pro-max-azul-titanio.png",
      "Preto Titânio": "images/loja/iphone-15-pro-max-preto-titanio.png",
      "Preto Titanium": "images/loja/iphone-15-pro-max-preto-titanio.png"
    },
    badge: "Recomendado",
    freeShipping: true,
    description: "Apple iPhone 15 Pro Max 256GB em estrutura de titânio aeroespacial super resistente e leve. Disponível nas cores Prata Titânio, Branco Titânio, Azul Titânio e Preto Titânio. Equipado com Chip A17 Pro de alto desempenho, tela Super Retina XDR com ProMotion de 120Hz, conector USB-C com velocidades ultra rápidas e avançado sistema de câmera teleobjetiva com zoom óptico de 5x."
  },
  {
    id: "xiaomi-18-pro-max",
    title: "Xiaomi 17 Pro Max 512GB 16GB RAM Versão Global - Câmera Leica com Mini Display Traseiro",
    category: "smartphones",
    categoryName: "Smartphone e Acessórios",
    price: 86.90,
    oldPrice: 10099.00,
    discount: "-99%",
    sold: "5.6k",
    rating: 5.0,
    reviews: 2130,
    image: "images/xiaomi-18-pro.jpg",
    images: [
      "images/xiaomi-18-pro.jpg"
    ],
    colors: [],
    badge: "Destaque Black",
    freeShipping: true,
    description: "Xiaomi 17 Pro Max com exclusivo display traseiro integrado para notificações e selfies Leica. Processador Snapdragon 8 Elite, carregamento hiper-rápido de 120W e tela AMOLED de 144Hz."
  },
  {
    id: "samsung-galaxy-s26-ultra",
    title: "Samsung Galaxy S26 Ultra 512GB 5G com Caneta S-Pen Integrada",
    category: "smartphones",
    categoryName: "Smartphone e Acessórios",
    price: 89.90,
    oldPrice: 6749.00,
    discount: "-99%",
    sold: "3.7k",
    rating: 4.9,
    reviews: 1240,
    image: "images/loja/samsung-s26-ultra-violeta.png",
    images: [
      "images/loja/samsung-s26-ultra-violeta.png",
      "images/loja/samsung-s26-ultra-prata.png",
      "images/loja/samsung-s26-ultra-azul.png",
      "images/loja/samsung-s26-ultra-branco.png",
      "images/loja/samsung-s26-ultra-puro.webp"
    ],
    colors: ["Violeta", "Prata", "Azul", "Branco", "Preto"],
    colorImages: {
      "Violeta": "images/loja/samsung-s26-ultra-violeta.png",
      "Prata": "images/loja/samsung-s26-ultra-prata.png",
      "Azul": "images/loja/samsung-s26-ultra-azul.png",
      "Branco": "images/loja/samsung-s26-ultra-branco.png",
      "Preto": "images/loja/samsung-s26-ultra-puro.webp"
    },
    badge: "Lançamento",
    freeShipping: true,
    description: "Samsung Galaxy S26 Ultra 512GB com inteligência artificial Galaxy AI completa em português. Disponível nas cores Violeta, Prata, Azul, Branco e Preto. Câmera de 200MP com zoom periscópio 100x Space Zoom, tela Dynamic AMOLED 2X antirreflexo, Caneta S-Pen integrada e bateria inteligente de 5000mAh."
  },
  {
    id: "ipad-11-geracao",
    title: "Apple iPad 11ª Geração Chip A16 Bionic Wi-Fi 128GB Tela Retina 11 Polegadas",
    category: "smartphones",
    categoryName: "Smartphone e Acessórios",
    price: 88.90,
    oldPrice: 6848.00,
    discount: "-99%",
    sold: "1.9k",
    rating: 4.9,
    reviews: 620,
    image: "images/loja/ipad-11-geracao.webp",
    images: [
      "images/loja/ipad-11-geracao.webp",
      "images/loja/ipad-11-amarelo.png",
      "images/loja/ipad-11-rosa.png",
      "images/loja/ipad-11-branco.png"
    ],
    colors: ["Azul", "Amarela", "Rosa", "Branco"],
    colorImages: {
      "Azul": "images/loja/ipad-11-geracao.webp",
      "Amarela": "images/loja/ipad-11-amarelo.png",
      "Rosa": "images/loja/ipad-11-rosa.png",
      "Branco": "images/loja/ipad-11-branco.png"
    },
    badge: "Oferta VIP",
    freeShipping: true,
    description: "Apple iPad 11ª Geração com potente chip Apple A16 Bionic, Wi-Fi de alta velocidade, 128GB e tela Liquid Retina de 11 polegadas. Disponível nas elegantes cores Azul, Amarela, Rosa e Branco. Perfeito para estudos, trabalho, criação e entretenimento com bateria para o dia todo."
  },
  {
    id: "tablet-t17-pro",
    title: "Tablet 2026 T17 Pro Max Tela 12\" 2K 256GB com Teclado Magnético e Caneta",
    category: "smartphones",
    categoryName: "Smartphone e Acessórios",
    price: 85.90,
    oldPrice: 1899.00,
    discount: "-95%",
    sold: "2.8k",
    rating: 4.8,
    reviews: 890,
    image: "images/loja/2026 tablet t17 pro max.jpg",
    images: [
      "images/loja/2026 tablet t17 pro max.jpg",
      "images/loja/tablet-t17-azul.png",
      "images/loja/tablet-t17-prata.png",
      "images/loja/tablet-t17-cinza.png"
    ],
    colors: ["Laranjado", "Azul Marinho", "Prata", "Cinza Espacial"],
    colorImages: {
      "Laranjado": "images/loja/2026 tablet t17 pro max.jpg",
      "Azul Marinho": "images/loja/tablet-t17-azul.png",
      "Prata": "images/loja/tablet-t17-prata.png",
      "Cinza Espacial": "images/loja/tablet-t17-cinza.png"
    },
    badge: "Kit Completo",
    freeShipping: true,
    description: "Tablet 2026 T17 Pro Max com tela ampla 2K de alta definição. Disponível nas opções de cores Laranjado, Azul Marinho, Prata e Cinza Espacial. Kit completo que acompanha teclado magnético Bluetooth e caneta touch inteligente. Ideal para trabalho, estudos, jogos e entretenimento."
  },

  // ==========================================
  // INFORMÁTICA & GAMES
  // ==========================================
  {
    id: "macbook-air-m5",
    title: "Apple MacBook Air 13 Polegadas Chip M5 Liquid Retina 512GB SSD 16GB RAM",
    category: "informatica",
    categoryName: "PC Gamer",
    price: 91.90,
    oldPrice: 3300.00,
    discount: "-97%",
    sold: "1.4k",
    rating: 5.0,
    reviews: 670,
    image: "images/loja/macbook-air-m5-cores.png",
    images: [
      "images/loja/macbook-air-m5-cores.png",
      "images/loja/macbook-air-m5-sky-blue.png",
      "images/loja/macbook-air-m5-silver.png",
      "images/loja/macbook-air-m5-starlight.png",
      "images/loja/macbook-air-m5-midnight.png"
    ],
    colors: ["Sky Blue", "Silver", "Starlight", "Midnight"],
    colorImages: {
      "Sky Blue": "images/loja/macbook-air-m5-sky-blue.png",
      "sky blue": "images/loja/macbook-air-m5-sky-blue.png",
      "Silver": "images/loja/macbook-air-m5-silver.png",
      "silver": "images/loja/macbook-air-m5-silver.png",
      "Starlight": "images/loja/macbook-air-m5-starlight.png",
      "starlight": "images/loja/macbook-air-m5-starlight.png",
      "Midnight": "images/loja/macbook-air-m5-midnight.png",
      "midnight": "images/loja/macbook-air-m5-midnight.png"
    },
    badge: "Destaque",
    freeShipping: true,
    description: "Apple MacBook Air 13 polegadas com o poderoso Chip Apple M5, tela Liquid Retina de alta resolução, 512GB SSD e 16GB de memória unificada. Disponível nas elegantes cores Sky Blue, Silver, Starlight e Midnight. Design ultrafino, silencioso sem ventoinhas e autonomia de bateria incomparável."
  },
  {
    id: "notebook-acer-nitro",
    title: "Notebook Gamer Acer Nitro V 15 ANV15-51-74GZ Intel Core i7 RTX 4060 16GB 512GB SSD",
    category: "informatica",
    categoryName: "PC Gamer",
    price: 91.50,
    oldPrice: 3250.00,
    discount: "-97%",
    sold: "2.3k",
    rating: 4.9,
    reviews: 940,
    image: "images/loja/notebook-acer-puro.webp",
    images: [
      "images/loja/notebook-acer-puro.webp",
      "images/loja/notebook-acer-nitro-2.png",
      "images/loja/notebook-acer-nitro-3.png"
    ],
    colors: [],
    badge: "Gamer Pro",
    freeShipping: true,
    description: "Máquina de guerra para rodar todos os jogos atuais no Ultra com Ray Tracing e DLSS 3.5. Teclado retroiluminado RGB e refrigeração dupla com tecnologia CoolBoost."
  },
  {
    id: "cpu-gamer-aquario",
    title: "Computador PC Gamer CPU Aquário Vidro Temperado RGB Intel i7 + GeForce RTX 32GB RAM",
    category: "informatica",
    categoryName: "PC Gamer",
    price: 92.00,
    oldPrice: 3300.00,
    discount: "-97%",
    sold: "1.8k",
    rating: 5.0,
    reviews: 820,
    image: "images/loja/cpu gamer.webp",
    images: [
      "images/loja/cpu gamer.webp",
      "images/loja/cpu gamer preto.webp"
    ],
    colors: ["Gabinete Aquário Branco", "Gabinete Aquário Preto"],
    colorImages: {
      "Gabinete Aquário Branco": "images/loja/cpu gamer.webp",
      "Gabinete Aquário Preto": "images/loja/cpu gamer preto.webp"
    },
    badge: "Top 1 Vendas",
    freeShipping: true,
    description: "O clássico gabinete Aquário com visão panorâmica de vidro temperado e 9 fans RGB controláveis por controle remoto. SSD NVMe ultra veloz de 1TB e fonte 750W 80 Plus Gold."
  },
  {
    id: "monitor-gamer-curvo",
    title: "Monitor Gamer Curvo 27 Polegadas 165Hz 1ms Full HD HDR FreeSync com LED Traseiro",
    category: "informatica",
    categoryName: "PC Gamer",
    price: 87.50,
    oldPrice: 1899.00,
    discount: "-95%",
    sold: "3.4k",
    rating: 4.9,
    reviews: 1150,
    image: "images/loja/monitor-gamer-puro.webp",
    images: [
      "images/loja/monitor-gamer-puro.webp"
    ],
    colors: [],
    badge: "Mais Vendido",
    freeShipping: true,
    description: "Imersão total com curvatura 1500R. Taxa de atualização fluida de 165Hz para zero travamento ou tearing em jogos competitivos. Conexões HDMI e DisplayPort."
  },
  {
    id: "cadeira-gamer-reclinavel",
    title: "Cadeira Gamer Ergonômica Reclinável 180° com Almofadas Lombar e Cervical",
    category: "informatica",
    categoryName: "PC Gamer",
    price: 88.90,
    oldPrice: 1999.00,
    discount: "-96%",
    sold: "4.2k",
    rating: 4.8,
    reviews: 1390,
    image: "images/loja/cadeira-gamer-preto-vermelho.png",
    images: [
      "images/loja/cadeira-gamer-preto-vermelho.png",
      "images/loja/cadeira-gamer-preto-rosa.png",
      "images/loja/cadeira-gamer-preto-roxo.png",
      "images/loja/cadeira gamer.jpg",
      "images/loja/cadeira gamer.webp"
    ],
    colors: ["Preta com Vermelha", "Preta com Rosa", "Preta com Roxa", "Branca com Preta", "Cinza com Preta"],
    colorImages: {
      "Preta com Vermelha": "images/loja/cadeira-gamer-preto-vermelho.png",
      "Preta com Vermelho": "images/loja/cadeira-gamer-preto-vermelho.png",
      "Preta com Rosa": "images/loja/cadeira-gamer-preto-rosa.png",
      "Rosa com Preta": "images/loja/cadeira-gamer-preto-rosa.png",
      "Preta com Roxa": "images/loja/cadeira-gamer-preto-roxo.png",
      "Roxa com Preta": "images/loja/cadeira-gamer-preto-roxo.png",
      "Branca com Preta": "images/loja/cadeira gamer.jpg",
      "Cinza com Preta": "images/loja/cadeira gamer.webp"
    },
    badge: "Ergonômica",
    freeShipping: true,
    description: "Conforto absoluto para longas sessões de gameplay ou home office. Disponível nas cores Preta com Vermelha, Preta com Rosa, Preta com Roxa, Branca com Preta e Cinza com Preta. Inclui almofadas ergonômicas lombar e cervical, reclinação de até 180°, apoio de braço ajustável, base reforçada e revestimento premium."
  },
  {
    id: "teclado-gamer-branco",
    title: "Teclado Mecânico Gamer Branco Switch Rainbow + Combo Mouse Gamer RGB",
    category: "informatica",
    categoryName: "PC Gamer",
    price: 79.90,
    oldPrice: 799.00,
    discount: "-90%",
    sold: "6.8k",
    rating: 4.9,
    reviews: 2450,
    image: "images/loja/teclado-gamer-branco-puro.webp",
    images: [
      "images/loja/teclado-gamer-branco-puro.webp",
      "images/loja/teclado gamer mais malze.webp"
    ],
    colors: ["Branco Neve RGB", "Combo Preto RGB"],
    colorImages: {
      "Branco Neve RGB": "images/loja/teclado-gamer-branco-puro.webp",
      "Combo Preto RGB": "images/loja/teclado gamer mais malze.webp"
    },
    badge: "Combo Gamer",
    freeShipping: true,
    description: "Switch mecânico de alta precisão com clique tátil e resposta rápida de 1ms. Teclas com tecnologia double-shot anti-ghosting em todas as teclas."
  },
  {
    id: "headset-fone-gamer",
    title: "Headset Fone Gamer PC com Microfone Antirruído e Graves Profundos 7.1",
    category: "informatica",
    categoryName: "PC Gamer",
    price: 69.90,
    oldPrice: 699.00,
    discount: "-90%",
    sold: "5.1k",
    rating: 4.8,
    reviews: 1720,
    image: "images/loja/fone-gamer-puro.webp",
    images: [
      "images/loja/fone-gamer-puro.webp",
      "images/loja/headset-gamer-driver50mm.png",
      "images/loja/headset-gamer-microfone.png",
      "images/loja/headset-gamer-compatibilidade.png",
      "images/loja/headset-gamer-caixa.png"
    ],
    colors: [],
    badge: "Áudio 7.1",
    freeShipping: true,
    description: "Som surround 7.1 imersivo com drivers de 50mm de alta performance e microfone antirruído ajustável. Compatível com PC, Mac, consoles e smartphones. Almofadas de espuma com memória que se adaptam ao formato da orelha sem esquentar e cabo reforçado."
  },
    {
    id: "caixa-de-som-bluetooth-potente",
    title: "Caixa de Som Portátil Bluetooth JBL Xtreme Potente À Prova D'Água IPX7",
    category: "smartphones",
    categoryName: "Smartphone e Acessórios",
    price: 89.90,
    oldPrice: 1999.00,
    discount: "-95%",
    sold: "3.9k",
    rating: 4.9,
    reviews: 1320,
    image: "images/loja/jbl-preta.png",
    images: [
      "images/loja/jbl-preta.png",
      "images/loja/jbl-branca.png",
      "images/loja/jbl-azul.png",
      "images/loja/jbl-camuflada.png",
      "images/loja/jbl-laranjada.png",
      "images/loja/jbl-marrom.png",
      "images/loja/jbl-roxa.png"
    ],
    colors: ["Preto Básico", "Branca", "Azul Marinho", "Camuflada Militar", "Laranjada", "Marrom", "Roxa"],
    colorImages: {
      "Preto Básico": "images/loja/jbl-preta.png",
      "Branca": "images/loja/jbl-branca.png",
      "Azul Marinho": "images/loja/jbl-azul.png",
      "Camuflada Militar": "images/loja/jbl-camuflada.png",
      "Laranjada": "images/loja/jbl-laranjada.png",
      "Marrom": "images/loja/jbl-marrom.png",
      "Roxa": "images/loja/jbl-roxa.png"
    },
    badge: "Som Pesado",
    freeShipping: true,
    description: "Caixa de som JBL Xtreme potente com conexão Bluetooth de alta fidelidade, graves profundos com radiadores passivos duplos, bateria recarregável com até 15 horas de reprodução contínua e certificação à prova d'água IPX7."
  },
  {
    id: "caixa-amplificada-hz2000",
    title: "Caixa de Som Amplificada Torre HZ-2000 Grande e Forte com Bluetooth e LED",
    category: "smartphones",
    categoryName: "Smartphone e Acessórios",
    price: 89.90,
    oldPrice: 2499.00,
    discount: "-96%",
    sold: "1.6k",
    rating: 5.0,
    reviews: 580,
    image: "images/loja/caixa-amplificada-pura.webp",
    images: [
      "images/loja/caixa-amplificada-pura.webp"
    ],
    colors: [],
    badge: "Festa & Churrasco",
    freeShipping: true,
    description: "Potência sonora descomunal para festas e churrascos. Entrada para 2 microfones com função karaokê, rádio FM, USB e luzes LED rítmicas."
  },
  {
    id: "central-multimidia-carro",
    title: "Central Multimídia Automotiva 7\" Touchscreen com Apple CarPlay e Android Auto",
    category: "smartphones",
    categoryName: "Smartphone e Acessórios",
    price: 86.90,
    oldPrice: 1499.00,
    discount: "-94%",
    sold: "2.5k",
    rating: 4.8,
    reviews: 870,
    image: "images/loja/central-multimidia-pura.webp",
    images: [
      "images/loja/central-multimidia-pura.webp"
    ],
    colors: [],
    badge: "CarPlay & Android",
    freeShipping: true,
    description: "Conexão sem fio para Waze, Google Maps, Spotify e WhatsApp na tela do seu carro. Acompanha câmera de ré com visão noturna."
  },
  {
    id: "smartwatch-ultra-serie9",
    title: "Smartwatch Ultra Série 9 Tela AMOLED 2.2\" com NFC, Faz Chamadas e Monitor Cardíaco",
    category: "smartphones",
    categoryName: "Smartphone e Acessórios",
    price: 86.90,
    oldPrice: 899.00,
    discount: "-90%",
    sold: "8.9k",
    rating: 4.9,
    reviews: 3410,
    image: "images/loja/smartwatch-ultra-laranjada.png",
    images: [
      "images/loja/smartwatch-ultra-laranjada.png",
      "images/loja/smartwatch-ultra-preta.png",
      "images/loja/smartwatch-ultra-rosa.png",
      "images/loja/smartwatch-ultra-branca.png"
    ],
    colors: ["Laranjada", "Preta", "Rosa", "Branca"],
    colorImages: {
      "Laranjada": "images/loja/smartwatch-ultra-laranjada.png",
      "Laranja": "images/loja/smartwatch-ultra-laranjada.png",
      "Preta": "images/loja/smartwatch-ultra-preta.png",
      "Rosa": "images/loja/smartwatch-ultra-rosa.png",
      "Branca": "images/loja/smartwatch-ultra-branca.png"
    },
    badge: "Mais Vendido",
    freeShipping: true,
    description: "Caixa robusta de 49mm com botão de ação personalizável. Disponível nas cores Laranjada, Preta, Rosa e Branca. Tela AMOLED infinita de 2.2\", faz e recebe ligações, monitor cardíaco, oxímetro, mais de 100 modos de esportes e resistência à água."
  },
  {
    id: "projetor-portatil-4k",
    title: "Projetor Portátil 4K Magcubic Smart com Foco Automático Wi-Fi e Bluetooth",
    category: "casa",
    categoryName: "Casa & Conforto",
    price: 86.90,
    oldPrice: 1599.00,
    discount: "-95%",
    sold: "4.3k",
    rating: 4.9,
    reviews: 1650,
    image: "images/loja/projetor-4k-puro.webp",
    images: [
      "images/loja/projetor-4k-puro.webp",
      "images/loja/projetor-4k-familia.png",
      "images/loja/projetor-4k-cinema.png",
      "images/loja/projetor-4k-estudo.png",
      "images/loja/projetor-4k-compacto.jpg"
    ],
    colors: [],
    badge: "Cinema em Casa",
    freeShipping: true,
    description: "Transforme sua parede em uma tela de cinema de até 150 polegadas. Foco automático inteligente, rotação de 180°, Android TV integrado para Netflix, YouTube, Prime e Disney+ direto do projetor."
  },
  {
    id: "camera-seguranca-wifi",
    title: "Câmera de Segurança Wi-Fi IP Lente Dupla 360° com Visão Noturna Colorida",
    category: "smartphones",
    categoryName: "Smartphone e Acessórios",
    price: 79.90,
    oldPrice: 799.00,
    discount: "-90%",
    sold: "3.1k",
    rating: 4.8,
    reviews: 910,
    image: "images/loja/camera-wifi-pura.webp",
    images: [
      "images/loja/camera-wifi-pura.webp"
    ],
    colors: [],
    badge: "Segurança Total",
    freeShipping: true,
    description: "Duas lentes independentes: uma fixa para visão panorâmica e uma móvel PTZ 360°. Alerta no celular ao detectar movimento humano e áudio bidirecional."
  },
  {
    id: "carregador-turbo-67w",
    title: "Carregador Turbo Power 67W USB-C GaN Rápido para iPhone, Xiaomi e Notebook",
    category: "smartphones",
    categoryName: "Smartphone e Acessórios",
    price: 19.90,
    oldPrice: 399.00,
    discount: "-95%",
    sold: "7.4k",
    rating: 4.9,
    reviews: 2890,
    image: "images/loja/carregador-turbo-puro.webp",
    images: [
      "images/loja/carregador-turbo-puro.webp"
    ],
    colors: [],
    badge: "Carregamento Rápido",
    freeShipping: true,
    description: "Tecnologia de Nitreto de Gálio (GaN) que carrega até 3x mais rápido sem superaquecer. Carrega 50% da bateria de um iPhone em apenas 20 minutos."
  },

  // ==========================================
  // ELETRODOMÉSTICOS & COZINHA (Fotos Exclusivas e Limpas)
  // ==========================================
  {
    id: "ventilador-turbo-laranja",
    title: "Ventilador de Mesa Ventisol 50cm 135W 6 Pás Motor Turbo",
    category: "eletro",
    categoryName: "Eletrodomésticos",
    price: 49.90,
    oldPrice: 699.00,
    discount: "-93%",
    sold: "6.9k",
    rating: 4.8,
    reviews: 2670,
    image: "images/loja/ventilador-ventisol-50cm-1.png",
    images: [
      "images/loja/ventilador-ventisol-50cm-1.png",
      "images/loja/ventilador-ventisol-50cm-2.png"
    ],
    colors: [],
    voltages: ["127V", "220V"],
    badge: "Ventisol 50cm",
    freeShipping: true,
    description: "Ventilador de Mesa Ventisol 50cm 135W 6 Pás Motor Turbo. Equipado com hélice alaranjada de 6 pás de alta aerodinâmica, motor turbo de 135W potente e super silencioso, 3 velocidades, oscilação horizontal automática e inclinação regulável com grade segura de fácil limpeza. Disponível nas voltagens 127V e 220V."
  },
  {
    id: "ventilador-turbo-grandao",
    title: "Ventilador Turbo 50cm Grande e Potente 8 Pás Silencioso Coluna e Mesa",
    category: "eletro",
    categoryName: "Eletrodomésticos",
    price: 49.90,
    oldPrice: 799.00,
    discount: "-94%",
    sold: "4.5k",
    rating: 4.9,
    reviews: 1840,
    image: "images/loja/ventilador-turbo-preto-1.png",
    images: [
      "images/loja/ventilador-turbo-preto-1.png",
      "images/loja/ventilador-turbo-preto-2.png",
      "images/loja/ventilador-turbo-dourado-1.png",
      "images/loja/ventilador-turbo-dourado-2.jpg"
    ],
    colors: ["Preto", "Dourado"],
    colorImages: {
      "Preto": "images/loja/ventilador-turbo-preto-1.png",
      "Dourado": "images/loja/ventilador-turbo-dourado-1.png"
    },
    voltages: ["127V", "220V"],
    badge: "Controle Remoto",
    freeShipping: true,
    description: "Ventilador Turbo 50cm Grande e Potente 8 Pás Silencioso Coluna e Mesa. Acompanha controle remoto inteligente com tecnologia Chronos (timer programável e ajuste de velocidade), coluna com altura regulável, oscilação horizontal e inclinação vertical. Motor turbo de alta eficiência e fluxo de ar maciço para ambientes amplos. Disponível nas cores Preto e Dourado, nas voltagens 127V e 220V."
  },
  {
    id: "air-fryer-electrolux",
    title: "Fritadeira Air Fryer Forno Oven 12L Mondial",
    category: "eletro",
    categoryName: "Eletrodomésticos",
    price: 87.90,
    oldPrice: 1899.00,
    discount: "-95%",
    sold: "6.2k",
    rating: 5.0,
    reviews: 2490,
    image: "images/loja/air-fryer-oven-mondial-1.png",
    images: [
      "images/loja/air-fryer-oven-mondial-1.png",
      "images/loja/air-fryer-oven-mondial-2.png",
      "images/loja/air-fryer-oven-mondial-3.png"
    ],
    colors: ["Preto Inox"],
    colorImages: {
      "Preto Inox": "images/loja/air-fryer-oven-mondial-1.png"
    },
    voltages: ["127V", "220V"],
    badge: "Mondial Oven 12L",
    freeShipping: true,
    description: "Fritadeira Air Fryer Forno Oven 12L Mondial. O produto 2 em 1 que combina a praticidade da air fryer com a versatilidade do forno, com capacidade total de 12 litros para grandes porções. Painel digital touch com funções pré-programadas, controle de temperatura de até 200°C, timer sonoro com desligamento automático, porta de vidro ampla com iluminação interna e acabamento sofisticado em inox. Acompanha assadeiras e cesto antiaderente. Disponível nas voltagens 127V e 220V."
  },
  {
    id: "liquidificador-oster-1400w",
    title: "Liquidificador Oster OLIQ610 1400w Full 3,2L Cor Preto",
    category: "eletro",
    categoryName: "Eletrodomésticos",
    price: 79.90,
    oldPrice: 1799.00,
    discount: "-96%",
    sold: "4.7k",
    rating: 4.9,
    reviews: 1820,
    image: "images/loja/liquidificador-oster-frente.png",
    images: [
      "images/loja/liquidificador-oster-frente.png",
      "images/loja/liquidificador-oster-full.webp",
      "images/loja/liquidificador-oster-laminas.png",
      "images/loja/liquidificador-oster-tampa.png"
    ],
    colors: ["Preto"],
    colorImages: {
      "Preto": "images/loja/liquidificador-oster-frente.png"
    },
    voltages: ["127V", "220V"],
    badge: "Oster 1400W",
    freeShipping: true,
    description: "Liquidificador Oster OLIQ610 1400w Full 3,2L Cor Preto. Motor potente de 1400W ultra resistente, copo com capacidade de 3,2 litros antimicrobiano, 15 velocidades mais função pulsar e lâminas em aço inox de alta performance que trituram os ingredientes mais duros e gelo com facilidade. Disponível nas voltagens 127V e 220V."
  },
  {
    id: "cafeteira-espresso-loja",
    title: "Cafeteira Cápsulas Mini Me, Delta Q, Automática",
    category: "eletro",
    categoryName: "Eletrodomésticos",
    price: 79.90,
    oldPrice: 1699.00,
    discount: "-95%",
    sold: "3.6k",
    rating: 4.9,
    reviews: 1470,
    image: "images/loja/cafeteira-delta-q-cinza-1.png",
    images: [
      "images/loja/cafeteira-delta-q-cinza-1.png",
      "images/loja/cafeteira-delta-q-cinza-2.png",
      "images/loja/cafeteira-delta-q-vermelha-1.png",
      "images/loja/cafeteira-delta-q-vermelha-2.png",
      "images/loja/cafeteira-delta-q-vermelha-3.png"
    ],
    colors: ["Cinza", "Vermelha"],
    colorImages: {
      "Cinza": "images/loja/cafeteira-delta-q-cinza-1.png",
      "Vermelha": "images/loja/cafeteira-delta-q-vermelha-1.png"
    },
    voltages: ["127V", "220V"],
    badge: "Delta Q Miniqool",
    freeShipping: true,
    description: "Cafeteira Cápsulas Miniqool Delta Q. Moderna, prática e ultracompacta para extrair o café espresso perfeito com cremosidade e aroma inconfundíveis. Possui botões de extração para doses curtas e longas, bandeja ajustável e reservatório prático. Disponível nas cores Cinza e Vermelha, nas voltagens 127V e 220V."
  },
  {
    id: "microondas-inox-loja",
    title: "Forno Micro-ondas 20L com Porta Espelhada",
    category: "eletro",
    categoryName: "Eletrodomésticos",
    price: 85.90,
    oldPrice: 1899.00,
    discount: "-95%",
    sold: "3.3k",
    rating: 4.8,
    reviews: 1250,
    image: "images/loja/microondas-inox-1.png",
    images: [
      "images/loja/microondas-inox-1.png",
      "images/loja/microondas-inox-2.png",
      "images/loja/microondas-cinza-1.png",
      "images/loja/microondas-cinza-2.png"
    ],
    colors: ["Inox", "Cinza"],
    colorImages: {
      "Inox": "images/loja/microondas-inox-1.png",
      "Cinza": "images/loja/microondas-cinza-1.png"
    },
    voltages: ["127V", "220V"],
    badge: "20 Litros",
    freeShipping: true,
    description: "Forno Micro-ondas 20L com Porta Espelhada. Design moderno com porta espelhada, puxador integrado e painel digital completo. Disponível nas cores Inox e Cinza, nas voltagens 127V e 220V. Funções pré-programadas de descongelar por peso, auto clean e menu especial para o dia a dia."
  },
  {
    id: "ar-condicionado-split-inverter",
    title: "Ar Condicionado Aiwa Aws-ac-9f Inverter 9.000 Btus 220v Frio",
    category: "eletro",
    categoryName: "Eletrodomésticos",
    price: 89.90,
    oldPrice: 3250.00,
    discount: "-97%",
    sold: "2.7k",
    rating: 4.9,
    reviews: 1140,
    image: "images/loja/ar-condicionado-aiwa-conjunto.png",
    images: [
      "images/loja/ar-condicionado-aiwa-conjunto.png",
      "images/loja/ar-condicionado-controle.webp",
      "images/loja/ar-condicionado-aiwa-unidade-frontal.png",
      "images/loja/ar-condicionado-aiwa-unidade-angular.png",
      "images/loja/ar-condicionado-aiwa-condensadora.png"
    ],
    colors: ["Branca"],
    colorImages: {
      "Branca": "images/loja/ar-condicionado-aiwa-conjunto.png"
    },
    voltages: ["220V"],
    soldOutVoltages: ["127V"],
    badge: "Aiwa Inverter 9.000",
    freeShipping: true,
    description: "Ar Condicionado Aiwa Aws-ac-9f Inverter 9.000 Btus 220v Frio. Tecnologia Inverter com alta eficiência energética e baixo consumo, resfriamento rápido, operação ultra silenciosa e filtro de ar de alta densidade antibacteriano. Acompanha controle remoto inteligente multifuncional e unidade externa condensadora protegida. Cor única branca, disponível na voltagem 220V (127V esgotada)."
  },
  {
    id: "fogao-cooktop-5-bocas",
    title: "Cooktop a Gás Fischer 5 Bocas Fit Line Trempe Esmaltada Aramado",
    category: "eletro",
    categoryName: "Eletrodomésticos",
    price: 86.90,
    oldPrice: 2499.00,
    discount: "-97%",
    sold: "2.4k",
    rating: 4.8,
    reviews: 930,
    image: "images/loja/cooktop-fischer-1.png",
    images: [
      "images/loja/cooktop-fischer-1.png",
      "images/loja/cooktop-fischer-2.png",
      "images/loja/cooktop-fischer-3.png"
    ],
    colors: ["Preto"],
    colorImages: {
      "Preto": "images/loja/cooktop-fischer-1.png"
    },
    voltages: ["Bivolt (127V / 220V)"],
    badge: "Fischer Fit Line",
    freeShipping: true,
    description: "Cooktop a Gás Fischer 5 Bocas Fit Line Trempe Esmaltada Aramado. Mesa de vidro temperado preto de alta resistência e fácil limpeza, trempes esmaltadas com design aramado exclusivo para máxima estabilidade das panelas, acendimento superautomático direto no botão e queimadores de alto rendimento. Bivolt e compatível com gás GLP ou gás natural (GN). Praticidade, segurança e design sofisticado para sua cozinha."
  },
  {
    id: "maquina-lava-e-seca-12kg",
    title: "Lavadora Compacta Electrolux 12kg Lac12 127V",
    category: "eletro",
    categoryName: "Eletrodomésticos",
    price: 89.90,
    oldPrice: 3300.00,
    discount: "-97%",
    sold: "1.9k",
    rating: 4.9,
    reviews: 810,
    image: "images/loja/lavadora-electrolux-12kg-1.png",
    images: [
      "images/loja/lavadora-electrolux-12kg-1.png",
      "images/loja/lavadora-electrolux-12kg-2.png",
      "images/loja/lavadora-electrolux-12kg-3.png",
      "images/loja/lavadora-electrolux-12kg-4.png"
    ],
    colors: ["Branca"],
    colorImages: {
      "Branca": "images/loja/lavadora-electrolux-12kg-1.png",
      "Inox Branca": "images/loja/lavadora-electrolux-12kg-1.png"
    },
    voltages: ["127V"],
    badge: "Electrolux 12kg",
    freeShipping: true,
    description: "Lavadora Compacta Electrolux 12kg Inox Lac12 127v. Cesto inox de alta durabilidade com tecnologia Diluição Inteligente, dispenser autolimpante, ciclo turbo lavagem e programas especiais para cuidar das suas roupas com máxima eficiência e economia de água."
  },
  {
    id: "batedeira-planetaria-philco",
    title: "Batedeira Planetária Britânia BBP750 Turbo Preta com 3 Batedores",
    category: "eletro",
    categoryName: "Eletrodomésticos",
    price: 69.90,
    oldPrice: 1699.00,
    discount: "-96%",
    sold: "2.9k",
    rating: 4.8,
    reviews: 1110,
    image: "images/loja/batedeira-planetaria-turbo-1.png",
    images: [
      "images/loja/batedeira-planetaria-turbo-1.png",
      "images/loja/batedeira-planetaria-turbo-2.png",
      "images/loja/batedeira-planetaria-turbo-3.png",
      "images/loja/batedeira-planetaria-turbo-4.png"
    ],
    colors: ["Preta"],
    colorImages: {
      "Preta": "images/loja/batedeira-planetaria-turbo-1.png"
    },
    voltages: ["127V", "220V"],
    badge: "Planetária Turbo",
    freeShipping: true,
    description: "Batedeira Planetária Britânia BBP750 Turbo Preta. Alta performance e robustez com movimento planetário para misturas homogêneas sem desperdício. Tigela de alta capacidade com tampa antirrespingo e bocal dosador, controle de velocidades mais função turbo. Acompanha 3 batedores exclusivos para massas leves, pães/massas pesadas e claras em neve. Disponível nas voltagens 127V e 220V."
  },
  {
    id: "chuveiro-lorenzetti-7800w",
    title: "Chuveiro Elétrico Lorenzetti Acqua Duo Ultra 7800W Eletrônico Preto Fosco",
    category: "eletro",
    categoryName: "Eletrodomésticos",
    price: 79.90,
    oldPrice: 1809.00,
    discount: "-96%",
    sold: "5.3k",
    rating: 4.9,
    reviews: 2150,
    image: "images/loja/chuveiro-lorenzetti-puro.jpg",
    images: [
      "images/loja/chuveiro-lorenzetti-puro.jpg",
      "images/loja/chuveiro-lorenzetti-jato-agua.png"
    ],
    colors: [],
    badge: "Ducha & Chuveiro",
    freeShipping: true,
    description: "Design moderno com acabamento preto com cromado. Tecnologia exclusiva Press Plus para jatos fortes mesmo com pouca pressão de água. Regulagem eletrônica de temperatura gradual."
  },
  {
    id: "smart-tv-75-polegadas-4k",
    title: "Smart TV 75 Polegadas QLED 4K HDR10+ Comando de Voz Alexa Integrado e Borda Infinita",
    category: "eletro",
    categoryName: "Eletrodomésticos",
    price: 91.90,
    oldPrice: 3300.00,
    discount: "-97%",
    sold: "15k",
    rating: 5.0,
    reviews: 780,
    image: "images/loja/smart-tv-qled-pura.jpg",
    images: [
      "images/loja/smart-tv-qled-pura.jpg",
      "images/loja/smart-tv-75-ambiente.png",
      "images/loja/smart-tv-75-medidas.png"
    ],
    colors: [],
    badge: "Tela Gigante 75\"",
    freeShipping: true,
    description: "Painel QLED com 1 bilhão de cores e contraste impecável. Áudio Dolby Atmos com sensação de cinema, comando de voz pelo controle remoto e conexões HDMI 2.1 para consoles."
  },
  {
    id: "geladeira-frost-free-duplex",
    title: "Geladeira Brastemp Frost Free 559 Litros French Door - BRO85ME",
    category: "eletro",
    categoryName: "Eletrodomésticos",
    price: 91.90,
    oldPrice: 3300.00,
    discount: "-97%",
    sold: "1.5k",
    rating: 4.9,
    reviews: 690,
    image: "images/loja/geladeira-brastemp-branca.png",
    images: [
      "images/loja/geladeira-brastemp-branca.png",
      "images/loja/geladeira-brastemp-inox-medidas.png",
      "images/loja/geladeira-brastemp-preta.png",
      "images/loja/geladeira-brastemp-aberta-alimentos.png"
    ],
    colors: ["Branca", "Inox", "Preta"],
    soldOutColors: ["Cinza"],
    colorImages: {
      "Branca": "images/loja/geladeira-brastemp-branca.png",
      "Inox": "images/loja/geladeira-brastemp-inox-medidas.png",
      "Preta": "images/loja/geladeira-brastemp-preta.png"
    },
    voltages: ["127V", "220V"],
    badge: "Brastemp 559L",
    freeShipping: true,
    description: "Geladeira Brastemp Frost Free 559 Litros French Door - BRO85ME. Disponível nas cores Branca, Inox e Preta (cor Cinza esgotada), com opções de voltagem 127V e 220V. Design French Door com freezer na parte inferior, tecnologia Inverter de alta economia de energia, painel digital touch e acabamento premium."
  },
  {
    id: "maquina-lava-loucas-inox",
    title: "Lava-Louças Brastemp 14 Serviços Inox Com Smart Sensor - BLF60AR",
    category: "eletro",
    categoryName: "Eletrodomésticos",
    price: 88.90,
    oldPrice: 3200.00,
    discount: "-97%",
    sold: "1.1k",
    rating: 4.8,
    reviews: 520,
    image: "images/loja/lava-loucas-inox-1.png",
    images: [
      "images/loja/lava-loucas-inox-1.png",
      "images/loja/lava-loucas-inox-2.png",
      "images/loja/lava-loucas-branca-1.png",
      "images/loja/lava-loucas-branca-2.png"
    ],
    colors: ["Inox", "Branca"],
    colorImages: {
      "Inox": "images/loja/lava-loucas-inox-1.png",
      "Branca": "images/loja/lava-loucas-branca-1.png"
    },
    voltages: ["127V", "220V"],
    badge: "Brastemp 14 Serviços",
    freeShipping: true,
    description: "Lava-Louças Brastemp 14 Serviços Inox Com Smart Sensor - BLF60AR. Tecnologia avançada Smart Sensor que identifica o nível de sujeira das louças e programa o ciclo ideal com máxima economia de água e energia. Conta com ciclo higienização que elimina até 99,9% dos germes e bactérias, cesto exclusivo para talheres e painel touch intuitivo. Disponível nas cores Inox e Branca, nas voltagens 127V e 220V."
  },

  // ==========================================
  // CASA, MÓVEIS & CONFORTO
  // ==========================================
  {
    id: "sofa-retratil-reclinavel",
    title: "Sofá Retrátil e Reclinável 3,82m em Veludo com Molas Ensacadas e Espuma D33",
    category: "casa",
    categoryName: "Casa & Conforto",
    price: 91.90,
    oldPrice: 2999.00,
    discount: "-97%",
    sold: "820",
    rating: 5.0,
    reviews: 310,
    image: "images/loja/sofa-retratil-puro.jpg",
    images: [
      "images/loja/sofa-retratil-puro.jpg",
      "images/loja/sofa-retratil-ambiente-sala.png",
      "images/loja/sofa-retratil-aberto-modulos.png"
    ],
    colors: [],
    badge: "Mega Conforto",
    freeShipping: true,
    description: "Conforto digno de cinema com 3,82m de largura. Assentos retráteis com abertura suave de até 1,80m e encosto reclinável com 5 estágios. Tecido veludo soft toque suave."
  },
  {
    id: "cama-box-colchao-castor",
    title: "Cama Box Queen Size com Colchão Castor Molas Ensacadas e Pillow Top",
    category: "casa",
    categoryName: "Casa & Conforto",
    price: 89.90,
    oldPrice: 2899.00,
    discount: "-97%",
    sold: "940",
    rating: 4.9,
    reviews: 430,
    image: "images/loja/cama-box-castor-pura.jpg",
    images: [
      "images/loja/cama-box-castor-pura.jpg"
    ],
    colors: [],
    badge: "Castor Original",
    freeShipping: true,
    description: "Molas ensacadas individualmente que garantem que o movimento de uma pessoa não interfira no sono da outra. Pillow Top duplo e tecido bordado com tratamento antiácaro."
  },
  {
    id: "guarda-roupa-porta-vidro",
    title: "Guarda-Roupa Casal Grande Modulado com Portas de Vidro Reflecta e Iluminação LED",
    category: "casa",
    categoryName: "Casa & Conforto",
    price: 91.90,
    oldPrice: 3250.00,
    discount: "-97%",
    sold: "640",
    rating: 4.9,
    reviews: 280,
    image: "images/loja/guarda-roupa-porta-vidro.jpg",
    images: [
      "images/loja/guarda-roupa-porta-vidro.jpg",
      "images/loja/guarda-roupa-branco.webp",
      "images/loja/guarda-roupa-cinza.webp"
    ],
    colors: ["Vidro Reflecta Fumê", "Branco Neve com LED", "Cinza Titanium"],
    colorImages: {
      "Vidro Reflecta Fumê": "images/loja/guarda-roupa-porta-vidro.jpg",
      "Branco Neve com LED": "images/loja/guarda-roupa-branco.webp",
      "Cinza Titanium": "images/loja/guarda-roupa-cinza.webp"
    },
    badge: "Móvel Luxo",
    freeShipping: true,
    description: "O guarda-roupa dos sonhos com portas em vidro reflecta elegante, gavetas com corrediças telescópicas e fita de LED integrada que acende automaticamente ao abrir as portas."
  },
  {
    id: "lixeira-inteligente-sensor",
    title: "Lixeira Eletrônica Inteligente com Sensor de Movimento Automático 15 Litros Inox",
    category: "casa",
    categoryName: "Casa & Conforto",
    price: 59.90,
    oldPrice: 599.00,
    discount: "-90%",
    sold: "5.7k",
    rating: 4.8,
    reviews: 1980,
    image: "images/loja/lixeira-inteligente-pura.webp",
    images: [
      "images/loja/lixeira-inteligente-pura.webp"
    ],
    colors: [],
    badge: "Sensor Touchless",
    freeShipping: true,
    description: "Abre a tampa por aproximação da mão em 0,3s sem você precisar tocar na lixeira. Vedação total contra odores indesejados e corpo em aço escovado anti-manchas."
  },
  {
    id: "robo-aspirador-alexa",
    title: "Robô Aspirador Inteligente que Passa Pano e Mapeia a Casa com Comando Alexa / App",
    category: "casa",
    categoryName: "Casa & Conforto",
    price: 87.90,
    oldPrice: 1999.00,
    discount: "-96%",
    sold: "3.8k",
    rating: 4.9,
    reviews: 1430,
    image: "images/produto6-robo-aspirador.jpg",
    images: [
      "images/produto6-robo-aspirador.jpg",
      "images/loja/robo-aspirador-estacao-ambiente.png",
      "images/loja/robo-aspirador-estacao-torre.png"
    ],
    colors: [],
    badge: "Aspira & Passa Pano",
    freeShipping: true,
    description: "Mapeamento inteligente por giroscópio para não deixar nenhum canto sujo. Sensores antiqueda para degraus e retorno automático para a base de carregamento quando a bateria acaba."
  },
  {
    id: "ferro-passar-roupa",
    title: "Ferro de Passar Roupa a Vapor Cerâmico Antiaderente com Spray e Auto-Limpeza",
    category: "casa",
    categoryName: "Casa & Conforto",
    price: 59.00,
    oldPrice: 499.00,
    discount: "-88%",
    sold: "4.4k",
    rating: 4.8,
    reviews: 1390,
    image: "images/loja/ferro-passar-puro.webp",
    images: [
      "images/loja/ferro-passar-puro.webp",
      "images/loja/ferro-passar-especificacoes.png",
      "images/loja/ferro-passar-ajuste-temperatura.png"
    ],
    colors: [],
    voltages: ["127V", "220V"],
    badge: "Vapor Potente",
    freeShipping: true,
    description: "Base cerâmica antiaderente que não gruda nas roupas e desliza suavemente sobre tecidos delicados. Função jato de vapor extra, cabo giratório 360°, capacidade de 240 mL e ajuste de temperatura com guia de tecidos. Disponível nas voltagens 127V e 220V."
  },
  {
    id: "mop-limpar-casa",
    title: "Mop Giratório com Balde Centrifugador e Cabo Inox com Refil de Microfibra",
    category: "casa",
    categoryName: "Casa & Conforto",
    price: 45.00,
    oldPrice: 399.00,
    discount: "-89%",
    sold: "9.2k",
    rating: 4.9,
    reviews: 3890,
    image: "images/loja/mop-limpar-puro.webp",
    images: [
      "images/loja/mop-limpar-puro.webp"
    ],
    colors: [],
    badge: "Limpador Fácil",
    freeShipping: true,
    description: "Limpeza sem molhar ou sujar as mãos. Centrifugador em aço inox de alta rotação que torce a microfibra completamente, deixando o chão seco e brilhando."
  },

  // ==========================================
  // VIAGEM & ACESSÓRIOS
  // ==========================================
  {
    id: "kit-3-malas-viagem",
    title: "Kit 3 Malas de Viagem P M G com Rodinhas 360° e Cadeado Embutido",
    category: "viagem",
    categoryName: "Viagem & Acessórios",
    price: 97.00,
    oldPrice: 1999.00,
    discount: "-95%",
    sold: "2.1k",
    rating: 4.9,
    reviews: 860,
    image: "images/loja/kit-3-malas-189.jpg",
    images: [
      "images/loja/kit-3-malas-189.jpg",
      "images/loja/mala-brasil-pura.webp",
      "images/loja/mala-rosa-pura.webp"
    ],
    colors: ["Mala Dourada", "Mala do Brasil", "Mala Rosa"],
    colorImages: {
      "Mala Dourada": "images/loja/kit-3-malas-189.jpg",
      "Mala do Brasil": "images/loja/mala-brasil-pura.webp",
      "Mala Rosa": "images/loja/mala-rosa-pura.webp"
    },
    badge: "Kit 3 Peças P-M-G",
    freeShipping: true,
    description: "Malas em ABS ultrarresistente contra impactos no aeroporto. Rodas duplas giratórias 360°, zíper expansor de capacidade e forro interno com divisórias para sapatos e roupas."
  },
  {
    id: "kit-3-necessaire",
    title: "Kit 3 Necessaires Organizadoras de Viagem Impermeáveis com Zíper Reforçado",
    category: "viagem",
    categoryName: "Viagem & Acessórios",
    price: 29.90,
    oldPrice: 499.00,
    discount: "-94%",
    sold: "3.7k",
    rating: 4.8,
    reviews: 1240,
    image: "images/loja/kit-necessaire-puro.webp",
    images: [
      "images/loja/kit-necessaire-puro.webp"
    ],
    colors: [],
    badge: "Kit 3 Peças",
    freeShipping: true,
    description: "Material impermeável resistente que protege cosméticos, maquiagens e produtos de higiene em viagens. Tamanhos P, M e G."
  },
  {
    id: "almofada-pescoco-aviao",
    title: "Almofada Travesseiro de Pescoço Ergonômico para Viagem e Avião Espuma Confort",
    category: "viagem",
    categoryName: "Viagem & Acessórios",
    price: 28.90,
    oldPrice: 389.00,
    discount: "-93%",
    sold: "4.8k",
    rating: 4.9,
    reviews: 1610,
    image: "images/loja/almofada-pescoco-pura.webp",
    images: [
      "images/loja/almofada-pescoco-pura.webp",
      "images/loja/almofada-pescoco-azul-marinho.png",
      "images/loja/almofada-pescoco-azul-bebe.png"
    ],
    colors: ["Preta Listrada", "Azul Marinho", "Azul Bebê"],
    colorImages: {
      "Preta Listrada": "images/loja/almofada-pescoco-pura.webp",
      "Listrada com Preta": "images/loja/almofada-pescoco-pura.webp",
      "Preta": "images/loja/almofada-pescoco-pura.webp",
      "Azul Marinho": "images/loja/almofada-pescoco-azul-marinho.png",
      "Listrada com Azul": "images/loja/almofada-pescoco-azul-marinho.png",
      "Listrada com Azul Marinho": "images/loja/almofada-pescoco-azul-marinho.png",
      "Azul Bebê": "images/loja/almofada-pescoco-azul-bebe.png",
      "Listrada com Azul Bebê": "images/loja/almofada-pescoco-azul-bebe.png"
    },
    badge: "Conforto Viagem",
    freeShipping: true,
    description: "Almofada Travesseiro de Pescoço Ergonômico para Viagem e Avião Espuma Confort. Disponível nas opções Preta Listrada, Azul Marinho e Azul Bebê. Espuma viscoelástica com memória que apoia perfeitamente a cabeça e o queixo durante viagens de carro, ônibus ou avião. Tecido respirável anti-suor e capa plush lavável com fecho ajustável."
  },
  {
    id: "capacete-ls2-alex-barros",
    title: "Capacete Moto LS2 Rapid FF353 Esportivo com Viseira Solar e Grafismo Especial",
    category: "smartphones",
    categoryName: "Smartphone e Acessórios",
    price: 88.90,
    oldPrice: 1899.00,
    discount: "-95%",
    sold: "1.9k",
    rating: 5.0,
    reviews: 790,
    image: "images/loja/capacete-ls2-alex-barros.jpg",
    images: [
      "images/loja/capacete-ls2-alex-barros.jpg",
      "images/loja/capacete-ls2-rosa-preto.jpg",
      "images/loja/capacete-ls2-branco-azul.jpg",
      "images/loja/capacete-ls2-speed-race.jpg",
      "images/loja/capacete-ls2-articulado.jpg"
    ],
    colors: ["Alex Barros Oficial", "Rosa com Preto", "Branco com Azul", "Speed Race Grafite", "Articulado Modular"],
    colorImages: {
      "Alex Barros Oficial": "images/loja/capacete-ls2-alex-barros.jpg",
      "Rosa com Preto": "images/loja/capacete-ls2-rosa-preto.jpg",
      "Branco com Azul": "images/loja/capacete-ls2-branco-azul.jpg",
      "Speed Race Grafite": "images/loja/capacete-ls2-speed-race.jpg",
      "Articulado Modular": "images/loja/capacete-ls2-articulado.jpg"
    },
    badge: "LS2 Original",
    freeShipping: true,
    description: "Casco em resina termoplástica HPTT de alta pressão. Viseira classe A de troca rápida com tratamento antirrisco e proteção UV. Forro hipoalergênico removível para lavagem."
  },
  // ==========================================
  // BELEZA & SAÚDE (Produtos Oficiais)
  // ==========================================
  // ==========================================
  // BRINQUEDOS
  // ==========================================
  {
    id: "triciclo-eletrico-drift-infantil",
    title: "Triciclo Elétrico Drift 250W 36V 80KG 10km Infantil 6.5\" 3 Rodas Polegadas 3 Velocidades Com Led",
    category: "brinquedos",
    categoryName: "Brinquedos",
    price: 89.90,
    oldPrice: 2499.00,
    discount: "-96%",
    sold: "2.9k",
    rating: 4.9,
    reviews: 1540,
    image: "images/loja/triciclo-drift-roxa.jpg",
    images: [
      "images/loja/triciclo-drift-roxa.jpg",
      "images/loja/triciclo-drift-rosa.png",
      "images/loja/triciclo-drift-ff-luz.png",
      "images/loja/triciclo-drift-preto.png",
      "images/loja/triciclo-drift-vermelha-galaxia.png",
      "images/loja/triciclo-drift-preto-jornal.png",
      "images/loja/triciclo-drift-gelo-fogo.png",
      "images/loja/triciclo-drift-azul-fogo.png",
      "images/loja/triciclo-drift-grafite-futebol.jpg",
      "images/loja/triciclo-drift-luzes-coloridas.png",
      "images/loja/triciclo-drift-azul-fogo-led.png"
    ],
    colors: [
      "Roxa",
      "Rosa",
      "FF Luz",
      "Preto",
      "Vermelha Galáxia",
      "Preto Jornal",
      "Gelo e Fogo Azul",
      "Azul Galáxia",
      "Grafite Futebol",
      "Luzes Coloridas",
      "Azul Fogo"
    ],
    colorImages: {
      "Roxa": "images/loja/triciclo-drift-roxa.jpg",
      "Rosa": "images/loja/triciclo-drift-rosa.png",
      "FF Luz": "images/loja/triciclo-drift-ff-luz.png",
      "Preto": "images/loja/triciclo-drift-preto.png",
      "Vermelha Galáxia": "images/loja/triciclo-drift-vermelha-galaxia.png",
      "Preto Jornal": "images/loja/triciclo-drift-preto-jornal.png",
      "Gelo e Fogo Azul": "images/loja/triciclo-drift-gelo-fogo.png",
      "Azul Galáxia": "images/loja/triciclo-drift-azul-fogo.png",
      "Grafite Futebol": "images/loja/triciclo-drift-grafite-futebol.jpg",
      "Luzes Coloridas": "images/loja/triciclo-drift-luzes-coloridas.png",
      "Azul Fogo": "images/loja/triciclo-drift-azul-fogo-led.png"
    },
    badge: "Lançamento",
    freeShipping: true,
    description: "Triciclo Elétrico Drift 250W 36V 80KG 10km Infantil 6.5\" 3 Rodas Polegadas 3 Velocidades Com Led. Motor de 250W potente com bateria de lítio 36V de longa duração, suporta até 80kg, autonomia de até 10km, 3 velocidades ajustáveis com chave seletora, rodas traseiras com giro livre 360° para manobras de drift radicais, iluminação em LED frontal e nas rodas, conexão Bluetooth para músicas e buzina integrada. Acompanha kit de proteção com capacete e joelheiras."
  },
  {
    id: "hoverboard-eletrico-600w",
    title: "Hoverboard Elétrico 600W com Autonomia de Até 15km Bluetooth e LED 6.5\"",
    category: "brinquedos",
    categoryName: "Brinquedos",
    price: 88.90,
    oldPrice: 2199.00,
    discount: "-96%",
    sold: "3.7k",
    rating: 4.9,
    reviews: 1820,
    image: "images/loja/hoverboard-rosa-camuflado.png",
    images: [
      "images/loja/hoverboard-rosa-camuflado.png",
      "images/loja/hoverboard-galaxy.png",
      "images/loja/hoverboard-hip-hop.png",
      "images/loja/hoverboard-preto-vermelho.png",
      "images/loja/hoverboard-ice-fire.png",
      "images/loja/hoverboard-azul-camuflado.png",
      "images/loja/hoverboard-purple-sky.png",
      "images/loja/hoverboard-galaxy-explosion.png",
      "images/loja/hoverboard-homem-aranha.png"
    ],
    colors: [
      "Rosa Camuflado",
      "Galaxy",
      "Hip Hop",
      "Preto Vermelho",
      "Ice Fire",
      "Azul Camuflado",
      "Purple Sky",
      "Galaxy Explosion",
      "Homem-Aranha"
    ],
    colorImages: {
      "Rosa Camuflado": "images/loja/hoverboard-rosa-camuflado.png",
      "Galaxy": "images/loja/hoverboard-galaxy.png",
      "Hip Hop": "images/loja/hoverboard-hip-hop.png",
      "Preto Vermelho": "images/loja/hoverboard-preto-vermelho.png",
      "Ice Fire": "images/loja/hoverboard-ice-fire.png",
      "Azul Camuflado": "images/loja/hoverboard-azul-camuflado.png",
      "Purple Sky": "images/loja/hoverboard-purple-sky.png",
      "Galaxy Explosion": "images/loja/hoverboard-galaxy-explosion.png",
      "Homem-Aranha": "images/loja/hoverboard-homem-aranha.png"
    },
    badge: "Mais Vendido",
    freeShipping: true,
    description: "Hoverboard Elétrico 600W com Autonomia de Até 15km Bluetooth e LED 6.5\". Potência combinada de 600W (dois motores de 300W), velocidade máxima de até 12km/h, bateria de lítio 36V com autonomia de até 15km, suporta até 100kg. Sistema de auto-equilíbrio giroscópio inteligente, conectividade Bluetooth para tocar músicas pelo celular, iluminação frontal e nas rodas com luzes LED RGB coloridas. Acompanha carregador bivolt e manual."
  },
  // ==========================================
  // ELETRÔNICOS
  // ==========================================
  {
    id: "drone-cz11-pro-brushless",
    title: "Drone CZ11 Pro Brushless com Controle Tela FPV 2 Baterias Câmera Dupla Fluxo Óptico",
    category: "eletronicos",
    categoryName: "Eletrônicos",
    price: 80.00,
    oldPrice: 1859.00,
    discount: "-96%",
    sold: "3.4k",
    rating: 4.9,
    reviews: 1250,
    image: "images/loja/drone-cz11-pro-1.png",
    images: [
      "images/loja/drone-cz11-pro-1.png",
      "images/loja/drone-cz11-pro-2.png",
      "images/loja/drone-cz11-pro-3.png"
    ],
    colors: [],
    badge: "Controle c/ Tela",
    freeShipping: true,
    description: "Drone CZ11 TELA NO CONTROLE Pro Brushless com Controle Tela FPV 2 Baterias Câmera Dupla Fluxo Óptico Dobrável APP. Motor Brushless de alta durabilidade e resistência ao vento, controle com tela FPV integrada em tempo real sem necessidade de celular, alcance de até 120 metros, bateria modular dupla para mais tempo de voo, sistema anti-impacto com sensores frontais, câmera com ajuste elétrico e controle também por aplicativo."
  },
  {
    id: "actine-gel-limpeza",
    title: "Darrow Actine Gel de Limpeza Facial Dermatológico 240g - Peles Oleosas e Acneicas",
    category: "beleza",
    categoryName: "Beleza & SaÚde",
    price: 48.90,
    oldPrice: 399.00,
    discount: "-88%",
    sold: "8.4k",
    rating: 4.9,
    reviews: 2130,
    image: "images/loja/actine-gel-limpeza.png",
    images: [
      "images/loja/actine-gel-limpeza.png"
    ],
    colors: [],
    badge: "Mais Vendido",
    soldOut: false,
    urgency: { viewers: "1.950", stock: "24" },
    freeShipping: true,
    description: "Gel de limpeza facial dermatológico para peles oleosas e acneicas com Vitamina C e Ácido Salicílico. Limpa profundamente os poros, reduz a oleosidade e previne cravos e espinhas."
  },
  {
    id: "makeb-volume-extremo",
    title: "MÁscara de Cílios Make B. Volume Extremo O BoticÁrio 10ml - Efeito 12x Mais Volume",
    category: "beleza",
    categoryName: "Beleza & SaÚde",
    price: 19.90,
    oldPrice: 199.00,
    discount: "-90%",
    sold: "5.1k",
    rating: 4.9,
    reviews: 1480,
    image: "images/loja/makeb-volume-extremo.png",
    images: [
      "images/loja/makeb-volume-extremo.png"
    ],
    colors: ["Preto Intenso"],
    badge: "Volume 12x",
    soldOut: false,
    freeShipping: true,
    description: "Fórmula de alta pigmentação com aplicador anatómico que alcança todos os fios desde a raiz. Até 12x mais volume sem empelotar e resistente o dia todo."
  },
  {
    id: "principia-protetor-solar",
    title: "Protetor Solar Facial com Cor Principia FPS 70 PS-05 30ml com Niacinamida Toque Seco",
    category: "beleza",
    categoryName: "Beleza & SaÚde",
    price: 18.90,
    oldPrice: 189.00,
    discount: "-90%",
    sold: "6.9k",
    rating: 5.0,
    reviews: 1940,
    image: "images/loja/principia-protetor-solar.png",
    images: [
      "images/loja/principia-protetor-solar.png"
    ],
    colors: ["PS-05 (Cor 2.0)"],
    badge: "Filtro FPS 70",
    soldOut: false,
    freeShipping: true,
    description: "Fórmula fluida com cobertura natural de base, ação antioleosidade e proteção UVA/UVB muito alta. Com 5% de Niacinamida para prevenir e clarear manchas solares."
  },
  {
    id: "eudora-po-compacto",
    title: "Pó Compacto Facial Eudora Glam Skin Perfection Ultra Matte com Espelho",
    category: "beleza",
    categoryName: "Beleza & SaÚde",
    price: 17.90,
    oldPrice: 149.00,
    discount: "-88%",
    sold: "4.3k",
    rating: 4.9,
    reviews: 1220,
    image: "images/loja/eudora-po-compacto.png",
    images: [
      "images/loja/eudora-po-compacto.png"
    ],
    colors: ["Médio Natural"],
    badge: "Ultra Matte",
    soldOut: false,
    freeShipping: true,
    description: "Textura micronizada ultrafina que controla o brilho sem pesar na pele. Disfarça poros e linhas de expressão com acabamento aveludado e espelho na embalagem."
  }
];
