import type {LocalizedText} from '../i18n/types';
import {PLANTS, type Plant} from './plants';

// ── 1. PLANT FINDER QUIZ (7 Questions) ─────────────────────────────────────

export interface FinderOption {
  id: string;
  label: LocalizedText;
  weights: {
    light?: 'low' | 'medium' | 'bright' | 'direct';
    lowMaint?: boolean;
    petSafe?: boolean;
    category?: Plant['category'];
    humidity?: 'low' | 'medium' | 'high';
    difficulty?: Plant['difficulty'];
  };
}

export interface FinderQuestion {
  id: string;
  question: LocalizedText;
  options: FinderOption[];
}

export const FINDER_QUESTIONS: FinderQuestion[] = [
  {
    id: 'light',
    question: {
      en: 'How much natural sunlight reaches your plant spot?',
      ru: 'Сколько естественного света попадает на место для растения?',
      uz: 'O‘simlik qo‘yiladigan joyga qancha tabiiy yorug‘lik tushadi?',
    },
    options: [
      {id: 'dim', label: {en: 'Shady corner or north window', ru: 'Полутень или северное окно', uz: 'Soyali burchak yoki shimoliy deraza'}, weights: {light: 'low'}},
      {id: 'med', label: {en: 'Gentle morning light', ru: 'Мягкий утренний свет', uz: 'Mayin ertalabki yorug‘lik'}, weights: {light: 'medium'}},
      {id: 'bright', label: {en: 'Bright room, no harsh glare', ru: 'Яркий рассеянный свет', uz: 'Yorug‘ xona, tik quyoshsiz'}, weights: {light: 'bright'}},
      {id: 'sun', label: {en: 'Direct sunny windowsill', ru: 'Прямое солнце на подоконнике', uz: 'Quyosh tik tushadigan deraza'}, weights: {light: 'direct'}},
    ],
  },
  {
    id: 'routine',
    question: {
      en: 'How often do you want to check and water your plants?',
      ru: 'Как часто вам удобно ухаживать и поливать растения?',
      uz: 'O‘simliklarni qanchalik tez-tez parvarish qilmoqchisiz?',
    },
    options: [
      {id: 'travel', label: {en: 'Every 2–3 weeks (often busy)', ru: 'Раз в 2–3 недели (часто занят)', uz: 'Har 2–3 haftada (bandman)'}, weights: {lowMaint: true, humidity: 'low'}},
      {id: 'weekly', label: {en: 'Once a week ritual', ru: 'Раз в неделю как ритуал', uz: 'Haftada bir marta odat sifatida'}, weights: {humidity: 'medium'}},
      {id: 'daily', label: {en: 'Every few days (love misting)', ru: 'Каждые 3–5 дней с заботой', uz: 'Har 3–5 kunda mehr bilan'}, weights: {humidity: 'high'}},
    ],
  },
  {
    id: 'pets',
    question: {
      en: 'Do curious cats, dogs, or toddlers nibble leaves at home?',
      ru: 'Есть ли дома любопытные кошки, собаки или малыши?',
      uz: 'Uyda barglarni tishlab ko‘radigan mushuk, it yoki kichkintoylar bormi?',
    },
    options: [
      {id: 'yes', label: {en: 'Yes, must be 100% pet-safe', ru: 'Да, только безопасные растения', uz: 'Ha, faqat xavfsiz turlar kerak'}, weights: {petSafe: true}},
      {id: 'no', label: {en: 'No, or placed out of reach', ru: 'Нет, или будут стоять высоко', uz: 'Yo‘q, yoki baland joyda turadi'}, weights: {}},
    ],
  },
  {
    id: 'experience',
    question: {
      en: 'What is your indoor gardening experience?',
      ru: 'Какой у вас опыт с комнатными растениями?',
      uz: 'Xona o‘simliklari bo‘yicha tajribangiz qanday?',
    },
    options: [
      {id: 'first', label: {en: 'Total beginner—hard to kill please', ru: 'Новичок — нужно самое живучее', uz: 'Yangi boshlovchi — eng chidamlisi kerak'}, weights: {difficulty: 'easy', lowMaint: true}},
      {id: 'some', label: {en: 'Kept a few plants thriving', ru: 'Уже есть несколько успешных растений', uz: 'Bir nechta o‘simlik o‘stirganman'}, weights: {difficulty: 'moderate'}},
      {id: 'pro', label: {en: 'Experienced—ready for rewarding care', ru: 'Опытный — люблю интересные виды', uz: 'Tajribali — nozik turlarga tayyorman'}, weights: {difficulty: 'expert'}},
    ],
  },
  {
    id: 'style',
    question: {
      en: 'Which botanical silhouette inspires your space most?',
      ru: 'Какой силуэт растения лучше подойдёт вашему интерьеру?',
      uz: 'Qanday o‘simlik shakli xonangizga ko‘proq mos keladi?',
    },
    options: [
      {id: 'tropical', label: {en: 'Bold tropical statement leaves', ru: 'Крупные тропические листья', uz: 'Yirik tropik barglar'}, weights: {category: 'tropical'}},
      {id: 'trailing', label: {en: 'Cascading vines for shelves', ru: 'Ампельные лианы для полок', uz: 'Javonlardan osiluvchi lianalar'}, weights: {category: 'trailing'}},
      {id: 'architectural', label: {en: 'Clean upright minimalist blades', ru: 'Строгие вертикальные формы', uz: 'Tik minimalistik barglar'}, weights: {category: 'architectural'}},
      {id: 'flowering', label: {en: 'Blooms & colorful petals', ru: 'Яркие цветы и соцветия', uz: 'Chiroyli gullovchi turlar'}, weights: {category: 'flowering'}},
      {id: 'succulent', label: {en: 'Sculptural desert succulents', ru: 'Суккуленты и кактусы', uz: 'Sukkulent va kaktuslar'}, weights: {category: 'succulent'}},
    ],
  },
  {
    id: 'humidity',
    question: {
      en: 'How does the air feel in that room?',
      ru: 'Какой воздух в вашей комнате?',
      uz: 'Xonangiz havosi qanday?',
    },
    options: [
      {id: 'dry', label: {en: 'Dry (radiators or AC)', ru: 'Сухой (батареи или кондиционер)', uz: 'Quruq (isitgich yoki konditsioner)'}, weights: {humidity: 'low'}},
      {id: 'avg', label: {en: 'Balanced everyday home air', ru: 'Обычный умеренный', uz: 'Oddiy o‘rtacha xona havosi'}, weights: {humidity: 'medium'}},
      {id: 'humid', label: {en: 'Humid bathroom or humidifier', ru: 'Влажный или есть увлажнитель', uz: 'Namli xona yoki namlagich bor'}, weights: {humidity: 'high'}},
    ],
  },
];

export interface FinderMatch {
  plant: Plant;
  percentage: number;
}

