/* eslint-disable @typescript-eslint/no-unused-expressions */
import { test, expect } from '@playwright/test';

test('title 값 가져오기', async ({ page }) => {
    await page.goto('https://www.realchart.co.kr/demo/Basic/basic-bar');
    const titleText = await page.locator('.rct-title').textContent();

    expect(titleText).toEqual('월별 매출 현황 분석');
});

test('subTitle 값 가져오기', async ({ page }) => {
    await page.goto('https://www.realchart.co.kr/demo/Basic/basic-bar');
    const subTitleText = await page.locator('.rct-subtitle').textContent();

    expect(subTitleText).toEqual('1월부터 12월까지의 매출 변화 추적');
});

test('yAxis label 값 배열로 만들어 가져오기', async ({ page }) => {
    await page.goto('https://www.realchart.co.kr/demo/Basic/basic-bar');
    const yAxis = page.locator('.rct-axis[xy="y"]');
    const yAxisLabelsCount = await yAxis.locator('.rct-axis-label').count();
    const labelArr = [];
    for (let i = 0; i < yAxisLabelsCount; i++) {
        const yAxisLabelText = await yAxis.locator('.rct-axis-label').nth(i).textContent();
        labelArr.push(yAxisLabelText);
    }

    expect(labelArr).toEqual(['-200', '-100', '0', '100', '200']);
});

test('xAxis label 값 배열로 만들어 가져오기', async ({ page }) => {
    await page.goto(' https://www.realchart.co.kr/demo/Basic/basic-bar');
    const xAxis = page.locator('.rct-axis[xy="x"]');
    const xAxisLabelCount = await xAxis.locator('.rct-axis-label').count();
    const labelArr = [];

    for (let i = 0; i < xAxisLabelCount; i++) {
        const text = await xAxis.locator('.rct-axis-label').nth(i).textContent();
        labelArr.push(text);
    }
    expect(labelArr).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
});

test('yAxis title 이 안 그려진 거 확인하기', async ({ page }) => {
    await page.goto('https://www.realchart.co.kr/demo/Basic/basic-bar');
    const yAxis = page.locator('.rct-axis[xy="y"]');
    const yAxisTitle = await yAxis.locator('rct-axis-title').textContent();

    console.log(yAxisTitle);
});

test('xAxis title 값 가져오기', async ({ page }) => {
    await page.goto('https://www.realchart.co.kr/demo/Basic/basic-bar');
    const xAxis = await page.locator('.rct-axis[xy="x"]');
    const xAxisText = await xAxis.locator('.rct-axis-title').textContent();

    expect(xAxisText).toEqual('월 (1월 - 12월)');
});

test('Data point가 음수인지 양수인지 확인하기', async ({ page }) => {
    await page.goto('https://www.realchart.co.kr/demo/Basic/basic-bar');
    const points = page.locator('.rct-series-points');
    const point = points.locator('.rct-point');
    const pointCount = await points.locator('.rct-point').count();
    const zero = await page.locator('.rct-axis-grid > path:nth-child(3)').boundingBox();
    for (let i = 0; i < pointCount; i++) {
        const pointBox = await point.nth(i).boundingBox();
        if (pointBox !== null && zero !== null && zero.y < pointBox.y) {
            console.log('음수입니다.');
        } else if (pointBox !== null && zero !== null && pointBox.y < zero.y) {
            console.log('양수입니다.');
        }
    }
});

test('코드 보기 버튼 클릭해서 config가 보이게 하기', async ({ page }) => {
    await page.goto('https://www.realchart.co.kr/demo/Basic/basic-bar');
    await page.locator('label').filter({ hasText: '코드 보기' }).locator('div').nth(1).click();
    await page.waitForTimeout(3000);

    expect(page.locator('.view-lines.monaco-mouse-cursor-text')).toBeVisible();
});

test('Inverted 버튼 클릭하기', async ({ page }) => {
    await page.goto('https://www.realchart.co.kr/demo/Basic/basic-bar');
    await page.getByLabel('Inverted').click();
    await page.waitForTimeout(2000);

    await expect(page.getByLabel('Inverted')).toBeChecked();
});

test('Palette 값 변경하기', async ({ page }) => {
    await page.goto('https://www.realchart.co.kr/demo/Basic/basic-bar');
    await page.locator('.mantine-Input-input.mantine-Select-input').click();
    const select = page.locator('.mantine-Input-input.mantine-Select-input');

    await page.getByRole('option', { name: 'warm' }).click();
    const value = await select.getAttribute('value');
    expect(value).toEqual('warm');
});

test('config값 가져오기', async ({ page }) => {
    await page.goto('https://www.realchart.co.kr/demo/Basic/basic-bar');
    await page.locator('label').filter({ hasText: '코드 보기' }).locator('div').nth(1).click();
    await page.waitForTimeout(3000);
    const config = page.locator('.view-lines.monaco-mouse-cursor-text');
    expect(config).toBeVisible();
});

test('차트 snapshot 저장하기', async ({ page }) => {
    await page.goto('https://www.realchart.co.kr/demo/Basic/basic-bar');
    await page.locator('#realchart').screenshot({ path: './tests/snapshot/snapshot.png' });
});
