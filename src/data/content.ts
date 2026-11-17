import type {LocalizedText} from '../i18n/types';
import type {ImageKey} from './images';

// ── 1. TIPS & GUIDES (12 Items) ────────────────────────────────────────────

export type TipCategory =
  | 'watering'
  | 'light'
  | 'soil'
  | 'fertilizing'
  | 'pests'
  | 'propagation'
  | 'seasonal'
  | 'decor';

export interface TipGuide {
  id: string;
  category: TipCategory;
  readMinutes: number;
  title: LocalizedText;
  summary: LocalizedText;
  steps: Record<'en' | 'ru' | 'uz', string[]>;
}

export const TIPS_GUIDES: TipGuide[] = [
  {
    id: 'tip-finger-test',
    category: 'watering',
    readMinutes: 3,
    title: {en: 'Master the Two-Knuckle Moisture Check', ru: 'Правило проверки грунта на две фаланги', uz: 'Tuproq namligini ikki bo‘g‘in qoidasi bilan tekshirish'},
    summary: {en: 'Stop watering on a fixed calendar—read your potting mix before pouring.', ru: 'Откажитесь от полива по дням недели — ориентируйтесь на реальную влажность почвы.', uz: 'Taqvim kuniga qarab emas, haqiqiy tuproq namligiga qarab sug‘oring.'},
    steps: {
      en: ['Insert a clean finger 4–5 cm into the soil near the pot center.', 'If cool soil clings to your skin, wait 2–3 more days.', 'If dry and crumbly, soak slowly until water exits drainage holes, then empty the saucer after 15 minutes.'],
      ru: ['Погрузите палец в грунт на 4–5 см ближе к центру горшка.', 'Если земля прохладная и липнет — подождите ещё 2–3 дня.', 'Если сухо и рассыпчато — пролейте полностью и слейте остаток из поддона через 15 минут.'],
      uz: ['Barmog‘ingizni tuvak markaziga yaqin joydan 4–5 sm chuqurlikka kiriting.', 'Salqin va yopishqoq bo‘lsa, yana 2–3 kun kuting.', 'Quruq va uvalanuvchi bo‘lsa, ostidan suv chiqquncha quying va 15 daqiqadan so‘ng taglikni bo‘shating.'],
    },
  },
  {
    id: 'tip-bottom-water',
    category: 'watering',
    readMinutes: 4,
    title: {en: 'Bottom Watering for Even Root Hydration', ru: 'Нижний полив для равномерной пропитки корней', uz: 'Ildizlarni tekis to‘yintirish uchun pastdan sug‘orish'},
    summary: {en: 'Ideal for hydrophobic peat soil and plants prone to fungus gnats.', ru: 'Идеально для пересушенного торфа и профилактики грибных комариков.', uz: 'Qattiq qurib qolgan torf va chivinlarga qarshi eng samarali usul.'},
    steps: {
      en: ['Fill a basin with 5–7 cm of room-temperature filtered water.', 'Set pots with drainage holes inside for 20 minutes.', 'Lift pots once the top feels faintly cool and let excess drip out before returning to decorative planters.'],
      ru: ['Налейте в таз 5–7 см отстоянной воды комнатной температуры.', 'Поставьте горшки с дренажными отверстиями на 20 минут.', 'Достаньте горшки, когда верхний слой станет чуть влажным, и дайте воде стечь.'],
      uz: ['Idishga 5–7 sm balandlikda xona haroratidagi tindirilgan suv quying.', 'Drenaj teshikli tuvaklarni 20 daqiqaga suvga qo‘ying.', 'Ustki qatlam salqinlashganda ko‘tarib, ortiqcha suvini oqizing.'],
    },
  },
  {
    id: 'tip-window-math',
    category: 'light',
    readMinutes: 4,
    title: {en: 'Understanding Window Direction & Distance', ru: 'Как сторона света и метры от окна влияют на рост', uz: 'Deraza yo‘nalishi va masofaning yorug‘likka ta’siri'},
    summary: {en: 'Moving a plant two meters back cuts usable light by more than half.', ru: 'Удаление горшка на два метра от стекла снижает полезный свет более чем вдвое.', uz: 'Tuvakni derazadan ikki metr uzoqlashtirish foydali yorug‘likni yarmidan ko‘pga kamaytiradi.'},
    steps: {
      en: ['South windows give strong midday sun—great for cacti, jade, and aloe.', 'East windows deliver gentle morning rays loved by Calathea, Monstera, and Begonia.', 'North windows provide soft, even light suited to ZZ Plant, Snake Plant, and Pothos.'],
      ru: ['Южные окна — максимум солнца для кактусов, толстянки и алоэ.', 'Восточные — мягкий утренний свет для монстер, калатей и бегоний.', 'Северные — ровный рассеянный свет для сансевиерии, замиокулькаса и эпипремнума.'],
      uz: ['Janubiy deraza — kaktus, aloe va pul daraxti uchun kuchli quyosh.', 'Sharqiy deraza — monstera, kalateya va begoniya uchun mayin tong nuri.', 'Shimoliy deraza — sansevyeriya, zamiokulkas va potos uchun sokin yorug‘lik.'],
    },
  },
  {
    id: 'tip-aroid-mix',
    category: 'soil',
    readMinutes: 5,
    title: {en: 'Build a Breathable Chunky Aroid Mix', ru: 'Рецепт воздушного субстрата для ароидных', uz: 'Aroidlar uchun havo o‘tkazuvchi g‘ovak tuproq tayyorlash'},
    summary: {en: 'Why Monstera and Philodendron roots thrive in chunky bark and perlite.', ru: 'Почему корни монстер и филодендронов процветают в коре и перлите.', uz: 'Nima uchun monstera va filodendron ildizlari po‘stloq hamda perlitda yaxshi rivojlanadi.'},
    steps: {
      en: ['Combine 40% coco coir or quality indoor potting soil.', 'Mix in 30% medium orchid pine bark for structure and air pockets.', 'Add 20% coarse perlite or pumice plus 10% horticultural charcoal or worm castings.'],
      ru: ['Возьмите 40% качественного торфяного или кокосового субстрата.', 'Добавьте 30% средней сосновой коры для воздушных карманов.', 'Дополните 20% крупного перлита или пемзы и 10% биогумуса с древесным углём.'],
      uz: ['40% sifatli xona tuprog‘i yoki kokos substratini oling.', '30% o‘rtacha qarag‘ay po‘stlog‘i qo‘shib g‘ovaklik yarating.', '20% yirik perlit yoki pemza hamda 10% biogumus va ko‘mir aralashtiring.'],
    },
  },
  {
    id: 'tip-repot-timing',
    category: 'soil',
    readMinutes: 4,
    title: {en: '5 Signs It Is Time to Repot', ru: '5 признаков того, что пора пересаживать', uz: 'O‘simlikni ko‘chirish vaqti kelganining 5 belgisi'},
    summary: {en: 'Know when roots outgrow their home without disturbing dormant plants needlessly.', ru: 'Определите момент тесноты корней, не тревожа растение без причины.', uz: 'Ildizlar siqilganini aniq bilib, o‘simlikni behuda bezovta qilmang.'},
    steps: {
      en: ['White roots emerging out of bottom drainage holes.', 'Water rushes straight through the pot within seconds.', 'Plant dries out twice as fast as last season or tips over easily.', 'Step up only 2–5 cm in diameter during active spring growth.'],
      ru: ['Корни показались из нижних дренажных отверстий.', 'Вода моментально проскакивает сквозь горшок в поддон.', 'Грунт пересыхает в два раза быстрее обычного.', 'Увеличивайте диаметр нового горшка всего на 2–5 см весной.'],
      uz: ['Drenaj teshiklaridan ildizlar chiqa boshlagan.', 'Quyulgan suv bir necha soniyada taglikka oqib tushadi.', 'Tuproq odatdagidan ikki barobar tez quriydi.', 'Bahorda tuvak diametrini faqat 2–5 sm ga kengaytiring.'],
    },
  },
  {
    id: 'tip-fertilizing',
    category: 'fertilizing',
    readMinutes: 3,
    title: {en: 'Gentle Feeding: Less Is More', ru: 'Умеренная подкормка без солевых ожогов', uz: 'Me’yoriy o‘g‘itlash: kamrog‘i foydaliroq'},
    summary: {en: 'Feed diluted fertilizer only when plants are actively producing new leaves.', ru: 'Подкармливайте слабым раствором только во время активного роста.', uz: 'Faqat yangi barg chiqarayotgan faol davrda suyultirilgan o‘g‘it bering.'},
    steps: {
      en: ['Dilute liquid fertilizer to 50% of the bottle label strength.', 'Always water with plain water first so roots are hydrated before feeding.', 'Pause fertilizing from late autumn through winter dormancy.'],
      ru: ['Разводите жидкое удобрение вдвое слабее инструкции на этикетке.', 'Всегда сначала слегка полейте чистой водой перед внесением подкормки.', 'Прекращайте подкормки с поздней осени до весны.'],
      uz: ['Suyuq o‘g‘itni yorliqdagi me’yordan 2 barobar ko‘proq suvga aralashtiring.', 'O‘g‘itlashdan oldin albatta oddiy suv bilan namlang.', 'Kech kuzdan bahorgacha o‘g‘itlashni to‘xtating.'],
    },
  },
  {
    id: 'tip-pest-shield',
    category: 'pests',
    readMinutes: 5,
    title: {en: 'Zero-Panic Pest Prevention Routine', ru: 'Спокойная профилактика вредителей без химии', uz: 'Zararkunandalarga qarshi tinch profilaktika'},
    summary: {en: 'Three quick habits keep spider mites, mealybugs, and gnats away naturally.', ru: 'Три простые привычки надёжно защищают от клеща, червеца и мошек.', uz: 'Uch oddiy odat o‘rgimchakkana, unli qurt va chivinlardan asraydi.'},
    steps: {
      en: ['Quarantine newly purchased plants in another room for 14 days.', 'Rinse broad foliage under lukewarm water once a month.', 'Let topsoil dry slightly between waterings to break fungus gnat egg cycles.'],
      ru: ['Изолируйте каждое новое растение на 14 дней.', 'Раз в месяц устраивайте тёплый душ для листвы.', 'Давайте верхним 3 см грунта подсыхать, чтобы не плодились сциариды.'],
      uz: ['Yangi o‘simlikni 14 kun alohida xonada saqlang.', 'Oyiga bir marta barglarni iliq suvda yuving.', 'Chivin tuxum qo‘ymasligi uchun tuproqning ustki 3 sm qismini quriting.'],
    },
  },
  {
    id: 'tip-water-prop',
    category: 'propagation',
    readMinutes: 4,
    title: {en: 'Propagate Trailing Vines in Glass Jars', ru: 'Черенкование лиан в стеклянных банках', uz: 'Lianalarni shisha idishda qalamchadan ko‘paytirish'},
    summary: {en: 'Turn one Pothos or Philodendron vine into five new lush plants.', ru: 'Превратите одну плеть эпипремнума или филодендрона в пять новых растений.', uz: 'Bitta potos yoki filodendron novdasidan beshta yangi ko‘chat oling.'},
    steps: {
      en: ['Cut 1 cm below a brown stem node (never cut just a bare leaf stem).', 'Remove the lowest leaf if it would sit submerged underwater.', 'Place in clear water in bright indirect light; refresh weekly and pot up once roots reach 5 cm.'],
      ru: ['Срежьте стебель на 1 см ниже узла с зачатком воздушного корня.', 'Уберите нижний лист, чтобы он не гнил в воде.', 'Поставьте в светлое место, меняйте воду раз в неделю и сажайте при корнях 5 см.'],
      uz: ['Havo ildizi tuguni (bo‘g‘im) ostidan 1 sm qoldirib kesing.', 'Suvga tegib qoladigan pastki bargni olib tashlang.', 'Yorug‘ joyga qo‘ying, suvni haftada almashtiring va ildizlar 5 sm bo‘lganda tuproqqa eking.'],
    },
  },
  {
    id: 'tip-winter-care',
    category: 'seasonal',
    readMinutes: 4,
    title: {en: 'Winter Survival Checklist for Indoor Plants', ru: 'Зимний чек-лист выживания для домашних цветов', uz: 'Xona o‘simliklari uchun qishki parvarish rejasi'},
    summary: {en: 'Adapt watering, light, and heating placement when days grow short.', ru: 'Скорректируйте полив, свет и расстояние от батарей в холодный сезон.', uz: 'Kunlar qisqarganda sug‘orish, yorug‘lik va isitgich masofasini moslang.'},
    steps: {
      en: ['Move plants closer to bright windows and wipe glass clean.', 'Cut watering frequency by 30–50% and always check soil deeply.', 'Keep leaves 40 cm clear of hot radiator convection and freezing panes.'],
      ru: ['Передвиньте горшки ближе к окнам и протрите стёкла.', 'Сократите поливы на 30–50% с обязательной проверкой глубины.', 'Отодвиньте листья на 40 см от горячих батарей и ледяных стёкол.'],
      uz: ['Tuvaklarni derazaga yaqinlashtiring va oynalarni tozalang.', 'Sug‘orishni 30–50% ga kamaytiring va chuqurroq tekshiring.', 'Barglarni issiq radiator va muzdek oynadan 40 sm uzoqda saqlang.'],
    },
  },
  {
    id: 'tip-summer-heat',
    category: 'seasonal',
    readMinutes: 3,
    title: {en: 'Summer Sun & Hydration Adjustments', ru: 'Летняя жара: защита от ожогов и пересыхания', uz: 'Yozgi jaziramada quyosh va namlik nazorati'},
    summary: {en: 'Protect tender leaves from high midday angles while supporting active growth.', ru: 'Защитите листья от полуденного солнца в период бурного роста.', uz: 'Faol o‘sish davrida nozik barglarni tushki quyoshdan asrang.'},
    steps: {
      en: ['Hang sheer curtains on intense south or west windows during peak afternoon.', 'Check hanging baskets twice weekly as warm airflow dries pots rapidly.', 'Resume diluted monthly feeding for fast-growing tropicals.'],
      ru: ['Притеняйте южные и западные окна лёгким тюлем в полуденные часы.', 'Проверяйте подвесные кашпо дважды в неделю из-за быстрого испарения.', 'Подкармливайте быстрорастущие виды раз в 2–4 недели.'],
      uz: ['Janubiy va g‘arbiy derazalarga peshin payti yupqa parda torting.', 'Osilgan tuvaklarni haftada ikki marta tekshiring — ular tez quriydi.', 'Tez o‘sayotgan tropiklarni oyiga bir-ikki marta suyultirilgan o‘g‘it bilan oziqlantiring.'],
    },
  },
  {
    id: 'tip-styling-layers',
    category: 'decor',
    readMinutes: 4,
    title: {en: 'Style Rooms with Three Botanical Heights', ru: 'Секрет уютного интерьера: три яруса зелени', uz: 'Xonani uch balandlik qoidasi bilan bezash'},
    summary: {en: 'Combine floor trees, tabletop sculptures, and trailing shelves like an interior stylist.', ru: 'Сочетайте напольные деревья, настольные формы и ампельные полки.', uz: 'Pol daraxtlari, stol o‘simliklari va osiluvchi javonlarni uyg‘unlashtiring.'},
    steps: {
      en: ['Anchor a bright corner with one tall floor specimen (Fiddle Leaf Fig or Monstera).', 'Add sculptural medium pots (Snake Plant, ZZ) at eye level on consoles.', 'Soften upper bookshelves with cascading Pothos or Heartleaf Philodendron.'],
      ru: ['Задайте фокус крупным напольным растением (фикус лировидный или монстера).', 'Добавьте строгие средние формы (сансевиерия, замиокулькас) на комодах.', 'Смягчите верхние полки ниспадающими плетями эпипремнума и филодендрона.'],
      uz: ['Yorug‘ burchakni baland pol o‘simligi (monstera yoki fikus) bilan boyiting.', 'Javon va konsollarga o‘rta bo‘yli shakldor turlarni (sansevyeriya, zamiokulkas) qo‘ying.', 'Yuqori tokchalarni osilib tushuvchi potos va filodendron bilan yumshating.'],
    },
  },
  {
    id: 'tip-cachepot',
    category: 'decor',
    readMinutes: 3,
    title: {en: 'The Cachepot Trick: Beauty Without Root Rot', ru: 'Метод двойного кашпо: красота без застоя воды', uz: 'Ikki tuvak usuli: bezak va ildiz xavfsizligi'},
    summary: {en: 'Use decorative ceramic pots safely even when they lack drainage holes.', ru: 'Как безопасно использовать дизайнерские керамические кашпо без отверстий.', uz: 'Teshiksiz chiroyli sopol idishlardan ildizni chiritmay foydalanish siri.'},
    steps: {
      en: ['Keep the plant inside its plain plastic nursery pot with generous drainage holes.', 'Drop a handful of lava rocks or cork pads inside the ceramic outer cachepot.', 'Lift the nursery pot out to water in the sink, drain 15 minutes, then drop it back in dry.'],
      ru: ['Оставьте растение в техническом пластиковом горшке с хорошими отверстиями.', 'Положите на дно декоративного кашпо пару камешков или пробковую подставку.', 'Вынимайте горшок для полива в раковине, дайте стечь 15 минут и ставьте обратно.'],
      uz: ['O‘simlikni drenaj teshikli oddiy plastik tuvakda qoldiring.', 'Bezakli tashqi idish tubiga bir nechta toshcha yoki probka taglik qo‘ying.', 'Sug‘orish uchun ichki tuvakni chiqarib, 15 daqiqa oqizgandan so‘ng joyiga qaytaring.'],
    },
  },
];

