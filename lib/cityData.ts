// lib/cityData.ts
// Unique 11+ context per city — used to differentiate tutor city pages.
// Each entry provides: local grammar schools, exam board used, county/area
// context, and a short intro paragraph specific to that city.

export interface CityData {
  examBoard: string;
  countyContext: string;
  intro: string;
  grammarSchools: string[];
  prepTip: string;
}

export const CITY_DATA: Record<string, CityData> = {
  birmingham: {
    examBoard: 'GL Assessment',
    countyContext: 'Birmingham and the West Midlands',
    intro:
      'Birmingham has a strong selective school tradition, with several highly oversubscribed grammar schools drawing applicants from across the West Midlands. Competition is intense — many schools receive five or more applications per place — so structured, early preparation is essential.',
    grammarSchools: [
      'King Edward VI Handsworth School for Girls',
      'King Edward VI Aston School',
      'King Edward VI Camp Hill School for Boys',
      'King Edward VI Camp Hill School for Girls',
      'King Edward VI Five Ways School',
      'Sutton Coldfield Grammar School for Girls',
    ],
    prepTip:
      'Birmingham 11+ papers use GL Assessment-style multiple choice. Timed practice under exam conditions is particularly important given the high competition for places.',
  },

  bristol: {
    examBoard: 'GL Assessment',
    countyContext: 'Bristol and South Gloucestershire',
    intro:
      'Bristol and the surrounding South Gloucestershire area have a small number of selective grammar schools. Many families also consider independent schools in the city, which set their own entrance papers. Preparation typically needs to cover both GL-style and school-set formats.',
    grammarSchools: [
      'Colston\'s Girls\' School (selective stream)',
      'Bristol Grammar School (independent with bursaries)',
      'Redmaids\' High School',
    ],
    prepTip:
      'Some Bristol independent schools use ISEB Pre-Test alongside their own papers. Check the admissions page of each target school carefully before starting preparation.',
  },

  cardiff: {
    examBoard: 'School-set papers',
    countyContext: 'Cardiff and South Wales',
    intro:
      'Cardiff does not operate the English grammar school system, but several high-performing Welsh-medium schools and selective independent schools use entrance assessments. Families targeting top independent schools in Cardiff should prepare for school-set English, Maths, and reasoning papers.',
    grammarSchools: [
      'Cardiff Sixth Form College (senior entry)',
      'Howells School Cardiff (independent)',
      'Cardiff High School (catchment-based with high attainment)',
    ],
    prepTip:
      'For Welsh-medium selective schools, strong literacy in both English and Welsh is an advantage. Independent school assessments in Cardiff typically test Maths and English comprehension.',
  },

  coventry: {
    examBoard: 'GL Assessment',
    countyContext: 'Coventry and Warwickshire',
    intro:
      'Coventry sits close to some of the most competitive grammar school areas in the Midlands. Families in and around the city often target grammar schools in Warwickshire, which use GL Assessment-style papers and have strict catchment and distance criteria.',
    grammarSchools: [
      'Lawrence Sheriff School (Rugby)',
      'Rugby High School for Girls',
      'Ashlawn School (selective places)',
      'Alcester Grammar School',
    ],
    prepTip:
      'Warwickshire grammar schools use GL Assessment format. Registration typically opens in the summer term of Year 5 — check dates early as missing the deadline bars entry.',
  },

  derby: {
    examBoard: 'GL Assessment',
    countyContext: 'Derby and Derbyshire',
    intro:
      'Derby has a small selective school sector, with grammar schools in and around the city drawing from a wide catchment. Some families in Derbyshire also consider selective schools across the border in Nottinghamshire. GL Assessment multiple-choice papers are the standard format.',
    grammarSchools: [
      'Derbys Grammar School (independent)',
      'Ecclesbourne School (partial selection)',
      'Silverhill School (independent prep)',
    ],
    prepTip:
      'For fully selective grammar schools near Derby, Verbal Reasoning and Non-Verbal Reasoning are tested alongside Maths and English. Starting preparation in Year 4 is advisable.',
  },

  edinburgh: {
    examBoard: 'School-set papers',
    countyContext: 'Edinburgh and the Lothians',
    intro:
      'Scotland does not operate grammar schools, but Edinburgh has several high-achieving independent schools that use competitive entrance assessments. These typically include Maths, English comprehension, and creative writing papers set by the schools themselves.',
    grammarSchools: [
      'George Heriot\'s School',
      'The Edinburgh Academy',
      'George Watson\'s College',
      'Fettes College',
      'St George\'s School for Girls',
    ],
    prepTip:
      'Edinburgh independent school assessments place a strong emphasis on written English, including creative writing tasks. Practice should include timed essay and comprehension work alongside Maths.',
  },

  glasgow: {
    examBoard: 'School-set papers',
    countyContext: 'Glasgow and the West of Scotland',
    intro:
      'Like Edinburgh, Glasgow operates under the Scottish education system without grammar schools. However, several independent day schools in the city hold competitive entry assessments for S1 (Year 7 equivalent) entry. Preparation focuses on Maths and English papers set by individual schools.',
    grammarSchools: [
      'The Glasgow Academy',
      'Glasgow High School',
      'Kelvinside Academy',
      'Hutchesons\' Grammar School',
      'St Aloysius\' College',
    ],
    prepTip:
      'Hutchesons\' Grammar School is one of the most competitive independent schools in Scotland. Its entrance exam covers Maths, English, and Verbal Reasoning — start preparation at least a year in advance.',
  },

  leeds: {
    examBoard: 'GL Assessment',
    countyContext: 'Leeds and West Yorkshire',
    intro:
      'Leeds has a selective school sector drawing from across West Yorkshire. Grammar schools in and around the city are highly sought after, with competition particularly strong in areas like Harrogate and Bradford. GL Assessment-style papers are used, covering Verbal Reasoning, Non-Verbal Reasoning, English, and Maths.',
    grammarSchools: [
      'Roundhay School (selective places)',
      'Lawnswood School (selective stream)',
      'Bradford Grammar School (independent)',
      'Harrogate Grammar School',
      'St Aidan\'s Church of England High School',
    ],
    prepTip:
      'West Yorkshire grammar schools use GL Assessment. The pass mark varies year to year based on cohort performance — aim for consistent practice scores well above 80% before the exam.',
  },

  leicester: {
    examBoard: 'GL Assessment',
    countyContext: 'Leicester and Leicestershire',
    intro:
      'Leicester and the surrounding Leicestershire area have a number of selective grammar schools, some of which are among the most oversubscribed in the East Midlands. The 11+ tests use GL Assessment format, and registration deadlines are typically in early summer of Year 5.',
    grammarSchools: [
      'Dixie Grammar School',
      'Hinckley Academy and John Cleveland Sixth Form',
      'Manor High School (Academy)',
      'Gateway College',
    ],
    prepTip:
      'Leicestershire grammar schools are competitive. Focus on timed GL Assessment practice papers from Year 4 onwards, with particular attention to Non-Verbal Reasoning which many children find unfamiliar.',
  },

  liverpool: {
    examBoard: 'GL Assessment',
    countyContext: 'Liverpool and Merseyside',
    intro:
      'Merseyside has a significant grammar school sector, with several highly regarded schools in Wirral, Southport, and the wider Liverpool area. These schools are popular and competitive, drawing from a broad geographic catchment. GL Assessment papers are used throughout the region.',
    grammarSchools: [
      'Calday Grange Grammar School',
      'West Kirby Grammar School for Girls',
      'Upton Hall School FCJ',
      'Birkenhead School (independent)',
      'Liverpool Blue Coat School',
      'Merchant Taylors\' School Crosby',
    ],
    prepTip:
      'Wirral grammar schools are especially competitive. Some schools in this area also interview shortlisted candidates — check individual admissions policies carefully.',
  },

  london: {
    examBoard: 'GL Assessment / CEM / School-set',
    countyContext: 'London and the Home Counties',
    intro:
      'London has one of the most varied and competitive selective school landscapes in England. North London grammar schools (such as those in Barnet and Enfield) use GL Assessment format, while South London consortium schools (including the SET exam) use a different style. Many top independent schools use ISEB Pre-Test or their own papers.',
    grammarSchools: [
      'Queen Elizabeth\'s School Barnet',
      'The Henrietta Barnett School',
      'Latymer School Edmonton',
      'Tiffin School',
      'Tiffin Girls\' School',
      'Nonsuch High School for Girls',
      'Wallington High School for Girls',
      'Wilson\'s School',
      'St Olave\'s Grammar School',
    ],
    prepTip:
      'London\'s grammar schools are among the most competitive in England. Many children sit multiple tests (North London GL, South London SET, and independent school assessments) — tailor your preparation to each format.',
  },

  manchester: {
    examBoard: 'GL Assessment / CEM',
    countyContext: 'Greater Manchester and Cheshire',
    intro:
      'Greater Manchester has a strong selective school sector, with grammar schools in Trafford, Sale, and Altrincham consistently ranking among the highest-performing in the country. Competition is fierce, and the Trafford schools use CEM-style assessments which differ from the more common GL format.',
    grammarSchools: [
      'Altrincham Grammar School for Boys',
      'Altrincham Grammar School for Girls',
      'Sale Grammar School',
      'Stretford Grammar School',
      'Urmston Grammar School',
      'Loreto Grammar School',
    ],
    prepTip:
      'Trafford grammar schools use CEM-style papers, which are designed to be less coachable and less predictable than GL Assessment. Focus on building genuine underlying skills rather than drilling question types.',
  },

  newcastle: {
    examBoard: 'GL Assessment',
    countyContext: 'Newcastle and the North East',
    intro:
      'Newcastle and the wider North East has a selective school sector with grammar schools in areas including North Tyneside and County Durham. The region is less saturated than London or the Midlands, but schools are still competitive and preparation is important.',
    grammarSchools: [
      'Royal Grammar School Newcastle (independent)',
      'Dame Allan\'s Schools',
      'Newcastle High School for Girls (GDST)',
      'Emmanuel College Gateshead (selective places)',
    ],
    prepTip:
      'North East independent schools often run their own entrance assessments in addition to or instead of GL-style tests. Contact your target schools directly to confirm the exact format used.',
  },

  nottingham: {
    examBoard: 'GL Assessment',
    countyContext: 'Nottingham and Nottinghamshire',
    intro:
      'Nottingham has a selective school sector with grammar schools serving the city and surrounding Nottinghamshire. The 11+ uses GL Assessment-style papers, and several schools are highly regarded for academic outcomes. Independent schools in Nottingham also hold their own entrance assessments.',
    grammarSchools: [
      'Nottingham High School (independent)',
      'Nottingham Girls\' High School (GDST)',
      'The Becket School (selective sixth form entry)',
      'Bluecoat Academy (selective places)',
    ],
    prepTip:
      'Nottinghamshire grammar schools use GL Assessment format. Verbal Reasoning and Non-Verbal Reasoning are typically the most discriminating sections — prioritise these alongside Maths.',
  },

  oxford: {
    examBoard: 'GL Assessment / School-set',
    countyContext: 'Oxford and Oxfordshire',
    intro:
      'Oxford and Oxfordshire have grammar schools in several areas including Abingdon, Henley, and Wallingford, as well as highly competitive independent schools. The county uses GL Assessment-style papers for state grammar schools. Oxford\'s independent schools, including some of the most prestigious in England, set their own entrance assessments.',
    grammarSchools: [
      'Abingdon School (independent)',
      'Oxford High School (GDST, independent)',
      'Cherwell School (academy with selective places)',
      'Wheatley Park School',
    ],
    prepTip:
      'For Oxford independent schools, preparation should include verbal reasoning, mathematical problem solving, and strong written English. Some schools also require a creative writing sample at interview stage.',
  },

  reading: {
    examBoard: 'GL Assessment',
    countyContext: 'Reading and Berkshire',
    intro:
      'Berkshire has a strong selective school tradition, particularly in Reading, Slough, and Windsor. Grammar schools in this area are competitive and use GL Assessment format. Slough and Eton consortium schools are among the most oversubscribed in the South East.',
    grammarSchools: [
      'Reading School',
      'Kendrick School',
      'Upton Court Grammar School',
      'Herschel Grammar School',
      'Langley Grammar School',
      'St Bernard\'s Catholic Grammar School',
    ],
    prepTip:
      'Berkshire grammar schools use GL Assessment and are among the most competitive outside London. Reading School and Kendrick School in particular have very high qualifying score thresholds.',
  },

  sheffield: {
    examBoard: 'GL Assessment',
    countyContext: 'Sheffield and South Yorkshire',
    intro:
      'Sheffield has a selective school sector with grammar schools serving the city and surrounding South Yorkshire areas. Some schools in the region also admit on the basis of aptitude in specific subjects. Independent schools in Sheffield set their own entrance assessments.',
    grammarSchools: [
      'Sheffield High School for Girls (GDST, independent)',
      'Birkdale School (independent)',
      'Notre Dame High School (selective places)',
      'King Edward VII School (partially selective)',
    ],
    prepTip:
      'Sheffield grammar and selective schools use a range of formats. Check whether your target school uses GL Assessment, a school-set paper, or aptitude testing, as preparation strategies differ.',
  },

  southampton: {
    examBoard: 'GL Assessment',
    countyContext: 'Southampton and Hampshire',
    intro:
      'Hampshire operates one of the largest selective school systems in England, with grammar schools across Southampton, Winchester, Alton, and Basingstoke. The county uses GL Assessment-style papers and has its own Hampshire 11+ process with a shared registration system.',
    grammarSchools: [
      'King Edward VI School Southampton',
      'Bargate School',
      'The Mountbatten School',
      'Peter Symonds College (selective sixth form)',
      'Henry Beaufort School Winchester',
    ],
    prepTip:
      'Hampshire grammar schools use GL Assessment and have a shared registration deadline in the spring of Year 5. Missing this deadline means your child cannot sit the test — check dates carefully.',
  },

  brighton: {
    examBoard: 'School-set / GL Assessment',
    countyContext: 'Brighton and East Sussex',
    intro:
      'Brighton and Hove has a small selective school sector alongside a number of well-regarded independent schools. East Sussex grammar schools use GL Assessment-style papers, while independent schools in Brighton set their own entrance assessments covering English and Maths.',
    grammarSchools: [
      'Brighton College (independent)',
      'Roedean School (independent)',
      'Hove Park School (partially selective)',
      'Lewes Old Grammar School',
    ],
    prepTip:
      'For independent schools in Brighton, English comprehension and creative writing carry significant weight alongside Maths. Start preparation early and include regular timed writing practice.',
  },

  bradford: {
    examBoard: 'GL Assessment',
    countyContext: 'Bradford and West Yorkshire',
    intro:
      'Bradford sits within the West Yorkshire grammar school belt, with selective schools in Bradford, Bingley, and the surrounding area. Grammar schools here are competitive and popular with families across the district. GL Assessment-style papers are used for all state grammar school entry in the area.',
    grammarSchools: [
      'Bradford Grammar School (independent)',
      'Bingley Grammar School',
      'Beckfoot Upper Heaton',
      'Thornton Grammar School',
    ],
    prepTip:
      'Bradford Grammar School is an independent school with its own entrance exam, while state grammar schools in the area use GL Assessment. Make sure your preparation matches the format of your specific target schools.',
  },
};

/**
 * Returns city data for a given city slug, or a sensible generic fallback.
 */
export function getCityData(slug: string): CityData {
  return CITY_DATA[slug] ?? {
    examBoard: 'GL Assessment',
    countyContext: slug.charAt(0).toUpperCase() + slug.slice(1),
    intro: `Families in and around ${slug.charAt(0).toUpperCase() + slug.slice(1)} preparing for the 11+ should confirm which schools they are targeting and the test style used — GL Assessment-style multiple choice, CEM-style formats, or school-set papers.`,
    grammarSchools: [],
    prepTip: 'Start preparation in Year 4 or early Year 5, focusing on timed practice papers and reviewing mistakes carefully.',
  };
}
