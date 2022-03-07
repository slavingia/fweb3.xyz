import { render } from "@testing-library/react";
import { GameDots } from "../GameDots";

const renderComponent = (props) => render(<GameDots {...props} />);

describe("<GameDots />", () => {
  it("renders without crashing", () => {
    renderComponent();
  });
});
