// simple-map.js - A minimal map for AI Town
export default {
  // Basic map dimensions (smaller than default for simplicity)
  width: 20,
  height: 20,
  
  // Tileset information
  tileSetUrl: "/tilesets/gentle.png",  // Using existing tileset
  tileSetDimX: 512,
  tileSetDimY: 512,
  tileDim: 32,  // 32x32 tiles
  
  // Background tiles - create a simple grass field
  // We need a 3D array: [layer][x][y]
  bgTiles: [
    // Layer 0 - base grass everywhere
    Array(20).fill().map(() => Array(20).fill(0))  // Use tile index 0 for grass
  ],
  
  // Object tiles - create a simple border wall and some internal obstacles
  objectTiles: [
    // Create a 2D array for tile indices, -1 means empty
    Array(20).fill().map((_, x) => Array(20).fill().map((_, y) => {
      // Border walls
      if (x === 0 || y === 0 || x === 19 || y === 19) {
        return 5;  // Wall tile
      }
      
      // Some random obstacles in the middle
      if ((x === 5 && y === 5) || 
          (x === 15 && y === 15) || 
          (x === 10 && (y >= 7 && y <= 12))) {
        return 6;  // Obstacle tile
      }
      
      return -1;  // Empty space
    }))
  ],
  
  // No animated sprites for simplicity
  animatedSprites: []
};
