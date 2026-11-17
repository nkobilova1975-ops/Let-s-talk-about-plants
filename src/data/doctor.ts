import type {LocalizedText} from '../i18n/types';

export type SymptomId =
  | 'yellow_leaves'
  | 'brown_tips'
  | 'drooping'
  | 'leaf_spots'
  | 'pests'
  | 'no_growth'
  | 'leggy';

export type ConditionId =
  | 'overwatered'
  | 'underwatered'
  | 'low_light'
  | 'direct_sun'
  | 'dry_air'
  | 'cold_draft'
  | 'rootbound';

export interface SymptomOption {
  id: SymptomId;
  label: LocalizedText;
  description: LocalizedText;
}

export interface ConditionOption {
  id: ConditionId;
  label: LocalizedText;
}

export interface DiagnosisResult {
  title: LocalizedText;
  confidence: number;
  causes: Record<'en' | 'ru' | 'uz', string[]>;
  steps: Record<'en' | 'ru' | 'uz', string[]>;
  prevention: LocalizedText;
}

export const SYMPTOMS: SymptomOption[] = [
  {
    id: 'yellow_leaves',
    label: {en: 'Yellow Leaves', ru: 'Жёлтые листья', uz: 'Sarg‘aygan barglar'},
    description: {
      en: 'Lower or scattered leaves turning soft yellow.',
      ru: 'Нижние или отдельные листья становятся мягкими и жёлтыми.',
      uz: 'Pastki yoki ayrim barglar yumshab sarg‘aymoqda.',
    },
  },
  {
    id: 'brown_tips',
    label: {en: 'Brown Crispy Tips', ru: 'Сухие коричневые кончики', uz: 'Quruq jigarrang uchlar'},
    description: {
      en: 'Leaf edges or pointed tips drying out and turning brown.',
      ru: 'Края или кончики листьев подсыхают и темнеют.',
      uz: 'Barg chetlari yoki uchlari qurib qo‘ng‘ir tusga kirmoqda.',
    },
  },
  {
    id: 'drooping',
    label: {en: 'Drooping / Wilting', ru: 'Увядание и поникание', uz: 'So‘lish va osilib qolish'},
    description: {
      en: 'Stems and leaves look limp, curled, or heavy.',
      ru: 'Стебли и листья потеряли тургор и опустились.',
      uz: 'Poya va barglar tarangligini yo‘qotib osilib qolgan.',
    },
  },
  {
    id: 'leaf_spots',
    label: {en: 'Spots or Scorch Marks', ru: 'Пятна или ожоги', uz: 'Dog‘lar yoki quyosh kuyishi'},
    description: {
      en: 'Dark brown, black, or bleached patches across leaf blades.',
      ru: 'Тёмные, бурые или выцветшие пятна на поверхности листа.',
      uz: 'Barg yuzasida qora, jigarrang yoki oqargan dog‘lar bor.',
    },
  },
  {
    id: 'pests',
    label: {en: 'Webbing, Sticky Residue, or Bugs', ru: 'Паутина, липкий налёт или вредители', uz: 'O‘rgimchak to‘ri, yopishqoq shira yoki hasharotlar'},
    description: {
      en: 'Tiny moving specks, white cottony fluff, or sticky sap.',
      ru: 'Мелкие точки, белый пушок или липкие капли на стеблях.',
      uz: 'Mayda harakatlanuvchi nuqtalar, oq momiq yoki yopishqoq izlar.',
    },
  },
  {
    id: 'no_growth',
    label: {en: 'Stalled Growth', ru: 'Остановка роста', uz: 'O‘sishdan to‘xtash'},
    description: {
      en: 'Plant stays unchanged for months during spring/summer.',
      ru: 'Растение не даёт новых листьев даже весной и летом.',
      uz: 'Bahor va yozda ham yangi barg yoki novda chiqmayapti.',
    },
  },
  {
    id: 'leggy',
    label: {en: 'Leggy / Stretched Stems', ru: 'Вытянутые редкие стебли', uz: 'Cho‘zilib ketgan poyalar'},
    description: {
      en: 'Long bare gaps between small pale leaves leaning toward windows.',
      ru: 'Длинные междоузлия и мелкие листья, тянущиеся к свету.',
      uz: 'Barglar orasi uzoqlashib, o‘simlik derazaga qarab egilmoqda.',
    },
  },
];

