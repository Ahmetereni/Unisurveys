
function printResults() {
    let e = document.getElementById("countrySelect"),
        t = document.getElementById("universitySelect"),
        l = { country: e.value, university: t.value, answers: [] };
    for (let n = 0; n < questions.length; n++) {
        let s = document.getElementById(`slider${n}`);
        l.answers.push({ question: questions[n], score: s.value })
    } 
    console.log(l);



}