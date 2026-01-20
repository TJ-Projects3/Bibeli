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
    position: "fixed" as any,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 999,
  },
  sidebar: {
    position: "fixed" as any,
    top: 0,
    right: 0,
    bottom: 0,
    width: 340,
    backgroundColor: "#FFFCF5",
    zIndex: 1000,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 24,
    shadowOffset: { width: -8, height: 0 },
    elevation: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 20,
    paddingTop: 28,
    backgroundColor: "#FFFCF5",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#A0522D",
    letterSpacing: 0.3,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(160, 82, 45, 0.06)",
    alignItems: "center",
    justifyContent: "center",
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 24,
    marginTop: 8,
    marginBottom: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "rgba(220, 38, 38, 0.06)",
    borderRadius: 10,
    gap: 8,
  },
  clearButtonText: {
    color: "#DC2626",
    fontSize: 13,
    fontWeight: "500",
  },
  conversationList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },
  emptyText: {
    fontSize: 17,
    fontWeight: "500",
    color: "#A0522D",
    marginTop: 20,
    marginBottom: 6,
  },
  emptySubtext: {
    fontSize: 14,
    color: "rgba(160, 82, 45, 0.5)",
    textAlign: "center",
    paddingHorizontal: 32,
    lineHeight: 20,
  },
  conversationItem: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(160, 82, 45, 0.08)",
  },
  questionContainer: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  questionBubble: {
    backgroundColor: "#A0522D",
    borderRadius: 18,
    borderBottomRightRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: "88%",
  },
  questionText: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 20,
  },
  answerContainer: {
    alignItems: "flex-start",
    marginBottom: 6,
  },
  answerBubble: {
    backgroundColor: "rgba(160, 82, 45, 0.06)",
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: "88%",
  },
  answerText: {
    color: "#374151",
    fontSize: 14,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 11,
    color: "rgba(160, 82, 45, 0.4)",
    textAlign: "center",
    marginTop: 8,
  },
});

