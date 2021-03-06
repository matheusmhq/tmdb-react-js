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
      label: "Avaliação Desc",
      value: "vote_average.desc",
    },
    {
      label: "Avaliação Adc",
      value: "vote_average.asc",
    },
    {
      label: "Título (Z - A)",
      value: "original_title.desc",
    },
    {
      label: "Título (A- Z)",
      value: "original_title.Asc",
    },
  ];
}

export function GetImage(size, image) {
  if (image == undefined || image == null || image == "") return false;
  return `https://image.tmdb.org/t/p/${size}${image}`;
}

export function HexToRgbA(hex, opacity) {
  if (hex == undefined || hex == null) return "";
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

export function FormatterDollar(money) {
  if (money == undefined || money == "" || money == null) return false;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(money);
}

export function StatusMovieToBr(status) {
  switch (status) {
    case "Released":
      return "Lançado";
    case "Post Production":
      return "Pós-Produção";
    case "Planned":
      return "Planejado";
  }
}

export function StatusTvToBr(status) {
  switch (status) {
    case "Returning Series":
      return "Renovada";
    case "Planned":
      return "Planejado";
    case "In Production":
      return "Em produçao";
    case "Ended":
      return "Finalizada";
    case "Cancelad":
      return "Cancelada";
    case "Pilot":
      return "Piloto";
  }
}

export function TypeTvToBr(type) {
  switch (type) {
    case "Miniseries":
      return "Minissérie";
    case "Scripted":
      return "Roteirizada";
    case "Reality":
      return "Reality Show";
  }
}

export function GetColorRating(rating) {
  if (rating == 0) {
    return "#000000";
  } else if (rating > 0 && rating <= 3) {
    return Colors.brand_red;
  } else if (rating > 3 && rating <= 6) {
    return Colors.brand_yellow;
  } else if (rating > 6 && rating <= 10) {
    return Colors.brand_green;
  }
}

export function GetDepartmentPerson(department) {
  switch (department) {
    case "Acting":
      return "Atuação";
    case "Scripted":
      return "Roteirização";
  }
}
