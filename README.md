<!-- @saracaudill: If your expectation is to have a dev-like person iterate on your code, you should look into aligning this repo's project structure so that it mirrors current frontend processes. For example you essentially have what we call a 'build' in the root of the main branch of your repo. This makes it unclear how folks can offer edits, etc. because typically there is a concept of source files and build files. The idea is that you modify the source which then results in a new build eventually. This allows separate management of both sets of files so that it is easier to do things like revert back from a busted app state minimizing downtime for users.  -->

<!-- @saracaudill: Consistent with above, you should consider adding dev quality of life features a lot of dev's expect like livepreview or adopting a CSS framework. The benfit of doing so is that you are creating an environment that lowers the barrier of entry for potential contributors. -->

# Starfinder 2E NPC Generator

## Overview

This random text generator uses JavaScript arrays to return basic characteristics for Starfinder Second Edition NPCs.

## Installation

<!-- @saracaudill: These directions do not work. As they are, the consumer of your repo will likely run into a CORS issue preventing use of your app as per these directions. Going forward, I suggest you commit to only offering directions in the `README.md` that you have validated with another dev. Otherwise best to not include them. IMHO it is better leaving out directions to imply a dev they will need to roll their own solutions to things like serving the app, etc. vs. telling them to do something that does not work.  -->

1. Clone the repository: 'git clone <https://github.com/saracaudill/sf2-npc-gen>'.
2. Navigate to the project directory: 'cd sf2-npc-gen'.
3. Open index.html in your browser.

## Usage

- Click the 'GENERATE' button in your browser to generate an ancestry, attitude, and detail.
- Add additional elements to the arrays in data.json.
