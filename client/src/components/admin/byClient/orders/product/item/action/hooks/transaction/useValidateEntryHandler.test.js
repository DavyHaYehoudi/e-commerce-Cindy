import { act } from "react-dom/test-utils";
import { useValidateEntryHandler } from "./useValidateEntryHandler";
import * as actions from "../../../../../../../../../constants/orderProductsActions";
import { updateActionContent } from "../../../../../../../../../features/admin/orderProductsSlice";

// Mock de useDispatch pour surveiller les actions dispatchées
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("useValidateEntryHandler", () => {
  let dispatch;
  let setEntryError;

  beforeEach(() => {
    dispatch = jest.fn();
    setEntryError = jest.fn();
  });
  const orderProductsActions = {};
  const orderProducts ={}
  it("devrait déclencher une erreur si le nombre maximal d'articles est dépassé, avec REFUND = 2 et EXCHANGE = 0", () => {
    const orderProductsInfo = {
      exchange: null,
      refund: 2,
      credit: null,
      note: null,
    };
    const articleNumber = 1;
    const { handleValidateEntry } = useValidateEntryHandler(
      actions,
      orderProducts,
      orderProductsInfo,
      orderProductsActions,
      articleNumber,
      setEntryError,
      dispatch,
      updateActionContent
    );

    // Forcer la situation où le nombre maximal d'articles est dépassé
    act(() => {
      handleValidateEntry(
        { stopPropagation: jest.fn() },
        "EXCHANGE",
        "123",
        "456",
        "789",
        jest.fn(), // mock setProductActions
        10 // productPrice
      );
    });

    // Assurez-vous que setEntryError a été appelé avec le bon message d'erreur
    expect(setEntryError).toHaveBeenCalledWith(
      expect.stringMatching(/Le nombre maximal d'articles \(\d+\) est dépassé/)
    );
  });
  it("devrait déclencher une erreur si le nombre maximal d'articles est dépassé, avec REFUND = 1 et EXCHANGE = 1", () => {
    const orderProductsInfo = {
      exchange: 1,
      refund: 1,
      credit: null,
      note: null,
    };
    const articleNumber = 1;
    const { handleValidateEntry } = useValidateEntryHandler(
      actions,
      orderProducts,
      orderProductsInfo,
      orderProductsActions,
      articleNumber,
      setEntryError,
      dispatch,
      updateActionContent
    );

    // Forcer la situation où le nombre maximal d'articles est dépassé
    act(() => {
      handleValidateEntry(
        { stopPropagation: jest.fn() },
        "EXCHANGE",
        "123",
        "456",
        "789",
        jest.fn(), // mock setProductActions
        10 // productPrice
      );
    });

    // Assurez-vous que setEntryError a été appelé avec le bon message d'erreur
    expect(setEntryError).toHaveBeenCalledWith(
      expect.stringMatching(/Le nombre maximal d'articles \(\d+\) est dépassé/)
    );
  });
  it("devrait déclencher une erreur si le nombre maximal d'articles est dépassé, avec REFUND = 0 et EXCHANGE = 2", () => {
    const orderProductsInfo = {
      exchange: 2,
      refund: 0,
      credit: null,
      note: null,
    };
    const articleNumber = 1;
    const { handleValidateEntry } = useValidateEntryHandler(
      actions,
      orderProducts,
      orderProductsInfo,
      orderProductsActions,
      articleNumber,
      setEntryError,
      dispatch,
      updateActionContent
    );

    // Forcer la situation où le nombre maximal d'articles est dépassé
    act(() => {
      handleValidateEntry(
        { stopPropagation: jest.fn() },
        "EXCHANGE",
        "123",
        "456",
        "789",
        jest.fn(), // mock setProductActions
        10 // productPrice
      );
    });

    // Assurez-vous que setEntryError a été appelé avec le bon message d'erreur
    expect(setEntryError).toHaveBeenCalledWith(
      expect.stringMatching(/Le nombre maximal d'articles \(\d+\) est dépassé/)
    );
  });
  it("devrait déclencher une action de validation réussie si le nombre maximal d'articles n'est pas dépassé,avec REFUND = 0 et EXCHANGE = 1", () => {
    const orderProductsInfo = {
      exchange: 1,
      refund: 0,
      credit: null,
      note: null,
    };
    const articleNumber = 1;
    const { handleValidateEntry } = useValidateEntryHandler(
      actions,
      orderProductsInfo,
      orderProductsActions,
      articleNumber,
      setEntryError,
      dispatch,
      updateActionContent
    );

    const productsId = "456";
    const orderId = "789";
    const setProductActions = jest.fn();
    const productPrice = 10;

    // Forcer la situation où le nombre maximal d'articles n'est pas dépassé
    act(() => {
      handleValidateEntry(
        { stopPropagation: jest.fn() },
        "EXCHANGE",
        productsId,
        orderId,
        setProductActions,
        productPrice
      );
    });

    // Assurez-vous que setEntryError n'a pas été appelé en cas de validation réussie
    expect(setEntryError).not.toHaveBeenCalled();
  });
  it("devrait déclencher une action de validation réussie si le nombre maximal d'articles n'est pas dépassé,avec REFUND = 1 et EXCHANGE = 0", () => {
    const orderProductsInfo = {
      exchange: 0,
      refund: 1,
      credit: null,
      note: null,
    };
    const articleNumber = 1;
    const { handleValidateEntry } = useValidateEntryHandler(
      actions,
      orderProductsInfo,
      orderProductsActions,
      articleNumber,
      setEntryError,
      dispatch,
      updateActionContent
    );

    const productsId = "456";
    const orderId = "789";
    const setProductActions = jest.fn();
    const productPrice = 10;

    // Forcer la situation où le nombre maximal d'articles n'est pas dépassé
    act(() => {
      handleValidateEntry(
        { stopPropagation: jest.fn() },
        "EXCHANGE",
        productsId,
        orderId,
        setProductActions,
        productPrice
      );
    });

    // Assurez-vous que setEntryError n'a pas été appelé en cas de validation réussie
    expect(setEntryError).not.toHaveBeenCalled();
  });
});