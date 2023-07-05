This project is a sample code applying Clean Architecture on the frontend.

![clean-architecture](https://github.com/ryo034/ddd-clean-architecture/assets/55078625/c3edfc10-6b03-4708-aa6a-000025d80aab)

# Motivation
The main purpose of this project is to standardize the parts outside of the frameworks, and to make it possible to try out the features and implementations of various frontend frameworks (Vue, React, Svelte, etc.) under Clean Architecture. This allows for maintaining business logic without relying on any specific framework, and makes comparisons and applications across various frameworks easier.

You can try Clean Architecture on the frontend and check the feel of each framework.

As there are also unit tests, component (integration) and E2E written, it is suitable for trying out TDD and ATDD.

# Dataflow
Below is the diagram of Clean Architecture on the frontend in this project.

![en-clean-architecture-flow-with-adapter](https://github.com/ryo034/ddd-clean-architecture/assets/55078625/2758bab5-9fef-4d94-94a0-c746bd446a47)

# Implementation
The implementation is a very small and simple specification that allows you to log in by entering your email address and password, and then display an account screen.

You can log in with the following account.

```text
Email: test+1@example.com
Password: Test123
```

## Implemented Frameworks
- [x] React
- [ ] Vue
- [ ] Svelte

The libraries used in each framework are those that the author usually uses.
Since these libraries are written in Clean Architecture, they should be easily replaceable.

# Directory structure
```text
/frontend-clean-architecture
❯ tree -L 1
.
├── container // Docker containers
├── test // E2E
└── typescript // TypeScript projects & packages
```
```text
/frontend-clean-architecture/typescript
❯ tree -L 1
.
├── packages // common package
└── apps // each frameworks(React, Vue, Svelte)
```

# Install
```bash
$ git clone https://github.com/ryo034/frontend-clean-architecture.git
$ cd frontend-clean-architecture
$ npm install
```

# Setup
Initialization is done using `make`. Only the command is mentioned here, so please refer to the `Makefile` if you want to know more details.

1. initialize
```bash
$ make init
```

2. Starting Docker
```bash
$ make start
```

3. Execute E2E and initialize the data
```bash
$ make run-e2e
```

After executing the above steps, you can open it at [http://localhost:5173](http://localhost:5173)
