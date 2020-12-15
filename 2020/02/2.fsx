open System.Text.RegularExpressions
open System.Linq

let input = System.IO.File.ReadAllLines("input.txt")

type Entry =
    { First: int
      Second: int
      Letter: char
      Password: string }

let parse entry =
    let m =
        Regex.Match(entry, "(\d+)-(\d+) (\w): (\w+)")

    { First = int m.Groups.[1].Value
      Second = int m.Groups.[2].Value
      Letter = m.Groups.[3].Value.[0]
      Password = m.Groups.[4].Value }

let valid validator =
    input
    |> Seq.map parse
    |> Seq.filter validator
    |> Seq.length

let part1Validator entry =
    let appearences =
        entry.Password.Count((fun c -> c = entry.Letter))

    appearences
    >= entry.First
    && appearences <= entry.Second

printfn "Part 1 %d" <| valid part1Validator

let part2Validator entry =
    (entry.Password.[entry.First - 1] = entry.Letter)
    <> (entry.Password.[entry.Second - 1] = entry.Letter)

printfn "Part 2 %d" <| valid part2Validator
