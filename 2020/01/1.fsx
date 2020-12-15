let input = System.IO.File.ReadAllLines("input.txt")

let numbers = input |> Seq.map int

for x in numbers do
    for y in numbers do
        if x + y = 2020 then printfn "Part 1 %d" <| x * y

for x in numbers do
    for y in numbers do
        for z in numbers do
            if x + y + z = 2020 then printfn "Part 2 %d" <| x * y * z
