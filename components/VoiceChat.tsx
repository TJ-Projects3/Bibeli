import { useWebSpeechRecognition } from "@/hooks/useWebSpeechRecognition";
import { useWebSpeechSynthesis } from "@/hooks/useWebSpeechSynthesis";
import { transcribeAudio } from "@/utils/deepgram";
import { callGeminiAPI } from "@/utils/gemini";
import { Audio } from "expo-av";
import { useCallback, useEffect, useRef, useState } from "react";
import { Platform, View } from "react-native";
import { ChatSidebar } from "./ChatSidebar";
import { voiceChatStyles } from "./VoiceChat.styles";
import { VoiceChatUI } from "./VoiceChatUI";

/**
 * Conversation Entry Type
 *
 * This defines the structure of each conversation entry.
 * Think of it like a blueprint for what data we store.
 */
type ConversationEntry = {
  id: string; // Unique identifier (like a timestamp or random string)
  question: string; // What the user asked
  answer: string; // What the AI responded
  timestamp: Date; // When the conversation happened
};

export default function VoiceChat() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [AIResponse, setAIResponse] = useState("");
  const [isLoadingAIResponse, setIsLoadingAIResponse] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const recordingRef = useRef<Audio.Recording | null>(null);
  const [micLevel, setMicLevel] = useState(0);

  // Conversation History State
  // useState stores data that changes over time
  // conversations is an array that will hold all our Q&A pairs
  const [conversations, setConversations] = useState<ConversationEntry[]>([]);

  // Sidebar Visibility State
  // isSidebarVisible controls whether the chat sidebar is shown or hidden
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Refs for web microphone metering
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const dataArrayRef = useRef<Float32Array | null>(null);
  const byteArrayRef = useRef<Uint8Array | null>(null);

  // Web Speech API hook
  const recognitionRef = useWebSpeechRecognition(setTranscript);

  // Web Speech Synthesis hook for audio output
  const {
    speak,
    stopSpeaking,
    isSpeaking,
    audioLevel: outputAudioLevel,
  } = useWebSpeechSynthesis();

  // Call Gemini API with the transcript
  const handleGeminiCall = useCallback(
    async (userMessage: string) => {
      if (!userMessage.trim()) {
        console.log("Empty transcript, skipping AI call");
        return;
      }

      setIsLoadingAIResponse(true);
      setAIResponse("");

      try {
        const responseText = await callGeminiAPI(userMessage);
        setAIResponse(responseText);
        console.log("✅ Gemini API response:", responseText);

        // Speak the AI response using text-to-speech
        if (Platform.OS === "web") {
          speak(responseText);
        }

        // Save conversation to history
        // This creates a new conversation entry with:
        // - A unique ID (using timestamp + random number)
        // - The user's question
        // - The AI's answer
        // - Current timestamp
        const newConversation: ConversationEntry = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          question: userMessage,
          answer: responseText,
          timestamp: new Date(),
        };

        // Add the new conversation to our history array
        // setConversations creates a new array with the old conversations + new one
        // We use the spread operator (...) to copy all existing conversations
        setConversations((prevConversations) => [
          ...prevConversations,
          newConversation,
        ]);
      } catch (error: any) {
        console.error("❌ Gemini API error:", error);
        setAIResponse(`Error: ${error.message || "Failed to get AI response"}`);
      } finally {
        setIsLoadingAIResponse(false);
      }
    },
    [speak]
  );

  const stopWebMicMonitor = useCallback(async () => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    if (analyserRef.current) {
      analyserRef.current.disconnect();
      analyserRef.current = null;
    }

    if (audioContextRef.current) {
      await audioContextRef.current.close().catch(() => null);
      audioContextRef.current = null;
    }

    dataArrayRef.current = null;
    byteArrayRef.current = null;
    setMicLevel(0);
  }, []);

  const startWebMicMonitor = useCallback(async () => {
    if (audioContextRef.current) {
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();

      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.8;

      const bufferLength = analyser.fftSize;
      const dataArray = new Float32Array(bufferLength);
      const byteArray = new Uint8Array(bufferLength);

      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      mediaStreamRef.current = stream;
      dataArrayRef.current = dataArray;
      byteArrayRef.current = byteArray;

      const updateLevel = () => {
        const analyserNode = analyserRef.current;
        const array = dataArrayRef.current;

        if (!analyserNode || !array) {
          return;
        }

        if (typeof analyserNode.getFloatTimeDomainData === "function") {
          analyserNode.getFloatTimeDomainData(array as any);
        } else {
          const fallbackArray = byteArrayRef.current;
          if (!fallbackArray) {
            return;
          }
          analyserNode.getByteTimeDomainData(fallbackArray as any);
          for (let i = 0; i < fallbackArray.length; i += 1) {
            array[i] = fallbackArray[i] / 128 - 1;
          }
        }

        let sumSquares = 0;
        for (let i = 0; i < array.length; i += 1) {
          const sample = array[i];
          sumSquares += sample * sample;
        }

        const rms = Math.sqrt(sumSquares / array.length);
        setMicLevel(rms);

        animationFrameRef.current = requestAnimationFrame(updateLevel);
      };

      updateLevel();
    } catch (error) {
      console.error("Web audio metering failed:", error);
      await stopWebMicMonitor();
    }
  }, [stopWebMicMonitor]);

  const startRecording = async () => {
    try {
      // Clear previous responses when starting new recording
      setAIResponse("");
      setMicLevel(0);

      if (Platform.OS === "web") {
        // Use Web Speech API on web
        if (recognitionRef.current) {
          await startWebMicMonitor();
          recognitionRef.current.start();
          setIsRecording(true);
          console.log("Started recording (Web Speech API)");
        } else {
          console.error("Web Speech API not supported in this browser");
        }
      } else {
        // Use expo-av for mobile (iOS/Android)
        // Request microphone permissions
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== "granted") {
          console.error("Microphone permission denied");
          return;
        }

        // Configure audio mode for recording
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const highQuality = Audio.RecordingOptionsPresets.HIGH_QUALITY;
        const recordingOptions: Audio.RecordingOptions = {
          ...highQuality,
          isMeteringEnabled: true,
        };

        // Start recording
        const { recording: newRecording } = await Audio.Recording.createAsync(
          recordingOptions,
          (status) => {
            const metering =
              "metering" in status && typeof status.metering === "number"
                ? status.metering
                : undefined;

            if (typeof metering === "number") {
              const level = Math.max(0, Math.min(1, (metering + 160) / 160));
              setMicLevel(level);
            }
          },
          100
        );

        recordingRef.current = newRecording;
        setRecording(newRecording);
        setIsRecording(true);
        console.log("Started recording (expo-av)");
      }
    } catch (err) {
      console.error("Failed to start recording:", err);
    }
  };

  const stopRecording = async () => {
    try {
      if (Platform.OS === "web") {
        // Stop Web Speech API
        if (recognitionRef.current) {
          recognitionRef.current.stop();
          setIsRecording(false);
          console.log("Stopped recording (Web Speech API)");
          console.log("Final transcript:", transcript);

          await stopWebMicMonitor();

          // Call Gemini API with the transcript
          if (transcript.trim()) {
            await handleGeminiCall(transcript);
          }
        }
      } else {
        // Stop expo-av recording and transcribe with Deepgram
        if (recording) {
          setIsRecording(false);
          await recording.stopAndUnloadAsync();
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
          });

          const uri = recording.getURI();
          console.log("Recording stopped. Audio file:", uri);

          recording.setOnRecordingStatusUpdate(null);

          setMicLevel(0);

          // Transcribe audio with Deepgram
          if (uri) {
            try {
              const transcribedText = await transcribeAudio(uri);
              setTranscript(transcribedText);
              console.log("Transcript:", transcribedText);
              await handleGeminiCall(transcribedText);
            } catch (error) {
              console.error("Failed to transcribe audio:", error);
            }
          }
          recordingRef.current = null;
          setRecording(null);
        }
      }
    } catch (err) {
      console.error("Failed to stop recording:", err);
    }
  };

  const handlePress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleCancel = () => {
    if (isRecording) {
      stopRecording();
      return;
    }

    stopWebMicMonitor();
    stopSpeaking();
    setTranscript("");
    setAIResponse("");
    setMicLevel(0);
  };

  // Toggle sidebar visibility
  // This function flips the isSidebarVisible state between true and false
  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev); // !prev means "not previous value"
  };

  // Clear all conversations
  // This resets the conversations array to empty
  const clearChat = () => {
    setConversations([]);
  };

  useEffect(() => {
    return () => {
      stopWebMicMonitor();
      const activeRecording = recordingRef.current;
      if (activeRecording) {
        activeRecording.stopAndUnloadAsync().catch(() => null);
      }
    };
  }, [stopWebMicMonitor]);

  return (
    <View style={voiceChatStyles.container}>
      {/* Chat Icon Button - Top Right */}
      {/* This button toggles the sidebar when clicked */}
      <VoiceChatUI
        isRecording={isRecording}
        transcript={transcript}
        isLoadingAI={isLoadingAIResponse}
        aiResponse={AIResponse}
        micLevel={micLevel}
        outputAudioLevel={outputAudioLevel}
        isSpeaking={isSpeaking}
        onToggleRecording={handlePress}
        onCancel={handleCancel}
        onToggleSidebar={toggleSidebar}
        conversationCount={conversations.length}
      />

      {/* Chat Sidebar - Shows conversation history */}
      <ChatSidebar
        isVisible={isSidebarVisible}
        conversations={conversations}
        onClose={() => setIsSidebarVisible(false)}
        onClearChat={clearChat}
      />
    </View>
  );
}