export function calculatePlantMatches(answers: Record<string, FinderOption>): FinderMatch[] {
  const scored = PLANTS.map((plant) => {
    let score = 50;
    const ansList = Object.values(answers);

    for (const opt of ansList) {
      const w = opt.weights;
      if (w.light) {
        if (plant.light === w.light) score += 18;
        else if (
          (w.light === 'low' && plant.light === 'medium') ||
          (w.light === 'bright' && plant.light === 'medium') ||
          (w.light === 'direct' && plant.light === 'bright')
        ) {
          score += 7;
        } else if (w.light === 'low' && plant.light === 'direct') {
          score -= 22;
        }
      }
      if (w.lowMaint && plant.lowMaintenance) score += 14;
      if (w.petSafe) {
        if (plant.petSafe) score += 30;
        else score -= 45;
      }
      if (w.category && plant.category === w.category) score += 16;
      if (w.humidity && plant.humidity === w.humidity) score += 10;
      if (w.difficulty) {
        if (plant.difficulty === w.difficulty) score += 10;
        else if (w.difficulty === 'easy' && plant.difficulty === 'expert') score -= 18;
      }
    }

    const percentage = Math.max(58, Math.min(99, Math.round(score)));
    return {plant, percentage};
  });

  return scored.sort((a, b) => b.percentage - a.percentage).slice(0, 3);
}

// ── 2. KNOWLEDGE QUIZZES (4 Categories × 10 Questions = 40 Questions) ──────

export type QuizCategoryId = 'beginner' | 'watering_light' | 'problems' | 'expert';

export interface QuizQuestion {
  id: string;
  question: LocalizedText;
  options: Record<'en' | 'ru' | 'uz', [string, string, string, string]>;
  correctIndex: 0 | 1 | 2 | 3;
  explanation: LocalizedText;
}

export interface QuizCategory {
  id: QuizCategoryId;
  badgeTitle: LocalizedText;
  questions: QuizQuestion[];
}

