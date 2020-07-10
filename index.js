const http = require("https");
const xml2js = require("xml2js");

const rejectWithStack = (reject, message, error) => {
  const result = new Error(`${message}: ${error.message}`);
  result.stack = error.stack;
  return reject(result);
};

const downloadData = () =>
  new Promise((resolve, reject) => {
    const errorHandler = rejectWithStack.bind(
      null,
      reject,
      "Unable to receive data"
    );
    const requestHandler = (response) => {
      let body = "";
      response.on("data", (chunk) => (body += chunk));
      response.on("end", () => resolve(body));
      response.on("error", errorHandler);
    };
    const requestOptions = {
      host: "niagararegion.ca",
      path: "/sherpa-lists/beach-results_v4.xml",
      port: 443,
    };
    const request = http.request(requestOptions, requestHandler);
    request.on("error", errorHandler);
    request.end();
  });

const parseData = (data) =>
  new Promise((resolve, reject) => {
    new xml2js.Parser()
      .parseStringPromise(data)
      .then((result) => {
        try {
          const beaches = result.rs.bm
            .map(
              ({
                $: {
                  ows_Beach_Id: idString,
                  ows_Beach_Name: name,
                  ows_Posting_Date: datePosted,
                  ows_Posting_Reason: reason,
                  ows_Posting_Status: status,
                  ows_Survey_Date: dateSurveyed,
                  ows_Survey_Temp: temperatureString,
                },
              }) => {
                const id = parseInt(idString, 10);
                const temperature = parseFloat(temperatureString);

                return {
                  datePosted,
                  dateSurveyed,
                  id: isNaN(id) ? undefined : id,
                  name,
                  reason,
                  status,
                  temperature: isNaN(temperature) ? undefined : temperature,
                };
              }
            )
            .sort((a, b) => {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            });
          return resolve(beaches);
        } catch (error) {
          return rejectWithStack(reject, "Unable to parse data", error);
        }
      })
      .catch((error) => {
        rejectWithStack(reject, "Unable to parse data", error);
      });
  });

module.exports = {
  fetchAll: () => downloadData().then(parseData),
};
