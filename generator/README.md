# WIP - Fake Data Generator for ActivityPods

Welcome to the **Fake Data Generator for ActivityPods**, a tool designed to streamline your development process by generating customizable data environments. This tool saves you from the tedious task of manually creating mock data, allowing you to test your application more effectively and realistically.
This is a **work in process functionality**.

## Features

- **Simulated User Profiles**: Easily create user profiles, simulating a network where users possess resources with various levels of sharing among their contacts.
- **Simple Customization**: Configure a JSON file and run a script to generate your data.

## 🏄‍♀️ Getting Started

Follow these steps to get started with the Fake Data Generator:

### Prerequisites

- Ensure the [**ActivityPods** boilerplate](https://docs.activitypods.org/tutorials/create-your-first-social-app/) is running correctly .

### Installation

1. **Switch to the development branch for the generator**:
   ```bash
   git fetch origin data-generator
   git checkout data-generator
   ```

2. **Start the services**:
   ```bash
   make start
   ```
   > You don’t need to start the main application from the boilerplate to inject data. For more information on this command, refer to the documentation.

3. **Install the generator dependencies**:
   ```bash
   cd generator
   npm install
   ```

## Usage

1. **Configuration**: For now, the data in json file in the "data" folder. You can customize them but **don't forget to change the NUM_PODS variable in the generate.js file**.
  
2. **Run the Generator**:
   ```bash
   npm run generator
   ```

5. **Check the generated data**: You can view the data directly in your terminal or access it via **Jena Fuseki** at `localhost:3030`.

## 🛠️ Contributing

Currently, this generator only creates some profile, but it could be extended to generate multiple profiles connected by relationships, with resources for each profile and varying levels of sharing based on ActivityPods principles. Contributions to expand these capabilities are very welcome!

## 🌍 Community & Support

- **Issues**: Encountered a problem? [Open an issue](https://github.com/simonLouvet/activityPod-boilerplate), and we’ll look into it!
- **Discussions**: For general questions, ideas, or sharing your experience with the Generator, join our [Discussions page en french](https://matrix.to/#/#activitypods-app-makers-fr:matrix.org) ou [in english](https://matrix.to/#/#activitypods-newbies:matrix.org).
- **Contact**: If you prefere, you can also send a email at alice.poggioli@assemblee-virtuelle.org
