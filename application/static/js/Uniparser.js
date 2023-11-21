let jsonData = [];
async function fetchData() {
	try {
		let e = await fetch("../static/data/universities.json");
		if (!e.ok) throw Error("Network response was not ok");
		jsonData = await e.json(), populateCountryDropdown(), updateUniversityDropdown()
	} catch (e) {
		console.error("Fetch Error:", e)
	}
}

function populateCountryDropdown() {
	let n = new Set,
		a = document.getElementById("countrySelect");
	jsonData.forEach(e => n.add(e.country)), n.forEach(e => {
		let n = document.createElement("option");
		n.text = e, n.value = e, a.add(n)
	})
}

function updateUniversityDropdown() {
	let e = document.getElementById("countrySelect").value,
		a = document.getElementById("universitySelect");
	a.innerHTML = "", jsonData.forEach(n => {
		if (n.country === e) {
			let e = document.createElement("option");
			e.text = n.name, e.value = n.name, a.add(e)
		}
	})
}

function populateDepartmentDropdown() {
	let a = document.getElementById("departmentSelect");
	[{
		name: "Aerospace Engineering"
	}, {
		name: "Anthropology"
	}, {
		name: "Architecture"
	}, {
		name: "Art History"
	}, {
		name: "Biology"
	}, {
		name: "Biomedical Engineering"
	}, {
		name: "Business Administration"
	}, {
		name: "Chemical Engineering"
	}, {
		name: "Chemistry"
	}, {
		name: "Civil Engineering"
	}, {
		name: "Classics"
	}, {
		name: "Computer Engineering"
	}, {
		name: "Computer Science"
	}, {
		name: "Criminology"
	}, {
		name: "Economics"
	}, {
		name: "Education"
	}, {
		name: "Electrical Engineering"
	}, {
		name: "English Literature"
	}, {
		name: "Environmental Engineering"
	}, {
		name: "Environmental Science"
	}, {
		name: "Finance"
	}, {
		name: "Fine Arts"
	}, {
		name: "Geography"
	}, {
		name: "Geology"
	}, {
		name: "History"
	}, {
		name: "Human Resources"
	}, {
		name: "International Relations"
	}, {
		name: "Law"
	}, {
		name: "Marketing"
	}, {
		name: "Mathematics"
	}, {
		name: "Mechanical Engineering"
	}, {
		name: "Medicine"
	}, {
		name: "Music"
	}, {
		name: "Nursing"
	}, {
		name: "Philosophy"
	}, {
		name: "Physics"
	}, {
		name: "Political Science"
	}, {
		name: "Psychology"
	}, {
		name: "Public Health"
	}, {
		name: "Sociology"
	}, {
		name: "Software Engineering"
	}, {
		name: "Theatre and Performing Arts"
	}].forEach(e => {
		let n = document.createElement("option");
		n.text = e.name, n.value = e.name, a.add(n)
	})
}
function populateDepartmentDropdown() {
	let a = document.getElementById("departmentSelect");
	[{
		name: "Aerospace Engineering"
	}, {
		name: "Anthropology"
	}, {
		name: "Architecture"
	}, {
		name: "Art History"
	}, {
		name: "Biology"
	}, {
		name: "Biomedical Engineering"
	}, {
		name: "Business Administration"
	}, {
		name: "Chemical Engineering"
	}, {
		name: "Chemistry"
	}, {
		name: "Civil Engineering"
	}, {
		name: "Classics"
	}, {
		name: "Computer Engineering"
	}, {
		name: "Computer Science"
	}, {
		name: "Criminology"
	}, {
		name: "Economics"
	}, {
		name: "Education"
	}, {
		name: "Electrical Engineering"
	}, {
		name: "English Literature"
	}, {
		name: "Environmental Engineering"
	}, {
		name: "Environmental Science"
	}, {
		name: "Finance"
	}, {
		name: "Fine Arts"
	}, {
		name: "Geography"
	}, {
		name: "Geology"
	}, {
		name: "History"
	}, {
		name: "Human Resources"
	}, {
		name: "International Relations"
	}, {
		name: "Law"
	}, {
		name: "Marketing"
	}, {
		name: "Mathematics"
	}, {
		name: "Mechanical Engineering"
	}, {
		name: "Medicine"
	}, {
		name: "Music"
	}, {
		name: "Nursing"
	}, {
		name: "Philosophy"
	}, {
		name: "Physics"
	}, {
		name: "Political Science"
	}, {
		name: "Psychology"
	}, {
		name: "Public Health"
	}, {
		name: "Sociology"
	}, {
		name: "Software Engineering"
	}, {
		name: "Theatre and Performing Arts"
	}].forEach(e => {
		let n = document.createElement("option");
		n.text = e.name, n.value = e.name, a.add(n)
	})
}

const universityLevels=["Freshman (1st Year Undergraduate)","Sophomore (2nd Year Undergraduate)","Junior (3rd Year Undergraduate)","Senior (4th Year Undergraduate)","Master's Student (Graduate Level)","Doctoral Candidate/Ph.D. Student (Graduate Level, pre-dissertation)","Postdoctoral Fellow (Post-Ph.D. Research and Training)"];
function populateYearDropdown() {
    let yearSelect = document.getElementById("yearSelect");
    universityLevels.forEach(level => {
        let option = document.createElement("option");
        option.text = level;
        option.value = level;
        yearSelect.add(option);
    });
}
window.onload = function() {
	fetchData(), 
    populateDepartmentDropdown(),
    populateYearDropdown()
};