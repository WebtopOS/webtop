export class WindowManager {
  constructor() {
    this.windows = new Map();
    this.activeWindow = null;
    this.windowIdCounter = 0;
    this.taskList = window.parent.document.getElementById('task-list');
  }

  createWindow({ title, icon, content, x, y, width, height }) {
    const id = this.windowIdCounter++;

    const windowEl = window.parent.document.createElement('div');
    windowEl.className = 'window';
    windowEl.style.width = `${width}px`;
    windowEl.style.height = `${height}px`;
    windowEl.style.left = `${x}px`;
    windowEl.style.top = `${y}px`;

    const header = window.parent.document.createElement('div');
    header.className = 'window-header';

        function updateAccent() {
          header.style.backgroundColor = window.getAccent("rgba(10, 10, 10, 0.88)");
          requestAnimationFrame(updateAccent);
        }
        updateAccent();

    const titleEl = window.parent.document.createElement('div');
    titleEl.className = 'window-title';
    titleEl.textContent = title;

    const controls = window.parent.document.createElement('div');
    controls.className = 'window-controls';

    const shadeBtn = this.createWindowButton(`➕`);
    const minimizeBtn = this.createWindowButton('square-arrow-out-down-left');
    const maximizeBtn = this.createWindowButton(`square-arrow-out-up-right`);
    const closeBtn = this.createWindowButton(`square-x`)

    controls.append(minimizeBtn, maximizeBtn);
    header.append(closeBtn, titleEl, controls);

    const contentEl = window.parent.document.createElement('div');
    contentEl.className = 'window-content';
    contentEl.innerHTML = content;

    windowEl.append(header, contentEl);
    window.parent.document.getElementById('windows').appendChild(windowEl);

const taskButton = window.parent.document.createElement('button');
taskButton.className = 'task-button';

const appLabel = window.parent.document.createElement('span');
appLabel.className = 'app-label';
appLabel.textContent = title;

taskButton.appendChild(appLabel);

this.taskList.appendChild(taskButton);

    const windowData = {
      element: windowEl,
      taskButton,
      title,
      isMinimized: false
    };

    this.windows.set(id, windowData);

    this.setupWindowEvents(id, windowEl, header);
    this.setupTaskButtonEvents(id, taskButton);
    this.setupWindowControls(id, closeBtn2, maximizeBtn2, minimizeBtn2, shadeBtn2);

    this.activateWindow(id);

    return id;
  }

  checkTaskbarContact() {
  const taskbar = document.getElementById("taskbar");
  const windows = document.querySelectorAll(".window");

  let touching = false;

  windows.forEach(win => {
    const w = win.getBoundingClientRect();
    const t = taskbar.getBoundingClientRect();

    const tolerance = 2;

    if (w.bottom >= t.top - tolerance) {
      touching = true;
    }
  });

  if (touching) {
    taskbar.classList.add("attached");
    return;
  }

  taskbar.classList.remove("attached");
}
  
setupWindowEvents(id, windowEl, header) {
  let mouseDown = false;
  let clickDifferenceX = 0;
  let clickDifferenceY = 0;

  const iframe = windowEl.querySelector('iframe');

  windowEl.addEventListener('mousedown', () => this.activateWindow(id));

  header.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    mouseDown = true;
    e.preventDefault();

    if (iframe) iframe.style.pointerEvents = 'none';

    const rect = windowEl.getBoundingClientRect();
    clickDifferenceX = e.clientX - rect.left;
    clickDifferenceY = e.clientY - rect.top;
  });

  header.addEventListener('dblclick', () => {
  this.maximizeWindow(id); 
  this.checkTaskbarContact();
  });

  window.parent.document.addEventListener('mousemove', (e) => {
    if (!mouseDown) return;
    e.preventDefault();

    windowEl.style.left = `${e.clientX - clickDifferenceX}px`;
    windowEl.style.top  = `${e.clientY - clickDifferenceY}px`;

    this.checkTaskbarContact();
  });

  window.parent.document.addEventListener('mouseup', () => {
    if (!mouseDown) return;
    mouseDown = false;

    if (iframe) iframe.style.pointerEvents = 'auto';

    this.checkTaskbarContact();
  });
}

  setupTaskButtonEvents(id, taskButton) {
    taskButton.addEventListener('click', () => {
      const win = this.windows.get(id);
      if (win.isMinimized) {
        this.restoreWindow(id);
        this.checkTaskbarContact();
      } else if (this.activeWindow === id) {
        this.minimizeWindow(id);
        this.checkTaskbarContact();
      } else {
        this.activateWindow(id);
        this.checkTaskbarContact();
      }
    });
  }

  setupWindowControls(id, Btn1, Btn2, Btn3, Btn4) {
    Btn2.addEventListener('click', () => this.maximizeWindow(id));
    Btn3.addEventListener('click', () => this.minimizeWindow(id));
    Btn1.addEventListener('click', () => this.closeWindow(id));
    Btn4.addEventListener('click', () => this.shadeWindow(id));
  }

