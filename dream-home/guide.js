// Dream Home handbook. English and Persian share this file; the language follows the site.
"use strict";

const STORAGE_KEY = "hotarego.lang";
const CHROME = {
  en: {
    back: "All games",
    kicker: "Dream Home",
    films: "Films",
    langLabel: "Language",
    system: "System default",
  },
  fa: {
    back: "همه بازی‌ها",
    kicker: "خونه رویایی",
    films: "فیلم‌ها",
    langLabel: "زبان",
    system: "پیش‌فرض دستگاه",
  },
};

const PAGES = [
  {
    id: "start",
    href: "./",
    nav: { en: "Start here", fa: "از اینجا" },
    title: { en: "How Dream Home is played", fa: "خونه رویایی چطور بازی می‌شود" },
    blocks: [
      { type: "p", en: "Dream Home is a match-3 puzzle on Android. Grandma Shirin left you her house. You clear boards to earn stars, and you spend those stars bringing the rooms back.", fa: "خونه رویایی یک پازل سه‌تایی برای اندروید است. مادربزرگ شیرین خانه‌اش را برای شما گذاشته. مهره‌ها را سه تا می‌کنید، ستاره می‌گیرید، و با همان ستاره‌ها اتاق‌ها را دوباره درست می‌کنید." },
      { type: "video", file: "dreamhome-clip", en: "The one-minute film.", fa: "فیلم یک‌دقیقه‌ای." },
      { type: "h2", en: "The loop", fa: "حلقه بازی" },
      { type: "p", en: "A level costs one energy. You match tiles until the goals are done, or until the moves run out. A pass pays the energy back, up to the cap of five. The first time you pass a level it also pays that level’s coins and gems, and a little experience. Playing it again does not pay those again. Only a better star rating still counts.", fa: "هر مرحله یک انرژی می‌خواهد. مهره‌ها را سه تا می‌کنید تا هدف‌ها تمام شود، یا حرکت‌ها تمام شود. اگر مرحله را رد کنید، انرژی برمی‌گردد، تا سقف پنج‌تا. بار اول که مرحله را رد می‌کنید، سکه و جواهر همان مرحله و کمی تجربه هم می‌آید. بار بعد دیگر آن‌ها را نمی‌دهد. فقط ستاره بهتر هنوز حساب می‌شود." },
      { type: "figure", shot: "home", en: "Home. The room, your title, and today’s chore.", fa: "خانه. اتاق، عنوان شما، و کار امروز." },
      { type: "h2", en: "Stars and coins", fa: "ستاره و سکه" },
      { type: "p", en: "Stars open a renovation task. Coins pay for the look you pick. The game says it the same way: stars open the task, coins pay for the look, and levels earn both. You start with 500 coins, 10 gems, 5 energy, and two each of the hammer, the rocket and the shuffle.", fa: "ستاره کار بازسازی را باز می‌کند. سکه هزینه ظاهری است که انتخاب می‌کنید. خود بازی همین را می‌گوید: ستاره کار را باز می‌کند، سکه ظاهر را می‌خرد، و مرحله‌ها هر دو را می‌دهند. با ۵۰۰ سکه، ۱۰ جواهر، ۵ انرژی، و دوتا از هر کدام از چکش و موشک و به‌هم‌ریختن شروع می‌کنید." },
      { type: "h2", en: "Two houses, one save", fa: "دو خانه، یک ذخیره" },
      { type: "p", en: "The first house is the entrance: 100 levels and 12 tasks. After level 100 the second house continues the same save. Your coins, stars, energy, rank, daily reward and daily chore all carry over, and a living room opens with 12 tasks of its own. House rank in the first house can reach about level 47. The later titles, and the gifts from level 50 on, wait for the second house.", fa: "خانه اول ورودی است: ۱۰۰ مرحله و ۱۲ کار. بعد از مرحله ۱۰۰، خانه دوم همان ذخیره را ادامه می‌دهد. سکه، ستاره، انرژی، رتبه، جایزه روزانه و کار روزانه می‌مانند، و اتاق نشیمن با ۱۲ کار خودش باز می‌شود. رتبه در خانه اول تا حدود سطح ۴۷ می‌رسد. عنوان‌های بعدی، و هدیه‌های سطح ۵۰ به بعد، برای خانه دوم می‌مانند." },
      { type: "h2", en: "The chapters", fa: "فصل‌ها" },
      { type: "ul", items: [
        { en: "The puzzle: goals, stars, specials, obstacles and boosters.", fa: "پازل: هدف‌ها، ستاره، مهره‌های ویژه، مانع‌ها و تقویت‌کننده‌ها." },
        { en: "The house: renovation, restyling, and the story.", fa: "خانه: بازسازی، عوض کردن ظاهر، و داستان." },
        { en: "Progress: energy, extra moves, house rank, and the two daily gifts.", fa: "پیشرفت: انرژی، حرکت اضافه، رتبه خانه، و دو جایزه روزانه." },
      ] },
    ],
  },
  {
    id: "puzzle",
    href: "puzzle.html",
    nav: { en: "The puzzle", fa: "پازل" },
    title: { en: "The puzzle", fa: "پازل" },
    blocks: [
      { type: "p", en: "Swipe a tile into a neighbor. Three or more of the same color clear. New tiles fall in. The board under a level is fixed for that attempt: the same level and the same attempt always deal the same board.", fa: "یک مهره را به سمت همسایه‌اش بکشید. سه مهره هم‌رنگ یا بیشتر پاک می‌شوند. مهره تازه می‌افتد پایین. صفحه هر تلاش ثابت است: همان مرحله و همان تلاش، همیشه همان صفحه را می‌چینند." },
      { type: "video", file: "dreamhome-ad-15", en: "Fifteen seconds: match, blast, then the room.", fa: "پانزده ثانیه: پازل حل کردن، ترکاندن، بعد اتاق." },
      { type: "figure", shot: "puzzle", en: "A board, with the goal above it and the boosters below.", fa: "یک صفحه، با هدف بالا و تقویت‌کننده‌ها پایین." },
      { type: "h2", en: "Four goals", fa: "چهار هدف" },
      { type: "p", en: "Levels rotate through four goals. The order follows the level number: collect a color, clear obstacles, collect specials, then reach a score. Level 1 collects a color. The card before you start names the goal, and it names any obstacle on that board.", fa: "مرحله‌ها بین چهار هدف می‌چرخند. ترتیب از شماره مرحله می‌آید: جمع کردن یک رنگ، پاک کردن مانع، جمع کردن مهره ویژه، بعد رسیدن به امتیاز. مرحله ۱ یک رنگ را جمع می‌کند. کارت قبل از شروع، هدف را می‌گوید و اگر مانعی روی صفحه باشد نامش را هم می‌گوید." },
      { type: "h2", en: "Stars", fa: "ستاره" },
      { type: "p", en: "Each goal has three marks. One star is half the goal, rounded up. Two stars is three quarters, rounded up. Three stars is the whole goal. If a level has more than one goal, your rating is the lowest of them.", fa: "هر هدف سه نشانه دارد. یک ستاره نصف هدف است، رو به بالا. دو ستاره سه‌چهارم است، رو به بالا. سه ستاره خود هدف است. اگر مرحله بیش از یک هدف داشته باشد، ستاره شما کمترین آن‌هاست." },
      { type: "p", en: "Finish every goal and the level ends on the spot, at three stars. Specials still sitting on the board then fire on their own and add to the score. If you run out of moves after you already have a star, you can keep those stars. The energy comes back. Coins, gems and experience are paid only the first time you pass. A later try pays nothing unless the star rating goes up, and then you receive only the new stars.", fa: "اگر همه هدف‌ها تمام شود، مرحله همان‌جا با سه ستاره تمام می‌شود. مهره‌های ویژه که هنوز روی صفحه مانده‌اند خودشان می‌ترکند و به امتیاز اضافه می‌شوند. اگر حرکت‌ها تمام شود و از قبل یک ستاره داشته باشید، می‌توانید همان ستاره‌ها را نگه دارید. انرژی برمی‌گردد. سکه و جواهر و تجربه فقط بار اول که رد می‌کنید داده می‌شود. تلاش بعدی چیزی نمی‌دهد، مگر ستاره بهتر شود، و آن وقت فقط ستاره‌های تازه را می‌گیرید." },
      { type: "h2", en: "Specials", fa: "مهره‌های ویژه" },
      { type: "ul", items: [
        { en: "Four in a line makes a rocket. It clears a row or a column.", fa: "چهارتا در یک خط، موشک می‌سازد. یک ردیف یا یک ستون را پاک می‌کند." },
        { en: "A T or an L makes a bomb. It clears a square around itself.", fa: "شکل T یا L بمب می‌سازد. مربع دور خودش را پاک می‌کند." },
        { en: "Five in a line makes a rainbow. It clears one color.", fa: "پنج‌تا در یک خط، رنگین‌کمان می‌سازد. یک رنگ را پاک می‌کند." },
        { en: "A two-by-two square makes a plane. It flies to one tile.", fa: "مربع دو در دو، هواپیما می‌سازد. به سمت یک مهره پرواز می‌کند." },
      ] },
      { type: "p", en: "Swap two specials and they fire together. A rainbow paired with a special turns a whole color into that special. Two rainbows clear the board. The first time each of these happens, a line under the board explains it and waits for a tap.", fa: "دو مهره ویژه را با هم عوض کنید تا با هم بترکند. رنگین‌کمان در کنار یک مهره ویژه، یک رنگ کامل را به همان مهره تبدیل می‌کند. دو رنگین‌کمان همه صفحه را پاک می‌کنند. بار اول هر کدام، یک خط زیر صفحه توضیح می‌دهد و منتظر ضربه شما می‌ماند." },
      { type: "h2", en: "Obstacles", fa: "مانع‌ها" },
      { type: "p", en: "Each obstacle is explained the first time its level opens. These are the debuts.", fa: "هر مانع بار اول که مرحله‌اش باز می‌شود توضیح داده می‌شود. این‌ها اولین مرحله هر کدام است." },
      { type: "table",
        headers: [
          { en: "Obstacle", fa: "مانع" },
          { en: "First level", fa: "اولین مرحله" },
          { en: "What it does", fa: "کارش" },
        ],
        rows: [
          [{ en: "Crate", fa: "جعبه" }, { en: "1", fa: "۱" }, { en: "Breaks when you match beside it.", fa: "وقتی کنارش سه تا کنید می‌شکند." }],
          [{ en: "Ice", fa: "یخ" }, { en: "15", fa: "۱۵" }, { en: "Holds a tile still. Match that tile, or match beside it, to free it.", fa: "مهره را نگه می‌دارد. همان مهره را سه تا کنید، یا کنارش سه تا کنید، تا آزاد شود." }],
          [{ en: "Jelly", fa: "ژله" }, { en: "29", fa: "۲۹" }, { en: "Sits under a tile. Clear the tile on top of it.", fa: "زیر مهره است. مهره رویش را پاک کنید." }],
          [{ en: "Chain", fa: "زنجیر" }, { en: "43", fa: "۴۳" }, { en: "Holds a tile still. Match that tile, or hit it. Matching beside it does nothing.", fa: "مهره را نگه می‌دارد. همان مهره را سه تا کنید یا به آن ضربه بزنید. سه تا کردن کنارش اثری ندارد." }],
          [{ en: "Double crate", fa: "جعبه دوتایی" }, { en: "57", fa: "۵۷" }, { en: "Takes two hits.", fa: "دو ضربه می‌خواهد." }],
          [{ en: "Blast crate", fa: "جعبه انفجاری" }, { en: "71", fa: "۷۱" }, { en: "Takes one hit, then bursts into the tiles around it.", fa: "یک ضربه می‌خواهد، بعد به مهره‌های دورش می‌ترکد." }],
          [{ en: "Layered block", fa: "بلوک لایه‌ای" }, { en: "85", fa: "۸۵" }, { en: "Takes three hits.", fa: "سه ضربه می‌خواهد." }],
        ] },
      { type: "h2", en: "Boosters", fa: "تقویت‌کننده‌ها" },
      { type: "p", en: "None of them spends a move. You start with two of each. The shop sells more.", fa: "هیچ‌کدام حرکت خرج نمی‌کند. از هر کدام دوتا دارید. فروشگاه بیشتر می‌فروشد." },
      { type: "ul", items: [
        { en: "Hammer, 250 coins. Tap it, then tap a tile or an obstacle. Tap the hammer again to cancel.", fa: "چکش، ۲۵۰ سکه. بزنیدش، بعد یک مهره یا مانع را بزنید. برای لغو دوباره چکش را بزنید." },
        { en: "Rocket, 350 coins. Tap it, then tap a tile. That row clears.", fa: "موشک، ۳۵۰ سکه. بزنیدش، بعد یک مهره را بزنید. همان ردیف پاک می‌شود." },
        { en: "Shuffle, 150 coins. One tap mixes the board.", fa: "به‌هم‌ریختن، ۱۵۰ سکه. یک ضربه صفحه را قاطی می‌کند." },
      ] },
      { type: "p", en: "The first time you arm the hammer or the rocket, a longer line explains it and you can keep playing. The first shuffle shows a short note, then fires.", fa: "بار اول که چکش یا موشک را آماده می‌کنید، یک خط بلند توضیح می‌دهد و بازی ادامه دارد. به‌هم‌ریختن بار اول یک یادداشت کوتاه نشان می‌دهد و بعد عمل می‌کند." },
    ],
  },
  {
    id: "house",
    href: "house.html",
    nav: { en: "The house", fa: "خانه" },
    title: { en: "The house", fa: "خانه" },
    blocks: [
      { type: "p", en: "The entrance has twelve tasks. The first is clearing the clutter, and it costs 20 stars. Later tasks ask for stars to open them and coins for the look. The front door, for example, costs 20 stars and 150 coins, and you choose oak, navy or sage.", fa: "ورودی دوازده کار دارد. اولی جمع کردن به‌هم‌ریختگی است و ۲۰ ستاره می‌خواهد. کارهای بعدی برای باز شدن ستاره می‌خواهند و برای ظاهر سکه. در ورودی، مثلاً، ۲۰ ستاره و ۱۵۰ سکه است و بین بلوطی، سرمه‌ای و سبز مریم‌گلی انتخاب می‌کنید." },
      { type: "video", file: "dreamhome-ad-45", en: "Forty-five seconds: the puzzle, Mr. Farhad’s offer, and the room before and after.", fa: "چهل‌وپنج ثانیه: پازل، پیشنهاد آقای فرهاد، و اتاق قبل و بعد." },
      { type: "h2", en: "Choosing a look", fa: "انتخاب ظاهر" },
      { type: "p", en: "Open a task, pick an option, and confirm. The room changes when you confirm. A task with only one option, or with no coin cost, cannot be changed later. A finished task that had several looks, and that cost coins, can be changed again. The stars stay spent. You pay the coin cost once more, and only if you pick a different look and you have the coins.", fa: "یک کار را باز کنید، یک گزینه را بردارید و تأیید کنید. اتاق با تأیید عوض می‌شود. کاری که فقط یک گزینه دارد، یا سکه‌ای نمی‌خواهد، بعداً عوض نمی‌شود. کار تمام‌شده‌ای که چند ظاهر داشته و سکه خواسته، دوباره عوض می‌شود. ستاره‌ها خرج‌شده می‌مانند. هزینه سکه را یک بار دیگر می‌دهید، و فقط اگر ظاهر دیگری را انتخاب کنید و سکه داشته باشید." },
      { type: "p", en: "Warm, fresh and classic in the film are three ways through the same entrance. They are not separate purchases. They are the looks adding up.", fa: "گرم، تازه و کلاسیک در فیلم سه راه از همان ورودی‌اند. خرید جدا نیستند. ظاهرها روی هم جمع شده‌اند." },
      { type: "h2", en: "The story", fa: "داستان" },
      { type: "p", en: "The first time you press Play, before level 1, the story of the house opens. The title stays until you tap, and the first line does not start until that tap. Skip finishes the scene and remembers that you have seen the opening. Later scenes, and any scene you open again from the story list, use a short title card and do not show that opening again.", fa: "بار اول که بازی را می‌زنید، قبل از مرحله ۱، داستان خانه باز می‌شود. عنوان می‌ماند تا ضربه بزنید، و خط اول تا همان ضربه شروع نمی‌شود. رد کردن، صحنه را تمام می‌کند و یادش می‌ماند که آغاز را دیده‌اید. صحنه‌های بعدی، و هر صحنه‌ای که از فهرست داستان دوباره باز کنید، یک کارت عنوان کوتاه دارند و آن آغاز را دوباره نشان نمی‌دهند." },
      { type: "p", en: "Mr. Farhad wants the land. The scenes between levels are where you hear the offer, and where the house answers it. Nothing in the story spends stars or coins.", fa: "آقای فرهاد زمین را می‌خواهد. صحنه‌های بین مرحله‌ها جایی است که پیشنهاد را می‌شنوید، و خانه جوابش را می‌دهد. داستان ستاره یا سکه خرج نمی‌کند." },
      { type: "h2", en: "The living room", fa: "اتاق نشیمن" },
      { type: "p", en: "It unlocks after level 100, in the second house. The tasks work the same way: stars open them, coins pay for the look, and a finished look that cost coins can be changed for coins again. The plaque on the wall is the same one.", fa: "بعد از مرحله ۱۰۰، در خانه دوم، باز می‌شود. کارها همان‌طورند: ستاره بازشان می‌کند، سکه ظاهر را می‌خرد، و ظاهر تمام‌شده‌ای که سکه خواسته دوباره با سکه عوض می‌شود. پلاک روی دیوار همان پلاک است." },
    ],
  },
  {
    id: "progress",
    href: "progress.html",
    nav: { en: "Progress", fa: "پیشرفت" },
    title: { en: "Progress", fa: "پیشرفت" },
    blocks: [
      { type: "video", file: "dreamhome-ad-30", en: "Thirty seconds: earn the stars, then spend them on the house.", fa: "سی ثانیه: ستاره را بگیرید، بعد خرج خانه کنید." },
      { type: "h2", en: "Energy", fa: "انرژی" },
      { type: "p", en: "You can hold five. One comes back every 20 minutes. Starting a level spends one, and a pass gives it back if there is room under the cap. Filling the bar from the shop costs 10 gems and tops it up to five. A rewarded ad, when ads are available, can give one energy or 100 coins.", fa: "پنج‌تا جا دارید. هر ۲۰ دقیقه یکی برمی‌گردد. شروع مرحله یکی خرج می‌کند، و اگر رد کنید و زیر سقف جا باشد برمی‌گردد. پر کردن از فروشگاه ۱۰ جواهر است و تا پنج‌تا پر می‌کند. تبلیغ جایزه‌دار، وقتی تبلیغ باشد، می‌تواند یک انرژی یا ۱۰۰ سکه بدهد." },
      { type: "h2", en: "Out of moves", fa: "تمام شدن حرکت" },
      { type: "p", en: "Five more moves cost 500 coins or 1 gem the first time in that try. Each extra continue you pay for costs twice the last one. An ad continue, and the free one below, do not raise the price. The game tells you, on that try, that each paid continue costs more than the last.", fa: "پنج حرکت بیشتر، بار اول در همان تلاش، ۵۰۰ سکه یا ۱ جواهر است. هر ادامه پولی بعد از آن دو برابر قبلی است. ادامه با تبلیغ، و ادامه رایگان پایین، قیمت را بالا نمی‌برد. بازی در همان تلاش می‌گوید که هر ادامه پولی از قبلی گران‌تر است." },
      { type: "p", en: "Once each day, when ads are not available and you have no star yet, you can take five free moves. It does not count as a paid continue. If you leave instead, still with no star, and you have not used that free try, the energy from this attempt comes back and the free try is spent. A pass never needs it. When ads are available, the free try is hidden and a failed attempt does not refund energy that way. You still have the ad continue.", fa: "روزی یک بار، وقتی تبلیغ نیست و هنوز ستاره ندارید، می‌توانید پنج حرکت رایگان بگیرید. ادامه پولی حساب نمی‌شود. اگر به‌جای آن بروید، هنوز بدون ستاره، و آن تلاش رایگان را مصرف نکرده باشید، انرژی همین تلاش برمی‌گردد و تلاش رایگان مصرف می‌شود. رد کردن مرحله به آن نیاز ندارد. وقتی تبلیغ هست، تلاش رایگان پنهان است و شکست این‌طور انرژی را برنمی‌گرداند. ادامه با تبلیغ سر جایش است." },
      { type: "p", en: "If you leave in the middle of a level, that attempt is still there when you come back, including the out-of-moves card. The results screen is not resumed. If a saved attempt belongs to a level this version does not have, the attempt is dropped and the energy stays spent.", fa: "اگر وسط مرحله بروید، همان تلاش وقتی برگردید هست، حتی کارت تمام شدن حرکت. صفحه نتیجه از سر گرفته نمی‌شود. اگر تلاش ذخیره‌شده مال مرحله‌ای باشد که این نسخه ندارد، تلاش کنار گذاشته می‌شود و انرژی خرج‌شده می‌ماند." },
      { type: "h2", en: "House rank", fa: "رتبه خانه" },
      { type: "p", en: "Experience comes only from the first clear of a level: ten points times that level’s difficulty, and never more than ninety from one win. Your level is your experience divided by one hundred, plus one. So one win raises you by at most one level.", fa: "تجربه فقط از اولین رد کردن مرحله می‌آید: ده امتیاز ضرب در سختی آن مرحله، و هیچ بردی بیشتر از نود نمی‌دهد. سطح شما تجربه تقسیم بر صد است، به‌اضافه یک. پس یک برد حداکثر یک سطح بالا می‌برد." },
      { type: "figure", shot: "rank", en: "The rank sheet. Tap the title under the room, or the level badge, on the home screen.", fa: "برگه رتبه. روی خانه، عنوان زیر اتاق یا نشان سطح را بزنید." },
      { type: "p", en: "Nine titles. The current one is the furthest you have earned, and the brass plaque on the room lights one pip for each title you hold. On the home screen, tap the title under the room or the level badge to open the sheet. On other screens the badge is only a label.", fa: "نه عنوان. عنوان فعلی دورترین عنوانی است که گرفته‌اید، و پلاک برنجی اتاق برای هر عنوان یک نقطه روشن می‌کند. روی خانه، عنوان زیر اتاق یا نشان سطح را بزنید تا برگه باز شود. در صفحه‌های دیگر نشان فقط یک برچسب است." },
      { type: "table",
        headers: [
          { en: "Title", fa: "عنوان" },
          { en: "Level", fa: "سطح" },
          { en: "What else it asks", fa: "چه چیز دیگری می‌خواهد" },
        ],
        rows: [
          [{ en: "Guest", fa: "مهمان" }, { en: "1", fa: "۱" }, { en: "Where you start.", fa: "از اینجا شروع می‌کنید." }],
          [{ en: "Helper", fa: "همیار" }, { en: "2", fa: "۲" }, { en: "Reach the level.", fa: "به سطح برسید." }],
          [{ en: "Neighbor", fa: "همسایه" }, { en: "5", fa: "۵" }, { en: "Reach the level.", fa: "به سطح برسید." }],
          [{ en: "Keeper", fa: "نگهبان" }, { en: "10", fa: "۱۰" }, { en: "Reach the level.", fa: "به سطح برسید." }],
          [{ en: "Host", fa: "میزبان" }, { en: "20", fa: "۲۰" }, { en: "Reach the level.", fa: "به سطح برسید." }],
          [{ en: "Caretaker", fa: "سرایدار" }, { en: "40", fa: "۴۰" }, { en: "Also two stars on any level from 85 to 96. The first house can earn this.", fa: "و دو ستاره در یکی از مرحله‌های ۸۵ تا ۹۶. خانه اول می‌تواند این را بدهد." }],
          [{ en: "Regular", fa: "آشنا" }, { en: "50", fa: "۵۰" }, { en: "The second house. It does not wait for Caretaker, so it can show first.", fa: "خانه دوم. منتظر سرایدار نمی‌ماند، پس می‌تواند زودتر دیده شود." }],
          [{ en: "Steward", fa: "مباشر" }, { en: "70", fa: "۷۰" }, { en: "Also two stars on any level from 161 to 172.", fa: "و دو ستاره در یکی از مرحله‌های ۱۶۱ تا ۱۷۲." }],
          [{ en: "Householder", fa: "صاحب‌خانه" }, { en: "90", fa: "۹۰" }, { en: "Also two stars on any level from 185 to 196.", fa: "و دو ستاره در یکی از مرحله‌های ۱۸۵ تا ۱۹۶." }],
        ] },
      { type: "p", en: "Every fifth level, from 5 through 90, pays 100 coins once. The badge and the coins do not wait for a gated title. The name and the pip do. In the first house the gifts run through level 45, nine gifts, 900 coins. The second house continues them through level 90. Stars still decide what you can renovate. Rank never pays gems or boosters.", fa: "هر سطح پنجم، از ۵ تا ۹۰، یک بار ۱۰۰ سکه می‌دهد. نشان سطح و سکه‌ها منتظر عنوان قفل‌دار نمی‌مانند. اسم و نقطه پلاک منتظر می‌مانند. در خانه اول هدیه‌ها تا سطح ۴۵ است، نه هدیه، ۹۰۰ سکه. خانه دوم تا سطح ۹۰ ادامه می‌دهد. ستاره هنوز تعیین می‌کند چه چیزی را بازسازی کنید. رتبه جواهر یا تقویت‌کننده نمی‌دهد." },
      { type: "p", en: "The results of a first clear show the experience, the 100 coins when a fifth level pays, a new title, and a line when a gated title is waiting for its two stars.", fa: "نتیجه اولین رد کردن، تجربه را نشان می‌دهد، ۱۰۰ سکه را وقتی یک سطح پنجم پرداخت می‌شود، عنوان تازه را، و یک خط را وقتی عنوان قفل‌دار منتظر دو ستاره‌اش است." },
      { type: "h2", en: "Two gifts each day", fa: "دو هدیه در هر روز" },
      { type: "p", en: "The daily reward is a seven-day streak: 100, 150, 200, 250, 300, then 400 coins, and 5 gems on day seven. Miss a day and the streak starts over. It opens when you arrive home, unless you are resuming a level.", fa: "جایزه روزانه یک زنجیره هفت‌روزه است: ۱۰۰، ۱۵۰، ۲۰۰، ۲۵۰، ۳۰۰، بعد ۴۰۰ سکه، و روز هفتم ۵ جواهر. یک روز جا بماند، زنجیره از نو شروع می‌شود. وقتی به خانه می‌رسید باز می‌شود، مگر وسط ادامه یک مرحله باشید." },
      { type: "p", en: "The chore is separate and does not touch that streak. It rotates with the date. One day, win a level. The next, raise the stars on a level you have already passed, or win a level if every passed level is already at three stars. The day after, finish a renovation or change a look you already bought, or win a level if nothing you can afford is open. Claim pays 100 coins, once that day, in either house.", fa: "کار روزانه جداست و به آن زنجیره دست نمی‌زند. با تاریخ می‌چرخد. یک روز یک مرحله را ببرید. روز بعد ستاره مرحله‌ای را که رد کرده‌اید بالا ببرید، یا اگر همه مرحله‌های ردشده سه‌ستاره است یک مرحله ببرید. روز بعدش یک بازسازی را تمام کنید یا ظاهری را که خریده‌اید عوض کنید، یا اگر هیچ چیز قابل خریدی باز نیست یک مرحله ببرید. گرفتن جایزه ۱۰۰ سکه است، یک بار در آن روز، در هر کدام از دو خانه." },
      { type: "h2", en: "The level list", fa: "فهرست مرحله‌ها" },
      { type: "figure", shot: "levels", en: "Every open level shows its goal under the number. One and two stars wear a gold ring. Three stars stay plain.", fa: "هر مرحله باز، هدفش را زیر شماره نشان می‌دهد. یک و دو ستاره حلقه طلایی دارند. سه ستاره ساده می‌ماند." },
      { type: "p", en: "Locked levels are a dim number. Before a level you have already passed, the card also says that coins, gems and experience were paid already, and that only a better star rating still counts.", fa: "مرحله قفل یک شماره کم‌رنگ است. قبل از مرحله‌ای که رد کرده‌اید، کارت هم می‌گوید سکه و جواهر و تجربه قبلاً داده شده، و فقط ستاره بهتر هنوز حساب می‌شود." },
    ],
  },
];

