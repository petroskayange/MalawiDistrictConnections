const graphData = {
  "nodes": [
    { "id": "Blantyre", "x": 0.9134213014976535, "y": 0.2540740323898225 },
    { "id": "Chikwawa", "x": 0.14374226893980302, "y": 0.3910154112946962 },
    { "id": "Chiradzulu", "x": 0.9351749046225152, "y": 0.5027042682331085 },
    { "id": "Chitipa", "x": 0.5033532302137712, "y": 0.6371050642113303 },
    { "id": "Dedza", "x": 0.32675593364689126, "y": 0.32741458873737384 },
    { "id": "Dowa", "x": 0.44893854232683894, "y": 0.3534310438093927 },
    { "id": "Karonga", "x": 0.7719114930591756, "y": 0.7164846847486838 },
    { "id": "Kasungu", "x": 0.9486271739760203, "y": 0.03717616769235954 },
    { "id": "Lilongwe", "x": 0.03185092819745572, "y": 0.07907784991666855 },
    { "id": "Machinga", "x": 0.4976553188158377, "y": 0.15957191749775634 },
    { "id": "Mangochi", "x": 0.2417748469656349, "y": 0.22132470346325728 },
    { "id": "Mchinji", "x": 0.8029651384628501, "y": 0.4170419722297135 },
    { "id": "Mulanje", "x": 0.6998851394303303, "y": 0.7300336822154281 },
    { "id": "Mwanza", "x": 0.3093976112949879, "y": 0.9141857772478698 },
    { "id": "Mzimba", "x": 0.16190201617155997, "y": 0.8356366262711726 },
    { "id": "Neno", "x": 0.9869012833729535, "y": 0.3511167097222222 },
    { "id": "Nkhata Bay", "x": 0.0882233026546202, "y": 0.18674223158715342 },
    { "id": "Nkhotakota", "x": 0.17467106409589772, "y": 0.0010883823237957113 },
    { "id": "Nsanje", "x": 0.8093914854184416, "y": 0.5079865816371467 },
    { "id": "Ntcheu", "x": 0.8588177668360885, "y": 0.4167540312634731 },
    { "id": "Ntchisi", "x": 0.3969781197576786, "y": 0.9982702660465445 },
    { "id": "Phalombe", "x": 0.934352810085411, "y": 0.7328019939159007 },
    { "id": "Rumphi", "x": 0.2438492080065875, "y": 0.0387865957339274 },
    { "id": "Salima", "x": 0.837201462046805, "y": 0.9965726289086905 },
    { "id": "Thyolo", "x": 0.6272655175304893, "y": 0.7688215502317457 },
    { "id": "Zomba", "x": 0.7252659639019722, "y": 0.810888016094619 },
    { "id": "Balaka", "x": 0.15932838570160823, "y": 0.5698123530031478 },
    { "id": "Likoma", "x": 0.3488343806746971, "y": 0.6253864059894712 }
  ],
  "edges": [
    ["Blantyre", "Chikwawa"], ["Blantyre", "Chiradzulu"], ["Blantyre", "Thyolo"],
    ["Chikwawa", "Nsanje"], ["Chikwawa", "Mwanza"], ["Chiradzulu", "Zomba"],
    ["Chiradzulu", "Phalombe"], ["Chitipa", "Karonga"], ["Dedza", "Lilongwe"],
    ["Dedza", "Ntcheu"], ["Dowa", "Lilongwe"], ["Dowa", "Ntchisi"],
    ["Karonga", "Rumphi"], ["Kasungu", "Lilongwe"], ["Kasungu", "Mzimba"],
    ["Lilongwe", "Mchinji"], ["Lilongwe", "Salima"], ["Machinga", "Zomba"],
    ["Machinga", "Balaka"], ["Mangochi", "Balaka"], ["Mangochi", "Salima"],
    ["Mulanje", "Phalombe"], ["Mulanje", "Thyolo"], ["Mwanza", "Neno"],
    ["Mzimba", "Nkhata Bay"], ["Mzimba", "Rumphi"], ["Nkhata Bay", "Nkhotakota"],
    ["Nkhotakota", "Salima"], ["Nsanje", "Chikwawa"], ["Ntcheu", "Balaka"],
    ["Ntchisi", "Nkhotakota"], ["Phalombe", "Mulanje"], ["Salima", "Nkhotakota"],
    ["Zomba", "Machinga"]
  ]
};

// --- Force-Directed Layout Algorithm ---

