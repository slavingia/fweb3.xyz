import { renderComponent } from "../../test.utils";
import { ConnectWalletButton } from "../ConnectWalletButton";

describe("ConnectWalletButton", () => {
  it("renders without crashing", () => {
    renderComponent(<ConnectWalletButton />);
  });
});
