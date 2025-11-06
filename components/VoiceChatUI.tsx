import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Image,
  Platform,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { voiceChatStyles } from "./VoiceChat.styles";

type VoiceChatUIProps = {
  isRecording: boolean;
  transcript: string;
  isLoadingAI: boolean;
  aiResponse: string;
  micLevel: number;
  outputAudioLevel: number;
  isSpeaking: boolean;
  onToggleRecording: () => void;
  onCancel: () => void;
};

export function VoiceChatUI({
  isRecording,
  transcript,
  isLoadingAI,
  aiResponse,
  micLevel,
  outputAudioLevel,
  isSpeaking,
  onToggleRecording,
  onCancel,
}: VoiceChatUIProps) {
  const statusAnimated = useRef(new Animated.Value(1)).current;
  const circleScale = useRef(new Animated.Value(1)).current;
  const outputScale = useRef(new Animated.Value(1)).current;

  const statusLabel = isRecording
    ? "Listening..."
    : isLoadingAI
    ? "Thinking..."
    : isSpeaking
    ? "Speaking..."
    : aiResponse
    ? "Response ready"
    : "Tap the mic to start speaking";

  const micAccessibilityLabel = `Microphone level ${Math.round(
    micLevel * 100
  )}%`;
  const circleAccessibilityLabel = isRecording
    ? `Listening. ${micAccessibilityLabel}`
    : isLoadingAI
    ? "Assistant is thinking"
    : isSpeaking
    ? `Assistant is speaking. Audio level ${Math.round(
        outputAudioLevel * 100
      )}%`
    : aiResponse
    ? "Assistant has responded"
    : "Assistant is idle";

  useEffect(() => {
    statusAnimated.setValue(0.4);
    Animated.timing(statusAnimated, {
      toValue: 1,
      duration: 220,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [statusLabel, statusAnimated]);

  useEffect(() => {
    if (isRecording || isLoadingAI) {
      Animated.sequence([
        Animated.timing(circleScale, {
          toValue: 1.05,
          duration: 800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(circleScale, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      circleScale.setValue(1);
    }
  }, [isRecording, isLoadingAI, circleScale]);

  // Pulse circle based on audio output levels
  useEffect(() => {
    if (isSpeaking && outputAudioLevel > 0) {
      // Create a smooth pulse based on audio output level
      // Scale from 1.0 to 1.25 based on audio level (0 to 1)
      const targetScale = 1 + outputAudioLevel * 0.25;

      Animated.timing(outputScale, {
        toValue: targetScale,
        duration: 100, // Quick response to audio changes
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    } else {
      // Return to normal size when not speaking
      Animated.timing(outputScale, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    }
  }, [isSpeaking, outputAudioLevel, outputScale]);

  const { width } = useWindowDimensions();
  const circleSize = Math.min(width * 0.55, 240);

  return (
    <View style={voiceChatStyles.stage}>
      <View
        style={[
          voiceChatStyles.circleWrapper,
          { width: circleSize, height: circleSize },
        ]}
      >
        <Animated.View
          style={[
            {
              width: circleSize,
              height: circleSize,
              transform: [
                { scale: Animated.multiply(circleScale, outputScale) },
              ],
            },
          ]}
          accessible
          accessibilityRole="image"
          accessibilityLabel={circleAccessibilityLabel}
        >
          <Image
            source={require("@/assets/images/circle-color.png")}
            style={voiceChatStyles.circleImage}
            resizeMode="contain"
          />
        </Animated.View>
      </View>

      <Animated.Text
        style={[voiceChatStyles.statusText, { opacity: statusAnimated }]}
      >
        {statusLabel}
      </Animated.Text>

      <View style={voiceChatStyles.controlsRow}>
        <Pressable
          style={({ pressed }) => [
            voiceChatStyles.controlButton,
            pressed && voiceChatStyles.controlButtonPressed,
          ]}
          onPress={onCancel}
          accessibilityRole="button"
          accessibilityLabel="Cancel recording"
        >
          <FontAwesome name="times" size={20} color="#1F2933" />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            voiceChatStyles.controlButton,
            voiceChatStyles.controlButtonPrimary,
            isRecording && voiceChatStyles.controlButtonRecording,
            pressed && voiceChatStyles.controlButtonPressed,
          ]}
          onPress={onToggleRecording}
          accessibilityRole="button"
          accessibilityLabel={
            isRecording ? "Stop recording" : "Start recording"
          }
        >
          <FontAwesome
            name={isRecording ? "stop" : "microphone"}
            size={20}
            color="#FFFFFF"
          />
        </Pressable>
      </View>

      {transcript ? (
        <View style={voiceChatStyles.transcriptContainer}>
          <Text style={voiceChatStyles.label}>You said</Text>
          <Text style={voiceChatStyles.transcript}>{transcript}</Text>
        </View>
      ) : (
        !isRecording && (
          <Text style={voiceChatStyles.placeholder}>
            Tap the microphone to begin speaking
          </Text>
        )
      )}

      {aiResponse ? (
        <View style={voiceChatStyles.responseContainer}>
          <Text style={voiceChatStyles.label}>Assistant</Text>
          <Text style={voiceChatStyles.AI}>{aiResponse}</Text>
        </View>
      ) : isLoadingAI ? (
        <View style={voiceChatStyles.responseContainer}>
          <ActivityIndicator size="small" color="#8B5A3C" />
          <Text style={voiceChatStyles.loadingText}>AI is thinking...</Text>
        </View>
      ) : null}

      {Platform.OS !== "web" && !transcript && (
        <Text style={voiceChatStyles.note}>
          Mobile: Audio recorded. Integrate Deepgram for STT.
        </Text>
      )}
    </View>
  );
}
