import Service from "./Service";


const services: Service[] = [
  {
    id: "c1f2a8c2-bab1-4f87-8d23-12e75c6c1a01",
    name: "Combo Premium",
    description: "Pacote completo com corte de cabelo masculino, corte infantil, barba detalhada, manicure, pedicure e experiência especial de noivo. O cuidado que você merece, da cabeça aos pés, em um só atendimento.",
    price: 40.0,
    slots: 3,
    imgUrl: "https://mc.surb.com.br/api/v1/buckets/barba-brutal/objects/download?preview=true&prefix=servicos/combo.jpg",
  },
  {
    id: "d4e9b1e3-8c57-4c0a-bb13-a9f7d113b4aa",
    name: "Corte de Barba",
    description: "Barba feita com toalha quente, navalha e óleo hidratante. Contorno impecável para um visual limpo, elegante e bem cuidado.",
    price: 35.0,
    slots: 2,
    imgUrl: "https://mc.surb.com.br/api/v1/buckets/barba-brutal/objects/download?preview=true&prefix=servicos/corte-de-barba.jpg",
  },
  {
    id: "e6b8e6d5-2db6-42b4-bb84-9fdb4aef42b4",
    name: "Corte de Cabelo",
    description: "Corte com máquina ou tesoura, finalização com pomada e alinhamento preciso. Ideal para manter o estilo com praticidade e qualidade profissional",
    price: 70.0,
    slots: 3,
    imgUrl: "https://mc.surb.com.br/api/v1/buckets/barba-brutal/objects/download?preview=true&prefix=servicos/corte-de-cabelo.jpg",
  },
  {
    id: "a9c3d11f-7df7-4a74-9d88-7a0c98aeb2c7",
    name: "Corte Infantil",
    description: "Corte de cabelo pensado para crianças, com todo cuidado, paciência e atenção. Ambiente acolhedor e profissionais especializados para garantir uma boa experiência.",
    price: 20.0,
    slots: 2,
    imgUrl: "https://mc.surb.com.br/api/v1/buckets/barba-brutal/objects/download?preview=true&prefix=servicos/corte-infantil.jpg",
  },
  {
    id: "fdb13e8f-dc1d-41c1-baa1-57eb273d7289",
    name: "Dia de Noivo",
    description: "Atendimento exclusivo para o grande dia: corte, barba, hidratação, sobrancelha e relaxamento. Você no seu melhor visual, com tranquilidade e estilo para o momento mais especial.",
    price: 45.0,
    slots: 1,
    imgUrl: "https://mc.surb.com.br/api/v1/buckets/barba-brutal/objects/download?preview=true&prefix=servicos/dia-de-noivo.jpg",
  },
  {
    id: "b3d8b3b1-0d70-4bc4-b524-1b1f3f33a6ab",
    name: "Manicure e Pedicure",
    description: "Limpeza, corte e hidratação de unhas e cutículas. Mãos e pés bem cuidados, com aparência limpa e saudável, sem perder a masculinidade.",
    price: 50.0,
    slots: 1,
    imgUrl: "https://mc.surb.com.br/api/v1/buckets/barba-brutal/objects/download?preview=true&prefix=servicos/manicure-pedicure.jpg",
  },
];

export { services };
