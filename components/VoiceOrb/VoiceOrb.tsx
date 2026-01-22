import { Image, View } from "react-native";
import { voiceOrbStyles } from "./VoiceOrb.styles";
import type { VoiceOrbProps } from "./types";

export function VoiceOrb({
  size,
}: VoiceOrbProps) {
  return (
    <View style={[voiceOrbStyles.container, { width: size, height: size }]}>
      <Image
        source={require("@/assets/images/brown-galaxy.jpg")}
        style={voiceOrbStyles.orbImage}
        resizeMode="cover"
      />
    </View>
  );
}
