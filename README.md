<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/kelsiesmurphy/communityspot">
    <img src="static/favicon.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">CommuntiySpot</h3>

  <p align="center">
    Empowering local communities to have an online presence. Tailor-made online spaces for events, news and more from their community.
    <br />
    <a href="https://communityspot.co.uk/">View Site</a>
    ·
    <a href="https://github.com/kelsiesmurphy/communityspot/issues">Report Bug</a>
    ·
    <a href="https://github.com/kelsiesmurphy/communityspot/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About CommunitySpot</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![CommunitySpot Screen Shot](https://cothfwilejjjgulziyfd.supabase.co/storage/v1/object/public/EuansGuide%20Bucket/Portfolio%20mockup.jpg?t=2024-03-10T22%3A26%3A37.081Z)

CommunitySpot was created to provide a solution for small to medium communities looking to attend and host events.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Svelte][Svelte.dev]][Svelte-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- pnpm
  ```sh
  npm install -g pnpm
  ```
- GitHub (Version Control / Project Management)
- SupaBase (Database)
- Cloudflare (Hosting)
- Stripe (Billing)
- Notion (Documentation)

### Installation

1. Get the .env file from another member of the CommunitySpot team.
2. Clone the repo
   ```sh
   git clone https://github.com/kelsiesmurphy/communityspot.git
   ```
3. Install NPM packages
   ```sh
   pnpm install
   ```
4. Add API keys into `.env` (see .env.example for example of file layout)
   ```sh
   PUBLIC_SUPABASE_URL=XXXXX
   PUBLIC_SUPABASE_ANON_KEY=XXXXX
   ...
   ```
5. Get the application running locally
   ```sh
   pnpm run dev
   ```
6. Create a build of the application (optional)
   ```sh
   pnpm run build
   ```
7. Deploy the application to Cloudflare Pages via Direct Upload (not used as primary deployment method) (optional)
   ```sh
   pnpm run pages:deploy
   ```

We use a `dev` branch for working on new features, and only merge `dev` to the `main` branch when stable, in the form of a Pull Request. This automatically deploys the app to www.communityspot.co.uk. As shown in step 7, we can also deploy to Cloudflare Pages via a direct upload option, however this should be used for backup purposes only.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the [TBC] License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Kelsie Murphy - [@kelsiesmurphy](https://twitter.com/kelsiesmurphy) - communityspot@proton.me

Project Link: [https://github.com/kelsiesmurphy/communityspot](https://github.com/kelsiesmurphy/communityspot)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
