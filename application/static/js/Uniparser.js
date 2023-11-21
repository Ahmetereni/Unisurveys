let jsonData = [];
async function fetchData() {
    try {
        let t = await fetch("../static/data/universities.json");
        if (!t.ok) throw Error("Network response was not ok"); jsonData = await t.json(), populateCountryDropdown(), updateUniversityDropdown()
    } catch (e) { console.error("Fetch Error:", e) }
} function populateCountryDropdown() { let t = new Set, e = document.getElementById("countrySelect"); jsonData.forEach(e => t.add(e.country)), t.forEach(t => { let n = document.createElement("option"); n.text = t, n.value = t, e.add(n) }) } function updateUniversityDropdown() {
    let t = document.getElementById("countrySelect").value, e = document.getElementById("universitySelect"); e.innerHTML = "", jsonData.forEach(n => {
        if (n.country === t) {
            let o = document.createElement("option");

            o.text = n.name, o.value = n.name, e.add(o)
        }
    })
}
function populateDepartmentDropdown() {

    const departments=[{name:"Aerospace Engineering"},{name:"Anthropology"},{name:"Architecture"},{name:"Art History"},{name:"Biology"},{name:"Biomedical Engineering"},{name:"Business Administration"},{name:"Chemical Engineering"},{name:"Chemistry"},{name:"Civil Engineering"},{name:"Classics"},{name:"Computer Engineering"},{name:"Computer Science"},{name:"Criminology"},{name:"Economics"},{name:"Education"},{name:"Electrical Engineering"},{name:"English Literature"},{name:"Environmental Engineering"},{name:"Environmental Science"},{name:"Finance"},{name:"Fine Arts"},{name:"Geography"},{name:"Geology"},{name:"History"},{name:"Human Resources"},{name:"International Relations"},{name:"Law"},{name:"Marketing"},{name:"Mathematics"},{name:"Mechanical Engineering"},{name:"Medicine"},{name:"Music"},{name:"Nursing"},{name:"Philosophy"},{name:"Physics"},{name:"Political Science"},{name:"Psychology"},{name:"Public Health"},{name:"Sociology"},{name:"Software Engineering"},{name:"Theatre and Performing Arts"}];


    let departmentSelect = document.getElementById("departmentSelect");
    departments.forEach(dept => {
        let option = document.createElement("option");
        option.text = dept.name;
        option.value = dept.name;
        departmentSelect.add(option);
    });
}

window.onload = function () {
    fetchData()
    populateDepartmentDropdown()
};