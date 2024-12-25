import collections
import math
import operator

def parse_input(filename):
    with open(filename, 'r') as f:
        s = f.read()
    return s

def part1(s):
    ls = iter(s.splitlines())
    l = next(ls)
    values = {}
    while l != "":
        a, b = l.split(": ")
        values[a] = int(b)
        l = next(ls)
    
    l = next(ls)
    ops = {"AND": operator.and_, "OR": operator.or_, "XOR": operator.xor}
    
    class Node:
        def __init__(self, a, b, op, c, next_=None):
            self.a = a
            self.b = b
            self.op = ops[op]
            self.c = c
            self.next_ = next_

    last = None
    while l is not None:
        a, op, b, _, c = l.split()
        node = Node(a, b, op, c, last)
        last = node
        l = next(ls, None)
    
    head = last
    while head is not None:
        node = head
        last = None
        while node is not None:
            if node.a in values and node.b in values:
                values[node.c] = node.op(values[node.a], values[node.b])
                if last is not None:
                    last.next_ = node.next_
                else:
                    head = node.next_
            else:
                last = node
            node = node.next_
    
    return int("".join(map(lambda x: str(x[1]), sorted((v for v in values.items() if v[0][0] == "z"), key=lambda x: x[0], reverse=True))), 2)

def part2(s):
    ls = iter(s.splitlines())
    l = next(ls)
    while l != "":
        l = next(ls)
    
    l = next(ls)
    gates = collections.defaultdict(dict)
    while l is not None:
        a, op, b, _, c = l.split()
        gates[a][op] = c
        gates[b][op] = c
        l = next(ls, None)
    
    ans = []
    if gates["x00"]["XOR"] != "z00":
        ans.append(gates["x00"]["XOR"])
    
    carry = gates["x00"]["AND"]
    for i in range(1, 45):
        x = f"x{i:02}"
        xor1 = gates[x]["XOR"]
        and1 = gates[x]["AND"]
        
        is_carry_good = {"XOR", "AND"} <= gates[carry].keys()
        if not is_carry_good:
            ans.append(carry)
        
        is_xor1_good = {"XOR", "AND"} <= gates[xor1].keys()
        if not is_xor1_good:
            ans.append(xor1)
        
        xor2 = gates[xor1]["XOR"] if is_xor1_good else gates[carry]["XOR"]
        is_xor2_good = xor2 == f"z{i:02}"
        if not is_xor2_good:
            ans.append(xor2)
        
        and2 = gates[xor1]["AND"] if is_xor1_good else gates[carry]["AND"]
        
        is_and1_good = "OR" in gates[and1].keys()
        if not is_and1_good:
            ans.append(and1)
        
        is_and2_good = "OR" in gates[and2].keys()
        if not is_and2_good:
            ans.append(and2)
        
        carry = gates[and1]["OR"] if is_and1_good else gates[and2]["OR"]
    
    return ",".join(sorted(ans))

def main():
    try:
        # Read input from input.txt
        s = parse_input('input.txt')
        
        # Solve Part 1
        result1 = part1(s)
        print("Part 1 Result:", result1)
        
        # Solve Part 2
        result2 = part2(s)
        print("Part 2 Result:", result2)
    
    except FileNotFoundError:
        print("Error: input.txt file not found")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()