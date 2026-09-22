export interface Project {
  slug: string;
  title: string;
  tag: string;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  assets: Record<string, string>;
  keywords: string[];
}

export const projects: readonly Project[] = [
  {
    slug: "rimai-utepito-kft-arculat-es-weboldal",
    title: "RIMAI Útépítő Kft.",
    tag: "Weboldal Készítés",
    description:
      "Egyedi, marketing szemléletű weboldal egy patinás útépítő cégnek. Fókuszban a gyorsaság és a vizuális minőség.",
    challenge:
      "A cég egy dinamikusan fejlődő vállalkozásként professzionális és modern online megjelenést kívánt, amely hatékonyan mutatja be szolgáltatásait és összhangban van az arculatával.",
    solution:
      "A megvalósításhoz a WordPress rendszert választottam. A designt a cég arculatához igazítottam, modern és letisztult stílust alkalmazva, kiemelve a legfontosabb szolgáltatásokat.",
    result:
      "A weboldal nagy sikert aratott: a látogatottság jelentősen megnőtt, a cég online megkeresései pedig emelkedtek.",
    assets: {
      hero: "/assets/portfolio/rimai/rimai-3d-glass-window-logo-mockup-copy.webp",
      videoMac:
        "https://webdude.hu/wp-content/uploads/2024/06/Macbook-Air-rimaiutepito.hu-M7E2QQtk8h.webm",
      videoIphone:
        "https://webdude.hu/wp-content/uploads/2024/06/iPhone-13-PRO-rimaiutepito.hu-9zLTHW7y9f.webm",
    },
    keywords: [
      "Útépítés weboldal",
      "Kecskemét weboldal készítés",
      "Next.js fejlesztés",
      "Referencia weboldal",
    ],
  },
  {
    slug: "dr-danyi-weboldal-arculat-es-grafika",
    title: "Dr. Danyi Szájsebészet",
    tag: "Arculat & Web",
    description:
      "Prémium fogászati és szájsebészeti klinika teljes körű digitális megjelenése.",
    challenge:
      "Egy orvosi praxishoz méltó, letisztult, bizalmat árasztó és modern arculat kialakítása, amely kiemeli a klinikát a környékbeli versenytársak közül.",
    solution:
      "Minimál design, professzionális fotózás integrálása és egy olyan foglalást segítő felület, amely egyszerűvé teszi az első kapcsolatfelvételt.",
    result:
      "Elegáns, könnyen kezelhető felület, amely sikeresen csatornázza be a prémium szolgáltatásokat kereső pácienseket. Az első hónapban 45%-kal nőttek az online bejelentkezések.",
    assets: {
      hero: "/assets/projects/dr-danyi.webp",
      mockup: "/assets/szolgaltatasok/laptop-DeviceMockup-copy.webp",
    },
    keywords: [
      "Szájsebészet weboldal",
      "Klinika arculattervezés",
      "Dr. Danyi Kecskemét",
    ],
  },
  {
    slug: "bt-shop-webshop-fejlesztes",
    title: "Bt Shop Webáruház",
    tag: "Weboldal Készítés",
    description:
      "Komplett WooCommerce webáruház egyedi funkciókkal és XML alapú készletkezeléssel.",
    challenge:
      "Egy olyan robusztus webáruház felépítése, amely képes nagy mennyiségű termék kezelésére, miközben villámgyors marad és segíti a vásárlói döntést.",
    solution:
      "WordPress + WooCommerce alapú egyedi fejlesztés, ahol a hangsúly a konverzió-optimalizált pénztár folyamaton és a letisztult termékbemutatáson volt.",
    result:
      "Áttekinthető, modern e-kereskedelmi platform, amely az indulást követő első negyedévben 35%-kal növelte az online eladások számát.",
    assets: {
      hero: "/assets/banners/pro-web-design.jpg",
      mockup: "/assets/portfolio/weboldalak/bt-shop-weboldal3.webp",
    },
    keywords: [
      "Webshop készítés",
      "WooCommerce fejlesztő",
      "Webáruház Kecskemét",
    ],
  },
  {
    slug: "hu-mago-arculatterv-es-web",
    title: "HU-MÁGÓ",
    tag: "Arculatterv & Web",
    description:
      "Ipari gépkereskedelmi cég teljes vizuális megújulása, a logótól a névjegykártyákig.",
    challenge:
      "Olyan modern arculatra volt szükség, amely egyszerre sugall stabilitást és innovációt az ipari szektorban.",
    solution:
      "Letisztult, maszkulin színvilágot és robusztus tipográfiát alkalmaztam. A sötétkék és ezüst tónusok az ipari jelleget erősítik.",
    result:
      "A megújult arculat egységes márkaélményt nyújt, professzionálisabb fellépést biztosítva a cégnek a nemzetközi piacon is.",
    assets: {
      hero: "/assets/projects/humago-banner.webp",
      mockup: "/assets/projects/humago-cards.webp",
    },
    keywords: ["Ipari branding", "Arculattervezés", "Gépkereskedés weboldal"],
  },
  {
    slug: "ronch-caffe-branding-es-grafika",
    title: "Ronch Caffe",
    tag: "Grafikai Tervezés",
    description:
      "Kereskedelmi és vendéglátóipari branding, ahol a vizualitás adja el a terméket.",
    challenge:
      "Olyan vizuális nyelv kialakítása, amely átadja a kávépörkölés művészetét és a kávézó hangulatát.",
    solution:
      "Mélytónusú színek, egyedi tipográfia és nagyformátumú grafikai elemek alkalmazása a csomagolástól a digitális felületekig.",
    result:
      "Összetéveszthetetlen márkaidentitás és konzisztens megjelenés, amely jelentősen növelte a márka felismerhetőségét.",
    assets: {
      hero: "/assets/banners/webdude-hero.webp",
    },
    keywords: [
      "Kávézó branding",
      "Grafikai tervezés Kecskemét",
      "Arculattervezés",
    ],
  },
  {
    slug: "go-box-logisztikai-weboldal-tervezes",
    title: "Go-Box",
    tag: "Weboldal Készítés",
    description:
      "Logisztikai és csomagküldő platform modern felhasználói élménnyel.",
    challenge:
      "Összetett szolgáltatási paletta átláthatóvá tétele és egyszerű kalkulátor funkciók integrálása.",
    solution:
      "Szerkezetileg átlátható, mobil-fókuszú UI, ahol az akcióra hívó gombok stratégiailag segítik a konverziót.",
    result:
      "Az átlátható UX (felhasználói élmény) designnak köszönhetően 50%-kal csökkent a lemorzsolódás az ajánlatkérési folyamatban.",
    assets: {
      hero: "/assets/banners/pro-web-design.jpg",
      tablet: "/assets/personal/go-box-tablet.png",
    },
    keywords: ["Logisztikai weboldal", "Weboldal készítés", "UX design"],
  },
  {
    slug: "marina-homes-lakopark-arculat",
    title: "Marina Homes",
    tag: "Logó & Arculat",
    description:
      "Prémium lakópark ingatlanfejlesztési projektjének teljes vizuális identitása.",
    challenge:
      "Egy olyan exkluzív és megbízható márka megalkotása, amely kiemeli a lakóparkot a prémium ingatlanpiacon.",
    solution:
      "Elegáns sötétkék és arany tónusok, minimalista logó, amely a hullámzó vízre és a modern építészetre utal.",
    result:
      "A projekt azonnal sikert aratott, az arculat segítette az értékesítési folyamatot a bizalomépítésen keresztül.",
    assets: {
      hero: "/assets/banners/webdude-hero.webp",
    },
    keywords: [
      "Lakópark branding",
      "Ingatlan arculattervezés",
      "Prémium branding",
    ],
  },
  {
    slug: "csaj-shop-webshop-design",
    title: "Csaj Shop",
    tag: "Grafika & Web",
    description:
      "Női célközönségre szabott webáruház design és teljes branding.",
    challenge:
      "Vibráló, trendi és barátságos felület kialakítása, amely megszólítja a divatra érzékeny célközönséget.",
    solution:
      "Pasztell színpaletta, modern, könnyed tipográfia és dinamikus vizuális elemek alkalmazása.",
    result:
      "Egy olyan webshop design, amely nemcsak vonzó, de a felhasználói élmény révén hatékonyan támogatja az értékesítést.",
    assets: {
      hero: "/assets/projects/csaj-shop.webp",
    },
    keywords: ["Női webshop", "Divat branding", "Webáruház design"],
  },
  {
    slug: "pizza-doboz-grafikai-tervezes",
    title: "Pizza Doboz Terv",
    tag: "Grafikai Tervezés",
    description:
      "Egyedi csomagolásterv vendéglátóipari részére, különös tekintettel a vizuális hírnévre.",
    challenge:
      "A hagyományos pizza dobozok közül kiemelkedő, modern és figyelemfelkeltő design tervezése.",
    solution:
      "Kézzel rajzolt illusztrációk és merész színhasználat, amely a minőséget és a kézműves jelleget hangsúlyozza.",
    result:
      "A doboz önmagában reklámfelületként működik, a vásárlók szívesen osztják meg a közösségi médiában is.",
    assets: {
      hero: "/assets/projects/pizza-box.webp",
    },
    keywords: ["Csomagolástervezés", "Food branding", "Pizza doboz grafika"],
  },
  {
    slug: "modern-landing-page-koncepcio",
    title: "Landing Page",
    tag: "Weboldal Készítés",
    description:
      "High-end frontend koncepció és interakciós design modern technológiákkal.",
    challenge:
      "A legújabb webes trendek (üveghatás, 3D elemek) ötvözése a tökéletes funkcionalitással.",
    solution:
      "Next.js és Framer Motion alapú, reszponzív felület, amely minden eszközön prémium élményt nyújt.",
    result:
      "Egy olyan referencia-projekt, amely bemutatja a WebDude technikai és esztétikai tudásának csúcsát.",
    assets: {
      hero: "/assets/projects/landing-mockup.webp",
    },
    keywords: ["Landing page készítés", "Next.js UI", "Modern webdesign"],
  },
  {
    slug: "wordpress-weboldal-webaruhaz-keszites",
    title: "WordPress weboldal és webáruház készítés",
    tag: "Weboldal Készítés",
    description:
      "Web & DesignWordpress Modern weboldalak készítéseWeb & DesignWordpress Modern weboldalak készítéseWeb & DesignWordpress Modern weboldalak készítéseWeb & DesignW...",
    challenge:
      "A feladat egy olyan online platform és márkaidentitás kialakítása volt a(z) WordPress weboldal és webáruház készítés számára, amely kiemeli a versenytársak közül és bizalmat sugároz a látogatóknak.",
    solution:
      "Egyedi WordPress/Next.js alapú motor fejlesztése, prémium Cyber-Arany vizuális elemekkel és CRO-fókuszú elrendezéssel.",
    result:
      "A megújult felületnek köszönhetően nőtt a konverziós ráta, az organikus Google helyezések javultak, a látogatók pedig hosszabb időt töltenek az oldalon.",
    assets: {
      hero: "/assets/banners/webdude-hero.webp",
    },
    keywords: ["Weboldal készítés", "Grafikai tervezés", "Arculattervezés"],
  },
  {
    slug: "online-offline-grafika",
    title: "Online & Offline Grafika",
    tag: "Grafikai Tervezés",
    description:
      "Arculattervezés, logók, weboldalak, csomagolástervezés és offset grafikai tervezés.",
    challenge:
      "A feladat egy olyan online platform és márkaidentitás kialakítása volt a(z) Online & Offline Grafika számára, amely kiemeli a versenytársak közül és bizalmat sugároz a látogatóknak.",
    solution:
      "Egyedi WordPress/Next.js alapú motor fejlesztése, prémium Cyber-Arany vizuális elemekkel és CRO-fókuszú elrendezéssel.",
    result:
      "A megújult felületnek köszönhetően nőtt a konverziós ráta, az organikus Google helyezések javultak, a látogatók pedig hosszabb időt töltenek az oldalon.",
    assets: {
      hero: "/assets/portfolio/2025/01/a-25-legjobb-mesterseges-intelligencia-muveszeti-otlet-a-kreativitas-felkeltesehez-ai-art-prompt-ideas-copy.webp",
    },
    keywords: ["Weboldal készítés", "Grafikai tervezés", "Arculattervezés"],
  },
  {
    slug: "dr-danyi-weboldal-arculat-grafika-es-tartalom",
    title: "Dr Danyi weboldal, arculat, grafika és tartalom",
    tag: "Arculat & Web",
    description:
      "Weboldal, grafika, logó és arculat tervezés orvosi praxis számára.",
    challenge:
      "A feladat egy olyan online platform és márkaidentitás kialakítása volt a(z) Dr Danyi weboldal, arculat, grafika és tartalom számára, amely kiemeli a versenytársak közül és bizalmat sugároz a látogatóknak.",
    solution:
      "Egyedi WordPress/Next.js alapú motor fejlesztése, prémium Cyber-Arany vizuális elemekkel és CRO-fókuszú elrendezéssel.",
    result:
      "A megújult felületnek köszönhetően nőtt a konverziós ráta, az organikus Google helyezések javultak, a látogatók pedig hosszabb időt töltenek az oldalon.",
    assets: {
      hero: "/assets/portfolio/2025/01/a-25-legjobb-mesterseges-intelligencia-muveszeti-otlet-a-kreativitas-felkeltesehez-ai-art-prompt-ideas-copy.webp",
    },
    keywords: ["Weboldal készítés", "Grafikai tervezés", "Arculattervezés"],
  },
  {
    slug: "webdude",
    title: "WebDude",
    tag: "Weboldal Készítés",
    description:
      "Készen áll arra, hogy egy nagyszerű dizájnnal kiegyenlítse megjelenését? Play Play Play Play Play Play Play Previous Next...",
    challenge:
      "A feladat egy olyan online platform és márkaidentitás kialakítása volt a(z) WebDude számára, amely kiemeli a versenytársak közül és bizalmat sugároz a látogatóknak.",
    solution:
      "Egyedi WordPress/Next.js alapú motor fejlesztése, prémium Cyber-Arany vizuális elemekkel és CRO-fókuszú elrendezéssel.",
    result:
      "A megújult felületnek köszönhetően nőtt a konverziós ráta, az organikus Google helyezések javultak, a látogatók pedig hosszabb időt töltenek az oldalon.",
    assets: {
      hero: "/assets/banners/webdude-hero.webp",
    },
    keywords: ["Weboldal készítés", "Grafikai tervezés", "Arculattervezés"],
  },
  {
    slug: "weboldal-redesign",
    title: "Weboldal Redesign és Modernizálás",
    tag: "Weboldal Készítés",
    description:
      "Web & DesignRégi weboldalak modernizálásaWeb & DesignWordpress Modern weboldalak készítéseWeb & DesignWordpress Modern weboldalak készítéseWeb & DesignWordpress...",
    challenge:
      "A feladat egy olyan online platform és márkaidentitás kialakítása volt a(z) Weboldal Redesign és Modernizálás számára, amely kiemeli a versenytársak közül és bizalmat sugároz a látogatóknak.",
    solution:
      "Egyedi WordPress/Next.js alapú motor fejlesztése, prémium Cyber-Arany vizuális elemekkel és CRO-fókuszú elrendezéssel.",
    result:
      "A megújult felületnek köszönhetően nőtt a konverziós ráta, az organikus Google helyezések javultak, a látogatók pedig hosszabb időt töltenek az oldalon.",
    assets: {
      hero: "/assets/banners/webdude-hero.webp",
    },
    keywords: ["Weboldal készítés", "Grafikai tervezés", "Arculattervezés"],
  },
  {
    slug: "arculattervezes",
    title: "RIMAI Útépítő Kft. - Arculattervezés és Weboldal",
    tag: "Arculattervezés",
    description:
      "www. rimaiutepito.hu .hu Mik a márka irányelvei? A márkairányelvek , amelyeket márkastílus-útmutatónak is neveznek, lényegében egy használati útmutató és szabál...",
    challenge:
      "A feladat egy olyan online platform és márkaidentitás kialakítása volt a(z) RIMAI Útépítő Kft. - Arculattervezés és Weboldal számára, amely kiemeli a versenytársak közül és bizalmat sugároz a látogatóknak.",
    solution:
      "Egyedi WordPress/Next.js alapú motor fejlesztése, prémium Cyber-Arany vizuális elemekkel és CRO-fókuszú elrendezéssel.",
    result:
      "A megújult felületnek köszönhetően nőtt a konverziós ráta, az organikus Google helyezések javultak, a látogatók pedig hosszabb időt töltenek az oldalon.",
    assets: {
      hero: "/assets/portfolio/2025/01/a-25-legjobb-mesterseges-intelligencia-muveszeti-otlet-a-kreativitas-felkeltesehez-ai-art-prompt-ideas-copy.webp",
    },
    keywords: ["Weboldal készítés", "Grafikai tervezés", "Arculattervezés"],
  },
  {
    slug: "bor-es-garnela-tervek",
    title: "Bor és Garnéla Tervek",
    tag: "Arculattervezés",
    description: "Bor & Garnéla House arculati tervek és foodtruck design.",
    challenge:
      "A feladat egy olyan online platform és márkaidentitás kialakítása volt a(z) Bor és Garnéla Tervek számára, amely kiemeli a versenytársak közül és bizalmat sugároz a látogatóknak.",
    solution:
      "Egyedi WordPress/Next.js alapú motor fejlesztése, prémium Cyber-Arany vizuális elemekkel és CRO-fókuszú elrendezéssel.",
    result:
      "A megújult felületnek köszönhetően nőtt a konverziós ráta, az organikus Google helyezések javultak, a látogatók pedig hosszabb időt töltenek az oldalon.",
    assets: {
      hero: "/assets/blog/2025/03/side-41-copy-scaled-copy-1024x1024.webp",
    },
    keywords: ["Weboldal készítés", "Grafikai tervezés", "Arculattervezés"],
  },
  {
    slug: "konkoly-box-team",
    title: "Konkoly Box Team",
    tag: "Weboldal Készítés",
    description: "Konkoly Box Team Kecskemét weboldal és design.",
    challenge:
      "A feladat egy olyan online platform és márkaidentitás kialakítása volt a(z) Konkoly Box Team számára, amely kiemeli a versenytársak közül és bizalmat sugároz a látogatóknak.",
    solution:
      "Egyedi WordPress/Next.js alapú motor fejlesztése, prémium Cyber-Arany vizuális elemekkel és CRO-fókuszú elrendezéssel.",
    result:
      "A megújult felületnek köszönhetően nőtt a konverziós ráta, az organikus Google helyezések javultak, a látogatók pedig hosszabb időt töltenek az oldalon.",
    assets: {
      hero: "/assets/banners/webdude-hero.webp",
    },
    keywords: ["Weboldal készítés", "Grafikai tervezés", "Arculattervezés"],
  },
  {
    slug: "go-box-kft-csomagoloanyagok-gyartasa-es-forgalmazasa",
    title: "Go-Box Kft. - Csomagolóanyagok gyártása és forgalmazása",
    tag: "Weboldal Készítés",
    description: "Go-Box Kft. logó és doboz minősítés design tervezése.",
    challenge:
      "A feladat egy olyan online platform és márkaidentitás kialakítása volt a(z) Go-Box Kft. - Csomagolóanyagok gyártása és forgalmazása számára, amely kiemeli a versenytársak közül és bizalmat sugároz a látogatóknak.",
    solution:
      "Egyedi WordPress/Next.js alapú motor fejlesztése, prémium Cyber-Arany vizuális elemekkel és CRO-fókuszú elrendezéssel.",
    result:
      "A megújult felületnek köszönhetően nőtt a konverziós ráta, az organikus Google helyezések javultak, a látogatók pedig hosszabb időt töltenek az oldalon.",
    assets: {
      hero: "/assets/banners/wordpress-weboldalak-keszitese-grafikai-tervezes.webp",
    },
    keywords: ["Weboldal készítés", "Grafikai tervezés", "Arculattervezés"],
  },
  {
    slug: "lengyel-helga-eskuvoi-dekoracio",
    title: "Lengyel Helga - Esküvői Dekoráció és Virág",
    tag: "Arculattervezés",
    description:
      "Esküvői dekoráció és virág Lengyel Helga személyre szabott esküvők szervezése.",
    challenge:
      "A feladat egy olyan online platform és márkaidentitás kialakítása volt a(z) Lengyel Helga - Esküvői Dekoráció és Virág számára, amely kiemeli a versenytársak közül és bizalmat sugároz a látogatóknak.",
    solution:
      "Egyedi WordPress/Next.js alapú motor fejlesztése, prémium Cyber-Arany vizuális elemekkel és CRO-fókuszú elrendezéssel.",
    result:
      "A megújult felületnek köszönhetően nőtt a konverziós ráta, az organikus Google helyezések javultak, a látogatók pedig hosszabb időt töltenek az oldalon.",
    assets: {
      hero: "/assets/banners/webdude-hero.webp",
    },
    keywords: ["Weboldal készítés", "Grafikai tervezés", "Arculattervezés"],
  },
  {
    slug: "pipo-parts-kft-autobonto",
    title: "Pipó Parts Kft. - Autóbontó",
    tag: "Weboldal Készítés",
    description: "Pipó Parts Kft. autóbontó weboldal fejlesztés.",
    challenge:
      "A feladat egy olyan online platform és márkaidentitás kialakítása volt a(z) Pipó Parts Kft. - Autóbontó számára, amely kiemeli a versenytársak közül és bizalmat sugároz a látogatóknak.",
    solution:
      "Egyedi WordPress/Next.js alapú motor fejlesztése, prémium Cyber-Arany vizuális elemekkel és CRO-fókuszú elrendezéssel.",
    result:
      "A megújult felületnek köszönhetően nőtt a konverziós ráta, az organikus Google helyezések javultak, a látogatók pedig hosszabb időt töltenek az oldalon.",
    assets: {
      hero: "/assets/banners/webdude-hero.webp",
    },
    keywords: ["Weboldal készítés", "Grafikai tervezés", "Arculattervezés"],
  },
  {
    slug: "classi-co-terko-bt-web-design",
    title: "Classi-Co Bt. weboldal fejlesztés és design",
    tag: "Weboldal Készítés",
    description: "Classi-Co Bt. weboldal fejlesztés és grafikai design.",
    challenge:
      "A feladat egy olyan online platform és márkaidentitás kialakítása volt a(z) Classi-Co Bt. weboldal fejlesztés és design számára, amely kiemeli a versenytársak közül és bizalmat sugároz a látogatóknak.",
    solution:
      "Egyedi WordPress/Next.js alapú motor fejlesztése, prémium Cyber-Arany vizuális elemekkel és CRO-fókuszú elrendezéssel.",
    result:
      "A megújult felületnek köszönhetően nőtt a konverziós ráta, az organikus Google helyezések javultak, a látogatók pedig hosszabb időt töltenek az oldalon.",
    assets: {
      hero: "/assets/banners/webdude-hero.webp",
    },
    keywords: ["Weboldal készítés", "Grafikai tervezés", "Arculattervezés"],
  },
  {
    slug: "ronch-cafe-kecskemet",
    title: "Ronch Cafe Kecskemét",
    tag: "Arculattervezés",
    description: "Ronch Cafe Kecskemét kávézó arculat és weboldal.",
    challenge:
      "A feladat egy olyan online platform és márkaidentitás kialakítása volt a(z) Ronch Cafe Kecskemét számára, amely kiemeli a versenytársak közül és bizalmat sugároz a látogatóknak.",
    solution:
      "Egyedi WordPress/Next.js alapú motor fejlesztése, prémium Cyber-Arany vizuális elemekkel és CRO-fókuszú elrendezéssel.",
    result:
      "A megújult felületnek köszönhetően nőtt a konverziós ráta, az organikus Google helyezések javultak, a látogatók pedig hosszabb időt töltenek az oldalon.",
    assets: {
      hero: "/assets/banners/webdude-hero.webp",
    },
    keywords: ["Weboldal készítés", "Grafikai tervezés", "Arculattervezés"],
  },
  {
    slug: "seed-of-life",
    title: "Seed Of Life",
    tag: "Weboldal Készítés",
    description: "Seed Of Life weboldal és arculat tervezés.",
    challenge:
      "A feladat egy olyan online platform és márkaidentitás kialakítása volt a(z) Seed Of Life számára, amely kiemeli a versenytársak közül és bizalmat sugároz a látogatóknak.",
    solution:
      "Egyedi WordPress/Next.js alapú motor fejlesztése, prémium Cyber-Arany vizuális elemekkel és CRO-fókuszú elrendezéssel.",
    result:
      "A megújult felületnek köszönhetően nőtt a konverziós ráta, az organikus Google helyezések javultak, a látogatók pedig hosszabb időt töltenek az oldalon.",
    assets: {
      hero: "/assets/banners/webdude-hero.webp",
    },
    keywords: ["Weboldal készítés", "Grafikai tervezés", "Arculattervezés"],
  },
  {
    slug: "marina-homes-lakopark-weboldal-es-arculat",
    title: "Marina Homes Lakópark - Weboldal és Arculat",
    tag: "Arculattervezés",
    description:
      "A Marina Homes Lakópark weboldalának és arculatának elkészítése Feladat Weboldal és arculatának elkészítése Megrendelve 07 Apr 2020 Elkészítve 15 Jul 2020 Webol...",
    challenge:
      "A feladat egy olyan online platform és márkaidentitás kialakítása volt a(z) Marina Homes Lakópark - Weboldal és Arculat számára, amely kiemeli a versenytársak közül és bizalmat sugároz a látogatóknak.",
    solution:
      "Egyedi WordPress/Next.js alapú motor fejlesztése, prémium Cyber-Arany vizuális elemekkel és CRO-fókuszú elrendezéssel.",
    result:
      "A megújult felületnek köszönhetően nőtt a konverziós ráta, az organikus Google helyezések javultak, a látogatók pedig hosszabb időt töltenek az oldalon.",
    assets: {
      hero: "/assets/projects/marina-homes-lakopark-logo-RGB-7-blue.webp",
    },
    keywords: ["Weboldal készítés", "Grafikai tervezés", "Arculattervezés"],
  },
  {
    slug: "galvan-systems-weboldal-es-grafikak",
    title: "Galvan-Systems Weboldal és Grafikák",
    tag: "Weboldal Készítés",
    description:
      "Galvan-Systems Kft. weboldal, szórólapok és bannerek tervezése.",
    challenge:
      "A feladat egy olyan online platform és márkaidentitás kialakítása volt a(z) Galvan-Systems Weboldal és Grafikák számára, amely kiemeli a versenytársak közül és bizalmat sugároz a látogatóknak.",
    solution:
      "Egyedi WordPress/Next.js alapú motor fejlesztése, prémium Cyber-Arany vizuális elemekkel és CRO-fókuszú elrendezéssel.",
    result:
      "A megújult felületnek köszönhetően nőtt a konverziós ráta, az organikus Google helyezések javultak, a látogatók pedig hosszabb időt töltenek az oldalon.",
    assets: {
      hero: "/assets/projects/Hu-Mago-nevjegyek-Tervek.webp",
    },
    keywords: ["Weboldal készítés", "Grafikai tervezés", "Arculattervezés"],
  },
  {
    slug: "rimai-utepito-kft-arculattervezes-es-weboldal",
    title: "RIMAI Útépítő Kft. - Arculattervezés és Weboldal",
    tag: "Arculattervezés",
    description:
      "www. rimaiutepito.hu .hu Mik a márka irányelvei? A márkairányelvek , amelyeket márkastílus-útmutatónak is neveznek, lényegében egy használati útmutató és szabál...",
    challenge:
      "A feladat egy olyan online platform és márkaidentitás kialakítása volt a(z) RIMAI Útépítő Kft. - Arculattervezés és Weboldal számára, amely kiemeli a versenytársak közül és bizalmat sugároz a látogatóknak.",
    solution:
      "Egyedi WordPress/Next.js alapú motor fejlesztése, prémium Cyber-Arany vizuális elemekkel és CRO-fókuszú elrendezéssel.",
    result:
      "A megújult felületnek köszönhetően nőtt a konverziós ráta, az organikus Google helyezések javultak, a látogatók pedig hosszabb időt töltenek az oldalon.",
    assets: {
      hero: "/assets/portfolio/2025/01/a-25-legjobb-mesterseges-intelligencia-muveszeti-otlet-a-kreativitas-felkeltesehez-ai-art-prompt-ideas-copy.webp",
    },
    keywords: ["Weboldal készítés", "Grafikai tervezés", "Arculattervezés"],
  },
  {
    slug: "bt-shop-webaruhaz-keszitese",
    title: "BT Shop - Webáruház készítése",
    tag: "Weboldal Készítés",
    description: "BT Shop webáruház készítése WooCommerce alapokon.",
    challenge:
      "A feladat egy olyan online platform és márkaidentitás kialakítása volt a(z) BT Shop - Webáruház készítése számára, amely kiemeli a versenytársak közül és bizalmat sugároz a látogatóknak.",
    solution:
      "Egyedi WordPress/Next.js alapú motor fejlesztése, prémium Cyber-Arany vizuális elemekkel és CRO-fókuszú elrendezéssel.",
    result:
      "A megújult felületnek köszönhetően nőtt a konverziós ráta, az organikus Google helyezések javultak, a látogatók pedig hosszabb időt töltenek az oldalon.",
    assets: {
      hero: "/assets/banners/webdude-hero.webp",
    },
    keywords: ["Weboldal készítés", "Grafikai tervezés", "Arculattervezés"],
  },
  {
    slug: "szelidi-napagy-grafika-tartalom-desing",
    title: "Szelidi Napágy Grafika, tartalom, design",
    tag: "Weboldal Készítés",
    description: "Szelidi Napágy weboldal, grafika és tartalom tervezés.",
    challenge:
      "A feladat egy olyan online platform és márkaidentitás kialakítása volt a(z) Szelidi Napágy Grafika, tartalom, design számára, amely kiemeli a versenytársak közül és bizalmat sugároz a látogatóknak.",
    solution:
      "Egyedi WordPress/Next.js alapú motor fejlesztése, prémium Cyber-Arany vizuális elemekkel és CRO-fókuszú elrendezéssel.",
    result:
      "A megújult felületnek köszönhetően nőtt a konverziós ráta, az organikus Google helyezések javultak, a látogatók pedig hosszabb időt töltenek az oldalon.",
    assets: {
      hero: "/assets/banners/webdude-hero.webp",
    },
    keywords: ["Weboldal készítés", "Grafikai tervezés", "Arculattervezés"],
  },
  {
    slug: "hu-mago-kft-arculatterv-grafikai-munkak-es-weboldal-keszites",
    title: "HU-MAGO Kft Arculatterv, grafikai munkák és weboldal készítés",
    tag: "Arculattervezés",
    description:
      "HU-MAGO Kft. arculatterv, grafikai munkák és weboldal készítés.",
    challenge:
      "Professzionális weboldal és arculat kialakítása a vállalkozás számára.",
    solution:
      "Modern design és technológia alkalmazása a digitális megjelenés optimalizálására.",
    result: "Sikeres projekt, amely növelte a vállalkozás online láthatóságát.",
    assets: {
      hero: "/assets/banners/webdude-hero.webp",
    },
    keywords: ["Weboldal készítés", "Grafikai tervezés", "Arculattervezés"],
  },
  {
    slug: "wd-artech-kft",
    title: "WD-Artech Kft.",
    tag: "Weboldal Készítés",
    description: "WD-Artech Kft. weboldal és arculat tervezés.",
    challenge:
      "A feladat egy olyan online platform és márkaidentitás kialakítása volt a(z) WD-Artech Kft. számára, amely kiemeli a versenytársak közül és bizalmat sugároz a látogatóknak.",
    solution:
      "Egyedi WordPress/Next.js alapú motor fejlesztése, prémium Cyber-Arany vizuális elemekkel és CRO-fókuszú elrendezéssel.",
    result:
      "A megújult felületnek köszönhetően nőtt a konverziós ráta, az organikus Google helyezések javultak, a látogatók pedig hosszabb időt töltenek az oldalon.",
    assets: {
      hero: "/assets/banners/webdude-hero.webp",
    },
    keywords: ["Weboldal készítés", "Grafikai tervezés", "Arculattervezés"],
  },
  {
    slug: "hungarian-outlow-ai",
    title: "Hungarian Outlow AI",
    tag: "Weboldal Készítés",
    description: "Hungarian Outlow AI weboldal és arculat tervezés.",
    challenge:
      "A feladat egy olyan online platform és márkaidentitás kialakítása volt a(z) Hungarian Outlow AI számára, amely kiemeli a versenytársak közül és bizalmat sugároz a látogatóknak.",
    solution:
      "Egyedi WordPress/Next.js alapú motor fejlesztése, prémium Cyber-Arany vizuális elemekkel és CRO-fókuszú elrendezéssel.",
    result:
      "A megújult felületnek köszönhetően nőtt a konverziós ráta, az organikus Google helyezések javultak, a látogatók pedig hosszabb időt töltenek az oldalon.",
    assets: {
      hero: "/assets/banners/webdude-hero.webp",
    },
    keywords: ["Weboldal készítés", "Grafikai tervezés", "Arculattervezés"],
  },
  {
    slug: "grafika-az-mi-val",
    title: "Grafika az MI-val",
    tag: "Weboldal Készítés",
    description: "Grafika a mesterséges intelligenciával weboldal és arculat.",
    challenge:
      "A feladat egy olyan online platform és márkaidentitás kialakítása volt a(z) Grafika az MI-val számára, amely kiemeli a versenytársak közül és bizalmat sugároz a látogatóknak.",
    solution:
      "Egyedi WordPress/Next.js alapú motor fejlesztése, prémium Cyber-Arany vizuális elemekkel és CRO-fókuszú elrendezéssel.",
    result:
      "A megújult felületnek köszönhetően nőtt a konverziós ráta, az organikus Google helyezések javultak, a látogatók pedig hosszabb időt töltenek az oldalon.",
    assets: {
      hero: "/assets/banners/webdude-hero.webp",
    },
    keywords: ["Weboldal készítés", "Grafikai tervezés", "Arculattervezés"],
  },
];
