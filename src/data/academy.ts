import type {LocalizedText} from '../i18n/types';

export interface ChallengeDay {
  day: number;
  xp: number;
  title: LocalizedText;
  description: LocalizedText;
}

export interface HomeworkModule {
  id: string;
  week: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  xp: number;
  title: LocalizedText;
  checklist: Record<'en' | 'ru' | 'uz', string[]>;
  reflectionPrompt: LocalizedText;
  miniTest: {
    question: LocalizedText;
    options: Record<'en' | 'ru' | 'uz', [string, string, string]>;
    correctIndex: 0 | 1 | 2;
  };
}

export interface AcademyBadge {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  requirementType: 'days' | 'homework' | 'xp';
  threshold: number;
}

export const CHALLENGE_DAYS: ChallengeDay[] = [
  {day: 1, xp: 20, title: {en: 'Finger Moisture Check', ru: 'Проверка влажности грунта', uz: 'Tuproq namligini tekshirish'}, description: {en: 'Test soil 4 cm deep across all pots before watering a drop.', ru: 'Проверьте грунт на глубине 4 см во всех горшках до полива.', uz: 'Sug‘orishdan oldin barcha tuvaklarda tuproqni 4 sm chuqurlikda tekshiring.'}},
  {day: 2, xp: 20, title: {en: 'Gentle Leaf Dusting', ru: 'Очистка листьев от пыли', uz: 'Barglardagi changni artish'}, description: {en: 'Wipe broad leaves with a soft damp cloth for better photosynthesis.', ru: 'Протрите крупные листья влажной мягкой тканью.', uz: 'Fotosintez yaxshilanishi uchun keng barglarni nam yumshoq mato bilan arting.'}},
  {day: 3, xp: 20, title: {en: 'Quarter-Turn Rotation', ru: 'Поворот горшков на 90°', uz: 'Tuvaklarni 90° aylantirish'}, description: {en: 'Rotate every pot a quarter turn so stems grow balanced and straight.', ru: 'Поверните все горшки на четверть оборота для ровной кроны.', uz: 'Poyalar bir tekis o‘sishi uchun barcha tuvaklarni chorak aylanaga burang.'}},
  {day: 4, xp: 25, title: {en: 'Drainage Audit', ru: 'Ревизия дренажа', uz: 'Drenaj tekshiruvi'}, description: {en: 'Check every saucer and cachepot to ensure zero standing water.', ru: 'Проверьте поддоны и кашпо: в них не должно быть застоя воды.', uz: 'Barcha tagliklarda turib qolgan ortiqcha suv yo‘qligiga ishonch hosil qiling.'}},
  {day: 5, xp: 25, title: {en: 'Baseline Jungle Photo', ru: 'Стартовое фото коллекции', uz: 'Boshlang‘ich suratga olish'}, description: {en: 'Take a photo of your favorite plant to track new growth over 30 days.', ru: 'Сфотографируйте любимое растение для сравнения через 30 дней.', uz: '30 kunlik o‘sishni solishtirish uchun sevimli o‘simligingizni suratga oling.'}},
  {day: 6, xp: 25, title: {en: 'Window Light Mapping', ru: 'Карта света в комнате', uz: 'Xona yorug‘ligi xaritasi'}, description: {en: 'Observe morning vs afternoon sunlight spots and note brightest zones.', ru: 'Отследите утренние и дневные солнечные зоны на подоконниках.', uz: 'Ertalabki va peshindan keyingi quyosh tushadigan eng yorug‘ nuqtalarni belgilang.'}},
  {day: 7, xp: 35, title: {en: 'Week 1 Pest Inspection', ru: 'Недельный осмотр на вредителей', uz: '1-hafta zararkunanda tekshiruvi'}, description: {en: 'Inspect leaf undersides and stem nodes closely in bright daylight.', ru: 'Внимательно осмотрите обратную сторону листьев при дневном свете.', uz: 'Kunduzgi yorug‘da barglarning orqa tomonini va bo‘g‘imlarni sinchiklab tekshiring.'}},
  {day: 8, xp: 20, title: {en: 'Settle Water Overnight', ru: 'Подготовка мягкой воды', uz: 'Suvni tindirish'}, description: {en: 'Fill a watering can today so chlorine dissipates and temperature equalizes.', ru: 'Налейте воду в лейку заранее, чтобы она согрелась и отстоялась.', uz: 'Xlor chiqib, suv xona haroratiga kelishi uchun idishga suv quyib qo‘ying.'}},
  {day: 9, xp: 20, title: {en: 'Tidy Spent Foliage', ru: 'Санитарная обрезка', uz: 'Quruq barglarni tozalash'}, description: {en: 'Snip dried yellow or dead lower leaves cleanly with sanitized shears.', ru: 'Удалите сухие и старые жёлтые листья чистым секатором.', uz: 'Qurigan yoki sarg‘aygan eski barglarni toza qaychi bilan qirqib oling.'}},
  {day: 10, xp: 25, title: {en: 'Draft & Vent Check', ru: 'Проверка сквозняков и батарей', uz: 'Yelvizak va isitgich tekshiruvi'}, description: {en: 'Ensure tropical leaves are not touching hot radiators or cold drafts.', ru: 'Убедитесь, что листья не соприкасаются с батареями и холодным стеклом.', uz: 'Tropik barglar issiq radiatorga yoki sovuq yelvizakka tegmayotganini tekshiring.'}},
  {day: 11, xp: 25, title: {en: 'Aerate Compact Topsoil', ru: 'Лёгкое рыхление грунта', uz: 'Tuproq ustini yumshatish'}, description: {en: 'Gently loosen crusty topsoil with a wooden chopstick for root oxygen.', ru: 'Осторожно прорыхлите уплотнённую почву деревянной шпажкой.', uz: 'Ildizlarga havo kirishi uchun zichlashgan tuproq ustini yog‘och tayoqcha bilan yumshating.'}},
  {day: 12, xp: 25, title: {en: 'Humidity Cluster', ru: 'Островок влажности', uz: 'Namlik orolchasi'}, description: {en: 'Group humidity-loving ferns, peace lilies, or calatheas closer together.', ru: 'Сгруппируйте влаголюбивые растения рядом для общего микроклимата.', uz: 'Namsevar o‘simliklarni bir-biriga yaqinroq joylashtiring.'}},
  {day: 13, xp: 25, title: {en: 'Rootbound Check', ru: 'Проверка корневого кома', uz: 'Ildiz sig‘imini tekshirish'}, description: {en: 'Peek under pots for roots poking out of drainage holes.', ru: 'Проверьте дренажные отверстия: не выходят ли наружу корни.', uz: 'Tuvak tagidagi teshiklardan ildizlar chiqib qolmaganligini tekshiring.'}},
  {day: 14, xp: 40, title: {en: 'Midpoint Botanical Review', ru: 'Экватор курса: оценка роста', uz: '14-kun: o‘sish tahlili'}, description: {en: 'Note any new unfurling leaves or root growth since Day 1.', ru: 'Отметьте появление новых листьев и побегов с начала курса.', uz: '1-kundan beri chiqqan yangi barg va novdalarni qayd eting.'}},
  {day: 15, xp: 25, title: {en: 'Clean Tools & Shears', ru: 'Дезинфекция инвентаря', uz: 'Asboblarni tozalash'}, description: {en: 'Wipe pruning blades with rubbing alcohol to keep cuts sterile.', ru: 'Протрите лезвия ножниц и секатора спиртом перед работой.', uz: 'Qaychi tig‘larini spirt bilan artib zararsizlantiring.'}},
  {day: 16, xp: 25, title: {en: 'Bottom-Water Experiment', ru: 'Нижний полив', uz: 'Pastdan sug‘orish tajribasi'}, description: {en: 'Practice bottom watering one thirsty pot for 20 minutes.', ru: 'Попробуйте полить одно жаждущее растение через поддон за 20 минут.', uz: 'Chanqagan bir tuvakni 20 daqiqa davomida pastdan suv shimdirib ko‘ring.'}},
  {day: 17, xp: 25, title: {en: 'Identify Aerial Nodes', ru: 'Поиск узлов на побегах', uz: 'Poya bo‘g‘imlarini aniqlash'}, description: {en: 'Locate leaf nodes on a trailing pothos or philodendron vine.', ru: 'Найдите воздушные узлы на побегах эпипремнума или филодендрона.', uz: 'Potos yoki filodendron poyasidagi bo‘g‘im tugunlarini toping.'}},
  {day: 18, xp: 30, title: {en: 'Water Propagation Jar', ru: 'Укоренение черенка в воде', uz: 'Suvda qalamcha ildizlatish'}, description: {en: 'Take one healthy node cutting and place it in clean water on a bright sill.', ru: 'Срежьте здоровый черенок с узлом и поставьте в чистую воду на свет.', uz: 'Bo‘g‘imli sog‘lom qalamcha kesib, yorug‘ joydagi toza suvga soling.'}},
  {day: 19, xp: 25, title: {en: 'Refresh Propagation Water', ru: 'Обновление воды черенкам', uz: 'Qalamcha suvini yangilash'}, description: {en: 'Keep propagation jars crystal clear and oxygenated.', ru: 'Поддерживайте чистоту и свежесть воды в сосуде с черенком.', uz: 'Qalamcha turgan suvning toza va kislorodga boy bo‘lishini ta’minlang.'}},
  {day: 20, xp: 25, title: {en: 'Wash Terracotta Rim Salts', ru: 'Очистка солевого налёта', uz: 'Tuvakdagi tuz izini tozalash'}, description: {en: 'Wipe away white mineral crust from pot edges with a damp cloth.', ru: 'Уберите белый солевой налёт с краёв горшка влажной салфеткой.', uz: 'Tuvak chetidagi oq mineral tuz qoldiqlarini nam mato bilan arting.'}},
  {day: 21, xp: 40, title: {en: 'Week 3 Foliage Shower', ru: 'Тёплый тропический душ', uz: '3-hafta: barglarga iliq dush'}, description: {en: 'Give sturdy tropicals a gentle lukewarm rinse to refresh stomata.', ru: 'Устройте тропическим растениям тёплый душ, прикрыв грунт.', uz: 'Baquvvat tropik o‘simliklarni iliq dush ostida chaying.'}},
  {day: 22, xp: 25, title: {en: 'Support Climbing Stems', ru: 'Установка опоры', uz: 'Chirmashuvchilarga tayanch'}, description: {en: 'Tie climbing stems loosely to a moss pole or bamboo stake.', ru: 'Подвяжите вьющиеся стебли к опоре мягкой лентой.', uz: 'Chirmashuvchi novdalarni yumshoq bog‘ich bilan tayanchga mahkamlang.'}},
  {day: 23, xp: 25, title: {en: 'Check Seasonal Feeding', ru: 'Оценка графика подкормок', uz: 'O‘g‘itlash jadvalini tekshirish'}, description: {en: 'Review whether active spring/summer plants need diluted organic feed.', ru: 'Оцените потребность активно растущих растений в слабой подкормке.', uz: 'Faol o‘sayotgan o‘simliklarga suyultirilgan o‘g‘it kerakligini tekshiring.'}},
  {day: 24, xp: 25, title: {en: 'Verify Pet-Safe Zones', ru: 'Контроль безопасности питомцев', uz: 'Uy hayvonlari xavfsizligi'}, description: {en: 'Ensure non-pet-safe species sit high out of reach of pets.', ru: 'Проверьте, что токсичные виды недосягаемы для домашних животных.', uz: 'Zaharli turlar uy hayvonlari qo‘li yetmaydigan balandlikda ekanini tekshiring.'}},
  {day: 25, xp: 25, title: {en: 'Mix Chunky Aroid Blend', ru: 'Рецепт воздушного грунта', uz: 'G‘ovak tuproq tayyorlash'}, description: {en: 'Review soil components (potting soil, perlite, pine bark) for next repot.', ru: 'Изучите пропорции коры, перлита и торфа для будущей пересадки.', uz: 'Keyingi ko‘chirish uchun tuproq, perlit va po‘stloq nisbatini rejalashtiring.'}},
  {day: 26, xp: 25, title: {en: 'Check Succulent Firmness', ru: 'Тест упругости суккулентов', uz: 'Sukkulentlar tarangligi testi'}, description: {en: 'Gently squeeze succulent leaves to recognize firm vs thirsty texture.', ru: 'Аккуратно проверьте упругость листьев суккулентов перед поливом.', uz: 'Sug‘orishdan oldin sukkulent barglari qattiq yoki yumshoqligini sekin tekshiring.'}},
  {day: 27, xp: 25, title: {en: 'Log Growth Measurements', ru: 'Запись прогресса в дневник', uz: 'O‘sish natijasini yozish'}, description: {en: 'Record height or new leaf counts inside the GreenNest Plant Journal.', ru: 'Запишите высоту или число новых листьев в дневнике GreenNest.', uz: 'Yangi barglar soni yoki bo‘yini GreenNest kundaligiga qayd eting.'}},
  {day: 28, xp: 30, title: {en: 'Update Watering Planner', ru: 'Актуализация графика полива', uz: 'Sug‘orish rejasini yangilash'}, description: {en: 'Adjust intervals in Care Tools based on what you observed this month.', ru: 'Скорректируйте интервалы полива в калькуляторе по итогам месяца.', uz: 'Bir oylik kuzatuv asosida parvarish vositalaridagi oraliqlarni yangilang.'}},
  {day: 29, xp: 30, title: {en: 'Share a Cutting or Tip', ru: 'Поделитесь черенком или опытом', uz: 'Qalamcha yoki maslahat ulashish'}, description: {en: 'Gift a rooted cutting or share a care habit with a fellow grower.', ru: 'Подарите укоренённый черенок или полезный совет близким.', uz: 'Ildiz otgan qalamchani yoki foydali odatni yaqiningiz bilan bo‘lishing.'}},
  {day: 30, xp: 50, title: {en: '30-Day Jungle Portrait', ru: 'Финальный портрет джунглей', uz: '30-kun: yakuniy surat'}, description: {en: 'Compare your plants to Day 1 and celebrate your thriving indoor jungle!', ru: 'Сравните растения с первым днём и отпразднуйте свой успех!', uz: 'O‘simliklaringizni 1-kun bilan solishtiring va yutug‘ingizni nishonlang!'}},
];

