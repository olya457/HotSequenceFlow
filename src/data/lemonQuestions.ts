export interface LemonQuestion {
  id:      string;
  text:    string;
  options: string[];
  answer:  number; 
}

export interface LemonLevel {
  level:     number;
  questions: LemonQuestion[];
}

export const LEMON_LEVELS: LemonLevel[] = [
  {
    level: 1,
    questions: [
      {
        id: 'l1_q1',
        text: 'What was the primary purpose of the Treaty of Westphalia (1648)?',
        options: [
          'To establish colonial trade routes',
          'To end religious wars in Europe',
          'To unify German states',
          'To divide the Ottoman Empire',
        ],
        answer: 1,
      },
      {
        id: 'l1_q2',
        text: 'Which civilization first developed a writing system known as cuneiform?',
        options: ['Ancient Egypt', 'Indus Valley', 'Sumerians', 'Phoenicians'],
        answer: 2,
      },
      {
        id: 'l1_q3',
        text: 'Who was the first emperor of a unified China?',
        options: ['Liu Bang', 'Qin Shi Huang', 'Sun Tzu', 'Kublai Khan'],
        answer: 1,
      },
      {
        id: 'l1_q4',
        text: 'What is the capital of Kazakhstan?',
        options: ['Almaty', 'Tashkent', 'Astana (Nur-Sultan)', 'Bishkek'],
        answer: 2,
      },
      {
        id: 'l1_q5',
        text: 'Which philosopher is associated with the concept of the "categorical imperative"?',
        options: ['Aristotle', 'Immanuel Kant', 'Nietzsche', 'Descartes'],
        answer: 1,
      },
      {
        id: 'l1_q6',
        text: 'The Hagia Sophia was originally built as what?',
        options: ['Palace', 'Mosque', 'Cathedral', 'Fortress'],
        answer: 2,
      },
      {
        id: 'l1_q7',
        text: 'Which empire was ruled by Mansa Musa?',
        options: ['Songhai', 'Mali Empire', 'Ghana Empire', 'Axum'],
        answer: 1,
      },
    ],
  },

  {
    level: 2,
    questions: [
      {
        id: 'l2_q1',
        text: 'What is the longest river in South America?',
        options: ['Paraná', 'Orinoco', 'Amazon', 'Magdalena'],
        answer: 2,
      },
      {
        id: 'l2_q2',
        text: 'Who wrote "The Prince"?',
        options: ['Machiavelli', 'Hobbes', 'Rousseau', 'Locke'],
        answer: 0,
      },
      {
        id: 'l2_q3',
        text: 'Which country was formerly known as Persia?',
        options: ['Iraq', 'Iran', 'Syria', 'Turkey'],
        answer: 1,
      },
      {
        id: 'l2_q4',
        text: 'What year did the Berlin Wall fall?',
        options: ['1987', '1989', '1991', '1990'],
        answer: 1,
      },
      {
        id: 'l2_q5',
        text: 'Which ancient wonder was located in Babylon?',
        options: [
          'Hanging Gardens',
          'Colossus of Rhodes',
          'Lighthouse of Alexandria',
          'Temple of Artemis',
        ],
        answer: 0,
      },
      {
        id: 'l2_q6',
        text: 'Who discovered penicillin?',
        options: ['Pasteur', 'Fleming', 'Curie', 'Darwin'],
        answer: 1,
      },
      {
        id: 'l2_q7',
        text: 'What is the smallest country in the world?',
        options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'],
        answer: 1,
      },
    ],
  },

  {
    level: 3,
    questions: [
      {
        id: 'l3_q1',
        text: 'Which language family does Hungarian belong to?',
        options: ['Slavic', 'Germanic', 'Uralic', 'Romance'],
        answer: 2,
      },
      {
        id: 'l3_q2',
        text: 'What is the main ingredient of traditional Japanese miso?',
        options: ['Rice', 'Soybeans', 'Fish', 'Wheat'],
        answer: 1,
      },
      {
        id: 'l3_q3',
        text: 'Who painted "The School of Athens"?',
        options: ['Leonardo', 'Michelangelo', 'Raphael', 'Caravaggio'],
        answer: 2,
      },
      {
        id: 'l3_q4',
        text: 'Which empire built Machu Picchu?',
        options: ['Maya', 'Aztec', 'Inca', 'Olmec'],
        answer: 2,
      },
      {
        id: 'l3_q5',
        text: 'What is the official language of Brazil?',
        options: ['Spanish', 'Portuguese', 'French', 'English'],
        answer: 1,
      },
      {
        id: 'l3_q6',
        text: 'What is the study of earthquakes called?',
        options: ['Geology', 'Seismology', 'Meteorology', 'Volcanology'],
        answer: 1,
      },
      {
        id: 'l3_q7',
        text: 'Who was the first woman to win a Nobel Prize?',
        options: [
          'Marie Curie',
          'Rosalind Franklin',
          'Ada Lovelace',
          'Florence Nightingale',
        ],
        answer: 0,
      },
    ],
  },

  {
    level: 4,
    questions: [
      {
        id: 'l4_q1',
        text: 'What is the oldest continuously inhabited city?',
        options: ['Athens', 'Jericho', 'Rome', 'Damascus'],
        answer: 1,
      },
      {
        id: 'l4_q2',
        text: 'Which composer wrote the "Moonlight Sonata"?',
        options: ['Mozart', 'Beethoven', 'Bach', 'Chopin'],
        answer: 1,
      },
      {
        id: 'l4_q3',
        text: 'What is the hardest natural substance?',
        options: ['Quartz', 'Diamond', 'Graphite', 'Topaz'],
        answer: 1,
      },
      {
        id: 'l4_q4',
        text: 'Which country invented paper?',
        options: ['India', 'China', 'Egypt', 'Greece'],
        answer: 1,
      },
      {
        id: 'l4_q5',
        text: 'What is the capital of New Zealand?',
        options: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton'],
        answer: 1,
      },
      {
        id: 'l4_q6',
        text: 'Who was known as the "Iron Lady"?',
        options: [
          'Angela Merkel',
          'Margaret Thatcher',
          'Indira Gandhi',
          'Golda Meir',
        ],
        answer: 1,
      },
      {
        id: 'l4_q7',
        text: 'Which gas is most abundant in Earth\'s atmosphere?',
        options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Argon'],
        answer: 1,
      },
    ],
  },

  {
    level: 5,
    questions: [
      {
        id: 'l5_q1',
        text: 'What is the main language spoken in Argentina?',
        options: ['Portuguese', 'Spanish', 'Italian', 'French'],
        answer: 1,
      },
      {
        id: 'l5_q2',
        text: 'Who developed the theory of relativity?',
        options: ['Newton', 'Einstein', 'Galileo', 'Tesla'],
        answer: 1,
      },
      {
        id: 'l5_q3',
        text: 'Which ocean is the largest?',
        options: ['Atlantic', 'Pacific', 'Indian', 'Arctic'],
        answer: 1,
      },
      {
        id: 'l5_q4',
        text: 'What is the currency of Japan?',
        options: ['Yuan', 'Yen', 'Won', 'Dollar'],
        answer: 1,
      },
      {
        id: 'l5_q5',
        text: 'Which ancient civilization built pyramids in Mexico?',
        options: ['Inca', 'Aztec', 'Maya', 'Romans'],
        answer: 2,
      },
      {
        id: 'l5_q6',
        text: 'What is the chemical symbol for gold?',
        options: ['Ag', 'Au', 'Go', 'Gd'],
        answer: 1,
      },
      {
        id: 'l5_q7',
        text: 'Who wrote "1984"?',
        options: ['Orwell', 'Huxley', 'Bradbury', 'Kafka'],
        answer: 0,
      },
    ],
  },

  {
    level: 6,
    questions: [
      {
        id: 'l6_q1',
        text: 'Which empire was responsible for the construction of the extensive road system known as the Royal Road?',
        options: [
          'Roman Empire',
          'Persian Empire',
          'Ottoman Empire',
          'Byzantine Empire',
        ],
        answer: 1,
      },
      {
        id: 'l6_q2',
        text: 'What is the primary function of mitochondria in a cell?',
        options: [
          'Protein synthesis',
          'Energy production',
          'DNA storage',
          'Waste removal',
        ],
        answer: 1,
      },
      {
        id: 'l6_q3',
        text: 'Which city hosted the first modern Olympic Games in 1896?',
        options: ['Rome', 'Athens', 'Paris', 'London'],
        answer: 1,
      },
      {
        id: 'l6_q4',
        text: 'Who formulated the laws of motion?',
        options: ['Einstein', 'Newton', 'Galileo', 'Kepler'],
        answer: 1,
      },
      {
        id: 'l6_q5',
        text: 'What is the capital of Mongolia?',
        options: ['Astana', 'Ulaanbaatar', 'Bishkek', 'Tashkent'],
        answer: 1,
      },
      {
        id: 'l6_q6',
        text: 'Which element has the atomic number 1?',
        options: ['Helium', 'Hydrogen', 'Oxygen', 'Carbon'],
        answer: 1,
      },
      {
        id: 'l6_q7',
        text: 'Which war ended with the Treaty of Versailles?',
        options: ['World War II', 'World War I', 'Cold War', 'Napoleonic Wars'],
        answer: 1,
      },
    ],
  },

  {
    level: 7,
    questions: [
      {
        id: 'l7_q1',
        text: 'Which philosopher wrote "Republic"?',
        options: ['Socrates', 'Plato', 'Aristotle', 'Epicurus'],
        answer: 1,
      },
      {
        id: 'l7_q2',
        text: 'What is the capital of Canada?',
        options: ['Toronto', 'Ottawa', 'Vancouver', 'Montreal'],
        answer: 1,
      },
      {
        id: 'l7_q3',
        text: 'Which artist is known for the painting "Guernica"?',
        options: ['Dali', 'Picasso', 'Van Gogh', 'Monet'],
        answer: 1,
      },
      {
        id: 'l7_q4',
        text: 'What is the boiling point of water at sea level (°C)?',
        options: ['90', '100', '110', '120'],
        answer: 1,
      },
      {
        id: 'l7_q5',
        text: 'Which continent is the Sahara Desert located in?',
        options: ['Asia', 'Africa', 'Australia', 'South America'],
        answer: 1,
      },
      {
        id: 'l7_q6',
        text: 'Who was the first President of the United States?',
        options: ['Lincoln', 'Washington', 'Jefferson', 'Adams'],
        answer: 1,
      },
      {
        id: 'l7_q7',
        text: 'Which language is primarily spoken in Austria?',
        options: ['German', 'French', 'Italian', 'Dutch'],
        answer: 0,
      },
    ],
  },

  {
    level: 8,
    questions: [
      {
        id: 'l8_q1',
        text: 'What is the largest organ in the human body?',
        options: ['Liver', 'Skin', 'Heart', 'Brain'],
        answer: 1,
      },
      {
        id: 'l8_q2',
        text: 'Which scientist proposed the heliocentric model?',
        options: ['Ptolemy', 'Copernicus', 'Newton', 'Galileo'],
        answer: 1,
      },
      {
        id: 'l8_q3',
        text: 'What is the capital of South Korea?',
        options: ['Busan', 'Seoul', 'Incheon', 'Daegu'],
        answer: 1,
      },
      {
        id: 'l8_q4',
        text: 'Which country is known as the Land of the Rising Sun?',
        options: ['China', 'Japan', 'Thailand', 'Vietnam'],
        answer: 1,
      },
      {
        id: 'l8_q5',
        text: 'What is the square root of 144?',
        options: ['10', '12', '14', '16'],
        answer: 1,
      },
      {
        id: 'l8_q6',
        text: 'Who wrote "The Odyssey"?',
        options: ['Homer', 'Virgil', 'Plato', 'Sophocles'],
        answer: 0,
      },
      {
        id: 'l8_q7',
        text: 'Which metal is liquid at room temperature?',
        options: ['Iron', 'Mercury', 'Aluminum', 'Copper'],
        answer: 1,
      },
    ],
  },

  
  {
    level: 9,
    questions: [
      {
        id: 'l9_q1',
        text: 'Which ancient city was buried by a volcanic eruption in 79 AD?',
        options: ['Troy', 'Pompeii', 'Athens', 'Carthage'],
        answer: 1,
      },
      {
        id: 'l9_q2',
        text: 'What is the currency of Switzerland?',
        options: ['Euro', 'Swiss Franc', 'Krona', 'Pound'],
        answer: 1,
      },
      {
        id: 'l9_q3',
        text: 'Who painted the Mona Lisa?',
        options: ['Michelangelo', 'Leonardo da Vinci', 'Raphael', 'Donatello'],
        answer: 1,
      },
      {
        id: 'l9_q4',
        text: 'What is the largest planet in the Solar System?',
        options: ['Earth', 'Jupiter', 'Saturn', 'Neptune'],
        answer: 1,
      },
      {
        id: 'l9_q5',
        text: 'Which country has the most population?',
        options: ['India', 'China', 'USA', 'Indonesia'],
        answer: 1,
      },
      {
        id: 'l9_q6',
        text: 'What is the freezing point of water (°C)?',
        options: ['0', '5', '-5', '10'],
        answer: 0,
      },
      {
        id: 'l9_q7',
        text: 'Which ocean lies between Africa and Australia?',
        options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'],
        answer: 1,
      },
    ],
  },

  {
    level: 10,
    questions: [
      {
        id: 'l10_q1',
        text: 'Who was the first man to walk on the Moon?',
        options: ['Buzz Aldrin', 'Neil Armstrong', 'Yuri Gagarin', 'John Glenn'],
        answer: 1,
      },
      {
        id: 'l10_q2',
        text: 'What is the capital of Spain?',
        options: ['Barcelona', 'Madrid', 'Valencia', 'Seville'],
        answer: 1,
      },
      {
        id: 'l10_q3',
        text: 'Which instrument measures atmospheric pressure?',
        options: ['Thermometer', 'Barometer', 'Hygrometer', 'Anemometer'],
        answer: 1,
      },
      {
        id: 'l10_q4',
        text: 'What is the chemical symbol for oxygen?',
        options: ['Ox', 'O₂', 'O', 'Og'],
        answer: 2,
      },
      {
        id: 'l10_q5',
        text: 'Which country is famous for the Great Wall?',
        options: ['Japan', 'China', 'Korea', 'Mongolia'],
        answer: 1,
      },
      {
        id: 'l10_q6',
        text: 'Who discovered gravity (legendary apple story)?',
        options: ['Einstein', 'Newton', 'Galileo', 'Tesla'],
        answer: 1,
      },
      {
        id: 'l10_q7',
        text: 'What is the fastest land animal?',
        options: ['Lion', 'Cheetah', 'Horse', 'Tiger'],
        answer: 1,
      },
    ],
  },

  {
    level: 11,
    questions: [
      {
        id: 'l11_q1',
        text: 'Which ancient library was one of the largest centers of knowledge in the classical world?',
        options: [
          'Library of Pergamon',
          'Library of Alexandria',
          'Imperial Library of Rome',
          'House of Wisdom',
        ],
        answer: 1,
      },
      {
        id: 'l11_q2',
        text: 'What is the SI unit of electrical resistance?',
        options: ['Volt', 'Ampere', 'Ohm', 'Watt'],
        answer: 2,
      },
      {
        id: 'l11_q3',
        text: 'Which country has the longest coastline in the world?',
        options: ['Australia', 'Russia', 'Canada', 'USA'],
        answer: 2,
      },
      {
        id: 'l11_q4',
        text: 'Who composed "The Four Seasons"?',
        options: ['Bach', 'Vivaldi', 'Handel', 'Mozart'],
        answer: 1,
      },
      {
        id: 'l11_q5',
        text: 'What is the capital of Argentina?',
        options: ['Santiago', 'Buenos Aires', 'Lima', 'Montevideo'],
        answer: 1,
      },
      {
        id: 'l11_q6',
        text: 'Which philosopher is known for the phrase "I think, therefore I am"?',
        options: ['Kant', 'Descartes', 'Locke', 'Hume'],
        answer: 1,
      },
      {
        id: 'l11_q7',
        text: 'Which planet is known for its rings?',
        options: ['Mars', 'Saturn', 'Uranus', 'Jupiter'],
        answer: 1,
      },
    ],
  },


  {
    level: 12,
    questions: [
      {
        id: 'l12_q1',
        text: 'Which element has the chemical symbol "Na"?',
        options: ['Nitrogen', 'Sodium', 'Neon', 'Nickel'],
        answer: 1,
      },
      {
        id: 'l12_q2',
        text: 'What is the tallest mountain in the world (above sea level)?',
        options: ['K2', 'Everest', 'Kilimanjaro', 'Denali'],
        answer: 1,
      },
      {
        id: 'l12_q3',
        text: 'Which empire was centered in Constantinople?',
        options: ['Roman', 'Byzantine', 'Ottoman', 'Persian'],
        answer: 1,
      },
      {
        id: 'l12_q4',
        text: 'What is the capital of Turkey?',
        options: ['Istanbul', 'Ankara', 'Izmir', 'Bursa'],
        answer: 1,
      },
      {
        id: 'l12_q5',
        text: 'Who painted "The Starry Night"?',
        options: ['Monet', 'Van Gogh', 'Renoir', 'Cézanne'],
        answer: 1,
      },
      {
        id: 'l12_q6',
        text: 'What is the primary gas in the Sun?',
        options: ['Oxygen', 'Hydrogen', 'Helium', 'Nitrogen'],
        answer: 1,
      },
      {
        id: 'l12_q7',
        text: 'Which country uses the krona as currency?',
        options: ['Sweden', 'Denmark', 'Norway', 'Iceland'],
        answer: 0,
      },
    ],
  },


  {
    level: 13,
    questions: [
      {
        id: 'l13_q1',
        text: 'Which war is known as the "Great War"?',
        options: ['World War II', 'World War I', 'Cold War', 'Crimean War'],
        answer: 1,
      },
      {
        id: 'l13_q2',
        text: 'What is the capital of Egypt?',
        options: ['Alexandria', 'Cairo', 'Giza', 'Luxor'],
        answer: 1,
      },
      {
        id: 'l13_q3',
        text: 'Which scientist developed the laws of planetary motion?',
        options: ['Galileo', 'Kepler', 'Newton', 'Copernicus'],
        answer: 1,
      },
      {
        id: 'l13_q4',
        text: 'Which ocean is the deepest?',
        options: ['Atlantic', 'Pacific', 'Indian', 'Arctic'],
        answer: 1,
      },
      {
        id: 'l13_q5',
        text: 'Who wrote "Don Quixote"?',
        options: ['Dante', 'Cervantes', 'Shakespeare', 'Goethe'],
        answer: 1,
      },
      {
        id: 'l13_q6',
        text: 'What is the smallest bone in the human body?',
        options: ['Femur', 'Stapes', 'Tibia', 'Radius'],
        answer: 1,
      },
      {
        id: 'l13_q7',
        text: 'Which country is home to Machu Picchu?',
        options: ['Chile', 'Peru', 'Bolivia', 'Ecuador'],
        answer: 1,
      },
    ],
  },

  {
    level: 14,
    questions: [
      {
        id: 'l14_q1',
        text: 'What is the speed of light in vacuum (approx.)?',
        options: ['300,000 km/s', '150,000 km/s', '1,000 km/s', '3,000 km/s'],
        answer: 0,
      },
      {
        id: 'l14_q2',
        text: 'Which country has the city of Marrakech?',
        options: ['Egypt', 'Morocco', 'Tunisia', 'Algeria'],
        answer: 1,
      },
      {
        id: 'l14_q3',
        text: 'Who was the author of "The Divine Comedy"?',
        options: ['Petrarch', 'Dante', 'Boccaccio', 'Virgil'],
        answer: 1,
      },
      {
        id: 'l14_q4',
        text: 'What is the main component of natural gas?',
        options: ['Propane', 'Methane', 'Butane', 'Ethane'],
        answer: 1,
      },
      {
        id: 'l14_q5',
        text: 'Which ancient civilization developed the concept of democracy?',
        options: ['Romans', 'Greeks', 'Egyptians', 'Persians'],
        answer: 1,
      },
      {
        id: 'l14_q6',
        text: 'What is the capital of Norway?',
        options: ['Stockholm', 'Oslo', 'Copenhagen', 'Helsinki'],
        answer: 1,
      },
      {
        id: 'l14_q7',
        text: 'Which organ pumps blood through the body?',
        options: ['Brain', 'Heart', 'Liver', 'Lungs'],
        answer: 1,
      },
    ],
  },

  {
    level: 15,
    questions: [
      {
        id: 'l15_q1',
        text: 'Which country is the origin of the Renaissance?',
        options: ['France', 'Italy', 'Germany', 'Spain'],
        answer: 1,
      },
      {
        id: 'l15_q2',
        text: 'What is the largest desert in the world?',
        options: ['Sahara', 'Antarctic Desert', 'Arabian', 'Gobi'],
        answer: 1,
      },
      {
        id: 'l15_q3',
        text: 'Who discovered radioactivity?',
        options: ['Einstein', 'Becquerel', 'Curie', 'Rutherford'],
        answer: 1,
      },
      {
        id: 'l15_q4',
        text: 'What is the capital of Finland?',
        options: ['Oslo', 'Helsinki', 'Riga', 'Tallinn'],
        answer: 1,
      },
      {
        id: 'l15_q5',
        text: 'Which philosopher taught Alexander the Great?',
        options: ['Plato', 'Aristotle', 'Socrates', 'Pythagoras'],
        answer: 1,
      },
      {
        id: 'l15_q6',
        text: 'Which element is essential for breathing?',
        options: ['Hydrogen', 'Oxygen', 'Nitrogen', 'Carbon'],
        answer: 1,
      },
      {
        id: 'l15_q7',
        text: 'Which sea separates Europe and Africa?',
        options: ['Black Sea', 'Mediterranean Sea', 'Red Sea', 'Baltic Sea'],
        answer: 1,
      },
    ],
  },
];

export const getLevelData = (level: number): LemonLevel | undefined =>
  LEMON_LEVELS.find(l => l.level === level);

export const MAX_LEVEL = LEMON_LEVELS.length; 