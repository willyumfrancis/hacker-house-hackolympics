import { useState } from "react";
import Button from "./Button";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "react-toastify";

export function ResetWorldButton() {
  const init = useMutation(api.init.default);
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async () => {
    if (isLoading) return;
    
    if (!confirm("Are you sure you want to reset the world? This will delete all existing agents and create a new world with the simple map.")) {
      return;
    }
    
    setIsLoading(true);
    try {
      // This will trigger the init function which now uses our simple map
      await init({ autoCreateAgents: false });
      toast.success("World has been reset with the simple map!");
      
      // Reload the page to show the new world
      window.location.reload();
    } catch (error) {
      console.error("Failed to reset world:", error);
      toast.error("Failed to reset world");
    } finally {
      setIsLoading(false);
    }
  };

  // Create a simple button div instead of using Button component
  // since it doesn't support 'disabled' and requires an imgUrl
  return (
    <button
      onClick={handleReset}
      disabled={isLoading} 
      className={`px-4 py-2 rounded ${isLoading ? 'bg-gray-500' : 'bg-red-600 hover:bg-red-700'} text-white font-bold`}
    >
      {isLoading ? "Resetting..." : "Reset World (Use Simple Map)"}
    </button>
  );
}
