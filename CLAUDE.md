# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Run full development stack (backend + frontend in parallel)
- `npm run dev:backend` - Run Convex backend with tail logs
- `npm run dev:frontend` - Run Vite frontend development server
- `npm run predev` - Initialize Convex backend (run `convex dev --run init --until-success`)

### Build and Testing
- `npm run build` - Build production bundle (TypeScript compilation + Vite build)
- `npm run test` - Run Jest tests with experimental VM modules
- `npm run lint` - Run ESLint on codebase

### Convex-Specific Commands
- `npx convex deploy` - Deploy functions to production
- `npx convex run init --prod` - Initialize production environment
- `npx convex run testing:wipeAllTables` - Wipe all database tables (destructive)
- `npx convex run testing:stop` - Stop backend engine and agents
- `npx convex run testing:resume` - Restart backend after stopping
- `npx convex run testing:kick` - Kick engine if agents aren't running
- `npx convex run testing:archive` - Archive current world and reset
- `npx convex dashboard` - Open Convex dashboard

### Map Editor
- `npm run level-editor` or `npm run le` - Start map/level editor

## Architecture Overview

AI Town is a multi-layered simulation platform built on Convex:

### Core Layers
1. **Game Engine** (`convex/engine/`) - Generic simulation framework with step-based execution, input handling, and state management
2. **AI Town Game Logic** (`convex/aiTown/`) - Specific game rules, player movement, conversations, and world simulation
3. **Agent System** (`convex/agent/`) - AI agent behavior with LLM integration, memory, and conversation management
4. **Frontend** (`src/`) - React + PixiJS game client with real-time rendering

### Key Components
- **World Simulation**: Tick-based engine running at 60 FPS, batched into 1-second steps
- **Input System**: All user/agent actions go through `convex/aiTown/inputs.ts` handlers
- **Historical Objects**: Smooth client-side interpolation for positions using `HistoricalObject`
- **Message System**: Separate from game state for low-latency chat with streaming LLM responses
- **Vector Memory**: Agent memories stored with embeddings for contextual conversation

### Data Flow
1. Inputs submitted via `insertInput` → processed in game engine → state updated
2. Client uses `useQuery` hooks to read game state, `useHistoricalValue` for smooth animations
3. Agents run in game loop, schedule async operations for LLM calls, submit inputs back to game

## File Structure

### Backend (Convex)
- `convex/schema.ts` - Main database schema combining all subsystems
- `convex/aiTown/` - Game-specific logic (players, conversations, world, movement)
- `convex/engine/` - Reusable game engine framework
- `convex/agent/` - AI agent behavior and LLM integration
- `convex/util/` - Utilities (LLM clients, compression, geometry, etc.)

### Frontend
- `src/components/` - React components for game UI
- `src/hooks/` - Custom React hooks for Convex integration
- `data/characters.ts` - Character definitions and sprite configurations
- `data/spritesheets/` - Character sprite data
- `public/assets/` - Game assets (images, sounds, fonts)

### Configuration
- Characters and world map modified in `data/characters.ts` and `data/gentle.js`
- LLM configuration in `convex/util/llm.ts`
- Game constants in `convex/constants.ts`

## Important Notes

### Character/World Changes
Always run `npx convex run testing:wipeAllTables` and restart `npm run dev` after modifying character data or world configuration, as this data is uploaded to Convex on initial load.

### LLM Configuration
The system supports multiple LLM providers (Ollama, OpenAI, Together.ai). Change `EMBEDDING_DIMENSION` in `convex/util/llm.ts` when switching providers and wipe database to regenerate embeddings.

### Development Patterns
- Game state modifications go through input handlers in `convex/aiTown/inputs.ts`
- Agent async operations use `internalAction` -> `internalMutation` -> input submission pattern
- UI components use standard Convex `useQuery` hooks plus `useHistoricalValue` for animations
- Single-threaded game engine per world prevents race conditions