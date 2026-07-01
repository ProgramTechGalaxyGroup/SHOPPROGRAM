# OriaFarm POS Expo Go Preview

This folder is only a mobile preview wrapper. It does not change POS data, Supabase, Cloudflare, or the production app.

## Install once

```sh
cd "/Users/charlotte/Desktop/NGÂN HÀ/CTY TechGalaxy Group/SHOPPROGRAM/expo-preview"
npm install
```

## Preview live POS in Expo Go

```sh
cd "/Users/charlotte/Desktop/NGÂN HÀ/CTY TechGalaxy Group/SHOPPROGRAM/expo-preview"
npx expo start --tunnel
```

Scan the QR code with Expo Go.

## Preview local POS while editing CSS

1. Start the local POS web server, for example:

```sh
cd "/Users/charlotte/Desktop/NGÂN HÀ/CTY TechGalaxy Group/SHOPPROGRAM"
python3 server.py
```

2. Find the Mac Wi-Fi IP:

```sh
ipconfig getifaddr en0
```

3. Start Expo with that local URL:

```sh
cd "/Users/charlotte/Desktop/NGÂN HÀ/CTY TechGalaxy Group/SHOPPROGRAM/expo-preview"
EXPO_PUBLIC_POS_URL=http://YOUR_MAC_IP:8085 npx expo start --tunnel
```

Replace `YOUR_MAC_IP` with the IP from step 2, for example `192.168.1.20`.

## Notes

- Expo Go is useful for checking mobile layout quickly.
- Camera scanning can be stricter inside WebView, especially on local HTTP. If camera testing is unreliable, use the live HTTPS URL or a real development build later.
