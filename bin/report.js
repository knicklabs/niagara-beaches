#!/usr/bin/env node
const Table = require("cli-table");

const beaches = require("..");

const asAvg = (num, total) => (num / total).toFixed(2);
const asAvgPercent = (num, total) => `${((num / total) * 100).toFixed(2)}%`;

const colors = {
  red: "\033[31m",
  green: "\033[32m",
  reset: "\033[0m",
};

const colorize = (str, color, options = {}) => {
  if (!color || !str) {
    return str;
  }

  if (options.only && options.only !== color) {
    return str;
  }

  return colors[color] + str + colors.reset;
};

const getColor = (status) => {
  switch (status.toLowerCase()) {
    case "closed":
      return "red";
    case "open":
      return "green";
    default:
      return undefined;
  }
};

const getStats = (beaches) => {
  const total = beaches.length;
  const sums = beaches.reduce(
    (result, beach) => {
      return {
        closed:
          result.closed + (beach.status.toLowerCase() === "closed" ? 1 : 0),
        open: result.open + (beach.status.toLowerCase() === "open" ? 1 : 0),
        temperature: result.temperature + (beach.temperature || 0),
      };
    },
    {
      closed: 0,
      open: 0,
      temperature: 0,
    }
  );
  return {
    "Number of Beaches": total,
    "Average Temperature": asAvg(sums.temperature, total),
    "Percent Closed": asAvgPercent(sums.closed, total),
    "Percent Open": asAvgPercent(sums.open, total),
  };
};

beaches
  .fetchAll()
  .then((beaches) => {
    if (!beaches.length) {
      throw new Error("Beach reports are unavailable");
    }
    const table = new Table({
      head: ["Name", "Status", "Reason", "°C", "Reported"],
      colWidths: [38, 8, 12, 10, 12],
    });
    beaches.forEach(
      ({
        datePosted = "N/A",
        name = "N/A",
        reason = "",
        status = "N/A",
        temperature = "N/A",
      }) =>
        table.push([
          name,
          colorize(status, getColor(status)),
          reason,
          temperature,
          datePosted,
        ])
    );
    console.log(table.toString());

    const stats = getStats(beaches);
    Object.keys(stats).forEach((key) => console.log(`${key}: ${stats[key]}`));
  })
  .catch((error) => {
    console.error(error.message);
  });
