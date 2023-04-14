
import itertools

vl = "eaoiu"
cl = "tnshrdlcmwfgypbvkjxqz"

for numvowels in [2, 3]:
    for v in itertools.combinations(vl,numvowels):
        for c in itertools.combinations(cl,6-numvowels):
            for res in itertools.permutations("".join(v)+"".join(c),6):
                res = list(res)
                res[0] = res[0].upper()
                for a in range(10):
                    for b in range(10):
                        toprint = "".join(res)+str(a)+str(b)+"\n"
                        print(toprint)
                        
                        