createWindowButton(iconName) {
  const button = window.parent.document.createElement('button');
  button.className = 'window-button';
  
  // Look up the icon in Lucide's library. 
  // Fall back to plain text if the icon name doesn't exist (e.g., if you pass custom text).
  if (window.parent.lucide && window.parent.lucide.icons[iconName]) {
    button.innerHTML = window.parent.lucide.icons[iconName].toSvg({
      class: 'window-icon',
      'stroke-width': 2,
      width: 14,
      height: 14
    });
  } else {
    button.textContent = iconName;
  }
  
  return button;
}


  activateWindow(id) {
    this.windows.forEach((win, winId) => {
      if (winId === id) {
        win.element.style.zIndex = '100';
        win.taskButton.classList.add('active');
      } else {
        win.element.style.zIndex = '1';
        win.taskButton.classList.remove('active');
      }
    });
    this.activeWindow = id;
  }

  minimizeWindow(id) {
    const win = this.windows.get(id);
    win.element.style.display = 'none';
    win.isMinimized = true;
    win.taskButton.classList.remove('active');
  }

shadeWindow(id) {
  const win = this.windows.get(id);
  const windowEl = win.element;

  if (!windowEl.dataset.originalHeight) {
    windowEl.dataset.originalHeight = windowEl.offsetHeight + 'px';
  }

  const isShaded = windowEl.classList.contains('shaded');

  const windowIcons = windowEl.querySelectorAll('img.window-icon');
  if (windowIcons.length <= 2) return;
  const shadeImg = windowIcons[2];

  if (isShaded) {
    windowEl.style.height = windowEl.dataset.originalHeight;
    windowEl.classList.remove('shaded');
    shadeImg.src = './icons/controls/shade_up.svg';
  } else {
    windowEl.style.height = '32px';
    windowEl.classList.add('shaded');
    shadeImg.src = './icons/controls/shade_down.svg';
  }
}

  restoreWindow(id) {
    const win = this.windows.get(id);
    win.element.style.display = 'flex';
    win.isMinimized = false;
    this.activateWindow(id);
  }

  maximizeWindow(id) {
    const win = this.windows.get(id);
    const isMaximized = win.element.style.width === '100vw';

    if (isMaximized) {
      win.element.style.width = win.prevWidth || '400px';
      win.element.style.height = win.prevHeight || '300px';
      win.element.style.left = win.prevLeft || '0px';
      win.element.style.top = win.prevTop || '0px';
    } else {
      win.prevWidth = win.element.style.width;
      win.prevHeight = win.element.style.height;
      win.prevLeft = win.element.style.left;
      win.prevTop = win.element.style.top;

      win.element.style.width = '100vw';
      win.element.style.height = `calc(100vh - 48px)`;
      win.element.style.left = '0';
      win.element.style.top = '0';
    }
  }

  closeWindow(id) {
    const win = this.windows.get(id);
    win.element.remove();
    win.taskButton.remove();
    this.windows.delete(id);
  }
}