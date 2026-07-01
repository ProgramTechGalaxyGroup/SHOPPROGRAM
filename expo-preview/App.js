import React, { useMemo, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { WebView } from "react-native-webview";

const DEFAULT_POS_URL = "https://shopprogram.pages.dev";

export default function App() {
  const [reloadKey, setReloadKey] = useState(0);
  const [loadError, setLoadError] = useState("");

  const posUrl = useMemo(() => {
    return process.env.EXPO_PUBLIC_POS_URL || DEFAULT_POS_URL;
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <View>
          <Text style={styles.kicker}>Expo Go Preview</Text>
          <Text style={styles.title}>OriaFarm POS</Text>
        </View>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => {
            setLoadError("");
            setReloadKey((value) => value + 1);
          }}
          style={styles.reloadButton}
        >
          <Text style={styles.reloadText}>Reload</Text>
        </TouchableOpacity>
      </View>

      {loadError ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorTitle}>Khong mo duoc POS preview</Text>
          <Text style={styles.errorText}>{loadError}</Text>
          <Text style={styles.errorHint}>
            Neu dang test local, hay dam bao dien thoai va Mac cung Wi-Fi va URL la IP LAN cua Mac.
          </Text>
        </View>
      ) : null}

      <WebView
        key={reloadKey}
        source={{ uri: posUrl }}
        style={styles.webview}
        originWhitelist={["*"]}
        javaScriptEnabled
        domStorageEnabled
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        startInLoadingState
        onError={(event) => setLoadError(event.nativeEvent.description || "Unknown WebView error")}
        onHttpError={(event) =>
          setLoadError(`HTTP ${event.nativeEvent.statusCode}: ${event.nativeEvent.description || posUrl}`)
        }
        renderLoading={() => (
          <View style={styles.loading}>
            <ActivityIndicator color="#e95a18" />
            <Text style={styles.loadingText}>Dang tai giao dien POS...</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff7ec"
  },
  header: {
    alignItems: "center",
    backgroundColor: "#fffaf3",
    borderBottomColor: "#f0dfcd",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 10
  },
  kicker: {
    color: "#8a7869",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase"
  },
  title: {
    color: "#2d2119",
    fontSize: 20,
    fontWeight: "800"
  },
  reloadButton: {
    backgroundColor: "#f05a18",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 9
  },
  reloadText: {
    color: "#fff",
    fontWeight: "800"
  },
  webview: {
    flex: 1,
    backgroundColor: "#fffaf3"
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    backgroundColor: "#fffaf3",
    justifyContent: "center"
  },
  loadingText: {
    color: "#7a6a5d",
    fontWeight: "700",
    marginTop: 10
  },
  errorBox: {
    backgroundColor: "#fff1ec",
    borderBottomColor: "#f5b39b",
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 12
  },
  errorTitle: {
    color: "#b74326",
    fontWeight: "800",
    marginBottom: 4
  },
  errorText: {
    color: "#7a2f20",
    fontWeight: "700"
  },
  errorHint: {
    color: "#7a6a5d",
    marginTop: 6
  }
});
