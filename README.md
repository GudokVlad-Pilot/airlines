# TiTim Airlines

This project was created as a birthday invitation for friends. The project is hosted by [Netlify](https://www.netlify.com/). Here is the link to the website (in Russian): [TiTim Airlines](https://titimairlines.gudokvlad.com/).

> [!IMPORTANT]
> - The app was created for personal non-commercial use.
> - All the references added in the README.md.
> - All assets were created by developer's team or taken from open access
> - If you found any violations, please contact me via email to resolve these problems: **vladislavpogudin.dev@gmail.com**.

## Setting the environment

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
        "editor.formatOnPaste": true, // optional
        "editor.formatOnSave": true, // optional
        "editor.formatOnSaveMode": "file", // required to format on save
        "files.autoSave": "onFocusChange", // optional but recommended
        "vs-code-prettier-eslint.prettierLast": false // set as "true" to run 'prettier' last not first
    }
    ```

## Instructions to run the project

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

3. Local version is available via link in the output, but usually it is run on your [localhost](http://localhost:3000/).

## Instructions to run Storybook

1. Install dependencies.

    ```bash
    npm install
    ```

2. Run Storybook.

    ```bash
    npm run storybook
    ```

3. Open Storybook on your [localhost](http://localhost:6006/).

## The architecture of the app

### Language

TBA

### Data Storage and Management

TBA

### App navigation structure

TBA

### Design

TBA

## References

- Cloud video: [Pexels](https://www.pexels.com/video/cumulus-clouds-formation-in-the-sky-3129769/)

## Credits

- UI/UX Design and CSS Components by [Charlie](https://www.instagram.com/charlieandarchitecture/?igsh=a3JjcTJjNzhiZmg1#).
- Project Setup and Implementation by [GudokVlad](https://gudokvlad.com/).
