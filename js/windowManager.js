export class WindowManager {
  constructor() {
    this.windows = new Map();
    this.activeWindow = null;
    this.windowIdCounter = 0;
    this.taskList = window.parent.document.getElementById('task-list');
  }

  createWindow({ title, icon, content, x, y, width, height }) {
    const id = this.windowIdCounter++;

    const winEl = window.parent.document.createElement('div');
    winEl.className = 'window';
    winEl.style.width = `${width}px`;
    winEl.style.height = `${height}px`;
    winEl.style.left = `${x}px`;
    winEl.style.top = `${y}px`;

    const header = window.parent.document.createElement('div');
    header.className = 'window-header';

    let appIcon = null;
    if (icon) {
    appIcon = window.parent.document.createElement('img');
    appIcon.src = icon;
    }

    const titleEl = window.parent.document.createElement('div');
    titleEl.className = 'window-title';
    titleEl.textContent = title;

    const titleGroup = window.parent.document.createElement('div');
    titleGroup.className = 'window-title-group';
    titleGroup.append(...(appIcon ? [appIcon] : []), titleEl)

    const controls = window.parent.document.createElement('div');
    controls.className = 'window-controls';

    const shadeBtn = this.createWindowButton('chevron-up');
    const minimizeBtn = this.createWindowButton('minus');
    const maximizeBtn = this.createWindowButton(`maximize`);
    const closeBtn = this.createWindowButton(`x`);
    const backBtn = this.createWindowButton(`arrow-left`);

    controls.append(minimizeBtn, closeBtn);
    header.append(maximizeBtn, shadeBtn, titleGroup, controls);

    const contentEl = window.parent.document.createElement('div');
    contentEl.className = 'window-content';
    contentEl.innerHTML = content;

    winEl.append(header, contentEl);
    window.parent.document.getElementById('windows').appendChild(winEl);

    if (window.parent.lucide) {
  window.parent.lucide.createIcons();
  }

const taskButton = window.parent.document.createElement('button');
taskButton.className = 'task-button';
taskButton.id = 'app-button';

if (icon) {
  const appIcon = window.parent.document.createElement('img');
  appIcon.src = icon;
  taskButton.appendChild(appIcon);
}

const appLabel = window.parent.document.createElement('span');
appLabel.className = 'app-label';
appLabel.textContent = title;

taskButton.appendChild(appLabel);

this.taskList.appendChild(taskButton);

    const windowData = {
      element: winEl,
      taskButton,
      title,
      isMinimized: false
    };

    this.windows.set(id, windowData);

    this.setupWindowEvents(id, winEl, header);
    this.setupTaskButtonEvents(id, taskButton);
    this.setupWindowControls(id, closeBtn, maximizeBtn, minimizeBtn, shadeBtn);

    this.activateWindow(id);

    return id;
  }

  checkTaskbarContact() {
  const taskbar = document.querySelector(".taskbar");
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
  
setupWindowEvents(id, winEl, header) {
  let mouseDown = false;
  let clickDifferenceX = 0;
  let clickDifferenceY = 0;

  const iframe = winEl.querySelector('iframe');

  winEl.addEventListener('mousedown', () => this.activateWindow(id));

  header.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    mouseDown = true;
    e.preventDefault();

    if (iframe) iframe.style.pointerEvents = 'none';

    const rect = winEl.getBoundingClientRect();
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

    winEl.style.left = `${e.clientX - clickDifferenceX}px`;
    winEl.style.top  = `${e.clientY - clickDifferenceY}px`;

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

  const icon = window.parent.document.createElement('i');
  icon.setAttribute('data-lucide', iconName);
  icon.className = 'window-icon';
  
  button.appendChild(icon);
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
  const winEl = win.element;

  if (!winEl.dataset.originalHeight) {
    winEl.dataset.originalHeight = winEl.offsetHeight + 'px';
  }

  const isShaded = winEl.classList.contains('shaded');
  const isMaximized = winEl.style.width === '100vw';

    if(isMaximized) return;

  if (isShaded) {
    winEl.style.height = winEl.dataset.originalHeight;
    winEl.classList.remove('shaded');
  } else {
    winEl.style.height = '32px';
    winEl.classList.add('shaded');
  }
}

  restoreWindow(id) {
    const win = this.windows.get(id);
    const winEl = win.element;
    winEl.style.display = 'flex';
    win.isMinimized = false;
    this.activateWindow(id);
  }

  maximizeWindow(id) {
    const win = this.windows.get(id);
    const winEl = win.element;
    const isMaximized = winEl.style.width === '100vw';
    const isShaded = winEl.classList.contains('shaded');

    if(isShaded) return;

    if (isMaximized) {
      winEl.style.width = win.prevWidth || '400px';
      winEl.style.height = win.prevHeight || '300px';
      winEl.style.left = win.prevLeft || '0px';
      winEl.style.top = win.prevTop || '0px';
    } else {
      win.prevWidth = win.element.style.width;
      win.prevHeight = win.element.style.height;
      win.prevLeft = win.element.style.left;
      win.prevTop = win.element.style.top;

      winEl.style.width = '100vw';
      winEl.style.height = `calc(100vh - 48px)`;
      winEl.style.left = '0';
      winEl.style.top = '0';
    }
  }

  closeWindow(id) {
    const win = this.windows.get(id);
    win.element.remove();
    win.taskButton.remove();
    this.windows.delete(id);
  }
}