import moment from "moment";
import Colors from "../styles/Colors";

export function GetListYears() {
  var yearActual = moment().format("YYYY");
  var list = [{ label: "Selecionar", value: null }];
  for (var i = yearActual; i >= 1900; i--) {
    list.push({ label: i, value: i });
  }
  return list;
}

export function GetListSort() {
  return [
    {
      label: "Popularidade Desc",
      value: "popularity.desc",
    },
    {
      label: "Popularidade Asc",
      value: "popularity.asc",
    },
    {
      label: "Lançamento Desc",
      value: "primary_release_date.desc",
    },
    {
      label: "Lançamento Asc",
      value: "primary_release_date.asc",
    },
    {
      label: "Título Desc",
      value: "title.desc",
    },
    {
      label: "Título Asc",
      value: "title.Asc",
    },
    {
      label: "Avaliação (A - Z)",
      value: "vote_average.desc",
    },
    {
      label: "Avaliação (Z - A)",
      value: "vote_average.asc",
    },
  ];
}

export function GetImage(size, image) {
  if (image == undefined || image == null || image == "") return false;
  return `https://image.tmdb.org/t/p/${size}${image}`;
}

export function HexToRgbA(hex, opacity) {
  const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${opacity})`;
}

export function ConvertRuntime(min) {
  if (min != 0) {
    let h = Math.floor(min / 60);
    let m = min % 60;
    h = h < 10 ? "0" + h + "h" : h + "h";
    m = m < 10 ? "0" + m + "min" : m + "min";

    if (h == "00h") h = "";
    if (m == "00min") m = "";

    return `${h} ${m}`;
  }
}
