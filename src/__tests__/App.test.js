import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import api from "../services/api";

const apiMock = new MockAdapter(api);

import App from "./../App.js";

const wait = (amount = 0) => {
  return new Promise((resolve) => setTimeout(resolve, amount));
};

const actWait = async (amount = 0) => {
  await act(async () => {
    await wait(amount);
  });
};

describe("App component", () => {
  it("should be able to add new repository", async () => {
    const { getByText, getByTestId } = render(<App />);

    apiMock.onGet("repositories").reply(200, []);

    apiMock.onPost("repositories").reply(200, {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });

    await actWait();

    fireEvent.click(getByText("Adicionar"));

    await actWait();

    expect(getByTestId("repository-list")).toContainElement(
      getByText("Desafio ReactJS")
    );
  });

 
});
