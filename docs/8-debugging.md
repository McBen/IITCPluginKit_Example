# 8. Debugging

Bugs happen — some are simple and can be caught by your editor, TypeScript, or ESLint; others are trickier. The browser developer tools are your best friend for tracking them down. Press `F12` to open the tools; they may look intimidating at first, but you'll get comfortable quickly.

The `Elements` (Firefox: `Inspector`) panel helps when the problem is layout or HTML. Here we focus on the `Console` and `Sources` (Firefox: `Debugger`) tabs for debugging code.

## Console

We already used the console in the examples: `console.log("CountPortals " + VERSION);`. IITC produces a bunch of Log-Lines but you should find our message `CountPortals v0.0.0`, quite at the beginning.

The console supports different message levels: `debug`, `info`, `log`, `warn`, and `error`. Which to use is up to you, but `log` is usually sufficient for general-purpose messages. Use `console.warn(...)` and `console.error(...)` for important issues — they are highlighted in the console.

You can also log objects to inspect them:

```typescript
doCount(): void {
    console.log("Current portal:", window.portals[selectedPortal]);
    [...]
```
Opening the dialog after logging the portal object will show its data in the console (or `undefined` if nothing is selected).

You can also execute JavaScript directly from the console prompt. For example, plugins are exposed on the global `plugin` object, so you can call:
`> plugin.CountPortals.doCount();`

When hunting bugs, sprinkle `console.log` statements in places that might reveal the problem and watch the output as the code runs.

## Sources

Logging helps, but stepping through code with a debugger often reveals the root cause faster. The `Sources` (or `Debugger` in Firefox) tab lets you browse your source files.

Find `iitc_plugin_CountPortals/main.ts` (in Firefox look under `webpack/iitc_plugin_CountPortals/main.ts`) and open it. You can set breakpoints by clicking the line numbers (or using your browser's shortcut to toggle a breakpoint).

Trigger the action (e.g., click the plugin's count link) and execution will pause at the breakpoint. The debugger shows the call stack and lets you inspect variables — add watches or hover variables to view values. Use the step controls to run, step over, or step into functions (browser shortcuts vary: e.g., F8 to resume, F10 to step over, F11 to step into).

## Mobile

Some bugs only surface on mobile devices. IITCm provides a built-in console you can enable once via `Settings -> Advanced Settings -> Configure IITCm menu -> check 'debug'`.

The `debug` menu item opens a compact console that shows logs and provides a prompt to run JavaScript.

For a more powerful setup, use remote debugging.

### Remote debugging

To debug a live mobile session, connect your phone via USB and enable USB debugging (on Android: tap the build number several times to enable Developer Options, then enable USB debugging).

Open Chrome on your desktop and go to `chrome://inspect/#devices`. Approve the connection on your phone when prompted. Your running IITC page should appear under the device; click `inspect` to open the remote DevTools for the mobile page.

The remote tools provide the same debugging capabilities as on desktop. If the device doesn't appear try another USB port.

The Android-SDK has a tool (ADB) that can help copy your plugin to the device:
`adb push dist/myplugin.dev.user.js /mnt/sdcard/IITC_Mobile/plugins`

