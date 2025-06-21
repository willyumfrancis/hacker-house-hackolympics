import { SerializedWorldMap } from './worldMap';

// Define the simple map directly in this file to avoid import issues
// This is a simplified map for AI Town with a modern San Francisco theme
export const simpleMap: SerializedWorldMap = {
  // Basic map dimensions (smaller than default for simplicity)
  width: 20,
  height: 20,
  
  // Tileset information - still using the existing tileset but selecting urban-looking tiles
  tileSetUrl: "/tilesets/gentle.png",  // Using existing tileset
  tileSetDimX: 512,
  tileSetDimY: 512,
  tileDim: 32,  // 32x32 tiles
  
  // Background tiles - create a concrete/asphalt urban ground
  // We need a 3D array: [layer][x][y]
  bgTiles: [
    // Layer 0 - base concrete/asphalt everywhere
    Array(20).fill(null).map(() => Array(20).fill(112))  // Use tile index 112 for concrete/asphalt look
  ],
  
  // Object tiles - create modern urban elements
  objectTiles: [
    // Create a 2D array for tile indices, -1 means empty
    Array(20).fill(null).map((_, x) => 
      Array(20).fill(null).map((_, y) => {
        // Border buildings/barriers
        if (x === 0 || y === 0 || x === 19 || y === 19) {
          // Use various urban-looking tiles for borders to create a city feel
          if (x % 3 === 0) return 23;  // Building wall
          if (x % 3 === 1) return 24;  // Different building wall
          return 25; // Another building variation
        }
        
        // Add some San Francisco style urban elements
        
        // Office buildings/structures
        if ((x === 5 && y === 5) || (x === 15 && y === 15)) {
          return 89;  // Modern structure
        }
        
        // City street furniture - benches, trash cans, etc.
        if (x === 3 && y === 10) return 45;
        if (x === 17 && y === 7) return 46;
        
        // Tech company "campus" in the middle
        if (x === 10 && (y >= 7 && y <= 12)) {
          // Different buildings for the tech campus
          if (y % 3 === 0) return 75;
          if (y % 3 === 1) return 76;
          return 77;
        }
        
        // Some parking spots and urban details
        if ((x === 7 && y === 7) || (x === 13 && y === 13)) {
          return 35; // Parking or urban detail
        }
        
        // Coffee shop (very San Francisco)
        if (x === 8 && y === 16) {
          return 64;
        }
        
        return -1;  // Empty space
      })
    )
  ],
  
  // No animated sprites for simplicity
  animatedSprites: []
};
