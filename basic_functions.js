const moment = require("moment");

var fnx = (t, d) => {
  if (t > 0) {
    if (t > 1) {
      return `${t} ${d}s${d != "sec" ? ", " : ""}`;
    } else {
      return `${t} ${d}${d != "sec" ? ", " : ""}`;
    }
  }
  return ``;
};

function format_time(seconds) {
  seconds = Number(seconds);
  var days = Math.floor(seconds / (3600 * 24));
  var hours = Math.floor((seconds % (3600 * 24)) / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);
  var seconds = Math.floor(seconds % 60);

  var time = "";
  time += `${fnx(days, "day")}`;
  time += `${fnx(hours, "hour")}`;
  time += `${fnx(minutes, "min")}`;
  time += `${fnx(seconds, "sec")}`;

  return time;
}

module.exports = { format_time };
