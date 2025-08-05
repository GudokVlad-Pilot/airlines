# ✈️ TiTim Airlines

[![Netlify Status](https://api.netlify.com/api/v1/badges/a829f585-636e-4ed9-8bfe-656ae50143c0/deploy-status)](https://app.netlify.com/projects/titimairlines/deploys)
---
This project was created as a birthday invitation for friends. Later the project will be used for organising thematic events and as a template for aircompanies. The project is hosted by [Netlify](https://www.netlify.com/). Here is the link to the website: [Fox Airlines](https://foxairlines.gudokvlad.com/).

> [!IMPORTANT]
> - The app was created for personal non-commercial use.
> - All the references added in the README.md.
> - All assets were created by developer's team or taken from open access
> - If you found any violations, please contact me via email to resolve these problems: **vladislavpogudin.dev@gmail.com**.

## ⚙️ Setting the Environment

1. Clone the repository.

   ```bash
   https://github.com/GudokVlad-Pilot/airlines.git
   ```

2. Check that you have the latest Node.js version.

   ```bash
   node -v
   ```

3. If you do not have Node.js installed, you can download it from here: [Node.js website](https://nodejs.org/en).

4. Add `.env` file to your repo.

    ```
    NEXT_PUBLIC_SANITY_PROJECT_ID=projectID
    NEXT_PUBLIC_SANITY_DATASET=dataset
    NEXT_PUBLIC_SANITY_API_VERSION=2023-01-01
    ```

5. 1. (Optional) It is recommended to install `Prettier ESLint` extention for your VSCode.

5. 2. Open Workspace Settings, usially by pressing `Ctrl + Shift + P` and add the following code:

    ```json
    {
        "editor.defaultFormatter": "rvest.vs-code-prettier-eslint",
        "editor.formatOnType": false,
        "editor.formatOnPaste": true,
        "editor.formatOnSave": true,
        "editor.formatOnSaveMode": "file",
        "files.autoSave": "onFocusChange",
        "vs-code-prettier-eslint.prettierLast": false
    }
    ```

## 🚀 Instructions to Run the Project

1. Install dependencies.

   ```bash
   npm install
   ```

2. Start the app.

   ```bash
    npm run dev
   ```

2. 1. You can build your project separately:

        ```bash
         npm run build
        ```

* Builds the app for production to the `.next` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

3. Local version is available via link in the output, but usually it is run on your [localhost:3000](http://localhost:3000/).

## 📘 Instructions to Run Storybook

1. Install dependencies.

    ```bash
    npm install
    ```

2. Run Storybook.

    ```bash
    npm run storybook
    ```

3. Open Storybook on your [localhost:6006](http://localhost:6006/).

## 🏗️ The Architecture of the App

### 💻 Languages

TBA

### 🗄️ Data Storage and Management

TBA

### 🧭 App Navigation Structure

TBA

### 🎨 Design

TBA

### 📘 Storybook

The project's components were developed using [Storybook](https://storybook.js.org/), located in the `/src/components` directory.

- The design system follows a simplified **Atomic Design** methodology (Atoms → Molecules → Pages).
- Each level contains a set of components categorized by size and complexity.
- Each component includes 2–3 files:
  1. `index.tsx` – the component implementation
  2. `index.stories.tsx` – the Storybook configuration and preview
  3. `component.css` *(optional)* – custom styles specific to the component


## 📑 References

- Cloud video: [Pexels](https://www.pexels.com/video/cumulus-clouds-formation-in-the-sky-3129769/)

## 🛠️ Tools

This project is built using the following technologies:

[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=white)](https://www.netlify.com/)
[![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Storybook](https://img.shields.io/badge/Storybook-FF4785?logo=storybook&logoColor=white)](https://storybook.js.org/)
[![Sanity](https://img.shields.io/badge/Sanity-EF2D5E?logo=sanity&logoColor=white)](https://www.sanity.io/)

## 📋 Credits

- **Charlie**  
  *UI/UX Designer & Frontend Stylist*  
  Designed the user interface and authored the CSS for custom components.  
  [Instagram](https://www.instagram.com/charlieandarchitecture/?igsh=a3JjcTJjNzhiZmg1#)

- **GudokVlad**  
  *Technical Architect & Developer*  
  Initialized the repository and configured core technologies, including Sanity, Firebase, and Storybook.  
  [GitHub](https://github.com/GudokVlad-Pilot)
  [Portfolio](https://gudokvlad.com/)