// ── 2. EDUCATIONAL VIDEOS (YouTube nocookie embeds) ────────────────────────

export type VideoCategory = 'watering' | 'repotting' | 'propagation' | 'pests' | 'decor';

export interface VideoItem {
  id: string;
  youtubeId: string;
  category: VideoCategory;
  duration: string;
  thumbnailKey: ImageKey;
  title: LocalizedText;
  description: LocalizedText;
}

export const VIDEOS: VideoItem[] = [
  {
    id: 'v1',
    youtubeId: 'S0b8e5_B3qM',
    category: 'watering',
    duration: '08:42',
    thumbnailKey: 'careTools',
    title: {en: 'How to Know Exactly When to Water Houseplants', ru: 'Как точно понять, когда пора поливать растения', uz: 'Xona o‘simliklarini qachon sug‘orishni aniq bilish'},
    description: {en: 'Learn finger tests, pot-weight cues, and bottom watering techniques for healthy roots.', ru: 'Пальцевый тест, оценка веса горшка и техника нижнего полива.', uz: 'Barmoq testi, tuvak vazni va pastdan sug‘orish usullarini o‘rganing.'},
  },
  {
    id: 'v2',
    youtubeId: 'i1nK9gM2q0s',
    category: 'repotting',
    duration: '11:15',
    thumbnailKey: 'tropicalBroadleaf',
    title: {en: 'Repotting Monstera & Chunky Aroid Soil Mix', ru: 'Пересадка монстеры и составление воздушного грунта', uz: 'Monsterani ko‘chirish va g‘ovak tuproq tayyorlash'},
    description: {en: 'Step-by-step demonstration of bark, perlite, and peat ratios with moss pole staking.', ru: 'Пошаговый разбор пропорций коры, перлита и установки опоры.', uz: 'Po‘stloq, perlit nisbatlari va tayanch ustun o‘rnatish bo‘yicha video qo‘llanma.'},
  },
  {
    id: 'v3',
    youtubeId: 'mB8_xQ1k9nI',
    category: 'propagation',
    duration: '09:30',
    thumbnailKey: 'trailingFoliage',
    title: {en: 'Propagating Golden Pothos & Philodendron Cuttings', ru: 'Размножение эпипремнума и филодендрона черенками', uz: 'Potos va filodendronni qalamchadan ko‘paytirish'},
    description: {en: 'Where to cut below the node, water vs sphagnum rooting, and transitioning to soil.', ru: 'Где делать срез под узлом, укоренение в воде и пересадка в грунт.', uz: 'Bo‘g‘im ostidan kesish, suvda ildizlatish va tuproqqa o‘tkazish.'},
  },
  {
    id: 'v4',
    youtubeId: 'k7y2mQ8p5wE',
    category: 'pests',
    duration: '10:05',
    thumbnailKey: 'floweringBloom',
    title: {en: 'Identifying & Treating Spider Mites & Mealybugs', ru: 'Как распознать и победить клеща и червеца', uz: 'O‘rgimchakkana va unli qurtni aniqlash hamda yo‘qotish'},
    description: {en: 'Safe indoor leaf-washing protocols, neem emulsification, and quarantine tips.', ru: 'Безопасная промывка листьев, обработка маслом нима и карантин.', uz: 'Barglarni xavfsiz yuvish, neem moyi bilan ishlov berish va karantin qoidalari.'},
  },
  {
    id: 'v5',
    youtubeId: 'w9xL4pN2rVc',
    category: 'decor',
    duration: '07:50',
    thumbnailKey: 'heroJungle',
    title: {en: 'Designing a Sunlit Indoor Jungle Corner', ru: 'Оформление зелёного уголка в современной квартире', uz: 'Yorug‘ xonada uy o‘rmoni burchagini bezash'},
    description: {en: 'Layering trailing shelves, sculptural snake plants, and statement floor trees.', ru: 'Композиция из напольных деревьев, полок с лианами и кашпо.', uz: 'Pol daraxtlari, javonli lianalar va sopol tuvaklarni uyg‘un joylashtirish.'},
  },
  {
    id: 'v6',
    youtubeId: 'd4nH8vP3tYs',
    category: 'repotting',
    duration: '08:18',
    thumbnailKey: 'sculpturalSucculent',
    title: {en: 'Succulent & Snake Plant Soil Drainage Guide', ru: 'Дренаж и грунт для суккулентов и сансевиерии', uz: 'Sukkulent va sansevyeriya uchun tuproq va drenaj'},
    description: {en: 'Preventing winter rot with terracotta pots and mineral grit.', ru: 'Защита от зимнего залива с помощью терракоты и минерального грунта.', uz: 'Sopol tuvak va mineral qumli aralashma yordamida qishki chirishning oldini olish.'},
  },
];

