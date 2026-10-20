import { Question } from '../types';
// Reviewed grouped orders. Equal items (or independent listing steps) may swap.
const groups: Record<string,string[][]> = {
  "001": [
    [
      "70%",
      "0.7"
    ],
    [
      "0.75",
      "3/4"
    ]
  ],
  "002": [
    [
      "3/8"
    ],
    [
      "2/5"
    ],
    [
      "1/2"
    ],
    [
      "3/4"
    ]
  ],
  "003": [
    [
      "B"
    ],
    [
      "A"
    ],
    [
      "C"
    ]
  ],
  "004": [
    [
      "Rectangle 4×6cm"
    ],
    [
      "Square 5cm side"
    ],
    [
      "Circle r=3cm"
    ]
  ],
  "005": [
    [
      "C"
    ],
    [
      "D"
    ],
    [
      "B"
    ],
    [
      "A"
    ]
  ],
  "006": [
    [
      "−8"
    ],
    [
      "−5"
    ],
    [
      "−2"
    ],
    [
      "0"
    ],
    [
      "3"
    ]
  ],
  "007": [
    [
      "2³",
      "√64"
    ],
    [
      "3²"
    ],
    [
      "4²"
    ]
  ],
  "008": [
    [
      "C"
    ],
    [
      "D"
    ],
    [
      "A"
    ],
    [
      "B"
    ]
  ],
  "009": [
    [
      "1.2²"
    ],
    [
      "√2.25"
    ],
    [
      "1.4²"
    ],
    [
      "1.5²"
    ]
  ],
  "010": [
    [
      "Triangle"
    ],
    [
      "Quadrilateral"
    ],
    [
      "Pentagon"
    ],
    [
      "Hexagon"
    ]
  ],
  "011": [
    [
      "1/3"
    ],
    [
      "0.34"
    ],
    [
      "35%",
      "7/20"
    ]
  ],
  "012": [
    [
      "A"
    ],
    [
      "B"
    ],
    [
      "C"
    ]
  ],
  "013": [
    [
      "2.5km"
    ],
    [
      "2,450m",
      "2.45km"
    ],
    [
      "2,400m"
    ]
  ],
  "014": [
    [
      "C"
    ],
    [
      "A"
    ],
    [
      "B"
    ]
  ],
  "015": [
    [
      "1 radian"
    ],
    [
      "60°"
    ],
    [
      "90°"
    ],
    [
      "135°"
    ]
  ],
  "016": [
    [
      "Rectangle"
    ],
    [
      "Equilateral Triangle"
    ],
    [
      "Square"
    ],
    [
      "Circle"
    ]
  ],
  "017": [
    [
      "Cube 3cm"
    ],
    [
      "Cuboid 2×6×5",
      "Cuboid 5×3×4"
    ],
    [
      "Cube 4cm"
    ]
  ],
  "018": [
    [
      "Triangle"
    ],
    [
      "Square"
    ],
    [
      "Pentagon"
    ],
    [
      "Hexagon"
    ]
  ],
  "019": [
    [
      "Cube"
    ],
    [
      "Square Pyramid"
    ],
    [
      "Tetrahedron"
    ],
    [
      "Sphere"
    ]
  ],
  "020": [
    [
      "Circle d=6cm",
      "Triangle 5,6,7"
    ],
    [
      "Square 6cm",
      "Rectangle 4×8"
    ]
  ],
  "021": [
    [
      "600g at £2.70"
    ],
    [
      "400g at £2.00"
    ],
    [
      "100g at £0.60",
      "250g at £1.50"
    ]
  ],
  "022": [
    [
      "Drawing an ace"
    ],
    [
      "Rolling a 6"
    ],
    [
      "Flipping heads",
      "Rolling even"
    ]
  ],
  "023": [
    [
      "00:30"
    ],
    [
      "09:45"
    ],
    [
      "12:00"
    ],
    [
      "21:15"
    ]
  ],
  "024": [
    [
      "45 miles in 45min",
      "60 miles in 1h"
    ],
    [
      "90km in 1h"
    ],
    [
      "100km in 90min"
    ]
  ],
  "025": [
    [
      "D"
    ],
    [
      "B"
    ],
    [
      "A"
    ],
    [
      "C"
    ]
  ],
  "026": [
    [
      "4:7"
    ],
    [
      "3:5"
    ],
    [
      "5:8"
    ],
    [
      "2:3"
    ]
  ],
  "027": [
    [
      "1:6"
    ],
    [
      "1:4"
    ],
    [
      "1:3"
    ],
    [
      "2:5"
    ]
  ],
  "028": [
    [
      "B"
    ],
    [
      "D"
    ],
    [
      "A"
    ],
    [
      "C"
    ]
  ],
  "029": [
    [
      "3x−2",
      "2x+1",
      "x³−20"
    ],
    [
      "x²"
    ]
  ],
  "030": [
    [
      "C"
    ],
    [
      "D"
    ],
    [
      "A"
    ],
    [
      "B"
    ]
  ],
  "031": [
    [
      "Mode"
    ],
    [
      "Median"
    ],
    [
      "Mean"
    ]
  ],
  "032": [
    [
      "B"
    ],
    [
      "A"
    ],
    [
      "C"
    ]
  ],
  "033": [
    [
      "17/25"
    ],
    [
      "0.69"
    ],
    [
      "71/100"
    ],
    [
      "72%"
    ]
  ],
  "034": [
    [
      "3.045"
    ],
    [
      "3.054"
    ],
    [
      "3.405"
    ],
    [
      "3.45"
    ]
  ],
  "035": [
    [
      "350"
    ],
    [
      "0.25×10³",
      "2.5×10²"
    ],
    [
      "2,400÷10"
    ]
  ],
  "036": [
    [
      "Triangle"
    ],
    [
      "Square"
    ],
    [
      "Pentagon"
    ],
    [
      "Octagon"
    ]
  ],
  "037": [
    [
      "P(rolling 1)"
    ],
    [
      "P(rolling odd)"
    ],
    [
      "P(rolling<5)"
    ],
    [
      "P(rolling≥1)"
    ]
  ],
  "038": [
    [
      "mega"
    ],
    [
      "kilo"
    ],
    [
      "centi"
    ],
    [
      "milli"
    ]
  ],
  "039": [
    [
      "C",
      "B"
    ],
    [
      "D"
    ],
    [
      "A"
    ]
  ],
  "040": [
    [
      "10m/s"
    ],
    [
      "30mph"
    ],
    [
      "50km/h"
    ],
    [
      "15m/s"
    ]
  ],
  "041": [
    [
      "11"
    ],
    [
      "9"
    ],
    [
      "16"
    ],
    [
      "12"
    ]
  ],
  "042": [
    [
      "B"
    ],
    [
      "A"
    ],
    [
      "C"
    ]
  ],
  "043": [
    [
      "115%"
    ],
    [
      "1.2"
    ],
    [
      "5/4",
      "1.25"
    ]
  ],
  "044": [
    [
      "D"
    ],
    [
      "C"
    ],
    [
      "B"
    ],
    [
      "A"
    ]
  ],
  "045": [
    [
      "Square s=6"
    ],
    [
      "Triangle b=10 h=8"
    ],
    [
      "Circle r=4"
    ],
    [
      "Rectangle 5×10"
    ]
  ],
  "046": [
    [
      "B"
    ],
    [
      "A"
    ],
    [
      "C"
    ]
  ],
  "047": [
    [
      "5 for £7"
    ],
    [
      "4 for £6"
    ],
    [
      "3 for £5"
    ],
    [
      "£1.80 each"
    ]
  ],
  "048": [
    [
      "Triangle"
    ],
    [
      "Quadrilateral"
    ],
    [
      "Pentagon"
    ],
    [
      "Hexagon"
    ]
  ],
  "049": [
    [
      "11/12"
    ],
    [
      "0.9"
    ],
    [
      "7/8"
    ],
    [
      "4/5"
    ]
  ],
  "050": [
    [
      "B",
      "D"
    ],
    [
      "C"
    ],
    [
      "A"
    ]
  ]
};
const patches: Record<string,Partial<Question>> = {
  "016": {
    "text": "Order from fewest to most lines of symmetry: Circle, Square, Equilateral Triangle, Rectangle. The rectangle is not a square."
  },
  "017": {
    "text": "Order these volumes from smallest to largest. All lengths are in centimetres: Cube side 4, Cuboid 5×3×4, Cube side 3, Cuboid 2×6×5."
  },
  "019": {
    "text": "Order from most to fewest flat faces: Sphere, Cube, Tetrahedron, Square Pyramid. Do not count a curved surface as a flat face.",
    "explanation": "Cube 6, square pyramid 5, tetrahedron 4, sphere 0 flat faces. A sphere has one continuous curved surface."
  },
  "020": {
    "text": "Order these perimeters from smallest to largest. All lengths are in centimetres: Square side 6, Rectangle 4×8, Triangle sides 5,6,7, Circle diameter 6. Use π=3."
  },
  "022": {
    "text": "Order from least to most likely. Use a fair six-sided die numbered 1 to 6, a fair coin and a standard 52-card deck with no jokers, with each card equally likely: Rolling a 6, Flipping heads, Drawing an ace, Rolling even."
  },
  "024": {
    "text": "Order these journeys by average speed, fastest first. Use 1 mile=1.609344 km:60 miles in 1h,90km in 1h,45 miles in 45min,100km in 90min.",
    "explanation": "Both mile-based journeys average 60mph =96.56064km/h. Next is 90km/h, then 100 ÷1.5 =66 2/3km/h. The two 60mph journeys tie."
  },
  "027": {
    "explanation": "The fractions of squash in the mixtures are 1/7,1/5,1/4 and 2/7 respectively in the correct order:1:6,1:4,1:3,2:5."
  },
  "029": {
    "text": "Order expressions from smallest to largest when x=3:2x+1, x²,3x−2, x³−20.",
    "explanation": "At x=3,2x+1=7,3x−2=7 and x³−20=7, while x²=9. The three expressions equal to 7 may appear in any order before x²."
  },
  "030": {
    "explanation": "Expand to 6x−8=10, add 8 to give 6x=18, divide by 2 to give 3x=9, then divide by 3 to obtain x=3."
  },
  "033": {
    "explanation": "17/25=0.68, then 0.69,71/100=0.71 and 72%=0.72."
  },
  "037": {
    "text": "For a fair six-sided die numbered 1 to 6, order these probabilities from least to greatest: P(rolling 1), P(rolling odd), P(rolling<5), P(rolling≥1)."
  },
  "040": {
    "text": "Order these speeds slowest to fastest. Use 1 mile=1.609344 km:10m/s,50km/h,30mph,15m/s.",
    "explanation": "10m/s=36km/h;30mph=48.28032km/h;50km/h;15m/s=54km/h."
  },
  "041": {
    "explanation": "11 has 2 positive factors;9 has 3;16 has 5;12 has 6. Order:11,9,16,12."
  },
  "043": {
    "explanation": "115%=1.15, then 1.2, then 5/4=1.25 and 1.25. The last two tie."
  },
  "044": {
    "text": "Order these sequences by their 10th term, smallest first, counting the first displayed term as term 1: A)2,4,8,16 (multiply by 2); B)1,4,9,16 (squares); C)1,1,2,3,5 (Fibonacci); D)3,6,9,12 (add 3).",
    "explanation": "The 10th terms are D:30, C:55, B:100, A:1024. Therefore D,C,B,A."
  },
  "045": {
    "text": "Order from smallest to largest area. All lengths are in centimetres: Triangle base 10 perpendicular height 8; Square side 6; Rectangle 5×10; Circle radius 4. Use π=3."
  },
  "047": {
    "text": "Order from cheapest to most expensive per item:3 for£5,5 for£7,£1.80 each,4 for£6. All items are identical."
  },
  "048": {
    "text": "Order by interior-angle sum, smallest first: Pentagon, Triangle, Quadrilateral, Hexagon."
  }
};
function permutations(items:string[]):string[][] { return items.length < 2 ? [items] : items.flatMap((x,i)=>permutations(items.filter((_,j)=>i!==j)).map(rest=>[x,...rest])); }
export function applyMathsOrderingReview(q:Question):Question {
 const id=q.id.slice(-3), grouped=groups[id]; if(!grouped)return q;
 let orders:string[][]=[[]];
 for(const group of grouped) orders=orders.flatMap(prefix=>permutations(group).map(p=>[...prefix,...p]));
 const acceptedOrders=orders.map(x=>x.join(','));
 return {...q,...patches[id],correctAnswer:acceptedOrders[0],marking:{kind:'ordering',acceptedOrders}};
}
