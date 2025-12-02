lines = 10

with open('sapin.txt', "w") as file:
    for i in range(1, lines + 1):
       spaces = " " * (lines - i)
       stars = "*" * i
       file.write(spaces + stars + "\n")

print("Vita ilay file.")