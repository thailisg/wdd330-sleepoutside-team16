export default class Alert {
  constructor() {
    this.alerts = [];
  }

  async init() {
    try {
      const response = await fetch("../json/alerts.json");
      if (response.ok) {
        this.alerts = await response.json();
      }
    } catch (error) {
      console.error("Error loading alerts:", error);
    }

    this.render();
  }

  render() {
    if (!this.alerts || this.alerts.length === 0) {
      return;
    }

    const section = document.createElement("section");
    section.className = "alert-list";

    this.alerts.forEach((alert) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = alert.message;
      paragraph.style.backgroundColor = alert.background;
      paragraph.style.color = alert.color;
      section.appendChild(paragraph);
    });

    const main = document.querySelector("main");
    if (main) {
      main.prepend(section);
    }
  }
}
