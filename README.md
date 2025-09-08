# Arch Maintainer Applet ⚙️🐧

A lightweight **Cinnamon panel applet** to perform everyday Arch Linux maintenance tasks directly from your panel.

## ✨ Features
- 🖥️ **Update system packages** (`pacman -Syu`)  
- 🧹 **Clean orphan packages and pacman cache**  
- 🔍 **Verify system integrity** (`pacman -Qk`)  
- 📦 **Update AUR packages** (`yay -Syu`)  
- 🖥️ **List installed kernels** (`mhwd-kernel -li`)  
- 📜 **View recent system errors** (`journalctl`)  
- 💽 **Check disk usage** (pacman cache + overall disk space)  
- 🌐 **Refresh mirrorlist** (using reflector)  
- 📦 **Update Flatpak packages**  
- 🔧 **Regenerate GRUB configuration**  
- ℹ️ **Show system info** (via `fastfetch`)  

All commands open in a terminal window for transparency.  
The applet shows a **spinning system icon** while running commands.

---

## 📸 Screenshot
<div align="center">
  <img src="https://github.com/Clash-hun/Arch-linux-maintainer-applet/blob/main/K%C3%A9perny%C5%91k%C3%A9p%20%E2%80%93%202025-09-08%2010-59-21.png"  style="width:90%;">
</div>


---

## ⚙️ Installation
1. Clone the repo into your Cinnamon applets directory:
   ```bash
   git clone https://github.com/Clash-hun/archMaintainer@clash.git \
     ~/.local/share/cinnamon/applets/archMaintainer@clash

---
## 📂 File Structure

```
archMaintainer@clash/
├── applet.js
├── metadata.json
├── icon.png
└── icons/
    └── black.svg
    └── white.svg
```
## ☕ Support Me

If you find these scripts helpful, consider buying me a coffee! ☕

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-%23FFDD00.svg?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://paypal.me/clash2un?country.x=HU&locale.x=hu_HU)

---

Thank you for using my applet! 😊 Happy Arching! 🎩✨


<div align="center">
  <img src="https://github.com/Clash-hun/Arch-linux-maintainer-applet/blob/main/icon.png"  style="width:15%;">
</div>