// ── 3. GALLERY ITEMS ───────────────────────────────────────────────────────

export type GalleryCategory = 'tropical' | 'minimalist' | 'trailing' | 'flowering' | 'care';

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  imageKey: ImageKey;
  title: LocalizedText;
  caption: LocalizedText;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {id: 'g1', category: 'tropical', imageKey: 'heroJungle', title: {en: 'Sunlit Living Room Canopy', ru: 'Солнечная гостиная с монстерой', uz: 'Quyoshli mehmonxona o‘rmoni'}, caption: {en: 'Monstera deliciosa and Fiddle Leaf Fig anchoring warm oak shelves.', ru: 'Монстера и фикус лировидный в естественном утреннем свете.', uz: 'Ertalabki nurdagi monstera va lirasimon fikus kompozitsiyasi.'}},
  {id: 'g2', category: 'tropical', imageKey: 'tropicalBroadleaf', title: {en: 'Fenestrated Aroid Pair', ru: 'Дуэт тропических ароидных', uz: 'Tropik aroidlar juftligi'}, caption: {en: 'Adansonii foliage alongside velvety Gloriosum veins in matte stoneware.', ru: 'Ажурные и бархатистые листья в матовых керамических кашпо.', uz: 'Mat sopol tuvaklardagi naqshinkor va baxmal barglar.'}},
  {id: 'g3', category: 'trailing', imageKey: 'trailingFoliage', title: {en: 'Suspended Window Cascade', ru: 'Подвесной каскад у окна', uz: 'Deraza yonidagi osma kaskad'}, caption: {en: 'Golden Pothos, Boston Fern, and variegated Ivy catching afternoon glow.', ru: 'Эпипремнум, папоротник и плющ в мягком послеобеденном свете.', uz: 'Potos, qirqquloq va pechakning quyosh nuridagi uyg‘unligi.'}},
  {id: 'g4', category: 'minimalist', imageKey: 'sculpturalSucculent', title: {en: 'Travertine Architectural Quartet', ru: 'Минималистичный квартет на травертине', uz: 'Travertin tokchadagi minimalistik to‘plam'}, caption: {en: 'Snake Plant, ZZ Plant, Aloe Vera, and Jade Plant in clay and sage ceramic.', ru: 'Сансевиерия, замиокулькас, алоэ и толстянка в тёплой терракоте.', uz: 'Sansevyeriya, zamiokulkas, aloe va pul daraxti sopol tuvaklarda.'}},
  {id: 'g5', category: 'flowering', imageKey: 'floweringBloom', title: {en: 'Botanical Bloom Trio', ru: 'Цветущее трио на дубовом столе', uz: 'Gullovchi uchlik'}, caption: {en: 'White Phalaenopsis Orchid, Peace Lily spathes, and scarlet Anthurium.', ru: 'Белая орхидея фаленопсис, спатифиллум и алый антуриум.', uz: 'Oq falenopsis orxideyasi, spatifillum va qizil anturium.'}},
  {id: 'g6', category: 'care', imageKey: 'careTools', title: {en: 'Botanical Propagation Bench', ru: 'Рабочий стол цветовода', uz: 'Botanika parvarish stoli'}, caption: {en: 'Brass watering can, rooting pothos jar, chunky bark mix, and clean shears.', ru: 'Латунная лейка, черенок в воде, кора и садовый секатор.', uz: 'Mis sug‘orgich, suvda ildizlayotgan qalamcha, po‘stloq va qaychi.'}},
];

// ── 4. GLOSSARY A–Z (24 Terms) ─────────────────────────────────────────────

