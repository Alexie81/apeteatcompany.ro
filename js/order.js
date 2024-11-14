$( document ).ready(function() {
    dates = JSON.parse(sessionStorage.getItem('dates'));
    const months = [
        "Ian",
        "Feb",
        "Mar",
        "Apr",
        "Mai",
        "Iun",
        "Iul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      let date;
      let formattedDate;
      let monthName;
      let allDates = [];
    for(let i = 0; i < dates.length; i++) {
        date = new Date(dates[i]);
        formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        monthName = months[date.getMonth()];
        allDates.push(date.getDate() + " " + monthName);
        console.log(date.getDate() + " " + monthName);
    }
    if(dates.length === 5) {
        document.getElementById('date5').style.display = "none";
        document.getElementById('date6').style.display = "none";
        document.getElementById('date7').style.display = "none";
        document.getElementById('date8').style.display = "none";
        document.getElementById('date9').style.display = "none";
        

        document.getElementById('innerDate0').innerHTML = allDates[0];
        document.getElementById('innerDate1').innerHTML = allDates[1];
        document.getElementById('innerDate2').innerHTML = allDates[2];
        document.getElementById('innerDate3').innerHTML = allDates[3];
        document.getElementById('innerDate4').innerHTML = allDates[4];
    } else {
        document.getElementById('innerDate0').innerHTML = allDates[0];
        document.getElementById('innerDate1').innerHTML = allDates[1];
        document.getElementById('innerDate2').innerHTML = allDates[2];
        document.getElementById('innerDate3').innerHTML = allDates[3];
        document.getElementById('innerDate4').innerHTML = allDates[4];
        document.getElementById('innerDate5').innerHTML = allDates[5];
        document.getElementById('innerDate6').innerHTML = allDates[6];
        document.getElementById('innerDate7').innerHTML = allDates[7];
        document.getElementById('innerDate8').innerHTML = allDates[8];
        document.getElementById('innerDate9').innerHTML = allDates[9];
    }

    

 });
 

 document.addEventListener("DOMContentLoaded", function() {

if(sessionStorage.getItem("date0Selected") === 'true') {
    document.querySelectorAll(".day_select.selected").forEach(el => el.classList.remove("selected"));
    document.getElementById("date0").classList.add("selected");
} else if(sessionStorage.getItem("date1Selected") === 'true') {
        document.querySelectorAll(".day_select.selected").forEach(el => el.classList.remove("selected"));
        document.getElementById("date1").classList.add("selected");
    }

setTimeout(() => {
    if (document.getElementById("date0").classList.contains("selected")) {
        document.cookie = "date0Selected=true; path=/";
        document.cookie = "date1Selected=false; path=/";
        if(sessionStorage.getItem("date0Selected") != 'true' || sessionStorage.getItem("date0Selected") === null){
            window.location.reload();
        }
        sessionStorage.setItem("date0Selected", true);
    } else if (!document.getElementById("date0").classList.contains("selected")){

        document.cookie = "date0Selected=false; path=/";

    } else if (sessionStorage.getItem("date1Selected") === 'true'){

        document.cookie = "date1Selected=true; path=/";

        if(sessionStorage.getItem("date1Selected") != 'true' || sessionStorage.getItem("date1Selected") === null){
            window.location.reload();
        }
        sessionStorage.setItem("date1Selected", true);

    } else if (!document.getElementById("date1").classList.contains("selected")) {

        document.cookie = "date1Selected=false; path=/";
       

    } else if (document.getElementById("date2").classList.contains("selected")) {

        document.cookie = "date2Selected=true; path=/";

    } else if(!document.getElementById("date2").classList.contains("selected")){

        document.cookie = "date3Selected=false; path=/";

    } else if(document.getElementById("date3").classList.contains("selected")) {

        document.cookie = "date3Selected=true; path=/";

    } else if(!document.getElementById("date3").classList.contains("selected")) {

        document.cookie = "date3Selected=false; path=/";

    } else if(document.getElementById("date4").classList.contains("selected")) {

        document.cookie = "date4Selected=true; path=/";

    } else if(!document.getElementById("date4").classList.contains("selected")){

        document.cookie = "date4Selected=false; path=/";

    } else if(document.getElementById("date5").classList.contains("selected")) {

        document.cookie = "date5Selected=true; path=/";

    } else if(!document.getElementById("date5").classList.contains("selected")){

        document.cookie = "date5Selected=false; path=/";

    } else if(document.getElementById("date6").classList.contains("selected")) {

        document.cookie = "date6Selected=true; path=/";

    } else if(!document.getElementById("date6").classList.contains("selected")) {

        document.cookie = "date6Selected=false; path=/";

    } else if(document.getElementById("date7").classList.contains("selected")) {

        document.cookie = "date7Selected=true; path=/";

    } else if(!document.getElementById("date7").classList.contains("selected")){

        document.cookie = "date7Selected=false; path=/";

    } else if(document.getElementById("date8").classList.contains("selected")) {

        document.cookie = "date8Selected=true; path=/";

    } else if(!document.getElementById("date8").classList.contains("selected")) {

        document.cookie = "date8Selected=false; path=/";

    } else if(document.getElementById("date9").classList.contains("selected")) {

        document.cookie = "date9Selected=true; path=/";

    } else if(!document.getElementById("date9").classList.contains("selected")){

        document.cookie = "date9Selected=false; path=/";

    }
}, 500);
    console.log(document.cookie);

});


function select_mic_dejun_button(element) {
    // Selectează toate elementele care au clasa "selected" și elimin-o
    document.querySelectorAll(".mic-dejun.selected").forEach(el => el.classList.remove("selected"));

    // Adaugă clasa "selected" la elementul pe care ai dat click
    element.parentElement.classList.add("selected");
}

function select_mic_dejun(element) {
    // Selectează toate elementele care au clasa "selected" și elimin-o
    document.querySelectorAll(".mic-dejun.selected").forEach(el => el.classList.remove("selected"));

    // Adaugă clasa "selected" la elementul pe care ai dat click
    element.classList.add("selected");
}

function selectDay(element) {
    document.querySelectorAll(".day_select.selected").forEach(el => el.classList.remove("selected"));
    console.log()
    document.cookie = element.id+"Selected=true; path=/";
    // Adaugă clasa "selected" la elementul pe care ai dat click
    element.classList.add("selected");

    sessionStorage.removeItem("date0Selected");
    sessionStorage.removeItem("date1Selected");
    
    sessionStorage.setItem(element.id+"Selected", true);
    console.log(document.cookie);
    window.location.reload();
}