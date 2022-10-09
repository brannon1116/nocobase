import { uid } from '@formily/shared';



const shape = {
  ER: 'er-rect',
  EDGE: 'edge',
};

export const formatData = (data) => {
  const edgeData = [];
  const targetTablekeys = [];
  const tableData = data.map((item, index) => {
    const ports = item.fields.map((field) => {
      edgeData.push(field);
      return {
        id: field.key,
        name: field.name,
        group: 'list',
      };
    });
    targetTablekeys.push(item.name);
    return {
      id: item.key,
      shape: shape.ER,
      name: item.name,
      title: item.title,
      width: 200,
      height: 24,
      ports,
      item: item,
    };
  });
  const edges = formatEdgeData(edgeData, targetTablekeys, tableData);
  return { nodes: tableData, edges };
};

const formatEdgeData = (data, targetTables, tableData) => {
  const edges = [];
  for (let i = 0; i < data.length; i++) {
    if (
      targetTables.includes(data[i].target) &&
      ['obo', 'oho', 'o2o', 'o2m', 'm2o', 'm2m', 'linkTo'].includes(data[i].interface)
    ) {
      const targetTable = tableData.find((v) => v.name === data[i].target);
      const sourceTable = tableData.find((v) => v.name === data[i].collectionName);
      if (data[i].interface === 'm2m') {
        const throughTable = tableData.find((v) => v.name === data[i].through);
        throughTable &&
          edges.push({
            id: uid(),
            source: {
              cell: sourceTable.id,
              port: sourceTable.ports.find((v) => v.name === data[i].sourceKey).id,
              anchor: 'center',
            },
            target: {
              cell: throughTable.id,
              port: throughTable.ports.find((v) => v.name === data[i].foreignKey).id,
              anchor: 'center', 
            },
            attrs: {
              line: {
                stroke: '#A2B1C3',
                strokeWidth: 1,
                textAnchor: 'middle',
                textVerticalAnchor: 'middle',
              },
            },
            connector: 'rounded',
            router: 'manhattan',
            labels: [
              {
                markup: [
                  {
                    tagName: 'ellipse',
                    selector: 'labelBody',
                  },
                  {
                    tagName: 'text',
                    selector: 'labelText',
                  },
                ],
                attrs: {
                  labelText: {
                    text: '1',
                    fill: '#ffa940',
                    textAnchor: 'middle',
                    textVerticalAnchor: 'middle',
                  },
                  labelBody: {
                    ref: 'labelText',
                    refWidth: '100%',
                    refHeight: '100%',
                    stroke: '#ffa940',
                    fill: '#fff',
                    strokeWidth: 1,
                    rx: 15,
                    ry: 15,
                  },
                },
                position: {
                  distance: 0.3,
                  args: {
                    keepGradient: true,
                    ensureLegibility: true,
                  },
                },
              },
              {
                markup: [
                  {
                    tagName: 'ellipse',
                    selector: 'labelBody',
                  },
                  {
                    tagName: 'text',
                    selector: 'labelText',
                  },
                ],
                attrs: {
                  labelText: {
                    text: 'N',
                    fill: '#ffa940',
                    textAnchor: 'middle',
                    textVerticalAnchor: 'middle',
                  },
                  labelBody: {
                    ref: 'labelText',
                    refWidth: '100%',
                    refHeight: '100%',
                    stroke: '#ffa940',
                    fill: '#fff',
                    rx: 15,
                    ry: 15,
                    strokeWidth: 1,
                  },
                },
                position: {
                  distance: 0.7,
                  args: {
                    keepGradient: true,
                    ensureLegibility: true,
                  },
                },
              },
            ],
          });
      } else {
        const legalEdge = tableData
          .find((v) => v.name == data[i].collectionName)
          .ports.find((v) => v.name === data[i].foreignKey);
        legalEdge &&
          edges.push({
            id: uid(),
            source: {
              cell: sourceTable.id,
              port: legalEdge.id,
              anchor: 'center',
            },
            target: {
              cell: targetTable.id,
              port: targetTable.ports.find((v) => v.name === data[i].targetKey).id,
              anchor: 'center',
            },
            attrs: {
              line: {
                stroke: '#A2B1C3',
                strokeWidth: 1,
                textAnchor: 'middle',
                textVerticalAnchor: 'middle',
              },
            },
            connector: 'rounded',
            router:
              sourceTable.id === targetTable.id
                ? {
                    name: 'oneSide',
                    args: {
                      side: 'left',
                    },
                  }
                : 'manhattan',
            labels: [
              {
                markup: [
                  {
                    tagName: 'ellipse',
                    selector: 'labelBody',
                  },
                  {
                    tagName: 'text',
                    selector: 'labelText',
                  },
                ],
                attrs: {
                  labelText: {
                    text: getRelationship(data[i].interface)[0],
                    fill: '#ffa940',
                    textAnchor: 'middle',
                    textVerticalAnchor: 'middle',
                  },
                  labelBody: {
                    ref: 'labelText',
                    refWidth: '100%',
                    refHeight: '100%',
                    stroke: '#ffa940',
                    fill: '#fff',
                    strokeWidth: 1,
                    rx: 15,
                    ry: 15,
                  },
                },
                position: {
                  distance: 0.3,
                  args: {
                    keepGradient: true,
                    ensureLegibility: true,
                  },
                },
              },
              {
                markup: [
                  {
                    tagName: 'ellipse',
                    selector: 'labelBody',
                  },
                  {
                    tagName: 'text',
                    selector: 'labelText',
                  },
                ],
                attrs: {
                  labelText: {
                    text: getRelationship(data[i].interface)[1],
                    fill: '#ffa940',
                    textAnchor: 'middle',
                    textVerticalAnchor: 'middle',
                  },
                  labelBody: {
                    ref: 'labelText',
                    refWidth: '100%',
                    refHeight: '100%',
                    stroke: '#ffa940',
                    fill: '#fff',
                    rx: 15,
                    ry: 15,
                    strokeWidth: 1,
                  },
                },
                position: {
                  distance: 0.7,
                  args: {
                    keepGradient: true,
                    ensureLegibility: true,
                  },
                },
              },
            ],
          });
      }
    }
  }
  return edges;
};

const getRelationship = (relatioship) => {
  switch (relatioship) {
    case 'm2m':
    case 'linkTo':
      return ['N', 'N'];
    case 'o2m':
      return ['1', 'N'];
    case 'm2o':
      return ['N', '1'];
    case 'obo':
    case 'oho':
      return ['1', '1'];
    default:
      return [];
  }
};



 


  