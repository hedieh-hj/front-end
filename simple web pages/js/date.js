var sundte = new Date();
var yeardte = sundte.getFullYear();
var monthdte = sundte.getMonth();
var dtedte = sundte.getDate();
var daydte = sundte.getDay();
var sunyear;
switch (daydte) {
  case 0:
    var today = "يکشنبه";
    break;
  case 1:
    var today = "دوشنبه";
    break;
  case 2:
    var today = "سه شنبه";
    break;
  case 3:
    var today = "چهارشنبه";
    break;
  case 4:
    var today = "پنجشنبه";
    break;
  case 5:
    var today = "جمعه";
    break;
  case 6:
    var today = "شنبه";
    break;
}
switch (monthdte) {
  case 0:
    sunyear = yeardte - 622;
    if (dtedte <= 20) {
      var sunmonth = "دي";
      var daysun = dtedte + 10;
    } else {
      var sunmonth = "بهمن";
      var daysun = dtedte - 20;
    }
    break;
  case 1:
    sunyear = yeardte - 622;
    if (dtedte <= 19) {
      var sunmonth = "بهمن";
      var daysun = dtedte + 11;
    } else {
      var sunmonth = "اسفند";
      var daysun = dtedte - 19;
    }
    break;
  case 2:
    {
      if ((yeardte - 621) % 4 == 0) var i = 10;
      else var i = 9;
      if (dtedte <= 20) {
        sunyear = yeardte - 622;
        var sunmonth = "اسفند";
        var daysun = dtedte + i;
      } else {
        sunyear = yeardte - 621;
        var sunmonth = "فروردين";
        var daysun = dtedte - 20;
      }
    }
    break;
  case 3:
    sunyear = yeardte - 621;
    if (dtedte <= 20) {
      var sunmonth = "فروردين";
      var daysun = dtedte + 11;
    } else {
      var sunmonth = "ارديبهشت";
      var daysun = dtedte - 20;
    }
    break;
  case 4:
    sunyear = yeardte - 621;
    if (dtedte <= 21) {
      var sunmonth = "ارديبهشت";
      var daysun = dtedte + 10;
    } else {
      var sunmonth = "خرداد";
      var daysun = dtedte - 21;
    }

    break;
  case 5:
    sunyear = yeardte - 621;
    if (dtedte <= 21) {
      var sunmonth = "خرداد";
      var daysun = dtedte + 10;
    } else {
      var sunmonth = "تير";
      var daysun = dtedte - 21;
    }
    break;
  case 6:
    sunyear = yeardte - 621;
    if (dtedte <= 22) {
      var sunmonth = "تير";
      var daysun = dtedte + 9;
    } else {
      var sunmonth = "مرداد";
      var daysun = dtedte - 22;
    }
    break;
  case 7:
    sunyear = yeardte - 621;
    if (dtedte <= 22) {
      var sunmonth = "مرداد";
      var daysun = dtedte + 9;
    } else {
      var sunmonth = "شهريور";
      var daysun = dtedte - 22;
    }
    break;
  case 8:
    sunyear = yeardte - 621;
    if (dtedte <= 22) {
      var sunmonth = "شهريور";
      var daysun = dtedte + 9;
    } else {
      var sunmonth = "مهر";
      var daysun = dtedte + 22;
    }
    break;
  case 9:
    sunyear = yeardte - 621;
    if (dtedte <= 22) {
      var sunmonth = "مهر";
      var daysun = dtedte + 8;
    } else {
      var sunmonth = "آبان";
      var daysun = dtedte - 22;
    }
    break;
  case 10:
    sunyear = yeardte - 621;
    if (dtedte <= 21) {
      var sunmonth = "آبان";
      var daysun = dtedte + 9;
    } else {
      var sunmonth = "آذر";
      var daysun = dtedte - 21;
    }

    break;
  case 11:
    sunyear = yeardte - 621;
    if (dtedte <= 19) {
      var sunmonth = "آذر";
      var daysun = dtedte + 9;
    } else {
      var sunmonth = "دي";
      var daysun = dtedte + 21;
    }
    break;
}
document.getElementById("demo").innerHTML =
  "&nbsp;" + [daysun] + "&nbsp;" + sunmonth + "&nbsp;" + sunyear;