export const HOMEWORK_MODULES: HomeworkModule[] = [
  {
    id: 'week-1',
    week: 1,
    level: 'beginner',
    xp: 60,
    title: {en: 'Week 1: Light & Water Foundations', ru: 'Неделя 1: Основы света и полива', uz: '1-hafta: Yorug‘lik va sug‘orish asoslari'},
    checklist: {
      en: ['Check drainage holes on every pot in your home', 'Measure distance from each plant to its nearest window', 'Perform the finger moisture test for 7 days before watering'],
      ru: ['Проверить наличие дренажных отверстий у всех горшков', 'Оценить расстояние от каждого растения до ближайшего окна', 'Проводить пальцевый тест грунта перед каждым поливом'],
      uz: ['Uydagi barcha tuvaklarda drenaj teshigini tekshirish', 'Har bir o‘simlikning derazadan masofasini o‘lchash', 'Sug‘orishdan oldin barmoq bilan namlikni tekshirish'],
    },
    reflectionPrompt: {
      en: 'Which plant in your home dried out the fastest, and which stayed moist the longest?',
      ru: 'Какое ваше растение просыхало быстрее всех, а какое дольше всего оставалось влажным?',
      uz: 'Uyingizdagi qaysi o‘simlik tuprog‘i eng tez quridi va qaysi biri eng uzoq nam qoldi?',
    },
    miniTest: {
      question: {
        en: 'Which watering habit prevents root rot best?',
        ru: 'Какая привычка лучше всего защищает от корневой гнили?',
        uz: 'Qaysi odat ildiz chirishidan eng yaxshi himoya qiladi?',
      },
      options: {
        en: ['Checking soil depth before watering & emptying saucers', 'Watering daily on a strict clock', 'Covering drainage holes with tape'],
        ru: ['Проверка грунта перед поливом и слив воды из поддона', 'Ежедневный полив по расписанию', 'Заклеивание дренажных отверстий'],
        uz: ['Sug‘orishdan oldin tuproqni tekshirish va taglikni bo‘shatish', 'Har kuni soat bo‘yicha quyish', 'Drenaj teshigini yopib qo‘yish'],
      },
      correctIndex: 0,
    },
  },
  {
    id: 'week-2',
    week: 2,
    level: 'beginner',
    xp: 75,
    title: {en: 'Week 2: Soil Physics & Microclimate', ru: 'Неделя 2: Почва и микроклимат', uz: '2-hafta: Tuproq tuzilishi va mikroiqlim'},
    checklist: {
      en: ['Clean dust off all broad leaves gently', 'Relocate humidity-sensitive plants away from radiators', 'Verify pot sizes leave no excess soggy soil margin'],
      ru: ['Аккуратно очистить все широкие листья от пыли', 'Отодвинуть влаголюбивые виды от сухих радиаторов', 'Убедиться, что горшки соответствуют размеру корней'],
      uz: ['Barcha keng barglarni changdan tozalash', 'Namsevar o‘simliklarni isitgichlardan uzoqlashtirish', 'Tuvak o‘lchami ildiz hajmiga mosligini tekshirish'],
    },
    reflectionPrompt: {
      en: 'What did you notice about your room humidity or airflow near your plants?',
      ru: 'Что вы заметили относительно влажности и потоков воздуха рядом с растениями?',
      uz: 'O‘simliklar atrofidagi havo namligi va shamol oqimi bo‘yicha nimalarni payqadingiz?',
    },
    miniTest: {
      question: {
        en: 'Why does perlite improve houseplant potting soil?',
        ru: 'Зачем в комнатный грунт добавляют перлит?',
        uz: 'Nima uchun xona tuprog‘iga perlit qo‘shiladi?',
      },
      options: {
        en: ['It keeps soil porous so air reaches roots easily', 'It replaces sunlight', 'It attracts fungus gnats'],
        ru: ['Он делает грунт рыхлым и обеспечивает доступ воздуха к корням', 'Он заменяет солнечный свет', 'Он привлекает вредителей'],
        uz: ['Tuproqni g‘ovak saqlab, ildizlarga havo o‘tkazadi', 'Quyosh nurini almashtiradi', 'Zararkunandalarni chaqiradi'],
      },
      correctIndex: 0,
    },
  },
  {
    id: 'week-3',
    week: 3,
    level: 'intermediate',
    xp: 90,
    title: {en: 'Week 3: Diagnostics & Pest Defense', ru: 'Неделя 3: Диагностика и защита', uz: '3-hafta: Diagnostika va himoya'},
    checklist: {
      en: ['Inspect every leaf underside with bright flashlight or daylight', 'Sanitize pruning shears before trimming dry tips', 'Practice diagnosing one sample symptom in Plant Doctor'],
      ru: ['Осмотреть изнанку листьев с фонариком или при дневном свете', 'Продезинфицировать ножницы перед обрезкой сухих кончиков', 'Разобрать один симптом в разделе «Доктор растений»'],
      uz: ['Har bir barg ostini yorug‘da tekshirib chiqish', 'Qaychini spirtlab, quruq uchlarni tartibga keltirish', 'O‘simlik doktorida bitta belgi bo‘yicha tashxis sinab ko‘rish'],
    },
    reflectionPrompt: {
      en: 'Did you spot any early signs of stress, dry tips, or mineral crust?',
      ru: 'Удалось ли вовремя заметить ранние признаки стресса или солевого налёта?',
      uz: 'Stress, quruq uchlar yoki tuz izlarining ilk belgilarini payqadingizmi?',
    },
    miniTest: {
      question: {
        en: 'What is the immediate first step when spotting pests on one plant?',
        ru: 'Какое первое действие необходимо при обнаружении вредителей на одном растении?',
        uz: 'Bitta o‘simlikda zararkunanda topilganda birinchi navbatda nima qilish kerak?',
      },
      options: {
        en: ['Isolate/quarantine it away from healthy plants immediately', 'Move it right next to all other plants', 'Pour hot fertilizer'],
        ru: ['Немедленно изолировать его от здоровых растений', 'Поставить вплотную к другим цветам', 'Подкормить двойной дозой'],
        uz: ['Uni darhol sog‘lom o‘simliklardan alohida karantinga olish', 'Boshqa gullar yoniga qo‘yish', 'Ikki hissa o‘g‘itlash'],
      },
      correctIndex: 0,
    },
  },
  {
    id: 'week-4',
    week: 4,
    level: 'advanced',
    xp: 120,
    title: {en: 'Week 4: Propagation & Mastery', ru: 'Неделя 4: Размножение и мастерство', uz: '4-hafta: Ko‘paytirish va mahorat'},
    checklist: {
      en: ['Identify stem nodes on a trailing plant', 'Start a water or moss cutting or divide a pup', 'Update your Watering Planner & Plant Journal for next month'],
      ru: ['Найти узлы роста на ампельном растении', 'Укоренить черенок в воде или отсадить детку', 'Обновить график полива и дневник на следующий месяц'],
      uz: ['Chirmashuvchi o‘simlikda bo‘g‘im tugunlarini topish', 'Suvda qalamcha ildizlatish yoki bolacha ajratish', 'Kelgusi oy uchun sug‘orish rejasi va kundalikni yangilash'],
    },
    reflectionPrompt: {
      en: 'How has your confidence with houseplants evolved over these 4 weeks?',
      ru: 'Как изменилась ваша уверенность в уходе за растениями за эти 4 недели?',
      uz: 'Ushbu 4 hafta davomida o‘simlik parvarishidagi ishonchingiz qanday o‘zgardi?',
    },
    miniTest: {
      question: {
        en: 'When potting a water-rooted cutting into soil, how should you manage moisture initially?',
        ru: 'Как поливать черенок в первые недели после пересадки из воды в грунт?',
        uz: 'Suvda ildiz otgan qalamchani tuproqqa ekkan dastlabki haftalarda namlikni qanday saqlash kerak?',
      },
      options: {
        en: ['Keep soil gently moist for 1–2 weeks while water roots adapt', 'Keep soil bone dry for a month', 'Submerge the whole pot underwater'],
        ru: ['Держать грунт слегка влажным 1–2 недели для адаптации корней', 'Не поливать целый месяц', 'Затопить горшок полностью'],
        uz: ['Ildizlar moslashguncha 1–2 hafta tuproqni yengil nam holda saqlash', 'Bir oy umuman sug‘ormaslik', 'Tuvakni suvga botirib qo‘yish'],
      },
      correctIndex: 0,
    },
  },
];

