<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

</div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Blitzkrieg Monitor</h3>
  <p align="center">
    An automated OSINT dashboard built to aggregate real-time global crisis signals.
    <br />
<video src="https://github.com/user-attachments/assets/54a6e4d6-66d8-4ff4-b0f8-50f658386081" width="100%" controls>
  Your browser does not support the video tag.
</video>
    <br />
    <a href="https://situation-monitor-9w97.vercel.app/">View Live Demo</a>
    &middot;
    <a href="https://github.com">Report Bug</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#technical-challenges--lessons">Technical Challenges & Lessons</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

Blitzkrieg Monitor is an open-source OSINT (Open Source Intelligence) situation dashboard designed to centralize critical geopolitical signals, news, and unusual domestic activity into a single automated interface. 

> [!WARNING]
> **Disclaimer:** This project is strictly for showcase and learning purposes. Due to the aggressive anti-scraping measures on modern web platforms, backend retrieval loops may occasionally experience performance bottlenecks.

### Companion Repository
The core data collection logic, automated scraper routines, and web streams are decoupled. You can view the backend system here:
* [Backend API Repository](https://github.com/baarbi3/situation-monitor-api)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![Tailwind][Tailwind]][Tailwind-url]
* [![shadcn/ui][shadcn]][shadcn-url]
* [![Express][Express.js]][Express-url]
* [![Puppeteer][Puppeteer]][Puppeteer-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FEATURES -->
## Features

* **Pentagon "Pizza Theory" Analysis:** Scrapes and parses Google Popular Times data live to identify anomalies and spikes in activity at strategic locations.
* **Curated OSINT Twitter Feed:** Streams real-time updates from a custom list of trusted intelligence and OSINT accounts.
* **Geopolitical Prediction Markets:** Integrates Polymarket API trends to monitor public sentiment on high-stakes global events.
* **Live Flight Tracking:** Displays custom global airspace status using an integrated AirNav widget.
* **Aggregated Global News:** Feeds live global breaking news natively using the newsdata.io API endpoint.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To spin up a local instance of the monitor, you must run both this frontend repository and the companion API server.

### Prerequisites

* Node.js & npm installed locally
* API Keys from [newsdata.io](https://newsdata.io)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com
   ```
2. Install project packages:
   ```sh
   npm install
   ```
3. Set up your environment file (`.env.local`):
   ```env
   NEWS_API_KEY=
   ```
4. Start the local server environment:
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TECHNICAL CHALLENGES -->
## Technical Challenges & Lessons

Building the data pipeline for this project offered a major lesson in modern anti-scraping dynamics:

* **The Twitter Sandbox:** Scraping directly from standard endpoints is heavily restricted. To bypass this, the API script routes requests through **Nitter**. Because public Nitter instances frequently face heavy load and dynamic blocklists, the backend utilizes an aggregated instance resolver (`twiiit.com`) to loop, test, and automatically retry instances until a successful DOM payload is delivered.
* **Google Maps Scraping:** Fetching live Popular Times data dynamically via Puppeteer required heavy optimization of headful/headless launch parameters to safely render components without getting tripped up by bot mitigation firewalls.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Initial dashboard alpha build
- [x] Nitter failover proxy switching mechanism
- [ ] Fixing performance bottlenecks

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Any contributions, bug updates, or optimization suggestions are welcome! 

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

**Ayan** - [@Barbar0sDev](https://x.com) - ayan.whiz@gmail.com  
Frontend: [https://github.com/baarbi3/situation-monitor](https://github.com/baarbi3/situation-monitor)  
Backend: [https://github.com/baarbi3/situation-monitor-api](https://github.com/baarbi3/situation-monitor-api)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Special recognition to these open-source tools and data engines that made this project possible:

* [Nitter](https://github.com) & [Twiiit](https://twiiit.com) — For providing lightweight, tracker-free interfaces to parse critical feeds.
* [Polymarket API](https://polymarket.com) — For supplying underlying prediction data layers.
* [AirNav Systems](https://airnav.com) — For embedded aviation tracking widgets.
* [pizzint.watch](https://www.pizzint.watch/) & [situation-monitor.vercel.app](https://situation-monitor.vercel.app/) — Exceptional implementations that served as core architectural inspirations for this project.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://shields.io
[contributors-url]: https://github.com
[forks-shield]: https://shields.io
[forks-url]: https://github.com
[stars-shield]: https://shields.io
[stars-url]: https://github.com
[issues-shield]: https://shields.io
[issues-url]: https://github.com

[Next.js]: https://shields.io
[Next-url]: https://nextjs.org
[React.js]: https://shields.io
[React-url]: https://reactjs.org
[TypeScript]: https://shields.io
[TypeScript-url]: https://typescriptlang.org
[Tailwind]: https://shields.io
[Tailwind-url]: https://tailwindcss.com
[shadcn]: https://shields.io
[shadcn-url]: https://shadcn.com
[Express.js]: https://shields.io
[Express-url]: https://expressjs.com
[Puppeteer]: https://shields.io
[Puppeteer-url]: https://pptr.dev
