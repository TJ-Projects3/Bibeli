import { Audio } from "expo-av";
import { useEffect, useRef, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function VoiceChat() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  // For Web Speech API
  const recognitionRef = useRef<any>(null);

  // Initialize Web Speech API on web
  useEffect(() => {
    if (Platform.OS === "web" && typeof window !== "undefined") {
      // Check if browser supports Web Speech API
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true; // Keep listening
        recognitionRef.current.interimResults = true; // Show partial results

        // When speech is recognized, update transcript
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
          setTranscript(fullTranscript);
          console.log("Transcript:", fullTranscript); // Console log as requested
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
        };
      }
    }
  }, []);

  const startRecording = async () => {
    try {
      if (Platform.OS === "web") {
        // Use Web Speech API on web
        if (recognitionRef.current) {
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

        // Start recording
        const { recording: newRecording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );

        setRecording(newRecording);
        setIsRecording(true);
        console.log("Started recording (expo-av)");
        console.log(
          "Note: For STT on mobile, you'll need to integrate with Deepgram API"
        );
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

          // Transcribe audio with Deepgram
          if (uri) {
            await transcribeAudio(uri);
          }

          setRecording(null);
        }
      }
    } catch (err) {
      console.error("Failed to stop recording:", err);
    }
  };

  // Transcribe audio using Deepgram API
  const transcribeAudio = async (audioUri: string) => {
    try {
      // For mobile: Read file and convert to blob
      let blob: Blob;

      if (Platform.OS === "web") {
        // Web: fetch directly
        const response = await fetch(audioUri);
        blob = await response.blob();
      } else {
        // Mobile: Use FileSystem to read the file
        // Convert file:// URI to readable format
        const response = await fetch(audioUri);
        blob = await response.blob();
      }

      // Get Deepgram API key from environment variables
      // NOTE: In Expo, environment variables must be prefixed with EXPO_PUBLIC_
      // Create a .env.local file with: EXPO_PUBLIC_DEEPGRAM_API_KEY=your_key_here
      // For security: In production, use Supabase Edge Functions instead!
      const DEEPGRAM_API_KEY = process.env.EXPO_PUBLIC_DEEPGRAM_API_KEY || "";

      if (!DEEPGRAM_API_KEY) {
        console.error(
          "Please set EXPO_PUBLIC_DEEPGRAM_API_KEY in your .env file or app.config.js!"
        );
        return;
      }

      // Send audio to Deepgram for transcription
      const formData = new FormData();
      formData.append("audio", blob, "recording.m4a");

      const transcriptResponse = await fetch(
        "https://api.deepgram.com/v1/listen?model=nova-2&punctuate=true&language=en",
        {
          method: "POST",
          headers: {
            Authorization: `Token ${DEEPGRAM_API_KEY}`,
          },
          body: formData,
        }
      );

      if (!transcriptResponse.ok) {
        throw new Error("Deepgram API request failed");
      }

      const transcriptData = await transcriptResponse.json();

      // Extract transcript from Deepgram response
      const transcribedText =
        transcriptData.results?.channels?.[0]?.alternatives?.[0]?.transcript ||
        "";

      if (transcribedText) {
        setTranscript(transcribedText);
        console.log("Transcript:", transcribedText);
      } else {
        console.error("No transcript received from Deepgram");
      }
    } catch (error) {
      console.error("Failed to transcribe audio:", error);
    }
  };

  const handlePress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.circle, isRecording && styles.circleRecording]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Text style={styles.circleText}>{isRecording ? "⏹" : "🎤"}</Text>
      </TouchableOpacity>

      {transcript ? (
        <Text style={styles.transcript}>{transcript}</Text>
      ) : (
        <Text style={styles.placeholder}>
          {isRecording ? "Listening..." : "Tap to start recording"}
        </Text>
      )}

      {Platform.OS !== "web" && (
        <Text style={styles.note}>
          Mobile: Audio recorded. Integrate Deepgram for STT.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#A0522D",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  circleRecording: {
    backgroundColor: "#DC143C",
  },
  circleText: {
    fontSize: 40,
  },
  transcript: {
    color: "#A0522D",
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  placeholder: {
    color: "#A0522D",
    fontSize: 16,
    opacity: 0.6,
    textAlign: "center",
    marginTop: 20,
  },
  note: {
    color: "#A0522D",
    fontSize: 12,
    opacity: 0.5,
    textAlign: "center",
    marginTop: 10,
    fontStyle: "italic",
  },
});
