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

var sortTable = (table, max) => {
  var new_table = table.map((p) => {
    return `${p.time}-${p.name}`;
  });

  var srf = new_table
    .sort(function (a, b) {
      var a_args = a.split("-");
      var b_args = b.split("-");
      return a_args[0] - b_args[0];
    })
    .reverse()
    .map((item) => {
      var item_args = item.split("-");
      var new_item = { time: item_args[0], name: item_args[1] };
      return new_item;
    }); // srf == sorted, reversed, fixed
  if (max) {
    srf = srf.filter((item, index) => {
      if (index < max) {
        return item;
      }
    });
  }
  return srf;
};

module.exports = { format_time, sortTable };
