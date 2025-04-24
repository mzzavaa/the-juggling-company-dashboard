# Juggling Company Dashboard

The **Juggling Company Dashboard** is a React-based web application designed to make learning React and AWS concepts engaging and accessible. By using juggling as a metaphor, the platform gamifies the learning process, helping users master technical skills while tracking their progress in a fun and interactive way.

---

## Features

- **Learning Journey Map**: Visualize your progress through an interactive timeline that combines juggling tricks with technical milestones.
- **Personalized Avatar System**: Create a customizable avatar that evolves as you master juggling skills and technical concepts.
- **Gamification**: Earn badges, achievements, and XP for completing challenges and maintaining streaks.
- **AWS Integration**: Leverages AWS Amplify, Cognito, and DynamoDB for hosting, authentication, and data storage.
- **Practice Tracker**: Monitor your juggling "drops" (errors) and "clean runs" (successful builds) to encourage improvement.
- **Reflection Prompts**: Thought-provoking questions to connect juggling physics with React/AWS concepts.

---

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/juggling-company-dashboard.git
    ```
2. Navigate to the project directory:
    ```bash
    cd juggling-company-dashboard
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Initialize AWS Amplify:
    ```bash
    amplify init
    amplify push
    ```
5. Start the development server:
    ```bash
    npm start
    ```

---

## How It Works

### Learning Journey Map
The dashboard uses an interactive map to guide users through juggling tricks and their corresponding technical milestones. For example:
- **Three-Ball Cascade**: Learn React fundamentals like functional components, JSX, and props.
- **Reverse Cascade**: Dive into state management with `useState` and `useEffect`.
- **Mills Mess**: Explore advanced patterns like React Router and custom hooks.

Each module includes:
- **Video Tutorials**: Step-by-step guides for juggling and technical concepts.
- **Practice Goals**: Track progress with timers and streak counters.
- **Reflection Prompts**: Reinforce learning by connecting juggling techniques to technical principles.

### Gamification
- **Achievements**: Unlock badges for milestones like completing a module or maintaining a streak.
- **Avatar Evolution**: Your avatar visually evolves as you progress, showcasing your juggling and technical skills.

### AWS Integration
The project integrates AWS services to provide a seamless learning experience:
- **Amplify**: Hosting and deployment.
- **Cognito**: User authentication.
- **DynamoDB**: Storing module data and user progress.

---

## Example Learning Path Table

