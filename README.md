# ✈️ Mini-FADEC Simulator

A web-based simulation of a simplified Full Authority Digital Engine Control (FADEC) system for a turbofan engine. This project demonstrates how engine parameters such as air mass flow, ambient temperature, and fan speed influence fuel flow calculations and engine operating conditions.

## 📸 Preview

![Mini-FADEC Simulator](preview.png)

## 🎯 Project Overview

The Mini-FADEC Simulator models basic engine control logic used in modern aircraft engines. Users can adjust engine input parameters and observe how the simulated FADEC system calculates fuel flow while monitoring engine health and operational limits.

This project was developed as an educational tool for understanding the fundamentals of aircraft engine control systems.

## ✨ Features

### Inputs & Environment
- Air Mass Flow (Wa) control
- Ambient Temperature (Tamb) control
- Fan Speed (N₁) control
- Live sensor monitoring

### FADEC Logic & Algorithm
- Fuel flow computation
- Exhaust Gas Temperature (EGT) estimation
- Engine protection logic
- Over-temperature detection
- Automatic fuel reduction recommendations

### Outputs & Engine Status
- EGT gauge visualization
- N₁ RPM gauge visualization
- Fuel flow output display
- Engine status monitoring
- Event logging system
- Fault code generation

## 🛠 Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- SVG Gauges
- DOM Manipulation

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/Aizenn835/FADEC.git
```

### Run Locally

1. Open the project folder.
2. Launch `index.html` in your browser.
3. Adjust the engine parameters and observe the simulation results.

No additional dependencies are required.

## 📂 Project Structure

```text
mini-fadec-simulator/
│
├── index.html
├── style.css
├── script.js
├── assets/
│   └── preview.png
│
└── README.md
```

## ⚙️ Simulation Formula

The simulator uses a simplified fuel flow model:

```text
Wf = Wa / 15
```

Where:

- Wa = Air Mass Flow
- Wf = Fuel Flow

Additional logic estimates EGT and evaluates engine operating conditions to detect abnormal states.

## 🎓 Learning Objectives

This project helps demonstrate:

- Aircraft propulsion fundamentals
- FADEC system concepts
- Real-time sensor monitoring
- Engineering dashboard design
- JavaScript event-driven programming
- Interactive simulation development

## 🔮 Future Improvements

- Realistic engine performance equations
- Multiple engine types
- Engine start-up sequence simulation
- Throttle control integration
- Data logging and export
- Dark mode cockpit interface
- Mobile responsiveness

 ## 🤝 Acknowledgment

This project was created for a friend who needed a simple and interactive way to demonstrate the basic principles of a Full Authority Digital Engine Control (FADEC) system. It was developed as both a learning experience and a practical simulation tool for educational purposes.

## 👨‍💻 Author

**Lei Justine Clemente**

Student Developer – Aviation Technology & Software Development

GitHub: https://github.com/Aizenn835

## 📜 License

This project is intended for educational and academic purposes.