export const CONDITIONS: ConditionOption[] = [
  {id: 'overwatered', label: {en: 'Soil stays wet / frequent watering', ru: 'Грунт долго мокрый / частый полив', uz: 'Tuproq doim ho‘l / tez-tez sug‘oriladi'}},
  {id: 'underwatered', label: {en: 'Soil is bone dry / missed watering', ru: 'Грунт пересушен / пропуск полива', uz: 'Tuproq qaqragan / sug‘orish kechikkan'}},
  {id: 'low_light', label: {en: 'Far from window / dim corner', ru: 'Далеко от окна / полутень', uz: 'Derazadan uzoq / qorong‘i burchak'}},
  {id: 'direct_sun', label: {en: 'Hot direct afternoon sun', ru: 'Прямое жаркое солнце', uz: 'Tik tushuvchi issiq quyosh'}},
  {id: 'dry_air', label: {en: 'Dry air / near radiator or AC', ru: 'Сухой воздух / рядом батарея или кондиционер', uz: 'Quruq havo / isitgich yoki konditsioner yaqini'}},
  {id: 'cold_draft', label: {en: 'Cold window draft', ru: 'Холодный сквозняк от окна', uz: 'Derazadan sovuq yelvizak'}},
  {id: 'rootbound', label: {en: 'Roots circling / 2+ years in same pot', ru: 'Корни оплели горшок / давно без пересадки', uz: 'Ildizlar tuvakni to‘ldirgan / ko‘chirilmagan'}},
];

