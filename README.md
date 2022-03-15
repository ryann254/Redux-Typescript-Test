# Todo App With Redux and Typescript

This is a learning project where I gradually add functionality to it. The project is first created with just React then I add typescript, redux and finally I connect it to a live backend. This is meant to be like a real world representation of how to add typescript to a project all while doing all the normal thing you would do in a project.

To move back to the point when redux is first added or to any point you want, use the following commands:
First clone the project using  `git clone https://github.com/ryann254/Redux-Typescript-Test.git`, cd into the cloned project then run `yarn install` in your terminal. This should install all the needed dependencies.

Now, let's say you want to move the exact point where I added redux to the project. You first need to run the `git log --oneline` to see all the commits and then choose the commit with the title `feat: Added redux store with typescript...`. Copy the commit hash next to it and run `git checkout 'paste the commit hash'` to visit that commit.

You can make as many changes as you want and play around with code. When you're done and want to visit another commit, simply run `git stash` to save all your changes and then run  `git checkout main`. This will move you back to the most recent commit and you can now move to any commit you want using the same process stated above.

Alternative, you can install an extension called `git lens` in your vscode which allows you to see all the commits in a project.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
