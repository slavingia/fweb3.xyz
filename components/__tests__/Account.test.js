import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Account } from "../Account";
import { useGameState } from "../../hooks/useGameState";
import useMetaMaskOnboarding from "../../hooks/useMetaMaskOnboarding";

jest.mock("../../hooks/useGameState");

jest.mock("../../hooks/useMetaMaskOnboarding");

const renderComponent = (props) => render(<Account {...props} />);

const mockGameState = {
  active: true,
  account: null,
  activate: jest.fn(),
};

const mockMetamaskState = {
  isWeb3Available: true,
  stopOnboarding: jest.fn(),
  startOnboarding: jest.fn(),
};

beforeEach(() => {
  useGameState.mockReturnValue(mockGameState);
  useMetaMaskOnboarding.mockReturnValue(mockMetamaskState);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("<Account />", () => {
  it("renders connect button when no account, errors, and tried eager connect", () => {
    renderComponent({ triedToEagerConnect: true });
    expect(screen.getByText("Connect your wallet")).toBeTruthy();
  });
  it("calls activate when button clicked", async () => {
    renderComponent({ triedToEagerConnect: true });

    const buttonElement = screen.getByText("Connect your wallet");

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockGameState.activate).toHaveBeenCalled();
    });
  });
  it("starts onboarding when web3 is not available", async () => {
    mockMetamaskState.isWeb3Available = false;
    renderComponent({ triedToEagerConnect: true });
    const buttonElement = screen.getByText("Connect your wallet");
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockMetamaskState.startOnboarding).toHaveBeenCalled();
    });
  });
});
