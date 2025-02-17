# NikoDle App

This is frontend part of the project that was created as a birthday gift for my friend Niko. The project is hosted by [Netlify](https://www.netlify.com/). Here is the link to the website (in Russian): [NikoDle](https://nikodle.netlify.app/). You can check backend code here: [backend](https://github.com/GudokVlad-Pilot/BirthdayQuestBackend).

> [!IMPORTANT]
> - The app was created for personal non-commercial use.
> - All the references added in the README.md.
> - All the League of Legends champions belongs to [Riot Games](https://www.riotgames.com/en).
> - The app is not setting the goal to humiliate or sexualise female and male bodies.
> - If you found any violations, please contact me via email to resolve these problems: **vladislavpogudin.dev@gmail.com**.

## Setting the environment

1. Clone the repository.

   ```bash
   https://github.com/GudokVlad-Pilot/BirthdayQuest.git
   ```

2. Check that you have the latest Node.js version.

   ```bash
   node -v
   ```

3. If you do not have Node.js installed, you can download it from here: [Node.js website](https://nodejs.org/en).

## Instructions to run the app

1. Install dependencies.

   ```bash
   npm install
   ```

2. Start the app.

   ```bash
    npm start
   ```

2. 1. You can build your project separately:
        ```bash
         npm run build
        ```

* Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

3. Local version is available via link in the output, but usually it is run on your [localhost](http://localhost:3000/)

## The architecture of the app

### Language

- TypeScript (React) and CSS for frontend.
- JavaScript (Node.js) for backend.

### Data Storage and Management

- The data for task pages is located on backend.
- The data for award is stored locally.

### App navigation structure

- Landing page: the initial page with brief introduction.
- Chest page: the page where Niko should guess 10 [League of Legends champions](https://www.leagueoflegends.com/en-us/champions/) by their chest (as an Easter Egg chests of two his friends were also added).
- Friends page: the page where Niko should guess 3 of his friends by description.
- Award page: the last page where Niko get his award and can download it (Easter Eggs: When Niko downloads the award, the joke appears; When he wants to send it, the Rickroll opens).

### Design

The app consist of navigation bar and 4 pages.

- The icons and app design was created by [Charlie](https://www.instagram.com/charlieandarchitecture/?igsh=a3JjcTJjNzhiZmg1#).
- The implementation by [GudokVlad](https://github.com/GudokVlad-Pilot).

## References

Friends page: [LoLdle](https://loldle.net/)
Chest page: [LoLdle (chest edition)](https://loldle.rovi.me/)