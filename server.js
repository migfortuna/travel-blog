// Node.js
// javascript runtime; where you can build javascript applications from your machine
// uses the V8 Engine = what converts your code to machine code for the machine to read

// Non-Blocking
// doesn't wait for I/O operations; it uses events and callbacks for many connections at the same time

// Single Threaded
// a single "set of instructions" that execute at a time
// this is why there is an Event Loop = allows you to perform non-blocking I/O operations

// BEST ANALOGY
// imagine those revolving doors in buildings (never stop spinning)
// each person that goes through is a task
// the door never stops spinning even after the person goes through (doesn't wait)
// the door can just keep going, accept people, and throw them out again
// the door = event loop
// the person entering = task/request
// person exits the door = callback

import { createServer } from "http";
import { logger, setHeaders } from "./middleware.js";
import {
  routeNotFound,
  getAllBlogs,
  getBlog,
  createNewBlog,
  updateBlog,
  deleteBlog,
} from "./handlers.js";

// this looks so dirty without a framework like Express
const server = createServer((req, res) => {
  logger(req, res, () => {
    setHeaders(req, res, async () => {
      if (req.method == "GET") {
        if (req.url == "/blogs") {
          getAllBlogs(req, res);
        } else if (req.url.match(/\/blogs\/.+/)) {
          getBlog(req, res);
        } else {
          routeNotFound(req, res);
        }
      } else if (req.method == "POST") {
        if (req.url == "/blog") {
          createNewBlog(req, res);
        } else {
          routeNotFound(req, res);
        }
      } else if (req.method == "PUT") {
        if (req.url.match(/\/blogs\/.+/)) {
          updateBlog(req, res);
        } else {
          routeNotFound(req, res);
        }
      } else if (req.method == "DELETE") {
        if (req.url.match(/\/blogs\/.+/)) {
          deleteBlog(req, res);
        } else {
          routeNotFound(req, res);
        }
      } else {
        routeNotFound(req, res);
      }
    });
  });
});

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server ready on localhost:${port}`);
});
