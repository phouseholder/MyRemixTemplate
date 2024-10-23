# Parker Householder's Remix Template

This is my repository for creating web applications using Remix. My Remix Template acts a skeleton for creating enterprise level CRUD applications. Follow the steps below to set up an example in your local environment

## Prerequisites

To get started, please ensure your local machine has the following installed

- **Node 21 or higher** 📦
- **Docker** 🐳
- **pgAdmin 4** 🛠️

## Installation Guide

### Step 1: Clone Repository from Github

Clone this repository to your local machine

```sh
git clone https://github.com/phouseholder/MyRemixTemplate
cd MyRemixTemplate
```

### Step 2: Deploy Infrastructure

Start the infrastructure with docker. This will connect you with the Vercel hosted db and set up the POSTGREST API which will listen on http://localhost:8080

```sh
docker-compose up -d
```

### Step 3: Install Dependencies

Install all dependencies using npm

```sh
npm install
```

### Step 4: Start Development

Kick off your development server using npm. This will run on http://localhost:5173 and communicate with the infrastructure set up in Step 2.

```sh
npm run dev
```

### Step 5: Authenticate

Navigate to http://localhost:5173 and use the following credentials to authenticate:

- username: **admin**
- password: **password**

## Available Components

List of all componenets available within this template

### MyForm

Custom Form component leveraged for creating forms that can communicate with the POSTgreSQL db using POSTGREST and useFetcher[https://remix.run/docs/en/main/hooks/use-fetcher] from Remix. These forms use fetcher.Form from Remix to refresh data mutations without page load.<br/><br/>

Props:<br/>
`action?` - String value that determines the form action attribute<br/>
`cancelText?` - String value of cancel button text (default is "Cancel")<br/>
`color?` - String value determining the color styling of action buttons<br/>
`children?` - React.Node that appears below any rendered fields<br/>
`defaultValues?` - Table object to be used for setting default Values across inputs<br/>
`submitText?` - String value of submit button text (default is "Submit")<br/>
`fields?` - Table object to be used for rendering input fields on form dynamically<br/>
`method` - POST, DELETE, PUT, or undefined<br/>
`onSubmit` - Handler event for submit button<br/>
`onCancel` - Handler event for cancel button<br/>

### MyModal

Custom Modal component leveraged for creating modals.

Props:<br/>
`children` - Modal content<br/>
`centered` - Boolean to determine centering of content<br/>
`close` - Handler event for when the modal is closed<br/>
`fullscreen` - Boolean value for fullscreen mode. This will default on tablets<br/>
`opened` - Boolean value for determing opened state<br/>
`size` - String value determing size<br/>
`title` - String value for header text<br/>

### Panel

This component is used as a building block for dividing out content on a grid.<br/><br/>

Props:<br/>
`children` - Panel content<br/>
`title` - String value for header text<br/>

### StatsGrid

Custom Grid component for displaying 4 unique stats in a dashboard<br/><br/>

No Props

### TableSort

This is a component for rendering a custom table display of data with full CRUD capabilities, row selection, column sorting, and search. There is also an optional `bindings` prop for if you have multiple TableSort's on the same page and wish to filter or 'bind' one Table's data with that of another.<br/><br/>

Props:<br/>
`data` - Object array for data display<br/>
`colDef` - Object that references a ModelField from the Models directory<br/>
`createTitle?` - String value for the header text to display on the create Modal<br/>
`formAction?` - String value used to specify a custom action for all form modals<br/>
`editTitle?` - String value for the header text to display on the edit Modal<br/>
`deleteTitle?` - String value for the header text to display on the delete Modal<br/>
`bindings?` - Object array that determines data filtration<br/>
`onSelect?` - Handler event for row selection<br/>
