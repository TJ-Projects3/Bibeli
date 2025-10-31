import { Image, ImageContentFit } from "expo-image";
import { StyleSheet, View, ImageStyle } from "react-native";

type Props = {
    source: string | number; // Accept both string URLs and require() return type
    style?: ImageStyle;
    resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
}

export default function ImageViewer({ source, style, resizeMode = "cover" }: Props) {
    return (
        <View style={styles.imageContainer}>
            <Image 
                source={source} 
                style={[styles.image, style]} 
                contentFit={resizeMode as ImageContentFit}
            />
        </View>
    )   
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1
    },
    image: {
        // Remove hardcoded width to allow full width from props
        height: 320, // Default height, can be overridden by style prop
        borderRadius: 0,
    }
})