# | Juggling Trick → Tech Milestone | What You'll Build & Tools | ⏱️ | Tech Video(s) | Juggle Video(s)
---|---|---|---|---|---
1 | **Single-Ball Throw** → *Environment Kick-off* | Node/npm setup + Git repo + AWS profile / budget guardrails. **Tools**: Vite (or CRA), VS Code extensions | ½ d | [Vite Crash Course – Traversy Media](https://www.youtube.com/watch?pp=ygUGIzZ2aXRl&v=89NJdbYTgJ8) [React in 100 Seconds – Fireship](https://www.youtube.com/watch?v=Tn6-PIqc4UM) | [Learn to Juggle 3 Balls – Taylor Tries](https://www.youtube.com/watch?v=dCYDZDlcO6g) [Easy 3-Ball Tricks – Ultimate101](https://m.youtube.com/watch?v=SSbNtVfMdgM)
2 | **Three-Ball Cascade** → *Hello React* | Skeleton React app + CodePreview live-MD component. **Concepts**: functional components, JSX, props, hot-reload, linting | 1-2 d | [React JS Functional Components – Dave Gray](https://www.youtube.com/watch?v=NJ_qbsLf52w) [Net Ninja Modern React playlist](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) | [Taylor Tries cascade vid](https://www.youtube.com/watch?v=dCYDZDlcO6g) [40 Best 3-Ball Tricks – Ultimate101](https://www.youtube.com/watch?pp=ygUQI3RocmVlYmFsbHRyaWNrcw%3D%3D&v=q28w8jTM1gA)
3 | **Columns** → *Component Composition* | Sidebar NavColumn + ProgressRing wired to mock JSON. Concepts: children/slots, composition vs. prop-drilling | 2 d | [React JS Functional Components – Dave Gray](https://www.youtube.com/watch?v=NJ_qbsLf52w) [Net Ninja composition patterns](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) | [3-Ball Columns Tutorial – Niels Duinker](https://www.youtube.com/watch?v=nkAMDSNXCxY)
4 | **Reverse Cascade** → *State & Hooks* | Live XP counter + streak badge. Concepts: useState, useEffect, lifting state, basic Context | 2 d | [React Hooks Tutorial – Ben Awad](https://www.youtube.com/watch?v=f687hBjwFcM) [All React Hooks Explained – Pedro Tech](https://www.youtube.com/watch?v=LlvBzyy-558) | [Reverse Cascade Tutorial – Niels Duinker](https://www.youtube.com/watch?v=rDeneW2EoxQ)
5 | **Mills Mess** → *Advanced Patterns* | Dynamic Learning-Lab route + Form wizard. Concepts: React Router v6, lazy loading, custom hooks, React-Hook-Form | 3-4 d | [Advanced Route Config & Code-Split – Red Stapler](https://www.youtube.com/watch?v=HjZqRFRMfk4) [Router in Depth series – Net Ninja](https://www.youtube.com/watch?v=OMQ2QARHPo0) | [Learn Mills Mess – Taylor Tries](https://m.youtube.com/watch?t=0s&v=6htEgjE5Opo) [Mills Mess – Niels Duinker](https://www.youtube.com/watch?v=UWqpTUsIH_I)
6 | **4-Ball Fountain** → *AWS Integration* | Amplify Hosting CI + AppSync / DynamoDB + Cognito | 4-5 d | [AWS Amplify Introduction – AWS Channel](https://www.youtube.com/watch?v=ZPNnY9nmnio) [GraphQL with AWS AppSync – Marcia Villalba](https://www.youtube.com/watch?v=-RY1IigCAlA) | [Learn 4-Ball Fountain – Taylor Tries](https://www.youtube.com/watch?v=xrBOqBDhRyY) [4-Ball demo – Kinetic Circus](https://www.youtube.com/watch?v=xrBOqBDhRyY)
7 | **Passing (Feed-Four)** → *Team CI/CD* | GitHub Actions: lint, test, build, deploy; preview URLs | 2 d | [CI/CD Pipeline React + GitHub Actions – Code Mate](https://www.youtube.com/watch?v=T1sV7D418dY) [GitHub Actions Full Course](https://www.youtube.com/playlist?list=PLArH6NjfKsUhvGHrpag7SuPumMzQRhUKY) | [3-person feed passing pattern](https://www.youtube.com/watch?v=l_KayVy_NnE) [Ultimate Typewriter Feed](https://www.youtube.com/watch?v=LnyI6TnrldU)
8 | **5-Ball Build-Up** → *Production Hardening* | CloudFront in front of Amplify + CloudWatch alarms + feature flags | 3 d | [Monitor CDN with CloudFront – Tiny Tech Tutorials](https://www.youtube.com/watch?v=to3giuHSiMo) [AWS CloudWatch Alarms](https://www.youtube.com/watch?pp=0gcJCdgAo7VqN5tD&v=lHWrAAzoxJA) | [Learn 5-Ball Juggling – Taylor Tries](https://m.youtube.com/watch?t=586s&v=cvLSr93QerM) [5-Ball progress journey](https://www.youtube.com/watch?v=92jjR1wSygo)
9 | **Ring Shower** → *UX Polish & A11y* | Framer-Motion XP ring animation + WCAG checks + color-blind toggle | 2 d | [Framer Motion Crash Course – Jeroen Reumkens](https://www.youtube.com/watch?v=Ec03ndZle3Q) [5 Advanced Framer Motion Techniques](https://www.youtube.com/watch?v=prLNLxEXmbs) | [4-Ball Ring Shower Tutorial – Taylor Tries](https://www.youtube.com/watch?v=CUS-MmKYKI0)
10 | **Juggling While Walking** → *Mobile & Offline* | PWA switch + offline caching (Workbox / DataStore) | 2 d | [React PWA with Workbox – Dev Ed](https://www.youtube.com/watch?v=uKNLaleXztc) [Building PWAs with React & Workbox – Google DevSummit](https://www.youtube.com/watch?v=Ok2r1M1jM_M) | [How to Juggle while Retro-Walking – JustJuggleIt](https://www.youtube.com/watch?v=NCyogvmF7bw) [10 Practice Tips – Taylor Tries](https://www.youtube.com/watch?v=ywsUulQAdPQ)

## Screenshots

### Learning Journey Map
![Learning Journey Map](path/to/screenshot1.png)

### Module Details
![Module Details](path/to/screenshot2.png)

### Avatar Evolution
![Avatar Evolution](path/to/screenshot3.png)

---

## Contributing

Contributions are welcome! Submit a pull request or open an issue for bugs or feature requests.

---

## License

Licensed under the [MIT License](./LICENSE).

---

## Contact

For inquiries, email **support@jugglingcompany.com**.

