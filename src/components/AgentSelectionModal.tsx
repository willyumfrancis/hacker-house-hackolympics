import { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';
import { toast } from 'react-toastify';

interface AgentSelectionModalProps {
  worldId: Id<'worlds'>;
  onClose: () => void;
  onAgentsSelected: () => void;
}

export default function AgentSelectionModal({ worldId, onClose, onAgentsSelected }: AgentSelectionModalProps) {
  const availableAgents = useQuery(api.world.availableAgents);
  const createSelectedAgents = useMutation(api.world.createSelectedAgents);
  
  // Initialize with empty array and use useEffect to populate once data is available
  const [selectedAgents, setSelectedAgents] = useState<number[]>([]);
  
  // State for storing specializations for each agent
  const [specializations, setSpecializations] = useState<{[key: number]: string}>({});
  
  // Pre-select all agents by default since we only have 3 San Francisco-themed agents
  useEffect(() => {
    if (availableAgents && availableAgents.length > 0) {
      setSelectedAgents(Array.from({ length: availableAgents.length }, (_, i) => i));
      
      // Initialize empty specializations
      const initialSpecializations: {[key: number]: string} = {};
      availableAgents.forEach((_, index) => {
        initialSpecializations[index] = '';
      });
      setSpecializations(initialSpecializations);
    }
  }, [availableAgents]);
  const [isCreatingAgents, setIsCreatingAgents] = useState(false);

  const handleAgentToggle = (agentIndex: number) => {
    setSelectedAgents(prev => 
      prev.includes(agentIndex)
        ? prev.filter(index => index !== agentIndex)
        : [...prev, agentIndex]
    );
  };

  const handleCreateAgents = async () => {
    if (selectedAgents.length === 0) return;
    
    setIsCreatingAgents(true);
    try {
      // Create an array of agents with their specializations
      const agentsWithSpecializations = selectedAgents.map(index => ({
        agentIndex: index,
        specialization: specializations[index] || ''
      }));
      
      await createSelectedAgents({
        worldId,
        selectedAgents: agentsWithSpecializations,
      });
      onAgentsSelected();
      toast.success('Agents created successfully!');
    } catch (error) {
      console.error('Failed to create agents:', error);
      toast.error('Failed to create agents');
    } finally {
      setIsCreatingAgents(false);
    }
  };

  const handleSelectAll = () => {
    if (availableAgents) {
      setSelectedAgents(availableAgents.map((_, index) => index));
    }
  };

  const handleSelectNone = () => {
    setSelectedAgents([]);
  };

  if (!availableAgents) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6">
          <div className="text-center">Loading agents...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] pointer-events-auto" style={{ pointerEvents: 'auto' }}>
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Choose San Francisco AI Agents</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600 mb-4">
            Select which San Francisco-themed AI agents you'd like to add to your world. Create multiple copies of the same agent type for more chaotic interactions!
          </p>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={handleSelectAll}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
          >
            Select All
          </button>
          <button
            onClick={handleSelectNone}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            Select None
          </button>
          <span className="ml-auto text-sm text-gray-500">
            {selectedAgents.length} of {availableAgents.length} selected
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {availableAgents.map((agent, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 transition-all ${
                selectedAgents.includes(index)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedAgents.includes(index)}
                  onChange={() => handleAgentToggle(index)}
                  className="mr-3"
                  id={`agent-${index}`}
                />
                <label htmlFor={`agent-${index}`} className="font-semibold text-lg cursor-pointer">{agent.name}</label>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Goal:</strong> {agent.plan}
              </p>
              <p className="text-xs text-gray-500 line-clamp-3 mb-3">
                {agent.identity}
              </p>
              
              {selectedAgents.includes(index) && (
                <div className="mt-3">
                  <label htmlFor={`specialization-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Specialization (Optional)
                  </label>
                  <input
                    type="text"
                    id={`specialization-${index}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., ClimateTech, AI, Blockchain"
                    value={specializations[index] || ''}
                    onChange={(e) => {
                      setSpecializations(prev => ({
                        ...prev,
                        [index]: e.target.value
                      }));
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateAgents}
            disabled={selectedAgents.length === 0 || isCreatingAgents}
            className={`px-6 py-2 rounded font-medium ${
              selectedAgents.length === 0 || isCreatingAgents
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isCreatingAgents ? 'Creating Agents...' : `Create ${selectedAgents.length} Agent${selectedAgents.length !== 1 ? 's' : ''}`}
          </button>
        </div>
      </div>
    </div>
  );
}