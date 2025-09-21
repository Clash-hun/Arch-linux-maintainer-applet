const Applet    = imports.ui.applet;
const PopupMenu = imports.ui.popupMenu;
const Util      = imports.misc.util;
const GLib      = imports.gi.GLib;
const Gio       = imports.gi.Gio;
const St        = imports.gi.St;
const Gtk       = imports.gi.Gtk;

function ArchApplet(metadata, orientation, panelHeight, instanceId) {
  this._init(metadata, orientation, panelHeight, instanceId);
}

ArchApplet.prototype = {
  __proto__: Applet.IconApplet.prototype,

  _init(metadata, orientation, panelHeight, instanceId) {
    Applet.IconApplet.prototype._init.call(this, orientation, panelHeight, instanceId);
    this.set_applet_tooltip("Arch Linux maintenance");

    this.updateIcon();

    let gtkSettings = Gtk.Settings.get_default();
    this._themeChangedSignal = gtkSettings.connect(
      "notify::gtk-theme-name",
      () => this.updateIcon()
    );

    this.menuManager = new PopupMenu.PopupMenuManager(this);
    this.menu        = new Applet.AppletPopupMenu(this, orientation);
    this.menuManager.addMenu(this.menu);

    // --- Alap funkciók ---
    this.addMenuItem(
      "Update system",
      "sudo pacman -Syu --noconfirm",
      "System update started"
    );
    this.addMenuItem(
      "Clean orphan packages and cache",
      'orphans=$(pacman -Qdtq); if [ -n "$orphans" ]; then sudo pacman -Rns $orphans --noconfirm; else echo No orphan packages found; fi; sudo paccache -r',
      "System cleanup started"
    );
    this.addMenuItem(
      "Verify system integrity",
      "sudo pacman -Qk",
      "System check started"
    );

    // --- Extra funkciók ---
    this.addMenuItem(
      "Update AUR packages (yay)",
      "yay -Syu --noconfirm",
      "AUR update started"
    );
    this.addMenuItem(
      "List installed kernels",
      "echo 'Current kernel:'; uname -r; echo ''; echo 'Installed kernels:'; pacman -Qq | grep '^linux'",
      "Kernel list"
    );
    this.addMenuItem(
      "View system logs (errors)",
      "journalctl -p 3 -xb",
      "Viewing logs"
    );
    this.addMenuItem(
      "Check disk usage",
      "df -h; du -sh /var/cache/pacman/pkg",
      "Disk usage"
    );
    this.addMenuItem(
      "Refresh mirrorlist",
      "sudo reflector --latest 20 --sort rate --save /etc/pacman.d/mirrorlist",
      "Mirrorlist refreshed"
    );
    this.addMenuItem(
      "Update Flatpak packages",
      "flatpak update",
      "Flatpak update started"
    );
    this.addMenuItem(
      "Regenerate GRUB config",
      "sudo grub-mkconfig -o /boot/grub/grub.cfg",
      "GRUB config regenerated"
    );

    // Show system info – itt NE záródjon be automatikusan
    this.addMenuItem(
      "Show system info",
      "fastfetch",
      "System info",
      /* autoClose: */ false
    );
  },

  /**
   * label       – a menüpont szövege
   * shellCommand – futtatandó parancs
   * notifyText  – értesítő szöveg
   * autoClose   – ha true, echo+sleep; ha false, exec bash
   */
  addMenuItem(label, shellCommand, notifyText, autoClose = true) {
    let cmd = autoClose
      ? `${shellCommand}; echo Closing in 5 seconds...; sleep 5`
      : `${shellCommand}; exec bash`;

    let item = new PopupMenu.PopupMenuItem(label);
    item.connect("activate", () => {
      this.runCommand(
        `gnome-terminal -- bash -c '${cmd}'`,
        notifyText
      );
    });
    this.menu.addMenuItem(item);
  },

  runCommand(command, notifyText) {
    this.set_applet_icon_symbolic_name("process-working-symbolic");
    this.set_applet_tooltip("Working...");

    Util.spawnCommandLine(`notify-send "${notifyText}"`);
    Util.spawnCommandLine(command);

    // Visszaáll az ikon és tooltip 5 mp múlva (ha autoClose = false is,
    // a terminál nyitva marad, de az applet visszatér)
    GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, 5, () => {
      this.set_applet_tooltip("Arch Linux maintenance");
      this.updateIcon();
      return false;
    });
  },

  updateIcon() {
    let iconPath = `${GLib.get_home_dir()}/.local/share/cinnamon/applets/archMaintainer@clash/icons/maintenance.svg`;
    this.set_applet_icon_path(iconPath);
  },

  on_applet_clicked() {
    this.menu.toggle();
  }
};

function main(metadata, orientation, panelHeight, instanceId) {
  return new ArchApplet(metadata, orientation, panelHeight, instanceId);
}