export interface GlossaryTerm {
  id: string;
  letter: string;
  term: LocalizedText;
  definition: LocalizedText;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {id: 'gl1', letter: 'A', term: {en: 'Aerial Root', ru: 'Воздушный корень', uz: 'Havo ildizi'}, definition: {en: 'Above-ground root produced along stems of climbers like Monstera to grip bark or absorb humidity.', ru: 'Надземный корень лиан, помогающий цепляться за опору и впитывать влагу.', uz: 'Monstera kabi chirmashuvchilarning tayanchga ilashishi va havodan namlik olishi uchun chiqaradigan ildizi.'}},
  {id: 'gl2', letter: 'A', term: {en: 'Aroid', ru: 'Ароидные', uz: 'Aroidlar'}, definition: {en: 'Tropical plant family (Araceae) including Monstera, Philodendron, Pothos, Peace Lily, and Anthurium.', ru: 'Семейство тропических растений, включающее монстеру, филодендрон, спатифиллум и антуриум.', uz: 'Monstera, filodendron, potos, spatifillum va anturiumni o‘z ichiga olgan tropik o‘simliklar oilasi.'}},
  {id: 'gl3', letter: 'B', term: {en: 'Bottom Watering', ru: 'Нижний полив', uz: 'Pastdan sug‘orish'}, definition: {en: 'Hydrating a potted plant by setting it in water so moisture wicks upward through drainage holes.', ru: 'Способ полива путём погружения дна горшка в воду для равномерного пропитывания кома.', uz: 'Tuvakni suvli idishga qo‘yib, namlikni pastki drenaj teshiklaridan shimdirish usuli.'}},
  {id: 'gl4', letter: 'C', term: {en: 'Cachepot', ru: 'Кашпо', uz: 'Kashpo'}, definition: {en: 'Decorative outer container without drainage holes that holds a functional inner nursery pot.', ru: 'Декоративный внешний сосуд без отверстий, в который ставится технический горшок.', uz: 'Ichiga drenaj teshikli oddiy tuvak joylashtiriladigan teshiksiz bezakli tashqi idish.'}},
  {id: 'gl5', letter: 'C', term: {en: 'Chlorophyll', ru: 'Хлорофилл', uz: 'Xlorofill'}, definition: {en: 'Green plant pigment that captures light energy to convert water and CO₂ into sugars.', ru: 'Зелёный пигмент растений, улавливающий свет для фотосинтеза.', uz: 'Yorug‘lik energiyasini yutib, fotosintezni amalga oshiruvchi yashil pigment.'}},
  {id: 'gl6', letter: 'D', term: {en: 'Dormancy', ru: 'Период покоя', uz: 'Tinchlik davri'}, definition: {en: 'Seasonal slowdown (typically autumn/winter) when growth pauses and plants need far less water.', ru: 'Сезонное замедление роста осенью и зимой со снижением потребности в воде.', uz: 'Kuz va qishda o‘sishning tabiiy sekinlashuvi hamda suvga talabning kamayishi.'}},
  {id: 'gl7', letter: 'E', term: {en: 'Epiphyte', ru: 'Эпифит', uz: 'Epifit'}, definition: {en: 'Plant such as Moth Orchid that grows harmlessly on tree branches rather than in ground soil.', ru: 'Растение, растущее на коре деревьев и получающее влагу из воздуха (например, орхидея).', uz: 'Yer tuprog‘ida emas, daraxt shoxlariga yopishib o‘sadigan o‘simlik (masalan, orxideya).'}},
  {id: 'gl8', letter: 'E', term: {en: 'Etiolation', ru: 'Этиоляция', uz: 'Etiolyatsiya'}, definition: {en: 'Pale, leggy stem stretching caused by insufficient light.', ru: 'Вытягивание и побледнение стеблей из-за хронической нехватки света.', uz: 'Yorug‘lik yetishmasligi sababli poyalarning ingichka cho‘zilib, rangi ochilishi.'}},
  {id: 'gl9', letter: 'F', term: {en: 'Farina', ru: 'Фарина', uz: 'Farina'}, definition: {en: 'Powdery protective wax coating on succulents like Echeveria that shields against sunburn.', ru: 'Матовый восковой налёт на листьях суккулентов, защищающий их от солнечных ожогов.', uz: 'Exeveriya kabi sukkulent barglaridagi quyoshdan himoyalovchi oqish mumsimon g‘ubor.'}},
  {id: 'gl10', letter: 'F', term: {en: 'Fenestration', ru: 'Фенестрация', uz: 'Fenestratsiya'}, definition: {en: 'Natural splits and holes in Monstera leaves that let wind and sunlight pass through.', ru: 'Естественные прорези и отверстия на листьях монстеры.', uz: 'Monstera barglarida yosh o‘tishi va yorug‘lik oshishi bilan paydo bo‘ladigan tabiiy teshik va kesimlar.'}},
  {id: 'gl11', letter: 'G', term: {en: 'Guttation', ru: 'Гуттация', uz: 'Guttatsiya'}, definition: {en: 'Tiny water droplets exuded from leaf margins overnight due to healthy root water pressure.', ru: 'Выделение капелек влаги на кончиках листьев из-за высокого тургора после полива.', uz: 'Sug‘orishdan keyin ildiz bosimi tufayli barg uchlarida mayda suv tomchilari paydo bo‘lishi.'}},
  {id: 'gl12', letter: 'H', term: {en: 'Hydrophobic Soil', ru: 'Гидрофобный грунт', uz: 'Gidrofob tuproq'}, definition: {en: 'Bone-dry peat mix that shrinks and repels water until soaked thoroughly.', ru: 'Пересохший торфяной грунт, отталкивающий воду при обычном поливе сверху.', uz: 'Haddan tashqari qurib, ustidan quyilgan suvni shimmasdan chetdan oqizib yuboradigan tuproq.'}},
  {id: 'gl13', letter: 'N', term: {en: 'Node', ru: 'Узел', uz: 'Bo‘g‘im (Node)'}, definition: {en: 'Swollen joint on a stem where leaves, buds, and new roots emerge during propagation.', ru: 'Утолщение на стебле, из которого растут листья, почки и корни у черенков.', uz: 'Poyadagi barg, kurtak va qalamchalashda yangi ildizlar o‘sib chiqadigan tugun qismi.'}},
  {id: 'gl14', letter: 'N', term: {en: 'Nyctinasty', ru: 'Никтинастия', uz: 'Niktinastiya'}, definition: {en: 'Daily circadian movement of prayer-plant leaves folding upward at dusk.', ru: 'Суточное поднимание и опускание листьев у калатей и марант.', uz: 'Kalateya va maranta barglarining kechqurun yuqoriga ko‘tarilib, tongda ochilish harakati.'}},
  {id: 'gl15', letter: 'P', term: {en: 'Perlite', ru: 'Перлит', uz: 'Perlit'}, definition: {en: 'Lightweight expanded volcanic glass pebbles mixed into potting soil to improve drainage and airflow.', ru: 'Лёгкие белые гранулы вулканического стекла для разрыхления и аэрации грунта.', uz: 'Tuproqqa havo va suv o‘tkazuvchanlik berish uchun qo‘shiladigan yengil oq vulqon granulalari.'}},
  {id: 'gl16', letter: 'P', term: {en: 'Petiole', ru: 'Черешок', uz: 'Barg bandi'}, definition: {en: 'Slender stalk attaching a leaf blade to the main stem.', ru: 'Тонкий стебелёк, соединяющий листовую пластину с главным стеблем.', uz: 'Barg plastinkasini asosiy poyaga tutashtirib turuvchi band.'}},
  {id: 'gl17', letter: 'P', term: {en: 'Propagation', ru: 'Размножение', uz: 'Ko‘paytirish'}, definition: {en: 'Creating new plants from stem cuttings, leaf cuttings, offsets, or root division.', ru: 'Получение новых растений из черенков, деток или делением куста.', uz: 'Qalamcha, bolacha yoki ildiz bo‘lish orqali yangi o‘simliklar yetishtirish.'}},
  {id: 'gl18', letter: 'R', term: {en: 'Rhizome', ru: 'Ризома (Корневище)', uz: 'Rizoma (Ildizpoya)'}, definition: {en: 'Thick underground horizontal stem storing water and nutrients, seen in ZZ and Snake plants.', ru: 'Подземный утолщённый стебель с запасом влаги, как у замиокулькаса и сансевиерии.', uz: 'Zamiokulkas va sansevyeriyada suv va ozuqa zaxiralovchi yer osti poyasi.'}},
  {id: 'gl19', letter: 'R', term: {en: 'Rootbound', ru: 'Тесный ком корней', uz: 'Ildiz siqilishi'}, definition: {en: 'State where circling roots fill the entire pot with minimal remaining soil.', ru: 'Состояние, когда корни полностью оплели горшок и вытеснили грунт.', uz: 'Ildizlar tuvak ichini butunlay egallab, tuproqqa joy qolmagan holat.'}},
  {id: 'gl20', letter: 'S', term: {en: 'Spathe', ru: 'Покрывало', uz: 'Qoplama barg'}, definition: {en: 'Modified decorative hood leaf surrounding the flower spike on Peace Lilies and Anthuriums.', ru: 'Видоизменённый яркий или белый лист вокруг соцветия у спатифиллума и антуриума.', uz: 'Spatifillum va anturium gullari so‘tasini o‘rab turuvchi oq yoki qizil shakllangan barg.'}},
  {id: 'gl21', letter: 'S', term: {en: 'Sphagnum Moss', ru: 'Мох сфагнум', uz: 'Sfagnum moxi'}, definition: {en: 'Sponge-like moisture-retaining moss used on climbing poles and for rooting cuttings.', ru: 'Влагоёмкий антисептический мох, применяемый для опор и укоренения.', uz: 'Namlikni yaxshi saqlovchi, qalamcha ildizlatish va tayanch ustunlar uchun ishlatiladigan mox.'}},
  {id: 'gl22', letter: 'S', term: {en: 'Stomata', ru: 'Устьица', uz: 'Og‘izchalar (Stomata)'}, definition: {en: 'Microscopic pores on leaf undersides that exchange carbon dioxide, oxygen, and water vapor.', ru: 'Микроскопические поры на листьях для газообмена и испарения влаги.', uz: 'Barg ostidagi gaz almashinuvi va suv bug‘lanishini boshqaruvchi mikroskopik teshikchalar.'}},
  {id: 'gl23', letter: 'V', term: {en: 'Variegation', ru: 'Вариегатность (Пестролистность)', uz: 'Variegatlik (Ola-bulalik)'}, definition: {en: 'White, cream, silver, or golden patterning on leaves caused by reduced chlorophyll in zones.', ru: 'Белые, золотистые или серебристые узоры на листьях с меньшим содержанием хлорофилла.', uz: 'Barglardagi xlorofill kamaygan oq, sariq yoki kumushrang naqshli qismlar.'}},
  {id: 'gl24', letter: 'V', term: {en: 'Velamen', ru: 'Веламен', uz: 'Velamen'}, definition: {en: 'Spongy silver outer sheath covering orchid aerial roots to soak up atmospheric moisture.', ru: 'Губчатая оболочка воздушных корней орхидей, быстро впитывающая влагу.', uz: 'Orxideya havo ildizlarini o‘rab turuvchi va namlikni tez shimuvchi g‘ovak qatlam.'}},
];

// ── 5. BOTANICAL ARTICLES (6 Articles) ─────────────────────────────────────

export interface ArticleItem {
  id: string;
  readMinutes: number;
  date: string;
  imageKey: ImageKey;
  title: LocalizedText;
  excerpt: LocalizedText;
  paragraphs: Record<'en' | 'ru' | 'uz', string[]>;
}

