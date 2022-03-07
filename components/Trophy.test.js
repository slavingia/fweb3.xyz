import { render } from "@testing-library/react";
import { Trophy } from "./Trophy";

const renderComponent = (props) => render(<Trophy {...props} />);

describe("<Trophy />", () => {
  it("renders without crashing", () => {
    renderComponent();
  });
});
