import blogs from "./data.js";

export const routeNotFound = (req, res) => {
  res.statusCode = 404;
  res.write(JSON.stringify({ data: "Resource not found!" }));
  res.end();
};

export const getAllBlogs = (req, res) => {
  res.write(JSON.stringify({ data: blogs }));
  res.end();
};

export const getBlog = (req, res) => {
  let status = 200;
  let data;
  const slug = req.url.split("/")[2];
  const blog = blogs.find((blog) => blog.slug == slug);
  if (!blog) {
    status = 400;
    data = "Resource does not exist!";
  } else {
    data = blogs.find((blog) => blog.slug == slug);
  }
  res.statusCode = status;
  res.write(JSON.stringify({ data: data }));
  res.end();
};

export const createNewBlog = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const parsedBody = JSON.parse(body);
    const slug = parsedBody.title.toLowerCase().split(" ").join("-");

    const newBlog = {
      id: blogs.length + 1,
      slug,
      ...parsedBody,
    };

    let status = 200;
    let data;
    const blogExists = blogs.find((blog) => blog.slug == slug);
    if (blogExists) {
      status = 409;
      data = "A blog with this title already exists!";
    } else {
      blogs.push(newBlog);
      data = newBlog;
    }

    res.statusCode = status;
    res.write(JSON.stringify({ data: data }));
    res.end();
  });
};
