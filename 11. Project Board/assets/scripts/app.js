class DOMHelper {
  static moveElement(id, destinationSelector) {
    const element = document.getElementById(id);
    const destinationElement = document.querySelector(destinationSelector);
    destinationElement.appendChild(element);
  }

  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }
}

class Component {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;
  }

  attach() {
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? 'afterbegin' : 'beforeend',
      this.element
    );
  }

  detach() {
    if (this.element) {
      this.element.remove();
    }
  }
}

class Tooltip extends Component {
  constructor(closeNotifierFunction) {
    super('active-projects', true);
    this.closeNotifier = closeNotifierFunction;
    this.create();
  }

  closeTooltip() {
    this.detach();
    this.closeNotifier();
  }

  create() {
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'card';
    tooltipElement.textContent = 'Dummy';
    tooltipElement.addEventListener('click', this.closeTooltip.bind(this));
    this.element = tooltipElement;
  }
}

class ProjectItem {
  hasActiveTooltip = false;

  constructor(id, updateProjectListsFn, type) {
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsFn;
    this.connectSwitchButton();
    this.connectMoreInfoButton(type);
  }

  connectSwitchButton(type) {
    const projectItemElement = document.querySelector(`#${this.id}`);
    let switchButton = projectItemElement.querySelector('button:last-of-type');
    switchButton = DOMHelper.clearEventListeners(switchButton);
    switchButton.textContent = type === 'active' ? 'Finish' : 'Activate';
    switchButton.addEventListener(
      'click',
      this.updateProjectListsHandler.bind(null, this.id)
    );
  }

  update(updateProjectListsFn, type) {
    this.updateProjectListsHandler = updateProjectListsFn;
    this.connectSwitchButton(type);
  }

  connectMoreInfoButton() {
    const projectItemElement = document.querySelector(`#${this.id}`);
    const moreInfoButton = projectItemElement.querySelector(
      'button:first-of-type'
    );
    moreInfoButton.addEventListener('click', this.showMoreInfoHandler);
  }

  showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }
    const tooltip = new Tooltip(() => (this.hasActiveTooltip = false));
    tooltip.attach();
    this.hasActiveTooltip = true;
  }
}

class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;
    const projectItems = document.querySelectorAll(`#${type}-projects li`);
    for (const projectItem of projectItems) {
      this.projects.push(
        new ProjectItem(
          projectItem.id,
          this.switchProject.bind(this),
          this.type
        )
      );
    }
  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
  }

  switchProject(id) {
    this.switchHandler(this.projects.find(p => p.id === id));
    this.projects = this.projects.filter(p => p.id !== id);
  }
}

class App {
  static init() {
    const activeProjectsList = new ProjectList('active');
    const finishedProjectsList = new ProjectList('finished');
    activeProjectsList.setSwitchHandlerFunction(
      finishedProjectsList.addProject.bind(finishedProjectsList)
    );
    finishedProjectsList.setSwitchHandlerFunction(
      activeProjectsList.addProject.bind(activeProjectsList)
    );
  }
}

App.init();
