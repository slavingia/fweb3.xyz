import { renderComponent } from "../../test.utils";

import { GameChest } from "../GameChest";

describe("<GameChest />", () => {
  it("renders without crashing", () => {
    renderComponent(<GameChest />);
  });
});