export const ARTICLES: ArticleItem[] = [
  {
    id: 'light-physics',
    readMinutes: 5,
    date: '2026-10-12',
    imageKey: 'heroJungle',
    title: {en: 'The Invisible Physics of Window Light', ru: 'Невидимая физика света у домашнего окна', uz: 'Uy derazasidagi yorug‘lik fizikasi'},
    excerpt: {en: 'Why human eyes misjudge brightness indoors and how to position plants accurately.', ru: 'Почему человеческий глаз ошибается в оценке тени и как правильно расставить горшки.', uz: 'Nima uchun ko‘zimiz xona yorug‘ligini noto‘g‘ri baholaydi va tuvaklarni qayerga qo‘yish kerak.'},
    paragraphs: {
      en: [
        'Human pupils adapt so effortlessly to indoor rooms that a corner 3 meters from a window feels pleasant and bright to us—yet to a tropical leaf, light energy has already fallen by nearly 85%.',
        'Sunlight intensity follows the inverse-square principle indoors as walls and frames block sky angles. A plant sitting right on an unobstructed windowsill sees a wide arc of open sky, while one tucked beside a bookcase sees only a narrow sliver.',
        'When diagnosing slow growth or leaning stems, look through your plant’s perspective: how much open sky can its leaves actually see? Often shifting a pot just 60 centimeters closer to glass transforms weak foliage into vigorous new shoots.',
      ],
      ru: [
        'Человеческий зрачок мгновенно адаптируется к полумраку, поэтому угол в трёх метрах от окна кажется нам светлым. Однако для фотосинтеза растения освещённость там падает почти на 85%.',
        'Интенсивность света резко снижается по мере удаления от стекла: стены и рамы перекрывают обзор неба. Цветок на подоконнике «видит» широкий купол неба, а в глубине комнаты — лишь узкую полосу.',
        'Если рост остановился или побеги вытянулись, посмотрите на окно глазами самого растения: насколько большой участок неба доступен его листьям? Перестановка ближе к стеклу даже на 60 см часто творит чудеса.',
      ],
      uz: [
        'Inson ko‘zi xona yarim qorong‘iligiga tez moslashgani uchun derazadan 3 metr naridagi burchak ham bizga yorug‘dek tuyuladi. Biroq o‘simlik bargi uchun u yerda yorug‘lik quvvati deyarli 85% ga kamaygan bo‘ladi.',
        'Yorug‘lik kuchi derazadan uzoqlashgan sari keskin pasayadi, chunki devor va romlar osmon burchagini to‘sadi. Deraza tokchasidagi gul keng osmonni ko‘rsa, xona ichkarisidagi o‘simlik faqat tor chiziqni ko‘radi.',
        'O‘sish sekinlashsa yoki poyalar cho‘zilsa, derazaga o‘simlik nigohi bilan qarang: uning barglari osmonning qancha qismini ko‘ra oladi? Tuvakni oynaga atigi 60 sm yaqinlashtirish ham kuchli o‘sish beradi.',
      ],
    },
  },
  {
    id: 'root-oxygen',
    readMinutes: 4,
    date: '2026-09-28',
    imageKey: 'careTools',
    title: {en: 'Why Roots Need Air Just as Much as Water', ru: 'Почему корням нужен воздух не меньше, чем вода', uz: 'Nima uchun ildizlarga suv kabi havo ham zarur'},
    excerpt: {en: 'Understanding soil pore space prevents 90% of yellowing leaf emergencies.', ru: 'Понимание структуры грунта спасает от 90% проблем с пожелтением листьев.', uz: 'Tuproqdagi havo bo‘shliqlarini tushunish barg sarg‘ayishining 90% oldini oladi.'},
    paragraphs: {
      en: [
        'Plant leaves breathe carbon dioxide in sunlight, while underground roots respire oxygen continuously around the clock. Without oxygen pockets between soil particles, root cells suffocate and beneficial microbes give way to anaerobic rot.',
        'This explains why overwatering is rarely about giving too much water in a single pour—it is about watering too frequently or trapping roots inside dense peat with zero airflow.',
        'Blending coarse perlite, orchid bark, and pumice into potting soil ensures excess water drains smoothly while tiny air channels remain open around healthy white roots.',
      ],
      ru: [
        'Пока листья поглощают углекислый газ на свету, корни под землёй круглосуточно дышат кислородом. Если все поры в грунте забиты водой, корневые волоски задыхаются, и развивается гниль.',
        'Поэтому перелив возникает не от одного обильного полива, а от слишком частой влаги или плотной торфяной земли без дренажа и разрыхлителей.',
        'Добавление перлита, сосновой коры и пемзы сохраняет в горшке микроскопические воздушные каналы, по которым корни свободно дышат даже после хорошего пролива.',
      ],
      uz: [
        'Barglar yorug‘likda karbonat angidrid yutsa, yer ostidagi ildizlar kechayu kunduz uzluksiz kislorod bilan nafas oladi. Agar tuproqdagi barcha teshiklar suv bilan to‘lib qolsa, ildiz hujayralari bo‘g‘ilib chirish boshlanadi.',
        'Shu bois ortiqcha sug‘orish bir martada ko‘p suv quyishdan emas, balki tuproq qurimasdan tez-tez quyish yoki havo o‘tmaydigan zich tuproq ishlatishdan kelib chiqadi.',
        'Tuproqqa yirik perlit, po‘stloq va pemza aralashtirish ortiqcha suvni tez o‘tkazib, ildiz atrofida doimiy havo yo‘lakchalarini saqlaydi.',
      ],
    },
  },
  {
    id: 'acclimation',
    readMinutes: 4,
    date: '2026-09-14',
    imageKey: 'tropicalBroadleaf',
    title: {en: 'The First 14 Days: Acclimating New Plants', ru: 'Первые 14 дней: адаптация нового растения дома', uz: 'Ilk 14 kun: yangi o‘simlikni uyga moslashtirish'},
    excerpt: {en: 'Greenhouses have skylights and 70% humidity—help new arrivals adjust smoothly.', ru: 'В теплицах идеальная влажность и верхний свет — помогите новичку адаптироваться без стресса.', uz: 'Issiqxonalardan kelgan o‘simliklarni stresssiz xona sharoitiga o‘rgatish yo‘llari.'},
    paragraphs: {
      en: [
        'Most houseplants spend their early months in bright commercial greenhouses with automated misting. Moving into an apartment with side windows and dry air is a dramatic shift.',
        'During the first two weeks, avoid repotting immediately unless soil is actively rotting or pest-infested. Let the plant settle in quarantine while keeping light bright and indirect.',
        'Seeing one or two lower yellow leaves during acclimation is normal as the plant adjusts leaf density to match your home’s exact light budget.',
      ],
      ru: [
        'Большинство магазинных растений выращены в оранжереях с верхним рассеянным светом и влажностью около 70%. Переезд в квартиру — серьёзная смена климата.',
        'В первые две недели не спешите с пересадкой, если нет гнили или вредителей. Дайте новичку спокойно пройти карантин при стабильном рассеянном свете.',
        'Потеря одного-двух нижних листьев в первый месяц — естественная настройка кроны под освещённость вашей комнаты.',
      ],
      uz: [
        'Do‘konlardagi aksariyat o‘simliklar 70% namlik va tepadan tushadigan yorug‘ issiqxonalarda o‘stiriladi. Xonadonga ko‘chish ular uchun katta iqlim o‘zgarishidir.',
        'Dastlabki ikki haftada chirish yoki zararkunanda bo‘lmasa, darhol ko‘chirib o‘tqazishga shoshilmang. O‘simlik karantinda tinch moslashib olsin.',
        'Birinchi oyda bir-ikkita pastki bargning sarg‘ayishi tabiiy hol — o‘simlik barg sonini uyingiz yorug‘ligiga moslashtirmoqda.',
      ],
    },
  },
  {
    id: 'humidity-myths',
    readMinutes: 4,
    date: '2026-08-30',
    imageKey: 'floweringBloom',
    title: {en: 'Misting vs Humidifiers: What Actually Works', ru: 'Опрыскивание или увлажнитель: что действительно работает', uz: 'Suv sepish va namlagich: qay biri haqiqatda foydali?'},
    excerpt: {en: 'Separating quick myths from effective microclimate habits for Calathea and Ferns.', ru: 'Разбираем мифы и выбираем эффективные способы поддержания влажности.', uz: 'Kalateya va qirqquloqlar uchun haqiqiy namlik yaratish usullari.'},
    paragraphs: {
      en: [
        'Spraying leaves with a hand mister boosts humidity for only 10–15 minutes before evaporating—and lingering wet droplets overnight can actually invite fungal spots on begonias or African violets.',
        'Grouping 4–6 plants together creates a natural localized humidity pocket as all their leaves transpire water vapor simultaneously.',
        'For fussy tropicals like Calathea Medallion or Boston Fern during winter heating, a dedicated cool-mist humidifier delivers steady 50–60% moisture around the clock.',
      ],
      ru: [
        'Опрыскивание из пульверизатора повышает влажность лишь на 10–15 минут, а капли на ночь на бархатных листьях могут спровоцировать грибок.',
        'Гораздо эффективнее сгруппировать 4–6 растений рядом: испаряя влагу вместе, они формируют собственный мягкий микроклимат.',
        'Для капризных калатей и папоротников зимой лучшим решением остаётся ультразвуковой увлажнитель, поддерживающий стабильные 50–60%.',
      ],
      uz: [
        'Pulverizator bilan suv sepish namlikni atigi 10–15 daqiqaga oshiradi, kechasi bargda qolgan tomchilar esa begoniya kabi turlarda zamburug‘ keltirib chiqarishi mumkin.',
        '4–6 ta o‘simlikni yonma-yon joylashtirish ancha samarali — ular birgalikda bug‘ chiqarib tabiiy nam mikroiqlim hosil qiladi.',
        'Qishki isitish mavsumida injiq kalateya va qirqquloqlar uchun doimiy 50–60% namlik beruvchi namlagich eng yaxshi yechimdir.',
      ],
    },
  },
  {
    id: 'pet-safe-jungle',
    readMinutes: 3,
    date: '2026-08-15',
    imageKey: 'trailingFoliage',
    title: {en: 'Building a 100% Pet-Safe Indoor Jungle', ru: 'Безопасные джунгли для домов с кошками и собаками', uz: 'Mushuk va itlar uchun 100% xavfsiz uy o‘rmoni'},
    excerpt: {en: 'Lush non-toxic species that deliver drama without worry.', ru: 'Эффектные нетоксичные растения, не опасные при случайном интересе питомцев.', uz: 'Uy hayvonlari tishlab ko‘rsa ham xavf tug‘dirmaydigan ko‘rkam o‘simliklar.'},
    paragraphs: {
      en: [
        'Many popular aroids contain insoluble calcium oxalate crystals that irritate mouths if chewed. Fortunately, pet owners never have to compromise on lush indoor style.',
        'Spider Plants, Money Trees, Calatheas, Boston Ferns, Moth Orchids, and true Peperomias offer cascading vines, patterned leaves, and vibrant blooms without toxicity.',
        'For non-safe favorites like Monstera or Pothos, use high wall shelves or ceiling macramé hangers safely above curious paws.',
      ],
      ru: [
        'Многие популярные ароидные содержат кристаллы оксалата кальция, вызывающие раздражение при надкусывании. К счастью, выбор безопасных видов огромен.',
        'Хлорофитум, пахира, калатея, нефролепис и орхидея фаленопсис абсолютно нетоксичны для кошек и собак.',
        'А любимые лианы вроде эпипремнума всегда можно разместить в подвесных кашпо вне зоны досягаемости лап.',
      ],
      uz: [
        'Ko‘plab mashhur aroidlar tarkibida kalsiy oksalat kristallari bo‘lib, chaynalganda og‘izni achishtiradi. Yaxshiyamki, xavfsiz turlar ham juda ko‘p.',
        'Xlorofitum, paxira, kalateya, Boston qirqqulog‘i va falenopsis orxideyasi mushuk va itlar uchun mutlaqo zararsizdir.',
        'Monstera yoki potos kabi turlarni esa hayvonlar qo‘li yetmaydigan baland javon yoki osma kashpolarga joylashtirish mumkin.',
      ],
    },
  },
  {
    id: 'propagation-joy',
    readMinutes: 5,
    date: '2026-07-22',
    imageKey: 'sculpturalSucculent',
    title: {en: 'The Slow Joy of Home Propagation', ru: 'Радость домашнего черенкования и деления', uz: 'Uyda o‘simlik ko‘paytirish zavqi'},
    excerpt: {en: 'Multiply your favorite plants sustainably from nodes, offsets, and rhizomes.', ru: 'Умножайте любимую коллекцию экологично — черенками и детками.', uz: 'Sevimli o‘simliklaringizni qalamcha va bolachalardan oson ko‘paytirish.'},
    paragraphs: {
      en: [
        'Watching tiny white root tips emerge from a green stem inside a sunlit glass jar connects you directly to how plants regenerate.',
        'Golden Pothos, Heartleaf Philodendron, and Spider Plant pups root reliably for beginners within 2–3 weeks. Snake plants and ZZ plants multiply steadily when you divide crowded rhizomes during spring repotting.',
        'Always label jars with the date and species—and pot water-rooted cuttings before roots grow overly tangled, keeping soil lightly moist for the first ten days.',
      ],
      ru: [
        'Наблюдать за появлением первых белых корешков в прозрачном стакане на свету — одно из самых вдохновляющих удовольствий в цветоводстве.',
        'Эпипремнум, филодендрон и розетки хлорофитума укореняются за 2–3 недели, а сансевиерию и замиокулькас удобно делить весной при пересадке.',
        'Пересаживайте укоренённый черенок в небольшой горшок, когда корни достигнут 4–6 см, и первые 10 дней поддерживайте грунт чуть влажным.',
      ],
      uz: [
        'Quyoshli derazadagi shaffof idishda yashil novdadan ilk oq ildizchalar chiqishini kuzatish bog‘bonlikning eng yoqimli lahzalaridan biridir.',
        'Oltin potos, yurakbarg filodendron va xlorofitum bolachalari 2–3 haftada bemalol ildiz otadi. Sansevyeriya va zamiokulkasni esa bahorda ildizpoyasidan bo‘lib ko‘paytirish qulay.',
        'Suvda ildizlar 4–6 sm ga yetganda kichik tuvakka eking va dastlabki 10 kun tuproqni yengil nam holda tuting.',
      ],
    },
  },
];

