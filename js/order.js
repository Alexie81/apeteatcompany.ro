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

    if (document.getElementById("date0").classList.contains("selected")) {
        let date1 = new Date(dates[0]);
        let formattedDate1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();
        document.getElementById('inputDate').value = formattedDate1;
        console.log("Valoarea din inputDate este: " + document.getElementById('inputDate').value);
    
        // Verifică datele serializate
        console.log("Date serializate pentru trimitere:", $("#formDate").serialize());
    
        // $.ajax({
        //     type: "POST",
        //     url: window.location.href, // Trimite cererea la aceeași pagină
        //     data: $("#formDate").serialize(),
        //     success: function(data) {
        //         console.log("Răspunsul primit de la server:", data);
        //         alert("Răspuns de la server: " + data);
        //     },
        //     error: function(xhr, status, error) {
        //         console.error("Eroare AJAX:", error);
        //     }
        // });
    }

 });
 