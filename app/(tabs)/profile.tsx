import ImageViewer from "@/components/ImageViewer";
import { DatePicker } from "@/components/DatePicker";
import { Image, StyleSheet, Text, View, Modal, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

const backgroundImage = require("../../assets/images/profile-background-2.png");
const profilePicture = require("../../assets/images/blank-pfp.jpg");

type Goal = {
  id: string;
  text: string;
  deadline: Date;
  completed: boolean;
};

export default function Profile() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [goalText, setGoalText] = useState("");
  const [deadline, setDeadline] = useState(new Date());

  const handleAddGoal = () => {
    if (goalText.trim() && deadline) {
      const newGoal: Goal = {
        id: Date.now().toString(),
        text: goalText.trim(),
        deadline: deadline,
        completed: false,
      };
      setGoals([...goals, newGoal]);
      setGoalText("");
      setDeadline(new Date());
      setShowModal(false);
    }
  };

  const toggleGoal = (id: string) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* VERIFICATION CHECKLIST - Please confirm:
      // [ ] Image displays at the top of the screen (not centered)
      // [ ] Image spans full width of the screen
      // [ ] Image height is approximately 300px
      // [ ] Image content is visible and not distorted
      // [ ] No console errors or warnings
      // If any item fails, please specify which one(s) in your feedback */}
      {/* Banner with relative positioning (parent) */}
      <View style={styles.bannerContainer}>
        <ImageViewer
          source={backgroundImage}
          style={{
            width: "100%",
            height: 250,
          }}
          resizeMode="cover"
        />

        {/* Avatar with absolute positioning (child) */}
        <View style={styles.profilePictureContainer}>
          <Image source={profilePicture} style={styles.profilePicture} />
        </View>
      </View>

      {/* Content with extra top margin */}
      <View style={styles.profileSection}>
        <View style={styles.contentContainer}>
          <Text style={styles.username}>TJ Corbett</Text>
          <Text style={styles.subtext}>Welcome back!</Text>
        </View>
      </View>
      <View style={styles.streakContainer}>
        <View style={styles.streakItem}>
          <Text style={styles.streakLabel}>Your Current Streak</Text>
          <Text style={styles.streakNumber}>0</Text>
        </View>
        <View style={styles.streakItem}>
          <Text style={styles.streakLabel}>Your Longest Streak</Text>
          <Text style={styles.streakNumber}>0</Text>
        </View>
      </View>

      {/* Goals Section */}
      <View style={styles.goalsContainer}>
        <Text style={styles.goalsTitle}>Reading Goals</Text>
        
        {goals.length === 0 ? (
          <Text style={styles.emptyStateText}>No goals yet. Set your first goal to get started!</Text>
        ) : (
          <View style={styles.goalsList}>
            {goals.map((goal) => (
              <TouchableOpacity
                key={goal.id}
                style={[
                  styles.goalItem,
                  goal.completed && styles.goalItemCompleted,
                ]}
                onPress={() => toggleGoal(goal.id)}
              >
                <FontAwesome
                  name={goal.completed ? "check-square" : "square-o"}
                  size={24}
                  color={goal.completed ? "#A0522D" : "#A0522D"}
                  style={styles.checkboxIcon}
                />
                <View style={styles.goalContent}>
                  <Text
                    style={[
                      styles.goalText,
                      goal.completed && styles.goalTextCompleted,
                    ]}
                  >
                    {goal.text}
                  </Text>
                  <Text style={styles.goalDeadline}>
                    Deadline: {formatDate(goal.deadline)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={styles.setGoalButton}
          onPress={() => setShowModal(true)}
        >
          <FontAwesome name="plus-circle" size={20} color="#A0522D" />
          <Text style={styles.setGoalButtonText}>Set Goal</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Adding Goals */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowModal(false)}
        >
          <ScrollView
            style={styles.modalScrollContainer}
            contentContainerStyle={styles.modalScrollContent}
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="handled"
          >
            <TouchableOpacity
              style={styles.modalContent}
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              <Text style={styles.modalTitle}>Set a New Goal</Text>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Goal Description</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g., Read the Gospel of Matthew"
                  placeholderTextColor="#D2B48C"
                  value={goalText}
                  onChangeText={setGoalText}
                  multiline
                  numberOfLines={3}
                />
              </View>

              <View style={[styles.formGroup, { zIndex: 100 }]}>
                <Text style={styles.formLabel}>Deadline</Text>
                <DatePicker
                  value={deadline}
                  onChange={setDeadline}
                  minimumDate={new Date(new Date().setHours(0, 0, 0, 0))}
                />
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setShowModal(false);
                    setGoalText("");
                    setDeadline(new Date());
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.saveButton,
                    (!goalText.trim() || !deadline) && styles.saveButtonDisabled,
                  ]}
                  onPress={handleAddGoal}
                  disabled={!goalText.trim() || !deadline}
                >
                  <Text style={styles.saveButtonText}>Save Goal</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFCF5", // Warm off-white (Claude-like)
  },
  bannerContainer: {
    // Position relative allows absolute positioning of children
    position: "relative",
    width: "100%",
  },
  profilePictureContainer: {
    position: "absolute",
    bottom: -60,
    left: 20, // Position to the left side
    zIndex: 10,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75, // Half of width/height = perfect circle
    borderWidth: 4, // White border for contrast
    borderColor: "#FFFFFF",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 50, // Space for overlapping avatar
  },
  profileSection: {
    marginTop: 20,
  },
  username: {
    fontSize: 40,
    fontWeight: "700",
    fontStyle: "italic",
    color: "#A0522D",
    marginBottom: 10,
  },
  subtext: {
    color: "#A0522D",
    fontSize: 20,
  },
  streakContainer: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-around",
    alignItems: "center",
  },
  streakItem: {
    alignItems: "center",
  },
  streakLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#A0522D",
    marginBottom: 8,
    textAlign: "center",
  },
  streakNumber: {
    fontSize: 32,
    fontWeight: "700",
    color: "#A0522D",
  },
  goalsContainer: {
    padding: 20,
    paddingTop: 10,
  },
  goalsTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#A0522D",
    marginBottom: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#A0522D",
    opacity: 0.6,
    textAlign: "center",
    paddingVertical: 30,
    fontStyle: "italic",
  },
  goalsList: {
    marginBottom: 20,
  },
  goalItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(160, 82, 45, 0.1)",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(160, 82, 45, 0.2)",
  },
  goalItemCompleted: {
    opacity: 0.7,
    backgroundColor: "rgba(160, 82, 45, 0.05)",
  },
  checkboxIcon: {
    marginRight: 15,
  },
  goalContent: {
    flex: 1,
  },
  goalText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#A0522D",
    marginBottom: 4,
  },
  goalTextCompleted: {
    textDecorationLine: "line-through",
    opacity: 0.6,
  },
  goalDeadline: {
    fontSize: 14,
    color: "#A0522D",
    opacity: 0.7,
  },
  setGoalButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#A0522D",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: 10,
    shadowColor: "#A0522D",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  setGoalButtonText: {
    color: "#A0522D",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalScrollContainer: {
    flex: 1,
  },
  modalScrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#FFFCF5",
    borderRadius: 25,
    padding: 30,
    borderWidth: 2,
    borderColor: "#A0522D",
    shadowColor: "#A0522D",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#A0522D",
    marginBottom: 25,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#A0522D",
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: "rgba(160, 82, 45, 0.1)",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "rgba(160, 82, 45, 0.2)",
    color: "#A0522D",
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: "top",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#A0522D",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: "#A0522D",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#A0522D",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#A0522D",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: "#FFFCF5",
    fontSize: 16,
    fontWeight: "600",
  },
})