// ── 6. FAQ ITEMS (8 Questions) ─────────────────────────────────────────────

export interface FaqItem {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq1',
    question: {en: 'How often should I water my indoor plants?', ru: 'Как часто нужно поливать комнатные растения?', uz: 'Xona o‘simliklarini necha kunda sug‘orish kerak?'},
    answer: {
      en: 'Instead of following a strict fixed day of the week, test the top 3–5 cm of soil with your finger. Tropicals generally prefer drying halfway or top few centimeters, while succulents and snake plants wait until fully dry.',
      ru: 'Не привязывайтесь к конкретному дню недели — проверяйте верхние 3–5 см грунта пальцем. Тропическим видам нужно подсыхание верха, а суккулентам и сансевиерии — полное просыхание.',
      uz: 'Haftaning aniq kuniga bog‘lanib qolmang — tuproqning ustki 3–5 sm qismini barmoq bilan tekshiring. Tropiklar usti quriganda, sukkulent va sansevyeriyalar esa to‘liq quriganda sug‘oriladi.',
    },
  },
  {
    id: 'faq2',
    question: {en: 'Where is my GreenNest data stored? Do you use cookies?', ru: 'Где хранятся мои данные GreenNest и есть ли cookies?', uz: 'GreenNestdagi ma’lumotlarim qayerda saqlanadi?'},
    answer: {
      en: 'Everything—your watering schedule, plant journal, quiz bests, favorites, and Green Academy XP—is stored 100% locally in your browser’s localStorage. We do not use tracking cookies or external servers.',
      ru: 'Все графики полива, дневник, рекорды викторин, избранное и прогресс Академии хранятся исключительно в localStorage вашего браузера без серверов и отслеживающих cookies.',
      uz: 'Sug‘orish jadvali, kundalik, test natijalari, tanlanganlar va Akademiya yutuqlari 100% brauzeringizdagi localStorage xotirasida saqlanadi. Hech qanday server yoki kuzatuvchi cookie ishlatilmaydi.',
    },
  },
  {
    id: 'faq3',
    question: {en: 'Are there plants that thrive in windowless or very dim rooms?', ru: 'Есть ли растения, которые живут совсем без света?', uz: 'Derazasiz yoki juda qorong‘i xonada o‘sadigan o‘simliklar bormi?'},
    answer: {
      en: 'Every living plant requires light for photosynthesis. However, Snake Plant, ZZ Plant, and green Chinese Evergreen tolerate low-light corners well—and adding a simple full-spectrum LED bulb on a timer lets you grow plants anywhere.',
      ru: 'Любому растению нужен свет для фотосинтеза. В слабом освещении лучше всех держатся сансевиерия, замиокулькас и зелёная аглаонема, а с обычной фитолампой на таймере зелень будет расти в любом углу.',
      uz: 'Har qanday o‘simlik fotosintez uchun yorug‘likka muhtoj. Biroq sansevyeriya, zamiokulkas va yashil aglaonema kam yorug‘likka chidamli; taymerli fitolampa bilan esa istalgan joyda o‘stirish mumkin.',
    },
  },
  {
    id: 'faq4',
    question: {en: 'Why are the tips of my Peace Lily or Spider Plant turning brown?', ru: 'Почему у спатифиллума или хлорофитума сохнут кончики листьев?', uz: 'Nima uchun spatifillum yoki xlorofitum barglarining uchi jigarrang bo‘lib qoladi?'},
    answer: {
      en: 'Usually dry winter heating air or minerals like fluoride in tap water. Switching to filtered or settled water and keeping plants away from radiators makes a visible difference on new leaves.',
      ru: 'Чаще всего это реакция на сухой воздух от батарей либо хлор и фтор в водопроводной воде. Попробуйте фильтрованную воду и отодвиньте горшок от отопления.',
      uz: 'Odatda isitgichdan chiqayotgan quruq havo yoki jo‘mrak suvidagi ftor va tuzlar sabab bo‘ladi. Filtrlangan suvga o‘ting va tuvakni isitgichdan uzoqlashtiring.',
    },
  },
  {
    id: 'faq5',
    question: {en: 'Should I mist my houseplants every day?', ru: 'Нужно ли опрыскивать комнатные растения каждый день?', uz: 'O‘simliklarga har kuni suv purkash shartmi?'},
    answer: {
      en: 'Not usually! Misting raises humidity only briefly and can cause leaf spots on fuzzy or delicate foliage. Grouping plants together or running a cool-mist humidifier is far more effective.',
      ru: 'Нет, это необязательно. Опрыскивание даёт эффект лишь на 10 минут и иногда вредит бархатным листьям. Намного надёжнее группировка растений или увлажнитель воздуха.',
      uz: 'Shart emas! Suv sepish namlikni atigi bir necha daqiqaga oshiradi va nozik barglarda dog‘ qoldirishi mumkin. O‘simliklarni yonma-yon qo‘yish yoki namlagich ishlatish ancha foydali.',
    },
  },
  {
    id: 'faq6',
    question: {en: 'When should I repot a newly bought plant?', ru: 'Когда пересаживать только что купленное растение?', uz: 'Yangi sotib olingan o‘simlikni qachon ko‘chirish kerak?'},
    answer: {
      en: 'Give it 2–3 weeks to acclimate to your home’s light and humidity first, unless the nursery soil is waterlogged or infested. Always choose a pot only 2–5 cm wider.',
      ru: 'Дайте растению 2–3 недели на адаптацию к микроклимату квартиры, если нет срочной гнили или вредителей. Новый горшок выбирайте шире всего на 2–5 см.',
      uz: 'Agar ildiz chirishi yoki zararkunanda bo‘lmasa, uyingizga moslashishi uchun 2–3 hafta kuting. Yangi tuvakni atigi 2–5 sm kengroq oling.',
    },
  },
  {
    id: 'faq7',
    question: {en: 'How do I print my Green Academy certificate?', ru: 'Как распечатать сертификат Зелёной Академии?', uz: 'Yashil Akademiya sertifikatini qanday chop etish mumkin?'},
    answer: {
      en: 'Visit Green Academy → Badges & Certificate tab, enter your name, and click Print / Save PDF Certificate. Our clean print stylesheet formats it automatically for A4 or Letter paper.',
      ru: 'Перейдите в «Академия → Значки и сертификат», введите своё имя и нажмите «Распечатать / Сохранить PDF». Страница автоматически отформатируется для печати.',
      uz: 'Yashil Akademiya → Nishonlar va sertifikat bo‘limiga o‘ting, ismingizni kiriting va «Chop etish / PDF saqlash» tugmasini bosing.',
    },
  },
  {
    id: 'faq8',
    question: {en: 'Can I use GreenNest offline on my phone?', ru: 'Работает ли GreenNest офлайн на телефоне?', uz: 'GreenNest telefonimda oflayn ishlaydimi?'},
    answer: {
      en: 'Yes! GreenNest is a Progressive Web App (PWA). Install it to your home screen via your browser menu or our Install button to browse plants and care tools anytime.',
      ru: 'Да! GreenNest работает как PWA-приложение. Установите его на главный экран телефона для быстрого доступа к энциклопедии и графику полива.',
      uz: 'Ha! GreenNest PWA ilova sifatida ishlaydi. Uni telefoningiz bosh ekraniga o‘rnatib, istalgan vaqtda foydalanishingiz mumkin.',
    },
  },
];

