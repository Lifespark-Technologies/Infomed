import { ReactElement } from "react";
import { RenderResult, act, render } from "@testing-library/react";

export const renderAsync = async (element: ReactElement): Promise<RenderResult> => {
  let renderResult: RenderResult | null = null
  await act(async () => {
    renderResult = render(element)
  })
  return renderResult!
};