let choice = "system";
let lang = "en";

function readChoice() {
  try { return localStorage.getItem(STORAGE_KEY) || "system"; } catch { return "system"; }
}

function resolveLanguage(next) {
  if (next === "en" || next === "fa") return next;
  const prefs = navigator.languages || [navigator.language || "en"];
  for (const pref of prefs) {
    const primary = String(pref).toLowerCase().split("-")[0];
    if (primary === "en" || primary === "fa") return primary;
  }
  return "en";
}

const tx = (value) => (value && typeof value === "object" ? value[lang] || value.en : value);

function el(tag, attrs, children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs || {})) {
    if (value == null) continue;
    if (key === "text") node.textContent = value;
    else node.setAttribute(key, value);
  }
  for (const child of children || []) if (child) node.append(child);
  return node;
}

function block(spec) {
  if (spec.type === "h2") return el("h2", { text: tx(spec) });
  if (spec.type === "p") return el("p", { text: tx(spec) });
  if (spec.type === "note") return el("p", { class: "note", text: tx(spec) });
  if (spec.type === "ul") {
    return el("ul", {}, spec.items.map((item) => el("li", { text: tx(item) })));
  }
  if (spec.type === "figure") {
    const img = el("img", {
      src: `media/${lang}/${spec.shot}.jpg`,
      alt: tx(spec),
      width: "540",
    });
    return el("figure", {}, [img, el("figcaption", { text: tx(spec) })]);
  }
  if (spec.type === "video") {
    const src = `../assets/games/dream-home/${lang}/${spec.file}-${lang}.mp4`;
    const video = el("video", { controls: "", playsinline: "", preload: "metadata", src });
    return el("figure", {}, [video, el("figcaption", { text: tx(spec) })]);
  }
  if (spec.type === "table") {
    const head = el("tr", {}, spec.headers.map((cell) => el("th", { text: tx(cell) })));
    const body = spec.rows.map((row) => el("tr", {}, row.map((cell) => el("td", { text: tx(cell) }))));
    return el("table", {}, [el("thead", {}, [head]), el("tbody", {}, body)]);
  }
  return null;
}

