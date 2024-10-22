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
- password: **1**

## Available Components

List of all componenets available within this template

### MyForm

Custom Form component leveraged for creating forms that can communicate with the POSTgreSQL db using POSTGREST and useFetcher[https://remix.run/docs/en/main/hooks/use-fetcher] from Remix. These forms use fetcher.Form from Remix to refresh data mutations without page load.

Props:
`action?` - String value that determines the form action attribute
`cancelText?` - String value of cancel button text (default is "Cancel")
`color?` - String value determining the color styling of action buttons
`children?` - React.Node that appears below any rendered fields
`defaultValues?` - Table object to be used for setting default Values across inputs
`submitText?` - String value of submit button text (default is "Submit")
`fields?` - Table object to be used for rendering input fields on form dynamically
`method` - POST, DELETE, PUT, or undefined
`onSubmit` - Handler event for submit button
`onCancel` - Handler event for cancel button

### MyModal

Custom Modal component leveraged for creating modals.

Props:
`children` - Modal content
`centered` - Boolean to determine centering of content
`close` - Handler event for when the modal is closed
`fullscreen` - Boolean value for fullscreen mode. This will default on tablets
`opened` - Boolean value for determing opened state
`size` - String value determing size
`title` - String value for header text

### Panel

This component is used as a building block for dividing out content on a grid.

Props:
`children` - Panel content
`title` - String value for header text

### StatsGrid

Custom Grid component for displaying 4 unique stats in a dashboard

No Props

### TableSort

This is a component for rendering a custom table display of data with full CRUD capabilities, row selection, column sorting, and search. There is also an optional `bindings` prop for if you have multiple TableSort's on the same page and wish to filter or 'bind' one Table's data with that of another.

Props:
`data` - Object array for data display
`colDef` - Object that references a ModelField from the Models directory
`createTitle?` - String value for the header text to display on the create Modal
`formAction?` - String value used to specify a custom action for all form modals
`editTitle?` - String value for the header text to display on the edit Modal
`deleteTitle?` - String value for the header text to display on the delete Modal
`bindings?` - Object array that determines data filtration
`onSelect?` - Handler event for row selection
