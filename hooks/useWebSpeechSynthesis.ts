import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";

export function useWebSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isSpeakingRef = useRef(false);

  // Initialize Speech Synthesis
  useEffect(() => {
    if (Platform.OS === "web" && typeof window !== "undefined") {
      synthesisRef.current = window.speechSynthesis;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
      stopAudioMonitoring();
    };
  }, []);

  const stopAudioMonitoring = () => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setAudioLevel(0);
  };

  const simulateAudioLevel = () => {
    // Simulate audio levels with a realistic pulsing pattern
    // Since we can't directly capture SpeechSynthesis output, we create
    // a dynamic pulse pattern that mimics speech patterns
    let phase = 0;
    let time = 0;
    
    const updateSimulatedLevel = () => {
      if (!isSpeakingRef.current) {
        setAudioLevel(0);
        return;
      }
      
      time += 0.016; // ~60fps
      phase += 0.15;
      
      // Create a complex, varying pulse pattern that mimics speech
      // Multiple sine waves at different frequencies create natural variation
      const baseLevel = 0.25;
      const pulse1 = Math.sin(phase) * 0.25;
      const pulse2 = Math.sin(phase * 1.7) * 0.15;
      const pulse3 = Math.sin(phase * 2.3) * 0.1;
      const pulse4 = Math.sin(phase * 3.5) * 0.08;
      
      // Add occasional "bursts" to simulate word emphasis
      const burst = Math.random() > 0.95 ? 0.15 : 0;
      
      // Combine all pulses for natural variation
      const level = Math.max(0, Math.min(1, baseLevel + pulse1 + pulse2 + pulse3 + pulse4 + burst));
      setAudioLevel(level);
      
      if (isSpeakingRef.current) {
        animationFrameRef.current = requestAnimationFrame(updateSimulatedLevel);
      }
    };
    
    updateSimulatedLevel();
  };

  const speak = (text: string) => {
    if (!synthesisRef.current || Platform.OS !== "web") {
      console.warn("Speech synthesis not available");
      return;
    }

    // Cancel any ongoing speech
    stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      isSpeakingRef.current = true;
      setIsSpeaking(true);
      simulateAudioLevel();
    };

    utterance.onend = () => {
      isSpeakingRef.current = false;
      setIsSpeaking(false);
      stopAudioMonitoring();
      setAudioLevel(0);
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      isSpeakingRef.current = false;
      setIsSpeaking(false);
      stopAudioMonitoring();
      setAudioLevel(0);
    };

    utteranceRef.current = utterance;
    synthesisRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
    }
    isSpeakingRef.current = false;
    setIsSpeaking(false);
    stopAudioMonitoring();
    setAudioLevel(0);
  };

  return {
    speak,
    stopSpeaking,
    isSpeaking,
    audioLevel,
  };
}

