import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Easing,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { voiceChatStyles } from "./VoiceChat.styles";
import { VoiceOrb, type VoiceOrbState } from "./VoiceOrb";

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
  onToggleSidebar: () => void;
  conversationCount: number;
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
  onToggleSidebar,
  conversationCount,
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

  // Derive orb state for VoiceOrb component
  const orbState: VoiceOrbState = useMemo(() => {
    if (isLoadingAI) return "thinking";
    if (isRecording) return "listening";
    if (isSpeaking) return "speaking";
    return "idle";
  }, [isLoadingAI, isRecording, isSpeaking]);

  return (
    <View style={voiceChatStyles.stage}>
      {/* Chat Icon Button - Top Right */}
      {/* This button appears in the top right corner */}
      {/* Pressable is like a button - it responds to touch/click */}
      <Pressable
        style={voiceChatStyles.chatIconButton}
        onPress={onToggleSidebar}
        accessibilityRole="button"
        accessibilityLabel={`Open conversation history. ${conversationCount} conversations`}
      >
        <FontAwesome name="comments" size={22} color="#8B5A3C" />
        {/* Badge showing number of conversations */}
        {conversationCount > 0 && (
          <View style={voiceChatStyles.chatBadge}>
            <Text style={voiceChatStyles.chatBadgeText}>
              {conversationCount > 99 ? "99+" : conversationCount}
            </Text>
          </View>
        )}
      </Pressable>

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
          <VoiceOrb
            size={circleSize}
            state={orbState}
            micLevel={micLevel}
            outputAudioLevel={outputAudioLevel}
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

      {/* Transcript and response containers removed - conversation history is now in sidebar */}
    </View>
  );
}
