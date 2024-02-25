import { act } from "react-dom/test-utils";
import { useConfirmCreditEntryHandler } from "./useConfirmCreditEntryHandler";
import { useDispatch } from "react-redux";

// Mock de useDispatch pour surveiller les actions dispatchées
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("useConfirmCreditEntryHandler", () => {
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
  });

  it("devrait déclencher une erreur si le montant de l'avoir n'est pas défini", () => {
    const { handleConfirmCreditEntry } = useConfirmCreditEntryHandler();

    const e = { stopPropagation: jest.fn() };
    const action = "CREDIT";
    const orderProductsActions = { creditContent: { amount: null, dateExpire: "2024-01-19" } };
    const setProductActions = jest.fn();
    const setEntryError = jest.fn();
    const orderId = "789";
    const orderProducts = { id: "abc" };
    const productPrice = 10;

    act(() => {
      handleConfirmCreditEntry(e, action, orderProductsActions, setProductActions, setEntryError, orderId, orderProducts, productPrice);
    });

    expect(setEntryError).toHaveBeenCalledWith("⚠️ Le montant de l'avoir et une date de validité ultérieure doivent être définis.");
    // Assurez-vous que dispatch n'est pas appelé
    expect(dispatch).not.toHaveBeenCalled();
    // Assurez-vous que setProductActions n'est pas appelé
    expect(setProductActions).not.toHaveBeenCalled();
  });
});