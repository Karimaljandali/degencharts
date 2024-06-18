/* Imports */
import { Root, ColorSet, Tooltip, GrainPattern, Scrollbar, color } from "@amcharts/amcharts5";
import { XYChart, XYCursor, CategoryAxis, AxisRendererX, SmoothedXLineSeries, AxisRendererY, ValueAxis } from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

/* Chart code */
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
let root = Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
let chart = root.container.children.push(XYChart.new(root, {
  panX: true,
  panY: true,
  wheelX: "panX",
  wheelY: "zoomX",
  pinchZoomX: true
}));


chart.set("colors", ColorSet.new(root, {
  step: 2,
  colors: [
    color(0x73556E),
    color(0x9FA1A6),
    color(0xF2AA6B),
    color(0xF28F6B),
    color(0xA95A52),
    color(0xE35B5D),
    color(0xFFA446)
  ]
}))


// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
let cursor = chart.set("cursor", XYCursor.new(root, {
  behavior: "none"
}));
cursor.lineY.set("visible", false);


// The data
let data = [{
  "year": "2001",
  "cars": 1298,
  "motorcycles": 680,
  "bicycles": 101
}, {
  "year": "2002",
  "cars": 1275,
  "motorcycles": 664,
  "bicycles": 97
}, {
  "year": "2003",
  "cars": 1246,
  "motorcycles": 648,
  "bicycles": 93
}, {
  "year": "2004",
  "cars": 1318,
  "motorcycles": 697,
  "bicycles": 111
}, {
  "year": "2005",
  "cars": 1213,
  "motorcycles": 633,
  "bicycles": 87
}, {
  "year": "2006",
  "cars": 1199,
  "motorcycles": 521,
  "bicycles": 145
}, {
  "year": "2007",
  "cars": 1110,
  "motorcycles": 310,
  "bicycles": 91
}, {
  "year": "2008",
  "cars": 1165,
  "motorcycles": 425,
  "bicycles": 120
}, {
  "year": "2009",
  "cars": 1145,
  "motorcycles": 319,
  "bicycles": 102
}, {
  "year": "2010",
  "cars": 1163,
  "motorcycles": 201,
  "bicycles": 145
}, {
  "year": "2011",
  "cars": 1180,
  "motorcycles": 285,
  "bicycles": 100
}, {
  "year": "2012",
  "cars": 1159,
  "motorcycles": 255,
  "bicycles": 122
}];


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
let xAxis = chart.xAxes.push(CategoryAxis.new(root, {
  categoryField: "year",
  startLocation: 0.5,
  endLocation: 0.5,
  renderer: AxisRendererX.new(root, {
    minorGridEnabled: true,
    minGridDistance: 70
  }),
  tooltip: Tooltip.new(root, {})
}));

xAxis.data.setAll(data);

let yAxis = chart.yAxes.push(ValueAxis.new(root, {
  renderer: AxisRendererY.new(root, {})
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/

function createSeries(name: string, field: string) {
  let series = chart.series.push(SmoothedXLineSeries.new(root, {
    name: name,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: field,
    categoryXField: "year",
    stacked: true,
    stroke: color(0xffffff),
    tooltip: Tooltip.new(root, {
      pointerOrientation: "horizontal",
      labelText: "[bold]{name}[/]\n{categoryX}: {valueY}"
    })
  }));

  series.strokes.template.setAll({
    strokeWidth: 4,
    strokeOpacity: 1,
    shadowBlur: 2,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
    shadowColor: color(0x000000),
    shadowOpacity: 0.1
  })

  series.fills.template.setAll({
    fillOpacity: 1,
    visible: true,

    fillPattern: GrainPattern.new(root, {
      maxOpacity: 0.15,
      density: 0.5,
      colors: [color(0x000000), color(0x000000), color(0xffffff)]
    })

  });

  series.data.setAll(data);
  series.appear(1000);
}

createSeries("Cars", "cars");
createSeries("Motorcycles", "motorcycles");
createSeries("Bicycles", "bicycles");

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", Scrollbar.new(root, {
  orientation: "horizontal"
}));

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
chart.appear(1000, 100);

console.log(chart)