// ── 7. HOME FUN FACTS & TESTIMONIALS ───────────────────────────────────────

export const FUN_FACTS: LocalizedText[] = [
  {en: 'Monstera deliciosa gets its name from its edible tropical fruit, which tastes like a blend of pineapple and banana when ripe in the wild.', ru: 'Монстера деликатесная получила название за свои съедобные плоды, напоминающие по вкусу смесь ананаса и банана.', uz: 'Monstera delisioza nomi uning tabiatda pishganda ananas va banan ta’mini beruvchi yeyishli mevasidan olingan.'},
  {en: 'Indoor plants release moisture through leaf transpiration, gently stabilizing dry room microclimates.', ru: 'Комнатные растения испаряют чистую влагу через листья, мягко улучшая микроклимат комнаты.', uz: 'Xona o‘simliklari barglari orqali toza namlik bug‘latib, xona mikroiqlimini yumshatadi.'},
  {en: 'Snake plants perform CAM photosynthesis, opening leaf pores at night to release fresh oxygen while conserving daytime water.', ru: 'Сансевиерия использует CAM-фотосинтез и выделяет кислород преимущественно ночью, экономя влагу днём.', uz: 'Sansevyeriya CAM-fotosintez tufayli kunduzi suvni tejab, kechasi kislorod chiqaradi.'},
  {en: 'A single Golden Pothos cutting with one healthy node can grow into a multi-meter cascading vine in under a year.', ru: 'Один черенок золотистого эпипремнума с одним узлом способен вырасти в многометровую лиану меньше чем за год.', uz: 'Bitta bo‘g‘imli oltin potos qalamchasi bir yilga yetmasdan bir necha metrlik chirmashuvchi o‘simlikka aylanadi.'},
  {en: 'Studies show keeping desk greenery in view can lower perceived stress and restore mental focus within minutes.', ru: 'Исследования показывают, что зелёные растения в поле зрения снижают уровень стресса и восстанавливают концентрацию.', uz: 'Tadqiqotlarga ko‘ra, ish stoli yonidagi yashil o‘simliklar stressni kamaytirib, diqqatni tez tiklaydi.'},
  {en: 'Calathea leaves rise vertically every evening—earning them the nickname "Prayer Plants" across generations.', ru: 'Листья калатеи каждый вечер поднимаются вверх, за что её прозвали «молящимся растением».', uz: 'Kalateya barglari har kechqurun yuqoriga ko‘tariladi — shuning uchun unga «ibodat o‘simligi» laqabi berilgan.'},
];

export interface TestimonialItem {
  id: string;
  name: string;
  role: LocalizedText;
  quote: LocalizedText;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Dilnoza Karimova',
    role: {en: 'Interior Architect · Tashkent', ru: 'Архитектор интерьеров · Ташкент', uz: 'Interyer me’mori · Toshkent'},
    quote: {
      en: 'Before GreenNest, I kept losing Calatheas to dry winter air. Using the Plant Doctor checklist and switching to filtered water revived three plants in two weeks.',
      ru: 'Раньше мои калатеи постоянно подсыхали зимой. После диагностики в «Докторе растений» и перехода на фильтрованную воду три куста ожили за две недели.',
      uz: 'Ilgari qishda kalateyalarim doim qurib qolardi. O‘simlik doktori tavsiyasidan so‘ng filtrlangan suvga o‘tib, ikki haftada uchta gulni tikladim.',
    },
  },
  {
    id: 't2',
    name: 'Artem Sokolov',
    role: {en: 'Software Engineer · Almaty', ru: 'Разработчик · Алматы', uz: 'Dasturchi · Olmaota'},
    quote: {
      en: 'The Watering Planner and Light Calculator helped me place a ZZ Plant and Monstera properly in my studio—zero root rot in over a year.',
      ru: 'График полива и калькулятор света помогли идеально расставить замиокулькас и монстеру в студии — ни одного залива за весь год.',
      uz: 'Sug‘orish rejasi va yorug‘lik hisoblagichi yordamida zamiokulkas hamda monsterani to‘g‘ri joylashtirdim — bir yildan beri birorta ildiz chirimadi.',
    },
  },
  {
    id: 't3',
    name: 'Hannah Lindqvist',
    role: {en: 'Botanical Illustrator · Stockholm', ru: 'Ботанический иллюстратор · Стокгольм', uz: 'Botanik rassom · Stokgolm'},
    quote: {
      en: 'I completed all 30 days of Green Academy with my daughter. Watching the SVG sprout bloom into a full plant as we checked off daily leaf care made it unforgettable.',
      ru: 'Прошли весь 30-дневный курс Зелёной Академии вместе с дочерью. Наблюдать, как растёт наш росток за каждое задание — невероятное удовольствие.',
      uz: 'Qizim bilan Yashil Akademiyaning 30 kunlik kursini tugatdik. Har bir vazifadan keyin niholning o‘sib gullashini kuzatish ajoyib motivatsiya berdi.',
    },
  },
];

// ── 8. MINI-GAME DECKS ─────────────────────────────────────────────────────

export interface WaterOrNotCard {
  id: string;
  plantName: LocalizedText;
  scenario: LocalizedText;
  shouldWater: boolean;
  reason: LocalizedText;
}

