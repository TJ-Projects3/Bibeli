import { useEffect, useRef } from "react";
import { Platform } from "react-native";

export function useWebSpeechRecognition(
  onTranscriptUpdate: (transcript: string) => void
) {
  const recognitionRef = useRef<any>(null);
  
  // Store the callback in a ref so it's always the latest version
  // but doesn't trigger useEffect re-runs
  const callbackRef = useRef(onTranscriptUpdate);
  
  // Update the ref whenever the callback changes
  useEffect(() => {
    callbackRef.current = onTranscriptUpdate;
  }, [onTranscriptUpdate]);

  useEffect(() => {
    if (Platform.OS === "web" && typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event: any) => {
          let interimTranscript = "";
          let finalTranscript = "";

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + " ";
            } else {
              interimTranscript += transcript;
            }
          }

          const fullTranscript = finalTranscript || interimTranscript;
          // Use the ref to call the latest callback without triggering re-runs
          callbackRef.current(fullTranscript);
          console.log("Transcript:", fullTranscript);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
        };
      }
    }
    // Empty dependency array - only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return recognitionRef;
}

