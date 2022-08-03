String.prototype.getBaseConversionNumber = getBaseConversionNumber;
String.prototype.CvnFromTo = CvnFromTo;
String.prototype.convertDigits = convertDigits;

// تنظیم شده برای سال 1401
var today = Date.now();
const todayFa = {
  day: getDateFormat(today, {
    day: "2-digit",
  }),
  month: getDateFormat(today, {
    month: "numeric",
  }),
  monthTitle: getDateFormat(today, {
    month: "long",
  }),
  year: getDateFormat(today, {
    year: "numeric",
  }),
  dayWeek: getDateFormat(today, {
    weekday: "long",
  }),
};

const headDOM = document.getElementsByTagName("head")[0];

const parentDateDOM = document.getElementsByClassName("num-dates")[0];
const parentMetaYearDOM = document.getElementsByClassName("year-wrapper")[0];
const parentEventsDOM = document.getElementsByClassName("calendar-left")[0];

const todayDateDOM = document.getElementsByClassName("num-date")[0];
const todayDayDOM = document.getElementsByClassName("day")[0];

// set Property
todayDateDOM.textContent = todayFa["day"].convertDigits("fa");
todayDayDOM.textContent = todayFa["dayWeek"].convertDigits("fa");

// event listener
const monthLetter = document.getElementsByClassName("month-letter");
for (const element of monthLetter) {
  element.onclick = function (e) {
    const thisElement = e.target;
    if (thisElement.classList.contains("active-season-cr")) return;
    const monthDataNumber = thisElement.getAttribute("data-num");
    activeMonthElement(
      "dynamic-element",
      `dynamic-element-${monthDataNumber}`,
      "active-element"
    );
    activeMonthElement(
      "month-letter",
      `month-letter-${monthDataNumber}`,
      "active-season-cr"
    );
  };
}

let season = getSeasonByMonNum(todayFa.month);
let cssSeason = getCssBySeason(season);

let styleCustom = document.getElementById("style-cln");

if (!styleCustom)
  headDOM.innerHTML += `<style id="style-cln">${cssSeason}</style>`;
else {
  styleCustom.innerHTML = cssSeason;
}

let monthCounter = 1;
for (const month of calendarObject) {
  const dateList = [];
  let liCounter = 0;
  let UlCounter = 1;
  let oneStarted = false;
  let tmpMetaYear = metaYear.metaYear[monthCounter - 1];
  tmpMetaYear = tmpMetaYear.split(" | ");

  parentMetaYearDOM.innerHTML += generateTemplateHTML("metaYear", {
    index: monthCounter,
    year: metaYear.year,
    arabic: tmpMetaYear[1],
    miladi: tmpMetaYear[0],
  });

  for (const day of month) {
    const currentMonth = todayFa.monthTitle;
    if ((!dateList[0] && 9 < day[0]) || dateList.indexOf(day[0]) != -1)
      oneStarted = false;
    else {
      oneStarted = true;
      dateList.push(day[0]);
    }
    var ulCurrentClass = `wk-${monthCounter}-${UlCounter}`;

    if (liCounter == 7) {
      document.getElementsByClassName(ulCurrentClass)[0].innerHTML +=
        '<div class="clearfix"></div>';
      liCounter = 0;
      UlCounter++;
    }

    ulCurrentClass = `wk-${monthCounter}-${UlCounter}`;

    var ulCurrent = document.getElementsByClassName(ulCurrentClass)[0];

    if (!ulCurrent) {
      var htmlUL = "";
      htmlUL += `<ul class="week ${ulCurrentClass} month-${monthCounter} dynamic-element dynamic-element-${monthCounter}"></ul>`;
      parentDateDOM.innerHTML += htmlUL;
      ulCurrent = document.getElementsByClassName(ulCurrentClass)[0];
    }
    let liClass = "day-element ";

    if (!oneStarted) liClass += "disable-one ";
    else if (oneStarted) liClass += `date-${monthCounter}-${day[0]} `;

    if (day[3] === true) liClass += "holiday ";

    ulCurrent.innerHTML += generateTemplateHTML("date", {
      class: liClass,
      jalali: day[0].toString().convertDigits("fa"),
      miladi: day[1],
      ghamari: day[2].toString().convertDigits("ar"),
    });

    const eventClass = `event-list-${monthCounter}`;
    let eventDOM = document.getElementsByClassName(eventClass)[0];
    if (!eventDOM) {
      parentEventsDOM.innerHTML += `<ul class="events-list event-list-${monthCounter} dynamic-element dynamic-element-${monthCounter}"></ul>`;
      eventDOM = document.getElementsByClassName(eventClass)[0];
    }

    for (const dayElement of day[4]) {
      const indexBracket = dayElement.indexOf("[");
      const eventdate =
        0 <= indexBracket ? dayElement.substring(indexBracket) : "";
      const eventTitle = dayElement.replace(eventdate, "");
      const startedDate = dateList[dateList.length - 1];

      if (oneStarted) {
        eventDOM.innerHTML += generateTemplateHTML("events", {
          day: `${startedDate} ${currentMonth}`.convertDigits("fa"),
          eventTitle: eventTitle,
          date: eventdate,
        });
      }
    }

    liCounter++;
  }

  monthCounter++;
}

