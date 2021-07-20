const cheerio = require("cheerio");
const request = require("request-promise");
const fs = require("fs-extra");
const writeStream = fs.createWriteStream("quotes.csv");

async function init() {
  const $ = await request({
    uri: "https://quotes.toscrape.com/",
    transform: (body) => cheerio.load(body),
  });
  console.log($);

  // Obtener elementos:
  /*   // Titulo
  const websiteTitle = $("title");
  console.log(`Titulo del sitio: ${websiteTitle.html()}`);

  // Cabecera
  const websiteHeading = $("h1");
  console.log(`H1: ${websiteHeading.text().trim()}`);

  // Citas
  const websiteQuotes = $(".quote").find("a");
  console.log(`Citas: ${websiteQuotes.html()}`);

  //Tercera cita
  const third_quote = $(".quote").next().next();
  console.log(`Tercera cita: ${third_quote.html().trim()}`);

  // Todas las citas
  const containerClass = $(".row .col-md-8").parent().next();
  console.log(`Todas las citas: ${containerClass.html()}`);

  // Texto de las Citas
  const texto = $(".quote span.text").each((i, el) => {
    console.log(i, $(el).text());
    //Sin comillas
    const quote_text = $(el).text();
    const quote2 = quote_text.replace(/(^\“|\”$)/g, "");
    console.log(i, quote2); */

  writeStream.write("Quote|Author|Tags\n");
  $(".quote").each((i, el) => {
    const text = $(el)
      .find("span.text")
      .text()
      .replace(/(^\“|\”$)/g, "");

    const autor = $(el).find("span small.author").text();
    console.log(text, autor);

    const tags = [];
    $(el)
      .find(".tags a.tag")
      .each((i, el) => {
        tags.push($(el).text());
      });
    writeStream.write(`${text}|${autor}|${tags}\n`);
    //console.log(tags.join(", "));
  });
}

init();
