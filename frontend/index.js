const showSnakeyChart = (data) => {
  const lamaEscoDictionary = {};
  for (const dataRecord of data) {
    lamaEscoDictionary[dataRecord.lamas_name] = {
      name: dataRecord.preferredLabel,
      rank: dataRecord.avgAll3Scores,
    };
  }

  const uniqueLamas = [
    ...new Set(data.map((dataRecord) => dataRecord.lamas_name)),
  ];
  const uniqueEscos = [
    ...new Set(data.map((dataRecord) => dataRecord.preferredLabel)),
  ];
  const label = [...uniqueLamas, ...uniqueEscos];
  const source = [];
  const target = [];
  const value = [];
  for (let sourceIndex = 0; sourceIndex < uniqueLamas.length; sourceIndex++) {
    const lama = uniqueLamas[sourceIndex];
    const targetIndex =
      uniqueEscos.findIndex((esco) => esco === lamaEscoDictionary[lama].name) +
      uniqueLamas.length;
    source.push(sourceIndex);
    target.push(targetIndex);
    // value.push(Math.round(lamaEscoDictionary[lama].rank * 10));
    value.push(lamaEscoDictionary[lama].rank);
  }
  const color = label.map((dataRecord) => "blue");
  const chartProps = {
    type: "sankey",
    orientation: "h",
    node: {
      pad: 15,
      thickness: 30,
      line: {
        color: "black",
        width: 0.5,
      },
      label,
      color,
    },

    link: {
      source,
      target,
      value,
    },
  };

  const layout = {
    title: "Lamas Esco taxonomy",
    height: 10000,
    font: {
      size: 10,
    },
  };

  Plotly.react("myDiv", [chartProps], layout);
};

fetch("lamas_esco")
  .then((response) => response.json())
  .then(showSnakeyChart)
  .catch((error) => console.error(error));
