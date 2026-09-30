import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const LanguageContext = createContext(null)

export const copy = {
  it: {
    langLabel: 'Lingua',
    brandStars: 'Quattro stelle',
    nav: {
      home: 'Home',
      about: 'Chi Siamo',
      rooms: 'Camere',
      services: 'Servizi',
      gallery: 'Galleria',
      contact: 'Contatti',
      book: 'Prenota',
      openMenu: 'Apri menu',
      closeMenu: 'Chiudi menu',
    },
    hero: {
      kicker: 'Costa Tirrenica · dal 1995',
      title: 'Hotel Bella Vista',
      subtitle: 'Lusso e quiete, affacciati sul mare',
      book: 'Prenota ora',
      more: 'Scopri di più',
      scroll: 'Scorri verso il basso',
    },
    about: {
      title: 'Chi Siamo',
      imageAlt: "Hall dell'Hotel Bella Vista",
      kicker: 'La maison',
      heading: 'Un indirizzo sul mare, dal 1995',
      p1: "Dal 1995, Hotel Bella Vista è il simbolo dell'ospitalità di lusso sulla costa. Con 120 camere elegantemente arredate, offriamo un'esperienza indimenticabile ai nostri ospiti da tutto il mondo.",
      p2: 'La nostra missione è creare momenti speciali in un\'atmosfera di raffinatezza e tranquillità, dove ogni dettaglio è pensato per il vostro benessere.',
      features: [
        { title: 'Posizione Esclusiva', desc: 'Affacciato sul mare con vista panoramica mozzafiato' },
        { title: 'Servizi Lussuosi', desc: 'Spa, piscina, ristorante gourmet e concierge 24/7' },
        { title: 'Esperienza Personalizzata', desc: 'Staff dedicato al vostro benessere e comfort' },
      ],
    },
    rooms: {
      title: 'Le Nostre Camere',
      perNight: 'notte',
      details: 'Vedi Dettagli',
      close: 'Chiudi',
      bookThis: 'Prenota questa camera',
      items: {
        standard: {
          name: 'Camera Standard',
          description: 'Elegante camera con vista giardino',
          details: '28 m² con letto queen, scrivania, minibar e bagno in marmo. Colazione inclusa e accesso alla piscina.',
        },
        deluxe: {
          name: 'Camera Deluxe',
          description: 'Spaziosa con vasca jacuzzi e balcone',
          details: '40 m², letto king, jacuzzi, balcone privato e accappatoi. Servizio in camera fino a mezzanotte.',
        },
        suite: {
          name: 'Suite Presidenziale',
          description: 'Il massimo del lusso con vista mare',
          details: '75 m² con soggiorno separato, terrazza sul mare, vasca freestanding e maggiordomo dedicato.',
        },
        family: {
          name: 'Camera Family',
          description: 'Perfetta per famiglie con spazi ampi',
          details: 'Due ambienti comunicanti, fino a 4 ospiti, culle su richiesta e accesso diretto al giardino.',
        },
      },
    },
    services: {
      title: 'I Nostri Servizi',
      intro: "Ogni soggiorno include il meglio dell'ospitalità Bella Vista, dalla spa sul mare al ristorante con vista sulla baia.",
      items: [
        { name: 'Spa', desc: 'Trattamenti rilassanti e rigeneranti' },
        { name: 'Ristorante', desc: 'Cucina gourmet con chef stellato' },
        { name: 'Palestra', desc: 'Attrezzature moderne e trainer' },
        { name: 'WiFi Gratuito', desc: "Internet ad alta velocità in tutto l'hotel" },
        { name: 'Parcheggio', desc: 'Parcheggio privato coperto' },
        { name: 'Concierge', desc: 'Servizio disponibile 24 ore' },
      ],
    },
    gallery: {
      title: 'Galleria',
      close: 'Chiudi immagine',
      alts: [
        'Piscina a sfioro con vista mare',
        'Resort al tramonto',
        "Facciata dell'hotel",
        'Camera con biancheria bianca',
        'Tavola del ristorante gourmet',
        'Spa con candele',
      ],
    },
    contact: {
      title: 'Contatti',
      heading: 'Scrivici',
      intro: 'Per richieste speciali, eventi o informazioni sul soggiorno, il nostro team risponde entro poche ore.',
      name: 'Nome',
      email: 'Email',
      message: 'Messaggio',
      namePlaceholder: 'Il tuo nome',
      emailPlaceholder: 'nome@email.it',
      messagePlaceholder: 'Come possiamo aiutarti?',
      required: 'Compila nome, email e messaggio.',
      invalidEmail: 'Inserisci un indirizzo email valido.',
      sent: 'Messaggio ricevuto. Ti risponderemo a breve.',
      submit: 'Invia messaggio',
    },
    footer: {
      blurb: 'Ospitalità sulla costa dal 1995. Camere, spa e cucina con vista mare.',
      explore: 'Esplora',
      follow: 'Seguici',
      rights: 'Tutti i diritti riservati.',
    },
    booking: {
      title: 'Prenota il soggiorno',
      close: 'Chiudi prenotazione',
      name: 'Nome',
      email: 'Email',
      checkIn: 'Check-in',
      checkOut: 'Check-out',
      guests: 'Ospiti',
      room: 'Camera',
      required: 'Compila nome, email e le date del soggiorno.',
      dates: 'La data di check-out deve essere successiva al check-in.',
      submit: 'Invia richiesta',
      done: 'Chiudi',
      confirm: ({ name, email, room, checkIn, checkOut, guests }) =>
        `Richiesta registrata per ${name}. Ti contatteremo a ${email} per confermare la ${room} dal ${checkIn} al ${checkOut} (${guests} ospiti).`,
    },
  },
  en: {
    langLabel: 'Language',
    brandStars: 'Four stars',
    nav: {
      home: 'Home',
      about: 'About',
      rooms: 'Rooms',
      services: 'Services',
      gallery: 'Gallery',
      contact: 'Contact',
      book: 'Book',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    hero: {
      kicker: 'Tyrrhenian Coast · since 1995',
      title: 'Hotel Bella Vista',
      subtitle: 'Luxury and calm, facing the sea',
      book: 'Book now',
      more: 'Discover more',
      scroll: 'Scroll down',
    },
    about: {
      title: 'About Us',
      imageAlt: 'Hotel Bella Vista lobby',
      kicker: 'The house',
      heading: 'An address by the sea, since 1995',
      p1: 'Since 1995, Hotel Bella Vista has been a symbol of luxury hospitality on the coast. With 120 elegantly furnished rooms, we offer an unforgettable stay to guests from around the world.',
      p2: 'Our mission is to create special moments in an atmosphere of refinement and calm, where every detail is designed for your wellbeing.',
      features: [
        { title: 'Exclusive Location', desc: 'Overlooking the sea with a breathtaking panoramic view' },
        { title: 'Luxury Services', desc: 'Spa, pool, gourmet restaurant and 24/7 concierge' },
        { title: 'Personal Experience', desc: 'A team devoted to your comfort and wellbeing' },
      ],
    },
    rooms: {
      title: 'Our Rooms',
      perNight: 'night',
      details: 'View details',
      close: 'Close',
      bookThis: 'Book this room',
      items: {
        standard: {
          name: 'Standard Room',
          description: 'Elegant room with garden view',
          details: '28 m² with a queen bed, desk, minibar and marble bathroom. Breakfast included and access to the pool.',
        },
        deluxe: {
          name: 'Deluxe Room',
          description: 'Spacious, with a jacuzzi and balcony',
          details: '40 m², king bed, jacuzzi, private balcony and robes. In-room service until midnight.',
        },
        suite: {
          name: 'Presidential Suite',
          description: 'The height of luxury, with a sea view',
          details: '75 m² with a separate living room, sea-facing terrace, freestanding bath and a dedicated butler.',
        },
        family: {
          name: 'Family Room',
          description: 'Ideal for families, with generous space',
          details: 'Two connecting rooms, up to 4 guests, cots on request and direct access to the garden.',
        },
      },
    },
    services: {
      title: 'Our Services',
      intro: 'Every stay includes the best of Bella Vista hospitality, from the seafront spa to the restaurant overlooking the bay.',
      items: [
        { name: 'Spa', desc: 'Relaxing and restorative treatments' },
        { name: 'Restaurant', desc: 'Gourmet cuisine by a starred chef' },
        { name: 'Gym', desc: 'Modern equipment and a trainer' },
        { name: 'Free WiFi', desc: 'High-speed internet throughout the hotel' },
        { name: 'Parking', desc: 'Private covered parking' },
        { name: 'Concierge', desc: 'Service available around the clock' },
      ],
    },
    gallery: {
      title: 'Gallery',
      close: 'Close image',
      alts: [
        'Infinity pool with sea view',
        'Resort at sunset',
        'Hotel façade',
        'Room with white linens',
        'Gourmet dining table',
        'Candlelit spa',
      ],
    },
    contact: {
      title: 'Contact',
      heading: 'Write to us',
      intro: 'For special requests, events or stay details, our team replies within a few hours.',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'name@email.com',
      messagePlaceholder: 'How can we help?',
      required: 'Please fill in name, email and message.',
      invalidEmail: 'Enter a valid email address.',
      sent: 'Message received. We will reply shortly.',
      submit: 'Send message',
    },
    footer: {
      blurb: 'Coastal hospitality since 1995. Rooms, spa and dining with a sea view.',
      explore: 'Explore',
      follow: 'Follow us',
      rights: 'All rights reserved.',
    },
    booking: {
      title: 'Book your stay',
      close: 'Close booking',
      name: 'Name',
      email: 'Email',
      checkIn: 'Check-in',
      checkOut: 'Check-out',
      guests: 'Guests',
      room: 'Room',
      required: 'Please fill in name, email and your stay dates.',
      dates: 'Check-out must be after check-in.',
      submit: 'Send request',
      done: 'Close',
      confirm: ({ name, email, room, checkIn, checkOut, guests }) =>
        `Request received for ${name}. We will contact you at ${email} to confirm the ${room} from ${checkIn} to ${checkOut} (${guests} guests).`,
    },
  },
  pt: {
    langLabel: 'Idioma',
    brandStars: 'Quatro estrelas',
    nav: {
      home: 'Início',
      about: 'Sobre',
      rooms: 'Quartos',
      services: 'Serviços',
      gallery: 'Galeria',
      contact: 'Contactos',
      book: 'Reservar',
      openMenu: 'Abrir menu',
      closeMenu: 'Fechar menu',
    },
    hero: {
      kicker: 'Costa Tirrena · desde 1995',
      title: 'Hotel Bella Vista',
      subtitle: 'Luxo e calma, de frente para o mar',
      book: 'Reservar agora',
      more: 'Descubra mais',
      scroll: 'Descer',
    },
    about: {
      title: 'Sobre nós',
      imageAlt: 'Hall do Hotel Bella Vista',
      kicker: 'A casa',
      heading: 'Um endereço à beira-mar, desde 1995',
      p1: 'Desde 1995, o Hotel Bella Vista é um símbolo da hospitalidade de luxo na costa. Com 120 quartos elegantemente decorados, oferecemos uma estadia inesquecível a hóspedes de todo o mundo.',
      p2: 'A nossa missão é criar momentos especiais numa atmosfera de requinte e tranquilidade, em que cada detalhe é pensado para o seu bem-estar.',
      features: [
        { title: 'Localização exclusiva', desc: 'De frente para o mar, com uma vista panorâmica deslumbrante' },
        { title: 'Serviços de luxo', desc: 'Spa, piscina, restaurante gourmet e concierge 24 horas' },
        { title: 'Experiência personalizada', desc: 'Uma equipa dedicada ao seu conforto e bem-estar' },
      ],
    },
    rooms: {
      title: 'Os nossos quartos',
      perNight: 'noite',
      details: 'Ver detalhes',
      close: 'Fechar',
      bookThis: 'Reservar este quarto',
      items: {
        standard: {
          name: 'Quarto Standard',
          description: 'Quarto elegante com vista para o jardim',
          details: '28 m² com cama queen, secretária, minibar e casa de banho em mármore. Pequeno-almoço incluído e acesso à piscina.',
        },
        deluxe: {
          name: 'Quarto Deluxe',
          description: 'Amplo, com jacuzzi e varanda',
          details: '40 m², cama king, jacuzzi, varanda privada e roupões. Serviço de quarto até à meia-noite.',
        },
        suite: {
          name: 'Suite Presidencial',
          description: 'O máximo do luxo, com vista para o mar',
          details: '75 m² com sala separada, terraço sobre o mar, banheira independente e mordomo dedicado.',
        },
        family: {
          name: 'Quarto Familiar',
          description: 'Ideal para famílias, com espaço amplo',
          details: 'Dois ambientes comunicantes, até 4 hóspedes, berços a pedido e acesso direto ao jardim.',
        },
      },
    },
    services: {
      title: 'Os nossos serviços',
      intro: 'Cada estadia inclui o melhor da hospitalidade Bella Vista, do spa à beira-mar ao restaurante com vista para a baía.',
      items: [
        { name: 'Spa', desc: 'Tratamentos relaxantes e regeneradores' },
        { name: 'Restaurante', desc: 'Cozinha gourmet com chef estrela' },
        { name: 'Ginásio', desc: 'Equipamento moderno e treinador' },
        { name: 'WiFi gratuito', desc: 'Internet de alta velocidade em todo o hotel' },
        { name: 'Estacionamento', desc: 'Estacionamento privado coberto' },
        { name: 'Concierge', desc: 'Serviço disponível 24 horas' },
      ],
    },
    gallery: {
      title: 'Galeria',
      close: 'Fechar imagem',
      alts: [
        'Piscina infinita com vista para o mar',
        'Resort ao pôr do sol',
        'Fachada do hotel',
        'Quarto com roupa de cama branca',
        'Mesa do restaurante gourmet',
        'Spa com velas',
      ],
    },
    contact: {
      title: 'Contactos',
      heading: 'Escreva-nos',
      intro: 'Para pedidos especiais, eventos ou informações sobre a estadia, a nossa equipa responde em poucas horas.',
      name: 'Nome',
      email: 'Email',
      message: 'Mensagem',
      namePlaceholder: 'O seu nome',
      emailPlaceholder: 'nome@email.pt',
      messagePlaceholder: 'Como podemos ajudar?',
      required: 'Preencha nome, email e mensagem.',
      invalidEmail: 'Introduza um email válido.',
      sent: 'Mensagem recebida. Responderemos em breve.',
      submit: 'Enviar mensagem',
    },
    footer: {
      blurb: 'Hospitalidade na costa desde 1995. Quartos, spa e cozinha com vista para o mar.',
      explore: 'Explorar',
      follow: 'Siga-nos',
      rights: 'Todos os direitos reservados.',
    },
    booking: {
      title: 'Reserve a estadia',
      close: 'Fechar reserva',
      name: 'Nome',
      email: 'Email',
      checkIn: 'Check-in',
      checkOut: 'Check-out',
      guests: 'Hóspedes',
      room: 'Quarto',
      required: 'Preencha nome, email e as datas da estadia.',
      dates: 'O check-out deve ser posterior ao check-in.',
      submit: 'Enviar pedido',
      done: 'Fechar',
      confirm: ({ name, email, room, checkIn, checkOut, guests }) =>
        `Pedido registado para ${name}. Entraremos em contacto através de ${email} para confirmar o ${room} de ${checkIn} a ${checkOut} (${guests} hóspedes).`,
    },
  },
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('hbv-lang')
    return saved === 'en' || saved === 'pt' ? saved : 'it'
  })

  useEffect(() => {
    localStorage.setItem('hbv-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t: copy[lang] }), [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useI18n() {
  return useContext(LanguageContext)
}