export const WATER_OR_NOT_CARDS: WaterOrNotCard[] = [
  {
    id: 'w1',
    plantName: {en: 'Peace Lily', ru: 'Спатифиллум', uz: 'Spatifillum'},
    scenario: {en: 'Leaves are dramatically drooping and top 4 cm of soil feels dry.', ru: 'Листья заметно поникли, а верхние 4 см грунта сухие.', uz: 'Barglar osilib qolgan va tuproqning ustki 4 sm qismi quruq.'},
    shouldWater: true,
    reason: {en: 'Dry soil + droop is Peace Lily’s classic thirst signal—soak and drain!', ru: 'Сухая земля и поникание — точный сигнал жажды спатифиллума.', uz: 'Quruq tuproq va barg egilishi chanqoq belgisi — darhol sug‘oring!'},
  },
  {
    id: 'w2',
    plantName: {en: 'Snake Plant', ru: 'Сансевиерия', uz: 'Sansevyeriya'},
    scenario: {en: 'It is winter and the soil 3 cm down still feels slightly cool and damp.', ru: 'Зима, и на глубине 3 см грунт всё ещё прохладный и влажный.', uz: 'Qish fasli va 3 sm chuqurlikda tuproq hali ham salqin va nam.'},
    shouldWater: false,
    reason: {en: 'Never water a Snake Plant until the pot is bone dry all the way down.', ru: 'Сансевиерию поливают только после полного просыхания всего горшка.', uz: 'Sansevyeriyani tuproq tagigacha to‘liq qurimaguncha sug‘ormang.'},
  },
  {
    id: 'w3',
    plantName: {en: 'ZZ Plant', ru: 'Замиокулькас', uz: 'Zamiokulkas'},
    scenario: {en: 'Bottom leaves are turning yellow and soil has been wet for 10 days.', ru: 'Нижние листья желтеют, а земля остаётся мокрой уже 10 дней.', uz: 'Pastki barglar sarg‘aymoqda, tuproq esa 10 kundan beri ho‘l.'},
    shouldWater: false,
    reason: {en: 'Hold off immediately! Wet soil + yellow ZZ leaves warns of overwatering.', ru: 'Ни в коем случае! Сырой грунт и жёлтые листья — признак перелива.', uz: 'Aslo sug‘ormang! Ho‘l tuproq va sarg‘ayish ortiqcha suv belgisidir.'},
  },
  {
    id: 'w4',
    plantName: {en: 'Boston Fern', ru: 'Бостонский папоротник', uz: 'Boston qirqqulog‘i'},
    scenario: {en: 'Surface soil feels barely damp and room heater is running.', ru: 'Поверхность почвы почти сухая, в комнате работает отопление.', uz: 'Tuproq yuzasi deyarli qurigan, xonada isitgich ishlayapti.'},
    shouldWater: true,
    reason: {en: 'Ferns love consistent lightly moist soil and suffer quickly if allowed to dry.', ru: 'Папоротники любят постоянно слегка влажный грунт и плохо переносят пересушку.', uz: 'Qirqquloqlar doimiy yengil namlikni yoqtiradi va quruqlikka chidamsiz.'},
  },
  {
    id: 'w5',
    plantName: {en: 'Golden Barrel Cactus', ru: 'Кактус', uz: 'Oltin kaktus'},
    scenario: {en: 'Watered 5 days ago; it sits in a shaded corner during January.', ru: 'Поливали 5 дней назад; сейчас январь и пасмурно.', uz: '5 kun oldin sug‘orilgan; hozir yanvar va kun bulutli.'},
    shouldWater: false,
    reason: {en: 'Winter cacti are dormant and only need rare sips every 4–6 weeks.', ru: 'Зимой кактус спит и почти не пьёт воду.', uz: 'Qishda kaktus tinchlik davrida bo‘ladi va deyarli suv talab qilmaydi.'},
  },
  {
    id: 'w6',
    plantName: {en: 'Moth Orchid', ru: 'Орхидея фаленопсис', uz: 'Falenopsis orxideyasi'},
    scenario: {en: 'Roots inside the clear pot look pale silvery-grey and bark feels dry.', ru: 'Корни в прозрачном горшке стали серебристо-серыми, кора сухая.', uz: 'Shaffof tuvakdagi ildizlar kumushrang-kulrang tusga kirgan, po‘stloq quruq.'},
    shouldWater: true,
    reason: {en: 'Silvery velamen roots signal it is time for a 10-minute room-temp soak.', ru: 'Серебристые корни веламена — сигнал погрузить горшок в воду на 10 минут.', uz: 'Kumushrang ildizlar 10 daqiqa iliq suvga botirish vaqti kelganini bildiradi.'},
  },
  {
    id: 'w7',
    plantName: {en: 'Monstera Deliciosa', ru: 'Монстера', uz: 'Monstera'},
    scenario: {en: 'Top 6 cm of chunky aroid mix is completely dry on a bright warm summer day.', ru: 'Верхние 6 см рыхлого грунта полностью просохли в тёплый летний день.', uz: 'Issiq yoz kunida g‘ovak tuproqning ustki 6 sm qismi to‘liq qurigan.'},
    shouldWater: true,
    reason: {en: 'Active summer growth needs a thorough soak once the upper root zone dries.', ru: 'Летом при активном росте монстеру пора хорошо пролить.', uz: 'Yozda faol o‘sayotgan monsterani ustki qatlam quriganda yaxshilab sug‘oring.'},
  },
  {
    id: 'w8',
    plantName: {en: 'Jade Plant', ru: 'Толстянка', uz: 'Pul daraxti'},
    scenario: {en: 'Leaves are plump, glossy, and rock-solid firm when gently squeezed.', ru: 'Листья упругие, плотные и глянцевые при лёгком нажатии.', uz: 'Barglari to‘liq, tarang va bosib ko‘rganda juda qattiq.'},
    shouldWater: false,
    reason: {en: 'Firm jade leaves mean water reserves are full—wait until soil dries and leaves soften slightly.', ru: 'Упругие листья полны влаги — дождитесь лёгкой мягкости и сухого грунта.', uz: 'Tarang barglarda suv zaxirasi to‘liq — tuproq qurib, barglar sal yumshashini kuting.'},
  },
];

export interface GuessPlantRound {
  id: string;
  answerId: string;
  clues: Record<'en' | 'ru' | 'uz', [string, string, string]>;
  distractorIds: [string, string, string];
}

export const GUESS_PLANT_ROUNDS: GuessPlantRound[] = [
  {
    id: 'gp1',
    answerId: 'monstera',
    distractorIds: ['snake-plant', 'cactus', 'orchid'],
    clues: {
      en: ['I am a tropical climber from Central American rainforests.', 'My broad leaves develop natural holes called fenestrations as I mature.', 'My Latin name literally means "delicious monster."'],
      ru: ['Я тропическая лиана из лесов Центральной Америки.', 'На моих крупных листьях с возрастом появляются природные прорези.', 'Моё латинское название переводится как «деликатесная».'],
      uz: ['Men Markaziy Amerika tropik o‘rmonlaridan kelgan lianaman.', 'Voyaga yetganimda yirik barglarimda tabiiy teshiklar paydo bo‘ladi.', 'Lotincha nomim «mazali maxluq» ma’nosini beradi.'],
    },
  },
  {
    id: 'gp2',
    answerId: 'calathea',
    distractorIds: ['jade-plant', 'aloe-vera', 'dracaena'],
    clues: {
      en: ['I am pet-safe and crave 55%+ humidity with filtered water.', 'My leaves are painted with intricate emerald-and-silver patterns.', 'Every evening I fold my leaves upright like praying hands (nyctinasty).'],
      ru: ['Я безопасна для животных, но требую мягкой воды и влажности от 55%.', 'Мои листья украшены узорами, а снизу они пурпурные.', 'Каждый вечер я поднимаю листья вверх, словно складываю ладони.'],
      uz: ['Men hayvonlar uchun xavfsizman, yumshoq suv va yuqori namlikni sevaman.', 'Barglarimda yashil-kumush naqshlar bor, orqasi esa binafsha rang.', 'Har kechqurun barglarimni duo qilgandek yuqoriga ko‘taraman.'],
    },
  },
  {
    id: 'gp3',
    answerId: 'snake-plant',
    distractorIds: ['boston-fern', 'peace-lily', 'begonia'],
    clues: {
      en: ['I thrive even in dim bedrooms and forgive missed waterings.', 'My upright sword-like leaves release oxygen at night via CAM photosynthesis.', 'I am also nicknamed "Mother-in-Law’s Tongue."'],
      ru: ['Я выдерживаю полутень и спокойно прощаю редкий полив.', 'Мои жёсткие вертикальные листья выделяют кислород ночью.', 'В народе меня часто называют «Щучий хвост».'],
      uz: ['Men yarim soyada ham yashayman va kam sug‘orishni kechiraman.', 'Tik qilichsimon barglarim kechasi kislorod chiqaradi.', 'Xalq orasida «Ilon o‘simligi» yoki «Qaynonaning tili» deyishadi.'],
    },
  },
  {
    id: 'gp4',
    answerId: 'peace-lily',
    distractorIds: ['cactus', 'zz-plant', 'echeveria'],
    clues: {
      en: ['I dramatically droop my leaves flat the moment I get thirsty.', 'Once watered, I bounce upright within hours.', 'I bloom graceful white hooded spathes above glossy dark green leaves.'],
      ru: ['Я картинно опускаю все листья вниз, как только хочу пить.', 'После полива я поднимаюсь обратно всего за пару часов.', 'Мои белые цветки напоминают изящный парус.'],
      uz: ['Chanqaganimda barcha barglarimni birdan osiltirib yuboraman.', 'Suv ichsam bir necha soatda yana qad rostlayman.', 'To‘q yashil barglar ustida oppoq qoplamali gullar ochaman.'],
    },
  },
  {
    id: 'gp5',
    answerId: 'spider-plant',
    distractorIds: ['anthurium', 'rubber-plant', 'fiddle-leaf-fig'],
    clues: {
      en: ['I am 100% safe for curious cats and dogs.', 'I send out long arching stems tipped with miniature baby clones.', 'My narrow green leaves are striped with creamy white.'],
      ru: ['Я на 100% безопасен для любопытных кошек и собак.', 'Я выпускаю длинные усы с готовыми маленькими детками.', 'Мои дугообразные листья украшены кремовой полосой.'],
      uz: ['Men qiziquvchan mushuk va itlar uchun mutlaqo xavfsizman.', 'Uzun novdalar uchida tayyor kichik «bolachalar» chiqaraman.', 'Egiluvchan yashil barglarimda oq-krem chiziqlar bor.'],
    },
  },
  {
    id: 'gp6',
    answerId: 'orchid',
    distractorIds: ['pothos', 'english-ivy', 'money-tree'],
    clues: {
      en: ['I grow in chunky pine bark rather than regular potting dirt.', 'My silvery roots turn bright green when hydrated.', 'My butterfly-shaped flowers can last for months on an arching spike.'],
      ru: ['Я расту не в обычной земле, а в крупной сосновой коре.', 'Мои серебристые корни зеленеют сразу после замачивания.', 'Мои цветы-бабочки держатся на цветоносе месяцами.'],
      uz: ['Oddiy tuproqda emas, yirik qarag‘ay po‘stlog‘ida o‘saman.', 'Kumushrang ildizlarim suv tekkanda yashil tusga kiradi.', 'Kapalaksimon gullarim oylab so‘limay turadi.'],
    },
  },
];
