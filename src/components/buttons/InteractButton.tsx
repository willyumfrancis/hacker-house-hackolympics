import Button from './Button';
import { toast } from 'react-toastify';
import interactImg from '../../../assets/interact.svg';
import { useConvex, useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
// import { SignInButton } from '@clerk/clerk-react';
import { ConvexError } from 'convex/values';
import { Id } from '../../../convex/_generated/dataModel';
import { useCallback, useState } from 'react';
import { waitForInput } from '../../hooks/sendInput';
import { useServerGame } from '../../hooks/serverGame';
import AgentSelectionModal from '../AgentSelectionModal';

export default function InteractButton() {
  // const { isAuthenticated } = useConvexAuth();
  const worldStatus = useQuery(api.world.defaultWorldStatus);
  const worldId = worldStatus?.worldId;
  const game = useServerGame(worldId);
  const humanTokenIdentifier = useQuery(api.world.userStatus, worldId ? { worldId } : 'skip');
  const userPlayerId =
    game && [...game.world.players.values()].find((p) => p.human === humanTokenIdentifier)?.id;
  const join = useMutation(api.world.joinWorld);
  const leave = useMutation(api.world.leaveWorld);
  const isPlaying = !!userPlayerId;
  
  const [showAgentSelection, setShowAgentSelection] = useState(false);
  
  // Check if there are any agents in the world
  const hasAgents = game && game.world.agents.size > 0;
  

  const convex = useConvex();
  const joinInput = useCallback(
    async (worldId: Id<'worlds'>) => {
      let inputId;
      try {
        inputId = await join({ worldId });
      } catch (e: any) {
        if (e instanceof ConvexError) {
          toast.error(e.data);
          return;
        }
        throw e;
      }
      try {
        await waitForInput(convex, inputId);
      } catch (e: any) {
        toast.error(e.message);
      }
    },
    [convex],
  );

  const joinOrLeaveGame = () => {
    if (
      !worldId ||
      // || !isAuthenticated
      game === undefined
    ) {
      return;
    }
    
    if (isPlaying) {
      console.log(`Leaving game for player ${userPlayerId}`);
      void leave({ worldId });
    } else {
      // If no agents exist, inform user they need to choose agents first
      if (!hasAgents) {
        alert('Please choose agents first before joining the world!');
        return;
      }
      
      console.log(`Joining game`);
      void joinInput(worldId);
    }
  };

  const handleAgentsSelected = () => {
    setShowAgentSelection(false);
    // After agents are created, join the game
    if (worldId) {
      void joinInput(worldId);
    }
  };
  // if (!isAuthenticated || game === undefined) {
  //   return (
  //     <SignInButton>
  //       <Button imgUrl={interactImg}>Interact</Button>
  //     </SignInButton>
  //   );
  // }
  // Determine if we should show the choose agents button
  const shouldShowChooseAgents = game && !hasAgents && !isPlaying;

  return (
    <>
      {/* Always show the main Interact/Leave button */}
      <Button imgUrl={interactImg} onClick={joinOrLeaveGame}>
        {!game ? 'Loading...' : isPlaying ? 'Leave' : 'Interact'}
      </Button>
      
      {/* Show Choose Agents button when no agents exist */}
      {shouldShowChooseAgents && (
        <Button 
          imgUrl={interactImg} 
          onClick={() => setShowAgentSelection(true)}
        >
          Choose Agents
        </Button>
      )}
      
      {showAgentSelection && worldId && (
        <AgentSelectionModal
          worldId={worldId}
          onClose={() => setShowAgentSelection(false)}
          onAgentsSelected={handleAgentsSelected}
        />
      )}
    </>
  );
}
