# Modern JavaScript

In the past we would use browser side javascript and jquery, but things have changed.
Previously javascript only ran only in the browser, but now we have node.js which allows us to run javascript server side.
It’s still made from the same vanilla javascript we know and love, but the way we approach programming has shifted.
- We now have a lot of choices for frameworks and libraries that can streamline the development process.
  - many of these are open source and community maintained
  - Popular ones that we’re going to cover: Node, Remix, React, Architect
- ECMAScript 6 or ES6
  - scripting language or a standard
  - It introduced a wide range of new features and improvements to the language, enhancing its capabilities and making it more efficient and developer friendly
  - it introduced let and const keywords to declare variables with block-level scope, as opposed to the function-level scope of var

### resources:
- https://www.w3schools.com/js/js_es6.asp

## modules

- Code modules are small logical chunks of functionality.
- The code is organized around a central functionality or set of functionalities. This allows programmers to only install functionality that their app needs.
- modules are imported into applications

Think about code like a lego, that can snap into place. Modules are like legos that can be assembled to help make up an application.

### resources:
- https://www.w3schools.com/js/js_modules.asp
- https://www.freecodecamp.org/news/javascript-modules-a-beginner-s-guide-783f7d7a5fcc/

## JavaScript on the server
- We can now have javascript on the server because of node.js
- What is popular these days is server side rendering
- We take the data and hydrate the page on the server, then pass it forward

### resources:
- https://developer.mozilla.org/en-US/docs/Learn/Server-side

## the NPM ecosystem
- Node package manager
- This is not just the largest package registry, it is an entire ecosystem. You can find links to the open source packages, documentation, website links, as well as detailed instructions for packages. Leverage the ecosystem to help you along.
- Packages are installable chunks of code that give you the ability to use the code from the package instead of writing it yourself. Why solve problems that have already been solved well?
- NPM allows people to easily upload and maintain packages that are widely used within the community.

### resources:
- https://www.npmjs.com/
- https://www.w3schools.com/whatis/whatis_npm.asp


## types
- Typescript extends javascript
- Just like databases have data types, so too does typescript.
- Parameters and variables are more strongly typed to give an added layer of protection
- You can’t accidentally pass one variable type to another.
- Typing is just telling javascript what kind of data you are going to store in a variable or pass in a parameter.
- This comes in very useful during development. Modern IDEs can be configured to help by highlighting type errors

### resources:
- https://www.typescriptlang.org/docs/handbook/basic-types.html

## JSX
- JavaScript XML or JavaScript syntax extension
- an XML-like extension that allows us to write JavaScript that looks like markup and have it returned from a component
- JSX extends javascript
- JSX allows us to write HTML in React
- requires a transpiler since the browser can't read it directly.
  - transpilers are like translators, they convert from one syntax to another
- we use JSX with react
  - this makes development easier
- all JSX code is typically wrapped in a return statement at the end of a function or default function
- JSX code is contained within a tag, usually we use an empty div <></>

### resources:
- https://www.w3schools.com/react/react_jsx.asp

## React
- open source library used for building UI component based user interfaces
- react alone can be time consuming to write, so that's why we use JSX
- react uses a virtual DOM in memory. It makes changes to the virtual DOM before making changes in the browser DOM.
  - "The Document Object Model (DOM) is the data representation of the objects that comprise the structure and content of a document on the web."
- react handles watching for changes and applying those changes ONLY to the elements that have changed

### resources:
- https://www.w3schools.com/REACT/react_intro.asp
- https://www.w3schools.com/REACT/DEFAULT.ASP
- https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction