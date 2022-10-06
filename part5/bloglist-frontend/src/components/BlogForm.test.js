import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import BlogForm from "./BlogForm";

const blog = {
  title: "On let vs const",
  author: "Dan Abramov",
  url: "https://overreacted.io/on-let-vs-const",
  likes: 99,
  user: {
    username: "mluukkai",
    name: "Matti Luukkainen",
    id: "633b29a274105fc1347d1c96",
  },
  id: "633b29b974105fc1347d1c9b",
};

const setup = (props) => {
  const utils = render(<BlogForm {...props} />);

  const titleInput = utils.getByRole("textbox", { name: /title/i });
  const authorInput = utils.getByRole("textbox", { name: /author/i });
  const urlInput = utils.getByRole("textbox", { name: /url/i });
  const saveButton = utils.getByRole("button", { name: /save button/i });

  return {
    titleInput,
    authorInput,
    urlInput,
    saveButton,
    ...utils,
  };
};

test("renders content", () => {
  const { titleInput, authorInput, urlInput, saveButton } = setup();

  expect(titleInput).toBeInTheDocument();
  expect(authorInput).toBeInTheDocument();
  expect(urlInput).toBeInTheDocument();
  expect(saveButton).toBeInTheDocument();
});

test("form calls the event handler when a new blog is created", async () => {
  const user = userEvent.setup();
  const createBlog = jest.fn();
  const { titleInput, authorInput, urlInput, saveButton } = setup({
    createBlog,
  });

  fireEvent.change(titleInput, { target: { value: blog.title } });
  expect(titleInput.value).toBe(blog.title);

  fireEvent.change(authorInput, { target: { value: blog.author } });
  expect(authorInput.value).toBe(blog.author);

  fireEvent.change(urlInput, { target: { value: blog.url } });
  expect(urlInput.value).toBe(blog.url);

  await user.click(saveButton);
  expect(createBlog).toBeCalled();

  const [firstCall] = createBlog.mock.calls;
  const [{ title, author, url }] = firstCall;
  expect(title).toBe(blog.title);
  expect(author).toBe(blog.author);
  expect(url).toBe(blog.url);
});
