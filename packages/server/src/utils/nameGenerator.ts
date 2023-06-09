const NAMES = [
  'Alex',
  'Alisa Bosconovitch',
  'Ancient Ogre',
  'Angel',
  'Anna Williams',
  'Armor King I/II',
  'Asuka Kazama',
  'Azazel',
  'Baek Doo San',
  'Bob Richards',
  'Bruce Irvin',
  'Bryan Fury',
  'Christie Monteiro',
  'Claudio Serafino',
  'Combot',
  'Craig Marduk',
  'Crow',
  'Devil Jin',
  'Devil Kazumi',
  'Devil Kazuya',
  'Doctor Bosconovitch',
  'Eddy Gordo',
  'Eliza',
  'Fahkumram',
  'Feng Wei',
  'Forest Law',
  'Ganryu',
  'Geese Howard',
  'Gigas',
  'Gon',
  'Gun Jack',
  'Halloween Dragunov',
  'Heihachi Mishima',
  'Hwoarang',
  'Isaak',
  'Jack',
  'Jaycee',
  'Jin Kazama',
  'Jinpachi Mishima',
  'Josie Rizal',
  'Julia Chang',
  'Jun Kazama',
  'Katarina Alves',
  'Kazumi Mishima',
  'Kazuya Mishima',
  'King I/II',
  'Kinjin',
  'Kuma I/II',
  'Kunimitsu I/II',
  'Lars Alexandersson',
  'Lee Chaolan',
  'Lei Wulong',
  'Leo Kliesen',
  'Leroy Smith',
  'Lidia Sobieska',
  'Lili De Rochefort',
  'Ling Xiaoyu',
  'Lucky Chloe',
  'Marshall Law',
  'Master Raven',
  'Michelle Chang',
  'Miguel Caballero Rojo',
  'Miharu Hirano',
  'Mokujin',
  'NANCY-MI847J',
  'Negan Smith',
  'Nina Williams',
  'Noctis Lucis Caelum',
  'Panda',
  'Paul Phoenix',
  'Prototype Jack',
  'Raven',
  'Revenant',
  'Rodeo',
  'Roger',
  'Roger Jr.',
  'Ruby',
  'Sebastian',
  'Sergei Dragunov',
  'Shaheen',
  'Slim Bob',
  'Steve Fox',
  'Summer Asuka',
  'Summer Bob',
  'Summer Lili',
  'Summer Nina',
  'Super Combot DX',
  'Tetsujin',
  'Tiger Jackson',
  'Tiger Miyagi',
  'True Ogre',
  'Unknown',
  'Violet',
  'Wang Jinrei',
  'Yoshimitsu',
  'Yue',
  'Zafina',
  'Total',
  'Abel',
  'Abigail',
  'Adon',
  'Akira',
  'Akuma',
  'Balrog',
  'Birdie',
  'Blanka',
  'C. Viper',
  'Cammy',
  'Chun-Li',
  'Cody',
  'Dan',
  'Decapre',
  'Dee Jay',
  'Dhalsim',
  'Dudley',
  'E. Honda',
  'Eagle',
  'Ed',
  'El Fuerte',
  'Elena',
  'Eleven',
  'Evil Ryu',
  'F.A.N.G.',
  'Falke',
  'Fei Long',
  'G',
  'Geki',
  'Gen',
  'Gill',
  'Gouken',
  'Guile',
  'Guy',
  'Hakan',
  'Hugo',
  'Ibuki',
  'Ingrid',
  'Jamie',
  'Joe',
  'JP',
  'Juli',
  'Juni',
  'Juri',
  'Kage',
  'Karin',
  'Ken',
  'Kimberly',
  'Kolin',
  'Laura',
  'Lee',
  'Lily',
  'Lucia',
  'Luke',
  'M. Bison',
  'Maki',
  'Makoto',
  'Manon',
  'Marisa',
  'Menat',
  'Mike',
  'Nash',
  'Necalli',
  'Necro',
  'Oni',
  'Oro',
  'Poison',
  'Q',
  'R. Mika',
  'Rashid',
  'Remy',
  'Retsu',
  'Rolento',
  'Rose',
  'Rufus',
  'Ryu',
  'Sagat',
  'Sakura',
  'Santamu',
  'Sean',
  'Seth',
  'Shin Akuma',
  'Sodom',
  'T. Hawk',
  'Twelve',
  'Urien',
  'Vega',
  'Violent Ken',
  'Yang',
  'Yun',
  'Zangief',
  'Zeku',
  'Total',
];

export function nameGenerator() {
  return NAMES[Math.floor(Math.random() * NAMES.length)];
}
