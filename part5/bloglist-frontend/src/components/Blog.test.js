import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Blog from "./Blog";

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
const isOwner = true;

const setup = (props) => {
  const user = userEvent.setup();
  const utils = render(<Blog {...props} />);

  const title = utils.getByLabelText(/title/i).textContent;
  const author = utils.getByLabelText(/author/i).textContent;
  const viewButton = utils.getByRole("button", { name: /view button/i });

  const showItems = async () => {
    await user.click(viewButton);

    const url = utils.getByLabelText(/url/i).textContent;
    const likes = utils.getByLabelText(/likes/i).textContent;
    const likeButton = utils.getByRole("button", { name: /like button/i });
    const userName = utils.getByLabelText(/user name/i).textContent;
    const removeButton = props.isOwner
      ? utils.getByRole("button", { name: /remove button/i })
      : null;

    return { url, likes, likeButton, userName, removeButton };
  };

  return {
    title,
    author,
    showItems,
    ...utils,
  };
};

test("renders content", () => {
  const { title, author, queryByText } = setup({ blog });

  expect(title).toBe(blog.title);
  expect(author).toBe(blog.author);
  expect(queryByText(blog.url)).not.toBeInTheDocument();
  expect(queryByText(blog.likes)).not.toBeInTheDocument();
  expect(queryByText(blog.user.name)).not.toBeInTheDocument();
});

test("url and number of likes are shown when the button has been clicked", async () => {
  const { showItems } = setup({ blog, isOwner });
  const { url, likes, userName, likeButton, removeButton } = await showItems();

  expect(url).toBe(blog.url);
  expect(likes).toBe(blog.likes.toString());
  expect(userName).toBe(blog.user.name);
  expect(likeButton).toBeInTheDocument();
  expect(removeButton).toBeInTheDocument();
});

test("if the like button is clicked twice, the event handler is called twice", async () => {
  const user = userEvent.setup();
  const likeBlog = jest.fn();
  const { showItems } = setup({ blog, likeBlog });
  const { likeButton } = await showItems();

  await user.dblClick(likeButton);
  expect(likeBlog.mock.calls).toHaveLength(2);
});
