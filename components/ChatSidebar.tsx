import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

/**
 * ChatSidebar Component
 * 
 * This component displays the conversation history in a slide-out sidebar.
 * 
 * Props explained:
 * - isVisible: boolean - Controls whether the sidebar is shown or hidden
 * - conversations: Array of objects - Each object represents one Q&A exchange
 * - onClose: function - Called when user wants to close the sidebar
 * - onClearChat: function - Called when user wants to clear all conversations
 * 
 * React Native concepts used:
 * - Animated.View: Creates smooth animations for sliding in/out
 * - ScrollView: Allows scrolling when content is long
 * - StyleSheet: Groups all styles together (better performance)
 */
type ConversationEntry = {
  id: string;
  question: string;
  answer: string;
  timestamp: Date;
};

type ChatSidebarProps = {
  isVisible: boolean;
  conversations: ConversationEntry[];
  onClose: () => void;
  onClearChat: () => void;
};

export function ChatSidebar({
  isVisible,
  conversations,
  onClose,
  onClearChat,
}: ChatSidebarProps) {
  // Animated value for sliding the sidebar
  // useRef keeps the same value across re-renders (important for animations)
  // We'll animate this from 0 (hidden) to 1 (visible)
  const slideAnim = useRef(new Animated.Value(isVisible ? 1 : 0)).current;

  // When isVisible changes, animate the sidebar
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? 1 : 0,
      duration: 300, // Animation takes 300ms
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  }, [isVisible, slideAnim]);

  // Calculate sidebar position: when slideAnim is 0, it's off-screen to the right
  // When slideAnim is 1, it's fully visible
  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [400, 0], // Slide from 400px right to 0 (visible)
  });

  // If not visible, don't render anything (saves performance)
  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Backdrop: Semi-transparent overlay that closes sidebar when clicked */}
      <Pressable style={styles.backdrop} onPress={onClose} />
      
      {/* Sidebar container with animation */}
      <Animated.View
        style={[
          styles.sidebar,
          {
            transform: [{ translateX }], // Apply the slide animation
          },
        ]}
      >
        {/* Header with title and close button */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Conversation History</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <FontAwesome name="times" size={18} color="#A0522D" />
          </Pressable>
        </View>

        {/* Clear chat button */}
        {conversations.length > 0 && (
          <Pressable onPress={onClearChat} style={styles.clearButton}>
            <FontAwesome name="trash" size={15} color="#DC2626" />
            <Text style={styles.clearButtonText}>Clear Chat</Text>
          </Pressable>
        )}

        {/* Scrollable conversation list */}
        <ScrollView style={styles.conversationList} showsVerticalScrollIndicator={false}>
          {conversations.length === 0 ? (
            // Empty state: Show message when no conversations
            <View style={styles.emptyState}>
              <FontAwesome name="comments" size={48} color="rgba(160, 82, 45, 0.2)" />
              <Text style={styles.emptyText}>No conversations yet</Text>
              <Text style={styles.emptySubtext}>
                Start chatting to see your history here
              </Text>
            </View>
          ) : (
            // Map through conversations: For each conversation, render it
            // .map() is like a for loop but returns an array of components
            conversations.map((conversation) => (
              <View key={conversation.id} style={styles.conversationItem}>
                {/* User's question */}
                <View style={styles.questionContainer}>
                  <View style={styles.questionBubble}>
                    <Text style={styles.questionText}>{conversation.question}</Text>
                  </View>
                </View>

                {/* AI's answer */}
                <View style={styles.answerContainer}>
                  <View style={styles.answerBubble}>
                    <Text style={styles.answerText}>{conversation.answer}</Text>
                  </View>
                </View>

                {/* Timestamp */}
                <Text style={styles.timestamp}>
                  {conversation.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      </Animated.View>
    </>
  );
}

// Styles: All CSS-like styling in one place
// Using StyleSheet.create is more performant than inline styles
const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent black
    zIndex: 999,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: 380,
    backgroundColor: "#FFFCF5", // Warm off-white matching app theme
    zIndex: 1000,
    shadowColor: "#8B5A3C",
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: -4, height: 0 },
    elevation: 15,
    borderLeftWidth: 1,
    borderLeftColor: "rgba(160, 82, 45, 0.1)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 60, // Extra space for status bar
    borderBottomWidth: 1,
    borderBottomColor: "rgba(160, 82, 45, 0.1)", // Warm brown border
    backgroundColor: "#FFFCF5",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#A0522D", // Sienna color matching app theme
    fontFamily: "LibreBaskerville_700Bold",
  },
  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(160, 82, 45, 0.08)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(160, 82, 45, 0.15)",
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 8,
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: "rgba(239, 68, 68, 0.08)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.2)",
    gap: 8,
  },
  clearButtonText: {
    color: "#DC2626",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  conversationList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#A0522D",
    marginTop: 16,
    marginBottom: 8,
    fontFamily: "LibreBaskerville_400Regular",
  },
  emptySubtext: {
    fontSize: 14,
    color: "rgba(160, 82, 45, 0.6)",
    textAlign: "center",
    paddingHorizontal: 40,
    fontFamily: "LibreBaskerville_400Regular",
  },
  conversationItem: {
    marginBottom: 24,
  },
  questionContainer: {
    alignItems: "flex-end", // Align to right (user's messages)
    marginBottom: 8,
  },
  questionBubble: {
    backgroundColor: "#A0522D", // Sienna - matching app primary color
    borderRadius: 20,
    borderBottomRightRadius: 6, // More pronounced chat bubble effect
    paddingHorizontal: 18,
    paddingVertical: 14,
    maxWidth: "85%",
    shadowColor: "#A0522D",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  questionText: {
    color: "#FFFFFF",
    fontSize: 15,
    lineHeight: 22,
    fontFamily: "LibreBaskerville_400Regular",
  },
  answerContainer: {
    alignItems: "flex-start", // Align to left (AI's messages)
    marginBottom: 8,
  },
  answerBubble: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderBottomLeftRadius: 6, // More pronounced chat bubble effect
    paddingHorizontal: 18,
    paddingVertical: 14,
    maxWidth: "85%",
    borderWidth: 1,
    borderColor: "rgba(160, 82, 45, 0.15)",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  answerText: {
    color: "#1F2937",
    fontSize: 15,
    lineHeight: 22,
    fontFamily: "LibreBaskerville_400Regular",
  },
  timestamp: {
    fontSize: 11,
    color: "rgba(160, 82, 45, 0.5)",
    textAlign: "center",
    marginTop: 6,
    fontFamily: "LibreBaskerville_400Regular",
    letterSpacing: 0.2,
  },
});