export function diagnosePlant(symptom: SymptomId, conditions: ConditionId[]): DiagnosisResult {
  const has = (c: ConditionId) => conditions.includes(c);

  switch (symptom) {
    case 'yellow_leaves': {
      if (has('overwatered')) {
        return {
          title: {en: 'Overwatering & Root Oxygen Stress', ru: 'Переувлажнение и нехватка кислорода корням', uz: 'Ortiqcha sug‘orish va ildiz bo‘g‘ilishi'},
          confidence: 94,
          causes: {
            en: ['Saturated soil prevents roots from absorbing oxygen', 'Early root rot beginning at lower feeder roots'],
            ru: ['Перенасыщенный влагой грунт перекрывает доступ кислорода', 'Начальная стадия корневой гнили'],
            uz: ['Botqoqlangan tuproq ildizlarga kislorod o‘tkazmayapti', 'Mayda ildizlarda chirish boshlanmoqda'],
          },
          steps: {
            en: ['Pause watering immediately and empty any water in the saucer.', 'Slide the root ball out gently; trim dark mushy roots with clean shears.', 'Repot into fresh, airy mix with perlite and drainage holes.'],
            ru: ['Немедленно остановите полив и слейте воду из поддона.', 'Осмотрите корни: аккуратно обрежьте тёмные мягкие участки чистым инструментом.', 'Пересадите в свежий рыхлый грунт с перлитом и дренажом.'],
            uz: ['Sug‘orishni darhol to‘xtating va taglikdagi suvni to‘king.', 'Ildizni tekshirib, qora yumshoq qismlarni toza qaychi bilan kesing.', 'Perlitli g‘ovak tuproq va drenaj teshikli tuvakka ko‘chiring.'],
          },
          prevention: {
            en: 'Always test soil moisture 4–5 cm deep with your finger before watering again.',
            ru: 'Перед каждым поливом проверяйте влажность грунта пальцем на глубине 4–5 см.',
            uz: 'Har gal sug‘orishdan oldin barmog‘ingiz bilan 4–5 sm chuqurlikdagi namlikni tekshiring.',
          },
        };
      }
      if (has('low_light')) {
        return {
          title: {en: 'Light Deficit & Lower Leaf Shedding', ru: 'Нехватка света и сброс нижних листьев', uz: 'Yorug‘lik tanqisligi va eski barg to‘kilishi'},
          confidence: 86,
          causes: {
            en: ['Plant recycles energy from older shaded leaves', 'Soil dries slower in low light'],
            ru: ['Растение забирает питание из старых затенённых листьев', 'В тени земля просыхает медленнее'],
            uz: ['O‘simlik quyosh tushmayotgan pastki barglardan ozuqani qayta taqsimlamoqda', 'Soya joyda tuproq sekin quriydi'],
          },
          steps: {
            en: ['Move plant closer to an east or north-east window.', 'Trim fully yellow leaves cleanly at the stem base.', 'Reduce watering frequency to match lower light.'],
            ru: ['Переставьте растение ближе к восточному или светлому окну.', 'Удалите полностью жёлтые листья у основания черешка.', 'Сократите частоту поливов соразмерно освещению.'],
            uz: ['O‘simlikni sharqiy yoki yorug‘roq derazaga yaqinroq suring.', 'To‘liq sarg‘aygan barglarni poya tagidan toza kesib oling.', 'Yorug‘lik kamayganda sug‘orish oralig‘ini uzaytiring.'],
          },
          prevention: {
            en: 'Rotate pots weekly and keep leaves dust-free so every photon counts.',
            ru: 'Поворачивайте горшок раз в неделю и протирайте листья от пыли.',
            uz: 'Haftada bir tuvakni aylantiring va barglarni changdan tozalab turing.',
          },
        };
      }
      return {
        title: {en: 'Moisture Imbalance or Nutrient Depletion', ru: 'Дисбаланс полива или истощение питания', uz: 'Namlik muvozanati buzilishi yoki ozuqa yetishmasligi'},
        confidence: 82,
        causes: {
          en: ['Irregular swings between overly dry and soaked soil', 'Natural aging of oldest bottom leaves', 'Nitrogen deficiency in old potting mix'],
          ru: ['Резкие качели между засухой и обильным поливом', 'Естественное старение самых нижних листьев', 'Нехватка азота в старом грунте'],
          uz: ['Quruqlik va haddan ortiq namlik o‘rtasidagi keskin almashinuv', 'Eng pastki eski barglarning tabiiy qarishi', 'Eski tuproqda azot yetishmasligi'],
        },
        steps: {
          en: ['Establish a steady check-then-water rhythm.', 'Flush soil lightly and feed diluted balanced fertilizer during spring/summer.', 'Remove spent yellow leaves to keep energy focused upward.'],
          ru: ['Наладьте регулярную проверку влажности перед поливом.', 'В период роста подкормите сбалансированным удобрением в половинной дозе.', 'Удалите старые жёлтые листья.'],
          uz: ['Sug‘orishdan oldin tuproqni tekshirish odatini yo‘lga qo‘ying.', 'Bahor-yoz mavsumida yarim dozada muvozanatli o‘g‘it bering.', 'Sarg‘aygan eski barglarni olib tashlang.'],
        },
        prevention: {
          en: 'Refresh topsoil or repot every 18–24 months to replenish nutrients.',
          ru: 'Обновляйте верхний слой грунта или пересаживайте растение раз в 1.5–2 года.',
          uz: 'Har 18–24 oyda ustki tuproqni yangilang yoki tuvakni almashtiring.',
        },
      };
    }

    case 'brown_tips': {
      return {
        title: {
          en: has('dry_air') ? 'Low Ambient Humidity & Mineral Buildup' : 'Dry Air or Tap-Water Salt Sensitivity',
          ru: has('dry_air') ? 'Сухой воздух и накопление солей' : 'Сухость воздуха или жёсткая вода',
          uz: has('dry_air') ? 'Quruq havo va tuzlar to‘planishi' : 'Havoning quruqligi yoki qattiq suv ta’siri',
        },
        confidence: has('dry_air') ? 93 : 85,
        causes: {
          en: ['Indoor humidity below 35% near radiators or AC vents', 'Fluoride, chlorine, or dissolved salts in tap water', 'Inconsistent watering allowing fine root hairs to dry'],
          ru: ['Влажность в комнате ниже 35% возле отопления или кондиционера', 'Фтор и соли жёсткости в водопроводной воде', 'Пересыхание тонких всасывающих корешков'],
          uz: ['Isitgich yoki konditsioner yonida havo namligi 35% dan pastligi', 'Vodoprovod suvidagi ftor va tuzlar', 'Mayda ildiz tukchalari qurib qolishi'],
        },
        steps: {
          en: ['Move plant away from direct radiator/AC airflow.', 'Switch to filtered, distilled, or 24-hour settled water.', 'Group humidity-loving plants together or run a cool-mist humidifier.', 'Trim brown tips cleanly following the natural leaf shape (leave a 1 mm dry border).'],
          ru: ['Уберите растение от прямого потока горячего или холодного воздуха.', 'Перейдите на фильтрованную или отстоянную воду.', 'Сгруппируйте растения рядом или включите увлажнитель.', 'Аккуратно подрежьте сухие кончики по форме листа, оставляя 1 мм кромки.'],
          uz: ['O‘simlikni isitgich va konditsioner oqimidan uzoqlashtiring.', 'Filtrlangan yoki bir sutka tindirilgan suvdan foydalaning.', 'Namsevar o‘simliklarni yonma-yon qo‘ying yoki namlagich ishlating.', 'Quruq uchlarni barg shakliga moslab, 1 mm quruq hoshiya qoldirib kesing.'],
        },
        prevention: {
          en: 'Flush pots thoroughly with clean water every 2–3 months to wash out mineral salts.',
          ru: 'Раз в 2–3 месяца проливайте грунт чистой мягкой водой для вымывания солей.',
          uz: 'Har 2–3 oyda tuvakni toza yumshoq suv bilan yuvib, tuzlarni chiqarib yuboring.',
        },
      };
    }

    case 'drooping': {
      const wet = has('overwatered');
      return {
        title: {
          en: wet ? 'Waterlogged Collapse (Root Suffocation)' : 'Turgor Loss from Dehydration or Cold Shock',
          ru: wet ? 'Поникание от залива (удушье корней)' : 'Потеря тургора от жажды или холода',
          uz: wet ? 'Ortiqcha suvdan ildiz bo‘g‘ilishi' : 'Suvsizlik yoki sovuq shokdan so‘lish',
        },
        confidence: 90,
        causes: {
          en: wet
            ? ['Roots cannot draw water because they are suffocating or rotting in soggy soil']
            : ['Root ball has completely dried out (hydrophobic soil repelling water)', 'Sudden cold draft shock'],
          ru: wet
            ? ['Корни не могут качать воду из-за гнили в переувлажнённой почве']
            : ['Земляной ком пересох и отталкивает воду', 'Резкий переохлаждающий сквозняк'],
          uz: wet
            ? ['Ildizlar ho‘l tuproqda bo‘g‘ilib yoki chirib, suv so‘ra olmayapti']
            : ['Tuproq bo‘lagi qaqrab, suvni o‘tkazmay qolgan', 'Keskin sovuq yelvizak urgan'],
        },
        steps: {
          en: wet
            ? ['Check roots immediately; repot into dry chunky soil and withhold water for 5–7 days.']
            : ['Bottom-water the pot in a basin of room-temperature water for 20–30 minutes until bubbles stop.', 'Move away from cold windows to a cozy 20–24°C spot.'],
          ru: wet
            ? ['Срочно проверьте корни и пересадите в слегка влажный воздушный субстрат.']
            : ['Поставьте горшок в таз с водой комнатной температуры на 20–30 минут для пропитки кома.', 'Перенесите в тёплое место без сквозняков (20–24°C).'],
          uz: wet
            ? ['Zudlik bilan ildizlarni tekshiring va quruqroq g‘ovak tuproqqa ko‘chiring.']
            : ['Tuvakni xona haroratidagi suvli idishga 20–30 daqiqa qo‘yib pastdan to‘yintiring.', 'Sovuq derazadan 20–24°C iliq joyga oling.'],
        },
        prevention: {
          en: 'Aerating compact soil gently with a wooden skewer helps water penetrate evenly.',
          ru: 'Аккуратно рыхлите плотный грунт деревянной шпажкой, чтобы вода не стекала мимо кома.',
          uz: 'Suv bir tekis singishi uchun zich tuproqni yog‘och tayoqcha bilan ehtiyotlab yumshating.',
        },
      };
    }

    case 'leaf_spots': {
      return {
        title: {
          en: has('direct_sun') ? 'Solar Leaf Scorch' : 'Fungal / Bacterial Leaf Spot',
          ru: has('direct_sun') ? 'Солнечный ожог листьев' : 'Грибковая или бактериальная пятнистость',
          uz: has('direct_sun') ? 'Quyoshdan barg kuyishi' : 'Zamburug‘li yoki bakterial dog‘lanish',
        },
        confidence: 88,
        causes: {
          en: has('direct_sun')
            ? ['Harsh unaccustomed direct sun burning thin leaf tissue']
            : ['Water droplets sitting on foliage overnight in stagnant air', 'Overly wet soil encouraging fungal spores'],
          ru: has('direct_sun')
            ? ['Прямые лучи обожгли нежную ткань листа']
            : ['Капли воды на листьях в застойном воздухе ночью', 'Избыточная сырость грунта'],
          uz: has('direct_sun')
            ? ['O‘tkir tik quyosh nuri nozik barg to‘qimasini kuydirgan']
            : ['Turg‘un havoda kechasi barg ustida suv tomchilari qolgan', 'Haddan tashqari nam tuproq zamburug‘ni ko‘paytirgan'],
        },
        steps: {
          en: ['Filter harsh window light with a sheer curtain or shift 1 m back.', 'Trim heavily spotted leaves with sterilized scissors.', 'Stop misting leaves; improve gentle air circulation in the room.'],
          ru: ['Притените окно лёгким тюлем или отодвиньте горшок на 1 м.', 'Удалите сильно поражённые листья стерильными ножницами.', 'Прекратите опрыскивание и улучшите проветривание.'],
          uz: ['Derazaga yupqa parda torting yoki o‘simlikni 1 m orqaga suring.', 'Qattiq zararlangan barglarni spirtlangan qaychi bilan kesib tashlang.', 'Barglarga suv sepishni to‘xtating va xona havosini aylantiring.'],
        },
        prevention: {
          en: 'Water early in the morning at soil level so excess moisture evaporates during daylight.',
          ru: 'Поливайте утром строго под корень, чтобы к ночи поверхность была сухой.',
          uz: 'Sug‘orishni ertalab ildiz ostidan bajaring, toki kechgacha ortiqcha nam bug‘lansin.',
        },
      };
    }

    case 'pests': {
      return {
        title: {en: 'Common Houseplant Pest Outbreak', ru: 'Поражение комнатными вредителями', uz: 'Xona o‘simligi zararkunandalari hujumi'},
        confidence: 92,
        causes: {
          en: ['Spider mites (fine webbing under leaves in dry air)', 'Mealybugs (white cottony clusters in leaf nodes)', 'Scale or aphids leaving sticky honeydew'],
          ru: ['Паутинный клещ (тонкая паутинка при сухом воздухе)', 'Мучнистый червец (белая вата в пазухах)', 'Щитовка или тля (липкий сладкий налёт)'],
          uz: ['O‘rgimchakkana (quruq havoda mayda to‘r)', 'Unli qurt (barg qo‘ltiqlarida oq momiq)', 'Qalqondor yoki shira (yopishqoq shira izi)'],
        },
        steps: {
          en: ['Quarantine the affected plant immediately away from healthy neighbors.', 'Rinse leaves thoroughly under lukewarm shower water.', 'Wipe stems and leaf undersides with 70% isopropyl alcohol cotton swabs (for mealybugs) or spray diluted insecticidal soap / neem oil every 5 days for 3 weeks.'],
          ru: ['Немедленно изолируйте растение от остальной коллекции.', 'Промойте листья тёплым душем, прикрыв грунт плёнкой.', 'Обработайте пазухи спиртовым тампоном и проведите 3 обработки зелёным мылом или маслом нима с интервалом 5 дней.'],
          uz: ['Zararlangan o‘simlikni darhol boshqalaridan ajrating.', 'Tuproqni yopib, barglarni iliq dush ostida yaxshilab yuving.', 'Poya va barg ostini spirtli paxta bilan arting hamda 3 hafta davomida har 5 kunda neem moyi yoki sovunli eritma seping.'],
        },
        prevention: {
          en: 'Quarantine every new store-bought plant for 14 days and inspect leaf undersides weekly.',
          ru: 'Держите каждое новое растение на 14-дневном карантине и еженедельно осматривайте изнанку листьев.',
          uz: 'Har bir yangi xarid qilingan o‘simlikni 14 kun karantinda saqlang va haftada bir barg ostini tekshiring.',
        },
      };
    }

    case 'no_growth': {
      return {
        title: {
          en: has('rootbound') ? 'Rootbound Pot & Exhausted Soil' : 'Dormancy, Root Congestion, or Low Light',
          ru: has('rootbound') ? 'Тесный горшок и истощённый субстрат' : 'Период покоя, тесные корни или мало света',
          uz: has('rootbound') ? 'Tor tuvak va kuchsizlangan tuproq' : 'Tinchlik davri, siqilgan ildiz yoki kam yorug‘lik',
        },
        confidence: has('rootbound') ? 93 : 84,
        causes: {
          en: ['Roots completely fill the pot with no room for new moisture or nutrients', 'Natural autumn/winter slowdown', 'Insufficient light energy to fuel new leaves'],
          ru: ['Корни полностью заполнили горшок и вытеснили грунт', 'Естественное замедление роста осенью и зимой', 'Недостаток света для формирования новых побегов'],
          uz: ['Ildizlar tuvakni to‘liq egallab olgan, yangi ozuqa qolmagan', 'Kuz-qishdagi tabiiy sekinlashuv', 'Yangi barg chiqarish uchun yorug‘lik yetishmasligi'],
        },
        steps: {
          en: ['Check drainage holes for escaping roots; if crowded, repot 2–5 cm wider in spring.', 'Move closer to bright filtered light.', 'Resume gentle balanced feeding once active spring growth appears.'],
          ru: ['Проверьте дренажные отверстия; если корни выходят наружу, пересадите в горшок на 2–5 см шире.', 'Приблизьте к яркому рассеянному свету.', 'Начните лёгкую подкормку с началом весеннего роста.'],
          uz: ['Tuvak ostidan ildiz chiqqanini tekshiring; siqilgan bo‘lsa bahorda 2–5 sm kengroq tuvakka o‘tkazing.', 'Yorug‘roq tarqoq nurga yaqinlashtiring.', 'Bahorgi o‘sish boshlanganda yengil o‘g‘itlashni tiklang.'],
        },
        prevention: {
          en: 'Avoid jumping more than one pot size at a time so excess soil does not stay wet.',
          ru: 'Не берите горшок «на вырост» слишком большим, чтобы лишний грунт не закисал.',
          uz: 'Tuvakni birdaniga juda katta olmang — ortiqcha tuproqda suv turib qolishi mumkin.',
        },
      };
    }

    case 'leggy': {
      return {
        title: {en: 'Etiolation (Light Deprivation Stretching)', ru: 'Этиоляция (вытягивание от нехватки света)', uz: 'Etiolyatsiya (yorug‘lik yetishmasidan cho‘zilish)'},
        confidence: 95,
        causes: {
          en: ['Plant stretches stems rapidly seeking brighter window photons', 'Too far from windows or blocked by heavy curtains'],
          ru: ['Растение вытягивает побеги в поисках источника света', 'Слишком большое расстояние от окна или плотные шторы'],
          uz: ['O‘simlik quyosh nuri izlab poyasini tez cho‘zmoqda', 'Derazadan juda uzoqda yoki qalin parda ortida turibdi'],
        },
        steps: {
          en: ['Relocate within 1 meter of a bright window (or add a full-spectrum LED grow light).', 'Prune overly leggy vines above a healthy leaf node.', 'Root the pruned cuttings in water and plant back into the pot for fullness.'],
          ru: ['Передвиньте растение в зону до 1 метра от светлого окна или добавьте фитолампу.', 'Обрежьте вытянутые побеги над здоровым узлом.', 'Укорените черенки в воде и подсадите их в тот же горшок для густоты.'],
          uz: ['O‘simlikni yorug‘ derazadan 1 metr masofagacha yaqinlashtiring yoki fitolampa qo‘ying.', 'Cho‘zilgan novdalarni sog‘lom bo‘g‘im ustidan qirqib oling.', 'Qirqilgan qalamchalarni suvda ildizlatib, yana o‘sha tuvakka ekib qalinlashtiring.'],
        },
        prevention: {
          en: 'Turn plants weekly so all sides receive even light exposure.',
          ru: 'Поворачивайте горшок раз в неделю для симметричного развития побегов.',
          uz: 'Barcha tomoni bir tekis o‘sishi uchun tuvakni haftada bir marta aylantirib turing.',
        },
      };
    }
  }
}