export const ACADEMY_BADGES: AcademyBadge[] = [
  {
    id: 'first-sprout',
    title: {en: 'First Sprout', ru: 'Первый росток', uz: 'Birinchi nihol'},
    description: {en: 'Complete 3 daily tasks in the 30-day challenge.', ru: 'Выполните 3 ежедневных задания челленджа.', uz: '30 kunlik chellenjda 3 ta vazifani bajaring.'},
    requirementType: 'days',
    threshold: 3,
  },
  {
    id: 'week-streak',
    title: {en: 'Consistent Caretaker', ru: 'Верный хранитель', uz: 'Doimiy parvarishchi'},
    description: {en: 'Complete 7 daily tasks.', ru: 'Выполните 7 ежедневных заданий.', uz: '7 ta kundalik vazifani bajaring.'},
    requirementType: 'days',
    threshold: 7,
  },
  {
    id: 'halfway-botanist',
    title: {en: 'Halfway Canopy', ru: 'Экватор джунглей', uz: 'Yarim yo‘l bog‘boni'},
    description: {en: 'Complete 15 daily tasks.', ru: 'Выполните 15 ежедневных заданий.', uz: '15 ta kundalik vazifani bajaring.'},
    requirementType: 'days',
    threshold: 15,
  },
  {
    id: 'scholar',
    title: {en: 'Homework Scholar', ru: 'Прилежный ученик', uz: 'Vazifa a’lochisi'},
    description: {en: 'Submit at least 2 weekly homework modules.', ru: 'Завершите минимум 2 модуля домашних заданий.', uz: 'Kamida 2 ta haftalik topshiriqni yakunlang.'},
    requirementType: 'homework',
    threshold: 2,
  },
  {
    id: 'xp-collector',
    title: {en: 'Chlorophyll Master', ru: 'Мастер хлорофилла', uz: 'Xlorofill ustasi'},
    description: {en: 'Accumulate 500 XP across Academy tasks.', ru: 'Наберите 500 XP в заданиях Академии.', uz: 'Akademiyada jami 500 XP to‘plang.'},
    requirementType: 'xp',
    threshold: 500,
  },
  {
    id: 'graduate',
    title: {en: 'Jungle Graduate', ru: 'Выпускник Академии', uz: 'Akademiya bitiruvchisi'},
    description: {en: 'Complete all 30 days & unlock your printable certificate.', ru: 'Пройдите все 30 дней и откройте сертификат.', uz: 'Barcha 30 kunni yakunlab, sertifikatni oching.'},
    requirementType: 'days',
    threshold: 30,
  },
];
