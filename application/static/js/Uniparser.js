let jsonData = [];
async function fetchData() {
    try {
        let t = await fetch("../static/data/universities.json");
        if (!t.ok) throw Error("Network response was not ok"); jsonData = await t.json(), populateCountryDropdown(), updateUniversityDropdown()
    } catch (e) { console.error("Fetch Error:", e) }
}
function populateCountryDropdown() {
    let t = new Set, e = document.getElementById("countrySelect");
    jsonData.forEach(e => t.add(e.country)), t.forEach(t => {
        let n = document.createElement("option"); n.text = t, n.value = t, e.add(n)
    })
}
function updateUniversityDropdown() {
    let t = document.getElementById("countrySelect").value, e = document.getElementById("universitySelect");
    e.innerHTML = "", jsonData.forEach(n => {
        if (n.country === t) {
            let o = document.createElement("option");

            o.text = n.name, o.value = n.name, e.add(o)
        }
    })
}
window.onload = function () { fetchData() };