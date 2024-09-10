import GObject from 'gi://GObject';
import St from 'gi://St';
import Clutter from 'gi://Clutter';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';

const HijriDateIndicator = GObject.registerClass(
class HijriDateIndicator extends PanelMenu.Button {
    _init() {
        super._init(0.0, 'Hijri Date Indicator');

        this._label = new St.Label({
            style: "text-align: center; padding: 3px 15px 3px 20px;",
            y_align: Clutter.ActorAlign.CENTER
        });

        this.add_child(this._label);
        this._updateDate();
    }

    _updateDate() {
        const change = -1; // Change this value to 0, -1, or 1 to adjust the date
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + change);
        const formatter = new Intl.DateTimeFormat("ar-IN-u-ca-islamic", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        const modifiedHijriDate = formatter.format(currentDate);
        this._label.set_text(modifiedHijriDate);
    }
});

export default class HijriDateExtension {
    constructor(uuid) {
        this._uuid = uuid;
        this._indicator = null;
    }

    enable() {
        this._indicator = new HijriDateIndicator();
        Main.panel.addToStatusArea(this._uuid, this._indicator, 1, 'left');
    }

    disable() {
        if (this._indicator) {
            this._indicator.destroy();
            this._indicator = null;
        }
    }
}