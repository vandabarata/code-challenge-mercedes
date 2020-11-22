# Code Challenge Mercedes-Benz.io
[![By Vanda Barata, 2020](https://img.shields.io/badge/BY-Vanda%20Barata,%202020-9cf?style=flat-square)](https://www.linkedin.com/in/vandabarata/)

[![Tested with Cypress](https://img.shields.io/badge/Tested%20with-Cypress-0BA97F?style=flat-square)](https://www.cypress.io/)
___
[![Project Requirements](https://img.shields.io/badge/Project-Requirements-FFD700?style=for-the-badge&logo=read-the-docs)](https://docs.cypress.io/guides/getting-started/installing-cypress.html#System-requirements)

[![npm](https://img.shields.io/badge/npm-installed%20on%20machine-C73B3B?style=flat-square&logo=npm)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

##### Any of the following browsers:
 [![chrome](https://img.shields.io/badge/chrome-browser-008000?style=flat-square&logo=google-chrome&logoColor=brightgreen)](https://www.google.com/chrome/)
 [![firefox](https://img.shields.io/badge/firefox-browser-orange?style=flat-square&logo=firefox)](https://www.mozilla.org/en-US/firefox/new/)
 [![edge](https://img.shields.io/badge/edge-browser-blue?style=flat-square&logo=microsoft-edge&logoColor=blue)](https://www.microsoft.com/en-us/edge)
 ___
 [![Project Run](https://img.shields.io/badge/Project-Run-black?style=for-the-badge&logo=cypress)](https://docs.cypress.io/guides/getting-started/installing-cypress.html#System-requirements)
1. Clone git project into your machine
    ```shell
    git clone https://github.com/vandakiara/code-challenge-mercedes.git
    ```
2. Enter the project root folder and run
    ```shell 
   npm install 
   ```
3. There are now 2 possible paths (always in the root of the project):
    * If you want to **open cypress**, **run on different browsers from your system**, and **see the tests run on the browser in real time**:
        * ```shell
          npm run cypress
          ```
        This will open the cypress window where you can select in which browser to run
        ![cypress_open_browsers](https://user-images.githubusercontent.com/1148556/99911546-27b55a80-2ced-11eb-8e8f-39dfa90afea7.png)

        After choosing a browser, all you need to do is click on `Run 1 integration spec`
        ![cypress_open_run_spec](https://user-images.githubusercontent.com/1148556/99911610-92669600-2ced-11eb-8727-bd05409039f2.png)

        This will open the chosen browser and run the tests in real time
        ![cypress_chrome_run](https://user-images.githubusercontent.com/1148556/99911608-8f6ba580-2ced-11eb-9930-8e4a74f9f8a7.png)
    * If you want to **run the tests in the background** and **generate reports**:
        * Chrome:
            ```shell 
            npm run tests:chrome  
            ```
        * Firefox:
            ```shell 
            npm run tests:firefox  
            ```
        * Edge:
            ```shell 
            npm run tests:edge  
            ```
        Generated reports can be found inside `cypress/results` - final results are in the `cypress/results/report.html` file.
        They should look like the screenshot below and be interactive.
        ![cypress_report](https://user-images.githubusercontent.com/1148556/99911756-6992d080-2cee-11eb-89a2-11f79457a362.png)
        
        If there are test failures, screenshots will be captured and saved in `cypress/screenshots`. 
        
        Videos are captured automatically and will be accessible in `cypress/videos`.
___
 [![Project Limitations](https://img.shields.io/badge/Project-Limitations-red?style=for-the-badge&logo=cypress)](https://docs.cypress.io/guides/references/trade-offs.html)
 * Other than the inherent limitations for Cypress, such as a [lack of support for Safari](https://github.com/cypress-io/cypress/issues/6422) currently, the following points should be considered:
    * **Tests were run only on Linux machines** 
        * This means that the `npm run tests:browser` scripts may fail on Windows environments, due to the difference in commands. 
        If such is the case, you may opt to run `npm run cypress` instead. 
        If you're feeling adventurous, you may edit the `package.json` file and edit the `delete:...` scripts to use `rmdir /S /Q cypress\\results || true` (for example) instead of `rm cypress/results/* ; rm cypress/results/assets/* || true`.
    * The site being tested is heavy on resources - due to resource constraints, some tests may be flaky due to loading times. All tests were passing at the time of writing this, so running them again should make them pass.
 
 ___
 <sub><sup>**Hint:** All banners are clickable and have relevant links!</sup></sub>