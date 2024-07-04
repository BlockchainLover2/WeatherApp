let letters = new Map([
    ["Ğ","G"],
    ["Ü","U"],
    ["Ş","S"],
    ["İ","I"],
    ["Ö","O"],
    ["Ç","C"],
    ["ğ","g"],
    ["ü","u"],
    ["ş","s"],
    ["ı","i"],
    ["ö","o"],
    ["ç","c"],
])

export let convertTurkishLetterToEnglish = (string)=>{
    return string.replace(/[ĞÜŞİOÇğüşıöç]/g,(letter)=>{
        return letters.get(letter)
    });
}