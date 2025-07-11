🇲🇼 Malawi Districts Graph Visualization

This project visualizes connections between Malawi's districts using a force-directed graph layout algorithm. The output is an optimized layout that clearly shows how districts are connected, minimizing overlaps and improving readability.

📸 Preview

The layout is rendered using an HTML5 <canvas> element, showcasing districts as nodes and their connections as edges.

📂 Project Structure

.
├── index.html          # Web page with a canvas to render the graph
├── malawiGraph.js      # Force-directed layout algorithm + visualization logic
└── README.md           

🚀 How to Run

Clone this repository

git clone https://github.com/petroskayange/MalawiDistrictConnections
cd MalawiDistrictConnections

Open the Visualization

Simply open index.html in any modern browser (e.g. Chrome, Firefox, Edge):

You can double-click index.html, or

From the terminal:

open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows

See the Output

The canvas will render the districts as black nodes with labeled names, and the edges (connections) will appear as light gray lines.

OR run 
node malawiGraph.js

🧠 How It Works

malawiGraph.js contains:

Raw district data (nodes and edges)

A force-directed layout algorithm that repositions nodes by simulating repulsive and attractive forces

Code to draw the final graph onto the canvas

Coordinates are normalized (between 0 and 1) and scaled to fit the canvas.

🔧 Customize

You can modify:

iterations, k, and temp values in the forceDirectedLayout() function to change the simulation behavior.

📄 License

MIT License © 2025 [Petros Kayange]