function forceDirectedLayout(nodes, edges, iterations = 200.1, k = 0.05, temp = 0.1) {
  const nodeMap = new Map(nodes.map(node => [node.id, { ...node, dx: 0, dy: 0 }]));

  for (let i = 0; i < iterations; i++) {
    nodeMap.forEach(node => {
      node.dx = 0;
      node.dy = 0;
    });

    // 1. Calculate Repulsive Forces
    for (let j = 0; j < nodes.length; j++) {
      const node1 = nodeMap.get(nodes[j].id);
      for (let l = j + 1; l < nodes.length; l++) {
        const node2 = nodeMap.get(nodes[l].id);

        const dx = node1.x - node2.x;
        const dy = node1.y - node2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance === 0) { 
          node1.x += Math.random() * 0.001;
          node1.y += Math.random() * 0.001;
          node2.x -= Math.random() * 0.001;
          node2.y -= Math.random() * 0.001;
          continue;
        }

        const force = (k * k) / distance; // F = k^2 / d (repulsion)

        node1.dx += (dx / distance) * force;
        node1.dy += (dy / distance) * force;
        node2.dx -= (dx / distance) * force;
        node2.dy -= (dy / distance) * force;
      }
    }

    // 2. Calculate Attractive Forces
    edges.forEach(edge => {
      const node1 = nodeMap.get(edge[0]);
      const node2 = nodeMap.get(edge[1]);

      const dx = node1.x - node2.x;
      const dy = node1.y - node2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance === 0) { 
        return;
      }

      const force = (distance * distance) / k; // F = d^2 / k (attraction)

      node1.dx -= (dx / distance) * force;
      node1.dy -= (dy / distance) * force;
      node2.dx += (dx / distance) * force;
      node2.dy += (dy / distance) * force;
    });

    // 3. Update Positions and Apply Cooling/Clamping
    nodeMap.forEach(node => {
      const displacement = Math.sqrt(node.dx * node.dx + node.dy * node.dy);
      if (displacement === 0) {
        return;
      }

      const x_offset = (node.dx / displacement) * Math.min(displacement, temp);
      const y_offset = (node.dy / displacement) * Math.min(displacement, temp);

      node.x += x_offset;
      node.y += y_offset;

      node.x = Math.max(0, Math.min(1, node.x));
      node.y = Math.max(0, Math.min(1, node.y));
    });

    temp *= (1 - i / iterations); 
    if (temp < 0.0001) temp = 0.0001; 
  }

  return Array.from(nodeMap.values()).map(({ id, x, y }) => ({ id, x, y }));
}

// Run the layout algorithm
const optimizedNodes = forceDirectedLayout(graphData.nodes, graphData.edges);

// Output the new positions
console.log("Optimized Node Positions:");
optimizedNodes.forEach(node => {
  console.log(`${node.id}: X=${node.x.toFixed(6)}, Y=${node.y.toFixed(6)}`);
});

// Visualize the graph
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('graphCanvas');
    if (!canvas) {
        console.warn("Canvas element not found. Skipping visualization.");
        return;
    }

    const ctx = canvas.getContext('2d');
    const width = canvas.width = 800; 
    const height = canvas.height = 800; 
    const visualizationPadding = 40; 

    const drawingAreaWidth = width - (2 * visualizationPadding);
    const drawingAreaHeight = height - (2 * visualizationPadding);

    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = '#E0E0E0'; 
    ctx.lineWidth = 1;
    ctx.strokeRect(
        visualizationPadding, 
        visualizationPadding, 
        drawingAreaWidth,     
        drawingAreaHeight    
    );

    const scaleX = drawingAreaWidth;
    const scaleY = drawingAreaHeight;

    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    graphData.edges.forEach(edge => {
        const node1 = optimizedNodes.find(n => n.id === edge[0]);
        const node2 = optimizedNodes.find(n => n.id === edge[1]);
        if (node1 && node2) {
            ctx.beginPath();
            ctx.moveTo(node1.x * scaleX + visualizationPadding, node1.y * scaleY + visualizationPadding);
            ctx.lineTo(node2.x * scaleX + visualizationPadding, node2.y * scaleY + visualizationPadding);
            ctx.stroke();
        }
    });

    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 0.5;
    const nodeRadius = 5; 
    optimizedNodes.forEach(node => {
        const cx = node.x * scaleX + visualizationPadding;
        const cy = node.y * scaleY + visualizationPadding;

        ctx.beginPath();
        ctx.arc(cx, cy, nodeRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = 'black';
        ctx.font = '12px Arial'; 
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.id, cx, cy - (nodeRadius + 6));
    });

});