export const QUIZ_CATEGORIES: QuizCategory[] = [
  {
    id: 'beginner',
    badgeTitle: {en: 'Sprout Scholar', ru: 'Знаток основ', uz: 'Boshlang‘ich bilimdon'},
    questions: [
      {
        id: 'b1',
        question: {
          en: 'What is the #1 most common cause of houseplant death for beginners?',
          ru: 'Какая причина гибели комнатных растений у новичков встречается чаще всего?',
          uz: 'Yangi boshlovchilarda xona o‘simliklari nobud bo‘lishining eng asosiy sababi nima?',
        },
        options: {
          en: ['Overwatering', 'Under-fertilizing', 'Too much fresh air', 'Talking to plants'],
          ru: ['Перелив (избыток воды)', 'Нехватка удобрений', 'Свежий воздух', 'Недостаток горшка'],
          uz: ['Ortiqcha sug‘orish', 'O‘g‘it yetishmasligi', 'Toza havo ko‘pligi', 'Tuvak rangi'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Constantly wet soil starves roots of oxygen and causes root rot far faster than mild drought.',
          ru: 'Постоянно сырой грунт лишает корни кислорода и вызывает гниль намного быстрее лёгкой засухи.',
          uz: 'Doimiy ho‘l tuproq ildizlarni kisloroddan mahrum qilib, tezda chirishga olib keladi.',
        },
      },
      {
        id: 'b2',
        question: {
          en: 'Why do plant pots need drainage holes at the bottom?',
          ru: 'Зачем в дне цветочного горшка нужны дренажные отверстия?',
          uz: 'Nima uchun gul tuvagi tagida drenaj teshiklari bo‘lishi shart?',
        },
        options: {
          en: ['So excess water can escape instead of pooling around roots', 'To let worms enter', 'To cool down the shelf', 'Only for decoration'],
          ru: ['Чтобы лишняя вода уходила и корни не загнивали', 'Для охлаждения полки', 'Чтобы корни росли вверх', 'Только для красоты'],
          uz: ['Ortiqcha suv oqib chiqib, ildiz chirimasligi uchun', 'Javonni sovutish uchun', 'Ildiz tepaga o‘sishi uchun', 'Faqat bezak uchun'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Drainage holes prevent stagnant water pockets at the base of the pot.',
          ru: 'Отверстия не дают воде застаиваться на дне горшка.',
          uz: 'Drenaj teshiklari tuvak tubida suv turib qolishining oldini oladi.',
        },
      },
      {
        id: 'b3',
        question: {
          en: 'Which plant is safe for homes with curious cats and dogs?',
          ru: 'Какое из этих растений полностью безопасно для кошек и собак?',
          uz: 'Quyidagi o‘simliklardan qaysi biri mushuk va itlar uchun xavfsiz?',
        },
        options: {
          en: ['Spider Plant (Chlorophytum)', 'Peace Lily', 'Monstera Deliciosa', 'ZZ Plant'],
          ru: ['Хлорофитум', 'Спатифиллум', 'Монстера', 'Замиокулькас'],
          uz: ['Xlorofitum', 'Spatifillum', 'Monstera', 'Zamiokulkas'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Spider Plants, Calatheas, Money Trees, and Boston Ferns are non-toxic to pets.',
          ru: 'Хлорофитум, калатея, пахира и нефролепис нетоксичны для животных.',
          uz: 'Xlorofitum, kalateya, paxira va qirqquloq uy hayvonlari uchun zaharsizdir.',
        },
      },
      {
        id: 'b4',
        question: {
          en: 'How should you decide when to water most tropical houseplants?',
          ru: 'Как правильнее всего определять, пора ли поливать тропическое растение?',
          uz: 'Ko‘pchilik tropik o‘simliklarni sug‘orish vaqtini qanday aniqlash eng to‘g‘ri?',
        },
        options: {
          en: ['Feel soil moisture 3–5 cm deep with your finger', 'Water every Monday no matter what', 'Mist the leaves instead of watering', 'Wait until all leaves fall'],
          ru: ['Проверить влажность пальцем на глубине 3–5 см', 'Поливать строго каждый понедельник', 'Только опрыскивать листья', 'Ждать опадения листьев'],
          uz: ['Barmoq bilan 3–5 sm chuqurlikdagi namlikni tekshirish', 'Har dushanba shartli ravishda quyish', 'Faqat barglarga suv sepish', 'Barglar to‘kilishini kutish'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Season, light, and temperature change drying speeds—always check the soil rather than the calendar alone.',
          ru: 'Скорость высыхания меняется от сезона и света, поэтому проверяйте сам грунт.',
          uz: 'Qurish tezligi fasl va haroratga bog‘liq, shuning uchun doim tuproqni tekshiring.',
        },
      },
      {
        id: 'b5',
        question: {
          en: 'What does "bright indirect light" mean?',
          ru: 'Что означает понятие «яркий рассеянный свет»?',
          uz: '«Yorug‘ tarqoq nur» tushunchasi nimani anglatadi?',
        },
        options: {
          en: ['Abundant daylight without scorching midday sun rays directly on leaves', 'Pitch-dark closet', 'Only candlelight', 'Harsh outdoor noon sun'],
          ru: ['Много дневного света без прямых палящих лучей на листьях', 'Тёмный угол без окон', 'Только свет свечи', 'Прямое полуденное солнце'],
          uz: ['Barglarga tik kuydiruvchi quyosh tushmaydigan yorug‘ kunduzgi nur', 'Derazasiz qorong‘i burchak', 'Faqat tungi chiroq', 'Tushki jazirama quyosh'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Spot near a bright window filtered by a sheer curtain or just outside the direct sunbeam.',
          ru: 'Место у светлого окна, притенённое тюлем или чуть в стороне от прямых лучей.',
          uz: 'Yorug‘ deraza yonida yupqa parda ortidagi yoki tik nur chetidagi joy.',
        },
      },
      {
        id: 'b6',
        question: {
          en: 'Why is wiping dust off large houseplant leaves helpful?',
          ru: 'Зачем протирать пыль с крупных листьев растений?',
          uz: 'Yirik barglardagi changni artib turish nima uchun foydali?',
        },
        options: {
          en: ['Dust blocks sunlight and clogs leaf pores needed for photosynthesis', 'It makes roots turn blue', 'Dust feeds roots', 'It stops growth'],
          ru: ['Пыль мешает свету и дыханию листьев при фотосинтезе', 'Делает корни синими', 'Заменяет удобрения', 'Останавливает рост'],
          uz: ['Chang quyosh nurini to‘sib, fotosintez va nafas olishni qiyinlashtiradi', 'Ildizni ko‘kartiradi', 'O‘g‘it o‘rnini bosadi', 'O‘sishni to‘xtatadi'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Clean leaves absorb noticeably more light energy and deter dust-loving spider mites.',
          ru: 'Чистые листья поглощают больше света и реже привлекают паутинного клеща.',
          uz: 'Toza barglar yorug‘likni yaxshiroq yutadi va o‘rgimchakkana tushishini kamaytiradi.',
        },
      },
      {
        id: 'b7',
        question: {
          en: 'When repotting, how much wider should the new pot be?',
          ru: 'Насколько шире должен быть новый горшок при пересадке?',
          uz: 'Ko‘chirib o‘tqazganda yangi tuvak eskisidan qancha kengroq bo‘lishi kerak?',
        },
        options: {
          en: ['2–5 cm wider in diameter', '30 cm wider immediately', 'Smaller than the roots', 'No pot needed'],
          ru: ['На 2–5 см больше в диаметре', 'Сразу на 30 см шире', 'Меньше старого', 'Вдвое ниже'],
          uz: ['Diametri 2–5 sm kengroq', 'Birdaniga 30 sm kengroq', 'Eskisidan kichikroq', 'Farqi yo‘q'],
        },
        correctIndex: 0,
        explanation: {
          en: 'An oversized pot holds excess wet soil around small roots, raising rot risk.',
          ru: 'Слишком большой горшок долго остаётся мокрым по краям, вызывая закисание почвы.',
          uz: 'Haddan tashqari katta tuvakda ortiqcha tuproq uzoq ho‘l turib, ildizni chiritishi mumkin.',
        },
      },
      {
        id: 'b8',
        question: {
          en: 'Which season is best for repotting and propagating most houseplants?',
          ru: 'Какое время года лучше всего подходит для пересадки и размножения?',
          uz: 'O‘simliklarni ko‘chirish va ko‘paytirish uchun eng qulay fasl qaysi?',
        },
        options: {
          en: ['Spring and early summer', 'Mid-winter frost', 'Late November', 'During severe heatwaves only'],
          ru: ['Весна и начало лета', 'Разгар зимы', 'Поздняя осень', 'Только в сильную жару'],
          uz: ['Bahor va yoz boshi', 'Qish o‘rtasi', 'Kech kuz', 'Faqat jazirama chilla'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Increasing daylight triggers active root and shoot growth in spring.',
          ru: 'Весной удлиняется световой день и растения быстрее восстанавливают корни.',
          uz: 'Bahorda kun uzayishi bilan ildiz va novdalar faol tiklanadi.',
        },
      },
      {
        id: 'b9',
        question: {
          en: 'What is a Snake Plant famous for doing at night?',
          ru: 'Чем знаменита сансевиерия в ночное время?',
          uz: 'Sansevyeriya kechasi qanday xususiyati bilan mashhur?',
        },
        options: {
          en: ['Releasing oxygen via CAM photosynthesis', 'Blooming every midnight', 'Dropping all leaves', 'Turning bright purple'],
          ru: ['Выделяет кислород ночью благодаря CAM-фотосинтезу', 'Цветёт каждую полночь', 'Сбрасывает листья', 'Меняет цвет на синий'],
          uz: ['CAM-fotosintez orqali kechasi kislorod chiqarishi bilan', 'Har yarim tunda gullashi bilan', 'Barg to‘kishi bilan', 'Ko‘karishi bilan'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Succulents like Sansevieria open stomata at night to conserve water while releasing oxygen.',
          ru: 'Суккуленты открывают устьица ночью для экономии влаги и выделения кислорода.',
          uz: 'Sukkulentlar suvni tejash uchun tunda og‘izchalarini ochib kislorod chiqaradi.',
        },
      },
      {
        id: 'b10',
        question: {
          en: 'What is the golden rule when bringing a new plant home from a shop?',
          ru: 'Какое главное правило при покупке нового растения в магазине?',
          uz: 'Do‘kondan yangi o‘simlik olib kelganda eng muhim qoida nima?',
        },
        options: {
          en: ['Quarantine it apart from other plants for 14 days to check for pests', 'Fertilize heavily on day one', 'Put it in a dark closet', 'Trim off all roots'],
          ru: ['Держать на карантине 14 дней отдельно от других растений', 'Сразу обильно удобрить', 'Поставить в темноту', 'Обрезать все корни'],
          uz: ['Zararkunandalar yo‘qligini tekshirish uchun 14 kun alohida karantinda saqlash', 'Birinchi kunoq ko‘p o‘g‘itlash', 'Qorong‘i shkafga qo‘yish', 'Ildizlarni qirqish'],
        },
        correctIndex: 0,
        explanation: {
          en: 'A 2-week quarantine stops hidden pests from spreading to your entire indoor jungle.',
          ru: 'Двухнедельный карантин защищает всю коллекцию от скрытых вредителей.',
          uz: 'Ikki haftalik karantin yashirin zararkunandalarning boshqa o‘simliklarga o‘tishini to‘sadi.',
        },
      },
    ],
  },
  {
    id: 'watering_light',
    badgeTitle: {en: 'Sun & Hydro Master', ru: 'Мастер света и воды', uz: 'Quyosh va suv ustasi'},
    questions: [
      {
        id: 'wl1',
        question: {
          en: 'Which window direction typically provides the strongest direct sunlight in the Northern Hemisphere?',
          ru: 'Окна какой стороны света в Северном полушарии дают больше всего прямого солнца?',
          uz: 'Shimoliy yarimsharda qaysi tomondagi deraza eng ko‘p quyosh nuri beradi?',
        },
        options: {
          en: ['South-facing', 'North-facing', 'Windowless hallway', 'Underground basement'],
          ru: ['Южные окна', 'Северные окна', 'Тёмный коридор', 'Подвал'],
          uz: ['Janubiy deraza', 'Shimoliy deraza', 'Yo‘lak', 'Yerto‘la'],
        },
        correctIndex: 0,
        explanation: {
          en: 'South-facing windows receive sun across the majority of the day.',
          ru: 'Южные окна освещаются солнцем большую часть дня.',
          uz: 'Janubiy derazalar kunning katta qismida quyosh nuri oladi.',
        },
      },
      {
        id: 'wl2',
        question: {
          en: 'What happens to light intensity when you move a plant from 0.5 m to 2.5 m away from a window?',
          ru: 'Как меняется освещённость при удалении растения от окна с 0.5 м до 2.5 м?',
          uz: 'O‘simlikni derazadan 0.5 m dan 2.5 m uzoqroqqa surganda yorug‘lik qanday o‘zgaradi?',
        },
        options: {
          en: ['It drops dramatically (inverse square law—over 75% darker)', 'It stays exactly the same', 'It doubles', 'It turns ultraviolet'],
          ru: ['Резко падает более чем на 75%', 'Остаётся прежней', 'Увеличивается вдвое', 'Становится ярче'],
          uz: ['Keskin kamayadi (75% dan ko‘proq xiralashadi)', 'O‘zgarmaydi', 'Ikki barobar oshadi', 'Ultrabinafshaga aylanadi'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Even two meters inside a room, usable plant light drops sharply compared to the sill.',
          ru: 'Уже в двух метрах от окна интенсивность фотосинтетического света падает в разы.',
          uz: 'Derazadan ikki metr ichkarida ham o‘simlik uchun foydali yorug‘lik keskin kamayadi.',
        },
      },
      {
        id: 'wl3',
        question: {
          en: 'Why do Peace Lilies and Spider Plants often get brown tips from tap water?',
          ru: 'Почему у спатифиллума и хлорофитума сохнут кончики от воды из-под крана?',
          uz: 'Nima uchun spatifillum va xlorofitumning barg uchlari jo‘mrak suvidan quriydi?',
        },
        options: {
          en: ['Sensitivity to fluoride, chlorine, and dissolved mineral salts', 'Tap water has too much oxygen', 'Water is too soft', 'Tap water freezes at 20°C'],
          ru: ['Чувствительность к фтору, хлору и солям жёсткости', 'Избыток кислорода в воде', 'Вода слишком мягкая', 'Слишком низкая плотность'],
          uz: ['Ftor, xlor va tuzlarga sezgirlik tufayli', 'Kislorod ko‘pligidan', 'Suv juda yumshoqligidan', 'Zichligi pastligidan'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Using filtered or rainwater eliminates mineral salt accumulation at leaf tips.',
          ru: 'Фильтрованная или дождевая вода предотвращает накопление солей на кончиках.',
          uz: 'Filtrlangan yoki yomg‘ir suvi barg uchlarida tuz yig‘ilishining oldini oladi.',
        },
      },
      {
        id: 'wl4',
        question: {
          en: 'What is "bottom watering"?',
          ru: 'Что такое «нижний полив»?',
          uz: '«Pastdan sug‘orish» usuli qanday ishlaydi?',
        },
        options: {
          en: ['Setting the pot in a tray of water so soil wicks moisture upward through drainage holes', 'Spraying the ceiling', 'Pouring ice on top', 'Watering only the saucer without drainage holes'],
          ru: ['Постановка горшка в ёмкость с водой для пропитки через дренажные отверстия', 'Опрыскивание листьев снизу', 'Полив кубиками льда', 'Пролив сверху кипятком'],
          uz: ['Tuvakni suvli idishga qo‘yib, namlikni drenaj teshiklari orqali shimdirish', 'Shiftga suv sepish', 'Ustiga muz qo‘yish', 'Barg ostini yuvish'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Bottom watering rehydrates dry peat evenly and discourages fungus gnats at the surface.',
          ru: 'Нижний полив равномерно пропитывает ком и оставляет верхний слой сухим от мошек.',
          uz: 'Pastdan sug‘orish tuproqni tekis to‘yintiradi va ustki qatlamda chivin ko‘payishini kamaytiradi.',
        },
      },
      {
        id: 'wl5',
        question: {
          en: 'How does watering frequency change during winter for most indoor plants?',
          ru: 'Как меняется частота полива большинства растений зимой?',
          uz: 'Qishda ko‘pchilik xona o‘simliklarini sug‘orish tezligi qanday o‘zgaradi?',
        },
        options: {
          en: ['Water less often because shorter days slow growth and evaporation', 'Water three times more often', 'Keep soil soaking wet daily', 'Only water with sparkling water'],
          ru: ['Поливают реже, так как короткий день замедляет рост', 'Поливают в 3 раза чаще', 'Держат грунт мокрым каждый день', 'Поливают только газировкой'],
          uz: ['Kamroq sug‘oriladi, chunki qisqa kunlarda o‘sish va bug‘lanish sekinlashadi', 'Uch barobar ko‘proq sug‘oriladi', 'Har kuni botqoq qilinadi', 'Gazli suv quyiladi'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Low winter sun means plants consume far less water.',
          ru: 'Зимой растения потребляют заметно меньше воды из-за дефицита света.',
          uz: 'Qishki kam quyoshda o‘simliklar suvni ancha kam sarflaydi.',
        },
      },
      {
        id: 'wl6',
        question: {
          en: 'Why do people use terracotta pots for cacti and succulents?',
          ru: 'Почему для кактусов и суккулентов часто выбирают терракотовые горшки?',
          uz: 'Nima uchun kaktus va sukkulentlar ko‘pincha sirlanmagan sopol tuvakka ekiladi?',
        },
        options: {
          en: ['Porous clay walls let moisture evaporate sideways, preventing soggy roots', 'Terracotta melts in winter', 'Plastic blocks sunlight from roots', 'Terracotta creates water'],
          ru: ['Пористая глина испаряет лишнюю влагу через стенки, защищая корни', 'Глина вырабатывает воду', 'Пластик притягивает мороз', 'Терракота легче бумаги'],
          uz: ['G‘ovak sopol devorlari ortiqcha namni bug‘latib, ildizni chirishdan asraydi', 'Sopol suv ishlab chiqaradi', 'Plastik sovuq tortadi', 'Faqat og‘irligi uchun'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Unglazed clay breathes and dries soil significantly faster than plastic or glazed ceramic.',
          ru: 'Неглазурованная глина дышит и ускоряет просыхание субстрата.',
          uz: 'Sirlanmagan loy havo o‘tkazadi va tuproqni plastikdan tezroq quritadi.',
        },
      },
      {
        id: 'wl7',
        question: {
          en: 'Which watering temperature is gentlest on tropical plant roots?',
          ru: 'Вода какой температуры безопаснее всего для корней тропических растений?',
          uz: 'Tropik o‘simlik ildizlari uchun qanday haroratdagi suv eng ma’qul?',
        },
        options: {
          en: ['Room temperature (around 20–24°C)', 'Ice-cold straight from freezer', 'Boiling hot', '0°C'],
          ru: ['Комнатная температура (около 20–24°C)', 'Ледяная из морозилки', 'Кипяток', '0°C'],
          uz: ['Xona haroratidagi iliq suv (20–24°C)', 'Muzdek sovuq suv', 'Qaynoq suv', '0°C'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Cold water shocks delicate root hairs and can cause yellow spots on African violets and tropicals.',
          ru: 'Холодная вода вызывает температурный шок у нежных корней.',
          uz: 'Sovuq suv nozik ildiz tukchalarini shokka solib, barglarda dog‘ qoldirishi mumkin.',
        },
      },
      {
        id: 'wl8',
        question: {
          en: 'Why shouldn’t you water Moth Orchids with ice cubes?',
          ru: 'Почему орхидеи фаленопсис нельзя поливать кубиками льда?',
          uz: 'Nima uchun falenopsis orxideyasini muz bo‘laklari bilan sug‘orish tavsiya etilmaydi?',
        },
        options: {
          en: ['They are tropical plants whose roots suffer cold tissue damage from 0°C ice', 'Ice evaporates instantly', 'Orchids eat snow', 'Ice turns bark purple'],
          ru: ['Это тропические растения, и лёд 0°C обжигает их корни холодом', 'Лёд мгновенно закипает', 'Кора становится фиолетовой', 'Лёд блокирует свет'],
          uz: ['Ular tropik o‘simlik bo‘lib, 0°C muz ildiz to‘qimasini sovuqdan shikastlaydi', 'Muz darhol bug‘lanadi', 'Po‘stloq qorayadi', 'Nur o‘tmay qoladi'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Soak bark roots briefly in room-temperature water and drain thoroughly instead.',
          ru: 'Лучше погрузить горшок на 10 минут в воду комнатной температуры и дать ей стечь.',
          uz: 'Buning o‘rniga xona haroratidagi suvga 10 daqiqa botirib, to‘liq oqizib yuboring.',
        },
      },
      {
        id: 'wl9',
        question: {
          en: 'What is "guttation" on Monstera or Pothos leaf tips after watering?',
          ru: 'Что такое «гуттация» на кончиках листьев монстеры после полива?',
          uz: 'Sug‘orishdan keyin monstera bargi uchida tomchi paydo bo‘lishi (guttatsiya) nima?',
        },
        options: {
          en: ['Harmless excretion of excess water pressure through leaf pores', 'Toxic pest venom', 'Sign the plant is dying', 'Mold growth'],
          ru: ['Безобидный сброс лишней влаги растением через устьица', 'Яд вредителей', 'Признак гибели растения', 'Плесень'],
          uz: ['O‘simlik ortiqcha suv bosimini barg teshikchalari orqali chiqarishi (zararsiz)', 'Zararkunanda zahari', 'O‘simlik qurish belgisi', 'Mog‘or'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Root pressure pushes tiny drops out of hydathodes—it simply shows the plant is well hydrated.',
          ru: 'Корневое давление выталкивает капельки воды — это естественный процесс после обильного полива.',
          uz: 'Ildiz bosimi ortiqcha tomchilarni chiqaradi — bu o‘simlik suvga to‘yinganining tabiiy belgisi.',
        },
      },
      {
        id: 'wl10',
        question: {
          en: 'What happens if a variegated plant (with white/gold patterns) gets too little light?',
          ru: 'Что происходит с пестролистным растением при нехватке света?',
          uz: 'Ola-bula (oq yoki oltin naqshli) o‘simlikka yorug‘lik yetishmasa nima bo‘ladi?',
        },
        options: {
          en: ['New leaves revert to solid dark green to maximize chlorophyll', 'Leaves turn neon pink', 'It grows twice as fast', 'Roots turn white'],
          ru: ['Новые листья становятся чисто зелёными для увеличения хлорофилла', 'Листья становятся розовыми', 'Рост ускоряется вдвое', 'Корни белеют'],
          uz: ['Yangi barglar ko‘proq xlorofill yig‘ish uchun oddiy yashil tusga qaytadi', 'Barglar pushti bo‘ladi', 'Tezroq o‘sadi', 'Ildiz oqaradi'],
        },
        correctIndex: 0,
        explanation: {
          en: 'White variegation lacks chlorophyll, so in shade the plant produces solid green leaves to survive.',
          ru: 'Белые участки не содержат хлорофилла, поэтому в тени растение переходит на зелёные листья.',
          uz: 'Oq qismlarda xlorofill bo‘lmagani uchun soya joyda o‘simlik yashil barg chiqarishga o‘tadi.',
        },
      },
    ],
  },
  {
    id: 'problems',
    badgeTitle: {en: 'Botanical Medic', ru: 'Диагност растений', uz: 'O‘simlik shifokori'},
    questions: [
      {
        id: 'p1',
        question: {
          en: 'Fine silky webbing under leaves plus tiny stippled yellow dots indicates which pest?',
          ru: 'Тонкая паутинка под листьями и мелкие светлые точки указывают на какого вредителя?',
          uz: 'Barg ostidagi yupqa to‘r va mayda sarg‘ish nuqtalar qaysi zararkunandadan darak beradi?',
        },
        options: {
          en: ['Spider mites', 'Earthworms', 'Ladybugs', 'Fungus gnats'],
          ru: ['Паутинный клещ', 'Дождевые черви', 'Божья коровка', 'Грибной комарик'],
          uz: ['O‘rgimchakkana', 'Yomg‘ir chuvalchangi', 'Xonqizi', 'Qo‘ziqorin chivini'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Spider mites thrive in warm dry air; rinse leaves and increase humidity.',
          ru: 'Паутинный клещ размножается в сухом тёплом воздухе; помогает душ и повышение влажности.',
          uz: 'O‘rgimchakkana issiq va quruq havoda ko‘payadi; barglarni yuvish va namlikni oshirish yordam beradi.',
        },
      },
      {
        id: 'p2',
        question: {
          en: 'What do white, fuzzy, cotton-like clusters tucked into stem nodes indicate?',
          ru: 'О чём говорят белые пушистые комочки, похожие на вату в пазухах листьев?',
          uz: 'Poya bo‘g‘imlaridagi oq paxtasimon momiq to‘plamlar nimani anglatadi?',
        },
        options: {
          en: ['Mealybugs', 'Perlite dust', 'Healthy pollen', 'Root hairs'],
          ru: ['Мучнистый червец', 'Пыль перлита', 'Пыльца', 'Корневые волоски'],
          uz: ['Unli qurt (muchnistiy chervets)', 'Perlit changi', 'Gul changi', 'Ildiz tukchalari'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Dab mealybugs directly with a 70% rubbing-alcohol swab and follow up with insecticidal soap.',
          ru: 'Удалите червецов ватной палочкой со спиртом и обработайте мыльным или масляным спреем.',
          uz: 'Ularni 70% spirtli paxta tayoqcha bilan artib oling va sovunli eritma seping.',
        },
      },
      {
        id: 'p3',
        question: {
          en: 'Tiny black flies hovering around moist potting soil are usually:',
          ru: 'Мелкие чёрные мушки над влажной землёй в горшке — это обычно:',
          uz: 'Nam tuproq ustida uchib yuradigan mayda qora pashshalar odatda nima?',
        },
        options: {
          en: ['Fungus gnats', 'Bees', 'Mosquitoes', 'Cicadas'],
          ru: ['Грибные комарики (сциариды)', 'Пчёлы', 'Комары', 'Цикады'],
          uz: ['Qo‘ziqorin chivinlari (stsiarida)', 'Asalarilar', 'Chivinlar', 'Chigirtkalar'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Allow the top 3–4 cm of soil to dry out and use sticky traps or bottom watering.',
          ru: 'Дайте верхним 3–4 см грунта просохнуть и используйте жёлтые липкие ловушки.',
          uz: 'Tuproqning ustki 3–4 sm qismini quriting va sariq yopishqoq tuzoqlardan foydalaning.',
        },
      },
      {
        id: 'p4',
        question: {
          en: 'What do healthy plant roots look and smell like?',
          ru: 'Как выглядят и пахнут здоровые корни растения?',
          uz: 'Sog‘lom o‘simlik ildizlari qanday ko‘rinishga va hidga ega bo‘ladi?',
        },
        options: {
          en: ['Firm, white or tan, with a fresh earthy scent', 'Black, slimy, with a sour smell', 'Bright neon orange', 'Hollow and brittle dust'],
          ru: ['Упругие, светлые, со свежим запахом земли', 'Чёрные, склизкие, с кислым запахом', 'Неоново-оранжевые', 'Сухие трухлявые'],
          uz: ['Qattiq, oqish yoki sarg‘ish, yangi tuproq hidli', 'Qora, shilimshiq va nordon hidli', 'Yorqin olovrang', 'Bo‘sh va uvalanuvchi'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Mushy, dark, foul-smelling roots indicate root rot and should be trimmed off.',
          ru: 'Тёмные скользкие корни с неприятным запахом — признак гнили, их нужно обрезать.',
          uz: 'Qora, shilimshiq va badbo‘y ildizlar chirish belgisi bo‘lib, ularni kesib tashlash kerak.',
        },
      },
      {
        id: 'p5',
        question: {
          en: 'Why would a Fiddle Leaf Fig suddenly drop healthy-looking green leaves?',
          ru: 'Почему фикус лировидный может внезапно сбросить зелёные на вид листья?',
          uz: 'Nima uchun lirasimon fikus birdaniga sog‘lom ko‘ringan yashil barglarini to‘kishi mumkin?',
        },
        options: {
          en: ['Environmental shock from moving spots or cold drafts', 'Too much happiness', 'Excess oxygen', 'Clean pot rim'],
          ru: ['Стресс от перестановки или холодного сквозняка', 'Избыток кислорода', 'Чистый край горшка', 'Тишина в комнате'],
          uz: ['Joyini o‘zgartirish yoki sovuq yelvizakdan tushgan stress', 'Kislorod ko‘pligidan', 'Toza tuvakdan', 'Xona sokinligidan'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Ficus trees hate sudden shifts in light direction or cold air currents.',
          ru: 'Фикусы чувствительны к резкой смене освещения и потокам холодного воздуха.',
          uz: 'Fikuslar yorug‘lik yo‘nalishi va haroratning keskin o‘zgarishini yoqtirmaydi.',
        },
      },
      {
        id: 'p6',
        question: {
          en: 'What causes stems to stretch long and skinny with tiny leaves?',
          ru: 'Отчего стебли вытягиваются длинными и тонкими с мелкими листьями?',
          uz: 'Poyalarning ingichka cho‘zilib, barglarining maydalashib qolishiga nima sabab bo‘ladi?',
        },
        options: {
          en: ['Etiolation from insufficient light', 'Too much calcium', 'Pot is too clean', 'High humidity'],
          ru: ['Этиоляция из-за нехватки света', 'Избыток кальция', 'Слишком чистый горшок', 'Высокая влажность'],
          uz: ['Yorug‘lik yetishmasligi (etiolyatsiya)', 'Kalsiy ko‘pligi', 'Tuvak tozaligi', 'Yuqori namlik'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Plants elongate stems when searching for stronger light; move closer to a window or use a grow light.',
          ru: 'Растение тянется в поисках света; переставьте его ближе к окну или под фитолампу.',
          uz: 'O‘simlik yorug‘lik izlab cho‘ziladi; derazaga yaqinlashtiring yoki fitolampa o‘rnating.',
        },
      },
      {
        id: 'p7',
        question: {
          en: 'What is white powdery fuzz coating Begonia leaves in cool stagnant rooms?',
          ru: 'Что за белый мучнистый налёт появляется на листьях бегонии в прохладном застойном воздухе?',
          uz: 'Salqin va dim xonada begoniya barglarida paydo bo‘ladigan oq unsimon g‘ubor nima?',
        },
        options: {
          en: ['Powdery mildew fungal infection', 'Natural leaf sugar', 'Dust from ceiling', 'Spider silk'],
          ru: ['Грибковая инфекция — мучнистая роса', 'Природный сахар', 'Пыль с потолка', 'Паутина'],
          uz: ['Zamburug‘li kasallik — oq shudring (muchnistaya rosa)', 'Tabiiy shakar', 'Shift changi', 'O‘rgimchak ipi'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Keep begonia leaves dry and improve gentle airflow to prevent powdery mildew.',
          ru: 'Не мочите листья бегонии и обеспечьте лёгкую циркуляцию воздуха.',
          uz: 'Begoniya barglarini ho‘llamang va xonada yengil havo aylanishini ta’minlang.',
        },
      },
      {
        id: 'p8',
        question: {
          en: 'A white crust on top of soil and terracotta rims is usually:',
          ru: 'Белая корка на поверхности грунта и стенках терракотового горшка — это обычно:',
          uz: 'Tuproq usti va sopol tuvak chetidagi oq qatlam odatda nimadan hosil bo‘ladi?',
        },
        options: {
          en: ['Mineral salt deposits from tap water and fertilizer', 'Snowflakes', 'Root frost', 'Paint'],
          ru: ['Солевые отложения из жёсткой воды и удобрений', 'Снежинки', 'Иней на корнях', 'Краска'],
          uz: ['Qattiq suv va o‘g‘itlardan qolgan mineral tuz qoldiqlari', 'Qor uchquni', 'Ildiz muzi', 'Bo‘yoq'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Scrape off the crust gently and flush the pot with filtered water.',
          ru: 'Аккуратно снимите корку и пролейте грунт мягкой фильтрованной водой.',
          uz: 'Oq qatlamni ehtiyotkorlik bilan olib tashlang va tuvakni filtrlangan suv bilan chaying.',
        },
      },
      {
        id: 'p9',
        question: {
          en: 'If a Peace Lily droops dramatically but its soil is bone dry, what happens after watering?',
          ru: 'Что произойдёт со спатифиллумом, поникшим от сухой земли, после полива?',
          uz: 'Tuprog‘i quruqligidan osilib qolgan spatifillum sug‘orilgandan so‘ng qanday o‘zgaradi?',
        },
        options: {
          en: ['It perks back upright within a few hours', 'It stays flat forever', 'It turns into a cactus', 'It blooms instantly in 1 minute'],
          ru: ['Он поднимет листья обратно за несколько часов', 'Он больше никогда не встанет', 'Превратится в кактус', 'Зацветёт за минуту'],
          uz: ['Bir necha soat ichida barglari yana tiklanib qad ko‘taradi', 'Umuman tiklanmaydi', 'Kaktusga aylanadi', 'Bir daqiqada gullaydi'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Peace Lilies are famous "drama queens" that recover rapidly once root turgor pressure returns.',
          ru: 'Спатифиллум быстро восстанавливает тургор и расправляет листья после своевременного полива.',
          uz: 'Spatifillum suv ichgach hujayra bosimi tiklanishi bilan tezda o‘ziga keladi.',
        },
      },
      {
        id: 'p10',
        question: {
          en: 'Should you fertilize a stressed, wilted, or freshly repotted plant immediately?',
          ru: 'Стоит ли сразу удобрять ослабленное или только что пересаженное растение?',
          uz: 'Stressdagi, so‘ligan yoki endigina ko‘chirilgan o‘simlikni darhol o‘g‘itlash kerakmi?',
        },
        options: {
          en: ['No—wait 4–6 weeks so fertilizer salts do not burn stressed roots', 'Yes, double the dose', 'Pour pure concentrate', 'Only with coffee grounds'],
          ru: ['Нет — подождите 4–6 недель, чтобы не обжечь ослабленные корни', 'Да, в двойной дозе', 'Полейте чистым концентратом', 'Только кофейной гущей'],
          uz: ['Yo‘q — stressdagi ildizlar kuymasligi uchun 4–6 hafta kuting', 'Ha, ikki barobar ko‘p bering', 'Toza konsentrat quying', 'Faqat qahva quyqasi soling'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Fresh potting soil already contains nutrients, and damaged roots cannot absorb high salts.',
          ru: 'В свежем грунте уже есть питание, а травмированные корни легко обжечь солями.',
          uz: 'Yangi tuproqda ozuqa yetarli, shikastlangan ildizlar esa tuzdan kuyishi mumkin.',
        },
      },
    ],
  },
  {
    id: 'expert',
    badgeTitle: {en: 'Master Botanist', ru: 'Мастер-ботаник', uz: 'Bosh botanik'},
    questions: [
      {
        id: 'e1',
        question: {
          en: 'Which anatomical structure on a trailing Pothos or Monstera stem MUST be present for a cutting to grow roots?',
          ru: 'Какая часть стебля обязательно должна быть на черенке монстеры или эпипремнума для укоренения?',
          uz: 'Potos yoki monstera qalamchasi ildiz otishi uchun poyada albatta qaysi qism bo‘lishi shart?',
        },
        options: {
          en: ['A node (swollen bump where leaf & aerial root meet)', 'Just a leaf blade without stem', 'Only a flower petal', 'Dead brown husk'],
          ru: ['Узел (место крепления листа и воздушного корня)', 'Только листовая пластинка без стебля', 'Лепесток цветка', 'Сухая чешуйка'],
          uz: ['Bo‘g‘im (barg va havo ildizi chiqadigan tugun joy)', 'Poyasiz faqat barg', 'Gulbarg', 'Quruq po‘stloq'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Nodes contain undifferentiated meristem cells capable of producing new roots and shoots.',
          ru: 'Именно в узле находятся клетки меристемы, способные формировать корни и новый побег.',
          uz: 'Aynan bo‘g‘imda yangi ildiz va novda hosil qila oladigan meristema hujayralari joylashgan.',
        },
      },
      {
        id: 'e2',
        question: {
          en: 'Why is coarse pine bark and perlite added to soil for Aroids (Monstera, Philodendron, Anthurium)?',
          ru: 'Зачем в грунт для ароидных добавляют сосновую кору и перлит?',
          uz: 'Nima uchun aroidlar (monstera, filodendron, anturium) tuprog‘iga qarag‘ay po‘stlog‘i va perlit qo‘shiladi?',
        },
        options: {
          en: ['To create air pockets around epiphytic roots and prevent compaction', 'To turn soil alkaline', 'To seal out oxygen', 'To hold standing mud'],
          ru: ['Чтобы создать воздушные карманы вокруг корней и исключить слёживание', 'Чтобы убрать кислород', 'Для утяжеления горшка', 'Чтобы задерживать болото'],
          uz: ['Ildizlar atrofida havo bo‘shliqlari yaratish va tuproq zichlanishining oldini olish uchun', 'Kislorodni to‘sish uchun', 'Tuproqni og‘irlashtirish uchun', 'Loyqa hosil qilish uchun'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Many aroids are hemiepiphytes accustomed to chunky forest litter with rapid airflow.',
          ru: 'Многие ароидные — полуэпифиты, чьи корни привыкли к рыхлой лесной подстилке и воздуху.',
          uz: 'Ko‘pgina aroidlar yarim epifit bo‘lib, ildizlari havo o‘tuvchi g‘ovak muhitga moslashgan.',
        },
      },
      {
        id: 'e3',
        question: {
          en: 'What botanical term describes the daily evening folding of Calathea and Maranta leaves?',
          ru: 'Каким термином называется ежедневное вечернее поднимание листьев у калатеи и маранты?',
          uz: 'Kalateya va maranta barglarining har kecha yuqoriga ko‘tarilish hodisasi nima deb ataladi?',
        },
        options: {
          en: ['Nyctinasty', 'Vernalization', 'Stratification', 'Grafting'],
          ru: ['Никтинастия', 'Стратификация', 'Прививка', 'Яровизация'],
          uz: ['Niktinastiya', 'Stratifikatsiya', 'Payvandlash', 'Yarovizatsiya'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Nyctinasty is a circadian rhythm driven by turgor shifts in the pulvinus joint.',
          ru: 'Никтинастия — это суточный ритм, управляемый изменением тургора в сочленении черешка.',
          uz: 'Niktinastiya — barg bandidagi pulvinus bo‘g‘imida suv bosimi o‘zgarishiga asoslangan sutkalik ritm.',
        },
      },
      {
        id: 'e4',
        question: {
          en: 'What is "velamen" on Moth Orchid (Phalaenopsis) aerial roots?',
          ru: 'Что такое «веламен» на воздушных корнях орхидеи фаленопсис?',
          uz: 'Falenopsis orxideyasining havo ildizlaridagi «velamen» nima?',
        },
        options: {
          en: ['A spongy silver outer layer that rapidly absorbs ambient moisture and protects the root core', 'A fungal disease', 'Dead bark', 'A toxic spine'],
          ru: ['Губчатый серебристый слой, быстро впитывающий влагу и защищающий корень', 'Грибковое поражение', 'Сухая кора', 'Шип'],
          uz: ['Havodagi namlikni tez shimib oluvchi va ildiz o‘zagini himoyalovchi g‘ovak kumush qatlam', 'Zamburug‘ kasalligi', 'Quruq po‘stloq', 'Tikan'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Velamen turns silvery when dry and vibrant green once saturated—an instant built-in watering gauge!',
          ru: 'Веламен серебристый в сухом состоянии и ярко-зелёный после полива — природный индикатор влаги.',
          uz: 'Velamen quriganda kumushrang, suvga to‘yganda esa yashil rangga kiradi — tabiiy namlik ko‘rsatkichi.',
        },
      },
      {
        id: 'e5',
        question: {
          en: 'What does "N-P-K" stand for on houseplant fertilizer labels?',
          ru: 'Что обозначают буквы N-P-K на упаковке удобрений?',
          uz: 'O‘g‘it qadog‘idagi N-P-K harflari nimani anglatadi?',
        },
        options: {
          en: ['Nitrogen, Phosphorus, Potassium', 'Nickel, Platinum, Krypton', 'Neon, Peat, Kelp', 'Night, Plant, Kitchen'],
          ru: ['Азот (N), Фосфор (P), Калий (K)', 'Никель, Платина, Криптон', 'Натрий, Песок, Кварц', 'Азот, Пепел, Кора'],
          uz: ['Azot (N), Fosfor (P), Kaliy (K)', 'Nikel, Platina, Kripton', 'Natriy, Qum, Kvars', 'Azot, Kul, Po‘stloq'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Nitrogen supports leafy foliage, Phosphorus aids roots & blooms, Potassium boosts overall resilience.',
          ru: 'Азот отвечает за листву, фосфор — за корни и цветение, калий — за иммунитет растения.',
          uz: 'Azot barg o‘sishini, fosfor ildiz va gullashni, kaliy esa umumiy chidamlilikni ta’minlaydi.',
        },
      },
      {
        id: 'e6',
        question: {
          en: 'Why is leaf "fenestration" advantageous for a wild Monstera in tropical rainforests?',
          ru: 'В чём эволюционное преимущество перфорации (прорезей) листьев монстеры в джунглях?',
          uz: 'Tropik o‘rmonda monstera barglaridagi teshiklar (fenestratsiya) qanday foyda beradi?',
        },
        options: {
          en: ['Lets heavy rain/wind pass safely and lets sunlight filter down to lower leaves', 'Attracts birds to nest inside', 'Stores snow', 'Scares monkeys'],
          ru: ['Пропускает сильный ветер, ливни и свет к нижним листьям', 'Привлекает птиц', 'Собирает снег', 'Отпугивает насекомых'],
          uz: ['Kuchli shamol, yomg‘ir va quyosh nurini pastki barglarga zarar yetkazmay o‘tkazadi', 'Qushlarni chaqiradi', 'Qor yig‘adi', 'Hasharotlarni qo‘rqitadi'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Split blades cover more canopy area per unit of leaf mass while resisting storm damage.',
          ru: 'Рассечённая пластинка выдерживает штормы и пропускает свет к нижнему ярусу.',
          uz: 'Kesilgan barg kamroq massa bilan keng maydonni egallaydi va bo‘ronlarda yirtilmaydi.',
        },
      },
      {
        id: 'e7',
        question: {
          en: 'Which propagation method clones a Snake Plant while keeping yellow border stripes intact?',
          ru: 'Какой способ размножения сохраняет жёлтую кайму у сансевиерии?',
          uz: 'Sansevyeriyaning chetidagi sariq chiziqlarini saqlab qolish uchun qaysi ko‘paytirish usuli ishlaydi?',
        },
        options: {
          en: ['Dividing pups/rhizomes at the base (leaf cuttings revert to plain green)', 'Leaf tip cuttings only', 'Growing from flower petals', 'Soaking seeds in salt'],
          ru: ['Деление корневища с дочерними розетками (листовой черенок теряет кайму)', 'Только листовой черенок', 'Из лепестков', 'Замачивание в соли'],
          uz: ['Ildizpoya va yon bolachalarini bo‘lib ekish (barg qalamchasida sariq hoshiya yo‘qoladi)', 'Faqat barg qalamchasi', 'Gulbargdan', 'Tuzli suvda'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Variegated snake plants are genetic chimeras—only rhizome division clones the golden edge.',
          ru: 'Окаймлённая сансевиерия — химера: при размножении листом жёлтый край исчезает.',
          uz: 'Hoshiyali sansevyeriya genetik ximeradir — faqat ildizpoya bo‘lish sariq chetini saqlaydi.',
        },
      },
      {
        id: 'e8',
        question: {
          en: 'What does "hydrophobic soil" mean when watering a severely dried peat pot?',
          ru: 'Что означает «гидрофобный грунт» при поливе сильно пересушенного торфа?',
          uz: 'Qattiq qurib qolgan torf tuproqda «gidrofob tuproq» hodisasi nimani anglatadi?',
        },
        options: {
          en: ['Dry peat shrinks and repels water down the pot edges instead of absorbing it', 'Soil turns into liquid', 'Roots drink from the air only', 'Soil freezes'],
          ru: ['Сухой торф сжимается и отталкивает воду по стенкам мимо корней', 'Почва растворяется', 'Вода замерзает', 'Корни уходят вверх'],
          uz: ['Quruq torf kichrayib, suvni shimish o‘rniga tuvak chetidan oqizib yuboradi', 'Tuproq eriydi', 'Suv muzlaydi', 'Ildizlar ko‘tariladi'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Rehydrate hydrophobic peat by soaking the pot in a bowl of water for 25 minutes.',
          ru: 'Восстановить впитываемость помогает погружение горшка в ёмкость с водой на 25 минут.',
          uz: 'Bunday tuproqni tiklash uchun tuvakni 25 daqiqa suvli idishga botirib qo‘ying.',
        },
      },
      {
        id: 'e9',
        question: {
          en: 'What is the ideal indoor relative humidity range for most tropical foliage plants?',
          ru: 'Какая относительная влажность воздуха оптимальна для большинства тропических растений?',
          uz: 'Ko‘pchilik tropik bargli o‘simliklar uchun xonadagi maqbul nisbiy namlik darajasi qancha?',
        },
        options: {
          en: ['45%–65%', '5%–10%', '98%–100%', '0%'],
          ru: ['45%–65%', '5%–10%', '98%–100%', '0%'],
          uz: ['45%–65%', '5%–10%', '98%–100%', '0%'],
        },
        correctIndex: 0,
        explanation: {
          en: '45–65% keeps leaf stomata functioning smoothly without encouraging indoor household mold.',
          ru: '45–65% комфортны как для тропических листьев, так и для микроклимата квартиры.',
          uz: '45–65% namlik barglar uchun qulay bo‘lib, uyda zamburug‘ paydo bo‘lishiga olib kelmaydi.',
        },
      },
      {
        id: 'e10',
        question: {
          en: 'What is "air layering" used for on tall Ficus or Monstera stems?',
          ru: 'Для чего применяют «воздушный отводок» на высоких фикусах и монстерах?',
          uz: 'Baland fikus yoki monsterada «havo payvandi» (vozdushniy otvodok) usuli nima uchun qo‘llaniladi?',
        },
        options: {
          en: ['Growing roots on an attached stem wrapped in damp sphagnum moss before cutting', 'Painting trunks white', 'Drying roots in sun', 'Freezing branches'],
          ru: ['Укоренение стебля во влажном мхе сфагнуме прямо на растении до срезки', 'Окраска ствола', 'Сушка корней', 'Заморозка побега'],
          uz: ['Shoxni ona o‘simlikdan kesmasdan oldin nam sfagnum moxida ildizlatib olish', 'Tanani oqlash', 'Ildizni quritish', 'Shoxni muzlatish'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Air layering guarantees a full root system before detaching a large top cutting.',
          ru: 'Воздушный отводок позволяет получить мощные корни ещё до отделения крупной верхушки.',
          uz: 'Bu usul yirik uchki qismni kesishdan avval tayyor va baquvvat ildiz tizimini olish imkonini beradi.',
        },
      },
    ],
  },
];
