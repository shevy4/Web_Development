//Task 2
var percent2 = []
var arrcount = 0
var correct = 0
var incorrect = 0
var actual_answer
var less50 = 0
var bet50 = 0
var bet60 = 0
var bet70 = 0
var bet80 = 0
var bet90 = 0
var at100 = 0
var gamecount = 0
var random
var rand
var female = 0
var male = 0
var PlayersData = [] 

//Task 1 and part of 2
function age(dob) {
	let birth = new Date(dob)
	let month_diff = Date.now() - birth.getTime()
	let age_dt = new Date(month_diff)
	let year = age_dt.getUTCFullYear()
	let age2 = Math.abs(year - 1970)
	return age2
}

function Register(e) {
	e.preventDefault() //prevent  reload 

	let fname = document.forms["register"]["firstname"].value
	let lname = document.forms["register"]["lastname"].value
	let dob = document.forms["register"]["dob"].value
	let email = document.forms["register"]["email"].value
	let gender = document.forms["register"]["gender"].value

	if (fname == "" || lname == "" || dob == "" || gender == "" || email == "" || ((!document.getElementById("F").checked) && (!document.getElementById("M").checked))) {
		if (fname == "") {
			document.getElementById("spacef").innerHTML = "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Field should not be empty.".italics().fontcolor("red")
			setTimeout(function () {
				document.getElementById("spacef").innerHTML = ""
			}, 5000)
		}
		if (lname == "") {
			document.getElementById("spacel").innerHTML = "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Field should not be empty.".italics().fontcolor("red")
			setTimeout(function () {
				document.getElementById("spacel").innerHTML = ""
			}, 6000)
		}
		if (dob == "") {
			document.getElementById("age").innerHTML = "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Field should not be empty.".italics().fontcolor("red")
			setTimeout(function () {
				document.getElementById("age").innerHTML = ""
			}, 7000)
		}
		if (((!document.getElementById("F").checked) && (!document.getElementById("M").checked))) {
			document.getElementById("spaceg").innerHTML = "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Check a circle.".italics().fontcolor("red")
			setTimeout(function () {
				document.getElementById("spaceg").innerHTML = ""
			}, 8000)
		}

		if (email == "") {
			document.getElementById("space").innerHTML = "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Field should not be empty.".italics().fontcolor("red")
			setTimeout(function () {
				document.getElementById("space").innerHTML = ""
			}, 9000)
		}
		return false;
	}

	let age2 = age(dob)

	if (age2 < 8 || age2 > 12) {
		if (age2 < 8) {
			document.getElementById("age").innerHTML = "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp You are too young!".italics().fontcolor("red")
		} else {
			document.getElementById("age").innerHTML = "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp You are too old!".italics().fontcolor("red")
		}
		return false;
	}

	if (document.getElementById("F").checked) {
		gender = "F"
	} else {
		gender = "M"
	}

	console.log(gender)

	PlayersData.push({
		fname: fname,
		lname: lname,
		dob: dob,
		age: age2,
		gender: gender,
		questions: [],
		percentage: 0,
		user_answer: [],
		vali: []
	})

	//task 3
	alert("Submitted")
  document.getElementById("formid").reset()
  hide(document.getElementById("content"))
	document.getElementById("content2").classList.remove("hidden") 
}

function hide (elements) {
  elements = elements.length ? elements : [elements];
  for (var index = 0; index < elements.length; index++) {
    elements[index].style.display = 'none';
  }
}
//Task 4
function playgame() {
  document.getElementById("answer").value=" "
	random = Math.floor(Math.random() * 9) + 1;
	rand = Math.floor(Math.random() * 5) + 1;
	console.log(random)
	console.log(rand)
	actual_answer = random * rand

	// add question to the current players questions list
	PlayersData[PlayersData.length - 1].questions.push(`${random} * ${rand}`)

	document.getElementById("playarea").innerHTML = `&emsp; &emsp; ${random} * ${rand} = ?`.fontsize("10px")
	gamecount += 1
	document.getElementById("showpercentage").innerHTML = " "
	return gamecount 
}

function playarea() {
	gamecount = 0
	correct = 0
	incorrect = 0

	playgame()

	document.getElementById("content3").classList.remove("hidden")
	document.getElementById("start").disabled = true
}

//Task 6
function CheckAnswer() {
	console.log(document.getElementById("answer").value)
	let user_answer = parseInt(document.getElementById("answer").value) //converts to integer and return Nan when not an integer
	console.log(user_answer)

	if (Number.isNaN(user_answer)) {
		document.getElementById("val").innerHTML = "Enter a number".fontcolor("red")
		console.log("Not valid")
		return false
	}

	document.getElementById("val").innerHTML = " "
	PlayersData[PlayersData.length - 1].user_answer.push(user_answer)
	console.log(actual_answer)
	if (user_answer == actual_answer) {
		PlayersData[PlayersData.length - 1].vali.push("Correct")
		correct += 1
		console.log("Correct", correct)
	} else {
		PlayersData[PlayersData.length - 1].vali.push("Incorrect")
		incorrect += 1
		console.log("Incorrect", incorrect)
	}
	console.log(gamecount)
	window.percent = (correct / gamecount) * 100
	PlayersData.percentage = percent
	console.log(PlayersData.percentage)
	showall()
	//return percent
  alert("Answer recorded")
}

