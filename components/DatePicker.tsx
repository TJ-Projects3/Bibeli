import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerUI, { DateType, useDefaultStyles } from "react-native-ui-datepicker";

type DatePickerProps = {
  value: Date;
  onChange: (date: Date) => void;
  minimumDate?: Date;
};

/**
 * Cross-platform DatePicker component
 * - On mobile (iOS/Android): Uses native DateTimePicker
 * - On web: Uses react-native-ui-datepicker for full calendar UI
 */
export function DatePicker({ value, onChange, minimumDate }: DatePickerProps) {
  if (Platform.OS === "web") {
    return (
      <WebCalendar
        value={value}
        onChange={onChange}
        minimumDate={minimumDate}
      />
    );
  }

  return (
    <MobileDatePicker
      value={value}
      onChange={onChange}
      minimumDate={minimumDate}
    />
  );
}

// ============ Mobile DatePicker ============
function MobileDatePicker({ value, onChange, minimumDate }: DatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
      if (event.type === "set" && selectedDate) {
        onChange(selectedDate);
      }
    } else {
      // iOS - update date as user changes it
      if (selectedDate) {
        onChange(selectedDate);
      }
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <View>
      <Pressable
        style={styles.datePickerButton}
        onPress={() => setShowPicker(true)}
      >
        <FontAwesome name="calendar" size={18} color="#A0522D" />
        <Text style={styles.datePickerText}>{formatDate(value)}</Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={value}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          minimumDate={minimumDate}
        />
      )}

      {Platform.OS === "ios" && showPicker && (
        <Pressable
          style={styles.doneButton}
          onPress={() => setShowPicker(false)}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </Pressable>
      )}
    </View>
  );
}

// ============ Web Calendar (using react-native-ui-datepicker) ============
function WebCalendar({ value, onChange, minimumDate }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const defaultStyles = useDefaultStyles();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleDateChange = ({ date }: { date: DateType }) => {
    if (date) {
      // Convert DateType to Date
      const newDate = date instanceof Date ? date : new Date(date as string);
      onChange(newDate);
      setIsOpen(false);
    }
  };

  return (
    <View style={styles.webCalendarContainer}>
      <Pressable
        style={styles.datePickerButton}
        onPress={() => setIsOpen(!isOpen)}
      >
        <FontAwesome name="calendar" size={18} color="#A0522D" />
        <Text style={styles.datePickerText}>{formatDate(value)}</Text>
        <FontAwesome
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={12}
          color="#A0522D"
          style={styles.chevron}
        />
      </Pressable>

      {isOpen && (
        <View style={styles.calendarDropdown}>
          <DateTimePickerUI
            mode="single"
            date={value}
            onChange={handleDateChange}
            minDate={minimumDate}
            styles={{
              ...defaultStyles,
              today: {
                borderColor: "#A0522D",
                borderWidth: 1,
              },
              selected: {
                backgroundColor: "#A0522D",
              },
              selected_label: {
                color: "#FFFCF5",
              },
              day_label: {
                color: "#A0522D",
              },
              weekday_label: {
                color: "rgba(160, 82, 45, 0.6)",
              },
              month_label: {
                color: "#A0522D",
                fontWeight: "600",
              },
              year_label: {
                color: "#A0522D",
              },
              disabled_label: {
                color: "rgba(160, 82, 45, 0.4)",
              },
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(160, 82, 45, 0.1)",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "rgba(160, 82, 45, 0.2)",
    gap: 10,
  },
  datePickerText: {
    fontSize: 16,
    color: "#A0522D",
    fontWeight: "500",
    flex: 1,
  },
  chevron: {
    marginLeft: "auto",
  },
  doneButton: {
    marginTop: 10,
    backgroundColor: "#A0522D",
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: "center",
  },
  doneButtonText: {
    color: "#FFFCF5",
    fontSize: 16,
    fontWeight: "600",
  },
  webCalendarContainer: {
    position: "relative",
    zIndex: 100,
  },
  calendarDropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    marginTop: 8,
    backgroundColor: "#FFFCF5",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(160, 82, 45, 0.2)",
    padding: 10,
    shadowColor: "#A0522D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000,
  },
});
