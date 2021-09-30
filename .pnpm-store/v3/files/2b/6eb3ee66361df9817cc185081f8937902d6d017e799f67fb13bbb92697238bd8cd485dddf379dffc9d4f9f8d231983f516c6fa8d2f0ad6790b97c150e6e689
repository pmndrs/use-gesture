type MenuItem = {
  label: string;
  ariaLabel?: string;
};

type MenuItemCheckbox = {
  label: string;
  type: "checkbox";
};

type MenuItemRadio = {
  label: string;
  name: string;
  type: "radio";
};

type MenuItemSeparator = {
  type: "separator";
};

type MenuButton = MenuItem & {
  menu: Menu;
};

type Menu = Array<
  MenuItem | MenuItemCheckbox | MenuItemRadio | MenuItemSeparator | MenuButton
>;

type MenuBar = Array<MenuButton>;

const menuBar: MenuBar = [
  {
    label: "Chrome",
    menu: [
      { label: "About Google Chrome" },
      { type: "separator" },
      { label: "Preferences..." },
      { type: "separator" },
      { label: "Clear Browsing Data..." },
      { label: "Import Bookmarks and Settings..." },
      { type: "separator" },
      {
        label: "Services",
        menu: [
          { label: "Activity Monitor" },
          { label: "Allocations & Leaks" },
          { label: "File Activity" },
          { label: "System Trace" },
          { label: "Time Profile Active Application" },
          { label: "Time Profile App Under mouse" },
          { label: "Time Profile Entire System" },
          { label: "Toggle Instruments Recording" },
          { label: "Services Preferences..." },
        ],
      },
      { label: "Hide Google Chrome" },
      { label: "Hide Others" },
      { label: "Show All" },
      { type: "separator" },
      { label: "Warn Before Quitting (⌘Q)", type: "checkbox" },
      { type: "separator" },
      { label: "Quit Google Chrome" },
    ],
  },
  {
    label: "File",
    menu: [
      { label: "New Tab" },
      { label: "New Window" },
      { label: "New Incognito Window" },
      { label: "Reopen Closed Tab" },
      { label: "Open File..." },
      { label: "Open Location..." },
      { type: "separator" },
      { label: "Close Window" },
      { label: "Close Tab" },
      { label: "Save Page As..." },
      { type: "separator" },
      {
        label: "Share",
        menu: [
          { label: "Email Link" },
          { label: "Messages" },
          { label: "Air Drop" },
          { label: "Notes" },
          { label: "Reminders" },
          { label: "Simulator" },
          { label: "More..." },
        ],
      },
      { type: "separator" },
      { label: "Print..." },
    ],
  },
  {
    label: "Edit",
    menu: [
      { label: "Undo" },
      { label: "Redo" },
      { type: "separator" },
      { label: "Cut" },
      { label: "Copy" },
      { label: "Paste" },
      { label: "Paste and Match Style" },
      { label: "Delete" },
      { label: "Select All" },
      { type: "separator" },
      {
        label: "Find",
        menu: [
          { label: "Search the Web..." },
          { type: "separator" },
          { label: "Find..." },
          { label: "Find Next" },
          { label: "Find Previous" },
          { label: "Use Selection for Find" },
          { label: "Jump to Selection" },
        ],
      },
      {
        label: "Spelling and Grammar",
        menu: [
          { label: "Show Spelling and Grammar" },
          { label: "Check Document Now" },
          { label: "Check Spelling While Typing", type: "checkbox" },
          { label: "Check Grammar With Spelling", type: "checkbox" },
        ],
      },
      {
        label: "Substitutions",
        menu: [
          { label: "Show Substitutions" },
          { type: "separator" },
          { label: "Smart Quotes", type: "checkbox" },
          { label: "Smart Dashes", type: "checkbox" },
          { label: "Text Replacement", type: "checkbox" },
        ],
      },
      {
        label: "Speech",
        menu: [{ label: "Start Speaking" }, { label: "Stop Speaking" }],
      },
      { type: "separator" },
      { label: "Start Dictation..." },
      { label: "Emoji & Symbols" },
    ],
  },
  {
    label: "View",
    menu: [
      { label: "Always Show Bookmarks Bar", type: "checkbox" },
      { label: "Always Show Toolbar in Full Screen", type: "checkbox" },
      { label: "Customize Touch Bar..." },
      { type: "separator" },
      { label: "Stop" },
      { label: "Force Reload This Page" },
      { type: "separator" },
      { label: "Enter Full Screen" },
      { label: "Actual Size" },
      { label: "Zoom In" },
      { label: "Zoom Out" },
      { type: "separator" },
      {
        label: "Developer",
        menu: [
          { label: "View Source" },
          { label: "Developer Tools" },
          { label: "Inspect Elements" },
          { label: "JavaScript Console" },
          { label: "Allow JavaScript from Apple Events", type: "checkbox" },
        ],
      },
    ],
  },
  {
    label: "History",
    menu: [
      { label: "Home" },
      { label: "Back" },
      { label: "Forward" },
      { type: "separator" },
      { label: "Show Full History" },
    ],
  },
  {
    label: "Bookmarks",
    menu: [
      { label: "Bookmark Manager" },
      { label: "Bookmark This Tab..." },
      { label: "Bookmark All Tabs..." },
    ],
  },
  {
    label: "People",
    menu: [
      { label: "Me", type: "radio" },
      { type: "separator" },
      { label: "Edit..." },
      { type: "separator" },
      { label: "Add Person..." },
    ],
  },
  {
    label: "Tab",
    menu: [
      { label: "Select Next Tab" },
      { label: "Select Previous Tab" },
      { label: "Duplicate Tab" },
      { label: "Mute Site" },
      { label: "Pin Tab" },
      { label: "Close Other Tabs" },
      { label: "Close Tabs to the Right" },
      { label: "Move Tab to New Window" },
    ],
  },
  {
    label: "Window",
    menu: [
      { label: "Minimize" },
      { label: "Zoom" },
      { label: "Tile Window to Left of Screen" },
      { label: "Tile Window to Right of Screen" },
      { type: "separator" },
      { label: "Show As Tab" },
      { type: "separator" },
      { label: "Downloads" },
      { label: "Extensions" },
      { label: "Task Manager" },
      { type: "separator" },
      { label: "Bring All to Front" },
    ],
  },
  {
    label: "Help",
    menu: [
      { label: "Search" },
      { label: "Report an Issue..." },
      { label: "Google Chrome Help" },
    ],
  },
];

export default menuBar;
