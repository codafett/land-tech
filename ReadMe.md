# Challenge: Corporate Land Ownership

Due to time constraints the aggregator and logger were created without tests.

Assumptions:

1. Given a company Id it's assumed that we need to traverse to the top level parent of that company and report on ALL child records down to and potentially past the company id provided

## Install guide - Production mode

1. Using a command prompt navigate to the project root folder
2. Install packages with the following command:

```
npm i
```

3.  Create an npm link for easy access with the following command:

```
npm link
```

4. Build the app with the following command

```
npm build
```

5. Run the app with the following command

```
landtree --<command option>=<command value> <args>
```

## Command Options

The following options are available:
| Option | Value | Result |
|--------|---------|-----------|
| mode | from_root | return results from the root parent of the company id passed in |

## Command Args

The following args are available:
| Arg | Result |
|-----------|-----------|
| companyId | the company id the report is made for

### Usage

Options can be used as follows:

```
landtree --mode=from_root C10284218421
```

## Install guide - Developer mode

1. Using a command prompt navigate to the project root folder
2. Install packages with the following command:

```
npm i
```

### Running app

To run the app in dev mode use

```
npm run start -- --mode=from_root <companyId>
```

### Running tests

#### Run all tests

To run all tests WITH code coverage use the command:

```
npm run test
```

To run all tests in TDD mode use the command:

```
npm run test:tdd
```

To run all tests WITHOUT code coverage use the command:

```
npm run test:nc
```

To run tests on a specific file use the command:

```
npm run test:file <file-reg-ex-pattern>
```

To run all tests on a specific file use the command:

```
npm run test:file <file-reg-ex-pattern>
```

To run all tests on a specific file and watch for changes use the command:

```
npm run test:file:watch <file-reg-ex-pattern>
```
