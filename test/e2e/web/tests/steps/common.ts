import { Step } from "gauge-ts";
import { page } from "../browser";
import { homeURL } from "../config";
import { expect } from "@playwright/test";

export default class PagesStep {
  @Step("ホームに遷移する")
  async openOrdersPage() {
    await page.goto(homeURL);
  }

  @Step("<path>を開く")
  async openPage(path: string) {
    await page.goto(`${homeURL}${path}`);
  }

  @Step("ログイン画面を開く")
  async goToLoginPage() {
    await page.goto(`${homeURL}`);
  }

  @Step("画面を更新する")
  async reloadPage() {
    await page.reload();
  }

  @Step("<buttonName>ボタンをクリック")
  async clickButtonByName(buttonName: string) {
    const target = page.locator("button").getByText(buttonName);
    await target.waitFor();
    await target.click();
  }

  @Step("<text>をクリック")
  async clickTextByName(text: string) {
    const target = page.getByText(text);
    await target.waitFor();
    await target.click();
  }

  @Step("エラーメッセージ<errorMessage>が表示されている")
  async isVisibleErrorMessage(errorMessage: string) {
    const target = page.getByTestId("resultError").getByText(errorMessage);
    await target.waitFor();
    expect(await target.isVisible()).toBeTruthy();
  }

  @Step("現在のURLのパスが<url>")
  async assetUrl(url: string) {
    const currentURL = new URL(await page.url());
    const targetURL = new URL(`${currentURL.origin}${url}`);
    await page.waitForURL(targetURL.href);
    expect((new URL(await page.url()).pathname)).toEqual(targetURL.pathname);
  }
}