activeMonthElement(
  "dynamic-element",
  `dynamic-element-${todayFa.month}`,
  "active-element"
);
activeMonthElement(
  "month-letter",
  `month-letter-${todayFa.month}`,
  "active-season-cr"
);
activeMonthElement(
  "day-element",
  `date-${todayFa.month}-${parseInt(todayFa.day)}`,
  "active-season"
);

function getSeasonByMonNum(numMonth) {
  const monthSeason = ["spring", "summer", "fall", "winter"];

  let season = "";

  if (numMonth <= 3) {
    season = monthSeason[0];
  } else if (3 < numMonth && numMonth <= 6) {
    season = monthSeason[1];
  } else if (6 < numMonth && numMonth <= 9) {
    season = monthSeason[2];
  } else if (9 < numMonth && numMonth <= 12) {
    season = monthSeason[3];
  }

  return season;
}

function getCssBySeason(season) {
  const cssObjects = cssProperty[season];
  let cssString = "";
  for (const cssObject of cssObjects) {
    let template = `${cssObject["selector"]}{\n`;
    for (const property of cssObject["property"]) {
      template += `${property}\n`;
    }
    template += "}\n\n";
    cssString += template;
  }

  return cssString;
}

function getDateFormat(uDate, option) {
  let date = new Intl.DateTimeFormat("fa-IR", option).format(uDate);
  date = date.convertDigits("en");
  return date;
}

function activeMonthElement(allCls, whichCls, activeCls) {
  const dynamicElement = document.getElementsByClassName(allCls);
  for (const element of dynamicElement) {
    if (element.classList.contains(activeCls))
      element.classList.remove(activeCls);
    else if (element.classList.contains(whichCls))
      element.classList.add(activeCls);
  }
}

function generateTemplateHTML(type, data) {
  let htmlTemplate = "";

  if (type == "date")
    htmlTemplate = `<li class="${data.class}"><span id="jalali">${data.jalali}</span><small id="miladi">${data.miladi}</small><small id="ghamari">${data.ghamari}</small></li>`;
  else if (type == "metaYear") {
    htmlTemplate = `<div class="year yr-${data.index} dynamic-element dynamic-element-${monthCounter}">${data.year}</div> <div class="year-meta myr-${data.index} dynamic-element dynamic-element-${monthCounter}">${data.arabic}<br>${data.miladi}</div>`;
  } else if (type == "events") {
    htmlTemplate = `<li><span class="event-day">${data.day} </span><div class="event-title">${data.eventTitle}</div><span class="event-date-type"> ${data.date}</span></li>`;
  }
  return htmlTemplate;
}

function convertDigits(to) {
  let str = this;
  const toCvn = this.getBaseConversionNumber(to)[to];
  const allDigits = this.getBaseConversionNumber("all");

  delete allDigits[to];

  const Objkeys = Object.keys(allDigits);
  for (var i = 0; i < Objkeys.length; i++) {
    const currentKey = Objkeys[i];
    const fromCvn = allDigits[currentKey];
    str = this.CvnFromTo(fromCvn, toCvn, str);
  }
  return str;
}

function CvnFromTo(fromDigits, toDigits, str) {
  var str = str == undefined ? this : str;
  for (var i = 0; i < toDigits.length; i++) {
    const currentFromDigit = fromDigits[i];
    const currentToDigit = toDigits[i];
    const regex = new RegExp(currentFromDigit, "g");
    str = str.replace(regex, currentToDigit);
  }
  return str;
}

function getBaseConversionNumber(label) {
  const faDigits = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];
  const enDigits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const arDigits = ["١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "٠"];

  var whichDigit = {};

  switch (label) {
    case "fa":
      whichDigit[label] = faDigits;
      break;
    case "en":
      whichDigit[label] = enDigits;
      break;
    case "ar":
      whichDigit[label] = arDigits;
      break;
    case "all":
      whichDigit = {
        fa: faDigits,
        en: enDigits,
        ar: arDigits,
      };
      break;
    default:
      whichDigit = [];
  }

  return whichDigit;
}
