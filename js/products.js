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
  { id: "natal", name: "Especial de Natal 🎄", icon: "🎄" },
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
  // ESPECIAL DE NATAL - SHOPPING BRASIL
  // ==========================================
  {
    id: "arvore-natal-nevada-completa-led",
    title: "Árvore de Natal Nevada Completa com Enfeites, Laços, Bolas, Estrela e Fio de Fada LED Suporte Incluso",
    category: "natal",
    categoryName: "Especial de Natal",
    price: 97.00,
    oldPrice: 289.00,
    discount: "-66%",
    sold: "4.8k",
    rating: 4.9,
    reviews: 1540,
    image: "images/loja/arvore-natal-nevada-completa-1.jpg",
    images: [
      "images/loja/arvore-natal-nevada-completa-1.jpg",
      "images/loja/arvore-natal-kit-enfeites.jpg",
      "images/loja/arvore-natal-bolas-5cm.jpg",
      "images/loja/arvore-natal-lacos-vermelhos.jpg",
      "images/loja/arvore-natal-fio-fada-led.jpg",
      "images/loja/arvore-natal-mix-enfeites.jpg"
    ],
    optionLabel: "Tamanho / Altura:",
    colors: [
      "2,10 m",
      "1,90 m",
      "1,70 m",
      "1,50 m",
      "1,40 m",
      "1,20 m",
      "1,00 m",
      "80 cm",
      "70 cm",
      "60 cm"
    ],
    colorImages: {
      "2,10 m": "images/loja/arvore-natal-nevada-completa-1.jpg",
      "1,90 m": "images/loja/arvore-natal-nevada-completa-1.jpg",
      "1,70 m": "images/loja/arvore-natal-nevada-completa-1.jpg",
      "1,50 m": "images/loja/arvore-natal-nevada-completa-1.jpg",
      "1,40 m": "images/loja/arvore-natal-nevada-completa-1.jpg",
      "1,20 m": "images/loja/arvore-natal-nevada-completa-1.jpg",
      "1,00 m": "images/loja/arvore-natal-nevada-completa-1.jpg",
      "80 cm": "images/loja/arvore-natal-nevada-completa-1.jpg",
      "70 cm": "images/loja/arvore-natal-nevada-completa-1.jpg",
      "60 cm": "images/loja/arvore-natal-nevada-completa-1.jpg"
    },
    modelBadges: {
      "2,10 m": "Mais Vendida ⭐",
      "1,90 m": "Destaque",
      "1,50 m": "Popular"
    },
    variantPrices: {
      "2,10 m": 97.00,
      "1,90 m": 89.90,
      "1,70 m": 82.90,
      "1,50 m": 74.90,
      "1,40 m": 68.90,
      "1,20 m": 59.90,
      "1,00 m": 52.90,
      "80 cm": 44.90,
      "70 cm": 38.90,
      "60 cm": 29.90
    },
    badge: "Kit Completo com LED",
    freeShipping: true,
    description: "🎄 Árvore de Natal Nevada Completa com iluminação em LED, laços, bolas, enfeites decorativos e suporte reforçado! Uma árvore linda, iluminada e completa para deixar seu Natal ainda mais especial! ✨\n\nO QUE VEM NO KIT COMPLETO:\n• Árvore Pinheiro Nevado de Alta Qualidade com Suporte Robusto\n• 48 Bolas de Natal 5cm (24 Bolas Vermelhas e 24 Bolas Douradas nos acabamentos Fosco, Brilhante e Lisa)\n• 1 Estrela Dourada Reluzente para Ponteira\n• 12 Laços Vermelhos Aveludados com acabamento dourado (5cm)\n• Fio de Fada LED 10 Metros (100 LEDs, Branco Quente de Alto Brilho)\n• Mix 42 Enfeites Vermelho (Caixinhas de Presente, Tambores, Papais Noéis, Bengalas, Pinhas e Sinos)\n• Mix 42 Enfeites Dourado (Caixinhas de Presente, Tambores, Papais Noéis, Bengalas, Pinhas e Sinos)\n\nEscolha o tamanho ideal para a sua casa ou escritório, disponível do tamanho compacto de 60cm até a imponente árvore de 2,10 metros!"
  },
  {
    id: "pisca-pisca-led-100-luzes-9m-8funcoes",
    title: "Cordão de Luz Natalino Pisca-Pisca com 100 LEDs 9 Metros 8 Funções de Iluminação Fio Transparente",
    category: "natal",
    categoryName: "Especial de Natal",
    price: 29.90,
    oldPrice: 79.90,
    discount: "-63%",
    sold: "8.2k",
    rating: 4.9,
    reviews: 2890,
    image: "images/loja/pisca-pisca-led-colorido.jpg",
    images: [
      "images/loja/pisca-pisca-led-colorido.jpg",
      "images/loja/pisca-pisca-led-cores-tabela.jpg",
      "images/loja/pisca-pisca-led-dourado-warm.jpg",
      "images/loja/pisca-pisca-led-branco-frio.jpg",
      "images/loja/pisca-pisca-led-azul.jpg",
      "images/loja/pisca-pisca-led-roxo.jpg",
      "images/loja/pisca-pisca-led-vermelho.jpg",
      "images/loja/pisca-pisca-led-verde.jpg",
      "images/loja/pisca-pisca-led-rosa.jpg"
    ],
    optionLabel: "Cor do LED:",
    colors: [
      "Colorido",
      "Branco Quente (Dourado)",
      "Branco Frio",
      "Azul",
      "Vermelho",
      "Verde",
      "Rosa",
      "Roxo",
      "Amarelo"
    ],
    colorImages: {
      "Colorido": "images/loja/pisca-pisca-led-colorido.jpg",
      "Branco Quente (Dourado)": "images/loja/pisca-pisca-led-dourado-warm.jpg",
      "Branco Frio": "images/loja/pisca-pisca-led-branco-frio.jpg",
      "Azul": "images/loja/pisca-pisca-led-azul.jpg",
      "Vermelho": "images/loja/pisca-pisca-led-vermelho.jpg",
      "Verde": "images/loja/pisca-pisca-led-verde.jpg",
      "Rosa": "images/loja/pisca-pisca-led-rosa.jpg",
      "Roxo": "images/loja/pisca-pisca-led-roxo.jpg",
      "Amarelo": "images/loja/pisca-pisca-led-dourado-warm.jpg"
    },
    voltages: ["110V", "220V"],
    badge: "8 Funções de Luz",
    freeShipping: true,
    description: "✨ Cordão de Luz Natalino Pisca-Pisca com 100 LEDs, 9 metros de comprimento, 8 funções de iluminação e fio transparente. Ideal para decorar árvores de Natal, fachadas, janelas e ambientes, deixando sua decoração muito mais bonita, iluminada e especial! 🎄\n\nESPECIFICAÇÕES TÉCNICAS:\n• Quantidade de LEDs: 100 LEDs de alto brilho\n• Comprimento: 9 metros de extensão linear\n• Funções: Controlador com 8 modos de iluminação (fixo, pisca rápido, fade, onda, etc.)\n• Fio: Transparente cristal de alta durabilidade e discrição\n• Voltagens disponíveis: 110V e 220V\n• Cores disponíveis: Colorido, Branco Quente/Dourado, Branco Frio, Azul, Vermelho, Verde, Rosa, Roxo e Amarelo."
  },
  {
    id: "guirlanda-natalina-30cm-fio-fada-led-2m",
    title: "Guirlanda Natalina 30cm com Fio de Fada LED 2 Metros Decoração de Porta e Parede com Laço Luxo",
    category: "natal",
    categoryName: "Especial de Natal",
    price: 48.90,
    oldPrice: 119.90,
    discount: "-59%",
    sold: "3.9k",
    rating: 4.9,
    reviews: 1120,
    image: "images/loja/guirlanda-natalina-porta-1.jpg",
    images: [
      "images/loja/guirlanda-natalina-porta-1.jpg",
      "images/loja/guirlanda-natalina-led-acesa.jpg",
      "images/loja/guirlanda-natalina-porta-dia.jpg",
      "images/loja/guirlanda-natalina-medidas-30cm.jpg",
      "images/loja/guirlanda-natalina-kit-fio-fada.jpg",
      "images/loja/guirlanda-natalina-detalhes-led.jpg"
    ],
    colors: [
      "Guirlanda 30cm + Fio de Fada LED 2m (Baterias Inclusas)"
    ],
    badge: "LED + Baterias Inclusas",
    freeShipping: true,
    description: "Guirlanda Natalina 30cm com Fio de Fada LED 2 Metros Decoração de Porta e Parede. Deixe a entrada da sua casa radiante e acolhedora neste Natal!\n\nDETALHES DO PRODUTO:\n• Diâmetro: 30 cm x 30 cm de tamanho perfeito para portas principais, janelas e varandas\n• Acompanha Laço Vermelho de Veludo Luxo no topo\n• Folhagem verde densa de alta qualidade e durabilidade\n• Acompanha Fio de Fada LED com 2 Metros de luz quente flexível\n• Funciona com 3 baterias inclusas no compartimento prático com botão liga/desliga\n• Sem fios pendurados na tomada: 100% autônomo, seguro e fácil de pendurar."
  },
  {
    id: "kit-festao-verde-escuro-nevado-2m-x-7cm",
    title: "Kit Festão de Natal Verde Escuro e Nevado 2 Metros x 7cm Decoração Natalina Completa",
    category: "natal",
    categoryName: "Especial de Natal",
    price: 19.90,
    oldPrice: 49.90,
    discount: "-60%",
    sold: "6.4k",
    rating: 4.9,
    reviews: 2150,
    image: "images/loja/festao-natal-nevado-1.jpg",
    images: [
      "images/loja/festao-natal-nevado-1.jpg",
      "images/loja/festao-natal-verde-escuro-1.png",
      "images/loja/festao-natal-nevado-detalhe.jpg",
      "images/loja/festao-natal-verde-escuro-rolo.jpg"
    ],
    optionLabel: "Modelo e Quantidade:",
    colors: [
      "Kit 10 Unidades (20 Metros) - Nevado",
      "Kit 10 Unidades (20 Metros) - Verde Escuro",
      "Kit 5 Unidades (10 Metros) - Nevado",
      "Kit 5 Unidades (10 Metros) - Verde Escuro",
      "Kit 3 Unidades (6 Metros) - Nevado",
      "Kit 3 Unidades (6 Metros) - Verde Escuro",
      "1 Unidade (2 Metros) - Nevado",
      "1 Unidade (2 Metros) - Verde Escuro"
    ],
    colorImages: {
      "Kit 10 Unidades (20 Metros) - Nevado": "images/loja/festao-natal-nevado-1.jpg",
      "Kit 10 Unidades (20 Metros) - Verde Escuro": "images/loja/festao-natal-verde-escuro-1.png",
      "Kit 5 Unidades (10 Metros) - Nevado": "images/loja/festao-natal-nevado-1.jpg",
      "Kit 5 Unidades (10 Metros) - Verde Escuro": "images/loja/festao-natal-verde-escuro-1.png",
      "Kit 3 Unidades (6 Metros) - Nevado": "images/loja/festao-natal-nevado-1.jpg",
      "Kit 3 Unidades (6 Metros) - Verde Escuro": "images/loja/festao-natal-verde-escuro-1.png",
      "1 Unidade (2 Metros) - Nevado": "images/loja/festao-natal-nevado-1.jpg",
      "1 Unidade (2 Metros) - Verde Escuro": "images/loja/festao-natal-verde-escuro-1.png"
    },
    modelBadges: {
      "Kit 10 Unidades (20 Metros) - Nevado": "Mais Vendido ⭐",
      "Kit 10 Unidades (20 Metros) - Verde Escuro": "Mais Vendido ⭐",
      "Kit 5 Unidades (10 Metros) - Nevado": "Custo-Benefício",
      "Kit 5 Unidades (10 Metros) - Verde Escuro": "Custo-Benefício"
    },
    variantPrices: {
      "Kit 10 Unidades (20 Metros) - Nevado": 58.90,
      "Kit 10 Unidades (20 Metros) - Verde Escuro": 58.90,
      "Kit 5 Unidades (10 Metros) - Nevado": 39.90,
      "Kit 5 Unidades (10 Metros) - Verde Escuro": 39.90,
      "Kit 3 Unidades (6 Metros) - Nevado": 28.90,
      "Kit 3 Unidades (6 Metros) - Verde Escuro": 28.90,
      "1 Unidade (2 Metros) - Nevado": 19.90,
      "1 Unidade (2 Metros) - Verde Escuro": 19.90
    },
    badge: "Mais Vendido 20m",
    freeShipping: true,
    description: "Kit 1/3/5/10 Festão Verde Escuro e Nevado 2 Metros x 7 cm Decoração de Natal. Ideal para contornar escadas, portas, janelas, árvores de Natal e tetos!\n\nOPÇÕES DISPONÍVEIS:\n• Modelos: Verde Escuro Tradicional ou Verde Nevado (pontas brancas como neve)\n• Quantidades:\n  - 1 Unidade: 2 Metros\n  - Kit com 3 Unidades: 6 Metros\n  - Kit com 5 Unidades: 10 Metros\n  - Kit com 10 Unidades: 20 Metros (Opção Mais Vendida e Recomendada!)\n\nLargura: 7 cm de espessura com folhagem cheia e maleável para fácil moldagem e fixação."
  },
  {
    id: "kit-30-bolas-natal-mistas-3cm-4cm",
    title: "Kit 30 Bolas de Natal 4 e 3 cm Mistas Vermelhas e Douradas - Enfeites para Árvore com Acabamentos Lisos, Fosco e Glitter",
    category: "natal",
    categoryName: "Especial de Natal",
    price: 34.90,
    oldPrice: 79.90,
    discount: "-56%",
    sold: "4.7k",
    rating: 4.9,
    reviews: 1420,
    image: "images/loja/bolas-natal-30un-4cm-mistas.jpg",
    images: [
      "images/loja/bolas-natal-30un-4cm-mistas.jpg",
      "images/loja/bolas-natal-30un-3cm-mistas.jpg",
      "images/loja/bolas-natal-30un-tamanho-4cm-dourada.jpg",
      "images/loja/bolas-natal-30un-acabamentos-vermelha.jpg",
      "images/loja/bolas-natal-30un-tamanho-4cm-vermelha.jpg",
      "images/loja/bolas-natal-30un-acabamentos-dourada.jpg",
      "images/loja/bolas-natal-30un-3cm-douradas.jpg",
      "images/loja/bolas-natal-30un-3cm-vermelhas.jpg"
    ],
    optionLabel: "Tamanho / Cor:",
    colors: [
      "3 cm - Mistas (15 Vermelhas + 15 Douradas)",
      "3 cm - Só Dourada (30 unidades)",
      "3 cm - Só Vermelha (30 unidades)",
      "4 cm - Mistas (15 Vermelhas + 15 Douradas)",
      "4 cm - Só Dourada (30 unidades)",
      "4 cm - Só Vermelha (30 unidades)"
    ],
    colorImages: {
      "3 cm - Mistas (15 Vermelhas + 15 Douradas)": "images/loja/bolas-natal-30un-3cm-mistas.jpg",
      "3 cm - Só Dourada (30 unidades)": "images/loja/bolas-natal-30un-3cm-douradas.jpg",
      "3 cm - Só Vermelha (30 unidades)": "images/loja/bolas-natal-30un-3cm-vermelhas.jpg",
      "4 cm - Mistas (15 Vermelhas + 15 Douradas)": "images/loja/bolas-natal-30un-4cm-mistas.jpg",
      "4 cm - Só Dourada (30 unidades)": "images/loja/bolas-natal-30un-acabamentos-dourada.jpg",
      "4 cm - Só Vermelha (30 unidades)": "images/loja/bolas-natal-30un-acabamentos-vermelha.jpg"
    },
    modelBadges: {
      "4 cm - Mistas (15 Vermelhas + 15 Douradas)": "Mais Vendido 🔥",
      "3 cm - Mistas (15 Vermelhas + 15 Douradas)": "Popular ⭐"
    },
    variantPrices: {
      "4 cm - Mistas (15 Vermelhas + 15 Douradas)": 34.90,
      "4 cm - Só Dourada (30 unidades)": 34.90,
      "4 cm - Só Vermelha (30 unidades)": 34.90,
      "3 cm - Mistas (15 Vermelhas + 15 Douradas)": 24.90,
      "3 cm - Só Dourada (30 unidades)": 24.90,
      "3 cm - Só Vermelha (30 unidades)": 24.90
    },
    badge: "Kit 30 Bolas",
    freeShipping: true,
    description: "🎄 Kit 30 Bolas de Natal 4 e 3 cm Mistas Vermelhas e Douradas - Enfeites para Árvore com Acabamentos Lisos, Fosco e Glitter!\n\nDeixe sua árvore de Natal exuberante, elegante e cheia de vida com o kit perfeito de bolas natalinas! Cada kit traz uma harmoniosa combinação de acabamentos que capturam a luz e criam uma atmosfera mágica.\n\nESPECIFICAÇÕES:\n• Quantidade: 30 Bolas de Natal por kit\n• Tamanhos disponíveis: 3 cm ou 4 cm de diâmetro\n• Opções de Cor:\n  - Mistas: 15 Vermelhas + 15 Douradas\n  - Só Douradas: 30 Bolas Douradas\n  - Só Vermelhas: 30 Bolas Vermelhas\n• Acabamentos inclusos: Lisa com brilho espelhado, Fosca aveludada e Glitter reluzente\n• Acompanha cordão dourado para pendurar facilmente em qualquer galho ou arranjo."
  },
  {
    id: "tubo-24-bolas-natal-3cm-4cm-6cm",
    title: "Conjunto de Bolas de Natal 24 Peças 3cm/4cm/6cm Lisa Fosca Glitter no Tubo Acrílico",
    category: "natal",
    categoryName: "Especial de Natal",
    price: 29.90,
    oldPrice: 69.90,
    discount: "-57%",
    sold: "5.1k",
    rating: 4.9,
    reviews: 1680,
    image: "images/loja/tubo-24-bolas-natal-linha-completa.jpg",
    images: [
      "images/loja/tubo-24-bolas-natal-linha-completa.jpg",
      "images/loja/tubo-24-bolas-natal-6cm-vermelha.jpg",
      "images/loja/tubo-24-bolas-natal-4cm-vermelha.jpg",
      "images/loja/tubo-24-bolas-natal-4cm-dourada.jpg",
      "images/loja/tubo-24-bolas-natal-3cm-vermelha.jpg",
      "images/loja/tubo-24-bolas-natal-3cm-dourada.jpg"
    ],
    optionLabel: "Tamanho / Cor:",
    colors: [
      "3 cm - Vermelha (24 peças)",
      "3 cm - Dourada (24 peças)",
      "4 cm - Vermelha (24 peças)",
      "4 cm - Dourada (24 peças)",
      "6 cm - Vermelha (24 peças)"
    ],
    colorImages: {
      "3 cm - Vermelha (24 peças)": "images/loja/tubo-24-bolas-natal-3cm-vermelha.jpg",
      "3 cm - Dourada (24 peças)": "images/loja/tubo-24-bolas-natal-3cm-dourada.jpg",
      "4 cm - Vermelha (24 peças)": "images/loja/tubo-24-bolas-natal-4cm-vermelha.jpg",
      "4 cm - Dourada (24 peças)": "images/loja/tubo-24-bolas-natal-4cm-dourada.jpg",
      "6 cm - Vermelha (24 peças)": "images/loja/tubo-24-bolas-natal-6cm-vermelha.jpg"
    },
    modelBadges: {
      "6 cm - Vermelha (24 peças)": "Destaque 6cm ⭐",
      "4 cm - Vermelha (24 peças)": "Mais Vendida 🔥"
    },
    variantPrices: {
      "6 cm - Vermelha (24 peças)": 39.90,
      "4 cm - Vermelha (24 peças)": 29.90,
      "4 cm - Dourada (24 peças)": 29.90,
      "3 cm - Vermelha (24 peças)": 22.90,
      "3 cm - Dourada (24 peças)": 22.90
    },
    badge: "Tubo 24 Peças",
    freeShipping: true,
    description: "🎅 Conjunto de Bolas de Natal 24 Peças 3cm/4cm/6cm Lisa Fosca Glitter no Tubo Acrílico.\n\nElegância e praticidade na hora de decorar! As bolas vêm acomodadas em um lindo tubo acrílico transparente para proteger e facilitar o armazenamento para os próximos anos.\n\nDESTAQUES:\n• Quantidade: 24 Bolas de Natal por tubo\n• Tamanhos disponíveis: 3 cm, 4 cm ou 6 cm\n• Cores disponíveis: Vermelho vibrante ou Dourado clássico\n• Triplo acabamento: Lisa com brilho intenso, Fosca acetinada e Glitter cintilante\n• Já acompanha cordões dourados para pendurar."
  },
  {
    id: "kit-6-bengalas-natalinas-17cm",
    title: "Kit com 6 Bengalas Natalinas Decorativas de 17cm Candy Cane Tradicional para Árvore",
    category: "natal",
    categoryName: "Especial de Natal",
    price: 24.90,
    oldPrice: 59.90,
    discount: "-58%",
    sold: "3.4k",
    rating: 4.9,
    reviews: 950,
    image: "images/loja/bengalas-natalinas-17cm-kit6-1.jpg",
    images: [
      "images/loja/bengalas-natalinas-17cm-kit6-1.jpg",
      "images/loja/bengalas-natalinas-17cm-kit6-medidas.jpg",
      "images/loja/bengalas-natalinas-17cm-kit6-arvore.jpg"
    ],
    optionLabel: "Modelo:",
    colors: [
      "Kit com 6 Bengalas (17 cm)"
    ],
    colorImages: {
      "Kit com 6 Bengalas (17 cm)": "images/loja/bengalas-natalinas-17cm-kit6-1.jpg"
    },
    badge: "Kit com 6 Bengalas",
    freeShipping: true,
    description: "🍬 Kit com 6 Bengalas Natalinas Decorativas de 17cm estilo Candy Cane tradicional americano.\n\nUm dos símbolos mais amados do Natal! As bengalinhas trazem um toque lúdico, alegre e doce para a sua árvore, guirlandas, arranjos de mesa e embalagens de presentes.\n\nCARACTERÍSTICAS:\n• Quantidade: 6 bengalas decorativas de 17 cm\n• Padrão clássico: Listras em espiral branco e vermelho metalizado brilhante\n• Material leve, resistente e inquebrável\n• Acompanha cordão dourado fixo na ponta para pendurar imediatamente."
  },
  {
    id: "laco-natal-veludo-vermelho-luxo",
    title: "Laço de Natal Veludo Vermelho Luxo Almofadado Enfeite para Árvore, Guirlanda e Porta",
    category: "natal",
    categoryName: "Especial de Natal",
    price: 27.90,
    oldPrice: 65.90,
    discount: "-58%",
    sold: "4.2k",
    rating: 4.9,
    reviews: 1320,
    image: "images/loja/laco-veludo-luxo-trio.jpg",
    images: [
      "images/loja/laco-veludo-luxo-trio.jpg",
      "images/loja/laco-veludo-luxo-15x12.jpg",
      "images/loja/laco-veludo-luxo-22x18.jpg",
      "images/loja/laco-veludo-luxo-33x26.jpg",
      "images/loja/laco-veludo-luxo-p-frente.jpg",
      "images/loja/laco-veludo-luxo-g-frente.jpg"
    ],
    optionLabel: "Tamanho:",
    colors: [
      "Pequeno (15 x 12 cm)",
      "Médio (22 x 18 cm)",
      "Grande (33 x 26 cm)"
    ],
    colorImages: {
      "Pequeno (15 x 12 cm)": "images/loja/laco-veludo-luxo-15x12.jpg",
      "Médio (22 x 18 cm)": "images/loja/laco-veludo-luxo-22x18.jpg",
      "Grande (33 x 26 cm)": "images/loja/laco-veludo-luxo-33x26.jpg"
    },
    modelBadges: {
      "Grande (33 x 26 cm)": "Ideal para Porta/Ponteira",
      "Médio (22 x 18 cm)": "Mais Vendido 🔥",
      "Pequeno (15 x 12 cm)": "Ideal para Ramos"
    },
    variantPrices: {
      "Grande (33 x 26 cm)": 27.90,
      "Médio (22 x 18 cm)": 21.90,
      "Pequeno (15 x 12 cm)": 15.90
    },
    badge: "Veludo Nobre Luxo",
    freeShipping: true,
    description: "🎀 Laço de Natal Veludo Vermelho Luxo Almofadado. Acabamento artesanal impecável em veludo nobre com preenchimento almofadado, conferindo volume, estrutura firme e elegância ímpar à sua decoração.\n\nESCOLHA O TAMANHO IDEAL:\n• Pequeno: 15 cm altura x 12 cm largura (perfeito para galhos da árvore e guirlandas menores)\n• Médio: 22 cm altura x 18 cm largura (excelente para destaque na árvore e guirlandas de 30 a 50cm)\n• Grande: 33 cm altura x 26 cm largura (imponente para ponteira da árvore, porta principal e lareira)\n\n• Toque suave aveludado, cor vermelho vivo vibrante que não desbota."
  },
  {
    id: "papai-noel-decorativo-17cm",
    title: "Papai Noel Decorativo 17cm Para Decoração de Natal | 2 Cores Disponíveis",
    category: "natal",
    categoryName: "Especial de Natal",
    price: 38.90,
    oldPrice: 89.90,
    discount: "-57%",
    sold: "3.8k",
    rating: 4.9,
    reviews: 1190,
    image: "images/loja/papai-noel-17cm-dupla.jpg",
    images: [
      "images/loja/papai-noel-17cm-dupla.jpg",
      "images/loja/papai-noel-17cm-marrom.jpg",
      "images/loja/papai-noel-17cm-vermelho.jpg",
      "images/loja/papai-noel-17cm-marrom-medida.jpg",
      "images/loja/papai-noel-17cm-vermelho-mao.jpg",
      "images/loja/papai-noel-17cm-marrom-mao.jpg"
    ],
    optionLabel: "Cor:",
    colors: [
      "Marrom",
      "Vermelho"
    ],
    colorImages: {
      "Marrom": "images/loja/papai-noel-17cm-marrom.jpg",
      "Vermelho": "images/loja/papai-noel-17cm-vermelho.jpg"
    },
    badge: "17cm Luxo",
    freeShipping: true,
    description: "🎅 Papai Noel Decorativo 17cm Para Decoração de Natal. Boneco articulado e detalhado de alta qualidade, ideal para decorar mesas, aparadores, estantes, peitoris e aos pés da árvore de Natal.\n\nCORES DISPONÍVEIS:\n• Marrom: Estilo rústico nórdico/alpino vintage, com gorro de tricô aconchegante, sobretudo de pelagem macia e detalhes em juta rústica com pinhas.\n• Vermelho: Estilo tradicional festivo com roupagem aveludada vermelha viva, acabamento em pelúcia felpuda branca e cordão dourado com raminho natalino.\n\n• Altura: 17 cm\n• Base estável que fica de pé sozinho sobre qualquer superfície plana."
  },
  {
    id: "papai-noel-escalador-musical-corda",
    title: "Boneco Papai Noel Escalador Sobe e Desce com Música Brinquedos Eletrônicos",
    category: "natal",
    categoryName: "Especial de Natal",
    price: 49.90,
    oldPrice: 129.90,
    discount: "-62%",
    sold: "5.8k",
    rating: 4.9,
    reviews: 2130,
    image: "images/loja/papai-noel-escalador-musical-1.jpg",
    images: [
      "images/loja/papai-noel-escalador-musical-1.jpg",
      "images/loja/papai-noel-escalador-musical-2.jpg",
      "images/loja/papai-noel-escalador-musical-3.jpg",
      "images/loja/papai-noel-escalador-musical-4.jpg",
      "images/loja/papai-noel-escalador-musical-specs.jpg",
      "images/loja/papai-noel-escalador-musical-pilhas.jpg",
      "images/loja/papai-noel-escalador-musical-arvore.jpg",
      "images/loja/papai-noel-escalador-musical-cenarios.jpg",
      "images/loja/papai-noel-escalador-musical-detalhes.jpg"
    ],
    optionLabel: "Modelo:",
    colors: [
      "Papai Noel Escalador com Música (25 cm)"
    ],
    colorImages: {
      "Papai Noel Escalador com Música (25 cm)": "images/loja/papai-noel-escalador-musical-1.jpg"
    },
    badge: "Sobe e Desce com Música 🎵",
    freeShipping: true,
    description: "🎄 Boneco Papai Noel Enfeite Natal Sobe e Desce com Música Brinquedos Eletrônicos.\n\nO enfeite que é sensação no mundo inteiro e faz a alegria das crianças e de toda a família! O Papai Noel escala e desce a corrente de contas douradas de forma contínua enquanto toca alegres canções natalinas.\n\nRECURSOS & DETALHES:\n• Movimento automático contínuo: sobe e desce sozinho pela corrente\n• Efeito sonoro: Toca clássicos natalinos com som nítido e envolvente\n• Alimentação: 3 pilhas AA (não inclusas) – praticidade total sem fios pela casa\n• Dimensões do boneco: 25 cm de altura x 13 cm de largura x 15 cm de profundidade\n• Confeccionado em pelúcia de toque macio e carcaça ABS resistente\n• Ideal para árvores de Natal, escadas, janelas, cortinas e tetos."
  },
  // ==========================================
  // PRODUTOS NOVOS SHOPPING BRASIL
  // ==========================================
  {
    id: "jogo-panelas-ditalia-10pecas-antiaderente",
    title: "Jogo de Panelas 10 Peças Antiaderente Bianco D’Itália com Tampa de Vidro Temperado Várias Cores Kit Cozinha Completa",
    category: "casa",
    categoryName: "Casa & Conforto",
    price: 139.90,
    oldPrice: 389.90,
    discount: "-64%",
    sold: "4.3k",
    rating: 4.9,
    reviews: 1840,
    image: "images/loja/jogo-panelas-ditalia-10pcs-geral.jpg",
    images: [
      "images/loja/jogo-panelas-ditalia-10pcs-geral.jpg",
      "images/loja/jogo-panelas-ditalia-sahara.jpg",
      "images/loja/jogo-panelas-ditalia-vanilla.jpg",
      "images/loja/jogo-panelas-ditalia-prestigio.jpg",
      "images/loja/jogo-panelas-ditalia-acqua.jpg",
      "images/loja/jogo-panelas-ditalia-vermelha.jpg",
      "images/loja/jogo-panelas-ditalia-rose.jpg",
      "images/loja/jogo-panelas-ditalia-vermelha-preta.jpg",
      "images/loja/jogo-panelas-ditalia-preta.jpg"
    ],
    optionLabel: "Cor:",
    colors: [
      "Sahara (Amadeirado)",
      "Vanilla (Granitado)",
      "Prestígio (Marrom)",
      "Acqua (Azul)",
      "Vermelha",
      "Rosé Gold",
      "Vermelha com Preto",
      "Preto Fosco"
    ],
    colorImages: {
      "Sahara (Amadeirado)": "images/loja/jogo-panelas-ditalia-sahara.jpg",
      "Vanilla (Granitado)": "images/loja/jogo-panelas-ditalia-vanilla.jpg",
      "Prestígio (Marrom)": "images/loja/jogo-panelas-ditalia-prestigio.jpg",
      "Acqua (Azul)": "images/loja/jogo-panelas-ditalia-acqua.jpg",
      "Vermelha": "images/loja/jogo-panelas-ditalia-vermelha.jpg",
      "Rosé Gold": "images/loja/jogo-panelas-ditalia-rose.jpg",
      "Vermelha com Preto": "images/loja/jogo-panelas-ditalia-vermelha-preta.jpg",
      "Preto Fosco": "images/loja/jogo-panelas-ditalia-preta.jpg"
    },
    modelBadges: {
      "Vanilla (Granitado)": "Mais Vendida 🔥",
      "Sahara (Amadeirado)": "Tendência ⭐",
      "Rosé Gold": "Elegância"
    },
    badge: "Kit 10 Peças D'Itália",
    freeShipping: true,
    description: "🍳 Jogo de panelas 10 peças antiaderente com tampa de vidro temperado Bianco Vanilla Várias Cores Conjunto Kit Teflon D’Itália Cozinha Completa.\n\nCozinhe com o máximo de requinte, saúde e facilidade! Revestimento antiaderente cerâmico de alto desempenho que não gruda nada e permite preparar alimentos com quase zero óleo.\n\nO QUE VEM NO KIT COMPLETO (10 PEÇAS):\n• Panela 16 cm com tampa de vidro temperado e saída de vapor\n• Panela 18 cm com tampa de vidro temperado e saída de vapor\n• Caçarola 20 cm com tampa de vidro temperado e saída de vapor\n• Caçarola 22 cm com tampa de vidro temperado e saída de vapor\n• Frigideira Funda 22 cm antiaderente\n• Fervedor Leiteira 14 cm\n• Conjunto de 4 utensílios de silicone térmico de alta resistência\n\nCabos e pegadores ergonômicos Soft Touch que não esquentam as mãos. Fácil de limpar e compatível com fogões a gás, elétrico e vitrocerâmico."
  },
  {
    id: "kit-48-carrinhos-friccao-container-pista",
    title: "Kit 48 Carrinhos de Fricção Jogo de Cidade, Pista de Carros com Mapa Interativo, Brinquedo Educativo Divertido para Crianças",
    category: "brinquedos",
    categoryName: "Brinquedos",
    price: 79.90,
    oldPrice: 189.90,
    discount: "-58%",
    sold: "4.9k",
    rating: 4.9,
    reviews: 1720,
    image: "images/loja/kit-48-carrinhos-container-pista-1.jpg",
    images: [
      "images/loja/kit-48-carrinhos-container-pista-1.jpg",
      "images/loja/kit-48-carrinhos-container-pista-2.jpg",
      "images/loja/kit-48-carrinhos-container-pista-3.jpg",
      "images/loja/kit-48-carrinhos-container-pista-4.jpg",
      "images/loja/kit-48-carrinhos-container-pista-5.jpg"
    ],
    optionLabel: "Modelo:",
    colors: [
      "Maleta Container com Pista + 48 Carrinhos"
    ],
    colorImages: {
      "Maleta Container com Pista + 48 Carrinhos": "images/loja/kit-48-carrinhos-container-pista-1.jpg"
    },
    badge: "Kit 48 Carrinhos + Pista 🏎️",
    freeShipping: true,
    description: "🏎️ Kit 48 Carrinhos de Fricção Jogo de Cidade, Pista de Carros com Mapa Interativo, Brinquedo Educativo Divertido para Crianças.\n\nO sonho de qualquer criança! Uma super maleta container com alça que armazena todos os carrinhos organizados em gaveteiros de 4 níveis que se desdobram em uma pista de corrida completa com pistas, vagas de estacionamento e mapa urbano.\n\nO QUE ESTÁ INCLUSO:\n• 1 Maleta Container Portátil com alça de transporte reforçada\n• 4 Gaveteiros organizadores deslizantes de alta capacidade\n• 1 Pista de corrida e manobras integrada no topo\n• 48 Miniaturas de carros em liga metálica e ABS com tração por fricção (esportivos, viaturas policiais, caminhonetes, utilitários e clássicos de corrida)\n• Estimula coordenação motora, criatividade e senso de organização nas crianças."
  },
  {
    id: "piscina-inflavel-azul-pvc-reforcada",
    title: "Piscina Inflável Azul PVC Reforçada, Grande Capacidade Portátil Dobrável para Uso Interno e Externo",
    category: "casa",
    categoryName: "Casa & Conforto",
    price: 89.90,
    oldPrice: 249.00,
    discount: "-64%",
    sold: "6.2k",
    rating: 4.9,
    reviews: 2410,
    image: "images/loja/piscina-inflavel-dimensoes-opcoes.jpg",
    images: [
      "images/loja/piscina-inflavel-dimensoes-opcoes.jpg",
      "images/loja/piscina-inflavel-azul-26m-detalhe.jpg",
      "images/loja/piscina-inflavel-azul-2.jpg",
      "images/loja/piscina-inflavel-bomba-eletrica.jpg"
    ],
    optionLabel: "Opção / Modelo:",
    colors: [
      "Piscina 3 Andares (2,6m) - Sem Enchedor",
      "Piscina 3 Andares (2,6m) + Enchedor Elétrico",
      "Piscina 4 Andares (3,0m) - Sem Enchedor",
      "Piscina 4 Andares (3,0m) + Enchedor Elétrico",
      "Somente Enchedor / Bomba Elétrica"
    ],
    colorImages: {
      "Piscina 3 Andares (2,6m) - Sem Enchedor": "images/loja/piscina-inflavel-azul-26m-detalhe.jpg",
      "Piscina 3 Andares (2,6m) + Enchedor Elétrico": "images/loja/piscina-inflavel-azul-26m-detalhe.jpg",
      "Piscina 4 Andares (3,0m) - Sem Enchedor": "images/loja/piscina-inflavel-azul-2.jpg",
      "Piscina 4 Andares (3,0m) + Enchedor Elétrico": "images/loja/piscina-inflavel-azul-2.jpg",
      "Somente Enchedor / Bomba Elétrica": "images/loja/piscina-inflavel-bomba-eletrica.jpg"
    },
    modelBadges: {
      "Piscina 4 Andares (3,0m) + Enchedor Elétrico": "Mais Vendida 🔥",
      "Piscina 3 Andares (2,6m) + Enchedor Elétrico": "Recomendada ⭐"
    },
    badge: "Verão Reforçada 🌊",
    variantPrices: {
      "Piscina 4 Andares (3,0m) + Enchedor Elétrico": 119.90,
      "Piscina 4 Andares (3,0m) - Sem Enchedor": 98.90,
      "Piscina 3 Andares (2,6m) + Enchedor Elétrico": 99.90,
      "Piscina 3 Andares (2,6m) - Sem Enchedor": 89.90,
      "Somente Enchedor / Bomba Elétrica": 39.90
    },
    freeShipping: true,
    description: "🌊 Piscina Inflável Azul PVC Reforçada, Grande Capacidade Portátil Dobrável para Uso Interno e Externo.\n\nPerfeita para refrescar a família e as crianças nos dias ensolarados! Confeccionada em PVC espesso tricamada de alta densidade anti-furos, com bordas infláveis anatômicas ultra confortáveis.\n\nOPÇÕES PARA ESCOLHA:\n1. Piscina 3 Andares (2,6m) - Sem Enchedor (260 x 170 x 56 cm)\n2. Piscina 3 Andares (2,6m) + Enchedor Elétrico incluso (Infla em poucos minutos!)\n3. Piscina 4 Andares (3,0m) - Sem Enchedor (300 x 173 x 68 cm - Mega capacidade)\n4. Piscina 4 Andares (3,0m) + Enchedor Elétrico incluso\n5. Somente Enchedor / Bomba Elétrica Bivolt com bicos adaptadores multiuso\n\nVálvulas de escape rápido para esvaziar e dobrar compactamente em segundos."
  },
  {
    id: "esteira-eletrica-maat-brand-fitness",
    title: "Esteira Elétrica Fitness Profissional Plana Residencial MAAT BRAND com Controle Remoto",
    category: "casa",
    categoryName: "Casa & Conforto",
    price: 149.90,
    oldPrice: 699.00,
    discount: "-78%",
    sold: "3.7k",
    rating: 4.9,
    reviews: 1290,
    image: "images/loja/esteira-eletrica-maat-1.jpg",
    images: [
      "images/loja/esteira-eletrica-maat-1.jpg",
      "images/loja/esteira-eletrica-maat-2.jpg",
      "images/loja/esteira-eletrica-maat-3.jpg",
      "images/loja/esteira-eletrica-maat-4.jpg",
      "images/loja/esteira-eletrica-maat-5.jpg"
    ],
    optionLabel: "Modelo:",
    colors: [
      "Preto Fosco Oficial MAAT BRAND"
    ],
    colorImages: {
      "Preto Fosco Oficial MAAT BRAND": "images/loja/esteira-eletrica-maat-1.jpg"
    },
    voltages: ["110V", "220V"],
    badge: "Plana Residencial 🏃",
    freeShipping: true,
    description: "🏃 Esteira Elétrica Fitness Profissional Plana Residencial Cor Preto Controle MAAT BRAND.\n\nMantenha sua rotina saudável sem sair de casa! Ultra compacta, plana e silenciosa, perfeita para apartamentos e casas, podendo ser guardada deitada debaixo da cama ou sofá (apenas 12 cm de espessura).\n\nESPECIFICAÇÕES TÉCNICAS:\n• Faixa de velocidade: 1 a 12 km/h (da caminhada à corrida moderada)\n• Voltagens disponíveis: 110V ou 220V (escolha a sua opção)\n• Painel Digital LED integrado na base: exibe velocidade, tempo, distância e calorias em tempo real\n• Controle remoto sem fio ergonômico com ajuste de velocidade e botão de parada de emergência\n• Fita de corrida texturizada antiderrapante com amortecedores internos para preservar os joelhos\n• Rodinhas frontais integradas para transporte fácil sem esforço."
  },
  {
    id: "pipoqueira-eletrica-mondial-popflix-1200w",
    title: "Pipoqueira Elétrica Sem Óleo Mondial 1200w Popflix Bocal Direcionado",
    category: "eletro",
    categoryName: "Eletrodomésticos",
    price: 67.90,
    oldPrice: 179.90,
    discount: "-62%",
    sold: "7.6k",
    rating: 4.9,
    reviews: 2840,
    image: "images/loja/pipoqueira-mondial-popflix-1.jpg",
    images: [
      "images/loja/pipoqueira-mondial-popflix-1.jpg",
      "images/loja/pipoqueira-mondial-popflix-2.jpg",
      "images/loja/pipoqueira-mondial-popflix-3.jpg",
      "images/loja/pipoqueira-mondial-popflix-4.jpg",
      "images/loja/pipoqueira-mondial-popflix-5.jpg",
      "images/loja/pipoqueira-mondial-popflix-6.jpg",
      "images/loja/pipoqueira-mondial-popflix-7.jpg"
    ],
    optionLabel: "Modelo:",
    colors: [
      "Vermelha Popflix"
    ],
    colorImages: {
      "Vermelha Popflix": "images/loja/pipoqueira-mondial-popflix-1.jpg"
    },
    voltages: ["110V", "220V"],
    badge: "Pipoca Sem Óleo em 3 min 🍿",
    freeShipping: true,
    description: "🍿 Pipoqueira Elétrica Sem Óleo Mondial 1200w Bocal Direcionado.\n\nPipoca quentinha, crocante e saudável pronta em menos de 3 minutos, sem usar nenhuma gota de óleo nem gordura!\n\nPRINCIPAIS BENEFÍCIOS:\n• Potência de 1200W: Ar quente rápido e eficiente que estoura quase 100% dos grãos\n• Bocal direcionador: A pipoca sai direto na tigela sem sujeira\n• Colher dosadora inclusa: Mede a quantidade exata (100g de milho por ciclo) e serve para derreter manteiga por cima enquanto a pipoca estoura\n• Sistema de segurança contra superaquecimento\n• Base compacta com guarda-fio para economizar espaço no armário\n• Voltagens disponíveis: 110V e 220V."
  },
  {
    id: "bike-spinning-vymo-v100-residencial",
    title: "Bike Spinning Residencial Ajustável Painel até 120kg Treino em Casa Vymo V100",
    category: "casa",
    categoryName: "Casa & Conforto",
    price: 197.00,
    oldPrice: 899.00,
    discount: "-78%",
    sold: "2.8k",
    rating: 4.9,
    reviews: 910,
    image: "images/loja/bike-spinning-vymo-v100-1.jpg",
    images: [
      "images/loja/bike-spinning-vymo-v100-1.jpg",
      "images/loja/bike-spinning-vymo-v100-2.jpg",
      "images/loja/bike-spinning-vymo-v100-3.jpg",
      "images/loja/bike-spinning-vymo-v100-4.jpg",
      "images/loja/bike-spinning-vymo-v100-5.jpg",
      "images/loja/bike-spinning-vymo-v100-6.jpg",
      "images/loja/bike-spinning-vymo-v100-7.jpg",
      "images/loja/bike-spinning-vymo-v100-8.jpg"
    ],
    optionLabel: "Cor / Modelo:",
    colors: [
      "Preto com Detalhes Verde Limão (Edição V100)"
    ],
    colorImages: {
      "Preto com Detalhes Verde Limão (Edição V100)": "images/loja/bike-spinning-vymo-v100-1.jpg"
    },
    voltages: ["220V"],
    badge: "Até 120kg Resistente 🚴",
    freeShipping: true,
    description: "🚴 Bike SPINNING Residencial Ajustável Painel até 120kg Treino em Casa Vymo V100.\n\nTreine com conforto, intensidade e segurança no conforto da sua casa! Desenvolvida para queimar calorias e fortalecer pernas e glúteos com pedalada suave e silenciosa por correia.\n\nESPECIFICAÇÕES:\n• Peso máximo suportado: Até 120 kg com estrutura de aço carbono reforçado\n• Voltagem do painel: 220V\n• Painel digital multifuncional: Velocidade, distância, tempo, calorias e sensores de pulso cardíaco no guidão\n• Regulagem milimétrica de resistência mecânica por botão giratório\n• Guidão e selim anatômico ajustáveis em altura e profundidade\n• Pedais com cinta firma-pé de segurança\n• Acompanha garrafinha de hidratação esportiva com suporte duplo integrado."
  },
  {
    id: "bike-eletrica-dobravel-scooter-1000w",
    title: "Bicicleta Elétrica Dobrável Scooter Urbana 1000W 48V 15Ah com Cesto, Amortecedor Duplo e Painel Digital",
    category: "casa",
    categoryName: "Mobilidade Urbana",
    price: 289.00,
    oldPrice: 1890.00,
    discount: "-85%",
    sold: "2.1k",
    rating: 4.9,
    reviews: 780,
    image: "images/loja/bike-eletrica-1000w-vitrine.jpg",
    images: [
      "images/loja/bike-eletrica-1000w-vitrine.jpg",
      "images/loja/bike-eletrica-1000w-32kmh.jpg",
      "images/loja/bike-eletrica-1000w-specs.jpg",
      "images/loja/bike-eletrica-1000w-painel.jpg",
      "images/loja/bike-eletrica-1000w-suspensao.jpg",
      "images/loja/bike-eletrica-1000w-ladeira.jpg",
      "images/loja/bike-eletrica-1000w-motor.jpg",
      "images/loja/bike-eletrica-1000w-bms.jpg",
      "images/loja/bike-eletrica-1000w-freios.jpg"
    ],
    optionLabel: "Modelo:",
    colors: [
      "Preto com Aro Laranja (48V 15Ah)"
    ],
    colorImages: {
      "Preto com Aro Laranja (48V 15Ah)": "images/loja/bike-eletrica-1000w-vitrine.jpg"
    },
    badge: "1000W Potência ⚡",
    freeShipping: true,
    description: "⚡ Bicicleta Elétrica Dobrável Scooter Urbana 1000W com Autonomia até 60 km e Velocidade até 32 km/h.\n\nA revolução da mobilidade urbana sustentável! Agilidade no trânsito, economia total de combustível e sem necessidade de emplacamento.\n\nFICHA TÉCNICA:\n• Motor potente: 1000W com alto torque para arrancadas rápidas\n• Bateria: 48V 15Ah de íons de lítio com Sistema BMS Inteligente (proteção contra sobrecarga, curto e superaquecimento)\n• Velocidade máxima: 32 km/h com 3 modos de pilotagem (Econômico, Dinâmico e Sport)\n• Autonomia: Até 60 km por recarga completa\n• Subida de ladeiras: Supera inclinações de até 30° com facilidade\n• Suspensão: Sistema de amortecimento hidráulico duplo dianteiro e traseiro\n• Freios: Freio a disco duplo ventilado de resposta rápida\n• Guidão dobrável para caber no porta-malas do carro ou elevador\n• Acessórios inclusos: Cesto dianteiro espaçoso, assento macio com molas e bagageiro traseiro."
  },
  {
    id: "scooter-moto-eletrica-k3-20ah-duplo",
    title: "Moto Scooter Elétrica Urbana K3 HDJ 20Ah até 60km com Assento Duplo, Encosto, Cesto e Alarme Antifurto",
    category: "casa",
    categoryName: "Mobilidade Urbana",
    price: 297.00,
    oldPrice: 2490.00,
    discount: "-88%",
    sold: "1.9k",
    rating: 4.9,
    reviews: 640,
    image: "images/loja/scooter-eletrica-k3-urbana.jpg",
    images: [
      "images/loja/scooter-eletrica-k3-urbana.jpg",
      "images/loja/scooter-eletrica-k3-colonial.jpg",
      "images/loja/scooter-eletrica-k3-detalhes.jpg",
      "images/loja/scooter-eletrica-k3-dimensoes.jpg",
      "images/loja/scooter-eletrica-k3-amortecedor.jpg",
      "images/loja/scooter-eletrica-k3-cotidiano.jpg",
      "images/loja/scooter-eletrica-k3-autonomia.jpg",
      "images/loja/scooter-eletrica-k3-painel-alarme.jpg",
      "images/loja/scooter-eletrica-k3-feira.jpg"
    ],
    optionLabel: "Modelo:",
    colors: [
      "Preto Fosco com Grafismos K3"
    ],
    colorImages: {
      "Preto Fosco com Grafismos K3": "images/loja/scooter-eletrica-k3-urbana.jpg"
    },
    badge: "Assento Duplo + Alarme 🛵",
    freeShipping: true,
    description: "🛵 Moto Scooter Elétrica Urbana K3 HDJ 20Ah com Assento Duplo, Encosto e Cesto Frontal.\n\nPerfeita para o dia a dia brasileiro: levar e buscar as crianças na escola, fazer compras na feira ou supermercado, ir ao trabalho ou passeios de fim de semana.\n\nESPECIFICAÇÕES COMPLETAS:\n• Bateria de Alta Capacidade: 20Ah com autonomia de até 60 km por carga (recarga em menos de 8 horas)\n• Conforto para Dois: Assento principal anatômico + Assento traseiro para passageiro com encosto de segurança\n• Cesto frontal de grande capacidade (38 x 26 x 22 cm) + pedais/plataforma alargada para os pés\n• Painel Digital LCD inteligente: Velocímetro digital, nível de bateria e odômetro\n• Segurança total: Acompanha par de chaves físicas + controle remoto com alarme antifurto integrado\n• Iluminação completa: Farol halo redondo de LED, setas dianteiras pisca-pisca e luz de freio traseira\n• Suspensão dianteira hidráulica telescópica + amortecedores traseiros duplos com mola helicoidal (suave em qualquer pavimento)\n• Dimensões: 162 cm de comprimento total, 108 cm de altura com encosto, 62 cm de largura."
  },
  {
    id: "esteira-eletrica-walkingpad-inclinacao-5-anylife",
    title: "Esteira Elétrica Compacta Walking Pad com Inclinação 5° 1-6km/h Silenciosa Até 150kg Controle Remoto + Display ANYLIFE",
    category: "casa",
    categoryName: "Casa & Conforto",
    price: 169.90,
    oldPrice: 799.00,
    discount: "-79%",
    sold: "4.1k",
    rating: 4.9,
    reviews: 1530,
    image: "images/loja/esteira-walkingpad-vitrine-110v.jpg",
    images: [
      "images/loja/esteira-walkingpad-vitrine-110v.jpg",
      "images/loja/esteira-walkingpad-inclinada-220v.jpg",
      "images/loja/esteira-walkingpad-150kg-joelhos.jpg",
      "images/loja/esteira-walkingpad-150kg-specs.jpg",
      "images/loja/esteira-walkingpad-incline-desk.jpg",
      "images/loja/esteira-walkingpad-display-controle.jpg",
      "images/loja/esteira-walkingpad-modos-registro.jpg",
      "images/loja/esteira-walkingpad-silenciosa-motor.jpg",
      "images/loja/esteira-walkingpad-camadas-led.jpg",
      "images/loja/esteira-walkingpad-absorcao-40db.jpg"
    ],
    optionLabel: "Modelo:",
    colors: [
      "Preto com Detalhes Laranja (2 em 1)"
    ],
    colorImages: {
      "Preto com Detalhes Laranja (2 em 1)": "images/loja/esteira-walkingpad-vitrine-110v.jpg"
    },
    voltages: ["110V", "220V"],
    badge: "Inclinação 5° 2 em 1 ⚡",
    freeShipping: true,
    description: "🏃 Esteira Elétrica Compacta Walking Pad com Inclinação 5° | 1-6km/h | Silenciosa | Até 150kg | Controle Remoto + Display | Casa/Escritório (110/220V).\n\nA esteira mais inovadora da categoria! Tecnologia 2 em 1 que permite treinar em Modo Plano (0°) ou Modo Inclinado (5°) para queimar até 50% mais calorias com menor impacto nos joelhos.\n\nFICHA TÉCNICA:\n• Motor 2.5 HP Ultra Silencioso: Funcionamento abaixo de 45 dB, perfeito para usar enquanto assiste TV ou trabalha\n• Capacidade Reforçada: Suporta usuários de até 150 kg (330 lbs)\n• Amortecimento Pro: 6 amortecedores internos absorvem o impacto das articulações + cinto antiderrapante de 5 camadas\n• Display LED em tempo real: Tempo, velocidade, distância e calorias gastas\n• Controle remoto sem fio multifuncional ergonômico\n• Compacta e portátil: Cabe perfeitamente embaixo de mesas de trabalho (standing desk) ou sob a cama\n• Voltagens disponíveis: 110V e 220V."
  },
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
  },
  {
    id: "relogio-poedagar-910",
    title: "Relógio Masculino POEDAGAR 910 Luxo Aço Inoxidável Quartzo Com Data Luminosa 30M Negócios Presente",
    category: "eletronicos",
    categoryName: "Eletrônicos & Acessórios",
    price: 53.00,
    oldPrice: 109.98,
    discount: "-52%",
    sold: "4.6k",
    rating: 4.9,
    reviews: 1890,
    image: "images/loja/relogio-poedagar-capa.jpg",
    images: [
      "images/loja/relogio-poedagar-capa.jpg",
      "images/loja/relogio-poedagar-estojo.png",
      "images/loja/relogio-poedagar-azul-dourado.png",
      "images/loja/relogio-poedagar-branco-dourado.png",
      "images/loja/relogio-poedagar-azul-prata.png",
      "images/loja/relogio-poedagar-branco-prata.png",
      "images/loja/relogio-poedagar-preto-total.png"
    ],
    colors: [
      "Azul Dourado",
      "Branco Dourado",
      "Azul Prata",
      "Branco Prata",
      "Preto Total"
    ],
    colorImages: {
      "Azul Dourado": "images/loja/relogio-poedagar-azul-dourado.png",
      "Branco Dourado": "images/loja/relogio-poedagar-branco-dourado.png",
      "Azul Prata": "images/loja/relogio-poedagar-azul-prata.png",
      "Branco Prata": "images/loja/relogio-poedagar-branco-prata.png",
      "Preto Total": "images/loja/relogio-poedagar-preto-total.png"
    },
    urgency: { viewers: "1.420", stock: "16" },
    badge: "Luxo & Aço Inox",
    freeShipping: true,
    description: "Relógio Masculino POEDAGAR 910 Luxo Aço Inoxidável Quartzo Com Data Luminosa 30M Negócios Presente. Caixa e pulseira em aço inoxidável cirúrgico premium de alta durabilidade com fecho borboleta invisível. Movimento quartzo japonés de alta precisão com calendário de data e ponteiros luminescentes no escuro. Vidro de cristal mineral hardlex resistente a riscos. Resisténcia á prova d'água 30M (respingos, chuva e uso diário). Acompanha caixa oficial de luxo, manual e flanela - perfeito para presentear."
  },
  {
    id: "patinete-eletrico-dobravel-350w",
    title: "Patinete com Banco Elétrico Dobrável 350W | Autonomia 35KM + Velocidade 30KM/H | Suporta até 150KG",
    category: "brinquedos",
    categoryName: "Mobilidade & Lazer",
    price: 112.00,
    oldPrice: 1120.00,
    discount: "-90%",
    sold: "1.8k",
    rating: 4.9,
    reviews: 740,
    image: "images/loja/patinete-eletrico-com-assento.png",
    images: [
      "images/loja/patinete-eletrico-com-assento.png",
      "images/loja/patinete-eletrico-sem-assento.jpg",
      "images/loja/patinete-eletrico-uso-armazenamento.jpg",
      "images/loja/patinete-eletrico-andando.jpg",
      "images/loja/patinete-eletrico-banco-bag.jpg"
    ],
    colors: [
      "Com Assento",
      "Sem Assento"
    ],
    colorImages: {
      "Com Assento": "images/loja/patinete-eletrico-com-assento.png",
      "Sem Assento": "images/loja/patinete-eletrico-sem-assento.jpg"
    },
    variantPrices: {
      "Com Assento": 112.00,
      "Sem Assento": 98.00
    },
    urgency: { viewers: "2.850", stock: "9" },
    badge: "350W - 35KM",
    freeShipping: true,
    description: "Patinete com Banco Elétrico Dobrável 350W | Autonomia 35KM + Velocidade 30KM/H | Suporta até 150KG. Motor potente de 350W com bateria de lítio de alta autonomia de até 35 km e velocidade máxima de 30 km/h. Sistema de freio a disco duplo, farol dianteiro de LED e luz de freio. Estrutura reforçada dobrável em 3 segundos. Disponível na versão Com Assento (com banco e bag almofadada confortável) e Sem Assento."
  },
  {
    id: "aparelho-abdominal-multifuncional-ventosa",
    title: "Aparelho Abdominal Multifuncional com Ventosa Dupla e Elásticos de Resisténcia para Exercícios em Casa, Braços, Pernas e Abdômen",
    category: "beleza",
    categoryName: "Fitness & Saúde",
    price: 39.99,
    oldPrice: 199.00,
    discount: "-80%",
    sold: "3.5k",
    rating: 4.9,
    reviews: 1420,
    image: "images/loja/aparelho-abdominal-treino.jpg",
    images: [
      "images/loja/aparelho-abdominal-treino.jpg",
      "images/loja/aparelho-abdominal-ventosa-dupla.png",
      "images/loja/aparelho-abdominal-exercicios.jpg",
      "images/loja/aparelho-abdominal-rosa.jpg",
      "images/loja/aparelho-abdominal-cinza.jpg"
    ],
    colors: [
      "Rosa",
      "Preto",
      "Cinza"
    ],
    colorImages: {
      "Rosa": "images/loja/aparelho-abdominal-rosa.jpg",
      "Preto": "images/loja/aparelho-abdominal-treino.jpg",
      "Cinza": "images/loja/aparelho-abdominal-cinza.jpg"
    },
    urgency: { viewers: "1.780", stock: "21" },
    badge: "Ventosa Dupla",
    freeShipping: true,
    description: "Aparelho Abdominal Multifuncional com Ventosa Dupla e Elásticos de Resisténcia para Exercícios em Casa, Braços, Pernas e Abdômen. Base estável com ventosa dupla de alto vácuo que adere com máxima firmeza em pisos lisos. Acompanha cordas elásticas tensoras removíveis com pegador emborrachado para treinar abdômen, costas, braços e pernas. Apoio de pernas acolchoado com espuma macia e 3 níveis de regulagem de altura."
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
    variantPrices: {
      "Preto": 91.90,
      "Prateado": 91.90,
      "Bordô": 101.90
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
    variantPrices: {
      "Prateado": 89.90,
      "Laranja Cósmico": 99.90,
      "Azul Intenso": 99.90
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
    variantPrices: {
      "Preto": 87.90,
      "Branco": 87.90,
      "Rosa": 97.90,
      "Verde": 97.90,
      "Azul": 97.90
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
    variantPrices: {
      "Preto Titânio": 88.90,
      "Preto Titanium": 88.90,
      "Branco Titânio": 88.90,
      "Prata Titânio": 88.90,
      "Azul Titânio": 98.90,
      "Azul Titanium": 98.90
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
    variantPrices: {
      "Preto": 89.90,
      "Branco": 89.90,
      "Prata": 89.90,
      "Violeta": 99.90,
      "Azul": 99.90
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
    variantPrices: {
      "Branco": 88.90,
      "Azul": 98.90,
      "Amarela": 98.90,
      "Rosa": 98.90
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
    variantPrices: {
      "Prata": 85.90,
      "Cinza Espacial": 85.90,
      "Laranjado": 95.90,
      "Azul Marinho": 95.90
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