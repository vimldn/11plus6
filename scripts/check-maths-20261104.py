"""Independent calculations/enumerations for the 4 November original exercises."""
from itertools import permutations,combinations,product
assert sum([40,40,100])==180 and sum([35,65,80])==180
assert sum([30,70,80])==180 and max([30,70,80])<90
assert sum([45,45,90])==180 and 95+95>180
assert [(n+2,3*n,2*n) for n in (3,5,6)]==[(5,9,6),(7,15,10),(8,18,12)]
assert (5+1,2*5,5+1)==(6,10,6)
assert (49+7)/4-6==8 and (8+6)*4-7==49
assert (43+11)/6==9 and 9*6-11==43
assert 8*3-7==17 and (17+7)/3==8
assert (23-9)*2==28 and 28/2+9==23
assert 4*6+12==36 and (36-12)/4==6
assert 3*7+8==29
assert list(permutations('259',2))==[('2','5'),('2','9'),('5','2'),('5','9'),('9','2'),('9','5')]
assert list(combinations('ABCD',2))==[('A','B'),('A','C'),('A','D'),('B','C'),('B','D'),('C','D')]
assert [10*a+b for a,b in permutations((0,4,7),2) if a]!=[]
assert [10*a+b for a,b in permutations((0,4,7),2) if a]==[40,47,70,74]
assert [''.join(x) for x in product('XY',repeat=2)]==['XX','XY','YX','YY']
print('PASS independent angle sums, prism/pyramid structure, inverse forward checks and exhaustive enumeration')