//Task 10
function findPercentageScore() {
	document.getElementById("content4").classList.remove("hidden")
	let percent = (correct / gamecount) * 100
	document.getElementById("content4").classList.remove("hidden")
	document.getElementById("showpercentage").innerHTML = " "
	document.getElementById("showpercentage").innerHTML = `
    Player's name = ${PlayersData[PlayersData.length-1].fname} ${PlayersData[PlayersData.length-1].lname} 
    Total Questions = ${gamecount} 
    Correct Answers = ${correct} 
    Percentage Score = ${percent} 
    Current Date = ${new Date()}` 
    return percent 

}

function Endgame() { 
	document.getElementById("content3").classList.add("hidden")
	document.getElementById("content2").classList.add("hidden")
  show(document.getElementById("content"))
  document.getElementById("start").disabled = false
	
	percent2.push(findPercentageScore())
  return percent2

}
function show (elements, specifiedDisplay) {
  elements = elements.length ? elements : [elements];
  for (var index = 0; index < elements.length; index++) {
    elements[index].style.display = specifiedDisplay || 'block';
  }
}
//Task 13
function showall() {
	document.getElementById("showallplayers").innerHTML = " "

	for (var i = 0; i < PlayersData.length; i++) {
		document.getElementById("showallplayers").innerHTML += `
    First name = ${PlayersData[i].fname}
		Last Name = ${PlayersData[i].lname} 
		Age = ${PlayersData[PlayersData.length - 1].age} `

		for (var t = 0; t < PlayersData[PlayersData.length - 1].questions.length; t++) {
			document.getElementById("showallplayers").innerHTML += `
			Question : ${PlayersData[i].questions[t]}
			User Answer ${PlayersData[i].user_answer[t]}
			Status of the Answer ${PlayersData[i].vali[t]}`
		}
		document.getElementById("showallplayers").innerHTML += `
    Percentage Score = ${percent}`
	}
	    
    //return [female, male]
}

function count(){
	//reset the values to 0 
	male = 0
	female = 0
	less50 = 0
  bet50 = 0
bet60 = 0
bet70 = 0
bet80 = 0
bet90 = 0
at100 = 0
	for (var i = 0; i < PlayersData.length; i++) {
		if (PlayersData[i].gender == "F") {
			female += 1
		} else if (PlayersData[i].gender == "M") {
			male += 1	
		}
	}
  for (var i = 0; i < PlayersData.length; i++) {
    if (percent2[i] < 50){
      less50 +=1
    }
    if(percent2[i] >= 50 && percent2[i] <= 59){
      bet50 +=1
    }
    if(percent2[i] >= 60 && percent2[i] <= 69){
      bet60 +=1
    }
      if(percent2[i] >= 70 && percent2[i] <= 79){
      bet70 +=1
    }
    if(percent2[i] >= 80 && percent2[i] <= 89){
      bet80 +=1
    }
    if(percent2[i] >= 90 && percent2[i] <= 99){
      bet90 +=1
    }
    if (percent2[i] == 100){
      at100 +=1
    }
  }

	console.log('female count: ' + female)
  console.log(`Percentage = ${percent2[0]}`)
}

//Task 15
function showfreq() {
	count()
	
    var malePercent = (male/PlayersData.length) * 100
    var femalePercent = (female/PlayersData.length) * 100
    
    let image = document.getElementById("male_count")
    image.width = malePercent
    let image2 = document.getElementById("female_count")
    image2.width = femalePercent
    console.log(`PlayersData length = ${PlayersData.length}`)
    console.log(`Male count = ${malePercent}`)
    console.log(`Female count = ${femalePercent}`)
    let image3 = document.getElementById("lessthan50")
    image3.width = (less50/PlayersData.length)*100
    let image4 = document.getElementById("between50n59")
    image4.width = (bet50/PlayersData.length)*100
    let image5 = document.getElementById("between60n69")
    image5.width = (bet60/PlayersData.length)*100
    let image6 = document.getElementById("between70n79")
    image6.width = (bet70/PlayersData.length)*100
    let image7 = document.getElementById("between80n89")
    image7.width = (bet80/PlayersData.length)*100
    let image8 = document.getElementById("between90n99")
    image8.width = (bet90/PlayersData.length)*100
    let image9 = document.getElementById("at100")
    image9.width = (at100/PlayersData.length)*100
  console.log(`Hunnid = ${at100}`)
}

setInterval(function(){
	showfreq()
  },5000);