function render() {
  const pageId = document.body.dataset.page || "start";
  const page = PAGES.find((item) => item.id === pageId) || PAGES[0];
  const chrome = CHROME[lang];
  document.title = `${tx(page.title)} · ${chrome.kicker}`;
  const root = document.documentElement;
  root.lang = lang;
  root.dir = lang === "fa" ? "rtl" : "ltr";
  const switcher = document.querySelector(".lang-switch");
  if (switcher) switcher.setAttribute("aria-label", chrome.langLabel);
  const system = document.querySelector('[data-lang="system"]');
  if (system) system.textContent = chrome.system;
  for (const button of document.querySelectorAll("[data-lang]")) {
    button.setAttribute("aria-pressed", String(button.dataset.lang === choice));
  }

  const main = document.getElementById("guide");
  main.replaceChildren();
  main.append(
    el("a", { class: "guide__back", href: "../" , text: chrome.back }),
    el("p", { class: "guide__kicker", text: chrome.kicker }),
    el("h1", { text: tx(page.title) }),
    el("nav", { class: "guide__nav", "aria-label": chrome.kicker }, PAGES.map((item) => {
      const link = el("a", { href: item.href, text: tx(item.nav) });
      if (item.id === page.id) link.setAttribute("aria-current", "page");
      return link;
    })),
  );
  for (const spec of page.blocks) main.append(block(spec));
  root.classList.remove("i18n-pending");
}

function setChoice(next) {
  choice = next;
  try {
    if (next === "system") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, next);
  } catch { /* the choice still applies to this visit */ }
  lang = resolveLanguage(choice);
  render();
}

choice = readChoice();
lang = resolveLanguage(choice);
for (const button of document.querySelectorAll("[data-lang]")) {
  button.addEventListener("click", () => setChoice(button.dataset.lang));
}
window.addEventListener("languagechange", () => { if (choice === "system") setChoice("system"); });
render();
