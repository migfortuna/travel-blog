import blogs from "./data.js";

export const routeNotFound = (req, res) => {
  res.statusCode = 404;
  res.write(JSON.stringify({ data: "Resource not found!" }));
  res.end();
};

const findBlog = (slug) => {
  return blogs.find((blog) => blog.slug == slug);
};

export const getAllBlogs = (req, res) => {
  res.write(JSON.stringify({ data: blogs }));
  res.end();
};

export const getBlog = (req, res) => {
  let status = 200;
  let data;
  const blog = findBlog(req.BLOG_SLUG);
  if (!blog) {
    status = 404;
    data = "Resource does not exist!";
  } else {
    data = findBlog(req.BLOG_SLUG);
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
    let status = 200;
    let data;
    const parsedBody = JSON.parse(body);
    const validRequest = parsedBody.title && parsedBody.description;
    const slug = parsedBody.title.toLowerCase().split(" ").join("-");
    const blogExists = findBlog(slug);

    if (!validRequest) {
      status = 400;
      data = "Invalid request!";
    } else if (blogExists) {
      status = 409;
      data = "A blog with this title already exists!";
    } else {
      const newBlog = {
        id: blogs.length + 1,
        slug,
        ...parsedBody,
      };
      blogs.push(newBlog);
      data = newBlog;
    }

    res.statusCode = status;
    res.write(JSON.stringify({ data: data }));
    res.end();
  });
};

export const updateBlog = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    let status = 200;
    let data;
    const blog = findBlog(req.BLOG_SLUG);
    const parsedBody = JSON.parse(body);

    if (!blog) {
      status = 404;
      data = "Resource does not exist!";
    } else {
      // why am I using || instead of ?? and &&?
      // || is the "Logical OR Operator", meaning it checks if the left value is an empty string, null or undefined
      // ?? is the "Nullish Operator", meaning it checks if the left value is null or not
      // && is the "Logical AND Operator", meaning it checks if the left value is true or false
      blog.title = parsedBody.title || blog.title;
      blog.description = parsedBody.description || blog.description;
      data = blog;
    }

    res.statusCode = status;
    res.write(JSON.stringify({ data: data }));
    res.end();
  });
};

export const deleteBlog = (req, res) => {
  let status = 200;
  let data;
  const blog = findBlog(req.BLOG_SLUG);

  if (!blog) {
    status = 404;
    data = "Resource does not exist!";
  } else {
    const indexToRemove = blogs.findIndex((blog) => blog.slug == req.BLOG_SLUG);
    blogs.splice(indexToRemove, 1);
    data = blogs;
  }

  res.statusCode = status;
  res.write(JSON.stringify({ data: data }));
  res.end();
};
